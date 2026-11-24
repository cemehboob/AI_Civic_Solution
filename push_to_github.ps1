# =========================================================================
# Awami Voice Civic Solution - Automated Git Deployment Script (PowerShell)
# Target Repository: https://github.com/cemehboob/AI_Civic_Solution.git
# =========================================================================

Write-Host "=========================================================" -ForegroundColor Green
Write-Host " Awami Voice Civic Solution - GitHub Auto-Deploy Script" -ForegroundColor Green
Write-Host " Repository: https://github.com/cemehboob/AI_Civic_Solution.git" -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Green

# 1. Check if git exists in PATH
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    Write-Host "[ERROR] git.exe was not found in PATH." -ForegroundColor Red
    Write-Host "Please ensure Git for Windows is installed and available."
    Exit 1
}

# 2. Check if .git folder exists
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Initializing local Git repository..." -ForegroundColor Yellow
    & git init
} else {
    Write-Host "[1/5] Git repository already initialized." -ForegroundColor Cyan
}

# 3. Configure remote origin
Write-Host "[2/5] Configuring remote origin..." -ForegroundColor Yellow
& git remote remove origin 2>$null
& git remote add origin https://github.com/cemehboob/AI_Civic_Solution.git
Write-Host "Remote origin set to https://github.com/cemehboob/AI_Civic_Solution.git" -ForegroundColor Green

# 4. Stage files and commit
Write-Host "[3/5] Setting main branch..." -ForegroundColor Yellow
& git branch -M main

Write-Host "[4/5] Staging files and creating commit..." -ForegroundColor Yellow
& git add -A
$commitMessage = "Fix: Replace green mic with animated studio recording button, remove green references, and ensure responsive layout"
& git commit -m "$commitMessage"

# 5. Push to GitHub
Write-Host "[5/5] Pushing to GitHub (origin/main)..." -ForegroundColor Yellow
& git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=========================================================" -ForegroundColor Green
    Write-Host " SUCCESS: All changes successfully deployed to GitHub!" -ForegroundColor Green
    Write-Host " https://github.com/cemehboob/AI_Civic_Solution.git" -ForegroundColor Cyan
    Write-Host "=========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Note: If the remote repository has initial commits, you may need to run:" -ForegroundColor Yellow
    Write-Host "git pull origin main --rebase" -ForegroundColor White
    Write-Host "Then push again." -ForegroundColor Yellow
}
