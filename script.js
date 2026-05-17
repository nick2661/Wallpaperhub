// ===== Sample Wallpaper Data =====
const wallpapers = [
    { id: 1, title: "Mountain Sunset", category: "nature", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", views: 15420, downloads: 3240 },
    { id: 2, title: "Abstract Waves", category: "abstract", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800", views: 12350, downloads: 2890 },
    { id: 3, title: "Circuit Board", category: "technology", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", views: 18920, downloads: 4120 },
    { id: 4, title: "Minimal Gradient", category: "minimalist", image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800", views: 22100, downloads: 5340 },
    { id: 5, title: "Dark Forest", category: "dark", image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800", views: 19850, downloads: 4560 },
    { id: 6, title: "Anime Landscape", category: "anime", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", views: 25600, downloads: 6780 },
    { id: 7, title: "Sports Car", category: "cars", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800", views: 31200, downloads: 7890 },
    { id: 8, title: "Galaxy Nebula", category: "space", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800", views: 28400, downloads: 6540 },
    { id: 9, title: "Ocean Waves", category: "nature", image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800", views: 16780, downloads: 3890 },
    { id: 10, title: "Geometric Pattern", category: "abstract", image: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800", views: 14230, downloads: 3120 },
    { id: 11, title: "Neon Lights", category: "technology", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", views: 20150, downloads: 4670 },
    { id: 12, title: "Clean White", category: "minimalist", image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800", views: 17890, downloads: 4230 },
    { id: 13, title: "Night City", category: "dark", image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800", views: 24560, downloads: 5890 },
    { id: 14, title: "Anime Girl", category: "anime", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800", views: 29870, downloads: 7120 },
    { id: 15, title: "Luxury Car", category: "cars", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800", views: 33450, downloads: 8230 },
    { id: 16, title: "Milky Way", category: "space", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800", views: 26780, downloads: 6340 },
    { id: 17, title: "Tropical Beach", category: "nature", image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800", views: 21340, downloads: 5120 },
    { id: 18, title: "Fluid Art", category: "abstract", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800", views: 15670, downloads: 3560 },
    { id: 19, title: "Cyberpunk City", category: "technology", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800", views: 27890, downloads: 6780 },
    { id: 20, title: "Pastel Gradient", category: "minimalist", image: "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=800", views: 19230, downloads: 4560 },
    { id: 21, title: "Starry Night", category: "dark", image: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=800", views: 23450, downloads: 5670 },
    { id: 22, title: "Anime Sunset", category: "anime", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800", views: 28900, downloads: 6890 },
    { id: 23, title: "Racing Car", category: "cars", image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800", views: 30120, downloads: 7340 },
    { id: 24, title: "Planet Earth", category: "space", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800", views: 25340, downloads: 6120 }
];

// ===== State Management =====
let currentFilter = 'all';
let currentPage = 1;
const itemsPerPage = 12;
let selectedResolution = '4k';
let selectedDevice = 'desktop';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentWallpaper = null;

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');
const wallpaperGrid = document.getElementById('wallpaperGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const wallpaperModal = document.getElementById('wallpaperModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalViews = document.getElementById('modalViews');
const modalDownloads = document.getElementById('modalDownloads');
const resolutionBtns = document.querySelectorAll('.resolution-btn');
const deviceBtns = document.querySelectorAll('.device-btn');
const downloadBtn = document.getElementById('downloadBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const userBtn = document.getElementById('userBtn');
const userModal = document.getElementById('userModal');
const userModalOverlay = document.getElementById('userModalOverlay');
const userModalClose = document.getElementById('userModalClose');

// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ===== Mobile Menu =====
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Navigation Link =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== Search Functionality =====
const searchKeywords = ['nature', 'abstract', 'technology', 'minimalist', 'dark', 'anime', 'cars', 'space', 
                        'mountain', 'ocean', 'forest', 'city', 'sunset', 'galaxy', 'gradient', 'neon'];

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    
    if (value.length > 0) {
        const suggestions = searchKeywords.filter(keyword => 
            keyword.includes(value)
        ).slice(0, 5);
        
        if (suggestions.length > 0) {
            searchSuggestions.innerHTML = suggestions.map(suggestion => 
                `<div class="suggestion-item">${suggestion}</div>`
            ).join('');
            searchSuggestions.classList.add('active');
            
            // Add click handlers to suggestions
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.textContent;
                    searchSuggestions.classList.remove('active');
                    performSearch(item.textContent);
                });
            });
        } else {
            searchSuggestions.classList.remove('active');
        }
    } else {
        searchSuggestions.classList.remove('active');
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchSuggestions.classList.remove('active');
    }
});

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
        searchSuggestions.classList.remove('active');
    }
});

function performSearch(query) {
    const searchTerm = query.toLowerCase();
    const filtered = wallpapers.filter(w => 
        w.title.toLowerCase().includes(searchTerm) || 
        w.category.toLowerCase().includes(searchTerm)
    );
    
    wallpaperGrid.innerHTML = '';
    filtered.forEach(wallpaper => {
        wallpaperGrid.appendChild(createWallpaperCard(wallpaper));
    });
    
    if (filtered.length === 0) {
        wallpaperGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No wallpapers found</p>';
    }
}

// ===== Filter Functionality =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        currentPage = 1;
        loadWallpapers();
    });
});

// ===== Category Cards =====
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        currentFilter = category;
        currentPage = 1;
        
        // Update filter buttons
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });
        
        // Scroll to gallery
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
        loadWallpapers();
    });
});

// ===== Create Wallpaper Card =====
function createWallpaperCard(wallpaper) {
    const card = document.createElement('div');
    card.className = 'wallpaper-card';
    card.innerHTML = `
        <img src="${wallpaper.image}" alt="${wallpaper.title}" loading="lazy">
        <div class="wallpaper-overlay">
            <div class="wallpaper-title">${wallpaper.title}</div>
            <div class="wallpaper-category">${wallpaper.category}</div>
        </div>
        <div class="wallpaper-actions">
            <button class="action-btn favorite-action" data-id="${wallpaper.id}">
                <i class="${favorites.includes(wallpaper.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <button class="action-btn download-action" data-id="${wallpaper.id}">
                <i class="fas fa-download"></i>
            </button>
        </div>
    `;
    
    // Open modal on card click
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.wallpaper-actions')) {
            openWallpaperModal(wallpaper);
        }
    });
    
    // Favorite button
    const favoriteAction = card.querySelector('.favorite-action');
    favoriteAction.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(wallpaper.id);
        const icon = favoriteAction.querySelector('i');
        icon.className = favorites.includes(wallpaper.id) ? 'fas fa-heart' : 'far fa-heart';
    });
    
    // Quick download button
    const downloadAction = card.querySelector('.download-action');
    downloadAction.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadWallpaper(wallpaper);
    });
    
    return card;
}

// ===== Load Wallpapers =====
function loadWallpapers() {
    const filtered = currentFilter === 'all' 
        ? wallpapers 
        : wallpapers.filter(w => w.category === currentFilter);
    
    const start = 0;
    const end = currentPage * itemsPerPage;
    const toDisplay = filtered.slice(start, end);
    
    wallpaperGrid.innerHTML = '';
    toDisplay.forEach(wallpaper => {
        wallpaperGrid.appendChild(createWallpaperCard(wallpaper));
    });
    
    // Show/hide load more button
    loadMoreBtn.style.display = end >= filtered.length ? 'none' : 'block';
}

// ===== Load More =====
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    loadWallpapers();
});

// ===== Wallpaper Modal =====
function openWallpaperModal(wallpaper) {
    currentWallpaper = wallpaper;
    modalImage.src = wallpaper.image;
    modalTitle.textContent = wallpaper.title;
    modalCategory.textContent = wallpaper.category.charAt(0).toUpperCase() + wallpaper.category.slice(1);
    modalViews.textContent = wallpaper.views.toLocaleString();
    modalDownloads.textContent = wallpaper.downloads.toLocaleString();
    
    // Update favorite button
    if (favorites.includes(wallpaper.id)) {
        favoriteBtn.classList.add('active');
        favoriteBtn.querySelector('i').className = 'fas fa-heart';
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.querySelector('i').className = 'far fa-heart';
    }
    
    wallpaperModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWallpaperModal() {
    wallpaperModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeWallpaperModal);
modalOverlay.addEventListener('click', closeWallpaperModal);

// ===== Resolution Selection =====
resolutionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        resolutionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedResolution = btn.dataset.resolution;
    });
});

// ===== Device Selection =====
deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        deviceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDevice = btn.dataset.device;
    });
});

// ===== Download Wallpaper =====
downloadBtn.addEventListener('click', () => {
    if (currentWallpaper) {
        downloadWallpaper(currentWallpaper);
    }
});

function downloadWallpaper(wallpaper) {
    // Simulate download
    const resolutions = {
        hd: '1920x1080',
        '2k': '2560x1440',
        '4k': '3840x2160',
        '8k': '7680x4320'
    };
    
    const resolution = resolutions[selectedResolution] || resolutions['4k'];
    
    // In a real application, this would download the actual file
    console.log(`Downloading ${wallpaper.title} in ${resolution} for ${selectedDevice}`);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = wallpaper.image;
    link.download = `${wallpaper.title.replace(/\s+/g, '_')}_${resolution}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('Download started!');
    
    // Update download count
    wallpaper.downloads++;
    if (currentWallpaper && currentWallpaper.id === wallpaper.id) {
        modalDownloads.textContent = wallpaper.downloads.toLocaleString();
    }
}

// ===== Favorites =====
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

favoriteBtn.addEventListener('click', () => {
    if (currentWallpaper) {
        toggleFavorite(currentWallpaper.id);
        favoriteBtn.classList.toggle('active');
        const icon = favoriteBtn.querySelector('i');
        icon.className = favorites.includes(currentWallpaper.id) ? 'fas fa-heart' : 'far fa-heart';
        
        const message = favorites.includes(currentWallpaper.id) 
            ? 'Added to favorites!' 
            : 'Removed from favorites!';
        showNotification(message);
    }
});

// ===== User Modal =====
userBtn.addEventListener('click', () => {
    userModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

userModalClose.addEventListener('click', () => {
    userModal.classList.remove('active');
    document.body.style.overflow = '';
});

userModalOverlay.addEventListener('click', () => {
    userModal.classList.remove('active');
    document.body.style.overflow = '';
});

// ===== Contact Form =====
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully!');
    e.target.reset();
});

// ===== Auth Form =====
document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Sign in functionality coming soon!');
});

// ===== Notification System =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Initialize =====
initTheme();
loadWallpapers();

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        if (wallpaperModal.classList.contains('active')) {
            closeWallpaperModal();
        }
        if (userModal.classList.contains('active')) {
            userModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Focus search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe images as they're added
    const observeImages = () => {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    };
    
    observeImages();
}
