@echo off
REM Survey Monitor AI - Vercel Deployment Script for Windows
REM This script handles the complete deployment process to Vercel

echo 🚀 Starting Survey Monitor AI deployment to Vercel...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Vercel CLI is not installed. Installing...
    npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Not logged in to Vercel. Please login first:
    vercel login
)

REM Clean previous builds
echo [INFO] Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist .vercel rmdir /s /q .vercel

REM Install dependencies
echo [INFO] Installing dependencies...
npm ci

REM Run linting
echo [INFO] Running linting...
npm run lint
if %errorlevel% neq 0 (
    echo [WARNING] Linting failed, continuing with deployment...
)

REM Build the project
echo [INFO] Building project for production...
npm run vercel-build

REM Check if build was successful
if not exist dist (
    echo [ERROR] Build failed - dist directory not found
    exit /b 1
)

echo [SUCCESS] Build completed successfully!

REM Deploy to Vercel
echo [INFO] Deploying to Vercel...
vercel --prod --yes

echo [SUCCESS] Deployment completed!
echo 🌐 Your app is live at: https://survey-monitor-ai.vercel.app

REM Open the deployment URL
echo [INFO] Opening deployment URL...
start https://survey-monitor-ai.vercel.app

echo [SUCCESS] 🎉 Survey Monitor AI is now live and accessible to the public!
echo [INFO] 📊 Features available:
echo [INFO]   - AI-powered analytics dashboard
echo [INFO]   - Modern glassmorphism UI
echo [INFO]   - Dark mode support
echo [INFO]   - Responsive design
echo [INFO]   - Real-time data visualization

echo.
echo [INFO] 🔧 To manage your deployment:
echo [INFO]   - View deployments: vercel ls
echo [INFO]   - View logs: vercel logs
echo [INFO]   - Update domain: vercel domains
echo [INFO]   - Remove deployment: vercel rm

pause
