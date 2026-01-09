# 🚀 Quick Start: Deploy to GitHub Pages

## Fastest Way (5 minutes)

### 1. Run the setup script:
```bash
cd routing-guide
./setup-github.sh
```

### 2. Create GitHub repository:
- Go to: https://github.com/new
- Repository name: `routing-guide`
- **DO NOT** check any boxes (no README, no .gitignore, no license)
- Click "Create repository"

### 3. Push your code (replace YOUR-USERNAME):
```bash
git remote add origin https://github.com/YOUR-USERNAME/routing-guide.git
git push -u origin main
```

### 4. Enable GitHub Pages:
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **"GitHub Actions"**
4. Wait 1-2 minutes
5. Your site will be live at: `https://YOUR-USERNAME.github.io/routing-guide`

That's it! 🎉

## Alternative: Manual Steps

If you prefer to do it manually:

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit: Multi-stop routing guide"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/routing-guide.git
git branch -M main
git push -u origin main
```

Then enable Pages in repository Settings → Pages → GitHub Actions

## Need Help?

See `GITHUB_SETUP.md` for detailed instructions and troubleshooting.
