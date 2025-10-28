#!/bin/bash

echo "🚀 Deploying car wrap company website to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build the project first
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Vercel
    echo "🌐 Deploying to Vercel..."
    vercel --prod
    
    echo "✅ Deployment complete!"
    echo "🔗 Your website should now be live!"
else
    echo "❌ Build failed. Please check for errors and try again."
    exit 1
fi
