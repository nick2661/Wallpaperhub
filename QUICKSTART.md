# Quick Start Guide

Get your WallpaperHub website up and running in minutes!

## 🚀 5-Minute Setup

### Step 1: Download Files
Download all project files to a folder on your computer.

### Step 2: Open in Browser
Double-click `index.html` to open the website in your default browser.

### Step 3: Explore Features
- Browse wallpapers by category
- Use the search bar to find specific wallpapers
- Click on any wallpaper to view details and download
- Toggle between light and dark themes
- Add wallpapers to favorites

### Step 4: Access Admin Dashboard
Open `admin.html` to access the admin dashboard where you can:
- View statistics
- Upload new wallpapers
- Manage categories
- Track downloads

## 🎨 Quick Customization

### Change Brand Colors
Open `styles.css` and modify these lines (around line 2-10):

```css
:root {
    --primary-color: #2563eb;    /* Change to your brand color */
    --secondary-color: #1e40af;  /* Darker shade of primary */
    --accent-color: #3b82f6;     /* Lighter shade of primary */
}
```

### Update Site Name
1. Open `index.html`
2. Find `<title>` tag (line 7)
3. Replace "WallpaperHub" with your site name
4. Find the logo section (line 18)
5. Replace "WallpaperHub" text

### Add Your Wallpapers
Open `script.js` and find the `wallpapers` array (around line 2):

```javascript
const wallpapers = [
    {
        id: 1,
        title: "Your Wallpaper Title",
        category: "nature",
        image: "path/to/your/image.jpg",
        views: 0,
        downloads: 0
    },
    // Add more wallpapers here
];
```

## 📱 Testing on Mobile

### Option 1: Using Browser DevTools
1. Open the website in Chrome/Firefox
2. Press `F12` to open DevTools
3. Click the device toggle icon (or press `Ctrl+Shift+M`)
4. Select a mobile device from the dropdown

### Option 2: Using Local Network
1. Start a local server:
   ```bash
   python -m http.server 8000
   ```
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. On your mobile device, open browser and go to:
   `http://YOUR_IP_ADDRESS:8000`

## 🎯 Common Tasks

### Adding a New Category

1. **Update HTML** (`index.html`, around line 50):
```html
<div class="category-card" data-category="yourcategory">
    <i class="fas fa-icon-name"></i>
    <span>Your Category</span>
</div>
```

2. **Add Filter Button** (`index.html`, around line 80):
```html
<button class="filter-btn" data-filter="yourcategory">Your Category</button>
```

3. **Add Badge Style** (`admin-styles.css`, around line 300):
```css
.badge-yourcategory { 
    background-color: #yourcolor20; 
    color: #yourcolor; 
}
```

### Changing the Hero Section

Open `index.html` and modify the hero section (around line 90):

```html
<h1 class="hero-title">Your Custom Title</h1>
<p class="hero-subtitle">Your custom subtitle</p>
```

### Updating Contact Information

Open `index.html` and find the contact section (around line 150):

```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>your-email@example.com</span>
</div>
```

## 🔧 Troubleshooting

### Images Not Loading
- Check that image paths are correct
- Ensure you have internet connection (sample images use Unsplash)
- Replace Unsplash URLs with local image paths

### Styles Not Applying
- Clear browser cache (`Ctrl+Shift+Delete`)
- Ensure `styles.css` is in the same folder as `index.html`
- Check browser console for errors (`F12`)

### JavaScript Not Working
- Check browser console for errors (`F12`)
- Ensure `script.js` is in the same folder as `index.html`
- Try a different browser

### Mobile Menu Not Opening
- Clear browser cache
- Check that Font Awesome is loading (requires internet)
- Verify JavaScript is enabled in browser

## 💡 Pro Tips

1. **Use a Local Server**: For best results, use a local web server instead of opening files directly
2. **Optimize Images**: Compress images before uploading to improve load times
3. **Test Responsiveness**: Always test on multiple devices and screen sizes
4. **Backup Regularly**: Keep backups of your customizations
5. **Use Version Control**: Consider using Git to track changes

## 📚 Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Customize colors and branding
3. Add your own wallpapers
4. Set up a backend for user authentication (optional)
5. Deploy to a web hosting service

## 🌐 Deployment Options

### Free Hosting Options
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Free tier with automatic deployments
- **Vercel**: Free hosting with excellent performance
- **Firebase Hosting**: Free tier available

### Quick Deploy to GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript
- [CSS-Tricks](https://css-tricks.com/) - CSS techniques
- [JavaScript.info](https://javascript.info/) - Modern JavaScript
- [Web.dev](https://web.dev/) - Web performance

## 📞 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Contact: contact@wallpaperhub.com

---

**Happy Building! 🎉**
