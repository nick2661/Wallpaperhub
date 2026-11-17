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
    { id: 367, title: "Diwali Glow", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/diwali-glow.jpg", thumb: "images/pack/thumbs/diwali-glow.jpg", wide: "images/pack/diwali-glow-wide.jpg", wideThumb: "images/pack/thumbs/diwali-glow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 368, title: "Diya Flame", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/diya-flame.jpg", thumb: "images/pack/thumbs/diya-flame.jpg", wide: "images/pack/diya-flame-wide.jpg", wideThumb: "images/pack/thumbs/diya-flame-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 369, title: "Golden Mandala", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/golden-mandala.jpg", thumb: "images/pack/thumbs/golden-mandala.jpg", wide: "images/pack/golden-mandala-wide.jpg", wideThumb: "images/pack/thumbs/golden-mandala-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 370, title: "Holi Colors", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/holi-colors.jpg", thumb: "images/pack/thumbs/holi-colors.jpg", wide: "images/pack/holi-colors-wide.jpg", wideThumb: "images/pack/thumbs/holi-colors-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 371, title: "Christmas Snow", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/christmas-snow.jpg", thumb: "images/pack/thumbs/christmas-snow.jpg", wide: "images/pack/christmas-snow-wide.jpg", wideThumb: "images/pack/thumbs/christmas-snow-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 372, title: "New Year Fireworks", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/new-year-fireworks.jpg", thumb: "images/pack/thumbs/new-year-fireworks.jpg", wide: "images/pack/new-year-fireworks-wide.jpg", wideThumb: "images/pack/thumbs/new-year-fireworks-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 373, title: "Sky Lanterns", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/sky-lanterns.jpg", thumb: "images/pack/thumbs/sky-lanterns.jpg", wide: "images/pack/sky-lanterns-wide.jpg", wideThumb: "images/pack/thumbs/sky-lanterns-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 374, title: "Eid Crescent", category: "festival", tags: "festival celebration india diwali holi christmas eid new year lights", image: "images/pack/eid-crescent.jpg", thumb: "images/pack/thumbs/eid-crescent.jpg", wide: "images/pack/eid-crescent-wide.jpg", wideThumb: "images/pack/thumbs/eid-crescent-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 375, title: "Anime Sunset City", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-sunset-city.jpg", thumb: "images/pack/thumbs/anime-sunset-city.jpg", wide: "images/pack/anime-sunset-city-wide.jpg", wideThumb: "images/pack/thumbs/anime-sunset-city-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 376, title: "Torii Night", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-torii-night.jpg", thumb: "images/pack/thumbs/anime-torii-night.jpg", wide: "images/pack/anime-torii-night-wide.jpg", wideThumb: "images/pack/thumbs/anime-torii-night-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 377, title: "Sakura Sky", category: "anime", tags: "anime manga illustration sky japan", image: "images/pack/anime-sakura-sky.jpg", thumb: "images/pack/thumbs/anime-sakura-sky.jpg", wide: "images/pack/anime-sakura-sky-wide.jpg", wideThumb: "images/pack/thumbs/anime-sakura-sky-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 378, title: "Neon Highway", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-neon-highway.jpg", thumb: "images/pack/thumbs/car-neon-highway.jpg", wide: "images/pack/car-neon-highway-wide.jpg", wideThumb: "images/pack/thumbs/car-neon-highway-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 379, title: "Taillight Bokeh", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-taillight-bokeh.jpg", thumb: "images/pack/thumbs/car-taillight-bokeh.jpg", wide: "images/pack/car-taillight-bokeh-wide.jpg", wideThumb: "images/pack/thumbs/car-taillight-bokeh-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 380, title: "Speed Streaks", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-speed-streaks.jpg", thumb: "images/pack/thumbs/car-speed-streaks.jpg", wide: "images/pack/car-speed-streaks-wide.jpg", wideThumb: "images/pack/thumbs/car-speed-streaks-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },
    { id: 381, title: "Dusk Coupe", category: "cars", tags: "car cars vehicle road drive speed night", image: "images/pack/car-dusk-coupe.jpg", thumb: "images/pack/thumbs/car-dusk-coupe.jpg", wide: "images/pack/car-dusk-coupe-wide.jpg", wideThumb: "images/pack/thumbs/car-dusk-coupe-wide.jpg", width: 1440, height: 3200, views: 0, downloads: 0 },

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
const customizeBtn = document.getElementById('customizeBtn');
const userBtn = document.getElementById('userBtn');
const userModal = document.getElementById('userModal');
const userModalOverlay = document.getElementById('userModalOverlay');
const userModalClose = document.getElementById('userModalClose');

// ===== Helpers =====
const RESOLUTIONS = { hd: [1920, 1080], '2k': [2560, 1440], '4k': [3840, 2160], '8k': [7680, 4320] };
const isPortraitDevice = d => d === 'android' || d === 'ios';
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
                        'mountain', 'ocean', 'forest', 'city', 'sunset', 'galaxy', 'gradient', 'neon', 'amoled', 'minimal', 'pattern',
                        'quote', 'motivation', 'festival', 'diwali', 'holi', 'christmas', 'aurora', 'matrix', 'sakura', 'bokeh', 'lava', 'moon', 'earth'];

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
    categoryCards.forEach(c => c.classList.toggle('active', c.dataset.category === filter));
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
        const src = pickThumb(wallpaper, portrait) || (portrait ? imgUrl(wallpaper.image, 480, 853) : imgUrl(wallpaper.image, 800, 450));
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
        (currentFilter === 'all' || (currentFilter === 'favorites' ? favorites.includes(w.id) : w.category === currentFilter)) &&
        (!currentQuery || w.title.toLowerCase().includes(currentQuery) || w.category.toLowerCase().includes(currentQuery) || (w.tags || '').includes(currentQuery) ||
            (w.type === 'live' && currentQuery === 'live'))
    );
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

function loadWallpapers() {
    const filtered = getFiltered();
    const end = currentPage * itemsPerPage;
    const toDisplay = filtered.slice(0, end);

    disposeCards();
    wallpaperGrid.classList.toggle('portrait', viewMode === 'phone');
    wallpaperGrid.innerHTML = '';
    renderFeatured();
    toDisplay.forEach(wallpaper => wallpaperGrid.appendChild(createWallpaperCard(wallpaper)));

    if (filtered.length === 0) {
        wallpaperGrid.innerHTML = currentFilter === 'favorites' && !currentQuery
            ? '<p class="empty-state">No favorites yet. Tap the heart on any wallpaper to save it here.</p>'
            : '<p class="empty-state">No wallpapers found. Try another word or category.</p>';
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
    modalMedia.classList.toggle('photo', type === 'image');
    modalImage.hidden = type !== 'image';
    modalCanvas.hidden = type !== 'live';
    modalVideo.hidden = type !== 'video';

    if (type === 'image') {
        // whole image (no server-side crop); the visitor can zoom in to frame it
        const full = pickSrc(w, portrait);
        modalImage.src = /images\.unsplash\.com/.test(full) ? `${full.split('?')[0]}?w=1600&auto=format&q=80` : full;
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
    zoomBar.hidden = !isImg;
    document.getElementById('framingSelector').hidden = !isImg;
    prevBtn.hidden = nextBtn.hidden = getFiltered().length < 2;
    resetZoom();
}

// ===== Preview zoom / pan =====
const zoomBar = document.getElementById('zoomBar');
const zoomLabel = document.getElementById('zoomLabel');
const prevBtn = document.getElementById('prevWallpaper');
const nextBtn = document.getElementById('nextWallpaper');
const ZOOM_MAX = 4;
let zoom = 1, panX = 0, panY = 0;

function fitSize() {
    const fw = modalMedia.clientWidth, fh = modalMedia.clientHeight;
    const nw = modalImage.naturalWidth || fw, nh = modalImage.naturalHeight || fh;
    const s = Math.min(fw / nw, fh / nh);
    return { fw, fh, dw: nw * s, dh: nh * s };
}
function fillZoom() { const f = fitSize(); return Math.min(ZOOM_MAX, Math.max(f.fw / f.dw, f.fh / f.dh)); }
// Size the frame to the picture's own shape (largest fit inside the available box)
function sizeFrame() {
    const m = modalMedia;
    if (!m.classList.contains('photo')) { m.style.width = m.style.height = ''; return; }
    const nw = modalImage.naturalWidth, nh = modalImage.naturalHeight;
    if (m.classList.contains('fullscreen')) { m.style.width = '100vw'; m.style.height = '100dvh'; return; }
    m.style.width = '100%'; m.style.height = 'var(--media-max-h)';
    if (!nw || !nh) return;
    const aw = m.clientWidth, ah = m.clientHeight;
    const s = Math.min(aw / nw, ah / nh);
    m.style.width = Math.round(nw * s) + 'px';
    m.style.height = Math.round(nh * s) + 'px';
}
// Dashed box = the part of the picture the chosen device + resolution will download
let framing = 'fill';       // 'fill' = crop to the device shape, 'fit' = whole picture on a blurred background
let pannable = false;
function cropWindow() {
    if (framing !== 'fill' || !currentWallpaper || typeOf(currentWallpaper) !== 'image' ||
        modalMedia.classList.contains('fullscreen') || !modalImage.naturalWidth) return null;
    const [lw, lh] = RESOLUTIONS[selectedResolution] || RESOLUTIONS['4k'];
    const [tw, th] = isPortraitDevice(selectedDevice) ? [lh, lw] : [lw, lh];
    const fw = modalMedia.clientWidth, fh = modalMedia.clientHeight, r = tw / th;
    let gw = fw, gh = fw / r;
    if (gh > fh) { gh = fh; gw = fh * r; }
    return { fw, fh, gw, gh, tw, th };
}
function updateCropGuide(gb) {
    const g = document.getElementById('cropGuide');
    if (!gb || (Math.abs(gb.gw - gb.fw) < 3 && Math.abs(gb.gh - gb.fh) < 3)) { g.hidden = true; return; }   // picture already has this shape
    g.hidden = false;
    Object.assign(g.style, { width: gb.gw + 'px', height: gb.gh + 'px', left: (gb.fw - gb.gw) / 2 + 'px', top: (gb.fh - gb.gh) / 2 + 'px' });
    document.getElementById('cropGuideLabel').textContent = gb.gw < 220 ? 'Download area' : `Download area ${gb.tw}×${gb.th}`;
}
// Which part of the picture is inside the dashed box (0..1 of the picture), or null for the default centred crop
function currentCropRect() {
    const gb = cropWindow();
    if (!gb) return null;
    const u = x => Math.min(1, Math.max(0, (x - gb.fw / 2 - panX) / (gb.fw * zoom) + 0.5));
    const v = y => Math.min(1, Math.max(0, (y - gb.fh / 2 - panY) / (gb.fh * zoom) + 0.5));
    const x0 = (gb.fw - gb.gw) / 2, y0 = (gb.fh - gb.gh) / 2;
    return { u0: u(x0), u1: u(x0 + gb.gw), v0: v(y0), v1: v(y0 + gb.gh) };
}
function applyZoom() {
    sizeFrame();
    const f = fitSize();
    const gb = cropWindow();
    // with a crop box the picture must keep covering it; otherwise just keep it inside the frame
    const mx = gb ? Math.max(0, (gb.fw * zoom - gb.gw) / 2) : Math.max(0, (f.dw * zoom - f.fw) / 2);
    const my = gb ? Math.max(0, (gb.fh * zoom - gb.gh) / 2) : Math.max(0, (f.dh * zoom - f.fh) / 2);
    panX = Math.max(-mx, Math.min(mx, panX));
    panY = Math.max(-my, Math.min(my, panY));
    pannable = mx > 0.5 || my > 0.5;
    modalImage.style.transform = zoom === 1 && !panX && !panY ? '' : `translate(${panX}px, ${panY}px) scale(${zoom})`;
    modalMedia.classList.toggle('zoomed', pannable);
    zoomLabel.textContent = zoom === 1 ? '100%' : Math.round(zoom * 100) + '%';
    updateCropGuide(gb);
    document.getElementById('zoomOut').disabled = zoom <= 1;
    document.getElementById('zoomIn').disabled = zoom >= ZOOM_MAX;
}
function setZoom(z) { zoom = Math.max(1, Math.min(ZOOM_MAX, z)); if (zoom === 1) panX = panY = 0; applyZoom(); }
function resetZoom() { zoom = 1; panX = panY = 0; applyZoom(); }
document.getElementById('zoomIn').addEventListener('click', (e) => { e.stopPropagation(); setZoom(zoom < 1.5 ? 1.5 : zoom + 0.5); });
document.getElementById('zoomOut').addEventListener('click', (e) => { e.stopPropagation(); setZoom(zoom - 0.5 < 1.25 ? 1 : zoom - 0.5); });
zoomLabel.addEventListener('click', (e) => { e.stopPropagation(); resetZoom(); });
modalMedia.addEventListener('wheel', (e) => {
    if (typeOf(currentWallpaper) !== 'image') return;
    e.preventDefault();
    setZoom(zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
}, { passive: false });
modalImage.addEventListener('dblclick', () => { zoom > 1 ? resetZoom() : setZoom(fillZoom() > 1.05 ? fillZoom() : 2); });
modalImage.addEventListener('load', applyZoom);
window.addEventListener('resize', () => { if (wallpaperModal.classList.contains('active')) applyZoom(); });
let drag = null;
modalMedia.addEventListener('pointerdown', (e) => {
    if (!pannable || e.target.closest('button')) return;
    drag = { x: e.clientX, y: e.clientY, px: panX, py: panY };
    modalMedia.setPointerCapture(e.pointerId);
    modalMedia.classList.add('dragging');
});
modalMedia.addEventListener('pointermove', (e) => {
    if (!drag) return;
    panX = drag.px + (e.clientX - drag.x); panY = drag.py + (e.clientY - drag.y);
    applyZoom();
});
['pointerup', 'pointercancel'].forEach(t => modalMedia.addEventListener(t, () => { drag = null; modalMedia.classList.remove('dragging'); }));

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

function openWallpaperModal(wallpaper, keepDevice) {
    stopModalMedia();
    currentWallpaper = wallpaper;
    modalTitle.textContent = wallpaper.title;
    modalCategory.textContent = wallpaper.category.charAt(0).toUpperCase() + wallpaper.category.slice(1);
    modalViews.textContent = wallpaper.views.toLocaleString();
    modalDownloads.textContent = wallpaper.downloads.toLocaleString();

    // Default device to match the shape the visitor is browsing in
    if (!keepDevice) selectedDevice = viewMode === 'phone' ? 'android' : 'desktop';
    deviceBtns.forEach(b => b.classList.toggle('active', b.dataset.device === selectedDevice));

    setFavoriteButton();
    customizeBtn.hidden = typeOf(wallpaper) !== 'image'; // editor works on photos; live wallpapers download as video
    updateResolutionLabels();

    wallpaperModal.classList.add('active');
    document.body.classList.add('modal-open');
    updateModalPreview();
    wallpaperModal.querySelector('.modal-body').scrollTop = 0;
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
function exitPreview() { modalMedia.classList.remove('fullscreen'); document.body.classList.remove('preview-open'); requestAnimationFrame(() => typeof applyZoom === 'function' && applyZoom()); }
previewFsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const on = !modalMedia.classList.contains('fullscreen');
    modalMedia.classList.toggle('fullscreen', on);
    document.body.classList.toggle('preview-open', on);
    if (modalPlayer) requestAnimationFrame(() => modalPlayer && modalPlayer.resize());
    requestAnimationFrame(applyZoom);
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
        const own = !/images\.unsplash\.com/.test(wallpaper.image);
        const custom = !quick && type === 'image' && (framing === 'fit' || currentCropRect());
        if (type === 'image' && (own || custom)) {
            // Crop/resize to the chosen device + resolution in the browser (own images always; stock photos when framed by hand)
            try {
                const srcFull = pickSrc(wallpaper, h > w);
                const source = own ? srcFull : `${srcFull.split('?')[0]}?w=${Math.min(4000, Math.max(w, h))}&auto=format&q=90`;
                const out = await renderLocalImage(source, w, h, quick ? {} : { mode: framing, rect: framing === 'fill' ? currentCropRect() : null });
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


// ===== Framing: fill the screen (crop) or show the whole picture =====
document.querySelectorAll('.framing-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        framing = btn.dataset.framing;
        document.querySelectorAll('.framing-btn').forEach(b => b.classList.toggle('active', b === btn));
        document.getElementById('framingHint').textContent = framing === 'fill'
            ? 'Drag the picture and use + / − to choose what is inside the dashed box.'
            : 'The whole picture is kept; the empty sides are filled with a soft blur of the same picture.';
        resetZoom();
    });
});
