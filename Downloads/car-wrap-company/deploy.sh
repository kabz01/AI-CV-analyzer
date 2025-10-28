#!/bin/bash

# Car Wrap Company Deployment Script
echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy to Vercel: npx vercel"
    echo "2. Deploy to Netlify: npm run build && drag dist folder to netlify.com"
    echo "3. Deploy to any static host using the .next folder"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
