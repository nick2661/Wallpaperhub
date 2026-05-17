# Deployment Guide

This guide will help you deploy WallpaperHub to various hosting platforms.

## 🚀 Quick Deployment Options

### Option 1: GitHub Pages (Free)

1. **Create a GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/wallpaperhub.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select `main` branch as source
   - Click Save
   - Your site will be live at: `https://yourusername.github.io/wallpaperhub`

3. **Custom Domain (Optional)**
   - Add a `CNAME` file with your domain
   - Configure DNS settings with your domain provider

### Option 2: Netlify (Free)

1. **Via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

2. **Via Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site"
   - Connect your Git repository
   - Deploy settings:
     - Build command: (leave empty)
     - Publish directory: `/`
   - Click "Deploy site"

3. **Custom Domain**
   - Go to Domain settings
   - Add custom domain
   - Configure DNS

### Option 3: Vercel (Free)

1. **Via Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Click "Deploy"

### Option 4: Firebase Hosting (Free Tier)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project" or create new
   - Set public directory to: `.`
   - Configure as single-page app: `No`
   - Don't overwrite index.html

3. **Deploy**
   ```bash
   firebase deploy
   ```

### Option 5: Traditional Web Hosting

1. **Via FTP/SFTP**
   - Use FileZilla, Cyberduck, or similar
   - Connect to your hosting server
   - Upload all files to public_html or www directory

2. **Via cPanel**
   - Login to cPanel
   - Go to File Manager
   - Navigate to public_html
   - Upload all files
   - Extract if uploaded as zip

## 🔧 Pre-Deployment Checklist

### 1. Update Configuration

**Update Contact Information** (index.html, privacy.html, terms.html):
```html
<!-- Replace with your actual contact info -->
<span>your-email@example.com</span>
<span>+1 (555) 123-4567</span>
```

**Update Social Media Links** (index.html):
```html
<a href="https://facebook.com/yourpage" class="social-link">
<a href="https://twitter.com/yourhandle" class="social-link">
<a href="https://instagram.com/yourhandle" class="social-link">
```

**Update Site Name** (all HTML files):
```html
<title>Your Site Name - Premium HD Wallpapers</title>
```

### 2. Optimize Images

If using custom images:
```bash
# Install image optimization tools
npm install -g imagemin-cli

# Optimize images
imagemin images/*.jpg --out-dir=images/optimized
```

### 3. Add Analytics (Optional)

**Google Analytics:**
Add before closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 4. Add Favicon

Create and add favicon files:
```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### 5. Create robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

### 6. Create sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/privacy.html</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://yoursite.com/terms.html</loc>
    <lastmod>2026-05-17</lastmod>
    <priority>0.5</priority>
  </url>
</urlset>
```

## 🔒 Security Recommendations

### 1. HTTPS Configuration

Ensure your hosting provider supports HTTPS. Most modern hosts provide free SSL certificates via Let's Encrypt.

### 2. Security Headers

Add to `.htaccess` (Apache) or server configuration:
```apache
# Security Headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"
```

### 3. Admin Protection

For production, add authentication to admin.html:
- Use server-side authentication
- Implement login system
- Restrict access by IP (optional)

## ⚡ Performance Optimization

### 1. Enable Compression

Add to `.htaccess`:
```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### 2. Browser Caching

Add to `.htaccess`:
```apache
# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. CDN Integration (Optional)

Consider using a CDN for static assets:
- Cloudflare (Free tier available)
- AWS CloudFront
- Google Cloud CDN

## 🧪 Testing Before Deployment

### 1. Local Testing
```bash
# Test with local server
python -m http.server 8000
# Visit http://localhost:8000
```

### 2. Responsive Testing
- Test on multiple devices
- Use browser DevTools device emulation
- Test on real mobile devices

### 3. Browser Testing
- Chrome
- Firefox
- Safari
- Edge

### 4. Performance Testing
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 5. SEO Testing
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

## 📊 Post-Deployment

### 1. Submit to Search Engines

**Google:**
- Submit sitemap to Google Search Console
- Request indexing for main pages

**Bing:**
- Submit sitemap to Bing Webmaster Tools

### 2. Monitor Performance

Set up monitoring:
- Google Analytics for traffic
- Google Search Console for SEO
- Uptime monitoring (UptimeRobot, Pingdom)

### 3. Regular Maintenance

- Update content regularly
- Monitor for broken links
- Check performance metrics
- Update dependencies
- Backup regularly

## 🐛 Troubleshooting

### Issue: Images Not Loading
**Solution:** Check image paths are relative and correct

### Issue: Styles Not Applying
**Solution:** Clear browser cache, check CSS file path

### Issue: JavaScript Not Working
**Solution:** Check browser console for errors, verify script.js path

### Issue: Mobile Menu Not Working
**Solution:** Ensure Font Awesome is loading, check JavaScript console

### Issue: Theme Not Persisting
**Solution:** Check localStorage is enabled in browser

## 📱 Progressive Web App (Optional)

To convert to PWA, add:

1. **manifest.json**
```json
{
  "name": "WallpaperHub",
  "short_name": "WallpaperHub",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **Service Worker** (sw.js)
```javascript
const CACHE_NAME = 'wallpaperhub-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

## 🎉 Launch Checklist

- [ ] All contact information updated
- [ ] Social media links configured
- [ ] Analytics installed
- [ ] Favicon added
- [ ] robots.txt created
- [ ] sitemap.xml created
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Performance optimized
- [ ] Tested on multiple devices
- [ ] Tested on multiple browsers
- [ ] SEO optimized
- [ ] Submitted to search engines
- [ ] Monitoring set up

## 📞 Support

If you encounter issues during deployment:
- Check hosting provider documentation
- Review error logs
- Test locally first
- Contact hosting support

---

**Ready to launch? Follow this guide step by step for a successful deployment! 🚀**
