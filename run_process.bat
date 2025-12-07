@echo off
REM Batch script to run InDesign processing
REM Called by Windows Task Scheduler every 5 minutes

REM Path to InDesign (adjust for your version)
SET INDESIGN="C:\Program Files\Adobe\Adobe InDesign 2024\InDesign.exe"

REM Path to script
SET SCRIPT="%~dp0ProcessOnce.jsx"

REM Check if InDesign is already running
tasklist /FI "IMAGENAME eq InDesign.exe" 2>NUL | find /I /N "InDesign.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo InDesign is already running - using existing instance
    REM Execute script in running instance (if possible)
    %INDESIGN% -script %SCRIPT%
) else (
    echo Starting InDesign and running script
    REM Start InDesign with script
    %INDESIGN% -script %SCRIPT%
)

echo Process completed