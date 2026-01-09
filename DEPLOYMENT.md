# Quick Deployment Guide

## Fastest Way: Netlify Drag & Drop (2 minutes)

1. Go to https://www.netlify.com
2. Sign up (free, use GitHub/Google/Email)
3. On the dashboard, drag your entire `routing-guide` folder
4. Done! You'll get a URL like `amazing-route-123.netlify.app`
5. Customize the URL in Site Settings → Change site name

## Using Git + Netlify (For Automatic Updates)

### Step 1: Create GitHub Repository

```bash
cd routing-guide
git init
git add .
git commit -m "Initial commit: Multi-stop routing guide"
git branch -M main
```

Then create a new repository on GitHub.com and push:
```bash
git remote add origin https://github.com/YOUR-USERNAME/routing-guide.git
git push -u origin main
```

### Step 2: Deploy to Netlify

1. Go to https://www.netlify.com and login
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select your `routing-guide` repository
5. Settings should auto-detect (build command: none, publish directory: `.`)
6. Click "Deploy site"

Now every time you push to GitHub, Netlify will automatically redeploy!

## Alternative: Vercel (Just as Easy)

### Command Line Method:
```bash
npm i -g vercel
cd routing-guide
vercel
```

### Web Interface Method:
1. Go to https://vercel.com
2. Sign up/login
3. Click "Add New..." → "Project"
4. Import from GitHub or drag & drop your folder
5. Deploy!

## Alternative: GitHub Pages

1. Push your code to GitHub (see Step 1 above)
2. Go to your repository → Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `main`, Folder: `/ (root)`
5. Click Save
6. Your site: `https://YOUR-USERNAME.github.io/routing-guide`

Note: GitHub Pages URLs are public, so use a private repo if needed.

## Add Custom Domain

After deploying, add your custom domain:

### Netlify:
- Site Settings → Domain management → Add custom domain
- Follow DNS instructions (usually just add a CNAME record)

### Vercel:
- Project Settings → Domains → Add domain
- Follow DNS setup instructions

### GitHub Pages:
- Repository Settings → Pages → Custom domain
- Add CNAME record to your DNS provider

All platforms provide free SSL certificates automatically!

## Troubleshooting

**Map not showing?**
- Make sure you deployed all files (index.html, styles.css, app.js)
- Check browser console for errors
- Some corporate networks block OpenStreetMap tiles

**Geocoding not working?**
- OpenStreetMap Nominatim may be rate-limited
- Wait a minute and try again
- Consider using a geocoding API key for production use

**Need help?**
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- GitHub Pages: https://docs.github.com/pages
