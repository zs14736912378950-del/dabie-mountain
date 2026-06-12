@echo off
chcp 65001 >nul
echo.
echo  🌲 大别山生态密码 - 开发服务器
echo  ================================
echo.
echo  正在启动开发服务器...
echo  启动后请访问: http://localhost:5173
echo  按 Ctrl+C 停止服务器
echo.
cd /d "%~dp0"
npm run dev
pause
