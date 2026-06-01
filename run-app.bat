@echo off
title Microsoft Chat Flyout
echo ====================================================
echo   Starting Microsoft Chat Flyout App...
echo ====================================================

:: Start the Vite development server using cmd interpretter to resolve npm.cmd
start /b "" cmd /c npm run dev

:: Wait 3 seconds for the server to spin up
timeout /t 3 /nobreak >nul

echo ====================================================
echo   Launching standalone Windows application window...
echo ====================================================

:: Launch Microsoft Edge in App Mode (borderless, separate taskbar icon)
start msedge --app=http://localhost:5173 --window-size=360,580

exit
