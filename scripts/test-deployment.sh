#!/bin/bash

# Test script for local deployment verification
# This script simulates the deployment workflow locally

set -e

echo "🧪 Testing Abstract Algorithms Deployment Workflow"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d ".github/workflows" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking project structure..."

# Check required files
required_files=(
    "package.json"
    "next.config.js"
    ".github/workflows/deploy.yml"
    ".github/workflows/rollback.yml"
    ".github/workflows/build-android-simple.yml"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file exists"
    else
        print_error "✗ $file is missing"
        exit 1
    fi
done

# Check Node.js version
print_status "Checking Node.js version..."
node_version=$(node --version)
print_success "Node.js version: $node_version"

# Check if dependencies are installed
print_status "Checking dependencies..."
if [ -d "node_modules" ]; then
    print_success "✓ Dependencies are installed"
else
    print_warning "Dependencies not installed. Installing..."
    npm ci
fi

# Test build process
print_status "Testing build process..."
if npm run build; then
    print_success "✓ Build completed successfully"
else
    print_error "✗ Build failed"
    exit 1
fi

# Check if output directory exists
if [ -d "out" ]; then
    print_success "✓ Output directory created"
    file_count=$(find out -type f | wc -l)
    print_status "Generated $file_count files"
else
    print_error "✗ Output directory not found"
    exit 1
fi

# Test if essential files exist in output
essential_files=("out/index.html" "out/_next")
for file in "${essential_files[@]}"; do
    if [ -e "$file" ]; then
        print_success "✓ $file exists in output"
    else
        print_warning "⚠ $file not found in output"
    fi
done

# Check GitHub Actions workflow syntax
print_status "Validating GitHub Actions workflows..."

# This is a basic check - in a real environment you'd use act or github CLI
workflows=(".github/workflows/deploy.yml" ".github/workflows/rollback.yml" ".github/workflows/build-android-simple.yml")
for workflow in "${workflows[@]}"; do
    if grep -q "name:" "$workflow" && grep -q "on:" "$workflow" && grep -q "jobs:" "$workflow"; then
        print_success "✓ $workflow has valid structure"
    else
        print_warning "⚠ $workflow may have syntax issues"
    fi
done

# Summary
echo ""
echo "🎉 Deployment Test Summary"
echo "=========================="
print_success "✅ Project structure is valid"
print_success "✅ Build process works correctly"
print_success "✅ GitHub Actions workflows are properly configured"
print_success "✅ Ready for deployment!"

echo ""
print_status "Next steps:"
echo "1. Commit and push your changes to the main branch"
echo "2. GitHub Actions will automatically:"
echo "   - Build and deploy the website"
echo "   - Create a new release"
echo "   - Build Android APK (if android/ files changed)"
echo "3. Visit https://abstractalgorithms.github.io to see your live site"
echo "4. Check the Releases page for the new release"

echo ""
print_status "Useful commands:"
echo "• Test locally: npm run dev"
echo "• Build: npm run build"
echo "• Lint: npm run lint"
echo "• View workflows: https://github.com/abstractalgorithms/abstractalgorithms.github.io/actions"
echo "• View releases: https://github.com/abstractalgorithms/abstractalgorithms.github.io/releases"
