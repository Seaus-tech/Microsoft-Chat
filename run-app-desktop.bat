@echo off
title Microsoft Chat Desktop Launcher
echo ====================================================
echo   Starting Microsoft Chat Desktop Launcher...
echo ====================================================

:: Check if electron is installed in node_modules
if not exist "node_modules\electron" (
    echo [INFO] Electron is not installed. Installing Electron now...
    echo [INFO] This requires no admin rights and will take just a moment.
    call npm install --save-dev electron
    if errorlevel 1 (
        echo [ERROR] Failed to install Electron. Please run 'npm install --save-dev electron' manually in your terminal.
        pause
        exit /b
    )
)

echo ====================================================
echo   Starting React Developer Server...
echo ====================================================
start /b "" cmd /c npm run dev

echo Waiting for developer server to start...
timeout /t 3 /nobreak >nul

echo ====================================================
echo   Launching Standalone Desktop Window...
echo ====================================================
call cmd /c npm run electron

exit
