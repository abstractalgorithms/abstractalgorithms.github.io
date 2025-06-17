# PowerShell script to clean build environment
Write-Host "Cleaning build environment..." -ForegroundColor Green

# Stop Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Remove .next directory
if (Test-Path ".next") {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
}

# Remove data files
if (Test-Path "public\data") {
    Get-ChildItem "public\data\*.json" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
}

Write-Host "Clean completed!" -ForegroundColor Green
