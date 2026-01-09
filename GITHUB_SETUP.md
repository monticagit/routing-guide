# GitHub Deployment Setup Guide

## Quick Start: Push to GitHub and Deploy with GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `routing-guide` (or any name you prefer)
4. Description: "Multi-stop routing guide web application"
5. Choose Public or Private
6. **Do NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open terminal in the `routing-guide` folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Multi-stop routing guide"

# Rename branch to main (if needed)
git branch -M main

# Add your GitHub repository as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/routing-guide.git

# Push to GitHub
git push -u origin main
```

**Note:** Replace `YOUR-USERNAME` and `routing-guide` with your actual GitHub username and repository name.

### Step 3: Enable GitHub Pages

#### Method A: Using GitHub Actions (Recommended - Automatic)

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select **"GitHub Actions"**
4. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy your site
5. Go to "Actions" tab to see the deployment progress
6. Once deployed, your site will be at: `https://YOUR-USERNAME.github.io/routing-guide`

#### Method B: Deploy from Branch (Simple)

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select **"Deploy from a branch"**
4. Branch: `main` or `master`
5. Folder: `/ (root)`
6. Click "Save"
7. Wait 1-2 minutes for GitHub to build your site
8. Your site will be at: `https://YOUR-USERNAME.github.io/routing-guide`

### Step 4: Customize Your URL (Optional)

If you want a custom repository name:
- Repository name determines URL: `your-repo-name` → `YOUR-USERNAME.github.io/your-repo-name`
- You can rename the repository in Settings → General → Repository name

For a shorter URL (`YOUR-USERNAME.github.io`):
- Create repository named exactly: `YOUR-USERNAME.github.io`
- Must be public repository
- Must use the `main` branch
- Will be accessible at `https://YOUR-USERNAME.github.io`

## Updating Your Site

Every time you make changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

GitHub Pages will automatically rebuild and update your site within 1-2 minutes.

## Troubleshooting

**Site not showing?**
- Check the "Actions" tab for any build errors
- Wait 2-3 minutes after enabling Pages (first deployment takes longer)
- Check repository Settings → Pages to ensure it's enabled
- Make sure your repository is public (or you have GitHub Pro for private repos)

**404 Error?**
- Make sure `index.html` is in the root folder
- Check that the branch name matches (main vs master)
- Verify Pages source is set correctly in Settings

**Want to use a custom domain?**
- In repository Settings → Pages → Custom domain
- Add your domain (e.g., `routing.yourdomain.com`)
- Update DNS records as instructed
- GitHub provides free SSL certificate

## Viewing Your Site

Your deployed site URL format:
- Repository name: `routing-guide` → `https://YOUR-USERNAME.github.io/routing-guide`
- Repository name: `YOUR-USERNAME.github.io` → `https://YOUR-USERNAME.github.io`

You can also access it from your repository page by clicking the "Environment" link in the right sidebar (under "Environments").
