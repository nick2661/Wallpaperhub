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
    { id: 24, title: "Planet Earth", category: "space", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800", views: 25340, downloads: 6120 },
    // --- More photos (ids 25+). Unsplash photo IDs: if one ever 404s the card hides itself automatically. ---
    { id: 25, title: "Sunlit Forest", category: "nature", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800", views: 18200, downloads: 4010 },
    { id: 26, title: "Foggy Peaks", category: "nature", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800", views: 17400, downloads: 3920 },
    { id: 27, title: "Alpine Lake", category: "nature", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800", views: 20100, downloads: 4650 },
    { id: 28, title: "Green Valley", category: "nature", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800", views: 15900, downloads: 3300 },
    { id: 29, title: "Earth from Orbit", category: "space", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800", views: 27300, downloads: 6600 },
    { id: 30, title: "Deep Space", category: "space", image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800", views: 22800, downloads: 5200 },
    { id: 31, title: "Moonlit Night", category: "dark", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800", views: 21700, downloads: 5000 },
    { id: 32, title: "City Skyline", category: "dark", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800", views: 19600, downloads: 4400 },
    { id: 33, title: "Color Flow", category: "abstract", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800", views: 16200, downloads: 3700 },
    { id: 34, title: "Soft Abstract", category: "abstract", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800", views: 14800, downloads: 3250 },
    { id: 35, title: "Neon Gradient", category: "minimalist", image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800", views: 18400, downloads: 4150 },
    { id: 36, title: "Muscle Car", category: "cars", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800", views: 29100, downloads: 7000 },
    { id: 37, title: "Coupe at Dusk", category: "cars", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800", views: 28200, downloads: 6800 },
    { id: 38, title: "Code Editor", category: "technology", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", views: 17700, downloads: 3900 },

    // --- LIVE wallpapers: drawn in real time by live.js (no image files needed) ---
    { id: 101, title: "Aurora Borealis", category: "live", type: "live", engine: "aurora", views: 41200, downloads: 9800 },
    { id: 102, title: "Warp Speed", category: "live", type: "live", engine: "warp", views: 38900, downloads: 9100 },
    { id: 103, title: "Matrix Rain", category: "live", type: "live", engine: "matrix", views: 44300, downloads: 10400 },
    { id: 104, title: "Neon Sunset", category: "live", type: "live", engine: "waves", views: 36700, downloads: 8700 },
    { id: 105, title: "Constellation", category: "live", type: "live", engine: "constellation", views: 29800, downloads: 6900 },
    { id: 106, title: "Bokeh Lights", category: "live", type: "live", engine: "bokeh", views: 27600, downloads: 6300 },
    { id: 107, title: "Lava Lamp", category: "live", type: "live", engine: "lava", views: 33100, downloads: 7600 },
    { id: 108, title: "Sakura Fall", category: "live", type: "live", engine: "sakura", views: 35400, downloads: 8200 }

    // --- VIDEO live wallpapers: drop an .mp4/.webm into /videos and add a line like this:
    // { id: 201, title: "Rainy Window", category: "live", type: "video", video: "videos/rain.mp4", poster: "videos/rain.jpg", views: 0, downloads: 0 },
];

// ===== State Management =====
let currentFilter = 'all';
let currentQuery = '';
let currentPage = 1;
const itemsPerPage = 12;
let selectedResolution = '4k';
let selectedDevice = 'desktop';
let favorites = safeJSON(localStorage, 'favorites', []);
let currentWallpaper = null;

const phoneMQ = window.matchMedia('(max-width: 600px)');
let viewMode = safeGet('viewMode') || (phoneMQ.matches ? 'phone' : 'desktop'); // 'phone' = portrait cards

function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function safeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* private mode */ } }
function safeJSON(_, key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; } }

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const resultCount = document.getElementById('resultCount');
const categoryCards = document.querySelectorAll('.category-card');
const wallpaperGrid = document.getElementById('wallpaperGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const wallpaperModal = document.getElementById('wallpaperModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalMedia = document.getElementById('modalMedia');
const modalImage = document.getElementById('modalImage');
const modalCanvas = document.getElementById('modalCanvas');
const modalVideo = document.getElementById('modalVideo');
const previewFsBtn = document.getElementById('previewFsBtn');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalViews = document.getElementById('modalViews');
const modalDownloads = document.getElementById('modalDownloads');
const liveNote = document.getElementById('liveNote');
const downloadLabel = document.getElementById('downloadLabel');
const resolutionBtns = document.querySelectorAll('.resolution-btn');
const deviceBtns = document.querySelectorAll('.device-btn');
const downloadBtn = document.getElementById('downloadBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const userBtn = document.getElementById('userBtn');
const userModal = document.getElementById('userModal');
const userModalOverlay = document.getElementById('userModalOverlay');
const userModalClose = document.getElementById('userModalClose');

// ===== Helpers =====
const RESOLUTIONS = { hd: [1920, 1080], '2k': [2560, 1440], '4k': [3840, 2160], '8k': [7680, 4320] };
const isPortraitDevice = d => d === 'android' || d === 'ios';
const typeOf = w => w.type || 'image';

// Unsplash lets us ask for an exact crop/size, so thumbnails are small and downloads are real resolutions.
function imgUrl(url, w, h) {
    if (!/images\.unsplash\.com/.test(url)) return url;
    return `${url.split('?')[0]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = safeGet('theme') || 'light';
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
    safeSet('theme', newTheme);
    updateThemeIcon(newTheme);
});

// ===== Mobile Menu =====
function setMenu(open) {
    navLinks.classList.toggle('active', open);
    mobileMenuToggle.setAttribute('aria-expanded', String(open));
    mobileMenuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenuToggle.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
    document.body.classList.toggle('menu-open', open);
}
mobileMenuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
window.addEventListener('resize', () => { if (window.innerWidth > 768) setMenu(false); });

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== Active Navigation Link =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== Search Functionality =====
const searchKeywords = ['nature', 'abstract', 'technology', 'minimalist', 'dark', 'anime', 'cars', 'space', 'live',
                        'mountain', 'ocean', 'forest', 'city', 'sunset', 'galaxy', 'gradient', 'neon',
                        'aurora', 'matrix', 'sakura', 'bokeh', 'lava', 'moon', 'earth'];

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();

    if (value.length > 0) {
        const suggestions = searchKeywords.filter(keyword => keyword.includes(value)).slice(0, 5);

        if (suggestions.length > 0) {
            searchSuggestions.innerHTML = suggestions.map(suggestion =>
                `<div class="suggestion-item">${suggestion}</div>`
            ).join('');
            searchSuggestions.classList.add('active');
            searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
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
        if (currentQuery) performSearch('');
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        searchSuggestions.classList.remove('active');
    }
});

// Search on Enter key / search button
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
        searchSuggestions.classList.remove('active');
        searchInput.blur(); // closes the phone keyboard
    }
});
document.querySelector('.search-btn').addEventListener('click', () => {
    performSearch(searchInput.value);
    searchSuggestions.classList.remove('active');
});

function setActiveFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
    const active = document.querySelector('.filter-btn.active');
    if (active && active.scrollIntoView) active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}

function performSearch(query) {
    currentQuery = query.trim().toLowerCase();
    currentFilter = 'all';
    setActiveFilter('all');
    currentPage = 1;
    loadWallpapers();
    if (currentQuery) document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
}

// ===== Filter Functionality =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentQuery = ''; searchInput.value = '';
        setActiveFilter(btn.dataset.filter);
        currentPage = 1;
        loadWallpapers();
    });
});

// ===== Category Cards =====
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        currentQuery = ''; searchInput.value = '';
        setActiveFilter(card.dataset.category);
        currentPage = 1;
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
        loadWallpapers();
    });
});

// ===== Phone / Desktop preview shape =====
function setViewMode(mode, remember) {
    viewMode = mode;
    if (remember) safeSet('viewMode', mode);
    viewBtns.forEach(b => b.classList.toggle('active', b.dataset.view === mode));
    loadWallpapers();
}
viewBtns.forEach(b => b.addEventListener('click', () => setViewMode(b.dataset.view, true)));
// Follow the screen size until the visitor picks a shape themselves
phoneMQ.addEventListener('change', e => { if (!safeGet('viewMode')) setViewMode(e.matches ? 'phone' : 'desktop', false); });

// ===== Live wallpaper cards: only animate what is on screen (saves battery) =====
const livePlayers = new Map(); // element -> LivePlayer
const mediaObserver = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const el = entry.target;
        if (el.tagName === 'VIDEO') {
            if (entry.isIntersecting) { const p = el.play(); if (p && p.catch) p.catch(() => {}); } else el.pause();
            return;
        }
        const player = livePlayers.get(el);
        if (!player) return;
        if (entry.isIntersecting) { player.resize(); player.start(); } else player.stop();
    });
}, { rootMargin: '100px' }) : null;

function disposeCards() {
    livePlayers.forEach((p, el) => { p.stop(); if (mediaObserver) mediaObserver.unobserve(el); });
    livePlayers.clear();
    wallpaperGrid.querySelectorAll('video').forEach(v => mediaObserver && mediaObserver.unobserve(v));
}

// ===== Create Wallpaper Card =====
function createWallpaperCard(wallpaper) {
    const type = typeOf(wallpaper);
    const portrait = viewMode === 'phone';
    const card = document.createElement('div');
    card.className = 'wallpaper-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${wallpaper.title}, open details`);

    let media = '';
    if (type === 'live') {
        media = '<canvas class="card-canvas"></canvas>';
    } else if (type === 'video') {
        media = `<video class="card-video" src="${wallpaper.video}" ${wallpaper.poster ? `poster="${wallpaper.poster}"` : ''} muted loop playsinline preload="metadata"></video>`;
    } else {
        const src = portrait ? imgUrl(wallpaper.image, 480, 853) : imgUrl(wallpaper.image, 800, 450);
        media = `<img src="${src}" alt="${wallpaper.title}" loading="lazy" decoding="async">`;
    }

    card.innerHTML = `
        ${media}
        ${type !== 'image' ? '<span class="live-badge"><i></i>LIVE</span>' : ''}
        <div class="wallpaper-overlay">
            <div class="wallpaper-title">${wallpaper.title}</div>
            <div class="wallpaper-category">${wallpaper.category}</div>
        </div>
        <div class="wallpaper-actions">
            <button class="action-btn favorite-action" data-id="${wallpaper.id}" aria-label="Favorite ${wallpaper.title}">
                <i class="${favorites.includes(wallpaper.id) ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <button class="action-btn download-action" data-id="${wallpaper.id}" aria-label="Download ${wallpaper.title}">
                <i class="fas fa-download"></i>
            </button>
        </div>
    `;

    // Broken image (e.g. a removed Unsplash photo): drop the card instead of showing a hole
    const img = card.querySelector('img');
    if (img) img.addEventListener('error', () => { card.remove(); updateCount(); });

    if (type === 'live' && mediaObserver) {
        const canvas = card.querySelector('canvas');
        livePlayers.set(canvas, new LivePlayer(canvas, wallpaper.engine, { maxDpr: 1 }));
        mediaObserver.observe(canvas);
    } else if (type === 'video' && mediaObserver) {
        mediaObserver.observe(card.querySelector('video'));
    } else if (type === 'live') {
        const canvas = card.querySelector('canvas');
        const p = new LivePlayer(canvas, wallpaper.engine, { maxDpr: 1 }); livePlayers.set(canvas, p); p.start();
    }

    card.addEventListener('click', (e) => {
        if (!e.target.closest('.wallpaper-actions')) openWallpaperModal(wallpaper);
    });
    card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === card) { e.preventDefault(); openWallpaperModal(wallpaper); }
    });

    const favoriteAction = card.querySelector('.favorite-action');
    favoriteAction.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(wallpaper.id);
        favoriteAction.querySelector('i').className = favorites.includes(wallpaper.id) ? 'fas fa-heart' : 'far fa-heart';
    });

    card.querySelector('.download-action').addEventListener('click', (e) => {
        e.stopPropagation();
        downloadWallpaper(wallpaper, true);
    });

    return card;
}

// ===== Load Wallpapers =====
function getFiltered() {
    return wallpapers.filter(w =>
        (currentFilter === 'all' || w.category === currentFilter) &&
        (!currentQuery || w.title.toLowerCase().includes(currentQuery) || w.category.toLowerCase().includes(currentQuery) ||
            (w.type === 'live' && currentQuery === 'live'))
    );
}

function loadWallpapers() {
    const filtered = getFiltered();
    const end = currentPage * itemsPerPage;
    const toDisplay = filtered.slice(0, end);

    disposeCards();
    wallpaperGrid.classList.toggle('portrait', viewMode === 'phone');
    wallpaperGrid.innerHTML = '';
    toDisplay.forEach(wallpaper => wallpaperGrid.appendChild(createWallpaperCard(wallpaper)));

    if (filtered.length === 0) {
        wallpaperGrid.innerHTML = '<p class="empty-state">No wallpapers found. Try another word or category.</p>';
    }
    loadMoreBtn.style.display = end >= filtered.length ? 'none' : 'block';
    resultCount.textContent = `${filtered.length} wallpaper${filtered.length === 1 ? '' : 's'}`;
}

function updateCount() {
    // after a broken image removed its card, keep the visible count honest
    if (loadMoreBtn.style.display !== 'none') return;
    const n = wallpaperGrid.querySelectorAll('.wallpaper-card').length;
    resultCount.textContent = `${n} wallpaper${n === 1 ? '' : 's'}`;
}

// ===== Load More =====
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    loadWallpapers();
});

// ===== Wallpaper Modal =====
let modalPlayer = null;
let modalResizeObs = null;

function stopModalMedia() {
    if (modalPlayer) { modalPlayer.stop(); modalPlayer = null; }
    if (modalResizeObs) { modalResizeObs.disconnect(); modalResizeObs = null; }
    modalVideo.pause(); modalVideo.removeAttribute('src'); modalVideo.load();
    modalImage.removeAttribute('src');
}

function updateResolutionLabels() {
    const portrait = isPortraitDevice(selectedDevice);
    const live = currentWallpaper && typeOf(currentWallpaper) === 'live';
    const video = currentWallpaper && typeOf(currentWallpaper) === 'video';
    resolutionBtns.forEach(btn => {
        const [lw, lh] = RESOLUTIONS[btn.dataset.resolution];
        const [w, h] = portrait ? [lh, lw] : [lw, lh];
        btn.innerHTML = `<strong>${btn.dataset.resolution.toUpperCase()}</strong><small>${w}×${h}</small>`;
        const unavailable = (live && (btn.dataset.resolution === '4k' || btn.dataset.resolution === '8k')) || video;
        btn.disabled = !!unavailable;
        btn.classList.toggle('disabled', !!unavailable);
    });
    if (live && (selectedResolution === '4k' || selectedResolution === '8k')) selectedResolution = 'hd';
    resolutionBtns.forEach(b => b.classList.toggle('active', b.dataset.resolution === selectedResolution && !b.disabled));
    liveNote.hidden = !live;
    liveNote.textContent = 'Live wallpapers download as a 10-second looping video (HD or 2K).';
    document.querySelector('.resolution-selector').hidden = !!video;
}

function updateModalPreview() {
    const w = currentWallpaper;
    const portrait = isPortraitDevice(selectedDevice);
    const type = typeOf(w);
    modalMedia.classList.toggle('portrait', portrait);
    modalImage.hidden = type !== 'image';
    modalCanvas.hidden = type !== 'live';
    modalVideo.hidden = type !== 'video';

    if (type === 'image') {
        const [pw, ph] = portrait ? [720, 1280] : [1280, 720];
        modalImage.src = imgUrl(w.image, pw, ph);
        modalImage.alt = w.title;
    } else if (type === 'live') {
        if (!modalPlayer) {
            modalPlayer = new LivePlayer(modalCanvas, w.engine, { maxDpr: 1.5 });
            if ('ResizeObserver' in window) {
                modalResizeObs = new ResizeObserver(() => modalPlayer && modalPlayer.resize());
                modalResizeObs.observe(modalCanvas);
            }
            modalPlayer.start();
        } else { requestAnimationFrame(() => modalPlayer && modalPlayer.resize()); }
    } else if (type === 'video') {
        if (modalVideo.getAttribute('src') !== w.video) {
            modalVideo.src = w.video;
            if (w.poster) modalVideo.poster = w.poster;
            const p = modalVideo.play(); if (p && p.catch) p.catch(() => {});
        }
    }
    downloadLabel.textContent = type === 'image' ? 'Download' : 'Download video';
}

function openWallpaperModal(wallpaper) {
    stopModalMedia();
    currentWallpaper = wallpaper;
    modalTitle.textContent = wallpaper.title;
    modalCategory.textContent = wallpaper.category.charAt(0).toUpperCase() + wallpaper.category.slice(1);
    modalViews.textContent = wallpaper.views.toLocaleString();
    modalDownloads.textContent = wallpaper.downloads.toLocaleString();

    // Default device to match the shape the visitor is browsing in
    selectedDevice = viewMode === 'phone' ? 'android' : 'desktop';
    deviceBtns.forEach(b => b.classList.toggle('active', b.dataset.device === selectedDevice));

    setFavoriteButton();
    updateResolutionLabels();

    wallpaperModal.classList.add('active');
    document.body.classList.add('modal-open');
    updateModalPreview();
    wallpaperModal.querySelector('.modal-body').scrollTop = 0;
}

function closeWallpaperModal() {
    exitPreview();
    wallpaperModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    stopModalMedia();
}

modalClose.addEventListener('click', closeWallpaperModal);
modalOverlay.addEventListener('click', closeWallpaperModal);

// Full screen preview (CSS based, so it also works on iPhone Safari)
function exitPreview() { modalMedia.classList.remove('fullscreen'); document.body.classList.remove('preview-open'); }
previewFsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const on = !modalMedia.classList.contains('fullscreen');
    modalMedia.classList.toggle('fullscreen', on);
    document.body.classList.toggle('preview-open', on);
    if (modalPlayer) requestAnimationFrame(() => modalPlayer && modalPlayer.resize());
});
modalMedia.addEventListener('click', () => { if (modalMedia.classList.contains('fullscreen')) { exitPreview(); if (modalPlayer) requestAnimationFrame(() => modalPlayer && modalPlayer.resize()); } });

// ===== Resolution Selection =====
resolutionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.disabled) return;
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
        updateResolutionLabels();
        if (currentWallpaper) updateModalPreview();
    });
});

// ===== Download Wallpaper =====
downloadBtn.addEventListener('click', () => {
    if (currentWallpaper) downloadWallpaper(currentWallpaper, false);
});

function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
}

const slug = t => t.replace(/[^\w]+/g, '_').replace(/^_|_$/g, '');
let busyDownload = false;

async function downloadWallpaper(wallpaper, quick) {
    if (busyDownload) { showNotification('Please wait, a download is in progress'); return; }
    const type = typeOf(wallpaper);
    // Quick (card) downloads use the shape the visitor is browsing in; modal uses the chosen device
    const device = quick ? (viewMode === 'phone' ? 'android' : 'desktop') : selectedDevice;
    const resKey = quick && type === 'live' ? 'hd' : selectedResolution;
    const [lw, lh] = RESOLUTIONS[resKey] || RESOLUTIONS['4k'];
    const [w, h] = isPortraitDevice(device) ? [lh, lw] : [lw, lh];
    const base = `${slug(wallpaper.title)}_${w}x${h}`;

    busyDownload = true;
    try {
        if (type === 'live') {
            if (!window.MediaRecorder) { showNotification('Live download needs a newer browser (try Chrome).'); return; }
            const toast = showNotification('Recording live wallpaper… 0%', { sticky: true });
            try {
                const blob = await recordLiveWallpaper(wallpaper.engine, w, h, 10, p => { toast.el.textContent = `Recording live wallpaper… ${Math.round(p * 100)}%`; });
                toast.close();
                saveBlob(blob, `${base}.${blob.type.includes('mp4') ? 'mp4' : 'webm'}`);
                showNotification('Live wallpaper saved!');
                bumpDownloads(wallpaper);
            } catch (err) {
                toast.close();
                showNotification(err && err.message ? err.message : 'Could not record this wallpaper');
            }
            return;
        }

        const url = type === 'video' ? wallpaper.video : imgUrl(wallpaper.image, w, h);
        showNotification('Download started!');
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('bad response');
            const blob = await res.blob();
            const ext = (blob.type.split('/')[1] || (type === 'video' ? 'mp4' : 'jpg')).split(';')[0].split('+')[0].replace('jpeg', 'jpg');
            saveBlob(blob, `${base}.${ext}`);
        } catch (e) {
            // Cross-origin or offline: let the browser open the file so the visitor can save it
            window.open(url, '_blank', 'noopener');
        }
        bumpDownloads(wallpaper);
    } finally {
        busyDownload = false;
    }
}

function bumpDownloads(wallpaper) {
    wallpaper.downloads++;
    if (currentWallpaper && currentWallpaper.id === wallpaper.id) {
        modalDownloads.textContent = wallpaper.downloads.toLocaleString();
    }
}

// ===== Favorites =====
function toggleFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) favorites.splice(index, 1); else favorites.push(id);
    safeSet('favorites', JSON.stringify(favorites));
}

function setFavoriteButton() {
    const on = currentWallpaper && favorites.includes(currentWallpaper.id);
    favoriteBtn.classList.toggle('active', !!on);
    favoriteBtn.querySelector('i').className = on ? 'fas fa-heart' : 'far fa-heart';
}

favoriteBtn.addEventListener('click', () => {
    if (currentWallpaper) {
        toggleFavorite(currentWallpaper.id);
        setFavoriteButton();
        showNotification(favorites.includes(currentWallpaper.id) ? 'Added to favorites!' : 'Removed from favorites!');
        // keep the heart on the grid card in sync
        const btn = wallpaperGrid.querySelector(`.favorite-action[data-id="${currentWallpaper.id}"] i`);
        if (btn) btn.className = favorites.includes(currentWallpaper.id) ? 'fas fa-heart' : 'far fa-heart';
    }
});

// ===== User Modal =====
function openUserModal() { userModal.classList.add('active'); document.body.classList.add('modal-open'); }
function closeUserModal() { userModal.classList.remove('active'); document.body.classList.remove('modal-open'); }
userBtn.addEventListener('click', openUserModal);
userModalClose.addEventListener('click', closeUserModal);
userModalOverlay.addEventListener('click', closeUserModal);

// ===== Contact Form (sends through Formspree) =====
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.submit-btn');
    btn.disabled = true;
    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error('failed');
        showNotification('Message sent successfully!');
        form.reset();
    } catch (err) {
        showNotification('Could not send. Please try again.');
    } finally {
        btn.disabled = false;
    }
});

// ===== Auth Form =====
document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Sign in functionality coming soon!');
});

// ===== Notification System (styles live in styles.css: .toast) =====
function showNotification(message, opts = {}) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.appendChild(el);
    const close = () => {
        el.classList.add('out');
        setTimeout(() => el.remove(), 300);
    };
    if (!opts.sticky) setTimeout(close, 3000);
    return { el, close };
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modalMedia.classList.contains('fullscreen')) { exitPreview(); return; }
        if (wallpaperModal.classList.contains('active')) closeWallpaperModal();
        if (userModal.classList.contains('active')) closeUserModal();
        if (navLinks.classList.contains('active')) setMenu(false);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length < 2) { e.preventDefault(); return; }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Initialize =====
initTheme();
viewBtns.forEach(b => b.classList.toggle('active', b.dataset.view === viewMode));
loadWallpapers();
