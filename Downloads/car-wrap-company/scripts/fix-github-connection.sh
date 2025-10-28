#!/bin/bash

echo "🔧 Fixing GitHub connection for car wrap company website..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Initializing..."
    git init
fi

# Check current remotes
echo "📋 Current git remotes:"
git remote -v

# Remove existing origin if it exists
if git remote | grep -q "origin"; then
    echo "🗑️ Removing existing origin..."
    git remote remove origin
fi

# Add your GitHub repository (you'll need to replace with your actual repo URL)
echo "🔗 Please enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git):"
read REPO_URL

if [ -n "$REPO_URL" ]; then
    git remote add origin "$REPO_URL"
    echo "✅ Added origin: $REPO_URL"
else
    echo "❌ No repository URL provided. Please run manually:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
    exit 1
fi

# Check git status
echo "📊 Git status:"
git status

# Add all files
echo "📁 Adding all files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Updated services page with new luxury detailing image - ready for deployment"

# Set main branch and push
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🌐 You can now try publishing through v0 again, or deploy directly to Vercel."
