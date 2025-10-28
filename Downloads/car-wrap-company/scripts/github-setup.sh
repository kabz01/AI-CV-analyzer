#!/bin/bash

echo "🔧 Setting up GitHub repository for deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Check current status
echo "📊 Current git status:"
git status

# Add all files
echo "📝 Adding all files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️ No changes to commit"
else
    echo "💾 Committing changes..."
    git commit -m "Car wrap company website - ready for deployment with luxury detailing image"
fi

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "🔗 Remote origin already exists:"
    git remote -v
else
    echo "❓ No remote origin found. Please add your GitHub repository:"
    echo "Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "Then: git push -u origin main"
fi

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Try to push if remote exists
if git remote | grep -q "origin"; then
    echo "🚀 Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 You can now deploy to Vercel or other platforms"
    else
        echo "❌ Failed to push to GitHub. Please check your repository URL and permissions."
    fi
else
    echo "⚠️ Please add your GitHub repository URL first"
fi
