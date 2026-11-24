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

    // --- ORIGINAL phone wallpapers (made by tools/make_wallpapers.py, yours to use commercially) ---
    { id: 301, title: "Aurora Mesh", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/aurora-mesh.jpg", thumb: "images/pack/thumbs/aurora-mesh.jpg", wide: "images/pack/aurora-mesh-wide.jpg", wideThumb: "images/pack/thumbs/aurora-mesh-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 302, title: "Sunset Haze", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/sunset-haze.jpg", thumb: "images/pack/thumbs/sunset-haze.jpg", wide: "images/pack/sunset-haze-wide.jpg", wideThumb: "images/pack/thumbs/sunset-haze-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 303, title: "Ocean Drift", category: "abstract", tags: "nature landscape scenery outdoors", image: "images/pack/ocean-drift.jpg", thumb: "images/pack/thumbs/ocean-drift.jpg", wide: "images/pack/ocean-drift-wide.jpg", wideThumb: "images/pack/thumbs/ocean-drift-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 304, title: "Peach Cloud", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/peach-cloud.jpg", thumb: "images/pack/thumbs/peach-cloud.jpg", wide: "images/pack/peach-cloud-wide.jpg", wideThumb: "images/pack/thumbs/peach-cloud-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 305, title: "Violet Dream", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/violet-dream.jpg", thumb: "images/pack/thumbs/violet-dream.jpg", wide: "images/pack/violet-dream-wide.jpg", wideThumb: "images/pack/thumbs/violet-dream-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 306, title: "Forest Mist", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/forest-mist.jpg", thumb: "images/pack/thumbs/forest-mist.jpg", wide: "images/pack/forest-mist-wide.jpg", wideThumb: "images/pack/thumbs/forest-mist-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 307, title: "Rose Gold", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/rose-gold.jpg", thumb: "images/pack/thumbs/rose-gold.jpg", wide: "images/pack/rose-gold-wide.jpg", wideThumb: "images/pack/thumbs/rose-gold-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 308, title: "Midnight Blue", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/midnight-blue.jpg", thumb: "images/pack/thumbs/midnight-blue.jpg", wide: "images/pack/midnight-blue-wide.jpg", wideThumb: "images/pack/thumbs/midnight-blue-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 309, title: "Lemon Fizz", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/lemon-fizz.jpg", thumb: "images/pack/thumbs/lemon-fizz.jpg", wide: "images/pack/lemon-fizz-wide.jpg", wideThumb: "images/pack/thumbs/lemon-fizz-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 310, title: "Candy Sky", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/candy-sky.jpg", thumb: "images/pack/thumbs/candy-sky.jpg", wide: "images/pack/candy-sky-wide.jpg", wideThumb: "images/pack/thumbs/candy-sky-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 311, title: "Lava Flow", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/lava-flow.jpg", thumb: "images/pack/thumbs/lava-flow.jpg", wide: "images/pack/lava-flow-wide.jpg", wideThumb: "images/pack/thumbs/lava-flow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 312, title: "Blue Hour", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/blue-hour.jpg", thumb: "images/pack/thumbs/blue-hour.jpg", wide: "images/pack/blue-hour-wide.jpg", wideThumb: "images/pack/thumbs/blue-hour-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 313, title: "Mint Fade", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/mint-fade.jpg", thumb: "images/pack/thumbs/mint-fade.jpg", wide: "images/pack/mint-fade-wide.jpg", wideThumb: "images/pack/thumbs/mint-fade-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 314, title: "Twilight", category: "abstract", tags: "gradient blur colorful smooth", image: "images/pack/twilight.jpg", thumb: "images/pack/thumbs/twilight.jpg", wide: "images/pack/twilight-wide.jpg", wideThumb: "images/pack/thumbs/twilight-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 315, title: "AMOLED Blue Glow", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/amoled-blue-glow.jpg", thumb: "images/pack/thumbs/amoled-blue-glow.jpg", wide: "images/pack/amoled-blue-glow-wide.jpg", wideThumb: "images/pack/thumbs/amoled-blue-glow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 316, title: "AMOLED Red Glow", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/amoled-red-glow.jpg", thumb: "images/pack/thumbs/amoled-red-glow.jpg", wide: "images/pack/amoled-red-glow-wide.jpg", wideThumb: "images/pack/thumbs/amoled-red-glow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 317, title: "AMOLED Green Ring", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/amoled-green-ring.jpg", thumb: "images/pack/thumbs/amoled-green-ring.jpg", wide: "images/pack/amoled-green-ring-wide.jpg", wideThumb: "images/pack/thumbs/amoled-green-ring-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 318, title: "AMOLED Violet Orb", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/amoled-violet-orb.jpg", thumb: "images/pack/thumbs/amoled-violet-orb.jpg", wide: "images/pack/amoled-violet-orb-wide.jpg", wideThumb: "images/pack/thumbs/amoled-violet-orb-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 319, title: "AMOLED Gold Orb", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/amoled-gold-orb.jpg", thumb: "images/pack/thumbs/amoled-gold-orb.jpg", wide: "images/pack/amoled-gold-orb-wide.jpg", wideThumb: "images/pack/thumbs/amoled-gold-orb-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 320, title: "AMOLED Cyan Lines", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/amoled-cyan-lines.jpg", thumb: "images/pack/thumbs/amoled-cyan-lines.jpg", wide: "images/pack/amoled-cyan-lines-wide.jpg", wideThumb: "images/pack/thumbs/amoled-cyan-lines-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 321, title: "AMOLED Pink Lines", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/amoled-pink-lines.jpg", thumb: "images/pack/thumbs/amoled-pink-lines.jpg", wide: "images/pack/amoled-pink-lines-wide.jpg", wideThumb: "images/pack/thumbs/amoled-pink-lines-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 322, title: "Pure Black", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/pure-black.jpg", thumb: "images/pack/thumbs/pure-black.jpg", wide: "images/pack/pure-black-wide.jpg", wideThumb: "images/pack/thumbs/pure-black-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 323, title: "Deep Space Black", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/deep-space-black.jpg", thumb: "images/pack/thumbs/deep-space-black.jpg", wide: "images/pack/deep-space-black-wide.jpg", wideThumb: "images/pack/thumbs/deep-space-black-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 324, title: "Charcoal Fade", category: "dark", tags: "amoled black dark oled battery", image: "images/pack/charcoal-fade.jpg", thumb: "images/pack/thumbs/charcoal-fade.jpg", wide: "images/pack/charcoal-fade-wide.jpg", wideThumb: "images/pack/thumbs/charcoal-fade-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 325, title: "Minimal Sun", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-sun.jpg", thumb: "images/pack/thumbs/minimal-sun.jpg", wide: "images/pack/minimal-sun-wide.jpg", wideThumb: "images/pack/thumbs/minimal-sun-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 326, title: "Minimal Horizon", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-horizon.jpg", thumb: "images/pack/thumbs/minimal-horizon.jpg", wide: "images/pack/minimal-horizon-wide.jpg", wideThumb: "images/pack/thumbs/minimal-horizon-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 327, title: "Minimal Arch", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-arch.jpg", thumb: "images/pack/thumbs/minimal-arch.jpg", wide: "images/pack/minimal-arch-wide.jpg", wideThumb: "images/pack/thumbs/minimal-arch-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 328, title: "Minimal Stripes", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-stripes.jpg", thumb: "images/pack/thumbs/minimal-stripes.jpg", wide: "images/pack/minimal-stripes-wide.jpg", wideThumb: "images/pack/thumbs/minimal-stripes-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 329, title: "Minimal Moon", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-moon.jpg", thumb: "images/pack/thumbs/minimal-moon.jpg", wide: "images/pack/minimal-moon-wide.jpg", wideThumb: "images/pack/thumbs/minimal-moon-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 330, title: "Minimal Dots", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-dots.jpg", thumb: "images/pack/thumbs/minimal-dots.jpg", wide: "images/pack/minimal-dots-wide.jpg", wideThumb: "images/pack/thumbs/minimal-dots-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 331, title: "Minimal Split", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-split.jpg", thumb: "images/pack/thumbs/minimal-split.jpg", wide: "images/pack/minimal-split-wide.jpg", wideThumb: "images/pack/thumbs/minimal-split-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 332, title: "Minimal Rings", category: "minimalist", tags: "minimal simple flat clean", image: "images/pack/minimal-rings.jpg", thumb: "images/pack/thumbs/minimal-rings.jpg", wide: "images/pack/minimal-rings-wide.jpg", wideThumb: "images/pack/thumbs/minimal-rings-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 333, title: "Topo Night", category: "abstract", tags: "pattern lines waves", image: "images/pack/topo-night.jpg", thumb: "images/pack/thumbs/topo-night.jpg", wide: "images/pack/topo-night-wide.jpg", wideThumb: "images/pack/thumbs/topo-night-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 334, title: "Topo Sand", category: "abstract", tags: "pattern lines waves", image: "images/pack/topo-sand.jpg", thumb: "images/pack/thumbs/topo-sand.jpg", wide: "images/pack/topo-sand-wide.jpg", wideThumb: "images/pack/thumbs/topo-sand-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 335, title: "Topo Violet", category: "abstract", tags: "pattern lines waves", image: "images/pack/topo-violet.jpg", thumb: "images/pack/thumbs/topo-violet.jpg", wide: "images/pack/topo-violet-wide.jpg", wideThumb: "images/pack/thumbs/topo-violet-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 336, title: "Ripple Blue", category: "abstract", tags: "pattern lines waves", image: "images/pack/ripple-blue.jpg", thumb: "images/pack/thumbs/ripple-blue.jpg", wide: "images/pack/ripple-blue-wide.jpg", wideThumb: "images/pack/thumbs/ripple-blue-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 337, title: "Ripple Sunset", category: "abstract", tags: "pattern lines waves", image: "images/pack/ripple-sunset.jpg", thumb: "images/pack/thumbs/ripple-sunset.jpg", wide: "images/pack/ripple-sunset-wide.jpg", wideThumb: "images/pack/thumbs/ripple-sunset-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 338, title: "Dune Waves", category: "abstract", tags: "pattern lines waves", image: "images/pack/dune-waves.jpg", thumb: "images/pack/thumbs/dune-waves.jpg", wide: "images/pack/dune-waves-wide.jpg", wideThumb: "images/pack/thumbs/dune-waves-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 339, title: "Night Waves", category: "abstract", tags: "pattern lines waves", image: "images/pack/night-waves.jpg", thumb: "images/pack/thumbs/night-waves.jpg", wide: "images/pack/night-waves-wide.jpg", wideThumb: "images/pack/thumbs/night-waves-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 340, title: "Pastel Waves", category: "abstract", tags: "pattern lines waves", image: "images/pack/pastel-waves.jpg", thumb: "images/pack/thumbs/pastel-waves.jpg", wide: "images/pack/pastel-waves-wide.jpg", wideThumb: "images/pack/thumbs/pastel-waves-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 341, title: "Violet Nebula", category: "space", tags: "space galaxy stars cosmos night", image: "images/pack/nebula-violet.jpg", thumb: "images/pack/thumbs/nebula-violet.jpg", wide: "images/pack/nebula-violet-wide.jpg", wideThumb: "images/pack/thumbs/nebula-violet-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 342, title: "Teal Nebula", category: "space", tags: "space galaxy stars cosmos night", image: "images/pack/nebula-teal.jpg", thumb: "images/pack/thumbs/nebula-teal.jpg", wide: "images/pack/nebula-teal-wide.jpg", wideThumb: "images/pack/thumbs/nebula-teal-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 343, title: "Planet Horizon", category: "space", tags: "space galaxy stars cosmos night", image: "images/pack/planet-horizon.jpg", thumb: "images/pack/thumbs/planet-horizon.jpg", wide: "images/pack/planet-horizon-wide.jpg", wideThumb: "images/pack/thumbs/planet-horizon-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 344, title: "Total Eclipse", category: "space", tags: "space galaxy stars cosmos night", image: "images/pack/total-eclipse.jpg", thumb: "images/pack/thumbs/total-eclipse.jpg", wide: "images/pack/total-eclipse-wide.jpg", wideThumb: "images/pack/thumbs/total-eclipse-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 345, title: "Star Field", category: "space", tags: "space galaxy stars cosmos night", image: "images/pack/star-field.jpg", thumb: "images/pack/thumbs/star-field.jpg", wide: "images/pack/star-field-wide.jpg", wideThumb: "images/pack/thumbs/star-field-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 346, title: "Moonrise", category: "space", tags: "space galaxy stars cosmos night", image: "images/pack/moonrise.jpg", thumb: "images/pack/thumbs/moonrise.jpg", wide: "images/pack/moonrise-wide.jpg", wideThumb: "images/pack/thumbs/moonrise-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 347, title: "Mountain Dawn", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/mountain-dawn.jpg", thumb: "images/pack/thumbs/mountain-dawn.jpg", wide: "images/pack/mountain-dawn-wide.jpg", wideThumb: "images/pack/thumbs/mountain-dawn-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 348, title: "Mountain Dusk", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/mountain-dusk.jpg", thumb: "images/pack/thumbs/mountain-dusk.jpg", wide: "images/pack/mountain-dusk-wide.jpg", wideThumb: "images/pack/thumbs/mountain-dusk-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 349, title: "Misty Ridges", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/misty-ridges.jpg", thumb: "images/pack/thumbs/misty-ridges.jpg", wide: "images/pack/misty-ridges-wide.jpg", wideThumb: "images/pack/thumbs/misty-ridges-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 350, title: "Mountain Night", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/mountain-night.jpg", thumb: "images/pack/thumbs/mountain-night.jpg", wide: "images/pack/mountain-night-wide.jpg", wideThumb: "images/pack/thumbs/mountain-night-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 351, title: "Pine Dusk", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/pine-dusk.jpg", thumb: "images/pack/thumbs/pine-dusk.jpg", wide: "images/pack/pine-dusk-wide.jpg", wideThumb: "images/pack/thumbs/pine-dusk-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 352, title: "Pine Night", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/pine-night.jpg", thumb: "images/pack/thumbs/pine-night.jpg", wide: "images/pack/pine-night-wide.jpg", wideThumb: "images/pack/thumbs/pine-night-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 353, title: "Ocean Sunset", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/ocean-sunset.jpg", thumb: "images/pack/thumbs/ocean-sunset.jpg", wide: "images/pack/ocean-sunset-wide.jpg", wideThumb: "images/pack/thumbs/ocean-sunset-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 354, title: "Pastel Shore", category: "nature", tags: "nature landscape scenery outdoors", image: "images/pack/pastel-shore.jpg", thumb: "images/pack/thumbs/pastel-shore.jpg", wide: "images/pack/pastel-shore-wide.jpg", wideThumb: "images/pack/thumbs/pastel-shore-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 355, title: "Neon Grid", category: "technology", tags: "tech geometric pattern futuristic", image: "images/pack/neon-grid.jpg", thumb: "images/pack/thumbs/neon-grid.jpg", wide: "images/pack/neon-grid-wide.jpg", wideThumb: "images/pack/thumbs/neon-grid-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 356, title: "Hex Grid", category: "technology", tags: "tech geometric pattern futuristic", image: "images/pack/hex-grid.jpg", thumb: "images/pack/thumbs/hex-grid.jpg", wide: "images/pack/hex-grid-wide.jpg", wideThumb: "images/pack/thumbs/hex-grid-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 357, title: "Low Poly Blue", category: "technology", tags: "tech geometric pattern futuristic", image: "images/pack/low-poly-blue.jpg", thumb: "images/pack/thumbs/low-poly-blue.jpg", wide: "images/pack/low-poly-blue-wide.jpg", wideThumb: "images/pack/thumbs/low-poly-blue-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 358, title: "Low Poly Sunset", category: "technology", tags: "tech geometric pattern futuristic", image: "images/pack/low-poly-sunset.jpg", thumb: "images/pack/thumbs/low-poly-sunset.jpg", wide: "images/pack/low-poly-sunset-wide.jpg", wideThumb: "images/pack/thumbs/low-poly-sunset-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 359, title: "Keep Going", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-keep-going.jpg", thumb: "images/pack/thumbs/quote-keep-going.jpg", wide: "images/pack/quote-keep-going-wide.jpg", wideThumb: "images/pack/thumbs/quote-keep-going-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 360, title: "Begin Today", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-begin-today.jpg", thumb: "images/pack/thumbs/quote-begin-today.jpg", wide: "images/pack/quote-begin-today-wide.jpg", wideThumb: "images/pack/thumbs/quote-begin-today-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 361, title: "Quiet Mind", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-quiet-mind.jpg", thumb: "images/pack/thumbs/quote-quiet-mind.jpg", wide: "images/pack/quote-quiet-mind-wide.jpg", wideThumb: "images/pack/thumbs/quote-quiet-mind-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 362, title: "Small Steps", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-small-steps.jpg", thumb: "images/pack/thumbs/quote-small-steps.jpg", wide: "images/pack/quote-small-steps-wide.jpg", wideThumb: "images/pack/thumbs/quote-small-steps-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 363, title: "Stay Curious", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-stay-curious.jpg", thumb: "images/pack/thumbs/quote-stay-curious.jpg", wide: "images/pack/quote-stay-curious-wide.jpg", wideThumb: "images/pack/thumbs/quote-stay-curious-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 364, title: "Be Kind", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-be-kind.jpg", thumb: "images/pack/thumbs/quote-be-kind.jpg", wide: "images/pack/quote-be-kind-wide.jpg", wideThumb: "images/pack/thumbs/quote-be-kind-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 365, title: "Dream Big", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-dream-big.jpg", thumb: "images/pack/thumbs/quote-dream-big.jpg", wide: "images/pack/quote-dream-big-wide.jpg", wideThumb: "images/pack/thumbs/quote-dream-big-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 366, title: "Focus", category: "quotes", tags: "quote quotes motivation text inspiration words", image: "images/pack/quote-focus.jpg", thumb: "images/pack/thumbs/quote-focus.jpg", wide: "images/pack/quote-focus-wide.jpg", wideThumb: "images/pack/thumbs/quote-focus-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 367, title: "Diwali Glow", category: "festival", tags: "festival diwali lights gold celebration india", image: "images/pack/diwali-glow.jpg", thumb: "images/pack/thumbs/diwali-glow.jpg", wide: "images/pack/diwali-glow-wide.jpg", wideThumb: "images/pack/thumbs/diwali-glow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 368, title: "Diya Flame", category: "festival", tags: "festival diwali diya flame lamp india", image: "images/pack/diya-flame.jpg", thumb: "images/pack/thumbs/diya-flame.jpg", wide: "images/pack/diya-flame-wide.jpg", wideThumb: "images/pack/thumbs/diya-flame-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 369, title: "Golden Mandala", category: "festival", tags: "festival mandala gold pattern india diwali", image: "images/pack/golden-mandala.jpg", thumb: "images/pack/thumbs/golden-mandala.jpg", wide: "images/pack/golden-mandala-wide.jpg", wideThumb: "images/pack/thumbs/golden-mandala-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 370, title: "Holi Colors", category: "festival", tags: "festival holi colors india celebration", image: "images/pack/holi-colors.jpg", thumb: "images/pack/thumbs/holi-colors.jpg", wide: "images/pack/holi-colors-wide.jpg", wideThumb: "images/pack/thumbs/holi-colors-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 371, title: "Christmas Snow", category: "festival", tags: "festival christmas snow winter celebration", image: "images/pack/christmas-snow.jpg", thumb: "images/pack/thumbs/christmas-snow.jpg", wide: "images/pack/christmas-snow-wide.jpg", wideThumb: "images/pack/thumbs/christmas-snow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 372, title: "New Year Fireworks", category: "festival", tags: "festival new year fireworks night celebration", image: "images/pack/new-year-fireworks.jpg", thumb: "images/pack/thumbs/new-year-fireworks.jpg", wide: "images/pack/new-year-fireworks-wide.jpg", wideThumb: "images/pack/thumbs/new-year-fireworks-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 373, title: "Sky Lanterns", category: "festival", tags: "festival lanterns night sky celebration", image: "images/pack/sky-lanterns.jpg", thumb: "images/pack/thumbs/sky-lanterns.jpg", wide: "images/pack/sky-lanterns-wide.jpg", wideThumb: "images/pack/thumbs/sky-lanterns-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 374, title: "Eid Crescent", category: "festival", tags: "festival eid crescent moon night celebration", image: "images/pack/eid-crescent.jpg", thumb: "images/pack/thumbs/eid-crescent.jpg", wide: "images/pack/eid-crescent-wide.jpg", wideThumb: "images/pack/thumbs/eid-crescent-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 375, title: "Anime Sunset City", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-sunset-city.jpg", thumb: "images/pack/thumbs/anime-sunset-city.jpg", wide: "images/pack/anime-sunset-city-wide.jpg", wideThumb: "images/pack/thumbs/anime-sunset-city-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 376, title: "Torii Night", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-torii-night.jpg", thumb: "images/pack/thumbs/anime-torii-night.jpg", wide: "images/pack/anime-torii-night-wide.jpg", wideThumb: "images/pack/thumbs/anime-torii-night-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 377, title: "Sakura Sky", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-sakura-sky.jpg", thumb: "images/pack/thumbs/anime-sakura-sky.jpg", wide: "images/pack/anime-sakura-sky-wide.jpg", wideThumb: "images/pack/thumbs/anime-sakura-sky-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 378, title: "Neon Highway", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-neon-highway.jpg", thumb: "images/pack/thumbs/car-neon-highway.jpg", wide: "images/pack/car-neon-highway-wide.jpg", wideThumb: "images/pack/thumbs/car-neon-highway-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 379, title: "Taillight Bokeh", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-taillight-bokeh.jpg", thumb: "images/pack/thumbs/car-taillight-bokeh.jpg", wide: "images/pack/car-taillight-bokeh-wide.jpg", wideThumb: "images/pack/thumbs/car-taillight-bokeh-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 380, title: "Speed Streaks", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-speed-streaks.jpg", thumb: "images/pack/thumbs/car-speed-streaks.jpg", wide: "images/pack/car-speed-streaks-wide.jpg", wideThumb: "images/pack/thumbs/car-speed-streaks-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 381, title: "Dusk Coupe", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-dusk-coupe.jpg", thumb: "images/pack/thumbs/car-dusk-coupe.jpg", wide: "images/pack/car-dusk-coupe-wide.jpg", wideThumb: "images/pack/thumbs/car-dusk-coupe-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 408, title: "Silver Mercedes-AMG GT R Profile", category: "cars", tags: "car cars wallpaper gt supercar mercedes amg side", image: "images/pack/cars/car-photo-silver-mercedes-amg-gt-r-profile.jpg", thumb: "images/pack/cars/thumbs/car-photo-silver-mercedes-amg-gt-r-profile.jpg", wide: "images/pack/cars/car-photo-silver-mercedes-amg-gt-r-profile-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-silver-mercedes-amg-gt-r-profile-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 409, title: "Silver Mercedes-AMG GT R Studio", category: "cars", tags: "car cars wallpaper gt supercar mercedes amg studio", image: "images/pack/cars/car-photo-silver-mercedes-amg-gt-r-studio.jpg", thumb: "images/pack/cars/thumbs/car-photo-silver-mercedes-amg-gt-r-studio.jpg", wide: "images/pack/cars/car-photo-silver-mercedes-amg-gt-r-studio-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-silver-mercedes-amg-gt-r-studio-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 410, title: "Audi RS7 Autumn Forest", category: "cars", tags: "car cars wallpaper luxury performance sedan audi rs7 forest", image: "images/pack/cars/car-photo-audi-rs7-autumn-forest.jpg", thumb: "images/pack/cars/thumbs/car-photo-audi-rs7-autumn-forest.jpg", wide: "images/pack/cars/car-photo-audi-rs7-autumn-forest-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-audi-rs7-autumn-forest-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 411, title: "Maserati Ghibli Neon Container", category: "cars", tags: "car cars wallpaper luxury sedan maserati ghibli night", image: "images/pack/cars/car-photo-maserati-ghibli-neon-container.jpg", thumb: "images/pack/cars/thumbs/car-photo-maserati-ghibli-neon-container.jpg", wide: "images/pack/cars/car-photo-maserati-ghibli-neon-container-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-maserati-ghibli-neon-container-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 412, title: "Dodge Challenger SRT Headlight", category: "cars", tags: "car cars wallpaper muscle dodge challenger closeup black white", image: "images/pack/cars/car-photo-dodge-challenger-srt-headlight.jpg", thumb: "images/pack/cars/thumbs/car-photo-dodge-challenger-srt-headlight.jpg", wide: "images/pack/cars/car-photo-dodge-challenger-srt-headlight-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-dodge-challenger-srt-headlight-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 413, title: "Shelby Mustang Sunset Lot", category: "cars", tags: "car cars wallpaper muscle ford mustang shelby sunset", image: "images/pack/cars/car-photo-shelby-mustang-sunset-lot.jpg", thumb: "images/pack/cars/thumbs/car-photo-shelby-mustang-sunset-lot.jpg", wide: "images/pack/cars/car-photo-shelby-mustang-sunset-lot-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-shelby-mustang-sunset-lot-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 414, title: "Orange 1970 Challenger Lakeside", category: "cars", tags: "car cars wallpaper classic muscle dodge challenger vintage retro", image: "images/pack/cars/car-photo-orange-1970-challenger-lakeside.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-1970-challenger-lakeside.jpg", wide: "images/pack/cars/car-photo-orange-1970-challenger-lakeside-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-1970-challenger-lakeside-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 415, title: "Red BMW Coupe Parking Garage", category: "cars", tags: "car cars wallpaper sports coupe bmw night garage", image: "images/pack/cars/car-photo-red-bmw-coupe-parking-garage.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-bmw-coupe-parking-garage.jpg", wide: "images/pack/cars/car-photo-red-bmw-coupe-parking-garage-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-bmw-coupe-parking-garage-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 416, title: "Red BMW Coupe Ferris Wheel", category: "cars", tags: "car cars wallpaper sports coupe bmw night city", image: "images/pack/cars/car-photo-red-bmw-coupe-ferris-wheel.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-bmw-coupe-ferris-wheel.jpg", wide: "images/pack/cars/car-photo-red-bmw-coupe-ferris-wheel-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-bmw-coupe-ferris-wheel-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 417, title: "Orange Mustang Warehouse", category: "cars", tags: "car cars wallpaper muscle ford mustang gt", image: "images/pack/cars/car-photo-orange-mustang-warehouse.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-mustang-warehouse.jpg", wide: "images/pack/cars/car-photo-orange-mustang-warehouse-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-mustang-warehouse-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 418, title: "Baby Blue Widebody BMW M4", category: "cars", tags: "car cars wallpaper tuned sports coupe bmw m4 widebody studio", image: "images/pack/cars/car-photo-baby-blue-widebody-bmw-m4.jpg", thumb: "images/pack/cars/thumbs/car-photo-baby-blue-widebody-bmw-m4.jpg", wide: "images/pack/cars/car-photo-baby-blue-widebody-bmw-m4-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-baby-blue-widebody-bmw-m4-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 419, title: "Widebody BMW M4 Wing", category: "cars", tags: "car cars wallpaper tuned sports coupe bmw m4 widebody studio wing", image: "images/pack/cars/car-photo-widebody-bmw-m4-wing.jpg", thumb: "images/pack/cars/thumbs/car-photo-widebody-bmw-m4-wing.jpg", wide: "images/pack/cars/car-photo-widebody-bmw-m4-wing-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-widebody-bmw-m4-wing-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 420, title: "Red Ferrari Roadside", category: "cars", tags: "car cars wallpaper supercar ferrari red", image: "images/pack/cars/car-photo-red-ferrari-roadside.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-ferrari-roadside.jpg", wide: "images/pack/cars/car-photo-red-ferrari-roadside-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-ferrari-roadside-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 421, title: "Blue Lamborghini Aventador S", category: "cars", tags: "car cars wallpaper supercar lamborghini aventador blue", image: "images/pack/cars/car-photo-blue-lamborghini-aventador-s.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-lamborghini-aventador-s.jpg", wide: "images/pack/cars/car-photo-blue-lamborghini-aventador-s-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-lamborghini-aventador-s-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 422, title: "Ferrari 812 Forest Run", category: "cars", tags: "car cars wallpaper supercar gt ferrari 812 forest motion", image: "images/pack/cars/car-photo-ferrari-812-forest-run.jpg", thumb: "images/pack/cars/thumbs/car-photo-ferrari-812-forest-run.jpg", wide: "images/pack/cars/car-photo-ferrari-812-forest-run-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-ferrari-812-forest-run-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 423, title: "Ferrari 812 Racing Stripe", category: "cars", tags: "car cars wallpaper supercar gt ferrari 812 stripe road", image: "images/pack/cars/car-photo-ferrari-812-racing-stripe.jpg", thumb: "images/pack/cars/thumbs/car-photo-ferrari-812-racing-stripe.jpg", wide: "images/pack/cars/car-photo-ferrari-812-racing-stripe-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-ferrari-812-racing-stripe-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 424, title: "Ferrari 812 Mountain Road", category: "cars", tags: "car cars wallpaper supercar gt ferrari 812 road", image: "images/pack/cars/car-photo-ferrari-812-mountain-road.jpg", thumb: "images/pack/cars/thumbs/car-photo-ferrari-812-mountain-road.jpg", wide: "images/pack/cars/car-photo-ferrari-812-mountain-road-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-ferrari-812-mountain-road-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 425, title: "Ferrari Pair Rolling Shot", category: "cars", tags: "car cars wallpaper supercar ferrari motion rolling", image: "images/pack/cars/car-photo-ferrari-pair-rolling-shot.jpg", thumb: "images/pack/cars/thumbs/car-photo-ferrari-pair-rolling-shot.jpg", wide: "images/pack/cars/car-photo-ferrari-pair-rolling-shot-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-ferrari-pair-rolling-shot-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 426, title: "Ferrari Sunset Coast", category: "cars", tags: "car cars wallpaper supercar ferrari sunset red", image: "images/pack/cars/car-photo-ferrari-sunset-coast.jpg", thumb: "images/pack/cars/thumbs/car-photo-ferrari-sunset-coast.jpg", wide: "images/pack/cars/car-photo-ferrari-sunset-coast-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-ferrari-sunset-coast-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 427, title: "Ferrari 812 Rear Pan", category: "cars", tags: "car cars wallpaper supercar gt ferrari 812 motion", image: "images/pack/cars/car-photo-ferrari-812-rear-pan.jpg", thumb: "images/pack/cars/thumbs/car-photo-ferrari-812-rear-pan.jpg", wide: "images/pack/cars/car-photo-ferrari-812-rear-pan-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-ferrari-812-rear-pan-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 428, title: "Sky Blue Lamborghini Palms", category: "cars", tags: "car cars wallpaper supercar lamborghini aventador blue palm", image: "images/pack/cars/car-photo-sky-blue-lamborghini-palms.jpg", thumb: "images/pack/cars/thumbs/car-photo-sky-blue-lamborghini-palms.jpg", wide: "images/pack/cars/car-photo-sky-blue-lamborghini-palms-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-sky-blue-lamborghini-palms-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 429, title: "Black Porsche Panamera Rolling", category: "cars", tags: "car cars wallpaper luxury sedan porsche panamera motion", image: "images/pack/cars/car-photo-black-porsche-panamera-rolling.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-porsche-panamera-rolling.jpg", wide: "images/pack/cars/car-photo-black-porsche-panamera-rolling-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-porsche-panamera-rolling-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 430, title: "Yellow Lamborghini Revuelto Rear", category: "cars", tags: "car cars wallpaper supercar hypercar lamborghini yellow rear", image: "images/pack/cars/car-photo-yellow-lamborghini-revuelto-rear.jpg", thumb: "images/pack/cars/thumbs/car-photo-yellow-lamborghini-revuelto-rear.jpg", wide: "images/pack/cars/car-photo-yellow-lamborghini-revuelto-rear-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-yellow-lamborghini-revuelto-rear-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 431, title: "Widebody Porsche 911 Track Build", category: "cars", tags: "car cars wallpaper sports tuned track porsche 911 gt wing", image: "images/pack/cars/car-photo-widebody-porsche-911-track-build.jpg", thumb: "images/pack/cars/thumbs/car-photo-widebody-porsche-911-track-build.jpg", wide: "images/pack/cars/car-photo-widebody-porsche-911-track-build-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-widebody-porsche-911-track-build-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 432, title: "Yellow BMW M4 Teal Wall", category: "cars", tags: "car cars wallpaper sports coupe bmw m4 yellow", image: "images/pack/cars/car-photo-yellow-bmw-m4-teal-wall.jpg", thumb: "images/pack/cars/thumbs/car-photo-yellow-bmw-m4-teal-wall.jpg", wide: "images/pack/cars/car-photo-yellow-bmw-m4-teal-wall-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-yellow-bmw-m4-teal-wall-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 433, title: "Yellow Mercedes-AMG GT Highway", category: "cars", tags: "car cars wallpaper gt supercar mercedes amg yellow", image: "images/pack/cars/car-photo-yellow-mercedes-amg-gt-highway.jpg", thumb: "images/pack/cars/thumbs/car-photo-yellow-mercedes-amg-gt-highway.jpg", wide: "images/pack/cars/car-photo-yellow-mercedes-amg-gt-highway-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-yellow-mercedes-amg-gt-highway-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 434, title: "Red Audi RS Autumn Leaves", category: "cars", tags: "car cars wallpaper luxury performance sedan audi rs red leaves", image: "images/pack/cars/car-photo-red-audi-rs-autumn-leaves.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-audi-rs-autumn-leaves.jpg", wide: "images/pack/cars/car-photo-red-audi-rs-autumn-leaves-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-audi-rs-autumn-leaves-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 435, title: "Yellow Mustang GT Downtown", category: "cars", tags: "car cars wallpaper muscle ford mustang gt yellow city", image: "images/pack/cars/car-photo-yellow-mustang-gt-downtown.jpg", thumb: "images/pack/cars/thumbs/car-photo-yellow-mustang-gt-downtown.jpg", wide: "images/pack/cars/car-photo-yellow-mustang-gt-downtown-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-yellow-mustang-gt-downtown-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 436, title: "Yellow Lamborghini Huracan", category: "cars", tags: "car cars wallpaper supercar lamborghini huracan yellow", image: "images/pack/cars/car-photo-yellow-lamborghini-huracan.jpg", thumb: "images/pack/cars/thumbs/car-photo-yellow-lamborghini-huracan.jpg", wide: "images/pack/cars/car-photo-yellow-lamborghini-huracan-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-yellow-lamborghini-huracan-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 437, title: "Red Audi TT RS Motion", category: "cars", tags: "car cars wallpaper sports coupe audi tt rs motion", image: "images/pack/cars/car-photo-red-audi-tt-rs-motion.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-audi-tt-rs-motion.jpg", wide: "images/pack/cars/car-photo-red-audi-tt-rs-motion-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-audi-tt-rs-motion-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 438, title: "Light Blue Dodge Viper Wing", category: "cars", tags: "car cars wallpaper supercar muscle dodge viper wing", image: "images/pack/cars/car-photo-light-blue-dodge-viper-wing.jpg", thumb: "images/pack/cars/thumbs/car-photo-light-blue-dodge-viper-wing.jpg", wide: "images/pack/cars/car-photo-light-blue-dodge-viper-wing-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-light-blue-dodge-viper-wing-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 439, title: "White Toyota 86 Sunset Road", category: "cars", tags: "car cars wallpaper jdm sports coupe toyota 86 sunset", image: "images/pack/cars/car-photo-white-toyota-86-sunset-road.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-toyota-86-sunset-road.jpg", wide: "images/pack/cars/car-photo-white-toyota-86-sunset-road-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-toyota-86-sunset-road-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 440, title: "Red BMW M4 Fence Road", category: "cars", tags: "car cars wallpaper sports coupe bmw m4 coast", image: "images/pack/cars/car-photo-red-bmw-m4-fence-road.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-bmw-m4-fence-road.jpg", wide: "images/pack/cars/car-photo-red-bmw-m4-fence-road-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-bmw-m4-fence-road-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 441, title: "Green Stripe Nissan GT-R", category: "cars", tags: "car cars wallpaper jdm supercar tuned nissan gtr wrap", image: "images/pack/cars/car-photo-green-stripe-nissan-gt-r.jpg", thumb: "images/pack/cars/thumbs/car-photo-green-stripe-nissan-gt-r.jpg", wide: "images/pack/cars/car-photo-green-stripe-nissan-gt-r-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-green-stripe-nissan-gt-r-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 442, title: "Orange Porsche Cayman Rear", category: "cars", tags: "car cars wallpaper sports porsche cayman orange", image: "images/pack/cars/car-photo-orange-porsche-cayman-rear.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-porsche-cayman-rear.jpg", wide: "images/pack/cars/car-photo-orange-porsche-cayman-rear-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-porsche-cayman-rear-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 443, title: "Audi R8 City Taillights", category: "cars", tags: "car cars wallpaper supercar audi r8 night city", image: "images/pack/cars/car-photo-audi-r8-city-taillights.jpg", thumb: "images/pack/cars/thumbs/car-photo-audi-r8-city-taillights.jpg", wide: "images/pack/cars/car-photo-audi-r8-city-taillights-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-audi-r8-city-taillights-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 444, title: "Black Lamborghini Scissor Doors", category: "cars", tags: "car cars wallpaper supercar lamborghini aventador desert doors", image: "images/pack/cars/car-photo-black-lamborghini-scissor-doors.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-lamborghini-scissor-doors.jpg", wide: "images/pack/cars/car-photo-black-lamborghini-scissor-doors-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-lamborghini-scissor-doors-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 445, title: "Orange Huracan Performante Spyder", category: "cars", tags: "car cars wallpaper supercar roadster lamborghini huracan performante spyder orange", image: "images/pack/cars/car-photo-orange-huracan-performante-spyder.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-huracan-performante-spyder.jpg", wide: "images/pack/cars/car-photo-orange-huracan-performante-spyder-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-huracan-performante-spyder-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 446, title: "Black Dodge Challenger Stripe", category: "cars", tags: "car cars wallpaper muscle dodge challenger black", image: "images/pack/cars/car-photo-black-dodge-challenger-stripe.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-dodge-challenger-stripe.jpg", wide: "images/pack/cars/car-photo-black-dodge-challenger-stripe-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-dodge-challenger-stripe-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 447, title: "Red Mustang GT Palms", category: "cars", tags: "car cars wallpaper muscle ford mustang gt red", image: "images/pack/cars/car-photo-red-mustang-gt-palms.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-mustang-gt-palms.jpg", wide: "images/pack/cars/car-photo-red-mustang-gt-palms-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-mustang-gt-palms-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 448, title: "Black Challenger Orange Halo Eyes", category: "cars", tags: "car cars wallpaper muscle dodge challenger halo", image: "images/pack/cars/car-photo-black-challenger-orange-halo-eyes.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-challenger-orange-halo-eyes.jpg", wide: "images/pack/cars/car-photo-black-challenger-orange-halo-eyes-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-challenger-orange-halo-eyes-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 449, title: "Black Challenger Autumn Road", category: "cars", tags: "car cars wallpaper muscle dodge challenger rear autumn", image: "images/pack/cars/car-photo-black-challenger-autumn-road.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-challenger-autumn-road.jpg", wide: "images/pack/cars/car-photo-black-challenger-autumn-road-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-challenger-autumn-road-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 450, title: "Black Challenger Autumn Park", category: "cars", tags: "car cars wallpaper muscle dodge challenger autumn", image: "images/pack/cars/car-photo-black-challenger-autumn-park.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-challenger-autumn-park.jpg", wide: "images/pack/cars/car-photo-black-challenger-autumn-park-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-challenger-autumn-park-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 451, title: "Black Mustang Rear Quarter", category: "cars", tags: "car cars wallpaper muscle ford mustang rear black", image: "images/pack/cars/car-photo-black-mustang-rear-quarter.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-mustang-rear-quarter.jpg", wide: "images/pack/cars/car-photo-black-mustang-rear-quarter-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-mustang-rear-quarter-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 452, title: "Nissan 370Z Nismo Fog", category: "cars", tags: "car cars wallpaper jdm sports coupe nissan 370z nismo fog", image: "images/pack/cars/car-photo-nissan-370z-nismo-fog.jpg", thumb: "images/pack/cars/thumbs/car-photo-nissan-370z-nismo-fog.jpg", wide: "images/pack/cars/car-photo-nissan-370z-nismo-fog-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-nissan-370z-nismo-fog-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 453, title: "Red Honda NSX", category: "cars", tags: "car cars wallpaper jdm supercar honda nsx acura red", image: "images/pack/cars/car-photo-red-honda-nsx.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-honda-nsx.jpg", wide: "images/pack/cars/car-photo-red-honda-nsx-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-honda-nsx-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 454, title: "Mustang GT Taillights Sunset", category: "cars", tags: "car cars wallpaper muscle ford mustang gt taillight sunset", image: "images/pack/cars/car-photo-mustang-gt-taillights-sunset.jpg", thumb: "images/pack/cars/thumbs/car-photo-mustang-gt-taillights-sunset.jpg", wide: "images/pack/cars/car-photo-mustang-gt-taillights-sunset-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-mustang-gt-taillights-sunset-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 455, title: "Purple BMW M2 Bridge", category: "cars", tags: "car cars wallpaper sports coupe bmw m2 bridge", image: "images/pack/cars/car-photo-purple-bmw-m2-bridge.jpg", thumb: "images/pack/cars/thumbs/car-photo-purple-bmw-m2-bridge.jpg", wide: "images/pack/cars/car-photo-purple-bmw-m2-bridge-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-purple-bmw-m2-bridge-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 456, title: "Black Lamborghini Aventador Rain", category: "cars", tags: "car cars wallpaper supercar lamborghini aventador rain night", image: "images/pack/cars/car-photo-black-lamborghini-aventador-rain.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-lamborghini-aventador-rain.jpg", wide: "images/pack/cars/car-photo-black-lamborghini-aventador-rain-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-lamborghini-aventador-rain-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 457, title: "Ferrari Street Rear Teal", category: "cars", tags: "car cars wallpaper supercar ferrari city rear", image: "images/pack/cars/car-photo-ferrari-street-rear-teal.jpg", thumb: "images/pack/cars/thumbs/car-photo-ferrari-street-rear-teal.jpg", wide: "images/pack/cars/car-photo-ferrari-street-rear-teal-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-ferrari-street-rear-teal-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 458, title: "Red McLaren 570S", category: "cars", tags: "car cars wallpaper supercar mclaren 570s red", image: "images/pack/cars/car-photo-red-mclaren-570s.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-mclaren-570s.jpg", wide: "images/pack/cars/car-photo-red-mclaren-570s-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-mclaren-570s-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 459, title: "White Audi A7 Street", category: "cars", tags: "car cars wallpaper luxury sedan audi a7 white", image: "images/pack/cars/car-photo-white-audi-a7-street.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-audi-a7-street.jpg", wide: "images/pack/cars/car-photo-white-audi-a7-street-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-audi-a7-street-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 460, title: "Mustang Taillight Detail", category: "cars", tags: "car cars wallpaper muscle detail ford mustang taillight closeup", image: "images/pack/cars/car-photo-mustang-taillight-detail.jpg", thumb: "images/pack/cars/thumbs/car-photo-mustang-taillight-detail.jpg", wide: "images/pack/cars/car-photo-mustang-taillight-detail-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-mustang-taillight-detail-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 461, title: "Grey Mustang GT Front", category: "cars", tags: "car cars wallpaper muscle ford mustang gt grey", image: "images/pack/cars/car-photo-grey-mustang-gt-front.jpg", thumb: "images/pack/cars/thumbs/car-photo-grey-mustang-gt-front.jpg", wide: "images/pack/cars/car-photo-grey-mustang-gt-front-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-grey-mustang-gt-front-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 462, title: "Light BMW M5 Highway", category: "cars", tags: "car cars wallpaper luxury performance sedan bmw m5 motion", image: "images/pack/cars/car-photo-light-bmw-m5-highway.jpg", thumb: "images/pack/cars/thumbs/car-photo-light-bmw-m5-highway.jpg", wide: "images/pack/cars/car-photo-light-bmw-m5-highway-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-light-bmw-m5-highway-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 463, title: "Red Nissan GT-R Garage", category: "cars", tags: "car cars wallpaper jdm supercar nissan gtr rear garage red", image: "images/pack/cars/car-photo-red-nissan-gt-r-garage.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-nissan-gt-r-garage.jpg", wide: "images/pack/cars/car-photo-red-nissan-gt-r-garage-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-nissan-gt-r-garage-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 464, title: "Black BMW M4 Dusk Pink Sky", category: "cars", tags: "car cars wallpaper sports coupe bmw m4 black sunset", image: "images/pack/cars/car-photo-black-bmw-m4-dusk-pink-sky.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-bmw-m4-dusk-pink-sky.jpg", wide: "images/pack/cars/car-photo-black-bmw-m4-dusk-pink-sky-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-bmw-m4-dusk-pink-sky-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 465, title: "BMW Badge Black Hood Raindrops", category: "cars", tags: "car cars wallpaper detail luxury bmw badge closeup rain", image: "images/pack/cars/car-photo-bmw-badge-black-hood-raindrops.jpg", thumb: "images/pack/cars/thumbs/car-photo-bmw-badge-black-hood-raindrops.jpg", wide: "images/pack/cars/car-photo-bmw-badge-black-hood-raindrops-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-bmw-badge-black-hood-raindrops-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 466, title: "Shelby GT350 Black Stripes", category: "cars", tags: "car cars wallpaper muscle ford mustang shelby gt350", image: "images/pack/cars/car-photo-shelby-gt350-black-stripes.jpg", thumb: "images/pack/cars/thumbs/car-photo-shelby-gt350-black-stripes.jpg", wide: "images/pack/cars/car-photo-shelby-gt350-black-stripes-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-shelby-gt350-black-stripes-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 467, title: "Blue McLaren 600LT", category: "cars", tags: "car cars wallpaper supercar mclaren 600lt blue", image: "images/pack/cars/car-photo-blue-mclaren-600lt.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-mclaren-600lt.jpg", wide: "images/pack/cars/car-photo-blue-mclaren-600lt-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-mclaren-600lt-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 468, title: "Red LaFerrari Showroom", category: "cars", tags: "car cars wallpaper hypercar ferrari laferrari showroom", image: "images/pack/cars/car-photo-red-laferrari-showroom.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-laferrari-showroom.jpg", wide: "images/pack/cars/car-photo-red-laferrari-showroom-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-laferrari-showroom-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 469, title: "Grey Porsche 718 Cayman Park", category: "cars", tags: "car cars wallpaper sports porsche 718 cayman", image: "images/pack/cars/car-photo-grey-porsche-718-cayman-park.jpg", thumb: "images/pack/cars/thumbs/car-photo-grey-porsche-718-cayman-park.jpg", wide: "images/pack/cars/car-photo-grey-porsche-718-cayman-park-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-grey-porsche-718-cayman-park-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 470, title: "Grey Porsche 718 Garage Door", category: "cars", tags: "car cars wallpaper sports porsche 718 cayman", image: "images/pack/cars/car-photo-grey-porsche-718-garage-door.jpg", thumb: "images/pack/cars/thumbs/car-photo-grey-porsche-718-garage-door.jpg", wide: "images/pack/cars/car-photo-grey-porsche-718-garage-door-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-grey-porsche-718-garage-door-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 471, title: "Grey Porsche 718 Closeup", category: "cars", tags: "car cars wallpaper sports porsche 718 cayman closeup", image: "images/pack/cars/car-photo-grey-porsche-718-closeup.jpg", thumb: "images/pack/cars/thumbs/car-photo-grey-porsche-718-closeup.jpg", wide: "images/pack/cars/car-photo-grey-porsche-718-closeup-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-grey-porsche-718-closeup-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 472, title: "White Audi TT RS Forest", category: "cars", tags: "car cars wallpaper sports coupe audi tt rs white", image: "images/pack/cars/car-photo-white-audi-tt-rs-forest.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-audi-tt-rs-forest.jpg", wide: "images/pack/cars/car-photo-white-audi-tt-rs-forest-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-audi-tt-rs-forest-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 473, title: "Orange Nissan GT-R Front", category: "cars", tags: "car cars wallpaper jdm supercar nissan gtr orange", image: "images/pack/cars/car-photo-orange-nissan-gt-r-front.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-nissan-gt-r-front.jpg", wide: "images/pack/cars/car-photo-orange-nissan-gt-r-front-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-nissan-gt-r-front-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 474, title: "Teal Dodge Challenger Dusk", category: "cars", tags: "car cars wallpaper muscle dodge challenger teal dusk", image: "images/pack/cars/car-photo-teal-dodge-challenger-dusk.jpg", thumb: "images/pack/cars/thumbs/car-photo-teal-dodge-challenger-dusk.jpg", wide: "images/pack/cars/car-photo-teal-dodge-challenger-dusk-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-teal-dodge-challenger-dusk-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 475, title: "Stanced Red BMW 3 Series", category: "cars", tags: "car cars wallpaper tuned sports sedan bmw 3 series stance", image: "images/pack/cars/car-photo-stanced-red-bmw-3-series.jpg", thumb: "images/pack/cars/thumbs/car-photo-stanced-red-bmw-3-series.jpg", wide: "images/pack/cars/car-photo-stanced-red-bmw-3-series-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-stanced-red-bmw-3-series-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 476, title: "Black Challenger Green Halo Eyes", category: "cars", tags: "car cars wallpaper muscle dodge challenger green halo", image: "images/pack/cars/car-photo-black-challenger-green-halo-eyes.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-challenger-green-halo-eyes.jpg", wide: "images/pack/cars/car-photo-black-challenger-green-halo-eyes-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-challenger-green-halo-eyes-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 477, title: "Black Mustang GT500 Yellow Lines", category: "cars", tags: "car cars wallpaper muscle ford mustang gt500 yellow lines", image: "images/pack/cars/car-photo-black-mustang-gt500-yellow-lines.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-mustang-gt500-yellow-lines.jpg", wide: "images/pack/cars/car-photo-black-mustang-gt500-yellow-lines-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-mustang-gt500-yellow-lines-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 478, title: "Black Mustang GT500 Pines", category: "cars", tags: "car cars wallpaper muscle ford mustang gt500", image: "images/pack/cars/car-photo-black-mustang-gt500-pines.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-mustang-gt500-pines.jpg", wide: "images/pack/cars/car-photo-black-mustang-gt500-pines-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-mustang-gt500-pines-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 479, title: "Black Mustang GT500 Sunset Lot", category: "cars", tags: "car cars wallpaper muscle ford mustang gt500 sunset", image: "images/pack/cars/car-photo-black-mustang-gt500-sunset-lot.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-mustang-gt500-sunset-lot.jpg", wide: "images/pack/cars/car-photo-black-mustang-gt500-sunset-lot-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-mustang-gt500-sunset-lot-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 480, title: "Teal Audi R8 Street", category: "cars", tags: "car cars wallpaper supercar audi r8 teal", image: "images/pack/cars/car-photo-teal-audi-r8-street.jpg", thumb: "images/pack/cars/thumbs/car-photo-teal-audi-r8-street.jpg", wide: "images/pack/cars/car-photo-teal-audi-r8-street-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-teal-audi-r8-street-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 481, title: "Silver Honda Civic Field", category: "cars", tags: "car cars wallpaper hatch sports sedan honda civic", image: "images/pack/cars/car-photo-silver-honda-civic-field.jpg", thumb: "images/pack/cars/thumbs/car-photo-silver-honda-civic-field.jpg", wide: "images/pack/cars/car-photo-silver-honda-civic-field-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-silver-honda-civic-field-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 482, title: "Grey Track Supercar Big Wing", category: "cars", tags: "car cars wallpaper supercar track lamborghini wing desert", image: "images/pack/cars/car-photo-grey-track-supercar-big-wing.jpg", thumb: "images/pack/cars/thumbs/car-photo-grey-track-supercar-big-wing.jpg", wide: "images/pack/cars/car-photo-grey-track-supercar-big-wing-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-grey-track-supercar-big-wing-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 483, title: "Blue Sports Car Tree Tunnel", category: "cars", tags: "car cars wallpaper sports blue motion road", image: "images/pack/cars/car-photo-blue-sports-car-tree-tunnel.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-sports-car-tree-tunnel.jpg", wide: "images/pack/cars/car-photo-blue-sports-car-tree-tunnel-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-sports-car-tree-tunnel-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 484, title: "Blue Ford Focus RS", category: "cars", tags: "car cars wallpaper hot hatch ford focus rs hatchback", image: "images/pack/cars/car-photo-blue-ford-focus-rs.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-ford-focus-rs.jpg", wide: "images/pack/cars/car-photo-blue-ford-focus-rs-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-ford-focus-rs-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 485, title: "Orange Lamborghini Aventador Forest", category: "cars", tags: "car cars wallpaper supercar lamborghini aventador orange", image: "images/pack/cars/car-photo-orange-lamborghini-aventador-forest.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-lamborghini-aventador-forest.jpg", wide: "images/pack/cars/car-photo-orange-lamborghini-aventador-forest-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-lamborghini-aventador-forest-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 486, title: "Orange Nissan GT-R Concrete", category: "cars", tags: "car cars wallpaper jdm supercar nissan gtr orange", image: "images/pack/cars/car-photo-orange-nissan-gt-r-concrete.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-nissan-gt-r-concrete.jpg", wide: "images/pack/cars/car-photo-orange-nissan-gt-r-concrete-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-nissan-gt-r-concrete-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 487, title: "Grey Dodge Challenger Rolling", category: "cars", tags: "car cars wallpaper muscle dodge challenger motion", image: "images/pack/cars/car-photo-grey-dodge-challenger-rolling.jpg", thumb: "images/pack/cars/thumbs/car-photo-grey-dodge-challenger-rolling.jpg", wide: "images/pack/cars/car-photo-grey-dodge-challenger-rolling-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-grey-dodge-challenger-rolling-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 488, title: "Red Kia Stinger", category: "cars", tags: "car cars wallpaper sports sedan gt kia stinger red", image: "images/pack/cars/car-photo-red-kia-stinger.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-kia-stinger.jpg", wide: "images/pack/cars/car-photo-red-kia-stinger-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-kia-stinger-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 489, title: "White Audi R8 LMS GT", category: "cars", tags: "car cars wallpaper supercar track audi r8 lms racing", image: "images/pack/cars/car-photo-white-audi-r8-lms-gt.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-audi-r8-lms-gt.jpg", wide: "images/pack/cars/car-photo-white-audi-r8-lms-gt-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-audi-r8-lms-gt-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 490, title: "Red 1970 Chevelle SS", category: "cars", tags: "car cars wallpaper classic muscle chevrolet chevelle ss vintage", image: "images/pack/cars/car-photo-red-1970-chevelle-ss.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-1970-chevelle-ss.jpg", wide: "images/pack/cars/car-photo-red-1970-chevelle-ss-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-1970-chevelle-ss-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 491, title: "Bronze BMW Z4 Concept", category: "cars", tags: "car cars wallpaper roadster concept luxury bmw z4", image: "images/pack/cars/car-photo-bronze-bmw-z4-concept.jpg", thumb: "images/pack/cars/thumbs/car-photo-bronze-bmw-z4-concept.jpg", wide: "images/pack/cars/car-photo-bronze-bmw-z4-concept-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-bronze-bmw-z4-concept-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 492, title: "Yellow Ferrari Night Street", category: "cars", tags: "car cars wallpaper supercar roadster ferrari yellow night", image: "images/pack/cars/car-photo-yellow-ferrari-night-street.jpg", thumb: "images/pack/cars/thumbs/car-photo-yellow-ferrari-night-street.jpg", wide: "images/pack/cars/car-photo-yellow-ferrari-night-street-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-yellow-ferrari-night-street-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 493, title: "Red Ferrari Testarossa", category: "cars", tags: "car cars wallpaper classic supercar ferrari testarossa retro 80s", image: "images/pack/cars/car-photo-red-ferrari-testarossa.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-ferrari-testarossa.jpg", wide: "images/pack/cars/car-photo-red-ferrari-testarossa-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-ferrari-testarossa-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 494, title: "Red Porsche 911 GT3 RS Dark", category: "cars", tags: "car cars wallpaper sports track porsche 911 gt3 rs", image: "images/pack/cars/car-photo-red-porsche-911-gt3-rs-dark.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-porsche-911-gt3-rs-dark.jpg", wide: "images/pack/cars/car-photo-red-porsche-911-gt3-rs-dark-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-porsche-911-gt3-rs-dark-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 495, title: "Audi R8 Golden Hour Road", category: "cars", tags: "car cars wallpaper supercar audi r8 sunset", image: "images/pack/cars/car-photo-audi-r8-golden-hour-road.jpg", thumb: "images/pack/cars/thumbs/car-photo-audi-r8-golden-hour-road.jpg", wide: "images/pack/cars/car-photo-audi-r8-golden-hour-road-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-audi-r8-golden-hour-road-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 496, title: "Audi R8 Sunset Closeup", category: "cars", tags: "car cars wallpaper supercar audi r8 sunset closeup", image: "images/pack/cars/car-photo-audi-r8-sunset-closeup.jpg", thumb: "images/pack/cars/thumbs/car-photo-audi-r8-sunset-closeup.jpg", wide: "images/pack/cars/car-photo-audi-r8-sunset-closeup-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-audi-r8-sunset-closeup-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 497, title: "Black BMW Studio Dark", category: "cars", tags: "car cars wallpaper sports bmw dark studio", image: "images/pack/cars/car-photo-black-bmw-studio-dark.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-bmw-studio-dark.jpg", wide: "images/pack/cars/car-photo-black-bmw-studio-dark-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-bmw-studio-dark-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 498, title: "Rolls-Royce Wraith Miami", category: "cars", tags: "car cars wallpaper luxury rolls royce wraith city", image: "images/pack/cars/car-photo-rolls-royce-wraith-miami.jpg", thumb: "images/pack/cars/thumbs/car-photo-rolls-royce-wraith-miami.jpg", wide: "images/pack/cars/car-photo-rolls-royce-wraith-miami-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-rolls-royce-wraith-miami-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 499, title: "Black BMW E46 M3 Road Level", category: "cars", tags: "car cars wallpaper classic sports sedan bmw e46 m3 low angle", image: "images/pack/cars/car-photo-black-bmw-e46-m3-road-level.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-bmw-e46-m3-road-level.jpg", wide: "images/pack/cars/car-photo-black-bmw-e46-m3-road-level-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-bmw-e46-m3-road-level-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 500, title: "Red Porsche 911 Carrera Rain", category: "cars", tags: "car cars wallpaper sports porsche 911 carrera red", image: "images/pack/cars/car-photo-red-porsche-911-carrera-rain.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-porsche-911-carrera-rain.jpg", wide: "images/pack/cars/car-photo-red-porsche-911-carrera-rain-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-porsche-911-carrera-rain-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 501, title: "Nissan GT-R Snowy Mountain", category: "cars", tags: "car cars wallpaper jdm supercar nissan gtr snow mountain", image: "images/pack/cars/car-photo-nissan-gt-r-snowy-mountain.jpg", thumb: "images/pack/cars/thumbs/car-photo-nissan-gt-r-snowy-mountain.jpg", wide: "images/pack/cars/car-photo-nissan-gt-r-snowy-mountain-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-nissan-gt-r-snowy-mountain-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 502, title: "Red Audi RS6 Avant Motion", category: "cars", tags: "car cars wallpaper performance wagon luxury audi rs6 avant motion", image: "images/pack/cars/car-photo-red-audi-rs6-avant-motion.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-audi-rs6-avant-motion.jpg", wide: "images/pack/cars/car-photo-red-audi-rs6-avant-motion-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-audi-rs6-avant-motion-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 503, title: "White Camaro ZL1 Garage", category: "cars", tags: "car cars wallpaper muscle chevrolet camaro zl1 garage", image: "images/pack/cars/car-photo-white-camaro-zl1-garage.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-camaro-zl1-garage.jpg", wide: "images/pack/cars/car-photo-white-camaro-zl1-garage-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-camaro-zl1-garage-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 504, title: "Gold Sports Car Meadow", category: "cars", tags: "car cars wallpaper supercar low angle meadow gold", image: "images/pack/cars/car-photo-gold-sports-car-meadow.jpg", thumb: "images/pack/cars/thumbs/car-photo-gold-sports-car-meadow.jpg", wide: "images/pack/cars/car-photo-gold-sports-car-meadow-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-gold-sports-car-meadow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 505, title: "White BMW M4 Gas Station", category: "cars", tags: "car cars wallpaper sports coupe bmw m4 rear night", image: "images/pack/cars/car-photo-white-bmw-m4-gas-station.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-bmw-m4-gas-station.jpg", wide: "images/pack/cars/car-photo-white-bmw-m4-gas-station-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-bmw-m4-gas-station-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 506, title: "BMW M3 and Mercedes C63 Dusk", category: "cars", tags: "car cars wallpaper sports sedan luxury bmw m3 mercedes c63 amg", image: "images/pack/cars/car-photo-bmw-m3-and-mercedes-c63-dusk.jpg", thumb: "images/pack/cars/thumbs/car-photo-bmw-m3-and-mercedes-c63-dusk.jpg", wide: "images/pack/cars/car-photo-bmw-m3-and-mercedes-c63-dusk-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-bmw-m3-and-mercedes-c63-dusk-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 507, title: "BMW M3 and Mercedes AMG Garage", category: "cars", tags: "car cars wallpaper sports sedan luxury bmw m3 mercedes amg garage", image: "images/pack/cars/car-photo-bmw-m3-and-mercedes-amg-garage.jpg", thumb: "images/pack/cars/thumbs/car-photo-bmw-m3-and-mercedes-amg-garage.jpg", wide: "images/pack/cars/car-photo-bmw-m3-and-mercedes-amg-garage-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-bmw-m3-and-mercedes-amg-garage-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 508, title: "Black Corvette C8 Autumn", category: "cars", tags: "car cars wallpaper sports supercar chevrolet corvette c8", image: "images/pack/cars/car-photo-black-corvette-c8-autumn.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-corvette-c8-autumn.jpg", wide: "images/pack/cars/car-photo-black-corvette-c8-autumn-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-corvette-c8-autumn-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 509, title: "Mercedes AMG and BMW M Headlights", category: "cars", tags: "car cars wallpaper luxury detail sports sedan mercedes amg bmw m headlight closeup", image: "images/pack/cars/car-photo-mercedes-amg-and-bmw-m-headlights.jpg", thumb: "images/pack/cars/thumbs/car-photo-mercedes-amg-and-bmw-m-headlights.jpg", wide: "images/pack/cars/car-photo-mercedes-amg-and-bmw-m-headlights-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-mercedes-amg-and-bmw-m-headlights-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 510, title: "White Lamborghini Huracan City", category: "cars", tags: "car cars wallpaper supercar lamborghini huracan white", image: "images/pack/cars/car-photo-white-lamborghini-huracan-city.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-lamborghini-huracan-city.jpg", wide: "images/pack/cars/car-photo-white-lamborghini-huracan-city-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-lamborghini-huracan-city-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 511, title: "Red Challenger Hellcat Times Square", category: "cars", tags: "car cars wallpaper muscle dodge challenger hellcat new york", image: "images/pack/cars/car-photo-red-challenger-hellcat-times-square.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-challenger-hellcat-times-square.jpg", wide: "images/pack/cars/car-photo-red-challenger-hellcat-times-square-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-challenger-hellcat-times-square-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 512, title: "Audi R8 Autumn Leaves", category: "cars", tags: "car cars wallpaper supercar audi r8 autumn", image: "images/pack/cars/car-photo-audi-r8-autumn-leaves.jpg", thumb: "images/pack/cars/thumbs/car-photo-audi-r8-autumn-leaves.jpg", wide: "images/pack/cars/car-photo-audi-r8-autumn-leaves-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-audi-r8-autumn-leaves-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 513, title: "Mustang Blue Neon Garage", category: "cars", tags: "car cars wallpaper muscle ford mustang neon", image: "images/pack/cars/car-photo-mustang-blue-neon-garage.jpg", thumb: "images/pack/cars/thumbs/car-photo-mustang-blue-neon-garage.jpg", wide: "images/pack/cars/car-photo-mustang-blue-neon-garage-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-mustang-blue-neon-garage-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 514, title: "Red and Black Audi R8 Race Wing", category: "cars", tags: "car cars wallpaper supercar track tuned audi r8 wing", image: "images/pack/cars/car-photo-red-and-black-audi-r8-race-wing.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-and-black-audi-r8-race-wing.jpg", wide: "images/pack/cars/car-photo-red-and-black-audi-r8-race-wing-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-and-black-audi-r8-race-wing-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 515, title: "White BMW M4 Carbon Grille", category: "cars", tags: "car cars wallpaper sports coupe bmw m4 front", image: "images/pack/cars/car-photo-white-bmw-m4-carbon-grille.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-bmw-m4-carbon-grille.jpg", wide: "images/pack/cars/car-photo-white-bmw-m4-carbon-grille-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-bmw-m4-carbon-grille-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 516, title: "Black Porsche 911 Street Rear", category: "cars", tags: "car cars wallpaper sports porsche 911 rear city", image: "images/pack/cars/car-photo-black-porsche-911-street-rear.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-porsche-911-street-rear.jpg", wide: "images/pack/cars/car-photo-black-porsche-911-street-rear-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-porsche-911-street-rear-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 517, title: "Orange McLaren Autumn", category: "cars", tags: "car cars wallpaper supercar mclaren orange", image: "images/pack/cars/car-photo-orange-mclaren-autumn.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-mclaren-autumn.jpg", wide: "images/pack/cars/car-photo-orange-mclaren-autumn-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-mclaren-autumn-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 518, title: "Silver Concept Coupe Studio", category: "cars", tags: "car cars wallpaper concept gt renault trezor white studio", image: "images/pack/cars/car-photo-silver-concept-coupe-studio.jpg", thumb: "images/pack/cars/thumbs/car-photo-silver-concept-coupe-studio.jpg", wide: "images/pack/cars/car-photo-silver-concept-coupe-studio-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-silver-concept-coupe-studio-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 519, title: "Bugatti Chiron Pavilion", category: "cars", tags: "car cars wallpaper hypercar bugatti chiron", image: "images/pack/cars/car-photo-bugatti-chiron-pavilion.jpg", thumb: "images/pack/cars/thumbs/car-photo-bugatti-chiron-pavilion.jpg", wide: "images/pack/cars/car-photo-bugatti-chiron-pavilion-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-bugatti-chiron-pavilion-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 520, title: "Blue Camaro SS Desert", category: "cars", tags: "car cars wallpaper muscle chevrolet camaro ss blue desert", image: "images/pack/cars/car-photo-blue-camaro-ss-desert.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-camaro-ss-desert.jpg", wide: "images/pack/cars/car-photo-blue-camaro-ss-desert-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-camaro-ss-desert-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 521, title: "White BMW M3 Aerial", category: "cars", tags: "car cars wallpaper sports sedan bmw m3 top view", image: "images/pack/cars/car-photo-white-bmw-m3-aerial.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-bmw-m3-aerial.jpg", wide: "images/pack/cars/car-photo-white-bmw-m3-aerial-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-bmw-m3-aerial-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 522, title: "Green Mustang GT Top View", category: "cars", tags: "car cars wallpaper muscle ford mustang gt green top view", image: "images/pack/cars/car-photo-green-mustang-gt-top-view.jpg", thumb: "images/pack/cars/thumbs/car-photo-green-mustang-gt-top-view.jpg", wide: "images/pack/cars/car-photo-green-mustang-gt-top-view-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-green-mustang-gt-top-view-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 523, title: "Vintage Teal Mustang Closeup", category: "cars", tags: "car cars wallpaper classic muscle ford mustang vintage retro", image: "images/pack/cars/car-photo-vintage-teal-mustang-closeup.jpg", thumb: "images/pack/cars/thumbs/car-photo-vintage-teal-mustang-closeup.jpg", wide: "images/pack/cars/car-photo-vintage-teal-mustang-closeup-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-vintage-teal-mustang-closeup-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 524, title: "Blue Sports Car Brick Driveway", category: "cars", tags: "car cars wallpaper sports dusk driveway", image: "images/pack/cars/car-photo-blue-sports-car-brick-driveway.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-sports-car-brick-driveway.jpg", wide: "images/pack/cars/car-photo-blue-sports-car-brick-driveway-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-sports-car-brick-driveway-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 525, title: "Dark BMW Coupe Hill Road", category: "cars", tags: "car cars wallpaper sports coupe bmw 4 series hill", image: "images/pack/cars/car-photo-dark-bmw-coupe-hill-road.jpg", thumb: "images/pack/cars/thumbs/car-photo-dark-bmw-coupe-hill-road.jpg", wide: "images/pack/cars/car-photo-dark-bmw-coupe-hill-road-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-dark-bmw-coupe-hill-road-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 526, title: "Red 1967 Mustang Classic", category: "cars", tags: "car cars wallpaper classic muscle ford mustang 1967 vintage", image: "images/pack/cars/car-photo-red-1967-mustang-classic.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-1967-mustang-classic.jpg", wide: "images/pack/cars/car-photo-red-1967-mustang-classic-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-1967-mustang-classic-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 527, title: "Silver BMW M8 Coupe", category: "cars", tags: "car cars wallpaper luxury gt bmw m8 coupe", image: "images/pack/cars/car-photo-silver-bmw-m8-coupe.jpg", thumb: "images/pack/cars/thumbs/car-photo-silver-bmw-m8-coupe.jpg", wide: "images/pack/cars/car-photo-silver-bmw-m8-coupe-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-silver-bmw-m8-coupe-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 528, title: "Grey Audi R8 Rear Hill", category: "cars", tags: "car cars wallpaper supercar audi r8 rear", image: "images/pack/cars/car-photo-grey-audi-r8-rear-hill.jpg", thumb: "images/pack/cars/thumbs/car-photo-grey-audi-r8-rear-hill.jpg", wide: "images/pack/cars/car-photo-grey-audi-r8-rear-hill-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-grey-audi-r8-rear-hill-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 529, title: "White Audi RS7 and RS6 Mountains", category: "cars", tags: "car cars wallpaper luxury performance sedan audi rs7 rs6 sunset", image: "images/pack/cars/car-photo-white-audi-rs7-and-rs6-mountains.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-audi-rs7-and-rs6-mountains.jpg", wide: "images/pack/cars/car-photo-white-audi-rs7-and-rs6-mountains-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-audi-rs7-and-rs6-mountains-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 530, title: "Shelby GT350R Rear Sunset", category: "cars", tags: "car cars wallpaper muscle ford mustang shelby gt350r rear sunset", image: "images/pack/cars/car-photo-shelby-gt350r-rear-sunset.jpg", thumb: "images/pack/cars/thumbs/car-photo-shelby-gt350r-rear-sunset.jpg", wide: "images/pack/cars/car-photo-shelby-gt350r-rear-sunset-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-shelby-gt350r-rear-sunset-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 531, title: "Silver Aston Martin Vantage Roadster", category: "cars", tags: "car cars wallpaper roadster gt luxury aston martin vantage convertible", image: "images/pack/cars/car-photo-silver-aston-martin-vantage-roadster.jpg", thumb: "images/pack/cars/thumbs/car-photo-silver-aston-martin-vantage-roadster.jpg", wide: "images/pack/cars/car-photo-silver-aston-martin-vantage-roadster-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-silver-aston-martin-vantage-roadster-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 532, title: "Shelby GT350 Dry Hills", category: "cars", tags: "car cars wallpaper muscle ford mustang shelby gt350", image: "images/pack/cars/car-photo-shelby-gt350-dry-hills.jpg", thumb: "images/pack/cars/thumbs/car-photo-shelby-gt350-dry-hills.jpg", wide: "images/pack/cars/car-photo-shelby-gt350-dry-hills-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-shelby-gt350-dry-hills-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 533, title: "Audi R8 Pink Sky Rear", category: "cars", tags: "car cars wallpaper supercar audi r8 sunset", image: "images/pack/cars/car-photo-audi-r8-pink-sky-rear.jpg", thumb: "images/pack/cars/thumbs/car-photo-audi-r8-pink-sky-rear.jpg", wide: "images/pack/cars/car-photo-audi-r8-pink-sky-rear-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-audi-r8-pink-sky-rear-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 534, title: "Blue Shelby GT500 Motion", category: "cars", tags: "car cars wallpaper muscle ford mustang shelby gt500 motion", image: "images/pack/cars/car-photo-blue-shelby-gt500-motion.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-shelby-gt500-motion.jpg", wide: "images/pack/cars/car-photo-blue-shelby-gt500-motion-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-shelby-gt500-motion-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 535, title: "Black Mustang Rear Motion Blur", category: "cars", tags: "car cars wallpaper muscle ford mustang rear motion", image: "images/pack/cars/car-photo-black-mustang-rear-motion-blur.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-mustang-rear-motion-blur.jpg", wide: "images/pack/cars/car-photo-black-mustang-rear-motion-blur-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-mustang-rear-motion-blur-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 536, title: "Blue Aston Martin Vantage Coast", category: "cars", tags: "car cars wallpaper gt luxury aston martin vantage coast", image: "images/pack/cars/car-photo-blue-aston-martin-vantage-coast.jpg", thumb: "images/pack/cars/thumbs/car-photo-blue-aston-martin-vantage-coast.jpg", wide: "images/pack/cars/car-photo-blue-aston-martin-vantage-coast-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-blue-aston-martin-vantage-coast-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 537, title: "White Electric Hypercar Dusk", category: "cars", tags: "car cars wallpaper hypercar lotus evija white electric", image: "images/pack/cars/car-photo-white-electric-hypercar-dusk.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-electric-hypercar-dusk.jpg", wide: "images/pack/cars/car-photo-white-electric-hypercar-dusk-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-electric-hypercar-dusk-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 538, title: "Orange Nissan 350Z Hangar", category: "cars", tags: "car cars wallpaper jdm sports coupe nissan 350z orange", image: "images/pack/cars/car-photo-orange-nissan-350z-hangar.jpg", thumb: "images/pack/cars/thumbs/car-photo-orange-nissan-350z-hangar.jpg", wide: "images/pack/cars/car-photo-orange-nissan-350z-hangar-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-orange-nissan-350z-hangar-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 539, title: "Dark Audi R8 Studio", category: "cars", tags: "car cars wallpaper supercar audi r8 dark night", image: "images/pack/cars/car-photo-dark-audi-r8-studio.jpg", thumb: "images/pack/cars/thumbs/car-photo-dark-audi-r8-studio.jpg", wide: "images/pack/cars/car-photo-dark-audi-r8-studio-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-dark-audi-r8-studio-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 540, title: "Red Nissan Drift Coupe Garage", category: "cars", tags: "car cars wallpaper jdm drift tuned nissan 180sx silvia", image: "images/pack/cars/car-photo-red-nissan-drift-coupe-garage.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-nissan-drift-coupe-garage.jpg", wide: "images/pack/cars/car-photo-red-nissan-drift-coupe-garage-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-nissan-drift-coupe-garage-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 541, title: "White Lamborghini Huracan EVO", category: "cars", tags: "car cars wallpaper supercar lamborghini huracan evo white", image: "images/pack/cars/car-photo-white-lamborghini-huracan-evo.jpg", thumb: "images/pack/cars/thumbs/car-photo-white-lamborghini-huracan-evo.jpg", wide: "images/pack/cars/car-photo-white-lamborghini-huracan-evo-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-white-lamborghini-huracan-evo-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 542, title: "Yellow Lamborghini Aventador SVJ", category: "cars", tags: "car cars wallpaper supercar lamborghini aventador svj yellow", image: "images/pack/cars/car-photo-yellow-lamborghini-aventador-svj.jpg", thumb: "images/pack/cars/thumbs/car-photo-yellow-lamborghini-aventador-svj.jpg", wide: "images/pack/cars/car-photo-yellow-lamborghini-aventador-svj-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-yellow-lamborghini-aventador-svj-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 543, title: "Black BMW Pink Autumn Leaves", category: "cars", tags: "car cars wallpaper sports sedan bmw 3 series autumn pink", image: "images/pack/cars/car-photo-black-bmw-pink-autumn-leaves.jpg", thumb: "images/pack/cars/thumbs/car-photo-black-bmw-pink-autumn-leaves.jpg", wide: "images/pack/cars/car-photo-black-bmw-pink-autumn-leaves-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-black-bmw-pink-autumn-leaves-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 544, title: "Red Camaro Yellow Line Road", category: "cars", tags: "car cars wallpaper muscle chevrolet camaro red", image: "images/pack/cars/car-photo-red-camaro-yellow-line-road.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-camaro-yellow-line-road.jpg", wide: "images/pack/cars/car-photo-red-camaro-yellow-line-road-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-camaro-yellow-line-road-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 545, title: "Red Chevelle SS Closeup", category: "cars", tags: "car cars wallpaper classic muscle chevrolet chevelle ss vintage", image: "images/pack/cars/car-photo-red-chevelle-ss-closeup.jpg", thumb: "images/pack/cars/thumbs/car-photo-red-chevelle-ss-closeup.jpg", wide: "images/pack/cars/car-photo-red-chevelle-ss-closeup-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-red-chevelle-ss-closeup-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 546, title: "Green BMW M4 Hillside", category: "cars", tags: "car cars wallpaper sports coupe bmw m4 green", image: "images/pack/cars/car-photo-green-bmw-m4-hillside.jpg", thumb: "images/pack/cars/thumbs/car-photo-green-bmw-m4-hillside.jpg", wide: "images/pack/cars/car-photo-green-bmw-m4-hillside-wide.jpg", wideThumb: "images/pack/cars/thumbs/car-photo-green-bmw-m4-hillside-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 547, title: "Sasuke Covering Eye", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/sasuke-covering-eye-0781.mp4", poster: "images/live/anime/posters/sasuke-covering-eye-0781.jpg", views: 0, downloads: 0 },
    { id: 548, title: "Gothic Empress Red Eye", category: "anime", tags: "anime live wallpaper live video animated dark girl female woman anime girl", type: "video", video: "images/live/anime/gothic-empress-red-eye-e804.mp4", poster: "images/live/anime/posters/gothic-empress-red-eye-e804.jpg", views: 0, downloads: 0 },
    { id: 549, title: "Higuruma Hiromi Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen", type: "video", video: "images/live/anime/higuruma-hiromi-jujutsu-kaisen-d5bc.mp4", poster: "images/live/anime/posters/higuruma-hiromi-jujutsu-kaisen-d5bc.jpg", views: 0, downloads: 0 },
    { id: 550, title: "Hatsune Miku China Dress", category: "anime", tags: "anime live wallpaper live video animated hatsune miku girl female woman anime girl", type: "video", video: "images/live/anime/hatsune-miku-china-dress-fe6e.mp4", poster: "images/live/anime/posters/hatsune-miku-china-dress-fe6e.jpg", views: 0, downloads: 0 },
    { id: 551, title: "Yuno From Black Clover", category: "anime", tags: "anime live wallpaper live video animated black clover boy male guy anime boy", type: "video", video: "images/live/anime/yuno-from-black-clover-8735.mp4", poster: "images/live/anime/posters/yuno-from-black-clover-8735.jpg", views: 0, downloads: 0 },
    { id: 552, title: "Satoru Gojo Blue Infused Strikes", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-blue-infused-strikes-7022.mp4", poster: "images/live/anime/posters/satoru-gojo-blue-infused-strikes-7022.jpg", views: 0, downloads: 0 },
    { id: 553, title: "Samurai Moonlit Ocean", category: "anime", tags: "anime live wallpaper live video animated samurai moon boy male guy anime boy", type: "video", video: "images/live/anime/samurai-moonlit-ocean-c6f1.mp4", poster: "images/live/anime/posters/samurai-moonlit-ocean-c6f1.jpg", views: 0, downloads: 0 },
    { id: 554, title: "Monochrome Daydreams", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/monochrome-daydreams-cdf6.mp4", poster: "images/live/anime/posters/monochrome-daydreams-cdf6.jpg", views: 0, downloads: 0 },
    { id: 555, title: "Gabimaru Monochrome Hells Paradise", category: "anime", tags: "anime live wallpaper live video animated boy male guy anime boy", type: "video", video: "images/live/anime/gabimaru-monochrome-hells-paradise-1d14.mp4", poster: "images/live/anime/posters/gabimaru-monochrome-hells-paradise-1d14.jpg", views: 0, downloads: 0 },
    { id: 556, title: "Marin Kitagawa Smile", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/marin-kitagawa-smile-1b9e.mp4", poster: "images/live/anime/posters/marin-kitagawa-smile-1b9e.jpg", views: 0, downloads: 0 },
    { id: 557, title: "Celestial Veil", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/celestial-veil-7482.mp4", poster: "images/live/anime/posters/celestial-veil-7482.jpg", views: 0, downloads: 0 },
    { id: 558, title: "Scarlet Phantom", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/scarlet-phantom-1e8f.mp4", poster: "images/live/anime/posters/scarlet-phantom-1e8f.jpg", views: 0, downloads: 0 },
    { id: 559, title: "Sukuna", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/sukuna-2339.mp4", poster: "images/live/anime/posters/sukuna-2339.jpg", views: 0, downloads: 0 },
    { id: 560, title: "Epic Zoro Green Aura Slash", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/epic-zoro-green-aura-slash-d1cf.mp4", poster: "images/live/anime/posters/epic-zoro-green-aura-slash-d1cf.jpg", views: 0, downloads: 0 },
    { id: 561, title: "Shorekeeper Butterflies", category: "anime", tags: "anime live wallpaper live video animated wuthering waves girl female woman anime girl", type: "video", video: "images/live/anime/shorekeeper-butterflies-17d6.mp4", poster: "images/live/anime/posters/shorekeeper-butterflies-17d6.jpg", views: 0, downloads: 0 },
    { id: 562, title: "Satoru Gojo With Sunglasses", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-with-sunglasses-9d1d.mp4", poster: "images/live/anime/posters/satoru-gojo-with-sunglasses-9d1d.jpg", views: 0, downloads: 0 },
    { id: 563, title: "Madara X Obito Blood Moon", category: "anime", tags: "anime live wallpaper live video animated naruto moon boy male guy anime boy", type: "video", video: "images/live/anime/madara-x-obito-blood-moon-68bb.mp4", poster: "images/live/anime/posters/madara-x-obito-blood-moon-68bb.jpg", views: 0, downloads: 0 },
    { id: 564, title: "Rahu Path To Nowhere Dark", category: "anime", tags: "anime live wallpaper live video animated dark", type: "video", video: "images/live/anime/rahu-path-to-nowhere-dark-f0f8.mp4", poster: "images/live/anime/posters/rahu-path-to-nowhere-dark-f0f8.jpg", views: 0, downloads: 0 },
    { id: 565, title: "Rengoku Flame Hashira Demon Slayer", category: "anime", tags: "anime live wallpaper live video animated demon slayer fire dark boy male guy anime boy", type: "video", video: "images/live/anime/rengoku-flame-hashira-demon-slayer-e616.mp4", poster: "images/live/anime/posters/rengoku-flame-hashira-demon-slayer-e616.jpg", views: 0, downloads: 0 },
    { id: 566, title: "Moonlit Blade Samurais Silent Horizon", category: "anime", tags: "anime live wallpaper live video animated samurai sunset moon", type: "video", video: "images/live/anime/moonlit-blade-samurais-silent-horizon-bd6d.mp4", poster: "images/live/anime/posters/moonlit-blade-samurais-silent-horizon-bd6d.jpg", views: 0, downloads: 0 },
    { id: 567, title: "Zero Two Toyota GR", category: "anime", tags: "anime live wallpaper live video animated darling in the franxx car", type: "video", video: "images/live/anime/zero-two-toyota-gr-78d1.mp4", poster: "images/live/anime/posters/zero-two-toyota-gr-78d1.jpg", views: 0, downloads: 0 },
    { id: 568, title: "Zenitsu Demon Slayer", category: "anime", tags: "anime live wallpaper live video animated demon slayer dark boy male guy anime boy", type: "video", video: "images/live/anime/zenitsu-demon-slayer-2a88.mp4", poster: "images/live/anime/posters/zenitsu-demon-slayer-2a88.jpg", views: 0, downloads: 0 },
    { id: 569, title: "Cloud Strife Tifa Lockhart Final Fantasy Vii Remake", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/cloud-strife-tifa-lockhart-final-fantasy-vii-remake-c3fa.mp4", poster: "images/live/anime/posters/cloud-strife-tifa-lockhart-final-fantasy-vii-remake-c3fa.jpg", views: 0, downloads: 0 },
    { id: 570, title: "Anime Live Wallpaper 1", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-1-75b3.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-1-75b3.jpg", views: 0, downloads: 0 },
    { id: 571, title: "Dragon Ball Prince Vegeta", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/dragon-ball-prince-vegeta-b74b.mp4", poster: "images/live/anime/posters/dragon-ball-prince-vegeta-b74b.jpg", views: 0, downloads: 0 },
    { id: 572, title: "Red Halo Devil Girl", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/red-halo-devil-girl-cc1c.mp4", poster: "images/live/anime/posters/red-halo-devil-girl-cc1c.jpg", views: 0, downloads: 0 },
    { id: 573, title: "Shindou Takeshi Energy Spiral", category: "anime", tags: "anime live wallpaper live video animated boy male guy anime boy", type: "video", video: "images/live/anime/shindou-takeshi-energy-spiral-8263.mp4", poster: "images/live/anime/posters/shindou-takeshi-energy-spiral-8263.jpg", views: 0, downloads: 0 },
    { id: 574, title: "Anime Live Wallpaper 2", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-2-5c75.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-2-5c75.jpg", views: 0, downloads: 0 },
    { id: 575, title: "Elaina Sleepy Wandering Witch", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/elaina-sleepy-wandering-witch-290a.mp4", poster: "images/live/anime/posters/elaina-sleepy-wandering-witch-290a.jpg", views: 0, downloads: 0 },
    { id: 576, title: "Yuta Okkotsu Curse Spirit", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-okkotsu-curse-spirit-dfd9.mp4", poster: "images/live/anime/posters/yuta-okkotsu-curse-spirit-dfd9.jpg", views: 0, downloads: 0 },
    { id: 577, title: "Young Girl Samurai", category: "anime", tags: "anime live wallpaper live video animated samurai girl female woman anime girl boy male guy anime boy", type: "video", video: "images/live/anime/young-girl-samurai-0a61.mp4", poster: "images/live/anime/posters/young-girl-samurai-0a61.jpg", views: 0, downloads: 0 },
    { id: 578, title: "Toji Fushiguros Heavenly Restriction", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/toji-fushiguros-heavenly-restriction-0685.mp4", poster: "images/live/anime/posters/toji-fushiguros-heavenly-restriction-0685.jpg", views: 0, downloads: 0 },
    { id: 579, title: "Goku", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-2305.mp4", poster: "images/live/anime/posters/goku-2305.jpg", views: 0, downloads: 0 },
    { id: 580, title: "Gojo Prison Realm", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-prison-realm-5acc.mp4", poster: "images/live/anime/posters/gojo-prison-realm-5acc.jpg", views: 0, downloads: 0 },
    { id: 581, title: "Yuta Manga Scroll", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-manga-scroll-cc4d.mp4", poster: "images/live/anime/posters/yuta-manga-scroll-cc4d.jpg", views: 0, downloads: 0 },
    { id: 582, title: "Galaxy Eyes", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/galaxy-eyes-b73e.mp4", poster: "images/live/anime/posters/galaxy-eyes-b73e.jpg", views: 0, downloads: 0 },
    { id: 583, title: "Tanjiro Kamado Kimetsu No Yaiba", category: "anime", tags: "anime live wallpaper live video animated demon slayer boy male guy anime boy", type: "video", video: "images/live/anime/tanjiro-kamado-kimetsu-no-yaiba-1d6e.mp4", poster: "images/live/anime/posters/tanjiro-kamado-kimetsu-no-yaiba-1d6e.jpg", views: 0, downloads: 0 },
    { id: 584, title: "Gojo Vs Sukuna", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-vs-sukuna-421e.mp4", poster: "images/live/anime/posters/gojo-vs-sukuna-421e.jpg", views: 0, downloads: 0 },
    { id: 585, title: "Gojo Satoru Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-jujutsu-kaisen-04d4.mp4", poster: "images/live/anime/posters/gojo-satoru-jujutsu-kaisen-04d4.jpg", views: 0, downloads: 0 },
    { id: 586, title: "Luffys Mighty Gear", category: "anime", tags: "anime live wallpaper live video animated one piece", type: "video", video: "images/live/anime/luffys-mighty-gear-367a.mp4", poster: "images/live/anime/posters/luffys-mighty-gear-367a.jpg", views: 0, downloads: 0 },
    { id: 587, title: "Luffy Smoke One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/luffy-smoke-one-piece-7fcf.mp4", poster: "images/live/anime/posters/luffy-smoke-one-piece-7fcf.jpg", views: 0, downloads: 0 },
    { id: 588, title: "Luffys Winter Joy", category: "anime", tags: "anime live wallpaper live video animated snow", type: "video", video: "images/live/anime/luffys-winter-joy-38c1.mp4", poster: "images/live/anime/posters/luffys-winter-joy-38c1.jpg", views: 0, downloads: 0 },
    { id: 589, title: "Ajitani Hifumi Swimsuit Blue Archive", category: "anime", tags: "anime live wallpaper live video animated blue archive girl female woman anime girl", type: "video", video: "images/live/anime/ajitani-hifumi-swimsuit-blue-archive-584d.mp4", poster: "images/live/anime/posters/ajitani-hifumi-swimsuit-blue-archive-584d.jpg", views: 0, downloads: 0 },
    { id: 590, title: "Yuji Itadori Inner Collapse JJK", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuji-itadori-inner-collapse-jjk-6b7b.mp4", poster: "images/live/anime/posters/yuji-itadori-inner-collapse-jjk-6b7b.jpg", views: 0, downloads: 0 },
    { id: 591, title: "Tanjiro Kamado Flame Breathing", category: "anime", tags: "anime live wallpaper live video animated demon slayer fire boy male guy anime boy", type: "video", video: "images/live/anime/tanjiro-kamado-flame-breathing-4137.mp4", poster: "images/live/anime/posters/tanjiro-kamado-flame-breathing-4137.jpg", views: 0, downloads: 0 },
    { id: 592, title: "Crimson Anime Eyes", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/crimson-anime-eyes-890b.mp4", poster: "images/live/anime/posters/crimson-anime-eyes-890b.jpg", views: 0, downloads: 0 },
    { id: 593, title: "Demon Slayer Tanjiro Rainy Night", category: "anime", tags: "anime live wallpaper live video animated demon slayer rain dark boy male guy anime boy", type: "video", video: "images/live/anime/demon-slayer-tanjiro-rainy-night-7aa3.mp4", poster: "images/live/anime/posters/demon-slayer-tanjiro-rainy-night-7aa3.jpg", views: 0, downloads: 0 },
    { id: 594, title: "Tranquil Lakeside Reading", category: "anime", tags: "anime live wallpaper live video animated cozy", type: "video", video: "images/live/anime/tranquil-lakeside-reading-f5db.mp4", poster: "images/live/anime/posters/tranquil-lakeside-reading-f5db.jpg", views: 0, downloads: 0 },
    { id: 595, title: "Ghost City Showdown Gengar Anime", category: "anime", tags: "anime live wallpaper live video animated pokemon city", type: "video", video: "images/live/anime/ghost-city-showdown-gengar-anime-95e2.mp4", poster: "images/live/anime/posters/ghost-city-showdown-gengar-anime-95e2.jpg", views: 0, downloads: 0 },
    { id: 596, title: "Itachi Uchiha Eternal Flame", category: "anime", tags: "anime live wallpaper live video animated naruto fire boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-eternal-flame-b649.mp4", poster: "images/live/anime/posters/itachi-uchiha-eternal-flame-b649.jpg", views: 0, downloads: 0 },
    { id: 597, title: "Gojo Vs Geto Shrine Battle", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-vs-geto-shrine-battle-6e1e.mp4", poster: "images/live/anime/posters/gojo-vs-geto-shrine-battle-6e1e.jpg", views: 0, downloads: 0 },
    { id: 598, title: "Cozy Anime Room Night", category: "anime", tags: "anime live wallpaper live video animated cozy", type: "video", video: "images/live/anime/cozy-anime-room-night-b15c.mp4", poster: "images/live/anime/posters/cozy-anime-room-night-b15c.jpg", views: 0, downloads: 0 },
    { id: 599, title: "Annie Attack On Titan", category: "anime", tags: "anime live wallpaper live video animated attack on titan girl female woman anime girl", type: "video", video: "images/live/anime/annie-attack-on-titan-a2a7.mp4", poster: "images/live/anime/posters/annie-attack-on-titan-a2a7.jpg", views: 0, downloads: 0 },
    { id: 600, title: "Goku Super Saiyan Blue Dragon Ball", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-super-saiyan-blue-dragon-ball-97fc.mp4", poster: "images/live/anime/posters/goku-super-saiyan-blue-dragon-ball-97fc.jpg", views: 0, downloads: 0 },
    { id: 601, title: "Cute Black Kitten Holding A Heart", category: "anime", tags: "anime live wallpaper live video animated cat girl female woman anime girl", type: "video", video: "images/live/anime/cute-black-kitten-holding-a-heart-99cc.mp4", poster: "images/live/anime/posters/cute-black-kitten-holding-a-heart-99cc.jpg", views: 0, downloads: 0 },
    { id: 602, title: "Lone Wanderer Under Giant Clouds", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/lone-wanderer-under-giant-clouds-e87f.mp4", poster: "images/live/anime/posters/lone-wanderer-under-giant-clouds-e87f.jpg", views: 0, downloads: 0 },
    { id: 603, title: "Goku Silhouette Sunset Dragon Ball", category: "anime", tags: "anime live wallpaper live video animated dragon ball sunset boy male guy anime boy", type: "video", video: "images/live/anime/goku-silhouette-sunset-dragon-ball-f568.mp4", poster: "images/live/anime/posters/goku-silhouette-sunset-dragon-ball-f568.jpg", views: 0, downloads: 0 },
    { id: 604, title: "Goku And Shenron Dragon Ball", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-and-shenron-dragon-ball-557e.mp4", poster: "images/live/anime/posters/goku-and-shenron-dragon-ball-557e.jpg", views: 0, downloads: 0 },
    { id: 605, title: "Anime Girl Nissan Skyline GT-R", category: "anime", tags: "anime live wallpaper live video animated car girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-nissan-skyline-gt-r-97e9.mp4", poster: "images/live/anime/posters/anime-girl-nissan-skyline-gt-r-97e9.jpg", views: 0, downloads: 0 },
    { id: 606, title: "Luffy Pirate King Awakening One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/luffy-pirate-king-awakening-one-piece-8e82.mp4", poster: "images/live/anime/posters/luffy-pirate-king-awakening-one-piece-8e82.jpg", views: 0, downloads: 0 },
    { id: 607, title: "Slums Bridge", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/slums-bridge-7d83.mp4", poster: "images/live/anime/posters/slums-bridge-7d83.jpg", views: 0, downloads: 0 },
    { id: 608, title: "Wanderers Van Serene Anime", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/wanderers-van-serene-anime-7e01.mp4", poster: "images/live/anime/posters/wanderers-van-serene-anime-7e01.jpg", views: 0, downloads: 0 },
    { id: 609, title: "Sunset Over Medieval Town", category: "anime", tags: "anime live wallpaper live video animated sunset", type: "video", video: "images/live/anime/sunset-over-medieval-town-a6c7.mp4", poster: "images/live/anime/posters/sunset-over-medieval-town-a6c7.jpg", views: 0, downloads: 0 },
    { id: 610, title: "Frieren Beyond Journey Pixel Sky", category: "anime", tags: "anime live wallpaper live video animated frieren girl female woman anime girl", type: "video", video: "images/live/anime/frieren-beyond-journey-pixel-sky-df82.mp4", poster: "images/live/anime/posters/frieren-beyond-journey-pixel-sky-df82.jpg", views: 0, downloads: 0 },
    { id: 611, title: "Lucia Pyroath Standing Under Tree Punishing Gray Raven", category: "anime", tags: "anime live wallpaper live video animated forest", type: "video", video: "images/live/anime/lucia-pyroath-standing-under-tree-punishing-gray-raven-0301.mp4", poster: "images/live/anime/posters/lucia-pyroath-standing-under-tree-punishing-gray-raven-0301.jpg", views: 0, downloads: 0 },
    { id: 612, title: "A Duel Of Fate", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/a-duel-of-fate-594a.mp4", poster: "images/live/anime/posters/a-duel-of-fate-594a.jpg", views: 0, downloads: 0 },
    { id: 613, title: "Goku Ultra Instinto Dominado", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-ultra-instinto-dominado-ba9c.mp4", poster: "images/live/anime/posters/goku-ultra-instinto-dominado-ba9c.jpg", views: 0, downloads: 0 },
    { id: 614, title: "Anime Warrior Girl", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/anime-warrior-girl-8500.mp4", poster: "images/live/anime/posters/anime-warrior-girl-8500.jpg", views: 0, downloads: 0 },
    { id: 615, title: "Itachi Uchiha Lively", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-lively-54fc.mp4", poster: "images/live/anime/posters/itachi-uchiha-lively-54fc.jpg", views: 0, downloads: 0 },
    { id: 616, title: "Anime Kawasaki Ninja Neon Street Rider", category: "anime", tags: "anime live wallpaper live video animated neon car city", type: "video", video: "images/live/anime/anime-kawasaki-ninja-neon-street-rider-7c53.mp4", poster: "images/live/anime/posters/anime-kawasaki-ninja-neon-street-rider-7c53.jpg", views: 0, downloads: 0 },
    { id: 617, title: "Griseo Sitting By Lake Honkai Impact 3rd", category: "anime", tags: "anime live wallpaper live video animated honkai girl female woman anime girl", type: "video", video: "images/live/anime/griseo-sitting-by-lake-honkai-impact-3rd-863b.mp4", poster: "images/live/anime/posters/griseo-sitting-by-lake-honkai-impact-3rd-863b.jpg", views: 0, downloads: 0 },
    { id: 618, title: "Silent Katana Forest Samurai", category: "anime", tags: "anime live wallpaper live video animated samurai forest boy male guy anime boy", type: "video", video: "images/live/anime/silent-katana-forest-samurai-7d78.mp4", poster: "images/live/anime/posters/silent-katana-forest-samurai-7d78.jpg", views: 0, downloads: 0 },
    { id: 619, title: "Watching The Rain", category: "anime", tags: "anime live wallpaper live video animated rain", type: "video", video: "images/live/anime/watching-the-rain-5dd0.mp4", poster: "images/live/anime/posters/watching-the-rain-5dd0.jpg", views: 0, downloads: 0 },
    { id: 620, title: "Pikachu In The Rain", category: "anime", tags: "anime live wallpaper live video animated pokemon rain", type: "video", video: "images/live/anime/pikachu-in-the-rain-6c23.mp4", poster: "images/live/anime/posters/pikachu-in-the-rain-6c23.jpg", views: 0, downloads: 0 },
    { id: 621, title: "Heian Era Sukuna", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/heian-era-sukuna-5cf1.mp4", poster: "images/live/anime/posters/heian-era-sukuna-5cf1.jpg", views: 0, downloads: 0 },
    { id: 622, title: "Anime Live Wallpaper 3", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-3-aaec.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-3-aaec.jpg", views: 0, downloads: 0 },
    { id: 623, title: "Modern Tanjiro", category: "anime", tags: "anime live wallpaper live video animated demon slayer boy male guy anime boy", type: "video", video: "images/live/anime/modern-tanjiro-2218.mp4", poster: "images/live/anime/posters/modern-tanjiro-2218.jpg", views: 0, downloads: 0 },
    { id: 624, title: "Dark Goth Girl", category: "anime", tags: "anime live wallpaper live video animated girl dark female woman anime girl", type: "video", video: "images/live/anime/dark-goth-girl-f2eb.mp4", poster: "images/live/anime/posters/dark-goth-girl-f2eb.jpg", views: 0, downloads: 0 },
    { id: 625, title: "Unyielding Itachis Sharingan", category: "anime", tags: "anime live wallpaper live video animated naruto", type: "video", video: "images/live/anime/unyielding-itachis-sharingan-c6cc.mp4", poster: "images/live/anime/posters/unyielding-itachis-sharingan-c6cc.jpg", views: 0, downloads: 0 },
    { id: 626, title: "Tranquil Forest Cabin Cozy Anime Aesthetic", category: "anime", tags: "anime live wallpaper live video animated cozy forest", type: "video", video: "images/live/anime/tranquil-forest-cabin-cozy-anime-aesthetic-a66d.mp4", poster: "images/live/anime/posters/tranquil-forest-cabin-cozy-anime-aesthetic-a66d.jpg", views: 0, downloads: 0 },
    { id: 627, title: "Itachi Uchiha Under The Moonlight", category: "anime", tags: "anime live wallpaper live video animated naruto moon boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-under-the-moonlight-8138.mp4", poster: "images/live/anime/posters/itachi-uchiha-under-the-moonlight-8138.jpg", views: 0, downloads: 0 },
    { id: 628, title: "Anime Live Wallpaper 4", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-4-8956.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-4-8956.jpg", views: 0, downloads: 0 },
    { id: 629, title: "Evening Window View", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/evening-window-view-c7fe.mp4", poster: "images/live/anime/posters/evening-window-view-c7fe.jpg", views: 0, downloads: 0 },
    { id: 630, title: "Itachi Uchiha Crimson Shadows", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-crimson-shadows-7d1d.mp4", poster: "images/live/anime/posters/itachi-uchiha-crimson-shadows-7d1d.jpg", views: 0, downloads: 0 },
    { id: 631, title: "Retro Anime Girl Close Up", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/retro-anime-girl-close-up-c91a.mp4", poster: "images/live/anime/posters/retro-anime-girl-close-up-c91a.jpg", views: 0, downloads: 0 },
    { id: 632, title: "Blue Archive Sorasaki Hina Piano", category: "anime", tags: "anime live wallpaper live video animated blue archive girl female woman anime girl", type: "video", video: "images/live/anime/blue-archive-sorasaki-hina-piano-6cbb.mp4", poster: "images/live/anime/posters/blue-archive-sorasaki-hina-piano-6cbb.jpg", views: 0, downloads: 0 },
    { id: 633, title: "Rin Itoshi Bluelock", category: "anime", tags: "anime live wallpaper live video animated blue lock boy male guy anime boy", type: "video", video: "images/live/anime/rin-itoshi-bluelock-eaa1.mp4", poster: "images/live/anime/posters/rin-itoshi-bluelock-eaa1.jpg", views: 0, downloads: 0 },
    { id: 634, title: "Gyomei Himejima", category: "anime", tags: "anime live wallpaper live video animated demon slayer boy male guy anime boy", type: "video", video: "images/live/anime/gyomei-himejima-8b4e.mp4", poster: "images/live/anime/posters/gyomei-himejima-8b4e.jpg", views: 0, downloads: 0 },
    { id: 635, title: "Homura", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/homura-a055.mp4", poster: "images/live/anime/posters/homura-a055.jpg", views: 0, downloads: 0 },
    { id: 636, title: "Crimson Gaze Intense Anime Eye", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/crimson-gaze-intense-anime-eye-cc41.mp4", poster: "images/live/anime/posters/crimson-gaze-intense-anime-eye-cc41.jpg", views: 0, downloads: 0 },
    { id: 637, title: "Girl Starlight Gaze", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/girl-starlight-gaze-cbf0.mp4", poster: "images/live/anime/posters/girl-starlight-gaze-cbf0.jpg", views: 0, downloads: 0 },
    { id: 638, title: "Shiroko Skyfall Blue Archive", category: "anime", tags: "anime live wallpaper live video animated blue archive girl female woman anime girl", type: "video", video: "images/live/anime/shiroko-skyfall-blue-archive-5c65.mp4", poster: "images/live/anime/posters/shiroko-skyfall-blue-archive-5c65.jpg", views: 0, downloads: 0 },
    { id: 639, title: "Frieren Glowing Flower", category: "anime", tags: "anime live wallpaper live video animated frieren girl female woman anime girl", type: "video", video: "images/live/anime/frieren-glowing-flower-68fa.mp4", poster: "images/live/anime/posters/frieren-glowing-flower-68fa.jpg", views: 0, downloads: 0 },
    { id: 640, title: "Neon Goku Power Aura", category: "anime", tags: "anime live wallpaper live video animated dragon ball neon boy male guy anime boy", type: "video", video: "images/live/anime/neon-goku-power-aura-0def.mp4", poster: "images/live/anime/posters/neon-goku-power-aura-0def.jpg", views: 0, downloads: 0 },
    { id: 641, title: "Quiet Seaside Station Anime Summer", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/quiet-seaside-station-anime-summer-972c.mp4", poster: "images/live/anime/posters/quiet-seaside-station-anime-summer-972c.jpg", views: 0, downloads: 0 },
    { id: 642, title: "Gojo Vs Sukuna Battle", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-vs-sukuna-battle-8542.mp4", poster: "images/live/anime/posters/gojo-vs-sukuna-battle-8542.jpg", views: 0, downloads: 0 },
    { id: 643, title: "Monkey D", category: "anime", tags: "anime live wallpaper live video animated one piece", type: "video", video: "images/live/anime/monkey-d-fc72.mp4", poster: "images/live/anime/posters/monkey-d-fc72.jpg", views: 0, downloads: 0 },
    { id: 644, title: "Hachinosu One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece", type: "video", video: "images/live/anime/hachinosu-one-piece-6920.mp4", poster: "images/live/anime/posters/hachinosu-one-piece-6920.jpg", views: 0, downloads: 0 },
    { id: 645, title: "Yuta Okkotsu And Rika", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-okkotsu-and-rika-87e1.mp4", poster: "images/live/anime/posters/yuta-okkotsu-and-rika-87e1.jpg", views: 0, downloads: 0 },
    { id: 646, title: "Kill La Kill Ryuko Matoi", category: "anime", tags: "anime live wallpaper live video animated kill la kill girl female woman anime girl", type: "video", video: "images/live/anime/kill-la-kill-ryuko-matoi-3ee8.mp4", poster: "images/live/anime/posters/kill-la-kill-ryuko-matoi-3ee8.jpg", views: 0, downloads: 0 },
    { id: 647, title: "Sunset Journey Anime Train", category: "anime", tags: "anime live wallpaper live video animated sunset", type: "video", video: "images/live/anime/sunset-journey-anime-train-4838.mp4", poster: "images/live/anime/posters/sunset-journey-anime-train-4838.jpg", views: 0, downloads: 0 },
    { id: 648, title: "Chainsaw Man Girls", category: "anime", tags: "anime live wallpaper live video animated chainsaw man girl female woman anime girl", type: "video", video: "images/live/anime/chainsaw-man-girls-4739.mp4", poster: "images/live/anime/posters/chainsaw-man-girls-4739.jpg", views: 0, downloads: 0 },
    { id: 649, title: "Bloody Resolve Kakashi Hatake Anime", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/bloody-resolve-kakashi-hatake-anime-7f5e.mp4", poster: "images/live/anime/posters/bloody-resolve-kakashi-hatake-anime-7f5e.jpg", views: 0, downloads: 0 },
    { id: 650, title: "Broly Transforms Dragon", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/broly-transforms-dragon-05e6.mp4", poster: "images/live/anime/posters/broly-transforms-dragon-05e6.jpg", views: 0, downloads: 0 },
    { id: 651, title: "Madara Uchiha Naruto", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/madara-uchiha-naruto-007c.mp4", poster: "images/live/anime/posters/madara-uchiha-naruto-007c.jpg", views: 0, downloads: 0 },
    { id: 652, title: "Shirou And Saber Together", category: "anime", tags: "anime live wallpaper live video animated fate girl female woman anime girl boy male guy anime boy", type: "video", video: "images/live/anime/shirou-and-saber-together-105a.mp4", poster: "images/live/anime/posters/shirou-and-saber-together-105a.jpg", views: 0, downloads: 0 },
    { id: 653, title: "Satoru Gojo Hollow Purple", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-hollow-purple-bbb5.mp4", poster: "images/live/anime/posters/satoru-gojo-hollow-purple-bbb5.jpg", views: 0, downloads: 0 },
    { id: 654, title: "Sukuna Vs Mahoraga", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/sukuna-vs-mahoraga-48e6.mp4", poster: "images/live/anime/posters/sukuna-vs-mahoraga-48e6.jpg", views: 0, downloads: 0 },
    { id: 655, title: "Cozy Anime Room Morning Light", category: "anime", tags: "anime live wallpaper live video animated cozy", type: "video", video: "images/live/anime/cozy-anime-room-morning-light-3ec8.mp4", poster: "images/live/anime/posters/cozy-anime-room-morning-light-3ec8.jpg", views: 0, downloads: 0 },
    { id: 656, title: "A Galaxy Within", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/a-galaxy-within-2652.mp4", poster: "images/live/anime/posters/a-galaxy-within-2652.jpg", views: 0, downloads: 0 },
    { id: 657, title: "Anime Car Girl Nissan Skyline", category: "anime", tags: "anime live wallpaper live video animated car girl female woman anime girl", type: "video", video: "images/live/anime/anime-car-girl-nissan-skyline-93e2.mp4", poster: "images/live/anime/posters/anime-car-girl-nissan-skyline-93e2.jpg", views: 0, downloads: 0 },
    { id: 658, title: "Sasuke Uchiha Chidori Lightning", category: "anime", tags: "anime live wallpaper live video animated naruto lightning boy male guy anime boy", type: "video", video: "images/live/anime/sasuke-uchiha-chidori-lightning-cb7d.mp4", poster: "images/live/anime/posters/sasuke-uchiha-chidori-lightning-cb7d.jpg", views: 0, downloads: 0 },
    { id: 659, title: "Stormy Hero Awakening", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/stormy-hero-awakening-ccf0.mp4", poster: "images/live/anime/posters/stormy-hero-awakening-ccf0.jpg", views: 0, downloads: 0 },
    { id: 660, title: "Berserker Eclipse Dark Warrior", category: "anime", tags: "anime live wallpaper live video animated berserk dark", type: "video", video: "images/live/anime/berserker-eclipse-dark-warrior-6f8e.mp4", poster: "images/live/anime/posters/berserker-eclipse-dark-warrior-6f8e.jpg", views: 0, downloads: 0 },
    { id: 661, title: "Ene Project", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/ene-project-c3f9.mp4", poster: "images/live/anime/posters/ene-project-c3f9.jpg", views: 0, downloads: 0 },
    { id: 662, title: "Kakashi Vs Obito", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/kakashi-vs-obito-8269.mp4", poster: "images/live/anime/posters/kakashi-vs-obito-8269.jpg", views: 0, downloads: 0 },
    { id: 663, title: "Tanjiro Kamado Flame Sword", category: "anime", tags: "anime live wallpaper live video animated demon slayer samurai fire boy male guy anime boy", type: "video", video: "images/live/anime/tanjiro-kamado-flame-sword-430d.mp4", poster: "images/live/anime/posters/tanjiro-kamado-flame-sword-430d.jpg", views: 0, downloads: 0 },
    { id: 664, title: "Crimson Eyes Of Silence Nekomimi", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/crimson-eyes-of-silence-nekomimi-679c.mp4", poster: "images/live/anime/posters/crimson-eyes-of-silence-nekomimi-679c.jpg", views: 0, downloads: 0 },
    { id: 665, title: "Kurapika Hunter X Hunter", category: "anime", tags: "anime live wallpaper live video animated hunter x hunter boy male guy anime boy", type: "video", video: "images/live/anime/kurapika-hunter-x-hunter-e1b8.mp4", poster: "images/live/anime/posters/kurapika-hunter-x-hunter-e1b8.jpg", views: 0, downloads: 0 },
    { id: 666, title: "Spy X Family On The Beach", category: "anime", tags: "anime live wallpaper live video animated spy x family", type: "video", video: "images/live/anime/spy-x-family-on-the-beach-e3e4.mp4", poster: "images/live/anime/posters/spy-x-family-on-the-beach-e3e4.jpg", views: 0, downloads: 0 },
    { id: 667, title: "Robin Aventurine Honkai Star Rail Seamless Lo", category: "anime", tags: "anime live wallpaper live video animated honkai", type: "video", video: "images/live/anime/robin-aventurine-honkai-star-rail-seamless-lo-4c89.mp4", poster: "images/live/anime/posters/robin-aventurine-honkai-star-rail-seamless-lo-4c89.jpg", views: 0, downloads: 0 },
    { id: 668, title: "Mahoraga X Megumi", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/mahoraga-x-megumi-f88b.mp4", poster: "images/live/anime/posters/mahoraga-x-megumi-f88b.jpg", views: 0, downloads: 0 },
    { id: 669, title: "Killua Zoldyck Hunter X", category: "anime", tags: "anime live wallpaper live video animated hunter x hunter boy male guy anime boy", type: "video", video: "images/live/anime/killua-zoldyck-hunter-x-e62d.mp4", poster: "images/live/anime/posters/killua-zoldyck-hunter-x-e62d.jpg", views: 0, downloads: 0 },
    { id: 670, title: "Blue Mystic Sorcerer", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/blue-mystic-sorcerer-12ec.mp4", poster: "images/live/anime/posters/blue-mystic-sorcerer-12ec.jpg", views: 0, downloads: 0 },
    { id: 671, title: "Tobirama Senju Ronin", category: "anime", tags: "anime live wallpaper live video animated naruto samurai boy male guy anime boy", type: "video", video: "images/live/anime/tobirama-senju-ronin-5128.mp4", poster: "images/live/anime/posters/tobirama-senju-ronin-5128.jpg", views: 0, downloads: 0 },
    { id: 672, title: "Anime Fantasy Mountain Village", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-fantasy-mountain-village-44fe.mp4", poster: "images/live/anime/posters/anime-fantasy-mountain-village-44fe.jpg", views: 0, downloads: 0 },
    { id: 673, title: "Glacier Queen Esdeath Akame Ga Kill", category: "anime", tags: "anime live wallpaper live video animated akame ga kill snow girl female woman anime girl", type: "video", video: "images/live/anime/glacier-queen-esdeath-akame-ga-kill-5125.mp4", poster: "images/live/anime/posters/glacier-queen-esdeath-akame-ga-kill-5125.jpg", views: 0, downloads: 0 },
    { id: 674, title: "Penguin Girl Cozy Desk", category: "anime", tags: "anime live wallpaper live video animated cozy girl female woman anime girl", type: "video", video: "images/live/anime/penguin-girl-cozy-desk-58b7.mp4", poster: "images/live/anime/posters/penguin-girl-cozy-desk-58b7.jpg", views: 0, downloads: 0 },
    { id: 675, title: "Waiting At Sunset Anime Girl Scenic", category: "anime", tags: "anime live wallpaper live video animated sunset girl female woman anime girl", type: "video", video: "images/live/anime/waiting-at-sunset-anime-girl-scenic-e5c2.mp4", poster: "images/live/anime/posters/waiting-at-sunset-anime-girl-scenic-e5c2.jpg", views: 0, downloads: 0 },
    { id: 676, title: "Muzan Crimson Eye", category: "anime", tags: "anime live wallpaper live video animated demon slayer boy male guy anime boy", type: "video", video: "images/live/anime/muzan-crimson-eye-fc78.mp4", poster: "images/live/anime/posters/muzan-crimson-eye-fc78.jpg", views: 0, downloads: 0 },
    { id: 677, title: "Anime Girl In Poppy Field", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-in-poppy-field-0733.mp4", poster: "images/live/anime/posters/anime-girl-in-poppy-field-0733.jpg", views: 0, downloads: 0 },
    { id: 678, title: "Dark King", category: "anime", tags: "anime live wallpaper live video animated dark", type: "video", video: "images/live/anime/dark-king-ea10.mp4", poster: "images/live/anime/posters/dark-king-ea10.jpg", views: 0, downloads: 0 },
    { id: 679, title: "Silent Train Ride Anime", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/silent-train-ride-anime-9088.mp4", poster: "images/live/anime/posters/silent-train-ride-anime-9088.jpg", views: 0, downloads: 0 },
    { id: 680, title: "Relaxation In Gear", category: "anime", tags: "anime live wallpaper live video animated one piece", type: "video", video: "images/live/anime/relaxation-in-gear-9647.mp4", poster: "images/live/anime/posters/relaxation-in-gear-9647.jpg", views: 0, downloads: 0 },
    { id: 681, title: "Killua Zoldyck Monster Energy", category: "anime", tags: "anime live wallpaper live video animated hunter x hunter boy male guy anime boy", type: "video", video: "images/live/anime/killua-zoldyck-monster-energy-ba52.mp4", poster: "images/live/anime/posters/killua-zoldyck-monster-energy-ba52.jpg", views: 0, downloads: 0 },
    { id: 682, title: "Blazing Goku", category: "anime", tags: "anime live wallpaper live video animated dragon ball fire boy male guy anime boy", type: "video", video: "images/live/anime/blazing-goku-29f4.mp4", poster: "images/live/anime/posters/blazing-goku-29f4.jpg", views: 0, downloads: 0 },
    { id: 683, title: "Yorha No 2 Type B", category: "anime", tags: "anime live wallpaper live video animated nier automata", type: "video", video: "images/live/anime/yorha-no-2-type-b-e0a5.mp4", poster: "images/live/anime/posters/yorha-no-2-type-b-e0a5.jpg", views: 0, downloads: 0 },
    { id: 684, title: "Gojo Nissan Skyline GT-R R34 Anime Street Drift", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen car city boy male guy anime boy", type: "video", video: "images/live/anime/gojo-nissan-skyline-gt-r-r34-anime-street-drift-e7f1.mp4", poster: "images/live/anime/posters/gojo-nissan-skyline-gt-r-r34-anime-street-drift-e7f1.jpg", views: 0, downloads: 0 },
    { id: 685, title: "Skyline Dreams Nissan GT-R R32 At Mount Fuji", category: "anime", tags: "anime live wallpaper live video animated car", type: "video", video: "images/live/anime/skyline-dreams-nissan-gt-r-r32-at-mount-fuji-09ec.mp4", poster: "images/live/anime/posters/skyline-dreams-nissan-gt-r-r32-at-mount-fuji-09ec.jpg", views: 0, downloads: 0 },
    { id: 686, title: "Anime Live Wallpaper 5", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-5-4fb2.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-5-4fb2.jpg", views: 0, downloads: 0 },
    { id: 687, title: "Luffy In The Shadows", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/luffy-in-the-shadows-c56e.mp4", poster: "images/live/anime/posters/luffy-in-the-shadows-c56e.jpg", views: 0, downloads: 0 },
    { id: 688, title: "Deepseek Chan", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/deepseek-chan-d819.mp4", poster: "images/live/anime/posters/deepseek-chan-d819.jpg", views: 0, downloads: 0 },
    { id: 689, title: "Saber Excalibur Fate Anime", category: "anime", tags: "anime live wallpaper live video animated fate girl female woman anime girl", type: "video", video: "images/live/anime/saber-excalibur-fate-anime-3775.mp4", poster: "images/live/anime/posters/saber-excalibur-fate-anime-3775.jpg", views: 0, downloads: 0 },
    { id: 690, title: "Kazemi", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/kazemi-8b16.mp4", poster: "images/live/anime/posters/kazemi-8b16.jpg", views: 0, downloads: 0 },
    { id: 691, title: "Crimson Dark Vegeta", category: "anime", tags: "anime live wallpaper live video animated dragon ball dark boy male guy anime boy", type: "video", video: "images/live/anime/crimson-dark-vegeta-f795.mp4", poster: "images/live/anime/posters/crimson-dark-vegeta-f795.jpg", views: 0, downloads: 0 },
    { id: 692, title: "Luffy Awakened Power One Piece Energy", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/luffy-awakened-power-one-piece-energy-a55b.mp4", poster: "images/live/anime/posters/luffy-awakened-power-one-piece-energy-a55b.jpg", views: 0, downloads: 0 },
    { id: 693, title: "Sorasaki Hina", category: "anime", tags: "anime live wallpaper live video animated blue archive girl female woman anime girl", type: "video", video: "images/live/anime/sorasaki-hina-8ebf.mp4", poster: "images/live/anime/posters/sorasaki-hina-8ebf.jpg", views: 0, downloads: 0 },
    { id: 694, title: "Gojo Satoru Cursed Energy", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-cursed-energy-055e.mp4", poster: "images/live/anime/posters/gojo-satoru-cursed-energy-055e.jpg", views: 0, downloads: 0 },
    { id: 695, title: "Anime Live Wallpaper 6", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-6-3ea8.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-6-3ea8.jpg", views: 0, downloads: 0 },
    { id: 696, title: "Melancholy", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/melancholy-9ecc.mp4", poster: "images/live/anime/posters/melancholy-9ecc.jpg", views: 0, downloads: 0 },
    { id: 697, title: "Hatsune Miku At The Beach", category: "anime", tags: "anime live wallpaper live video animated hatsune miku girl female woman anime girl", type: "video", video: "images/live/anime/hatsune-miku-at-the-beach-de77.mp4", poster: "images/live/anime/posters/hatsune-miku-at-the-beach-de77.jpg", views: 0, downloads: 0 },
    { id: 698, title: "Luffy Before The Storm One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece rain boy male guy anime boy", type: "video", video: "images/live/anime/luffy-before-the-storm-one-piece-3ef9.mp4", poster: "images/live/anime/posters/luffy-before-the-storm-one-piece-3ef9.jpg", views: 0, downloads: 0 },
    { id: 699, title: "Naruto Sage Mode Jutsu", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/naruto-sage-mode-jutsu-f417.mp4", poster: "images/live/anime/posters/naruto-sage-mode-jutsu-f417.jpg", views: 0, downloads: 0 },
    { id: 700, title: "Goku Blazing Aura", category: "anime", tags: "anime live wallpaper live video animated dragon ball fire boy male guy anime boy", type: "video", video: "images/live/anime/goku-blazing-aura-963c.mp4", poster: "images/live/anime/posters/goku-blazing-aura-963c.jpg", views: 0, downloads: 0 },
    { id: 701, title: "Deepseek Chan Interstellar", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/deepseek-chan-interstellar-5792.mp4", poster: "images/live/anime/posters/deepseek-chan-interstellar-5792.jpg", views: 0, downloads: 0 },
    { id: 702, title: "Anime Live Wallpaper 7", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-7-56f8.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-7-56f8.jpg", views: 0, downloads: 0 },
    { id: 703, title: "Mahito Domain Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/mahito-domain-jujutsu-kaisen-2776.mp4", poster: "images/live/anime/posters/mahito-domain-jujutsu-kaisen-2776.jpg", views: 0, downloads: 0 },
    { id: 704, title: "Gojo Satoru Red Eyes", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-red-eyes-a15b.mp4", poster: "images/live/anime/posters/gojo-satoru-red-eyes-a15b.jpg", views: 0, downloads: 0 },
    { id: 705, title: "Kyoujurou Rengoku Standing In The Fire Kimetsu No Yaiba", category: "anime", tags: "anime live wallpaper live video animated demon slayer fire boy male guy anime boy", type: "video", video: "images/live/anime/kyoujurou-rengoku-standing-in-the-fire-kimetsu-no-yaiba-8e2a.mp4", poster: "images/live/anime/posters/kyoujurou-rengoku-standing-in-the-fire-kimetsu-no-yaiba-8e2a.jpg", views: 0, downloads: 0 },
    { id: 706, title: "Goku And Krillin From Dragon Ball", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-and-krillin-from-dragon-ball-3a10.mp4", poster: "images/live/anime/posters/goku-and-krillin-from-dragon-ball-3a10.jpg", views: 0, downloads: 0 },
    { id: 707, title: "Zoro King Of Hell", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/zoro-king-of-hell-0484.mp4", poster: "images/live/anime/posters/zoro-king-of-hell-0484.jpg", views: 0, downloads: 0 },
    { id: 708, title: "Anime Girl Wine Glass Neon Bar", category: "anime", tags: "anime live wallpaper live video animated neon girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-wine-glass-neon-bar-5e1e.mp4", poster: "images/live/anime/posters/anime-girl-wine-glass-neon-bar-5e1e.jpg", views: 0, downloads: 0 },
    { id: 709, title: "Monkey D Luffy Scenes A", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/monkey-d-luffy-scenes-a-fe4e.mp4", poster: "images/live/anime/posters/monkey-d-luffy-scenes-a-fe4e.jpg", views: 0, downloads: 0 },
    { id: 710, title: "Anime Sunset City Street", category: "anime", tags: "anime live wallpaper live video animated sunset city", type: "video", video: "images/live/anime/anime-sunset-city-street-5144.mp4", poster: "images/live/anime/posters/anime-sunset-city-street-5144.jpg", views: 0, downloads: 0 },
    { id: 711, title: "Yoimiya Genshin Impact", category: "anime", tags: "anime live wallpaper live video animated genshin impact girl female woman anime girl", type: "video", video: "images/live/anime/yoimiya-genshin-impact-b4a6.mp4", poster: "images/live/anime/posters/yoimiya-genshin-impact-b4a6.jpg", views: 0, downloads: 0 },
    { id: 712, title: "Luffy In Winter", category: "anime", tags: "anime live wallpaper live video animated one piece snow boy male guy anime boy", type: "video", video: "images/live/anime/luffy-in-winter-4818.mp4", poster: "images/live/anime/posters/luffy-in-winter-4818.jpg", views: 0, downloads: 0 },
    { id: 713, title: "Anime Live Wallpaper 8", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-8-de0d.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-8-de0d.jpg", views: 0, downloads: 0 },
    { id: 714, title: "Black Haired Girl", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/black-haired-girl-5d06.mp4", poster: "images/live/anime/posters/black-haired-girl-5d06.jpg", views: 0, downloads: 0 },
    { id: 715, title: "Kakashi Hatake Sharingan Awakenin Come", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/kakashi-hatake-sharingan-awakenin-come-1a0b.mp4", poster: "images/live/anime/posters/kakashi-hatake-sharingan-awakenin-come-1a0b.jpg", views: 0, downloads: 0 },
    { id: 716, title: "Elaina Witch2", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/elaina-witch2-bb58.mp4", poster: "images/live/anime/posters/elaina-witch2-bb58.jpg", views: 0, downloads: 0 },
    { id: 717, title: "Luffy Gear 5 One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/luffy-gear-5-one-piece-6913.mp4", poster: "images/live/anime/posters/luffy-gear-5-one-piece-6913.jpg", views: 0, downloads: 0 },
    { id: 718, title: "Behind The Glass", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/behind-the-glass-2a85.mp4", poster: "images/live/anime/posters/behind-the-glass-2a85.jpg", views: 0, downloads: 0 },
    { id: 719, title: "Yellow Lightning Swordsman Anime", category: "anime", tags: "anime live wallpaper live video animated lightning", type: "video", video: "images/live/anime/yellow-lightning-swordsman-anime-1128.mp4", poster: "images/live/anime/posters/yellow-lightning-swordsman-anime-1128.jpg", views: 0, downloads: 0 },
    { id: 720, title: "The Midnight Duo Evo Vi", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/the-midnight-duo-evo-vi-f4b4.mp4", poster: "images/live/anime/posters/the-midnight-duo-evo-vi-f4b4.jpg", views: 0, downloads: 0 },
    { id: 721, title: "Samurai Anime Boy Koi In Sword", category: "anime", tags: "anime live wallpaper live video animated samurai boy male guy anime boy", type: "video", video: "images/live/anime/samurai-anime-boy-koi-in-sword-9219.mp4", poster: "images/live/anime/posters/samurai-anime-boy-koi-in-sword-9219.jpg", views: 0, downloads: 0 },
    { id: 722, title: "Itachi Uchiha Mangekyou Sharingan Naruto Shippuden", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-mangekyou-sharingan-naruto-shippuden-4b87.mp4", poster: "images/live/anime/posters/itachi-uchiha-mangekyou-sharingan-naruto-shippuden-4b87.jpg", views: 0, downloads: 0 },
    { id: 723, title: "Hatsune Miku", category: "anime", tags: "anime live wallpaper live video animated hatsune miku girl female woman anime girl", type: "video", video: "images/live/anime/hatsune-miku-7a99.mp4", poster: "images/live/anime/posters/hatsune-miku-7a99.jpg", views: 0, downloads: 0 },
    { id: 724, title: "Satoru Gojo", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-f0ab.mp4", poster: "images/live/anime/posters/satoru-gojo-f0ab.jpg", views: 0, downloads: 0 },
    { id: 725, title: "Honkai Star Rail Firefly", category: "anime", tags: "anime live wallpaper live video animated honkai girl female woman anime girl", type: "video", video: "images/live/anime/honkai-star-rail-firefly-731e.mp4", poster: "images/live/anime/posters/honkai-star-rail-firefly-731e.jpg", views: 0, downloads: 0 },
    { id: 726, title: "Gojo Satoru Beyond Infinity", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-beyond-infinity-dc75.mp4", poster: "images/live/anime/posters/gojo-satoru-beyond-infinity-dc75.jpg", views: 0, downloads: 0 },
    { id: 727, title: "Gokus Silent Storm Strength Beneath The Rain", category: "anime", tags: "anime live wallpaper live video animated rain", type: "video", video: "images/live/anime/gokus-silent-storm-strength-beneath-the-rain-d228.mp4", poster: "images/live/anime/posters/gokus-silent-storm-strength-beneath-the-rain-d228.jpg", views: 0, downloads: 0 },
    { id: 728, title: "Neon Gaze Anime Girl", category: "anime", tags: "anime live wallpaper live video animated neon girl female woman anime girl", type: "video", video: "images/live/anime/neon-gaze-anime-girl-febe.mp4", poster: "images/live/anime/posters/neon-gaze-anime-girl-febe.jpg", views: 0, downloads: 0 },
    { id: 729, title: "Naruto In The Rain Emotional Anime", category: "anime", tags: "anime live wallpaper live video animated naruto rain boy male guy anime boy", type: "video", video: "images/live/anime/naruto-in-the-rain-emotional-anime-9f2b.mp4", poster: "images/live/anime/posters/naruto-in-the-rain-emotional-anime-9f2b.jpg", views: 0, downloads: 0 },
    { id: 730, title: "JJK Toji Fushiguro", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/jjk-toji-fushiguro-89f2.mp4", poster: "images/live/anime/posters/jjk-toji-fushiguro-89f2.jpg", views: 0, downloads: 0 },
    { id: 731, title: "Red Eyes Anime Girl", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/red-eyes-anime-girl-1b44.mp4", poster: "images/live/anime/posters/red-eyes-anime-girl-1b44.jpg", views: 0, downloads: 0 },
    { id: 732, title: "Shibuya", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen city", type: "video", video: "images/live/anime/shibuya-2188.mp4", poster: "images/live/anime/posters/shibuya-2188.jpg", views: 0, downloads: 0 },
    { id: 733, title: "Naoya Zenin Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen", type: "video", video: "images/live/anime/naoya-zenin-jujutsu-kaisen-3581.mp4", poster: "images/live/anime/posters/naoya-zenin-jujutsu-kaisen-3581.jpg", views: 0, downloads: 0 },
    { id: 734, title: "Nacht Faust Black Clove", category: "anime", tags: "anime live wallpaper live video animated black clover", type: "video", video: "images/live/anime/nacht-faust-black-clove-91f8.mp4", poster: "images/live/anime/posters/nacht-faust-black-clove-91f8.jpg", views: 0, downloads: 0 },
    { id: 735, title: "Luffy Smiling", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/luffy-smiling-f8c3.mp4", poster: "images/live/anime/posters/luffy-smiling-f8c3.jpg", views: 0, downloads: 0 },
    { id: 736, title: "Tanjiro Kamado Crimson Moon", category: "anime", tags: "anime live wallpaper live video animated demon slayer moon boy male guy anime boy", type: "video", video: "images/live/anime/tanjiro-kamado-crimson-moon-39b9.mp4", poster: "images/live/anime/posters/tanjiro-kamado-crimson-moon-39b9.jpg", views: 0, downloads: 0 },
    { id: 737, title: "Samurai Vs Dragon", category: "anime", tags: "anime live wallpaper live video animated dragon ball samurai boy male guy anime boy", type: "video", video: "images/live/anime/samurai-vs-dragon-020c.mp4", poster: "images/live/anime/posters/samurai-vs-dragon-020c.jpg", views: 0, downloads: 0 },
    { id: 738, title: "Silent Gothic Girl", category: "anime", tags: "anime live wallpaper live video animated girl dark female woman anime girl", type: "video", video: "images/live/anime/silent-gothic-girl-8cbb.mp4", poster: "images/live/anime/posters/silent-gothic-girl-8cbb.jpg", views: 0, downloads: 0 },
    { id: 739, title: "Madara Uchiha", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/madara-uchiha-dc1f.mp4", poster: "images/live/anime/posters/madara-uchiha-dc1f.jpg", views: 0, downloads: 0 },
    { id: 740, title: "Bloom Sword Spirit Forest", category: "anime", tags: "anime live wallpaper live video animated samurai forest", type: "video", video: "images/live/anime/bloom-sword-spirit-forest-9947.mp4", poster: "images/live/anime/posters/bloom-sword-spirit-forest-9947.jpg", views: 0, downloads: 0 },
    { id: 741, title: "Sasuke Lightning Jutsu", category: "anime", tags: "anime live wallpaper live video animated naruto lightning boy male guy anime boy", type: "video", video: "images/live/anime/sasuke-lightning-jutsu-0f97.mp4", poster: "images/live/anime/posters/sasuke-lightning-jutsu-0f97.jpg", views: 0, downloads: 0 },
    { id: 742, title: "Cartethyia School Girl Wuthering Waves", category: "anime", tags: "anime live wallpaper live video animated wuthering waves girl female woman anime girl", type: "video", video: "images/live/anime/cartethyia-school-girl-wuthering-waves-5858.mp4", poster: "images/live/anime/posters/cartethyia-school-girl-wuthering-waves-5858.jpg", views: 0, downloads: 0 },
    { id: 743, title: "Akame Ga Kill", category: "anime", tags: "anime live wallpaper live video animated akame ga kill girl female woman anime girl", type: "video", video: "images/live/anime/akame-ga-kill-9823.mp4", poster: "images/live/anime/posters/akame-ga-kill-9823.jpg", views: 0, downloads: 0 },
    { id: 744, title: "Gogeta", category: "anime", tags: "anime live wallpaper live video animated dragon ball", type: "video", video: "images/live/anime/gogeta-85ba.mp4", poster: "images/live/anime/posters/gogeta-85ba.jpg", views: 0, downloads: 0 },
    { id: 745, title: "Dark Eclipse Knight Anime", category: "anime", tags: "anime live wallpaper live video animated dark", type: "video", video: "images/live/anime/dark-eclipse-knight-anime-9ae2.mp4", poster: "images/live/anime/posters/dark-eclipse-knight-anime-9ae2.jpg", views: 0, downloads: 0 },
    { id: 746, title: "Gojo And Sukuna", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-and-sukuna-f4d0.mp4", poster: "images/live/anime/posters/gojo-and-sukuna-f4d0.jpg", views: 0, downloads: 0 },
    { id: 747, title: "Mahiru Shiina In A Flower Field", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/mahiru-shiina-in-a-flower-field-643a.mp4", poster: "images/live/anime/posters/mahiru-shiina-in-a-flower-field-643a.jpg", views: 0, downloads: 0 },
    { id: 748, title: "Danjin Wuthering Waves", category: "anime", tags: "anime live wallpaper live video animated wuthering waves", type: "video", video: "images/live/anime/danjin-wuthering-waves-dce5.mp4", poster: "images/live/anime/posters/danjin-wuthering-waves-dce5.jpg", views: 0, downloads: 0 },
    { id: 749, title: "Shadow Samurai Red Eclipse", category: "anime", tags: "anime live wallpaper live video animated samurai dark boy male guy anime boy", type: "video", video: "images/live/anime/shadow-samurai-red-eclipse-fc2e.mp4", poster: "images/live/anime/posters/shadow-samurai-red-eclipse-fc2e.jpg", views: 0, downloads: 0 },
    { id: 750, title: "Sakurablossom", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/sakurablossom-4218.mp4", poster: "images/live/anime/posters/sakurablossom-4218.jpg", views: 0, downloads: 0 },
    { id: 751, title: "Black Armored Knight Red Flowers", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/black-armored-knight-red-flowers-815a.mp4", poster: "images/live/anime/posters/black-armored-knight-red-flowers-815a.jpg", views: 0, downloads: 0 },
    { id: 752, title: "Anime Warrior", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-warrior-d25c.mp4", poster: "images/live/anime/posters/anime-warrior-d25c.jpg", views: 0, downloads: 0 },
    { id: 753, title: "Angel Bound By Thorns", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/angel-bound-by-thorns-2df7.mp4", poster: "images/live/anime/posters/angel-bound-by-thorns-2df7.jpg", views: 0, downloads: 0 },
    { id: 754, title: "Anime Live Wallpaper 9", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-9-9da6.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-9-9da6.jpg", views: 0, downloads: 0 },
    { id: 755, title: "Ryomen Sukuna", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/ryomen-sukuna-325c.mp4", poster: "images/live/anime/posters/ryomen-sukuna-325c.jpg", views: 0, downloads: 0 },
    { id: 756, title: "Zenitsu Agatsuma Katana Demon Slayer", category: "anime", tags: "anime live wallpaper live video animated demon slayer samurai dark boy male guy anime boy", type: "video", video: "images/live/anime/zenitsu-agatsuma-katana-demon-slayer-2b9d.mp4", poster: "images/live/anime/posters/zenitsu-agatsuma-katana-demon-slayer-2b9d.jpg", views: 0, downloads: 0 },
    { id: 757, title: "Megumin Awakening Magic", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/megumin-awakening-magic-4354.mp4", poster: "images/live/anime/posters/megumin-awakening-magic-4354.jpg", views: 0, downloads: 0 },
    { id: 758, title: "Jiraiya Sensei Naruto Shippuden", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/jiraiya-sensei-naruto-shippuden-b1c1.mp4", poster: "images/live/anime/posters/jiraiya-sensei-naruto-shippuden-b1c1.jpg", views: 0, downloads: 0 },
    { id: 759, title: "Anime Live Wallpaper 10", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-10-fb57.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-10-fb57.jpg", views: 0, downloads: 0 },
    { id: 760, title: "Neon Rogue Anime Gunner", category: "anime", tags: "anime live wallpaper live video animated neon", type: "video", video: "images/live/anime/neon-rogue-anime-gunner-354e.mp4", poster: "images/live/anime/posters/neon-rogue-anime-gunner-354e.jpg", views: 0, downloads: 0 },
    { id: 761, title: "Weeping Trees1", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/weeping-trees1-3c75.mp4", poster: "images/live/anime/posters/weeping-trees1-3c75.jpg", views: 0, downloads: 0 },
    { id: 762, title: "Vegeta In The Rain", category: "anime", tags: "anime live wallpaper live video animated dragon ball rain boy male guy anime boy", type: "video", video: "images/live/anime/vegeta-in-the-rain-2a05.mp4", poster: "images/live/anime/posters/vegeta-in-the-rain-2a05.jpg", views: 0, downloads: 0 },
    { id: 763, title: "Popout Manga", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/popout-manga-595b.mp4", poster: "images/live/anime/posters/popout-manga-595b.jpg", views: 0, downloads: 0 },
    { id: 764, title: "Fern Zoltraak", category: "anime", tags: "anime live wallpaper live video animated frieren girl female woman anime girl", type: "video", video: "images/live/anime/fern-zoltraak-013f.mp4", poster: "images/live/anime/posters/fern-zoltraak-013f.jpg", views: 0, downloads: 0 },
    { id: 765, title: "Cute Chibi Girl Rain", category: "anime", tags: "anime live wallpaper live video animated rain girl female woman anime girl", type: "video", video: "images/live/anime/cute-chibi-girl-rain-f1ef.mp4", poster: "images/live/anime/posters/cute-chibi-girl-rain-f1ef.jpg", views: 0, downloads: 0 },
    { id: 766, title: "Ninja Girl Warrior Desktop", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/ninja-girl-warrior-desktop-77ff.mp4", poster: "images/live/anime/posters/ninja-girl-warrior-desktop-77ff.jpg", views: 0, downloads: 0 },
    { id: 767, title: "Anime Warrior Nun Red Cross", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/anime-warrior-nun-red-cross-7e99.mp4", poster: "images/live/anime/posters/anime-warrior-nun-red-cross-7e99.jpg", views: 0, downloads: 0 },
    { id: 768, title: "Yoru Chainsaw Man", category: "anime", tags: "anime live wallpaper live video animated chainsaw man girl female woman anime girl", type: "video", video: "images/live/anime/yoru-chainsaw-man-2f8e.mp4", poster: "images/live/anime/posters/yoru-chainsaw-man-2f8e.jpg", views: 0, downloads: 0 },
    { id: 769, title: "Hinata And Naruto", category: "anime", tags: "anime live wallpaper live video animated naruto girl female woman anime girl boy male guy anime boy", type: "video", video: "images/live/anime/hinata-and-naruto-22cf.mp4", poster: "images/live/anime/posters/hinata-and-naruto-22cf.jpg", views: 0, downloads: 0 },
    { id: 770, title: "Takamiya Mana Date A Spirit Pledge", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/takamiya-mana-date-a-spirit-pledge-6f9b.mp4", poster: "images/live/anime/posters/takamiya-mana-date-a-spirit-pledge-6f9b.jpg", views: 0, downloads: 0 },
    { id: 771, title: "Cosmic Princess", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/cosmic-princess-fbdc.mp4", poster: "images/live/anime/posters/cosmic-princess-fbdc.jpg", views: 0, downloads: 0 },
    { id: 772, title: "Anime Girl Standing In A Field Of Pink Tulips At Sunset", category: "anime", tags: "anime live wallpaper live video animated sunset girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-standing-in-a-field-of-pink-tulips-at-sunset-3ae8.mp4", poster: "images/live/anime/posters/anime-girl-standing-in-a-field-of-pink-tulips-at-sunset-3ae8.jpg", views: 0, downloads: 0 },
    { id: 773, title: "Winter Wanderer Xayah League Of Legends", category: "anime", tags: "anime live wallpaper live video animated snow", type: "video", video: "images/live/anime/winter-wanderer-xayah-league-of-legends-c614.mp4", poster: "images/live/anime/posters/winter-wanderer-xayah-league-of-legends-c614.jpg", views: 0, downloads: 0 },
    { id: 774, title: "Thousand Sunny Sunset Sea One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece sunset", type: "video", video: "images/live/anime/thousand-sunny-sunset-sea-one-piece-797f.mp4", poster: "images/live/anime/posters/thousand-sunny-sunset-sea-one-piece-797f.jpg", views: 0, downloads: 0 },
    { id: 775, title: "Jujutsu Kaisen Sukuna", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/jujutsu-kaisen-sukuna-3dc6.mp4", poster: "images/live/anime/posters/jujutsu-kaisen-sukuna-3dc6.jpg", views: 0, downloads: 0 },
    { id: 776, title: "Cute Blonde And Cat Relaxing", category: "anime", tags: "anime live wallpaper live video animated cat", type: "video", video: "images/live/anime/cute-blonde-and-cat-relaxing-d153.mp4", poster: "images/live/anime/posters/cute-blonde-and-cat-relaxing-d153.jpg", views: 0, downloads: 0 },
    { id: 777, title: "Sunny Day With Cats Anime Aesthetic", category: "anime", tags: "anime live wallpaper live video animated one piece cat", type: "video", video: "images/live/anime/sunny-day-with-cats-anime-aesthetic-d98b.mp4", poster: "images/live/anime/posters/sunny-day-with-cats-anime-aesthetic-d98b.jpg", views: 0, downloads: 0 },
    { id: 778, title: "Sukunas Wrath", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/sukunas-wrath-22a5.mp4", poster: "images/live/anime/posters/sukunas-wrath-22a5.jpg", views: 0, downloads: 0 },
    { id: 779, title: "Sunset Drift Anime Girl Classic Muscle Car", category: "anime", tags: "anime live wallpaper live video animated sunset car girl female woman anime girl", type: "video", video: "images/live/anime/sunset-drift-anime-girl-classic-muscle-car-f228.mp4", poster: "images/live/anime/posters/sunset-drift-anime-girl-classic-muscle-car-f228.jpg", views: 0, downloads: 0 },
    { id: 780, title: "Futuristic Cyber Aesthetic", category: "anime", tags: "anime live wallpaper live video animated neon", type: "video", video: "images/live/anime/futuristic-cyber-aesthetic-e731.mp4", poster: "images/live/anime/posters/futuristic-cyber-aesthetic-e731.jpg", views: 0, downloads: 0 },
    { id: 781, title: "Naruto In Flames", category: "anime", tags: "anime live wallpaper live video animated naruto fire boy male guy anime boy", type: "video", video: "images/live/anime/naruto-in-flames-9655.mp4", poster: "images/live/anime/posters/naruto-in-flames-9655.jpg", views: 0, downloads: 0 },
    { id: 782, title: "Kakashi Hatake Lightning Mode", category: "anime", tags: "anime live wallpaper live video animated naruto lightning boy male guy anime boy", type: "video", video: "images/live/anime/kakashi-hatake-lightning-mode-fdc6.mp4", poster: "images/live/anime/posters/kakashi-hatake-lightning-mode-fdc6.jpg", views: 0, downloads: 0 },
    { id: 783, title: "Pure Soul", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/pure-soul-0f0b.mp4", poster: "images/live/anime/posters/pure-soul-0f0b.jpg", views: 0, downloads: 0 },
    { id: 784, title: "Itadori Blood Manipulation", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/itadori-blood-manipulation-5d0c.mp4", poster: "images/live/anime/posters/itadori-blood-manipulation-5d0c.jpg", views: 0, downloads: 0 },
    { id: 785, title: "Monochromeluffyonepiecelivewallpaper", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/monochromeluffyonepiecelivewallpaper-f626.mp4", poster: "images/live/anime/posters/monochromeluffyonepiecelivewallpaper-f626.jpg", views: 0, downloads: 0 },
    { id: 786, title: "The Honored One Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen", type: "video", video: "images/live/anime/the-honored-one-jujutsu-kaisen-67b2.mp4", poster: "images/live/anime/posters/the-honored-one-jujutsu-kaisen-67b2.jpg", views: 0, downloads: 0 },
    { id: 787, title: "Invincible", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/invincible-f37e.mp4", poster: "images/live/anime/posters/invincible-f37e.jpg", views: 0, downloads: 0 },
    { id: 788, title: "Rem Angry Re Zero", category: "anime", tags: "anime live wallpaper live video animated re zero girl female woman anime girl", type: "video", video: "images/live/anime/rem-angry-re-zero-203c.mp4", poster: "images/live/anime/posters/rem-angry-re-zero-203c.jpg", views: 0, downloads: 0 },
    { id: 789, title: "Red Warrior", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/red-warrior-b6f8.mp4", poster: "images/live/anime/posters/red-warrior-b6f8.jpg", views: 0, downloads: 0 },
    { id: 790, title: "Emerald Leviathan Samurai Girl", category: "anime", tags: "anime live wallpaper live video animated samurai girl female woman anime girl boy male guy anime boy", type: "video", video: "images/live/anime/emerald-leviathan-samurai-girl-79e5.mp4", poster: "images/live/anime/posters/emerald-leviathan-samurai-girl-79e5.jpg", views: 0, downloads: 0 },
    { id: 791, title: "Lo Fi Glow Midnight Gaming Room", category: "anime", tags: "anime live wallpaper live video animated cozy neon", type: "video", video: "images/live/anime/lo-fi-glow-midnight-gaming-room-4e87.mp4", poster: "images/live/anime/posters/lo-fi-glow-midnight-gaming-room-4e87.jpg", views: 0, downloads: 0 },
    { id: 792, title: "White Rose Anime Girl", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/white-rose-anime-girl-bece.mp4", poster: "images/live/anime/posters/white-rose-anime-girl-bece.jpg", views: 0, downloads: 0 },
    { id: 793, title: "Rengoku In Fire Demon Slayer", category: "anime", tags: "anime live wallpaper live video animated demon slayer fire dark boy male guy anime boy", type: "video", video: "images/live/anime/rengoku-in-fire-demon-slayer-d9b0.mp4", poster: "images/live/anime/posters/rengoku-in-fire-demon-slayer-d9b0.jpg", views: 0, downloads: 0 },
    { id: 794, title: "Itachi Uchiha Crimson Silence", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-crimson-silence-3d75.mp4", poster: "images/live/anime/posters/itachi-uchiha-crimson-silence-3d75.jpg", views: 0, downloads: 0 },
    { id: 795, title: "Hatsune Miku Bridge", category: "anime", tags: "anime live wallpaper live video animated hatsune miku girl female woman anime girl", type: "video", video: "images/live/anime/hatsune-miku-bridge-1ebb.mp4", poster: "images/live/anime/posters/hatsune-miku-bridge-1ebb.jpg", views: 0, downloads: 0 },
    { id: 796, title: "The Last Samurai", category: "anime", tags: "anime live wallpaper live video animated samurai boy male guy anime boy", type: "video", video: "images/live/anime/the-last-samurai-9bc5.mp4", poster: "images/live/anime/posters/the-last-samurai-9bc5.jpg", views: 0, downloads: 0 },
    { id: 797, title: "Enigmatic Manga Montage", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/enigmatic-manga-montage-bb59.mp4", poster: "images/live/anime/posters/enigmatic-manga-montage-bb59.jpg", views: 0, downloads: 0 },
    { id: 798, title: "Gojo Satoru Unlimited Void", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-unlimited-void-6b5d.mp4", poster: "images/live/anime/posters/gojo-satoru-unlimited-void-6b5d.jpg", views: 0, downloads: 0 },
    { id: 799, title: "Naruto Sunset Reflection Anime", category: "anime", tags: "anime live wallpaper live video animated naruto sunset boy male guy anime boy", type: "video", video: "images/live/anime/naruto-sunset-reflection-anime-1578.mp4", poster: "images/live/anime/posters/naruto-sunset-reflection-anime-1578.jpg", views: 0, downloads: 0 },
    { id: 800, title: "Anime Girls Rainy Neon City Lively", category: "anime", tags: "anime live wallpaper live video animated rain neon girl city female woman anime girl", type: "video", video: "images/live/anime/anime-girls-rainy-neon-city-lively-614c.mp4", poster: "images/live/anime/posters/anime-girls-rainy-neon-city-lively-614c.jpg", views: 0, downloads: 0 },
    { id: 801, title: "Team 7 Nostalgic Moment", category: "anime", tags: "anime live wallpaper live video animated naruto", type: "video", video: "images/live/anime/team-7-nostalgic-moment-a007.mp4", poster: "images/live/anime/posters/team-7-nostalgic-moment-a007.jpg", views: 0, downloads: 0 },
    { id: 802, title: "Itachi Uchiha Silent Resolve", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-silent-resolve-8c52.mp4", poster: "images/live/anime/posters/itachi-uchiha-silent-resolve-8c52.jpg", views: 0, downloads: 0 },
    { id: 803, title: "Avatar Appa Sunset Flight", category: "anime", tags: "anime live wallpaper live video animated attack on titan sunset", type: "video", video: "images/live/anime/avatar-appa-sunset-flight-5bd6.mp4", poster: "images/live/anime/posters/avatar-appa-sunset-flight-5bd6.jpg", views: 0, downloads: 0 },
    { id: 804, title: "Anime Live Wallpaper 11", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-11-4975.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-11-4975.jpg", views: 0, downloads: 0 },
    { id: 805, title: "Senju Kawaragi", category: "anime", tags: "anime live wallpaper live video animated naruto", type: "video", video: "images/live/anime/senju-kawaragi-8bb1.mp4", poster: "images/live/anime/posters/senju-kawaragi-8bb1.jpg", views: 0, downloads: 0 },
    { id: 806, title: "Sukuna Domain Expansion Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/sukuna-domain-expansion-jujutsu-kaisen-aa43.mp4", poster: "images/live/anime/posters/sukuna-domain-expansion-jujutsu-kaisen-aa43.jpg", views: 0, downloads: 0 },
    { id: 807, title: "Anime Live Wallpaper 12", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-12-958f.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-12-958f.jpg", views: 0, downloads: 0 },
    { id: 808, title: "A Moment Of Creative Solitude", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/a-moment-of-creative-solitude-1b3e.mp4", poster: "images/live/anime/posters/a-moment-of-creative-solitude-1b3e.jpg", views: 0, downloads: 0 },
    { id: 809, title: "Raiden Shogun Purple Lightning Genshin Impact", category: "anime", tags: "anime live wallpaper live video animated genshin impact samurai lightning girl female woman anime girl", type: "video", video: "images/live/anime/raiden-shogun-purple-lightning-genshin-impact-6047.mp4", poster: "images/live/anime/posters/raiden-shogun-purple-lightning-genshin-impact-6047.jpg", views: 0, downloads: 0 },
    { id: 810, title: "Masked Cat Girl Ninja", category: "anime", tags: "anime live wallpaper live video animated girl cat female woman anime girl", type: "video", video: "images/live/anime/masked-cat-girl-ninja-2937.mp4", poster: "images/live/anime/posters/masked-cat-girl-ninja-2937.jpg", views: 0, downloads: 0 },
    { id: 811, title: "Mahiru Shiina Summer Sky", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/mahiru-shiina-summer-sky-cf78.mp4", poster: "images/live/anime/posters/mahiru-shiina-summer-sky-cf78.jpg", views: 0, downloads: 0 },
    { id: 812, title: "Hunter X Hunter Hisoka", category: "anime", tags: "anime live wallpaper live video animated hunter x hunter boy male guy anime boy", type: "video", video: "images/live/anime/hunter-x-hunter-hisoka-2906.mp4", poster: "images/live/anime/posters/hunter-x-hunter-hisoka-2906.jpg", views: 0, downloads: 0 },
    { id: 813, title: "Neon Sakura Night", category: "anime", tags: "anime live wallpaper live video animated neon", type: "video", video: "images/live/anime/neon-sakura-night-156e.mp4", poster: "images/live/anime/posters/neon-sakura-night-156e.jpg", views: 0, downloads: 0 },
    { id: 814, title: "Pc Hunter X Hunter", category: "anime", tags: "anime live wallpaper live video animated hunter x hunter", type: "video", video: "images/live/anime/pc-hunter-x-hunter-4ce1.mp4", poster: "images/live/anime/posters/pc-hunter-x-hunter-4ce1.jpg", views: 0, downloads: 0 },
    { id: 815, title: "Kakashi Hatake And Team", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/kakashi-hatake-and-team-8776.mp4", poster: "images/live/anime/posters/kakashi-hatake-and-team-8776.jpg", views: 0, downloads: 0 },
    { id: 816, title: "Musashi Vagabond With Dual Katana", category: "anime", tags: "anime live wallpaper live video animated samurai", type: "video", video: "images/live/anime/musashi-vagabond-with-dual-katana-9df5.mp4", poster: "images/live/anime/posters/musashi-vagabond-with-dual-katana-9df5.jpg", views: 0, downloads: 0 },
    { id: 817, title: "Cosmic Garou Anime Animation", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/cosmic-garou-anime-animation-eacc.mp4", poster: "images/live/anime/posters/cosmic-garou-anime-animation-eacc.jpg", views: 0, downloads: 0 },
    { id: 818, title: "Itachi Uchiha Snow Naruto Shippuuden", category: "anime", tags: "anime live wallpaper live video animated naruto snow boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-snow-naruto-shippuuden-6819.mp4", poster: "images/live/anime/posters/itachi-uchiha-snow-naruto-shippuuden-6819.jpg", views: 0, downloads: 0 },
    { id: 819, title: "Berserk Blood Moon Guts", category: "anime", tags: "anime live wallpaper live video animated berserk moon", type: "video", video: "images/live/anime/berserk-blood-moon-guts-8a5c.mp4", poster: "images/live/anime/posters/berserk-blood-moon-guts-8a5c.jpg", views: 0, downloads: 0 },
    { id: 820, title: "Framed Warrior Awakening", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/framed-warrior-awakening-a088.mp4", poster: "images/live/anime/posters/framed-warrior-awakening-a088.jpg", views: 0, downloads: 0 },
    { id: 821, title: "Ling Cage Energy Blade", category: "anime", tags: "anime live wallpaper live video animated samurai", type: "video", video: "images/live/anime/ling-cage-energy-blade-1ad2.mp4", poster: "images/live/anime/posters/ling-cage-energy-blade-1ad2.jpg", views: 0, downloads: 0 },
    { id: 822, title: "Echoes Celestial Gate", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/echoes-celestial-gate-03cd.mp4", poster: "images/live/anime/posters/echoes-celestial-gate-03cd.jpg", views: 0, downloads: 0 },
    { id: 823, title: "Uchiha Crow Attack", category: "anime", tags: "anime live wallpaper live video animated naruto", type: "video", video: "images/live/anime/uchiha-crow-attack-5847.mp4", poster: "images/live/anime/posters/uchiha-crow-attack-5847.jpg", views: 0, downloads: 0 },
    { id: 824, title: "Wallhack Awakening Sora", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/wallhack-awakening-sora-c188.mp4", poster: "images/live/anime/posters/wallhack-awakening-sora-c188.jpg", views: 0, downloads: 0 },
    { id: 825, title: "Foxy Moving", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/foxy-moving-c6cd.mp4", poster: "images/live/anime/posters/foxy-moving-c6cd.jpg", views: 0, downloads: 0 },
    { id: 826, title: "Kuroko Neon Dunk", category: "anime", tags: "anime live wallpaper live video animated neon", type: "video", video: "images/live/anime/kuroko-neon-dunk-bb0b.mp4", poster: "images/live/anime/posters/kuroko-neon-dunk-bb0b.jpg", views: 0, downloads: 0 },
    { id: 827, title: "Cyber Gold Visor Girl", category: "anime", tags: "anime live wallpaper live video animated neon girl female woman anime girl", type: "video", video: "images/live/anime/cyber-gold-visor-girl-987a.mp4", poster: "images/live/anime/posters/cyber-gold-visor-girl-987a.jpg", views: 0, downloads: 0 },
    { id: 828, title: "Jujutsu Kaisen Sukuna 2", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/jujutsu-kaisen-sukuna-2-0d8f.mp4", poster: "images/live/anime/posters/jujutsu-kaisen-sukuna-2-0d8f.jpg", views: 0, downloads: 0 },
    { id: 829, title: "Wandering Samurai", category: "anime", tags: "anime live wallpaper live video animated samurai boy male guy anime boy", type: "video", video: "images/live/anime/wandering-samurai-7ccd.mp4", poster: "images/live/anime/posters/wandering-samurai-7ccd.jpg", views: 0, downloads: 0 },
    { id: 830, title: "Genshin Impact Raiden Shogun", category: "anime", tags: "anime live wallpaper live video animated genshin impact samurai girl female woman anime girl", type: "video", video: "images/live/anime/genshin-impact-raiden-shogun-18fb.mp4", poster: "images/live/anime/posters/genshin-impact-raiden-shogun-18fb.jpg", views: 0, downloads: 0 },
    { id: 831, title: "Shorekeeper Blue Butterfly Wuthering Waves", category: "anime", tags: "anime live wallpaper live video animated wuthering waves girl female woman anime girl", type: "video", video: "images/live/anime/shorekeeper-blue-butterfly-wuthering-waves-4e63.mp4", poster: "images/live/anime/posters/shorekeeper-blue-butterfly-wuthering-waves-4e63.jpg", views: 0, downloads: 0 },
    { id: 832, title: "Akame Crimson Slash", category: "anime", tags: "anime live wallpaper live video animated akame ga kill girl female woman anime girl", type: "video", video: "images/live/anime/akame-crimson-slash-10ae.mp4", poster: "images/live/anime/posters/akame-crimson-slash-10ae.jpg", views: 0, downloads: 0 },
    { id: 833, title: "2B Relaxing Nier", category: "anime", tags: "anime live wallpaper live video animated nier automata girl female woman anime girl", type: "video", video: "images/live/anime/2b-relaxing-nier-9746.mp4", poster: "images/live/anime/posters/2b-relaxing-nier-9746.jpg", views: 0, downloads: 0 },
    { id: 834, title: "Zero Two Bouncing", category: "anime", tags: "anime live wallpaper live video animated darling in the franxx", type: "video", video: "images/live/anime/zero-two-bouncing-1aa3.mp4", poster: "images/live/anime/posters/zero-two-bouncing-1aa3.jpg", views: 0, downloads: 0 },
    { id: 835, title: "Furina", category: "anime", tags: "anime live wallpaper live video animated genshin impact girl female woman anime girl", type: "video", video: "images/live/anime/furina-4ea3.mp4", poster: "images/live/anime/posters/furina-4ea3.jpg", views: 0, downloads: 0 },
    { id: 836, title: "Coffee Date", category: "anime", tags: "anime live wallpaper live video animated cozy", type: "video", video: "images/live/anime/coffee-date-069a.mp4", poster: "images/live/anime/posters/coffee-date-069a.jpg", views: 0, downloads: 0 },
    { id: 837, title: "Sukuna Vs Jogo Flames", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen fire boy male guy anime boy", type: "video", video: "images/live/anime/sukuna-vs-jogo-flames-62ca.mp4", poster: "images/live/anime/posters/sukuna-vs-jogo-flames-62ca.jpg", views: 0, downloads: 0 },
    { id: 838, title: "Toji Fushiguro Intensity", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/toji-fushiguro-intensity-3765.mp4", poster: "images/live/anime/posters/toji-fushiguro-intensity-3765.jpg", views: 0, downloads: 0 },
    { id: 839, title: "Lady Tsunade Tavern Vibes Naruto Aesthetic", category: "anime", tags: "anime live wallpaper live video animated naruto girl female woman anime girl boy male guy anime boy", type: "video", video: "images/live/anime/lady-tsunade-tavern-vibes-naruto-aesthetic-ae8a.mp4", poster: "images/live/anime/posters/lady-tsunade-tavern-vibes-naruto-aesthetic-ae8a.jpg", views: 0, downloads: 0 },
    { id: 840, title: "Tanjiro Kamado Fire Sword Demon Slayer", category: "anime", tags: "anime live wallpaper live video animated demon slayer samurai fire dark boy male guy anime boy", type: "video", video: "images/live/anime/tanjiro-kamado-fire-sword-demon-slayer-cb66.mp4", poster: "images/live/anime/posters/tanjiro-kamado-fire-sword-demon-slayer-cb66.jpg", views: 0, downloads: 0 },
    { id: 841, title: "Yuta Okkotsu Chilling", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-okkotsu-chilling-bb90.mp4", poster: "images/live/anime/posters/yuta-okkotsu-chilling-bb90.jpg", views: 0, downloads: 0 },
    { id: 842, title: "Makima Ritual Of Control", category: "anime", tags: "anime live wallpaper live video animated chainsaw man girl female woman anime girl", type: "video", video: "images/live/anime/makima-ritual-of-control-575c.mp4", poster: "images/live/anime/posters/makima-ritual-of-control-575c.jpg", views: 0, downloads: 0 },
    { id: 843, title: "Black Curtain", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/black-curtain-02a9.mp4", poster: "images/live/anime/posters/black-curtain-02a9.jpg", views: 0, downloads: 0 },
    { id: 844, title: "Cyber Slayer Schoolgirl Anime", category: "anime", tags: "anime live wallpaper live video animated demon slayer neon girl female woman anime girl", type: "video", video: "images/live/anime/cyber-slayer-schoolgirl-anime-aaed.mp4", poster: "images/live/anime/posters/cyber-slayer-schoolgirl-anime-aaed.jpg", views: 0, downloads: 0 },
    { id: 845, title: "Gojo Satoru Red Technique Awakening", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-red-technique-awakening-4f26.mp4", poster: "images/live/anime/posters/gojo-satoru-red-technique-awakening-4f26.jpg", views: 0, downloads: 0 },
    { id: 846, title: "Blue Archive UI Live2d Jaymie", category: "anime", tags: "anime live wallpaper live video animated blue archive", type: "video", video: "images/live/anime/blue-archive-ui-live2d-jaymie-d300.mp4", poster: "images/live/anime/posters/blue-archive-ui-live2d-jaymie-d300.jpg", views: 0, downloads: 0 },
    { id: 847, title: "Anime Live Wallpaper 13", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-13-6a78.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-13-6a78.jpg", views: 0, downloads: 0 },
    { id: 848, title: "Anime Live Wallpaper 14", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-14-ee3b.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-14-ee3b.jpg", views: 0, downloads: 0 },
    { id: 849, title: "Anime Demon Slashing Blade", category: "anime", tags: "anime live wallpaper live video animated demon slayer samurai dark", type: "video", video: "images/live/anime/anime-demon-slashing-blade-4b52.mp4", poster: "images/live/anime/posters/anime-demon-slashing-blade-4b52.jpg", views: 0, downloads: 0 },
    { id: 850, title: "Kaneki Ken Ghoul Awakening", category: "anime", tags: "anime live wallpaper live video animated tokyo ghoul boy male guy anime boy", type: "video", video: "images/live/anime/kaneki-ken-ghoul-awakening-9541.mp4", poster: "images/live/anime/posters/kaneki-ken-ghoul-awakening-9541.jpg", views: 0, downloads: 0 },
    { id: 851, title: "Samurai Of The Tides Blade Amid The Waves", category: "anime", tags: "anime live wallpaper live video animated samurai boy male guy anime boy", type: "video", video: "images/live/anime/samurai-of-the-tides-blade-amid-the-waves-ea07.mp4", poster: "images/live/anime/posters/samurai-of-the-tides-blade-amid-the-waves-ea07.jpg", views: 0, downloads: 0 },
    { id: 852, title: "Blazing Flame Warrior Sword Of Fire", category: "anime", tags: "anime live wallpaper live video animated samurai fire", type: "video", video: "images/live/anime/blazing-flame-warrior-sword-of-fire-2273.mp4", poster: "images/live/anime/posters/blazing-flame-warrior-sword-of-fire-2273.jpg", views: 0, downloads: 0 },
    { id: 853, title: "Hellboy With Gun Orange", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/hellboy-with-gun-orange-ffae.mp4", poster: "images/live/anime/posters/hellboy-with-gun-orange-ffae.jpg", views: 0, downloads: 0 },
    { id: 854, title: "Luffy Kid One Piece Autumn", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/luffy-kid-one-piece-autumn-17d5.mp4", poster: "images/live/anime/posters/luffy-kid-one-piece-autumn-17d5.jpg", views: 0, downloads: 0 },
    { id: 855, title: "Pink Blossom", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/pink-blossom-bf98.mp4", poster: "images/live/anime/posters/pink-blossom-bf98.jpg", views: 0, downloads: 0 },
    { id: 856, title: "Anime Live Wallpaper 15", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-15-5ac5.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-15-5ac5.jpg", views: 0, downloads: 0 },
    { id: 857, title: "Wandering Samurai Sunset", category: "anime", tags: "anime live wallpaper live video animated samurai sunset boy male guy anime boy", type: "video", video: "images/live/anime/wandering-samurai-sunset-4e18.mp4", poster: "images/live/anime/posters/wandering-samurai-sunset-4e18.jpg", views: 0, downloads: 0 },
    { id: 858, title: "Goku Hot Spring Anime", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-hot-spring-anime-0492.mp4", poster: "images/live/anime/posters/goku-hot-spring-anime-0492.jpg", views: 0, downloads: 0 },
    { id: 859, title: "Ryo Yamada Bocchi The Rock", category: "anime", tags: "anime live wallpaper live video animated bocchi the rock girl female woman anime girl", type: "video", video: "images/live/anime/ryo-yamada-bocchi-the-rock-ca8b.mp4", poster: "images/live/anime/posters/ryo-yamada-bocchi-the-rock-ca8b.jpg", views: 0, downloads: 0 },
    { id: 860, title: "Violet Evergarden Chinese", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/violet-evergarden-chinese-7fac.mp4", poster: "images/live/anime/posters/violet-evergarden-chinese-7fac.jpg", views: 0, downloads: 0 },
    { id: 861, title: "Ultra Instinct Goku", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/ultra-instinct-goku-df1d.mp4", poster: "images/live/anime/posters/ultra-instinct-goku-df1d.jpg", views: 0, downloads: 0 },
    { id: 862, title: "Deku Vs Bakugo Ignition Clash", category: "anime", tags: "anime live wallpaper live video animated my hero academia boy male guy anime boy", type: "video", video: "images/live/anime/deku-vs-bakugo-ignition-clash-d9f3.mp4", poster: "images/live/anime/posters/deku-vs-bakugo-ignition-clash-d9f3.jpg", views: 0, downloads: 0 },
    { id: 863, title: "Yuta Okkotsu Sakura Silence", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-okkotsu-sakura-silence-177b.mp4", poster: "images/live/anime/posters/yuta-okkotsu-sakura-silence-177b.jpg", views: 0, downloads: 0 },
    { id: 864, title: "Naoya Zenin Shattered Speed", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen", type: "video", video: "images/live/anime/naoya-zenin-shattered-speed-6238.mp4", poster: "images/live/anime/posters/naoya-zenin-shattered-speed-6238.jpg", views: 0, downloads: 0 },
    { id: 865, title: "Itachi Uchiha Snow", category: "anime", tags: "anime live wallpaper live video animated naruto snow boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-snow-a264.mp4", poster: "images/live/anime/posters/itachi-uchiha-snow-a264.jpg", views: 0, downloads: 0 },
    { id: 866, title: "Shinobu Dark Butterfly Kimetsu No Yaiba", category: "anime", tags: "anime live wallpaper live video animated demon slayer dark girl female woman anime girl", type: "video", video: "images/live/anime/shinobu-dark-butterfly-kimetsu-no-yaiba-229c.mp4", poster: "images/live/anime/posters/shinobu-dark-butterfly-kimetsu-no-yaiba-229c.jpg", views: 0, downloads: 0 },
    { id: 867, title: "Gojo Blue Eyes Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-blue-eyes-jujutsu-kaisen-77c4.mp4", poster: "images/live/anime/posters/gojo-blue-eyes-jujutsu-kaisen-77c4.jpg", views: 0, downloads: 0 },
    { id: 868, title: "Cat Girl On A Mountain Lake", category: "anime", tags: "anime live wallpaper live video animated girl cat female woman anime girl", type: "video", video: "images/live/anime/cat-girl-on-a-mountain-lake-8066.mp4", poster: "images/live/anime/posters/cat-girl-on-a-mountain-lake-8066.jpg", views: 0, downloads: 0 },
    { id: 869, title: "Pain Rinnegan Awakening Naruto", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/pain-rinnegan-awakening-naruto-6db7.mp4", poster: "images/live/anime/posters/pain-rinnegan-awakening-naruto-6db7.jpg", views: 0, downloads: 0 },
    { id: 870, title: "Night Coffee Break", category: "anime", tags: "anime live wallpaper live video animated cozy", type: "video", video: "images/live/anime/night-coffee-break-668c.mp4", poster: "images/live/anime/posters/night-coffee-break-668c.jpg", views: 0, downloads: 0 },
    { id: 871, title: "Zoro Spirit Flame One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece fire boy male guy anime boy", type: "video", video: "images/live/anime/zoro-spirit-flame-one-piece-f926.mp4", poster: "images/live/anime/posters/zoro-spirit-flame-one-piece-f926.jpg", views: 0, downloads: 0 },
    { id: 872, title: "Jujutsu Kaisen Megumi Mahoraga", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/jujutsu-kaisen-megumi-mahoraga-a59e.mp4", poster: "images/live/anime/posters/jujutsu-kaisen-megumi-mahoraga-a59e.jpg", views: 0, downloads: 0 },
    { id: 873, title: "Hitori Gotoh Beautiful Sunset Bocchi The Rock", category: "anime", tags: "anime live wallpaper live video animated bocchi the rock sunset girl female woman anime girl", type: "video", video: "images/live/anime/hitori-gotoh-beautiful-sunset-bocchi-the-rock-e369.mp4", poster: "images/live/anime/posters/hitori-gotoh-beautiful-sunset-bocchi-the-rock-e369.jpg", views: 0, downloads: 0 },
    { id: 874, title: "Uchiha Madara Under The Rain Naruto Shippuden", category: "anime", tags: "anime live wallpaper live video animated naruto rain boy male guy anime boy", type: "video", video: "images/live/anime/uchiha-madara-under-the-rain-naruto-shippuden-9482.mp4", poster: "images/live/anime/posters/uchiha-madara-under-the-rain-naruto-shippuden-9482.jpg", views: 0, downloads: 0 },
    { id: 875, title: "Black Clover Asta", category: "anime", tags: "anime live wallpaper live video animated black clover boy male guy anime boy", type: "video", video: "images/live/anime/black-clover-asta-1c35.mp4", poster: "images/live/anime/posters/black-clover-asta-1c35.jpg", views: 0, downloads: 0 },
    { id: 876, title: "Sung Jinwoo Electric Aura", category: "anime", tags: "anime live wallpaper live video animated solo leveling lightning boy male guy anime boy", type: "video", video: "images/live/anime/sung-jinwoo-electric-aura-1d70.mp4", poster: "images/live/anime/posters/sung-jinwoo-electric-aura-1d70.jpg", views: 0, downloads: 0 },
    { id: 877, title: "Gojo Cursed Energy", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-cursed-energy-3d60.mp4", poster: "images/live/anime/posters/gojo-cursed-energy-3d60.jpg", views: 0, downloads: 0 },
    { id: 878, title: "Super Saiyan Blue Warrior", category: "anime", tags: "anime live wallpaper live video animated dragon ball", type: "video", video: "images/live/anime/super-saiyan-blue-warrior-c91b.mp4", poster: "images/live/anime/posters/super-saiyan-blue-warrior-c91b.jpg", views: 0, downloads: 0 },
    { id: 879, title: "Anime Live Wallpaper 16", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-16-8cd7.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-16-8cd7.jpg", views: 0, downloads: 0 },
    { id: 880, title: "Jujutsu Kaisen Glowing Mahoraga", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen", type: "video", video: "images/live/anime/jujutsu-kaisen-glowing-mahoraga-c0b9.mp4", poster: "images/live/anime/posters/jujutsu-kaisen-glowing-mahoraga-c0b9.jpg", views: 0, downloads: 0 },
    { id: 881, title: "Red Cloak Sword Warrior", category: "anime", tags: "anime live wallpaper live video animated samurai", type: "video", video: "images/live/anime/red-cloak-sword-warrior-0670.mp4", poster: "images/live/anime/posters/red-cloak-sword-warrior-0670.jpg", views: 0, downloads: 0 },
    { id: 882, title: "Mystic Warrior Guardian Of The Silent Wolf", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/mystic-warrior-guardian-of-the-silent-wolf-5110.mp4", poster: "images/live/anime/posters/mystic-warrior-guardian-of-the-silent-wolf-5110.jpg", views: 0, downloads: 0 },
    { id: 883, title: "Cute Pink Cat Anime Girl", category: "anime", tags: "anime live wallpaper live video animated girl cat female woman anime girl", type: "video", video: "images/live/anime/cute-pink-cat-anime-girl-70f2.mp4", poster: "images/live/anime/posters/cute-pink-cat-anime-girl-70f2.jpg", views: 0, downloads: 0 },
    { id: 884, title: "Naruto Chibi", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/naruto-chibi-1130.mp4", poster: "images/live/anime/posters/naruto-chibi-1130.jpg", views: 0, downloads: 0 },
    { id: 885, title: "Persona 5 Joker", category: "anime", tags: "anime live wallpaper live video animated boy male guy anime boy", type: "video", video: "images/live/anime/persona-5-joker-8423.mp4", poster: "images/live/anime/posters/persona-5-joker-8423.jpg", views: 0, downloads: 0 },
    { id: 886, title: "Goth Anime Girl", category: "anime", tags: "anime live wallpaper live video animated girl dark female woman anime girl", type: "video", video: "images/live/anime/goth-anime-girl-e596.mp4", poster: "images/live/anime/posters/goth-anime-girl-e596.jpg", views: 0, downloads: 0 },
    { id: 887, title: "Tanjiro Kamado Water Breathing Dragon", category: "anime", tags: "anime live wallpaper live video animated demon slayer dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/tanjiro-kamado-water-breathing-dragon-26a1.mp4", poster: "images/live/anime/posters/tanjiro-kamado-water-breathing-dragon-26a1.jpg", views: 0, downloads: 0 },
    { id: 888, title: "Hatsune Miku Sky", category: "anime", tags: "anime live wallpaper live video animated hatsune miku girl female woman anime girl", type: "video", video: "images/live/anime/hatsune-miku-sky-55e6.mp4", poster: "images/live/anime/posters/hatsune-miku-sky-55e6.jpg", views: 0, downloads: 0 },
    { id: 889, title: "Nephis Shadow Slave", category: "anime", tags: "anime live wallpaper live video animated dark", type: "video", video: "images/live/anime/nephis-shadow-slave-65ef.mp4", poster: "images/live/anime/posters/nephis-shadow-slave-65ef.jpg", views: 0, downloads: 0 },
    { id: 890, title: "Goku Saiyan Aura", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-saiyan-aura-88be.mp4", poster: "images/live/anime/posters/goku-saiyan-aura-88be.jpg", views: 0, downloads: 0 },
    { id: 891, title: "Levi Ackerman", category: "anime", tags: "anime live wallpaper live video animated attack on titan boy male guy anime boy", type: "video", video: "images/live/anime/levi-ackerman-7569.mp4", poster: "images/live/anime/posters/levi-ackerman-7569.jpg", views: 0, downloads: 0 },
    { id: 892, title: "Anime Live Wallpaper 17", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-17-2ce5.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-17-2ce5.jpg", views: 0, downloads: 0 },
    { id: 893, title: "Ryomen Sukuna Fuga Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/ryomen-sukuna-fuga-jujutsu-kaisen-4d07.mp4", poster: "images/live/anime/posters/ryomen-sukuna-fuga-jujutsu-kaisen-4d07.jpg", views: 0, downloads: 0 },
    { id: 894, title: "Cozy Reading Girl Rainy Window Anime Aesthetic", category: "anime", tags: "anime live wallpaper live video animated cozy rain girl female woman anime girl", type: "video", video: "images/live/anime/cozy-reading-girl-rainy-window-anime-aesthetic-c2b0.mp4", poster: "images/live/anime/posters/cozy-reading-girl-rainy-window-anime-aesthetic-c2b0.jpg", views: 0, downloads: 0 },
    { id: 895, title: "Straw Hat Luffy", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/straw-hat-luffy-723f.mp4", poster: "images/live/anime/posters/straw-hat-luffy-723f.jpg", views: 0, downloads: 0 },
    { id: 896, title: "Goku SSJ Unleashed", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-ssj-unleashed-1b3e.mp4", poster: "images/live/anime/posters/goku-ssj-unleashed-1b3e.jpg", views: 0, downloads: 0 },
    { id: 897, title: "Mirror Sky Journey Anime Reflection", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/mirror-sky-journey-anime-reflection-0b9a.mp4", poster: "images/live/anime/posters/mirror-sky-journey-anime-reflection-0b9a.jpg", views: 0, downloads: 0 },
    { id: 898, title: "Golden", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/golden-515d.mp4", poster: "images/live/anime/posters/golden-515d.jpg", views: 0, downloads: 0 },
    { id: 899, title: "Itachi Crimson Crows", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/itachi-crimson-crows-b12f.mp4", poster: "images/live/anime/posters/itachi-crimson-crows-b12f.jpg", views: 0, downloads: 0 },
    { id: 900, title: "Anime Girl Sword Blue Eyes", category: "anime", tags: "anime live wallpaper live video animated samurai girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-sword-blue-eyes-7cd2.mp4", poster: "images/live/anime/posters/anime-girl-sword-blue-eyes-7cd2.jpg", views: 0, downloads: 0 },
    { id: 901, title: "Haloween", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/haloween-bad9.mp4", poster: "images/live/anime/posters/haloween-bad9.jpg", views: 0, downloads: 0 },
    { id: 902, title: "Anime Girl Hydrangea Garden", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-hydrangea-garden-74e6.mp4", poster: "images/live/anime/posters/anime-girl-hydrangea-garden-74e6.jpg", views: 0, downloads: 0 },
    { id: 903, title: "Spark In The Eyes Exusiai Arknights", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/spark-in-the-eyes-exusiai-arknights-68ea.mp4", poster: "images/live/anime/posters/spark-in-the-eyes-exusiai-arknights-68ea.jpg", views: 0, downloads: 0 },
    { id: 904, title: "Cosmic Akaza", category: "anime", tags: "anime live wallpaper live video animated demon slayer boy male guy anime boy", type: "video", video: "images/live/anime/cosmic-akaza-5b9e.mp4", poster: "images/live/anime/posters/cosmic-akaza-5b9e.jpg", views: 0, downloads: 0 },
    { id: 905, title: "Mahito Twisted Smile", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/mahito-twisted-smile-2a2b.mp4", poster: "images/live/anime/posters/mahito-twisted-smile-2a2b.jpg", views: 0, downloads: 0 },
    { id: 906, title: "Shattered Reflection Anime Eyes", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/shattered-reflection-anime-eyes-98f6.mp4", poster: "images/live/anime/posters/shattered-reflection-anime-eyes-98f6.jpg", views: 0, downloads: 0 },
    { id: 907, title: "Kitsune Girl Gamer", category: "anime", tags: "anime live wallpaper live video animated girl cat female woman anime girl", type: "video", video: "images/live/anime/kitsune-girl-gamer-f200.mp4", poster: "images/live/anime/posters/kitsune-girl-gamer-f200.jpg", views: 0, downloads: 0 },
    { id: 908, title: "Yami Sukehiro Black Clo", category: "anime", tags: "anime live wallpaper live video animated black clover", type: "video", video: "images/live/anime/yami-sukehiro-black-clo-922a.mp4", poster: "images/live/anime/posters/yami-sukehiro-black-clo-922a.jpg", views: 0, downloads: 0 },
    { id: 909, title: "Oni Samurai Fire Katana", category: "anime", tags: "anime live wallpaper live video animated samurai fire boy male guy anime boy", type: "video", video: "images/live/anime/oni-samurai-fire-katana-fa5c.mp4", poster: "images/live/anime/posters/oni-samurai-fire-katana-fa5c.jpg", views: 0, downloads: 0 },
    { id: 910, title: "Future Trunks Powering Up", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/future-trunks-powering-up-2e13.mp4", poster: "images/live/anime/posters/future-trunks-powering-up-2e13.jpg", views: 0, downloads: 0 },
    { id: 911, title: "Rain Warrior", category: "anime", tags: "anime live wallpaper live video animated rain", type: "video", video: "images/live/anime/rain-warrior-b602.mp4", poster: "images/live/anime/posters/rain-warrior-b602.jpg", views: 0, downloads: 0 },
    { id: 912, title: "Ultra Instinct Goku Limitless Power Awakens", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/ultra-instinct-goku-limitless-power-awakens-0368.mp4", poster: "images/live/anime/posters/ultra-instinct-goku-limitless-power-awakens-0368.jpg", views: 0, downloads: 0 },
    { id: 913, title: "Yuji Itadori Crimson Strike", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuji-itadori-crimson-strike-5fe0.mp4", poster: "images/live/anime/posters/yuji-itadori-crimson-strike-5fe0.jpg", views: 0, downloads: 0 },
    { id: 914, title: "Anime Live Wallpaper 18", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-18-afc0.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-18-afc0.jpg", views: 0, downloads: 0 },
    { id: 915, title: "Neon Oni Ronin", category: "anime", tags: "anime live wallpaper live video animated samurai neon boy male guy anime boy", type: "video", video: "images/live/anime/neon-oni-ronin-2283.mp4", poster: "images/live/anime/posters/neon-oni-ronin-2283.jpg", views: 0, downloads: 0 },
    { id: 916, title: "Sasuke Uchiha Chidori", category: "anime", tags: "anime live wallpaper live video animated naruto lightning boy male guy anime boy", type: "video", video: "images/live/anime/sasuke-uchiha-chidori-a16c.mp4", poster: "images/live/anime/posters/sasuke-uchiha-chidori-a16c.jpg", views: 0, downloads: 0 },
    { id: 917, title: "Super Saiyan 4 Goku", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/super-saiyan-4-goku-5fd0.mp4", poster: "images/live/anime/posters/super-saiyan-4-goku-5fd0.jpg", views: 0, downloads: 0 },
    { id: 918, title: "Kyojuro Rengoku Demon Slayer", category: "anime", tags: "anime live wallpaper live video animated demon slayer dark boy male guy anime boy", type: "video", video: "images/live/anime/kyojuro-rengoku-demon-slayer-4124.mp4", poster: "images/live/anime/posters/kyojuro-rengoku-demon-slayer-4124.jpg", views: 0, downloads: 0 },
    { id: 919, title: "Portgas D Ace One Piece Smile", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/portgas-d-ace-one-piece-smile-7dd8.mp4", poster: "images/live/anime/posters/portgas-d-ace-one-piece-smile-7dd8.jpg", views: 0, downloads: 0 },
    { id: 920, title: "The Silence Of The Night", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/the-silence-of-the-night-ca0b.mp4", poster: "images/live/anime/posters/the-silence-of-the-night-ca0b.jpg", views: 0, downloads: 0 },
    { id: 921, title: "Luffy Sunset Calm One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece sunset boy male guy anime boy", type: "video", video: "images/live/anime/luffy-sunset-calm-one-piece-2046.mp4", poster: "images/live/anime/posters/luffy-sunset-calm-one-piece-2046.jpg", views: 0, downloads: 0 },
    { id: 922, title: "Naruto Spring Vibes", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/naruto-spring-vibes-1a36.mp4", poster: "images/live/anime/posters/naruto-spring-vibes-1a36.jpg", views: 0, downloads: 0 },
    { id: 923, title: "Anime Cozy Night Room", category: "anime", tags: "anime live wallpaper live video animated cozy", type: "video", video: "images/live/anime/anime-cozy-night-room-685d.mp4", poster: "images/live/anime/posters/anime-cozy-night-room-685d.jpg", views: 0, downloads: 0 },
    { id: 924, title: "Elaina Vineyard", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/elaina-vineyard-71b5.mp4", poster: "images/live/anime/posters/elaina-vineyard-71b5.jpg", views: 0, downloads: 0 },
    { id: 925, title: "Satoru Gojo Void Master", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-void-master-4c3f.mp4", poster: "images/live/anime/posters/satoru-gojo-void-master-4c3f.jpg", views: 0, downloads: 0 },
    { id: 926, title: "Zenitsu Demon Slayer 2", category: "anime", tags: "anime live wallpaper live video animated demon slayer dark boy male guy anime boy", type: "video", video: "images/live/anime/zenitsu-demon-slayer-2-432d.mp4", poster: "images/live/anime/posters/zenitsu-demon-slayer-2-432d.jpg", views: 0, downloads: 0 },
    { id: 927, title: "Levi Ackerman Green Eyes", category: "anime", tags: "anime live wallpaper live video animated attack on titan boy male guy anime boy", type: "video", video: "images/live/anime/levi-ackerman-green-eyes-2b2e.mp4", poster: "images/live/anime/posters/levi-ackerman-green-eyes-2b2e.jpg", views: 0, downloads: 0 },
    { id: 928, title: "Jane Doe Zenless Zone Zero", category: "anime", tags: "anime live wallpaper live video animated zenless zone zero", type: "video", video: "images/live/anime/jane-doe-zenless-zone-zero-1bd9.mp4", poster: "images/live/anime/posters/jane-doe-zenless-zone-zero-1bd9.jpg", views: 0, downloads: 0 },
    { id: 929, title: "Yuta Okkotsu Manga Awakening", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-okkotsu-manga-awakening-622a.mp4", poster: "images/live/anime/posters/yuta-okkotsu-manga-awakening-622a.jpg", views: 0, downloads: 0 },
    { id: 930, title: "The Berserkers Vigil", category: "anime", tags: "anime live wallpaper live video animated berserk", type: "video", video: "images/live/anime/the-berserkers-vigil-fd6e.mp4", poster: "images/live/anime/posters/the-berserkers-vigil-fd6e.jpg", views: 0, downloads: 0 },
    { id: 931, title: "Zero Two Flow Animation", category: "anime", tags: "anime live wallpaper live video animated darling in the franxx", type: "video", video: "images/live/anime/zero-two-flow-animation-f1e6.mp4", poster: "images/live/anime/posters/zero-two-flow-animation-f1e6.jpg", views: 0, downloads: 0 },
    { id: 932, title: "Satoru Gojo Blue Flames", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen fire boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-blue-flames-8404.mp4", poster: "images/live/anime/posters/satoru-gojo-blue-flames-8404.jpg", views: 0, downloads: 0 },
    { id: 933, title: "Super Saiyan Rose", category: "anime", tags: "anime live wallpaper live video animated dragon ball", type: "video", video: "images/live/anime/super-saiyan-rose-0b63.mp4", poster: "images/live/anime/posters/super-saiyan-rose-0b63.jpg", views: 0, downloads: 0 },
    { id: 934, title: "Distant Horizon Sunset Anime", category: "anime", tags: "anime live wallpaper live video animated sunset", type: "video", video: "images/live/anime/distant-horizon-sunset-anime-38f4.mp4", poster: "images/live/anime/posters/distant-horizon-sunset-anime-38f4.jpg", views: 0, downloads: 0 },
    { id: 935, title: "Dont Mind It", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/dont-mind-it-271b.mp4", poster: "images/live/anime/posters/dont-mind-it-271b.jpg", views: 0, downloads: 0 },
    { id: 936, title: "Cyberpunk Son Goku", category: "anime", tags: "anime live wallpaper live video animated dragon ball neon boy male guy anime boy", type: "video", video: "images/live/anime/cyberpunk-son-goku-4a63.mp4", poster: "images/live/anime/posters/cyberpunk-son-goku-4a63.jpg", views: 0, downloads: 0 },
    { id: 937, title: "Gojo Satoru Neon Rain Train", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen rain neon boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-neon-rain-train-cae5.mp4", poster: "images/live/anime/posters/gojo-satoru-neon-rain-train-cae5.jpg", views: 0, downloads: 0 },
    { id: 938, title: "Anime Live Wallpaper 19", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-19-b5fd.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-19-b5fd.jpg", views: 0, downloads: 0 },
    { id: 939, title: "Ethereal Dark Angel Fiery Wings", category: "anime", tags: "anime live wallpaper live video animated dark girl female woman anime girl", type: "video", video: "images/live/anime/ethereal-dark-angel-fiery-wings-36bd.mp4", poster: "images/live/anime/posters/ethereal-dark-angel-fiery-wings-36bd.jpg", views: 0, downloads: 0 },
    { id: 940, title: "Collapse", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/collapse-8eba.mp4", poster: "images/live/anime/posters/collapse-8eba.jpg", views: 0, downloads: 0 },
    { id: 941, title: "Itachi Uchiha Red Sharingan Rain", category: "anime", tags: "anime live wallpaper live video animated naruto rain boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-red-sharingan-rain-1010.mp4", poster: "images/live/anime/posters/itachi-uchiha-red-sharingan-rain-1010.jpg", views: 0, downloads: 0 },
    { id: 942, title: "Furina Throne Genshin Impact", category: "anime", tags: "anime live wallpaper live video animated genshin impact girl female woman anime girl", type: "video", video: "images/live/anime/furina-throne-genshin-impact-4075.mp4", poster: "images/live/anime/posters/furina-throne-genshin-impact-4075.jpg", views: 0, downloads: 0 },
    { id: 943, title: "Anime Live Wallpaper 20", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-20-3d72.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-20-3d72.jpg", views: 0, downloads: 0 },
    { id: 944, title: "Luffy In The Rain", category: "anime", tags: "anime live wallpaper live video animated one piece rain boy male guy anime boy", type: "video", video: "images/live/anime/luffy-in-the-rain-7c98.mp4", poster: "images/live/anime/posters/luffy-in-the-rain-7c98.jpg", views: 0, downloads: 0 },
    { id: 945, title: "Angry Blue Goku Dragon Ball", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/angry-blue-goku-dragon-ball-5ac0.mp4", poster: "images/live/anime/posters/angry-blue-goku-dragon-ball-5ac0.jpg", views: 0, downloads: 0 },
    { id: 946, title: "Anime Live Wallpaper 21", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-21-b615.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-21-b615.jpg", views: 0, downloads: 0 },
    { id: 947, title: "Anime Live Wallpaper 22", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-live-wallpaper-22-9791.mp4", poster: "images/live/anime/posters/anime-live-wallpaper-22-9791.jpg", views: 0, downloads: 0 },
    { id: 948, title: "Kaneki Unleashed Tokyo Ghoul", category: "anime", tags: "anime live wallpaper live video animated tokyo ghoul city boy male guy anime boy", type: "video", video: "images/live/anime/kaneki-unleashed-tokyo-ghoul-406b.mp4", poster: "images/live/anime/posters/kaneki-unleashed-tokyo-ghoul-406b.jpg", views: 0, downloads: 0 },
    { id: 949, title: "Sasuke Vs Na", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/sasuke-vs-na-65fb.mp4", poster: "images/live/anime/posters/sasuke-vs-na-65fb.jpg", views: 0, downloads: 0 },
    { id: 950, title: "Satoru Gojo Hollow Purple 2", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-hollow-purple-2-828e.mp4", poster: "images/live/anime/posters/satoru-gojo-hollow-purple-2-828e.jpg", views: 0, downloads: 0 },
    { id: 951, title: "Crimson Silence Anime", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/crimson-silence-anime-e9e5.mp4", poster: "images/live/anime/posters/crimson-silence-anime-e9e5.jpg", views: 0, downloads: 0 },
    { id: 952, title: "Madara Uchiha Silver Surfer", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/madara-uchiha-silver-surfer-0166.mp4", poster: "images/live/anime/posters/madara-uchiha-silver-surfer-0166.jpg", views: 0, downloads: 0 },
    { id: 953, title: "Mahito Form", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/mahito-form-fa58.mp4", poster: "images/live/anime/posters/mahito-form-fa58.jpg", views: 0, downloads: 0 },
    { id: 954, title: "Samurai Autumn", category: "anime", tags: "anime live wallpaper live video animated samurai boy male guy anime boy", type: "video", video: "images/live/anime/samurai-autumn-f86d.mp4", poster: "images/live/anime/posters/samurai-autumn-f86d.jpg", views: 0, downloads: 0 },
    { id: 955, title: "Silent Glow Butterfly Reze", category: "anime", tags: "anime live wallpaper live video animated chainsaw man neon girl female woman anime girl", type: "video", video: "images/live/anime/silent-glow-butterfly-reze-706e.mp4", poster: "images/live/anime/posters/silent-glow-butterfly-reze-706e.jpg", views: 0, downloads: 0 },
    { id: 956, title: "Cyberpunk Girl On Supercar", category: "anime", tags: "anime live wallpaper live video animated neon car girl female woman anime girl", type: "video", video: "images/live/anime/cyberpunk-girl-on-supercar-9d06.mp4", poster: "images/live/anime/posters/cyberpunk-girl-on-supercar-9d06.jpg", views: 0, downloads: 0 },
    { id: 957, title: "Elaina Blade Wandering Witch", category: "anime", tags: "anime live wallpaper live video animated samurai girl female woman anime girl", type: "video", video: "images/live/anime/elaina-blade-wandering-witch-875f.mp4", poster: "images/live/anime/posters/elaina-blade-wandering-witch-875f.jpg", views: 0, downloads: 0 },
    { id: 958, title: "Satoru Gojo Power", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-power-5867.mp4", poster: "images/live/anime/posters/satoru-gojo-power-5867.jpg", views: 0, downloads: 0 },
    { id: 959, title: "Autumn Spirit Dance", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/autumn-spirit-dance-ac3c.mp4", poster: "images/live/anime/posters/autumn-spirit-dance-ac3c.jpg", views: 0, downloads: 0 },
    { id: 960, title: "Sukunasplitsoullivewallpaper", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/sukunasplitsoullivewallpaper-e41b.mp4", poster: "images/live/anime/posters/sukunasplitsoullivewallpaper-e41b.jpg", views: 0, downloads: 0 },
    { id: 961, title: "Anime Girl Silvia S13", category: "anime", tags: "anime live wallpaper live video animated car girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-silvia-s13-db3b.mp4", poster: "images/live/anime/posters/anime-girl-silvia-s13-db3b.jpg", views: 0, downloads: 0 },
    { id: 962, title: "Aoi Todo Itadori Yuji Mahito", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/aoi-todo-itadori-yuji-mahito-4e4b.mp4", poster: "images/live/anime/posters/aoi-todo-itadori-yuji-mahito-4e4b.jpg", views: 0, downloads: 0 },
    { id: 963, title: "Anime Girl Starlit Sky Desktop", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-starlit-sky-desktop-601c.mp4", poster: "images/live/anime/posters/anime-girl-starlit-sky-desktop-601c.jpg", views: 0, downloads: 0 },
    { id: 964, title: "Naruto Uchiha Sasuke", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/naruto-uchiha-sasuke-a8b3.mp4", poster: "images/live/anime/posters/naruto-uchiha-sasuke-a8b3.jpg", views: 0, downloads: 0 },
    { id: 965, title: "Son Goku Ultra Power", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/son-goku-ultra-power-6cd6.mp4", poster: "images/live/anime/posters/son-goku-ultra-power-6cd6.jpg", views: 0, downloads: 0 },
    { id: 966, title: "Mystic Enchantress Black Cat", category: "anime", tags: "anime live wallpaper live video animated cat girl female woman anime girl", type: "video", video: "images/live/anime/mystic-enchantress-black-cat-ec44.mp4", poster: "images/live/anime/posters/mystic-enchantress-black-cat-ec44.jpg", views: 0, downloads: 0 },
    { id: 967, title: "Yuta Okkotsu Silent Bloom", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-okkotsu-silent-bloom-be51.mp4", poster: "images/live/anime/posters/yuta-okkotsu-silent-bloom-be51.jpg", views: 0, downloads: 0 },
    { id: 968, title: "Houshou Marine The Pirate Captains Secret Chamber", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/houshou-marine-the-pirate-captains-secret-chamber-bae2.mp4", poster: "images/live/anime/posters/houshou-marine-the-pirate-captains-secret-chamber-bae2.jpg", views: 0, downloads: 0 },
    { id: 969, title: "Mask Samurai Girl", category: "anime", tags: "anime live wallpaper live video animated samurai girl female woman anime girl boy male guy anime boy", type: "video", video: "images/live/anime/mask-samurai-girl-cb78.mp4", poster: "images/live/anime/posters/mask-samurai-girl-cb78.jpg", views: 0, downloads: 0 },
    { id: 970, title: "Mahito Jujutsu", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/mahito-jujutsu-812a.mp4", poster: "images/live/anime/posters/mahito-jujutsu-812a.jpg", views: 0, downloads: 0 },
    { id: 971, title: "Ayanami Rei", category: "anime", tags: "anime live wallpaper live video animated evangelion girl female woman anime girl", type: "video", video: "images/live/anime/ayanami-rei-f093.mp4", poster: "images/live/anime/posters/ayanami-rei-f093.jpg", views: 0, downloads: 0 },
    { id: 972, title: "2B Blindfold Nier Automata", category: "anime", tags: "anime live wallpaper live video animated nier automata girl female woman anime girl", type: "video", video: "images/live/anime/2b-blindfold-nier-automata-1f58.mp4", poster: "images/live/anime/posters/2b-blindfold-nier-automata-1f58.jpg", views: 0, downloads: 0 },
    { id: 973, title: "Rainy Cafe Reflection", category: "anime", tags: "anime live wallpaper live video animated cozy rain", type: "video", video: "images/live/anime/rainy-cafe-reflection-e332.mp4", poster: "images/live/anime/posters/rainy-cafe-reflection-e332.jpg", views: 0, downloads: 0 },
    { id: 974, title: "Straw Hat Itachi Akatsuki", category: "anime", tags: "anime live wallpaper live video animated naruto one piece boy male guy anime boy", type: "video", video: "images/live/anime/straw-hat-itachi-akatsuki-c079.mp4", poster: "images/live/anime/posters/straw-hat-itachi-akatsuki-c079.jpg", views: 0, downloads: 0 },
    { id: 975, title: "Anime Paris Dream Eiffel Tower Spring", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/anime-paris-dream-eiffel-tower-spring-09a3.mp4", poster: "images/live/anime/posters/anime-paris-dream-eiffel-tower-spring-09a3.jpg", views: 0, downloads: 0 },
    { id: 976, title: "Shiroko Sunaookami Blue Archive", category: "anime", tags: "anime live wallpaper live video animated blue archive girl female woman anime girl", type: "video", video: "images/live/anime/shiroko-sunaookami-blue-archive-d69a.mp4", poster: "images/live/anime/posters/shiroko-sunaookami-blue-archive-d69a.jpg", views: 0, downloads: 0 },
    { id: 977, title: "Crimson Shadow Assassin", category: "anime", tags: "anime live wallpaper live video animated dark", type: "video", video: "images/live/anime/crimson-shadow-assassin-1406.mp4", poster: "images/live/anime/posters/crimson-shadow-assassin-1406.jpg", views: 0, downloads: 0 },
    { id: 978, title: "Shadow King Sung Jin Woo", category: "anime", tags: "anime live wallpaper live video animated dark", type: "video", video: "images/live/anime/shadow-king-sung-jin-woo-674f.mp4", poster: "images/live/anime/posters/shadow-king-sung-jin-woo-674f.jpg", views: 0, downloads: 0 },
    { id: 979, title: "Jujutsu Kaisen Season 2 Vague Reason Nanami", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen", type: "video", video: "images/live/anime/jujutsu-kaisen-season-2-vague-reason-nanami-8170.mp4", poster: "images/live/anime/posters/jujutsu-kaisen-season-2-vague-reason-nanami-8170.jpg", views: 0, downloads: 0 },
    { id: 980, title: "Sasuke Uchiha Sakura", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/sasuke-uchiha-sakura-b537.mp4", poster: "images/live/anime/posters/sasuke-uchiha-sakura-b537.jpg", views: 0, downloads: 0 },
    { id: 981, title: "Levi Ackerman 2", category: "anime", tags: "anime live wallpaper live video animated attack on titan boy male guy anime boy", type: "video", video: "images/live/anime/levi-ackerman-2-4264.mp4", poster: "images/live/anime/posters/levi-ackerman-2-4264.jpg", views: 0, downloads: 0 },
    { id: 982, title: "Red Eye Girl", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/red-eye-girl-fc14.mp4", poster: "images/live/anime/posters/red-eye-girl-fc14.jpg", views: 0, downloads: 0 },
    { id: 983, title: "Reze Warm Smile", category: "anime", tags: "anime live wallpaper live video animated chainsaw man girl female woman anime girl", type: "video", video: "images/live/anime/reze-warm-smile-9f09.mp4", poster: "images/live/anime/posters/reze-warm-smile-9f09.jpg", views: 0, downloads: 0 },
    { id: 984, title: "Goddess Hana", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/goddess-hana-6ac7.mp4", poster: "images/live/anime/posters/goddess-hana-6ac7.jpg", views: 0, downloads: 0 },
    { id: 985, title: "Phoebe Cozy Bedroom", category: "anime", tags: "anime live wallpaper live video animated wuthering waves cozy girl female woman anime girl", type: "video", video: "images/live/anime/phoebe-cozy-bedroom-e72c.mp4", poster: "images/live/anime/posters/phoebe-cozy-bedroom-e72c.jpg", views: 0, downloads: 0 },
    { id: 986, title: "Levi Facing The Titan", category: "anime", tags: "anime live wallpaper live video animated attack on titan boy male guy anime boy", type: "video", video: "images/live/anime/levi-facing-the-titan-2dcf.mp4", poster: "images/live/anime/posters/levi-facing-the-titan-2dcf.jpg", views: 0, downloads: 0 },
    { id: 987, title: "Itachi Uchiha Collage", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/itachi-uchiha-collage-bb11.mp4", poster: "images/live/anime/posters/itachi-uchiha-collage-bb11.jpg", views: 0, downloads: 0 },
    { id: 988, title: "Naruto Dynamic Energy", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/naruto-dynamic-energy-8eff.mp4", poster: "images/live/anime/posters/naruto-dynamic-energy-8eff.jpg", views: 0, downloads: 0 },
    { id: 989, title: "Gear 5 Luffy Vs Lucci", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/gear-5-luffy-vs-lucci-f2f3.mp4", poster: "images/live/anime/posters/gear-5-luffy-vs-lucci-f2f3.jpg", views: 0, downloads: 0 },
    { id: 990, title: "Dream Chaser Black And White", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/dream-chaser-black-and-white-846d.mp4", poster: "images/live/anime/posters/dream-chaser-black-and-white-846d.jpg", views: 0, downloads: 0 },
    { id: 991, title: "Luffy Under The Moonlight One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece moon boy male guy anime boy", type: "video", video: "images/live/anime/luffy-under-the-moonlight-one-piece-cedb.mp4", poster: "images/live/anime/posters/luffy-under-the-moonlight-one-piece-cedb.jpg", views: 0, downloads: 0 },
    { id: 992, title: "Claude Chan", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/claude-chan-3258.mp4", poster: "images/live/anime/posters/claude-chan-3258.jpg", views: 0, downloads: 0 },
    { id: 993, title: "Anime Girl Mazda RX-7", category: "anime", tags: "anime live wallpaper live video animated car girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-mazda-rx-7-b42c.mp4", poster: "images/live/anime/posters/anime-girl-mazda-rx-7-b42c.jpg", views: 0, downloads: 0 },
    { id: 994, title: "Gear 5 Technique", category: "anime", tags: "anime live wallpaper live video animated one piece", type: "video", video: "images/live/anime/gear-5-technique-fcaf.mp4", poster: "images/live/anime/posters/gear-5-technique-fcaf.jpg", views: 0, downloads: 0 },
    { id: 995, title: "Super Saiyan Silver Goku", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/super-saiyan-silver-goku-516e.mp4", poster: "images/live/anime/posters/super-saiyan-silver-goku-516e.jpg", views: 0, downloads: 0 },
    { id: 996, title: "Anime Girl Playing Guitar", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-playing-guitar-01ae.mp4", poster: "images/live/anime/posters/anime-girl-playing-guitar-01ae.jpg", views: 0, downloads: 0 },
    { id: 997, title: "Miyabi Looking Up At The Gray Sky Zenless Zone Zero", category: "anime", tags: "anime live wallpaper live video animated zenless zone zero girl female woman anime girl", type: "video", video: "images/live/anime/miyabi-looking-up-at-the-gray-sky-zenless-zone-zero-b389.mp4", poster: "images/live/anime/posters/miyabi-looking-up-at-the-gray-sky-zenless-zone-zero-b389.jpg", views: 0, downloads: 0 },
    { id: 998, title: "Dragon Ball Fiery Goku Dragon Aura", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/dragon-ball-fiery-goku-dragon-aura-f43d.mp4", poster: "images/live/anime/posters/dragon-ball-fiery-goku-dragon-aura-f43d.jpg", views: 0, downloads: 0 },
    { id: 999, title: "Demon Slayer Zenitsu", category: "anime", tags: "anime live wallpaper live video animated demon slayer dark boy male guy anime boy", type: "video", video: "images/live/anime/demon-slayer-zenitsu-75c3.mp4", poster: "images/live/anime/posters/demon-slayer-zenitsu-75c3.jpg", views: 0, downloads: 0 },
    { id: 1000, title: "Osaragi Circular Saw Sakamoto Days", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/osaragi-circular-saw-sakamoto-days-0f5b.mp4", poster: "images/live/anime/posters/osaragi-circular-saw-sakamoto-days-0f5b.jpg", views: 0, downloads: 0 },
    { id: 1001, title: "Ryomen Sukuna Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/ryomen-sukuna-jujutsu-kaisen-78d5.mp4", poster: "images/live/anime/posters/ryomen-sukuna-jujutsu-kaisen-78d5.jpg", views: 0, downloads: 0 },
    { id: 1002, title: "Cyber Mecha Crimson", category: "anime", tags: "anime live wallpaper live video animated neon", type: "video", video: "images/live/anime/cyber-mecha-crimson-e257.mp4", poster: "images/live/anime/posters/cyber-mecha-crimson-e257.jpg", views: 0, downloads: 0 },
    { id: 1003, title: "Monkey D Luffy Summer Float", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/monkey-d-luffy-summer-float-c752.mp4", poster: "images/live/anime/posters/monkey-d-luffy-summer-float-c752.jpg", views: 0, downloads: 0 },
    { id: 1004, title: "Against All Odds Attack On Titan", category: "anime", tags: "anime live wallpaper live video animated attack on titan", type: "video", video: "images/live/anime/against-all-odds-attack-on-titan-bcc5.mp4", poster: "images/live/anime/posters/against-all-odds-attack-on-titan-bcc5.jpg", views: 0, downloads: 0 },
    { id: 1005, title: "Anime Girl Twilight Meadow", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/anime-girl-twilight-meadow-be42.mp4", poster: "images/live/anime/posters/anime-girl-twilight-meadow-be42.jpg", views: 0, downloads: 0 },
    { id: 1006, title: "Satsuki Kiryuin Kill La Kill", category: "anime", tags: "anime live wallpaper live video animated kill la kill girl female woman anime girl", type: "video", video: "images/live/anime/satsuki-kiryuin-kill-la-kill-cf5f.mp4", poster: "images/live/anime/posters/satsuki-kiryuin-kill-la-kill-cf5f.jpg", views: 0, downloads: 0 },
    { id: 1007, title: "Super Saiyan Black And Rose", category: "anime", tags: "anime live wallpaper live video animated dragon ball", type: "video", video: "images/live/anime/super-saiyan-black-and-rose-30b1.mp4", poster: "images/live/anime/posters/super-saiyan-black-and-rose-30b1.jpg", views: 0, downloads: 0 },
    { id: 1008, title: "Suguru Geto JJK", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/suguru-geto-jjk-8fd3.mp4", poster: "images/live/anime/posters/suguru-geto-jjk-8fd3.jpg", views: 0, downloads: 0 },
    { id: 1009, title: "Kakashis Hidden Identity", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/kakashis-hidden-identity-4a0f.mp4", poster: "images/live/anime/posters/kakashis-hidden-identity-4a0f.jpg", views: 0, downloads: 0 },
    { id: 1010, title: "Gojo Satoru Six Eyes Jujutsu Kaisen", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-six-eyes-jujutsu-kaisen-5a3d.mp4", poster: "images/live/anime/posters/gojo-satoru-six-eyes-jujutsu-kaisen-5a3d.jpg", views: 0, downloads: 0 },
    { id: 1011, title: "Tattooed Luffy Warrior Of The New Era", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/tattooed-luffy-warrior-of-the-new-era-c236.mp4", poster: "images/live/anime/posters/tattooed-luffy-warrior-of-the-new-era-c236.jpg", views: 0, downloads: 0 },
    { id: 1012, title: "Chibi Zoro Quiet Standoff", category: "anime", tags: "anime live wallpaper live video animated one piece boy male guy anime boy", type: "video", video: "images/live/anime/chibi-zoro-quiet-standoff-8df7.mp4", poster: "images/live/anime/posters/chibi-zoro-quiet-standoff-8df7.jpg", views: 0, downloads: 0 },
    { id: 1013, title: "Yuta And Rika", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuta-and-rika-03c4.mp4", poster: "images/live/anime/posters/yuta-and-rika-03c4.jpg", views: 0, downloads: 0 },
    { id: 1014, title: "Naruto Rainy Street Cyberpunk", category: "anime", tags: "anime live wallpaper live video animated naruto rain neon city boy male guy anime boy", type: "video", video: "images/live/anime/naruto-rainy-street-cyberpunk-2d14.mp4", poster: "images/live/anime/posters/naruto-rainy-street-cyberpunk-2d14.jpg", views: 0, downloads: 0 },
    { id: 1015, title: "One Piece", category: "anime", tags: "anime live wallpaper live video animated one piece", type: "video", video: "images/live/anime/one-piece-b7b3.mp4", poster: "images/live/anime/posters/one-piece-b7b3.jpg", views: 0, downloads: 0 },
    { id: 1016, title: "David X Lucy Neon Afterglow", category: "anime", tags: "anime live wallpaper live video animated neon", type: "video", video: "images/live/anime/david-x-lucy-neon-afterglow-273b.mp4", poster: "images/live/anime/posters/david-x-lucy-neon-afterglow-273b.jpg", views: 0, downloads: 0 },
    { id: 1017, title: "One Piece Brook Souls Voyage", category: "anime", tags: "anime live wallpaper live video animated one piece", type: "video", video: "images/live/anime/one-piece-brook-souls-voyage-fd3c.mp4", poster: "images/live/anime/posters/one-piece-brook-souls-voyage-fd3c.jpg", views: 0, downloads: 0 },
    { id: 1018, title: "Ninja Stars Naruto", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/ninja-stars-naruto-0fa6.mp4", poster: "images/live/anime/posters/ninja-stars-naruto-0fa6.jpg", views: 0, downloads: 0 },
    { id: 1019, title: "Berserker Dark Armor", category: "anime", tags: "anime live wallpaper live video animated berserk dark", type: "video", video: "images/live/anime/berserker-dark-armor-cefd.mp4", poster: "images/live/anime/posters/berserker-dark-armor-cefd.jpg", views: 0, downloads: 0 },
    { id: 1020, title: "Girl Behind Curtains", category: "anime", tags: "anime live wallpaper live video animated girl female woman anime girl", type: "video", video: "images/live/anime/girl-behind-curtains-88fb.mp4", poster: "images/live/anime/posters/girl-behind-curtains-88fb.jpg", views: 0, downloads: 0 },
    { id: 1021, title: "The Samurais Crimson Resolve", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/the-samurais-crimson-resolve-057d.mp4", poster: "images/live/anime/posters/the-samurais-crimson-resolve-057d.jpg", views: 0, downloads: 0 },
    { id: 1022, title: "Yuji Itadori Rage", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/yuji-itadori-rage-3a85.mp4", poster: "images/live/anime/posters/yuji-itadori-rage-3a85.jpg", views: 0, downloads: 0 },
    { id: 1023, title: "Gojo Satoru Jujutsu Kaisen 2", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/gojo-satoru-jujutsu-kaisen-2-2954.mp4", poster: "images/live/anime/posters/gojo-satoru-jujutsu-kaisen-2-2954.jpg", views: 0, downloads: 0 },
    { id: 1024, title: "Naruto Pikachu", category: "anime", tags: "anime live wallpaper live video animated naruto pokemon boy male guy anime boy", type: "video", video: "images/live/anime/naruto-pikachu-6eee.mp4", poster: "images/live/anime/posters/naruto-pikachu-6eee.jpg", views: 0, downloads: 0 },
    { id: 1025, title: "Kakashi Hatake", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/kakashi-hatake-6cbe.mp4", poster: "images/live/anime/posters/kakashi-hatake-6cbe.jpg", views: 0, downloads: 0 },
    { id: 1026, title: "Anime Skyline R34 Neon City", category: "anime", tags: "anime live wallpaper live video animated neon car city", type: "video", video: "images/live/anime/anime-skyline-r34-neon-city-4d44.mp4", poster: "images/live/anime/posters/anime-skyline-r34-neon-city-4d44.jpg", views: 0, downloads: 0 },
    { id: 1027, title: "Hayase Yuuka Blue Archive", category: "anime", tags: "anime live wallpaper live video animated blue archive girl female woman anime girl", type: "video", video: "images/live/anime/hayase-yuuka-blue-archive-799a.mp4", poster: "images/live/anime/posters/hayase-yuuka-blue-archive-799a.jpg", views: 0, downloads: 0 },
    { id: 1028, title: "Naruto", category: "anime", tags: "anime live wallpaper live video animated naruto boy male guy anime boy", type: "video", video: "images/live/anime/naruto-437a.mp4", poster: "images/live/anime/posters/naruto-437a.jpg", views: 0, downloads: 0 },
    { id: 1029, title: "Anime Legends Unite Goku Luffy Naruto In Battle", category: "anime", tags: "anime live wallpaper live video animated naruto one piece dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/anime-legends-unite-goku-luffy-naruto-in-battle-7cf5.mp4", poster: "images/live/anime/posters/anime-legends-unite-goku-luffy-naruto-in-battle-7cf5.jpg", views: 0, downloads: 0 },
    { id: 1030, title: "Sunset Cruise Boat Ride", category: "anime", tags: "anime live wallpaper live video animated sunset", type: "video", video: "images/live/anime/sunset-cruise-boat-ride-37d4.mp4", poster: "images/live/anime/posters/sunset-cruise-boat-ride-37d4.jpg", views: 0, downloads: 0 },
    { id: 1031, title: "Goku Jiren And Frieza", category: "anime", tags: "anime live wallpaper live video animated dragon ball boy male guy anime boy", type: "video", video: "images/live/anime/goku-jiren-and-frieza-95f4.mp4", poster: "images/live/anime/posters/goku-jiren-and-frieza-95f4.jpg", views: 0, downloads: 0 },
    { id: 1032, title: "Neko Anime Girl Streamer", category: "anime", tags: "anime live wallpaper live video animated girl cat female woman anime girl", type: "video", video: "images/live/anime/neko-anime-girl-streamer-9cd1.mp4", poster: "images/live/anime/posters/neko-anime-girl-streamer-9cd1.jpg", views: 0, downloads: 0 },
    { id: 1033, title: "Retro Beats Rubber Ducks", category: "anime", tags: "anime live wallpaper live video animated", type: "video", video: "images/live/anime/retro-beats-rubber-ducks-b66b.mp4", poster: "images/live/anime/posters/retro-beats-rubber-ducks-b66b.jpg", views: 0, downloads: 0 },
    { id: 1034, title: "Jojos Bizarre Adventure Jotaro Kujo Anime", category: "anime", tags: "anime live wallpaper live video animated jojo boy male guy anime boy", type: "video", video: "images/live/anime/jojos-bizarre-adventure-jotaro-kujo-anime-b6aa.mp4", poster: "images/live/anime/posters/jojos-bizarre-adventure-jotaro-kujo-anime-b6aa.jpg", views: 0, downloads: 0 },
    { id: 1035, title: "Satoru Gojo Vs Mahoraga", category: "anime", tags: "anime live wallpaper live video animated jujutsu kaisen boy male guy anime boy", type: "video", video: "images/live/anime/satoru-gojo-vs-mahoraga-7825.mp4", poster: "images/live/anime/posters/satoru-gojo-vs-mahoraga-7825.jpg", views: 0, downloads: 0 },

    // --- LIVE wallpapers: drawn in real time by live.js (no image files needed) ---
    { id: 101, title: "Aurora Borealis", category: "live", type: "live", engine: "aurora", views: 41200, downloads: 9800 },
    { id: 102, title: "Warp Speed", category: "live", type: "live", engine: "warp", views: 38900, downloads: 9100 },
    { id: 103, title: "Matrix Rain", category: "live", type: "live", engine: "matrix", views: 44300, downloads: 10400 },
    { id: 104, title: "Neon Sunset", category: "live", type: "live", engine: "waves", views: 36700, downloads: 8700 },
    { id: 105, title: "Constellation", category: "live", type: "live", engine: "constellation", views: 29800, downloads: 6900 },
    { id: 106, title: "Bokeh Lights", category: "live", type: "live", engine: "bokeh", views: 27600, downloads: 6300 },
    { id: 107, title: "Lava Lamp", category: "live", type: "live", engine: "lava", views: 33100, downloads: 7600 },
    { id: 108, title: "Sakura Fall", category: "live", type: "live", engine: "sakura", views: 35400, downloads: 8200 },
    { id: 109, title: "Neon Rain City", category: "live", type: "live", engine: "rainCity", tags: "anime live rain city neon night", views: 0, downloads: 0 },
    { id: 110, title: "Firefly Forest", category: "live", type: "live", engine: "fireflies", tags: "anime live fireflies forest night", views: 0, downloads: 0 },
    { id: 111, title: "Shooting Stars", category: "live", type: "live", engine: "shootingStars", tags: "anime live shooting stars meteor night sky", views: 0, downloads: 0 },
    { id: 112, title: "Summer Clouds", category: "live", type: "live", engine: "driftClouds", tags: "anime live clouds sky summer", views: 0, downloads: 0 },
    { id: 113, title: "Snow Village", category: "live", type: "live", engine: "snowVillage", tags: "anime live snow village winter night", views: 0, downloads: 0 },
    { id: 114, title: "Sky Lanterns", category: "live", type: "live", engine: "skyLanterns", tags: "anime live lanterns festival night sky", views: 0, downloads: 0 },

    // --- VIDEO live wallpapers: drop an .mp4/.webm into /videos and add a line like this:
    // { id: 201, title: "Rainy Window", category: "live", type: "video", video: "videos/rain.mp4", poster: "videos/rain.jpg", views: 0, downloads: 0 },
    { id: 382, title: "Neon Rain Street", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-rain-neon.jpg", thumb: "images/pack/thumbs/anime-rain-neon.jpg", wide: "images/pack/anime-rain-neon-wide.jpg", wideThumb: "images/pack/thumbs/anime-rain-neon-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 383, title: "Moon Over Rooftops", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-moon-rooftops.jpg", thumb: "images/pack/thumbs/anime-moon-rooftops.jpg", wide: "images/pack/anime-moon-rooftops-wide.jpg", wideThumb: "images/pack/thumbs/anime-moon-rooftops-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 384, title: "Sakura Tunnel", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-sakura-tunnel.jpg", thumb: "images/pack/thumbs/anime-sakura-tunnel.jpg", wide: "images/pack/anime-sakura-tunnel-wide.jpg", wideThumb: "images/pack/thumbs/anime-sakura-tunnel-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 385, title: "Midnight Star Train", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-star-train.jpg", thumb: "images/pack/thumbs/anime-star-train.jpg", wide: "images/pack/anime-star-train-wide.jpg", wideThumb: "images/pack/thumbs/anime-star-train-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 386, title: "Summer Cloud Sky", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-summer-clouds.jpg", thumb: "images/pack/thumbs/anime-summer-clouds.jpg", wide: "images/pack/anime-summer-clouds-wide.jpg", wideThumb: "images/pack/thumbs/anime-summer-clouds-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 387, title: "Firefly Forest", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-firefly-forest.jpg", thumb: "images/pack/thumbs/anime-firefly-forest.jpg", wide: "images/pack/anime-firefly-forest-wide.jpg", wideThumb: "images/pack/thumbs/anime-firefly-forest-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 388, title: "Fuji Dawn", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-fuji-dawn.jpg", thumb: "images/pack/thumbs/anime-fuji-dawn.jpg", wide: "images/pack/anime-fuji-dawn-wide.jpg", wideThumb: "images/pack/thumbs/anime-fuji-dawn-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 389, title: "Snow Village Night", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-snow-village.jpg", thumb: "images/pack/thumbs/anime-snow-village.jpg", wide: "images/pack/anime-snow-village-wide.jpg", wideThumb: "images/pack/thumbs/anime-snow-village-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 390, title: "Cyber Alley", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-cyber-alley.jpg", thumb: "images/pack/thumbs/anime-cyber-alley.jpg", wide: "images/pack/anime-cyber-alley-wide.jpg", wideThumb: "images/pack/thumbs/anime-cyber-alley-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 391, title: "Golden Hour Sky", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-golden-clouds.jpg", thumb: "images/pack/thumbs/anime-golden-clouds.jpg", wide: "images/pack/anime-golden-clouds-wide.jpg", wideThumb: "images/pack/thumbs/anime-golden-clouds-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 392, title: "Hidden Village Dusk", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-hidden-village.jpg", thumb: "images/pack/thumbs/anime-hidden-village.jpg", wide: "images/pack/anime-hidden-village-wide.jpg", wideThumb: "images/pack/thumbs/anime-hidden-village-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 393, title: "Sunset Sea Voyage", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-sea-voyage.jpg", thumb: "images/pack/thumbs/anime-sea-voyage.jpg", wide: "images/pack/anime-sea-voyage-wide.jpg", wideThumb: "images/pack/thumbs/anime-sea-voyage-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 394, title: "Floating Isles", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-floating-isles.jpg", thumb: "images/pack/thumbs/anime-floating-isles.jpg", wide: "images/pack/anime-floating-isles-wide.jpg", wideThumb: "images/pack/thumbs/anime-floating-isles-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 395, title: "Rooftop at Dusk", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-rooftop-dusk.jpg", thumb: "images/pack/thumbs/anime-rooftop-dusk.jpg", wide: "images/pack/anime-rooftop-dusk-wide.jpg", wideThumb: "images/pack/thumbs/anime-rooftop-dusk-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 396, title: "Crossing at Sunset", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-crossing-sunset.jpg", thumb: "images/pack/thumbs/anime-crossing-sunset.jpg", wide: "images/pack/anime-crossing-sunset-wide.jpg", wideThumb: "images/pack/thumbs/anime-crossing-sunset-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 397, title: "River of Lanterns", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-river-lanterns.jpg", thumb: "images/pack/thumbs/anime-river-lanterns.jpg", wide: "images/pack/anime-river-lanterns-wide.jpg", wideThumb: "images/pack/thumbs/anime-river-lanterns-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 398, title: "Lone Tree Night", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-lone-tree.jpg", thumb: "images/pack/thumbs/anime-lone-tree.jpg", wide: "images/pack/anime-lone-tree-wide.jpg", wideThumb: "images/pack/thumbs/anime-lone-tree-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 399, title: "Aurora Ice Castle", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-ice-castle.jpg", thumb: "images/pack/thumbs/anime-ice-castle.jpg", wide: "images/pack/anime-ice-castle-wide.jpg", wideThumb: "images/pack/thumbs/anime-ice-castle-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 400, title: "Twilight Lighthouse", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-lighthouse.jpg", thumb: "images/pack/thumbs/anime-lighthouse.jpg", wide: "images/pack/anime-lighthouse-wide.jpg", wideThumb: "images/pack/thumbs/anime-lighthouse-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 401, title: "Blossom Bridge", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-blossom-bridge.jpg", thumb: "images/pack/thumbs/anime-blossom-bridge.jpg", wide: "images/pack/anime-blossom-bridge-wide.jpg", wideThumb: "images/pack/thumbs/anime-blossom-bridge-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 402, title: "Umbrella in the Rain", category: "anime", tags: "anime character girl boy silhouette manga illustration", image: "images/pack/char-rain-umbrella.jpg", thumb: "images/pack/thumbs/char-rain-umbrella.jpg", wide: "images/pack/char-rain-umbrella-wide.jpg", wideThumb: "images/pack/thumbs/char-rain-umbrella-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 403, title: "Rooftop Scarf", category: "anime", tags: "anime character girl boy silhouette manga illustration", image: "images/pack/char-rooftop-scarf.jpg", thumb: "images/pack/thumbs/char-rooftop-scarf.jpg", wide: "images/pack/char-rooftop-scarf-wide.jpg", wideThumb: "images/pack/thumbs/char-rooftop-scarf-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 404, title: "Lantern Girl", category: "anime", tags: "anime character girl boy silhouette manga illustration", image: "images/pack/char-sakura-lantern.jpg", thumb: "images/pack/thumbs/char-sakura-lantern.jpg", wide: "images/pack/char-sakura-lantern-wide.jpg", wideThumb: "images/pack/thumbs/char-sakura-lantern-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 405, title: "Moonlit Wanderer", category: "anime", tags: "anime character girl boy silhouette manga illustration", image: "images/pack/char-wanderer-moon.jpg", thumb: "images/pack/thumbs/char-wanderer-moon.jpg", wide: "images/pack/char-wanderer-moon-wide.jpg", wideThumb: "images/pack/thumbs/char-wanderer-moon-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 406, title: "Stargazers", category: "anime", tags: "anime character girl boy silhouette manga illustration", image: "images/pack/char-stargazers.jpg", thumb: "images/pack/thumbs/char-stargazers.jpg", wide: "images/pack/char-stargazers-wide.jpg", wideThumb: "images/pack/thumbs/char-stargazers-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 407, title: "Waiting at the Crossing", category: "anime", tags: "anime character girl boy silhouette manga illustration", image: "images/pack/char-crossing-girl.jpg", thumb: "images/pack/thumbs/char-crossing-girl.jpg", wide: "images/pack/char-crossing-girl-wide.jpg", wideThumb: "images/pack/thumbs/char-crossing-girl-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
];

// ===== State Management =====
let currentFilter = 'all';
let currentQuery = '';
let currentPage = 1;
const itemsPerPage = 12;
// Pick the smallest preset that is at least as sharp as the visitor's own screen (like HD Wallpapers / WallpaperStock do)
function recommendedResolution() {
    const dpr = window.devicePixelRatio || 1;
    const long = Math.max(screen.width, screen.height) * dpr;
    const order = ['hd', '2k', '4k'];
    for (const k of order) if (Math.max(...RESOLUTIONS[k]) >= long * 0.98) return k;
    return '4k';
}
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
const scrollSentinel = document.getElementById('scrollSentinel');
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
const modalDownloads = document.getElementById('modalDownloads');
const liveNote = document.getElementById('liveNote');
const downloadLabel = document.getElementById('downloadLabel');
const resolutionBtns = document.querySelectorAll('.resolution-btn');
const deviceBtns = document.querySelectorAll('.device-btn');
const downloadBtn = document.getElementById('downloadBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const customizeBtn = document.getElementById('customizeBtn');
const userBtn = document.getElementById('userBtn');
const userModal = document.getElementById('userModal');
const userModalOverlay = document.getElementById('userModalOverlay');
const userModalClose = document.getElementById('userModalClose');

// ===== Helpers =====
const RESOLUTIONS = { hd: [1920, 1080], '2k': [2560, 1440], '4k': [3840, 2160], '8k': [7680, 4320] };
// One picture, five screen shapes (like the matched "sets" on popular wallpaper hubs)
const SHAPES = {
    phone:     { label: 'Phone',     ar: 9 / 19.5, portrait: true },
    tablet:    { label: 'Tablet',    ar: 3 / 4,    portrait: true },
    laptop:    { label: 'Laptop',    ar: 16 / 10 },
    desktop:   { label: 'Desktop',   ar: 16 / 9 },
    ultrawide: { label: 'Ultrawide', ar: 21 / 9 }
};
const isPortraitDevice = d => !!(SHAPES[d] && SHAPES[d].portrait);
// Pixel size for a screen ratio at a quality level: landscape = width HD/2K/4K/8K, portrait = width 1080/1440/2160/4320
function sizeForRatio(r, resKey) {
    const [L, S] = RESOLUTIONS[resKey] || RESOLUTIONS['4k'];
    return r >= 1 ? [L, Math.round(L / r)] : [S, Math.round(S / r)];
}
const sizeFor = (device, resKey) => sizeForRatio((SHAPES[device] || SHAPES.desktop).ar, resKey);
function defaultShape() {
    if (viewMode === 'phone') return 'phone';
    const r = screen.width / screen.height;
    return r >= 2.1 ? 'ultrawide' : r >= 1.7 ? 'desktop' : 'laptop';
}
const typeOf = w => w.type || 'image';
// our own pack ships a 16:9 version too; use it for landscape screens
const pickSrc = (w, portrait) => (!portrait && w.wide) ? w.wide : w.image;
const pickThumb = (w, portrait) => (!portrait && w.wideThumb) ? w.wideThumb : w.thumb;

// Unsplash lets us ask for an exact crop/size, so thumbnails are small and downloads are real resolutions.
function imgUrl(url, w, h) {
    if (!/images\.unsplash\.com/.test(url)) return url;
    return `${url.split('?')[0]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = safeGet('theme') || 'dark';
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
    link.addEventListener('click', () => {
        if (link.tagName === 'A') setMenu(false);
    });
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

// ===== Search Functionality (engine in search.js) =====
WHSearch.setCorpus(wallpapers);
const RECENT_KEY = 'recentSearches';
const getRecent = () => { try { return JSON.parse(safeGet(RECENT_KEY) || '[]'); } catch (e) { return []; } };
function saveRecent(q) {
    q = q.trim(); if (!q) return;
    safeSet(RECENT_KEY, JSON.stringify([q, ...getRecent().filter(x => x !== q)].slice(0, 6)));
}
const escapeHtml = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let sugIndex = -1, searchTimer;

function renderSuggestions(value) {
    const v = value.trim();
    let rows;
    if (!v) {
        const recent = getRecent();
        rows = [...recent.map(t => ({ text: t, icon: 'fa-clock-rotate-left' })),
                ...WHSearch.popular.filter(p => !recent.includes(p)).slice(0, 8).map(t => ({ text: t, icon: 'fa-fire' }))].slice(0, 10);
    } else {
        rows = WHSearch.suggest(wallpapers, v, 7).map(r => ({ text: r.text, count: r.count, icon: r.kind === 'fix' ? 'fa-wand-magic-sparkles' : 'fa-magnifying-glass' }));
    }
    sugIndex = -1;
    if (!rows.length) { searchSuggestions.classList.remove('active'); return; }
    searchSuggestions.innerHTML = (v ? '' : '<div class="suggestion-head">Recent and popular searches</div>') +
        rows.map(r => `<div class="suggestion-item" role="option" data-q="${escapeHtml(r.text)}"><i class="fas ${r.icon}"></i><span>${escapeHtml(r.text)}</span>${r.count != null ? `<small>${r.count}</small>` : ''}</div>`).join('');
    searchSuggestions.classList.add('active');
}
function moveSuggestion(dir) {
    const items = [...searchSuggestions.querySelectorAll('.suggestion-item')];
    if (!items.length) return;
    sugIndex = (sugIndex + dir + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle('selected', i === sugIndex));
    searchInput.value = items[sugIndex].dataset.q;
}
searchSuggestions.addEventListener('mousedown', e => e.preventDefault());   // keep focus in the box
searchSuggestions.addEventListener('click', e => {
    const it = e.target.closest('.suggestion-item');
    if (!it) return;
    searchInput.value = it.dataset.q;
    searchSuggestions.classList.remove('active');
    performSearch(it.dataset.q, { save: true });
});

searchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    renderSuggestions(value);
    clearTimeout(searchTimer);
    // results update while typing (no jumping around the page)
    searchTimer = setTimeout(() => performSearch(value, { scroll: false }), 350);
});
searchInput.addEventListener('focus', () => renderSuggestions(searchInput.value));

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) searchSuggestions.classList.remove('active');
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveSuggestion(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveSuggestion(-1); }
    else if (e.key === 'Escape') { searchSuggestions.classList.remove('active'); }
    else if (e.key === 'Enter') {
        clearTimeout(searchTimer);
        performSearch(searchInput.value, { save: true });
        searchSuggestions.classList.remove('active');
        searchInput.blur(); // closes the phone keyboard
    }
});
document.querySelector('.search-btn').addEventListener('click', () => {
    clearTimeout(searchTimer);
    performSearch(searchInput.value, { save: true });
    searchSuggestions.classList.remove('active');
});

function setActiveFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
    categoryCards.forEach(c => c.classList.toggle('active', c.dataset.category === filter));
    const active = document.querySelector('.filter-btn.active');
    if (active && active.scrollIntoView) active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}

function performSearch(query, opts = {}) {
    currentQuery = query.trim().toLowerCase();
    currentFilter = 'all';
    setActiveFilter('all');
    currentPage = 1;
    loadWallpapers();
    if (opts.save && currentQuery) saveRecent(query);
    if (currentQuery && opts.scroll !== false) document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
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
        const categoryMenu = card.closest('.nav-category-menu');
        if (categoryMenu) categoryMenu.open = false;
        if (navLinks.classList.contains('active')) setMenu(false);
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
        media = `<video class="card-video" src="${wallpaper.video}" ${wallpaper.poster ? `poster="${wallpaper.poster}"` : ''} muted loop playsinline preload="${wallpaper.poster ? 'none' : 'metadata'}"></video>`;
    } else {
        const src = pickThumb(wallpaper, portrait) || (portrait ? imgUrl(wallpaper.image, 480, 853) : imgUrl(wallpaper.image, 800, 450));
        media = `<img src="${src}" alt="${wallpaper.title}" loading="lazy" decoding="async">`;
    }

    card.innerHTML = `
        ${media}
        ${type !== 'image' ? '<span class="live-badge"><i></i>LIVE</span>' : '<span class="set-badge">SET</span>'}
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
    if (img) img.addEventListener('error', () => { card.remove(); brokenIds.add(wallpaper.id); updateCount(); });

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
let lastSearch = null;
function getFiltered() {
    const base = wallpapers.filter(w =>
        currentFilter === 'all' || (currentFilter === 'favorites' ? favorites.includes(w.id) : currentFilter === 'live' ? (w.type === 'live' || w.type === 'video' || w.category === 'live') : w.category === currentFilter)
    );
    if (!currentQuery) { lastSearch = null; return base; }
    lastSearch = WHSearch.search(base, currentQuery);   // see search.js
    return lastSearch.items;
}

// ===== Featured shelf (hand-picked; shown on "All" without a search) =====
const FEATURED_IDS = [104, 101, 375, 376, 378, 381, 353, 343, 311, 344, 108, 102];
function renderFeatured() {
    const sec = document.getElementById('featured'), row = document.getElementById('featuredRow');
    if (!sec || !row) return;
    const show = currentFilter === 'all' && !currentQuery;
    sec.hidden = !show;
    row.innerHTML = '';
    if (!show) return;
    row.classList.toggle('portrait', viewMode === 'phone');
    FEATURED_IDS.map(id => wallpapers.find(w => w.id === id)).filter(Boolean)
        .forEach(w => row.appendChild(createWallpaperCard(w)));
}

// ===== Endless scroll (no Load More button) =====
let renderedCount = 0, allLoaded = false, scrollObserver = null, padTimer;
const brokenIds = new Set();   // wallpapers whose image failed to load (never used as filler)

function gridCols() {
    const t = getComputedStyle(wallpaperGrid).gridTemplateColumns;
    return t && t !== 'none' ? t.split(' ').length : 1;
}
// whole rows per batch, so the grid never has a half-empty row while more is still coming
function pageEnd() {
    const cols = gridCols();
    return currentPage * Math.ceil(itemsPerPage / cols) * cols;
}
function removeFillers() {
    wallpaperGrid.querySelectorAll('.wallpaper-card.filler').forEach(el => {
        const p = livePlayers.get(el);
        if (p) { p.stop(); livePlayers.delete(el); if (mediaObserver) mediaObserver.unobserve(el); }
        el.remove();
    });
}
// last row only: fill the empty slots with more wallpapers from this same list
function padLastRow(filtered) {
    removeFillers();
    if (!allLoaded) return;
    const pool = filtered.filter(w => !brokenIds.has(w.id));
    const cols = gridCols();
    const rem = wallpaperGrid.querySelectorAll(':scope > .wallpaper-card').length % cols;
    if (!rem || pool.length < cols) return;
    for (let k = 0; k < cols - rem; k++) {
        const card = createWallpaperCard(pool[(k * 7) % pool.length]);
        card.classList.add('filler');
        wallpaperGrid.appendChild(card);
    }
}
function appendMore() {
    const filtered = getFiltered();
    const end = pageEnd();
    removeFillers();
    filtered.slice(renderedCount, end).forEach(w => wallpaperGrid.appendChild(createWallpaperCard(w)));
    renderedCount = Math.min(end, filtered.length);
    allLoaded = renderedCount >= filtered.length;
    padLastRow(filtered);
    watchSentinel();
}
function watchSentinel() {
    if (!scrollObserver) return;
    scrollObserver.disconnect();            // re-observing re-fires if the sentinel is still on screen
    if (!allLoaded) scrollObserver.observe(scrollSentinel);
}
let navScrolling = false, navToken = 0;   // true while a nav link (e.g. Contact) is scrolling the page
if ('IntersectionObserver' in window) {
    scrollObserver = new IntersectionObserver(entries => {
        if (navScrolling || allLoaded) return;   // never grow the page under a nav-link scroll
        // Load only while the end of the gallery is at or below the top of the screen. If it is above,
        // the visitor already scrolled past the gallery (to Contact, footer...) and more rows would just push
        // that section away again.
        if (entries.some(e => e.isIntersecting && e.boundingClientRect.top > 0)) { currentPage++; appendMore(); }
    }, { rootMargin: '900px 0px' });
}
let padResizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(padResizeTimer);
    padResizeTimer = setTimeout(() => padLastRow(getFiltered()), 200);
});

function loadWallpapers() {
    const filtered = getFiltered();
    const end = pageEnd();
    const toDisplay = filtered.slice(0, end);

    disposeCards();
    wallpaperGrid.classList.toggle('portrait', viewMode === 'phone');
    wallpaperGrid.innerHTML = '';
    renderFeatured();
    toDisplay.forEach(wallpaper => wallpaperGrid.appendChild(createWallpaperCard(wallpaper)));

    if (filtered.length === 0) {
        wallpaperGrid.innerHTML = currentFilter === 'favorites' && !currentQuery
            ? '<p class="empty-state">No favorites yet. Tap the heart on any wallpaper to save it here.</p>'
            : `<div class="empty-state"><p>${currentQuery ? `No wallpapers found for <b>“${escapeHtml(currentQuery)}”</b>.` : 'No wallpapers found.'} Check the spelling or try one of these:</p>
                <div class="empty-chips">${WHSearch.popular.slice(0, 10).map(t => `<button type="button" data-q="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('')}</div></div>`;
    }
    renderedCount = toDisplay.length;
    allLoaded = renderedCount >= filtered.length;
    padLastRow(filtered);
    watchSentinel();
    setCountText(filtered.length);
    renderSearchInfo(filtered);
}

function setCountText(n) {
    resultCount.textContent = currentQuery
        ? `${n} result${n === 1 ? '' : 's'} for “${currentQuery}”`
        : `${n} wallpaper${n === 1 ? '' : 's'}`;
}

// notes under the count: spelling fix, "closest matches", related searches, clear button
function renderSearchInfo(filtered) {
    const info = document.getElementById('searchInfo');
    if (!currentQuery || !lastSearch) { info.hidden = true; info.innerHTML = ''; return; }
    const s = lastSearch, notes = [];
    if (s.corrected.length) notes.push(`Showing results for <b>${escapeHtml(s.shown.join(' '))}</b> (you typed “${escapeHtml(currentQuery)}”).`);
    if (s.mode === 'closest') notes.push('Nothing has all of those words, so these are the closest matches.');
    if (s.mode === 'related') notes.push('No exact matches, showing related wallpapers.');
    const rel = WHSearch.related(filtered, s.tokens, 10);
    const base = s.shown.join(' ');
    info.innerHTML =
        (notes.length ? `<p class="si-note">${notes.join(' ')}</p>` : '') +
        `<div class="si-row">${rel.length ? '<span class="si-label">Related:</span>' + rel.map(t => `<button type="button" data-q="${escapeHtml(base + ' ' + t)}">${escapeHtml(t)}</button>`).join('') : ''}` +
        `<button type="button" class="si-clear" data-clear="1"><i class="fas fa-xmark"></i> Clear search</button></div>`;
    info.hidden = false;
}
document.getElementById('searchInfo').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.clear) { searchInput.value = ''; performSearch('', { scroll: false }); return; }
    searchInput.value = b.dataset.q; performSearch(b.dataset.q, { save: true, scroll: false });
});
wallpaperGrid.addEventListener('click', e => {
    const b = e.target.closest('.empty-chips button'); if (!b) return;
    searchInput.value = b.dataset.q; performSearch(b.dataset.q, { save: true });
});

function updateCount() {
    // after a broken image removed its card, keep the visible count honest
    if (!allLoaded) return;
    clearTimeout(padTimer);
    padTimer = setTimeout(() => padLastRow(getFiltered()), 120);   // cards removed -> refill the last row
    const n = wallpaperGrid.querySelectorAll('.wallpaper-card:not(.filler)').length;
    setCountText(n);
}

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
    const live = currentWallpaper && typeOf(currentWallpaper) === 'live';
    const video = currentWallpaper && typeOf(currentWallpaper) === 'video';
    resolutionBtns.forEach(btn => {
        const [w, h] = sizeFor(selectedDevice, btn.dataset.resolution);
        btn.innerHTML = `<strong>${btn.dataset.resolution.toUpperCase()}${btn.dataset.resolution === recommendedResolution() ? '<span class="res-badge">Your screen</span>' : ''}</strong><small>${w}×${h}</small>`;
        const unavailable = (live && (btn.dataset.resolution === '4k' || btn.dataset.resolution === '8k')) || video;
        btn.disabled = !!unavailable;
        btn.classList.toggle('disabled', !!unavailable);
    });
    if (live && (selectedResolution === '4k' || selectedResolution === '8k')) selectedResolution = 'hd';
    resolutionBtns.forEach(b => b.classList.toggle('active', b.dataset.resolution === selectedResolution && !b.disabled));
    liveNote.hidden = !live;
    liveNote.textContent = 'Live wallpapers download as a 10-second looping video (HD or 2K).';
    document.querySelector('.resolution-selector').hidden = !!video;
    updateSetInfo();
}

// "Downloading the Laptop version", resolution / detail / likes
function updateSetInfo() {
    const w = currentWallpaper;
    if (!w) return;
    const [tw, th] = sizeFor(selectedDevice, selectedResolution);
    document.getElementById('shapeName').textContent = SHAPES[selectedDevice].label;
    document.getElementById('statRes').textContent = `${tw}×${th}`;
    document.getElementById('statMp').textContent = `${(tw * th / 1e6).toFixed(1)} MP`;
    document.getElementById('likeCount').textContent = (w.likes || 0) + (favorites.includes(w.id) ? 1 : 0);
}

// Little preview of the picture in each screen shape + blurred backdrop behind the big preview
function renderShapeThumbs() {
    const w = currentWallpaper;
    const type = typeOf(w);
    document.querySelectorAll('.shape-row .device-btn').forEach(btn => {
        const s = SHAPES[btn.dataset.device];
        const th = btn.querySelector('.shape-thumb');
        const hgt = parseFloat(getComputedStyle(th).height) || 66;
        th.style.width = Math.round(hgt * s.ar) + 'px';
        let src = '';
        if (type === 'video' && w.poster) src = w.poster;
        else if (type === 'image') src = pickThumb(w, s.portrait) || (/images\.unsplash\.com/.test(w.image) ? `${w.image.split('?')[0]}?w=300&auto=format&q=70` : w.image);
        th.style.backgroundImage = src ? `url("${src}")` : '';
    });
    const bg = document.getElementById('stageBg');
    if (typeOf(w) === 'image') {
        const s = pickThumb(w, false) || (/images\.unsplash\.com/.test(w.image) ? `${w.image.split('?')[0]}?w=240&auto=format&q=60` : w.image);
        bg.style.backgroundImage = `url("${s}")`;
    } else bg.style.backgroundImage = (typeOf(w) === 'video' && w.poster) ? `url("${w.poster}")` : '';
}

function updateModalPreview() {
    const w = currentWallpaper;
    const portrait = isPortraitDevice(selectedDevice);
    const ar = SHAPES[selectedDevice].ar;
    const type = typeOf(w);
    modalMedia.classList.toggle('portrait', portrait);
    modalMedia.style.setProperty('--ar', ar);
    document.querySelectorAll('.shape-row .device-btn').forEach(b => b.classList.toggle('active', b.dataset.device === selectedDevice));
    modalImage.hidden = type !== 'image';
    modalCanvas.hidden = type !== 'live';
    modalVideo.hidden = type !== 'video';

    if (type === 'image') {
        const [pw, ph] = portrait ? [Math.round(1400 * ar), 1400] : [1400, Math.round(1400 / ar)];
        modalImage.src = imgUrl(pickSrc(w, portrait), pw, ph);
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
    const isImg = type === 'image';
    document.getElementById('originalBtn').hidden = !isImg;
    renderTagsAndRelated(w);
    renderShapeThumbs();
    updateSetInfo();
    prevBtn.hidden = nextBtn.hidden = getFiltered().length < 2;
}

const prevBtn = document.getElementById('prevWallpaper');
const nextBtn = document.getElementById('nextWallpaper');

// ===== Previous / next wallpaper =====
function stepWallpaper(dir) {
    const list = getFiltered();
    if (list.length < 2 || !currentWallpaper) return;
    let i = list.findIndex(w => w.id === currentWallpaper.id);
    i = (i + dir + list.length) % list.length;
    openWallpaperModal(list[i], true);
}
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); stepWallpaper(-1); });
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); stepWallpaper(1); });

let resChosenByUser = false;
function openWallpaperModal(wallpaper, keepDevice) {
    if (!resChosenByUser) selectedResolution = recommendedResolution();
    stopModalMedia();
    currentWallpaper = wallpaper;
    modalTitle.textContent = wallpaper.title;
    modalCategory.textContent = wallpaper.category.charAt(0).toUpperCase() + wallpaper.category.slice(1);
    modalDownloads.textContent = wallpaper.downloads.toLocaleString();

    // Default device to match the shape the visitor is browsing in
    if (!keepDevice) selectedDevice = defaultShape();
    deviceBtns.forEach(b => b.classList.toggle('active', b.dataset.device === selectedDevice));

    setFavoriteButton();
    customizeBtn.hidden = typeOf(wallpaper) !== 'image'; // editor works on photos; live wallpapers download as video
    updateResolutionLabels();

    wallpaperModal.classList.add('active');
    document.body.classList.add('modal-open');
    updateModalPreview();
    wallpaperModal.querySelector('.set-body').scrollTop = 0;
}

function closeWallpaperModal() {
    exitPreview();
    wallpaperModal.classList.remove('active');
    if (/^#w=/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
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

// ===== Customize (rotate / crop / adjust editor, see editor.js) =====
customizeBtn.addEventListener('click', () => {
    if (!currentWallpaper) return;
    if (typeof openEditor === 'function') {
        openEditor(currentWallpaper, { device: selectedDevice, resolution: selectedResolution });
    } else {
        showNotification('Editor did not load. Refresh the page (Ctrl+Shift+R) and try again.');
    }
});

// ===== Resolution Selection =====
resolutionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.disabled) return;
        resChosenByUser = true;
        resolutionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedResolution = btn.dataset.resolution;
        updateSetInfo();
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
    const device = quick ? (viewMode === 'phone' ? 'phone' : 'desktop') : selectedDevice;
    const resKey = quick && type === 'live' ? 'hd' : selectedResolution;
    const [w, h] = sizeFor(device, resKey);
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
        const own = !/images\.unsplash\.com/.test(wallpaper.image);
        if (type === 'image' && own) {
            // Our own images: crop/resize to the chosen device + resolution in the browser
            try {
                const out = await renderLocalImage(pickSrc(wallpaper, h > w), w, h);
                saveBlob(out.blob, `${slug(wallpaper.title)}_${out.w}x${out.h}.jpg`);
                bumpDownloads(wallpaper);
                return;
            } catch (e) { /* fall through to a plain download of the original file */ }
        }
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

// Draw one of our own images to an exact size (cover-fit), capped so phones do not run out of memory
async function renderLocalImage(src, w, h, opts = {}) {
    const img = await new Promise((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = rej; i.src = src; });
    const coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
    const maxPx = coarse ? 16e6 : 40e6;
    if (w * h > maxPx) { const k = Math.sqrt(maxPx / (w * h)); w = Math.round(w * k); h = Math.round(h * k); }
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d'); g.imageSmoothingQuality = 'high';
    const nw = img.naturalWidth, nh = img.naturalHeight;
    const cover = (sx, sy, sw, sh) => g.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    if (opts.mode === 'fit') {
        // soft blurred copy of the picture behind the whole picture
        const t = document.createElement('canvas'); t.width = Math.max(8, Math.round(w / 48)); t.height = Math.max(8, Math.round(h / 48));
        const tg = t.getContext('2d'); tg.imageSmoothingQuality = 'high';
        const k = Math.max(t.width / nw, t.height / nh);
        tg.drawImage(img, (t.width - nw * k) / 2, (t.height - nh * k) / 2, nw * k, nh * k);
        g.drawImage(t, 0, 0, w, h);
        g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, 0, w, h);
        const s = Math.min(w / nw, h / nh);
        g.drawImage(img, (w - nw * s) / 2, (h - nh * s) / 2, nw * s, nh * s);
    } else if (opts.rect) {
        const r = opts.rect;
        cover(r.u0 * nw, r.v0 * nh, Math.max(1, (r.u1 - r.u0) * nw), Math.max(1, (r.v1 - r.v0) * nh));
    } else {
        const ar = w / h;
        let sw = nw, sh = nw / ar;
        if (sh > nh) { sh = nh; sw = nh * ar; }
        cover((nw - sw) / 2, (nh - sh) / 2, sw, sh);
    }
    const blob = await new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('encode')), 'image/jpeg', 0.92));
    return { blob, w, h };
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
    if (currentFilter === 'favorites') loadWallpapers();
}

function setFavoriteButton() {
    const on = currentWallpaper && favorites.includes(currentWallpaper.id);
    favoriteBtn.classList.toggle('active', !!on);
    favoriteBtn.querySelector('i').className = on ? 'fas fa-heart' : 'far fa-heart';
    updateSetInfo();
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
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && wallpaperModal.classList.contains('active') && !document.body.classList.contains('editor-open') && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        stepWallpaper(e.key === 'ArrowLeft' ? -1 : 1);
        return;
    }
    if (e.key === 'Escape') {
        if (document.body.classList.contains('editor-open')) return; // the editor closes itself
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
// Resolves once the page has stopped moving (or after ~3 s at most).
function waitForScrollEnd(done) {
    let last = -1, still = 0, ticks = 0;
    (function check() {
        const y = window.scrollY;
        still = Math.abs(y - last) < 1 ? still + 1 : 0;
        last = y;
        ticks++;
        if ((ticks > 8 && still >= 6) || ticks > 180) return done();
        requestAnimationFrame(check);
    })();
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length < 2) { e.preventDefault(); return; }
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            if (target.matches('.nav-category-menu')) target.open = true;
            // Endless scroll would keep adding rows while we pass the gallery, so Contact kept moving away.
            // Pause it for the trip, then snap to the exact spot and resume.
            const token = ++navToken;
            navScrolling = true;
            if (scrollObserver) scrollObserver.disconnect();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            waitForScrollEnd(() => {
                if (token !== navToken) return;   // a newer click took over
                const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
                if (Math.abs(target.getBoundingClientRect().top - pad) > 4) target.scrollIntoView({ behavior: 'instant', block: 'start' });
                navScrolling = false;
                watchSentinel();
            });
        }
    });
});

// ===== Initialize =====
initTheme();
viewBtns.forEach(b => b.classList.toggle('active', b.dataset.view === viewMode));
loadWallpapers();

// Opened straight at a section (e.g. /#contact): the gallery was still empty when the browser first jumped,
// so the section moved down once the wallpapers were built. Go there again now that the page has its final height.
(function jumpToHashSection() {
    if (location.hash.length < 2 || /^#w=/.test(location.hash)) return;
    let t = null;
    try { t = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { /* bad hash */ }
    if (!t) return;
    navScrolling = true;
    if (scrollObserver) scrollObserver.disconnect();
    requestAnimationFrame(() => {
        t.scrollIntoView({ behavior: 'instant', block: 'start' });
        requestAnimationFrame(() => { navScrolling = false; watchSentinel(); });
    });
})();


// ===== Share + deep link (#w=ID) =====
const shareBtn = document.getElementById('shareBtn');
function shareUrl(w) { return `${location.origin}${location.pathname}#w=${w.id}`; }
shareBtn.addEventListener('click', async () => {
    if (!currentWallpaper) return;
    const data = { title: `${currentWallpaper.title} wallpaper`, text: `Check out this wallpaper: ${currentWallpaper.title}`, url: shareUrl(currentWallpaper) };
    try {
        if (navigator.share) { await navigator.share(data); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    try {
        await navigator.clipboard.writeText(data.url);
        showNotification('Link copied!');
    } catch (e) {
        window.prompt('Copy this link:', data.url);
    }
});
function openFromHash() {
    const m = /^#w=(\d+)$/.exec(location.hash);
    if (!m) return;
    const w = wallpapers.find(x => x.id === +m[1]);
    if (w) openWallpaperModal(w);
}
window.addEventListener('load', openFromHash);
window.addEventListener('hashchange', openFromHash);


// ===== Tags, related wallpapers, original file (like Wallhaven / 4K Wallpapers detail pages) =====
function renderTagsAndRelated(w) {
    const chips = document.getElementById('tagChips');
    chips.innerHTML = '';
    const words = [...new Set((w.tags || '').split(/\s+/).filter(t => t.length > 2))].slice(0, 6);
    words.forEach(t => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = '#' + t;
        b.addEventListener('click', () => { closeWallpaperModal(); searchInput.value = t; performSearch(t); });
        chips.appendChild(b);
    });
    const wrap = document.getElementById('relatedWrap'), row = document.getElementById('relatedRow');
    row.innerHTML = '';
    const portrait = viewMode === 'phone';
    row.classList.toggle('portrait', portrait);
    const rel = wallpapers.filter(x => x.id !== w.id && x.category === w.category && typeOf(x) === 'image').slice(0, 10);
    wrap.hidden = rel.length === 0;
    rel.forEach(x => {
        const b = document.createElement('button');
        b.type = 'button'; b.title = x.title;
        const im = document.createElement('img');
        im.loading = 'lazy'; im.alt = x.title;
        im.src = pickThumb(x, portrait) || imgUrl(x.image, portrait ? 180 : 300, portrait ? 320 : 190);
        im.onerror = () => b.remove();
        b.appendChild(im);
        const s = document.createElement('span'); s.textContent = x.title; b.appendChild(s);
        b.addEventListener('click', () => { openWallpaperModal(x, true); wallpaperModal.querySelector('.set-body').scrollTo({ top: 0, behavior: 'smooth' }); });
        row.appendChild(b);
    });
}

document.getElementById('originalBtn').addEventListener('click', async () => {
    const w = currentWallpaper;
    if (!w || typeOf(w) !== 'image' || busyDownload) return;
    const own = !/images\.unsplash\.com/.test(w.image);
    const url = own ? w.image : `${w.image.split('?')[0]}?auto=format&q=90`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('bad');
        const blob = await res.blob();
        const ext = (blob.type.split('/')[1] || 'jpg').split(';')[0].split('+')[0].replace('jpeg', 'jpg');
        saveBlob(blob, `${slug(w.title)}_original.${ext}`);
        showNotification('Original file saved!');
        bumpDownloads(w);
    } catch (e) {
        window.open(url, '_blank', 'noopener');
    }
});


// ===== Hero chips, stats, trending arrows =====
(function initHero() {
    const chips = document.getElementById('heroChips');
    const list = ['neon', 'sunset', 'aurora', 'mountain', 'amoled', 'minimal', 'gold', 'ocean', 'city', 'galaxy', 'quote', 'diwali'].map(t => [t, t]);
    list.forEach(([label, key]) => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = label;
        b.addEventListener('click', () => {
            searchInput.value = key;
            performSearch(key);
        });
        chips.appendChild(b);
    });
    document.getElementById('statCount').textContent = wallpapers.length;
    const row = document.getElementById('featuredRow');
    document.getElementById('featPrev').addEventListener('click', () => row.scrollBy({ left: -row.clientWidth * 0.8, behavior: 'smooth' }));
    document.getElementById('featNext').addEventListener('click', () => row.scrollBy({ left: row.clientWidth * 0.8, behavior: 'smooth' }));
})();
