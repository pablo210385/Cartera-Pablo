@echo off
title Cartera Pablo — Servidor local
cd /d "%~dp0"

echo.
echo  =======================================
echo   Cartera Pablo - App de inversiones
echo  =======================================
echo.
echo  Iniciando servidor local...
echo.

:: Verificar que Python esta instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
  echo  ERROR: Python no encontrado.
  echo  Instala Python desde https://python.org
  pause
  exit /b 1
)

:: Arrancar servidor en background y abrir Chrome
start /b python -m http.server 8765 2>nul

:: Esperar 1 segundo a que el servidor arranque
timeout /t 1 /nobreak >nul

:: Abrir en Chrome (intentar Chrome primero, luego Edge, luego navegador por defecto)
start "" "http://localhost:8765/cartera_pablo_movil.html"

echo  Servidor activo en: http://localhost:8765
echo.
echo  Para instalar como app en Chrome:
echo    1. Abre Chrome en esa URL
echo    2. Haz clic en el icono de instalar (esquina derecha de la barra)
echo       o ve a Menu > Instalar Cartera
echo.
echo  [Cierra esta ventana para detener el servidor]
echo.
pause >nul
