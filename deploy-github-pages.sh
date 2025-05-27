#!/bin/bash

echo "🚀 Deploying Portfolio to GitHub Pages..."

if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

echo "📁 Adding files..."
git add .

echo "💾 Committing changes..."
git commit -m "Deploy portfolio website - $(date)"

git branch -M main

echo "🔗 Setting up remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Burhanmustafa/Burhanmustafa.github.io.git

echo "🌐 Pushing to GitHub Pages..."
git push -u origin main --force

echo "✅ Deployment complete!"
echo "🌍 Your website will be live at: https://Burhanmustafa.github.io"
echo "⏱️  It may take a few minutes to appear online." 