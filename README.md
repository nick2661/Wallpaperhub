# WallpaperHub - Premium Wallpaper Website

A fully responsive, professional wallpaper website optimized for Android, Windows, iOS, and all devices. Features a modern, elegant UI with smooth animations, multiple categories, and high-resolution downloads.

## 🌟 Features

### User Features
- **Responsive Design**: Seamlessly adapts to mobile, tablet, and desktop devices
- **Modern UI**: Minimalist design with smooth animations and transitions
- **Multiple Categories**: Nature, Abstract, Technology, Minimalist, Dark Mode, Anime, Cars, Space
- **High-Resolution Downloads**: HD, 2K, 4K, and 8K resolutions available
- **Device-Specific Formats**: Optimized downloads for Android, Windows, iOS, and Desktop
- **Smart Search**: Auto-suggestions and keyword tagging
- **Dark/Light Theme**: Toggle between themes for personalized experience
- **User Accounts**: Save favorites and create collections (coming soon)
- **Fast Performance**: Optimized images and lazy loading for quick page loads

### Admin Features
- **Dashboard**: Real-time statistics and analytics
- **Upload Management**: Drag-and-drop wallpaper uploads
- **Category Management**: Organize and manage wallpaper categories
- **User Management**: Track user activity and downloads
- **Analytics**: View download trends and popular wallpapers
- **Responsive Admin Panel**: Manage content from any device

## 📁 Project Structure

```
wallpaper-website/
├── index.html              # Main website homepage
├── admin.html              # Admin dashboard
├── styles.css              # Main website styles
├── admin-styles.css        # Admin dashboard styles
├── script.js               # Main website functionality
├── admin-script.js         # Admin dashboard functionality
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or Download** the project files to your local machine

2. **Open the website**:
   - Simply open `index.html` in your web browser, or
   - Use a local web server for better performance:
   
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the website**:
   - Main Website: `http://localhost:8000/index.html`
   - Admin Dashboard: `http://localhost:8000/admin.html`

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css` to customize the color scheme:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #1e40af;    /* Secondary brand color */
    --accent-color: #3b82f6;       /* Accent color */
    /* ... more variables */
}
```

### Categories
Add or modify categories in `script.js`:

```javascript
const categories = [
    { name: 'nature', icon: 'fa-tree' },
    { name: 'abstract', icon: 'fa-palette' },
    // Add more categories here
];
```

### Wallpapers
Update the wallpaper data in `script.js`:

```javascript
const wallpapers = [
    {
        id: 1,
        title: "Your Wallpaper Title",
        category: "nature",
        image: "path/to/image.jpg",
        views: 0,
        downloads: 0
    },
    // Add more wallpapers here
];
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: > 1024px

## 🎯 Key Features Explained

### Search Functionality
- Real-time search suggestions
- Keyword-based filtering
- Category-specific searches
- Keyboard shortcut: `Ctrl/Cmd + K`

### Download System
- Multiple resolution options (HD, 2K, 4K, 8K)
- Device-specific optimization
- One-click download
- Download tracking

### Theme Toggle
- Persistent theme preference (saved in localStorage)
- Smooth transition between themes
- Optimized for both light and dark modes

### Favorites System
- Save favorite wallpapers
- Persistent storage using localStorage
- Quick access to saved wallpapers

### Admin Dashboard
- Real-time statistics
- Upload new wallpapers
- Manage categories
- Track downloads and views
- User management
- Analytics and reporting

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📊 Performance Optimization

- **Lazy Loading**: Images load as they enter the viewport
- **Optimized Images**: Compressed and properly sized images
- **CSS Animations**: Hardware-accelerated transitions
- **Minimal JavaScript**: Efficient, vanilla JavaScript (no heavy frameworks)
- **CDN Resources**: Font Awesome loaded from CDN

## 🔐 Security Features

- Input validation on forms
- XSS protection
- Secure file upload handling (admin)
- HTTPS recommended for production

## 🌐 SEO Optimization

- Semantic HTML5 structure
- Meta tags for search engines
- Optimized page titles and descriptions
- Alt text for all images
- Fast loading times
- Mobile-friendly design

## 📝 Future Enhancements

- [ ] User authentication and registration
- [ ] Backend API integration
- [ ] Database for wallpaper storage
- [ ] Advanced search filters
- [ ] User-generated content
- [ ] Social sharing features
- [ ] Wallpaper collections
- [ ] AI-powered recommendations
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Development

### Adding New Wallpapers

1. Add wallpaper data to the `wallpapers` array in `script.js`
2. Ensure images are optimized for web
3. Include proper metadata (title, category, tags)

### Creating New Categories

1. Add category to HTML in `index.html`
2. Add category to filter buttons
3. Update category styles in `styles.css`
4. Add category badge styles in `admin-styles.css`

### Customizing the Admin Dashboard

1. Modify `admin.html` for layout changes
2. Update `admin-styles.css` for styling
3. Extend `admin-script.js` for new functionality

## 🐛 Known Issues

- Sample images are loaded from Unsplash (requires internet connection)
- Download functionality simulates downloads (needs backend integration)
- User authentication is placeholder (needs backend implementation)

## 📞 Support

For support, email contact@wallpaperhub.com or open an issue in the repository.

## 🙏 Acknowledgments

- Font Awesome for icons
- Unsplash for sample images
- Google Fonts for typography

---

**Made with ❤️ for wallpaper enthusiasts**

## ➕ Adding wallpapers (v2)

Edit the `wallpapers` array at the top of `script.js`.

- **Photo**: `{ id: 39, title: "My Photo", category: "nature", image: "https://images.unsplash.com/photo-XXXX?w=800", views: 0, downloads: 0 }`
  Unsplash URLs are resized automatically for phone/desktop and for each download resolution. If an image URL 404s the card hides itself.
- **Live (code-drawn)**: `{ id: 109, title: "X", category: "live", type: "live", engine: "aurora", views: 0, downloads: 0 }`
  Engines are in `live.js` (`aurora, warp, matrix, waves, constellation, bokeh, lava, sakura`). Add your own by adding a function to `LIVE_ENGINES`.
- **Live (video file)**: put an `.mp4`/`.webm` in a `videos/` folder, then
  `{ id: 201, title: "Rain", category: "live", type: "video", video: "videos/rain.mp4", poster: "videos/rain.jpg", views: 0, downloads: 0 }`
  Keep clips short (5–15 s, under ~5 MB) so they load fast on mobile data.
