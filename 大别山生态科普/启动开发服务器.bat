@echo off
chcp 65001 >nul
echo.
echo ==============================
echo   大别山生态密码 - 开发服务器
echo ==============================
echo.
cd /d "%~dp0"
echo 正在启动开发服务器...
echo 浏览器访问: http://localhost:5173
echo.
call npm run dev
pause
