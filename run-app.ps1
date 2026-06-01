# Ensure the script runs in the current directory
Set-Location -Path $PSScriptRoot

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Starting Microsoft Chat Desktop Launcher..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# 1. Kill any existing process running on Port 1420 (Vite) to prevent the port-in-use error
$PortProcess = Get-NetTCPConnection -LocalPort 1420 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($PortProcess) {
    Write-Host "[INFO] Port 1420 is already in use by PID $PortProcess. Stopping it..." -ForegroundColor Yellow
    Stop-Process -Id $PortProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# 2. Check and force reinstall Electron if binary path.txt is missing
if (-not (Test-Path "node_modules\electron\path.txt")) {
    Write-Host "[INFO] Electron binary missing or corrupt. Re-downloading..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "node_modules\electron" -ErrorAction SilentlyContinue
    
    # Run npm install with force flag to trigger postinstall binary download
    npm install --save-dev electron --force
    
    if (-not (Test-Path "node_modules\electron\path.txt")) {
        Write-Error "[ERROR] Failed to download Electron binary. Please run 'npm install --save-dev electron --force' manually."
        exit
    }
}

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Starting React Developer Server..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

# Start the Vite development server in the background (using cmd /c to support batch script npm)
$DevProcess = Start-Process cmd.exe -ArgumentList "/c npm run dev" -NoNewWindow -PassThru

# Wait 3 seconds for the server to spin up
Start-Sleep -Seconds 3

Write-Host "====================================================" -ForegroundColor Green
Write-Host "  Launching Standalone Desktop Window..." -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Green

# Launch the Electron desktop app window
npm run electron

# Clean up background process on exit
if ($DevProcess) {
    Stop-Process -Id $DevProcess.Id -Force -ErrorAction SilentlyContinue
}
