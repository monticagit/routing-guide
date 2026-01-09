#!/bin/bash

# GitHub Setup Script for Routing Guide
# This script helps you push your code to GitHub

echo "🚚 Multi-Stop Routing Guide - GitHub Setup"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   Visit: https://git-scm.com/downloads"
    exit 1
fi

# Initialize git if needed
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files
echo ""
echo "📝 Adding files to git..."
git add .
echo "✅ Files added"

# Check if there are any changes
if git diff --staged --quiet; then
    echo "⚠️  No changes to commit"
else
    # Make initial commit
    echo ""
    echo "💾 Making initial commit..."
    git commit -m "Initial commit: Multi-stop routing guide web application"
    echo "✅ Initial commit created"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo ""
    echo "🔄 Renaming branch to 'main'..."
    git branch -M main
    CURRENT_BRANCH="main"
fi

echo ""
echo "=========================================="
echo "✅ Local git repository is ready!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   Go to: https://github.com/new"
echo "   Name it: routing-guide (or any name you prefer)"
echo "   DO NOT initialize with README, .gitignore, or license"
echo ""
echo "2. Add your GitHub repository as remote and push:"
echo "   git remote add origin https://github.com/YOUR-USERNAME/routing-guide.git"
echo "   git push -u origin $CURRENT_BRANCH"
echo ""
echo "   (Replace YOUR-USERNAME with your actual GitHub username)"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to your repository on GitHub"
echo "   - Click 'Settings' → 'Pages'"
echo "   - Source: 'GitHub Actions' or 'Deploy from a branch'"
echo "   - Branch: $CURRENT_BRANCH, Folder: / (root)"
echo "   - Your site will be at: https://YOUR-USERNAME.github.io/routing-guide"
echo ""
echo "📖 For detailed instructions, see GITHUB_SETUP.md"
echo ""
