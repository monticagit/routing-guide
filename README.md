# Multi-Stop Routing Guide

A modern, interactive web application for creating and managing multi-stop routes with automatic optimization and re-sequencing capabilities.

## Features

- ✅ **Add Multiple Stops**: Easily add stops by entering addresses or location names
- 🔄 **Re-sequence Routes**: Drag and drop stops to reorder, or use up/down buttons
- 🎯 **Auto-Optimize**: Automatically optimize route order using nearest-neighbor algorithm for shortest distance
- 🗺️ **Interactive Map**: Visualize your route on an interactive map with markers and route lines
- 💾 **Auto-Save**: Routes are automatically saved to browser localStorage
- 📊 **Route Summary**: View total distance, estimated time, and number of stops
- 📥 **Export Routes**: Export your route as JSON for external use
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Option 1: Direct File Opening
Simply open `index.html` in a modern web browser. No build process required!

### Option 2: Local Server (Recommended)
For best results, especially with map functionality, run a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in your browser.

## How to Use

1. **Add Stops**: Enter a stop name or address in the input field and click "Add Stop"
2. **Reorder Stops**: 
   - Drag and drop stops to reorder them
   - Or use the ↑ and ↓ buttons on each stop
3. **Optimize Route**: Click "Auto-Optimize Route" to automatically arrange stops for the shortest distance
4. **View on Map**: The route automatically displays on the map as you add stops
5. **Export**: Click "Export Route" to download your route as a JSON file

## Route Optimization

The application uses a **Nearest Neighbor algorithm** for route optimization:
- Starts with the first stop
- Finds the nearest unvisited stop
- Continues until all stops are visited
- Results in a reasonably short route (though not necessarily the absolute shortest)

## Technical Details

- **Pure JavaScript**: No frameworks required
- **Leaflet.js**: Interactive map library
- **OpenStreetMap**: Free map tiles
- **Nominatim API**: Free geocoding service (no API key needed)
- **LocalStorage**: Automatic saving of routes

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Notes

- Geocoding uses OpenStreetMap's Nominatim service, which is free but has rate limits for heavy usage
- The route optimization assumes straight-line distances between stops
- Stops without valid addresses will be placed at the end of optimized routes

## Deployment - Get Your Own URL

This is a static website, so it's very easy to deploy to various free hosting platforms. Here are the best options:

### Option 1: Netlify (Easiest - Recommended) ⭐

**Method A: Drag and Drop (Fastest)**
1. Go to [netlify.com](https://www.netlify.com) and sign up for a free account
2. Drag and drop your entire `routing-guide` folder onto the Netlify dashboard
3. Your site will be live instantly with a URL like `your-site-name.netlify.app`
4. You can customize the URL name in site settings

**Method B: Git Integration (Best for updates)**
1. Push your code to GitHub (see GitHub Pages section below)
2. Go to [netlify.com](https://www.netlify.com) and sign up
3. Click "New site from Git" → Choose GitHub → Select your repository
4. Netlify will auto-detect settings and deploy
5. Every time you push to GitHub, your site updates automatically

### Option 2: Vercel (Also Very Easy)

1. Install Vercel CLI: `npm i -g vercel` (or use `npx vercel`)
2. In your `routing-guide` folder, run: `vercel`
3. Follow the prompts (it will auto-detect settings)
4. Your site will be live at `your-site-name.vercel.app`

Or use the web interface:
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project" → Import from GitHub (or drag & drop)
3. Deploy!

### Option 3: GitHub Pages (Free with GitHub account)

1. **Create a GitHub repository:**
   ```bash
   cd routing-guide
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/routing-guide.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
   - Your site will be at: `https://YOUR-USERNAME.github.io/routing-guide`

### Option 4: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign up/login (free)
3. Click "Create a project" → "Connect to Git"
4. Connect your GitHub repository (or drag & drop)
5. Build settings:
   - Framework preset: "None" (static site)
   - Build command: (leave empty)
   - Build output directory: `.` (current directory)
6. Deploy!

### Option 5: Surge.sh (Command Line)

1. Install Surge: `npm install -g surge`
2. In your `routing-guide` folder: `surge`
3. Follow prompts to create account and choose domain
4. Your site will be at `your-site-name.surge.sh`

### Custom Domain

All these platforms support custom domains:
- **Netlify/Vercel**: Free SSL, easy DNS setup in dashboard
- **GitHub Pages**: Free SSL, requires DNS configuration
- **Cloudflare Pages**: Free SSL, integrated with Cloudflare DNS

Just add your custom domain in the platform's settings after deployment.

### Quick Comparison

| Platform | Ease | Speed | Custom Domain | Auto-Deploy |
|----------|------|-------|---------------|-------------|
| Netlify  | ⭐⭐⭐ | Fast | ✅ Free | ✅ Yes |
| Vercel   | ⭐⭐⭐ | Fast | ✅ Free | ✅ Yes |
| GitHub Pages | ⭐⭐ | Medium | ✅ Free | ✅ Yes |
| Cloudflare Pages | ⭐⭐ | Fast | ✅ Free | ✅ Yes |
| Surge    | ⭐⭐ | Fast | ✅ Free | ❌ No |

**Recommendation:** Start with **Netlify** (drag & drop method) for the fastest deployment!

## License

Free to use and modify for personal or commercial projects.
