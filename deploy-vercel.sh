#!/bin/bash

# Survey Monitor AI - Vercel Deployment Script
# This script handles the complete deployment process to Vercel

set -e

echo "🚀 Starting Survey Monitor AI deployment to Vercel..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "Not logged in to Vercel. Please login first:"
    vercel login
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf .vercel/

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Run linting
print_status "Running linting..."
npm run lint || print_warning "Linting failed, continuing with deployment..."

# Build the project
print_status "Building project for production..."
npm run vercel-build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not found"
    exit 1
fi

print_success "Build completed successfully!"

# Deploy to Vercel
print_status "Deploying to Vercel..."
vercel --prod --yes

# Get deployment URL
DEPLOYMENT_URL=$(vercel ls --json | jq -r '.[0].url' 2>/dev/null || echo "https://survey-monitor-ai.vercel.app")

print_success "Deployment completed!"
print_success "🌐 Your app is live at: $DEPLOYMENT_URL"

# Optional: Open the deployment URL
if command -v open &> /dev/null; then
    print_status "Opening deployment URL..."
    open "$DEPLOYMENT_URL"
elif command -v xdg-open &> /dev/null; then
    print_status "Opening deployment URL..."
    xdg-open "$DEPLOYMENT_URL"
fi

print_success "🎉 Survey Monitor AI is now live and accessible to the public!"
print_status "📊 Features available:"
print_status "  - AI-powered analytics dashboard"
print_status "  - Modern glassmorphism UI"
print_status "  - Dark mode support"
print_status "  - Responsive design"
print_status "  - Real-time data visualization"

echo ""
print_status "🔧 To manage your deployment:"
print_status "  - View deployments: vercel ls"
print_status "  - View logs: vercel logs"
print_status "  - Update domain: vercel domains"
print_status "  - Remove deployment: vercel rm"
