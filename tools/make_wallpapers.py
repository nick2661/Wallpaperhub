#!/usr/bin/env python3
"""
WallpaperHub original wallpaper generator.

Makes phone wallpapers (1440x3200) from scratch, so you own every pixel and
can use them commercially. Also writes small thumbnails and a ready-to-paste
JavaScript snippet for script.js.

Run from the project folder:
    pip install pillow numpy
    python tools/make_wallpapers.py

Output:
    images/pack/<slug>.jpg           full size wallpaper
    images/pack/thumbs/<slug>.jpg    small preview used in the gallery
    images/pack/entries.js           lines to paste into the wallpapers array

To add your own design: write a function that returns a float array
(H, W, 3) with values 0..255, and add a line to the DESIGNS list at the bottom.
"""
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw

W, H = 1440, 3200
TW, TH = 360, 800
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images", "pack")

YY, XX = np.mgrid[0:H, 0:W].astype(np.float32)
NX, NY = XX / W, YY / H            # 0..1 coordinates


def hexc(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32)


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def finish(img, grain=1.6, seed=0):
    """Add a whisper of grain (hides colour banding) and convert to 8 bit."""
    rng = np.random.default_rng(seed)
    noise = rng.normal(0, grain, img.shape[:2]).astype(np.float32)
    # no grain on near-black pixels, so AMOLED blacks stay truly black (0,0,0)
    lum = img.mean(axis=2)
    noise *= np.clip((lum - 4) / 26, 0, 1)
    img = img + noise[..., None]
    return np.clip(img, 0, 255).astype(np.uint8)


# ---------------------------------------------------------------- designs
def mesh(colors, points, power=2.6):
    """Smooth multi-colour blend: each colour glows from a point."""
    num = np.zeros((H, W, 3), np.float32)
    den = np.zeros((H, W, 1), np.float32)
    for c, (px, py) in zip(colors, points):
        d2 = (NX - px) ** 2 * (W / H) ** 2 + (NY - py) ** 2
        w = 1.0 / (d2 + 0.02) ** (power / 2)
        num += w[..., None] * hexc(c)
        den += w[..., None]
    return num / den


def linear(c1, c2, angle_deg, c3=None):
    a = math.radians(angle_deg)
    t = (NX - 0.5) * math.sin(a) + (NY - 0.5) * math.cos(a)
    t = (t - t.min()) / (t.max() - t.min())
    t = smooth(0, 1, t)[..., None]
    if c3 is None:
        return hexc(c1) * (1 - t) + hexc(c2) * t
    mid = hexc(c2)
    first = np.clip(t * 2, 0, 1)
    second = np.clip(t * 2 - 1, 0, 1)
    return (hexc(c1) * (1 - first) + mid * first) * (1 - second) + hexc(c3) * second


def amoled_glow(color, cx, cy, spread, ring=False, ring_r=0.0):
    """Pure black screen with a soft glow. Black pixels use no power on OLED."""
    d = np.sqrt(((NX - cx) * W / H) ** 2 + (NY - cy) ** 2)
    g = np.exp(-(d / spread) ** 1.6)
    img = g[..., None] * hexc(color)
    if ring:
        r = np.exp(-((d - ring_r) / 0.006) ** 2)
        img += r[..., None] * hexc(color) * 1.2
    return img


def amoled_orb(color, cx, cy, radius):
    d = np.sqrt(((NX - cx) * W / H) ** 2 + (NY - cy) ** 2)
    core = smooth(radius, radius * 0.55, d)
    halo = np.exp(-(d / (radius * 2.6)) ** 2) * 0.55
    shade = (1 - 0.55 * smooth(-radius, radius, (NY - cy) * 1.0 + (NX - cx) * 0.4))
    img = (core * shade + halo)[..., None] * hexc(color)
    return img


def amoled_lines(color, n=9, tilt=0.0):
    img = np.zeros((H, W, 3), np.float32)
    for i in range(n):
        y = 0.55 + i * 0.045
        wave = y + 0.02 * np.sin(NX * math.pi * 2 + i * 0.7 + tilt)
        line = np.exp(-((NY - wave) / 0.0018) ** 2)
        img += (line * (0.25 + 0.75 * (i / n)))[..., None] * hexc(color)
    return img


def solid_shapes(bg, fg, kind, accent=None):
    """Minimalist designs drawn 2x then shrunk for clean edges."""
    S = 2
    im = Image.new("RGB", (W * S, H * S), tuple(int(v) for v in hexc(bg)))
    d = ImageDraw.Draw(im)
    f = tuple(int(v) for v in hexc(fg))
    a = tuple(int(v) for v in hexc(accent)) if accent else f
    w, h = W * S, H * S
    if kind == "sun":
        r = int(w * 0.30)
        d.ellipse((w // 2 - r, int(h * .30) - r, w // 2 + r, int(h * .30) + r), fill=f)
    elif kind == "horizon":
        r = int(w * 0.26)
        d.pieslice((w // 2 - r, int(h * .58) - r, w // 2 + r, int(h * .58) + r), 180, 360, fill=f)
        d.rectangle((int(w * .12), int(h * .58), int(w * .88), int(h * .585)), fill=a)
    elif kind == "arch":
        aw, top = int(w * .46), int(h * .30)
        d.rounded_rectangle((w // 2 - aw // 2, top, w // 2 + aw // 2, int(h * .72)), radius=aw // 2, fill=f)
        d.rectangle((w // 2 - aw // 2, int(h * .55), w // 2 + aw // 2, int(h * .72)), fill=f)
    elif kind == "stripes":
        for i in range(5):
            y0 = int(h * (0.34 + i * 0.07))
            d.rounded_rectangle((int(w * .22), y0, int(w * (.78 - 0.06 * i)), y0 + int(h * .028)), radius=int(h * .014), fill=f if i % 2 == 0 else a)
    elif kind == "moon":
        r = int(w * .28)
        cx, cy = w // 2, int(h * .36)
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=f)
        d.ellipse((cx - r + int(r * .55), cy - r - int(r * .1), cx + r + int(r * .55), cy + r - int(r * .1)), fill=tuple(int(v) for v in hexc(bg)))
    elif kind == "dots":
        for row in range(3):
            for col in range(3):
                r = int(w * .055)
                cx = int(w * (0.30 + col * 0.20)); cy = int(h * (0.44 + row * 0.09))
                d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=a if (row + col) % 4 == 0 else f)
    elif kind == "split":
        d.rectangle((0, int(h * .52), w, h), fill=f)
        r = int(w * .17)
        d.ellipse((w // 2 - r, int(h * .52) - r, w // 2 + r, int(h * .52) + r), fill=a)
    elif kind == "rings":
        for i, r in enumerate((0.34, 0.25, 0.16, 0.07)):
            rr = int(w * r)
            d.ellipse((w // 2 - rr, int(h * .42) - rr, w // 2 + rr, int(h * .42) + rr), fill=f if i % 2 == 0 else a)
    im = im.resize((W, H), Image.LANCZOS)
    return np.asarray(im, dtype=np.float32)


def field(seed, octaves=4):
    """Smooth random landscape made of sine waves (deterministic)."""
    rng = np.random.default_rng(seed)
    f = np.zeros((H, W), np.float32)
    for o in range(octaves):
        k = 1.4 * (1.9 ** o)
        for _ in range(3):
            ang = rng.uniform(0, math.tau)
            ph = rng.uniform(0, math.tau)
            f += (1 / (1.5 ** o)) * np.sin(k * (NX * math.cos(ang) * 3 + NY * math.sin(ang) * 5) + ph)
    return f


def contours(bg1, bg2, line, seed, freq=7.0, width=0.07):
    f = field(seed)
    f = (f - f.min()) / (f.max() - f.min())
    base = linear(bg1, bg2, 160)
    v = f * freq
    d = np.abs(v - np.round(v))
    a = 1 - smooth(width * 0.5, width, d)
    return base * (1 - a[..., None] * 0.9) + hexc(line) * (a[..., None] * 0.9)


def rings_pattern(bg1, bg2, line, cx, cy, freq=26.0):
    d = np.sqrt(((NX - cx) * W / H) ** 2 + (NY - cy) ** 2)
    v = d * freq
    k = np.abs(v - np.round(v))
    a = 1 - smooth(0.04, 0.10, k)
    base = linear(bg1, bg2, 200)
    fade = smooth(1.4, 0.2, d)[..., None]
    return base * (1 - a[..., None] * 0.8 * fade) + hexc(line) * (a[..., None] * 0.8 * fade)


def waves_pattern(top, bottom, layers, seed):
    rng = np.random.default_rng(seed)
    img = linear(top, bottom, 180)
    for i, c in enumerate(layers):
        y0 = 0.38 + i * 0.12
        amp = 0.03 + 0.012 * i
        ph = rng.uniform(0, math.tau)
        k = rng.uniform(1.4, 2.4)
        edge = y0 + amp * np.sin(NX * math.tau * k + ph) + 0.01 * np.sin(NX * math.tau * k * 2.3 + ph * 2)
        m = smooth(0.0015, -0.0015, NY - edge)
        m = 1 - m  # 1 below the edge
        img = img * (1 - m[..., None]) + hexc(c) * m[..., None]
    return img


# ----------------------------------------------------------------- list
# (slug, title, category, seed, function returning the image)
DESIGNS = [
    # --- abstract: mesh gradients
    ("aurora-mesh", "Aurora Mesh", "abstract", lambda: mesh(["#0f2027", "#2c5364", "#00c9a7", "#845ec2", "#0b1e3b"], [(.2, .1), (.8, .3), (.3, .75), (.85, .9), (.5, .5)])),
    ("sunset-haze", "Sunset Haze", "abstract", lambda: mesh(["#ff9a76", "#ff5e78", "#7a2a6b", "#ffd166", "#2b1055"], [(.8, .1), (.2, .3), (.7, .75), (.2, .9), (.5, .5)])),
    ("ocean-drift", "Ocean Drift", "abstract", lambda: mesh(["#0077b6", "#00b4d8", "#03045e", "#90e0ef", "#023e8a"], [(.1, .15), (.9, .35), (.2, .7), (.8, .85), (.5, .5)])),
    ("peach-cloud", "Peach Cloud", "abstract", lambda: mesh(["#ffd6a5", "#ffadad", "#fdffb6", "#caffbf", "#ffc6ff"], [(.15, .1), (.85, .2), (.2, .65), (.85, .8), (.5, .45)], power=2.2)),
    ("violet-dream", "Violet Dream", "abstract", lambda: mesh(["#3a0ca3", "#7209b7", "#f72585", "#4361ee", "#240046"], [(.85, .1), (.15, .35), (.8, .7), (.2, .9), (.5, .5)])),
    ("forest-mist", "Forest Mist", "abstract", lambda: mesh(["#1b4332", "#52b788", "#081c15", "#95d5b2", "#2d6a4f"], [(.2, .1), (.8, .35), (.25, .7), (.75, .9), (.5, .5)])),
    ("rose-gold", "Rose Gold", "abstract", lambda: mesh(["#b76e79", "#f4c2c2", "#6d2e46", "#ffe5d9", "#a44a6a"], [(.8, .1), (.2, .3), (.75, .7), (.2, .88), (.5, .5)])),
    ("midnight-blue", "Midnight Blue", "abstract", lambda: mesh(["#050a30", "#0a2472", "#1e6091", "#000814", "#3a86ff"], [(.2, .12), (.85, .3), (.3, .72), (.8, .92), (.5, .5)])),
    ("lemon-fizz", "Lemon Fizz", "abstract", lambda: mesh(["#f9f871", "#a0e548", "#00c2a8", "#ffd60a", "#2ec4b6"], [(.2, .1), (.85, .3), (.2, .7), (.8, .88), (.5, .5)], power=2.2)),
    ("candy-sky", "Candy Sky", "abstract", lambda: mesh(["#a18cd1", "#fbc2eb", "#8fd3f4", "#ffdde1", "#84fab0"], [(.15, .12), (.85, .25), (.2, .65), (.85, .85), (.5, .45)], power=2.2)),
    # --- abstract: linear gradients
    ("lava-flow", "Lava Flow", "abstract", lambda: linear("#1a0000", "#ff4d00", 170, "#ffd000")),
    ("blue-hour", "Blue Hour", "abstract", lambda: linear("#0d1b2a", "#415a77", 175, "#e0b1cb")),
    ("mint-fade", "Mint Fade", "abstract", lambda: linear("#e0fbfc", "#98f5e1", 165, "#3da5a5")),
    ("twilight", "Twilight", "abstract", lambda: linear("#2b1055", "#7597de", 180)),
    # --- dark / AMOLED
    ("amoled-blue-glow", "AMOLED Blue Glow", "dark", lambda: amoled_glow("#2f6bff", .5, 1.02, .30)),
    ("amoled-red-glow", "AMOLED Red Glow", "dark", lambda: amoled_glow("#ff2a3d", .5, 1.02, .28)),
    ("amoled-green-ring", "AMOLED Green Ring", "dark", lambda: amoled_glow("#00ff9c", .5, .62, .22, ring=True, ring_r=.20)),
    ("amoled-violet-orb", "AMOLED Violet Orb", "dark", lambda: amoled_orb("#b86bff", .5, .62, .17)),
    ("amoled-gold-orb", "AMOLED Gold Orb", "dark", lambda: amoled_orb("#ffb703", .5, .60, .15)),
    ("amoled-cyan-lines", "AMOLED Cyan Lines", "dark", lambda: amoled_lines("#27e1ff", 10)),
    ("amoled-pink-lines", "AMOLED Pink Lines", "dark", lambda: amoled_lines("#ff4fd8", 8, 1.5)),
    ("pure-black", "Pure Black", "dark", lambda: np.zeros((H, W, 3), np.float32)),
    ("deep-space-black", "Deep Space Black", "dark", lambda: linear("#000000", "#0a0f24", 180)),
    ("charcoal-fade", "Charcoal Fade", "dark", lambda: linear("#0b0b0d", "#2a2a33", 170)),
    # --- minimalist
    ("minimal-sun", "Minimal Sun", "minimalist", lambda: solid_shapes("#f4ede4", "#e76f51", "sun")),
    ("minimal-horizon", "Minimal Horizon", "minimalist", lambda: solid_shapes("#264653", "#e9c46a", "horizon", "#f4a261")),
    ("minimal-arch", "Minimal Arch", "minimalist", lambda: solid_shapes("#e9d8c5", "#bc6c4d", "arch")),
    ("minimal-stripes", "Minimal Stripes", "minimalist", lambda: solid_shapes("#fdf6ec", "#264653", "stripes", "#e76f51")),
    ("minimal-moon", "Minimal Moon", "minimalist", lambda: solid_shapes("#14213d", "#fca311", "moon")),
    ("minimal-dots", "Minimal Dots", "minimalist", lambda: solid_shapes("#fefae0", "#606c38", "dots", "#bc6c25")),
    ("minimal-split", "Minimal Split", "minimalist", lambda: solid_shapes("#cdb4db", "#6d597a", "split", "#ffafcc")),
    ("minimal-rings", "Minimal Rings", "minimalist", lambda: solid_shapes("#0b132b", "#5bc0be", "rings", "#1c2541")),
    # --- abstract: patterns
    ("topo-night", "Topo Night", "abstract", lambda: contours("#0b1d2a", "#123d4a", "#5eead4", 3)),
    ("topo-sand", "Topo Sand", "abstract", lambda: contours("#f2e8cf", "#e0c9a6", "#bc6c25", 5, freq=6)),
    ("topo-violet", "Topo Violet", "abstract", lambda: contours("#1b1035", "#3c1a6e", "#c77dff", 8)),
    ("ripple-blue", "Ripple Blue", "abstract", lambda: rings_pattern("#03045e", "#0077b6", "#caf0f8", .5, .35)),
    ("ripple-sunset", "Ripple Sunset", "abstract", lambda: rings_pattern("#3d0c02", "#d1495b", "#ffd6a5", .5, .62)),
    ("dune-waves", "Dune Waves", "abstract", lambda: waves_pattern("#ffd6a5", "#fdffb6", ["#f4a261", "#e76f51", "#9c4a2f", "#4a1f1a"], 2)),
    ("night-waves", "Night Waves", "abstract", lambda: waves_pattern("#0b132b", "#1c2541", ["#3a506b", "#5bc0be", "#2a9d8f", "#0b132b"], 4)),
    ("pastel-waves", "Pastel Waves", "abstract", lambda: waves_pattern("#fff1e6", "#fde2e4", ["#fad2e1", "#e2ece9", "#bee1e6", "#dfe7fd"], 6)),
]


def tags_for(slug):
    """Search words so visitors can find wallpapers (search also reads title and category)."""
    if slug.startswith("amoled") or slug in ("pure-black", "deep-space-black", "charcoal-fade"):
        t = "amoled black dark oled battery"
    elif slug.startswith("minimal"):
        t = "minimal simple flat clean"
    elif slug.startswith(("topo", "ripple", "dune", "night-waves", "pastel-waves")):
        t = "pattern lines waves"
    else:
        t = "gradient blur colorful smooth"
    return t


def main():
    only = set(sys.argv[1:])
    os.makedirs(os.path.join(OUT, "thumbs"), exist_ok=True)
    lines = []
    for i, (slug, title, cat, fn) in enumerate(DESIGNS):
        if only and slug not in only:
            continue
        img = finish(fn(), seed=i)
        im = Image.fromarray(img, "RGB")
        im.save(os.path.join(OUT, slug + ".jpg"), "JPEG", quality=84, optimize=True, progressive=True)
        im.resize((TW, TH), Image.LANCZOS).save(os.path.join(OUT, "thumbs", slug + ".jpg"), "JPEG", quality=78, optimize=True)
        size = os.path.getsize(os.path.join(OUT, slug + ".jpg")) // 1024
        print(f"{slug:22s} {size:5d} KB")
        tags = tags_for(slug)
        lines.append(f'    {{ id: {301 + i}, title: "{title}", category: "{cat}", tags: "{tags}", image: "images/pack/{slug}.jpg", '
                     f'thumb: "images/pack/thumbs/{slug}.jpg", width: {W}, height: {H}, views: 0, downloads: 0 }},')
    with open(os.path.join(OUT, "entries.js"), "w", encoding="utf-8") as f:
        f.write("// Paste these lines inside the wallpapers array in script.js\n" + "\n".join(lines) + "\n")
    print("done:", len(lines), "wallpapers")


if __name__ == "__main__":
    main()
