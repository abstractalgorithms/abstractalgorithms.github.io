# PowerShell script to clean build and stop any running processes
Write-Host "🧹 Cleaning build environment..." -ForegroundColor Green

# Stop any running Node processes on the development port
Write-Host "🔌 Stopping any running Next.js processes..." -ForegroundColor Yellow
try {
    Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Node processes stopped" -ForegroundColor Green
} catch {
    Write-Host "ℹ️ No Node processes found to stop" -ForegroundColor Cyan
}

# Wait a moment for processes to fully stop
Start-Sleep -Seconds 2

# Remove .next directory if it exists
if (Test-Path ".next") {
    Write-Host "🗑️ Removing .next directory..." -ForegroundColor Yellow
    try {
        Remove-Item -Recurse -Force ".next" -ErrorAction Stop
        Write-Host "✅ .next directory removed" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Could not remove .next directory: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "💡 Try manually deleting the .next folder and running this script again" -ForegroundColor Cyan
    }
} else {
    Write-Host "ℹ️ .next directory not found" -ForegroundColor Cyan
}

# Remove data files
if (Test-Path "public\data") {
    Write-Host "🗑️ Cleaning data files..." -ForegroundColor Yellow
    try {
        Get-ChildItem "public\data\*.json" -ErrorAction SilentlyContinue | Remove-Item -Force
        Write-Host "✅ Data files cleaned" -ForegroundColor Green
    } catch {
        Write-Host "ℹ️ No data files to clean" -ForegroundColor Cyan
    }
}

Write-Host "🎉 Clean completed! You can now run npm run build" -ForegroundColor Green
