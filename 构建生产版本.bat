@echo off
chcp 65001 >nul
echo.
echo  🌲 大别山生态密码 - 构建生产版本
echo  ================================
echo.
cd /d "%~dp0"
npm run build
echo.
echo  构建完成！输出目录: dist\
echo.
pause
