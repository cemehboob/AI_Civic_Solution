@echo off
REM =========================================================================
REM Awami Voice Civic Solution - Automated Git Deployment Script
REM Target Repository: https://github.com/cemehboob/AI_Civic_Solution.git
REM =========================================================================

echo [1/5] Checking Git installation...
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not found in PATH. Please install Git or add it to PATH.
    pause
    exit /b 1
)

echo [2/5] Initializing Git repository if needed...
if not exist ".git" (
    git init
    echo Git repository initialized.
)

echo [3/5] Configuring remote origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/cemehboob/AI_Civic_Solution.git
echo Remote origin set to https://github.com/cemehboob/AI_Civic_Solution.git

echo [4/5] Staging changes and committing...
git branch -M main
git add .
git commit -m "Update: Dedicated EN ⇄ اردو bilingual conversion badge, complete Chinese glyph elimination, nationwide Pakistan expansion across all provinces, clean mic prompt, and updated documentation"

echo [5/5] Pushing to GitHub repository...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =========================================================================
    echo [SUCCESS] Changes successfully pushed to:
    echo https://github.com/cemehboob/AI_Civic_Solution.git
    echo =========================================================================
) else (
    echo.
    echo [NOTICE] Push encountered an issue. If the remote repository has commits,
    echo run: git pull origin main --rebase
    echo then re-run this script.
)

pause
