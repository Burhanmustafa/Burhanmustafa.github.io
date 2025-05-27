#!/bin/bash

# GitHub Pages Deployment Script for Burhan's Portfolio

echo "🚀 Deploying Portfolio to GitHub Pages..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Add all files
echo "📁 Adding files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy portfolio website - $(date)"

# Set main branch
git branch -M main

# Add remote origin (update with your actual repository URL)
echo "🔗 Setting up remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Burhanmustafa/Burhanmustafa.github.io.git

# Push to GitHub
echo "🌐 Pushing to GitHub Pages..."
git push -u origin main --force

echo "✅ Deployment complete!"
echo "🌍 Your website will be live at: https://Burhanmustafa.github.io"
echo "⏱️  It may take a few minutes to appear online." 