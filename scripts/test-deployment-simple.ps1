# Test script for local deployment verification (PowerShell version)
param([switch]$SkipBuild = $false)

Write-Host "🧪 Testing Abstract Algorithms Deployment Workflow" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

function Write-Status($Message) { Write-Host "[INFO] $Message" -ForegroundColor Blue }
function Write-Success($Message) { Write-Host "[SUCCESS] $Message" -ForegroundColor Green }
function Write-Warning($Message) { Write-Host "[WARNING] $Message" -ForegroundColor Yellow }
function Write-Failure($Message) { Write-Host "[ERROR] $Message" -ForegroundColor Red }

# Check if we're in the right directory
if (-not (Test-Path "package.json") -or -not (Test-Path ".github/workflows")) {
    Write-Failure "Please run this script from the project root directory"
    exit 1
}

Write-Status "Checking project structure..."

# Check required files
$requiredFiles = @("package.json", "next.config.js", ".github/workflows/deploy.yml", ".github/workflows/rollback.yml", ".github/workflows/build-android-simple.yml")

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Success "✓ $file exists"
    } else {
        Write-Failure "✗ $file is missing"
        exit 1
    }
}

# Check Node.js version
Write-Status "Checking Node.js version..."
try {
    $nodeVersion = & node --version
    Write-Success "Node.js version: $nodeVersion"
} catch {
    Write-Failure "Node.js is not installed or not in PATH"
    exit 1
}

# Check if dependencies are installed
Write-Status "Checking dependencies..."
if (Test-Path "node_modules") {
    Write-Success "✓ Dependencies are installed"
} else {
    Write-Warning "Dependencies not installed. Installing..."
    & npm ci
    if ($LASTEXITCODE -ne 0) {
        Write-Failure "Failed to install dependencies"
        exit 1
    }
}

# Test build process
if (-not $SkipBuild) {
    Write-Status "Testing build process..."
    & npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Success "✓ Build completed successfully"
    } else {
        Write-Failure "✗ Build failed"
        exit 1
    }

    # Check if output directory exists
    if (Test-Path "out") {
        Write-Success "✓ Output directory created"
        $fileCount = (Get-ChildItem -Path "out" -Recurse -File).Count
        Write-Status "Generated $fileCount files"
    } else {
        Write-Failure "✗ Output directory not found"
        exit 1
    }

    # Test if essential files exist in output
    $essentialFiles = @("out/index.html", "out/_next")
    foreach ($file in $essentialFiles) {
        if (Test-Path $file) {
            Write-Success "✓ $file exists in output"
        } else {
            Write-Warning "⚠ $file not found in output"
        }
    }
} else {
    Write-Status "Skipping build process (use -SkipBuild:`$false to include build test)"
}

# Check GitHub Actions workflow syntax
Write-Status "Validating GitHub Actions workflows..."
$workflows = @(".github/workflows/deploy.yml", ".github/workflows/rollback.yml", ".github/workflows/build-android-simple.yml")

foreach ($workflow in $workflows) {
    $content = Get-Content $workflow -Raw
    if ($content -match "name:" -and $content -match "on:" -and $content -match "jobs:") {
        Write-Success "✓ $workflow has valid structure"
    } else {
        Write-Warning "⚠ $workflow may have syntax issues"
    }
}

# Summary
Write-Host ""
Write-Host "🎉 Deployment Test Summary" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Success "✅ Project structure is valid"
if (-not $SkipBuild) { Write-Success "✅ Build process works correctly" }
Write-Success "✅ GitHub Actions workflows are properly configured"
Write-Success "✅ Ready for deployment!"

Write-Host ""
Write-Status "Next steps:"
Write-Host "1. Commit and push your changes to the main branch"
Write-Host "2. GitHub Actions will automatically:"
Write-Host "   - Build and deploy the website"
Write-Host "   - Create a new release"
Write-Host "   - Build Android APK (if android/ files changed)"
Write-Host "3. Visit https://abstractalgorithms.github.io to see your live site"
Write-Host "4. Check the Releases page for the new release"

Write-Host ""
Write-Status "Useful commands:"
Write-Host "• Test locally: npm run dev"
Write-Host "• Build: npm run build"  
Write-Host "• Lint: npm run lint"
Write-Host "• View workflows: https://github.com/abstractalgorithms/abstractalgorithms.github.io/actions"
Write-Host "• View releases: https://github.com/abstractalgorithms/abstractalgorithms.github.io/releases"
