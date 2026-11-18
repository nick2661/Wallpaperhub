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



# ------------------------------------------------ pack 2: space, nature, tech
from PIL import ImageFilter


def fbm(seed, octaves=5, base=2, persistence=0.55):
    """Cloud-like noise 0..1 (several layers of smooth random blobs)."""
    rng = np.random.default_rng(seed)
    out = np.zeros((H, W), np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        n = base * (2 ** o)
        g = rng.random((int(n * H / W) + 2, n + 2)).astype(np.float32)
        im = Image.fromarray(g, mode="F").resize((W, H), Image.BICUBIC)
        out += amp * np.asarray(im)
        tot += amp
        amp *= persistence
    out /= tot
    return (out - out.min()) / (out.max() - out.min())


def stars(seed, n=900, maxr=2.0):
    rng = np.random.default_rng(seed)
    im = Image.new("L", (W * 2, H * 2), 0)
    d = ImageDraw.Draw(im)
    for _ in range(n):
        x, y = rng.uniform(0, W * 2), rng.uniform(0, H * 2)
        r = 0.7 + (rng.random() ** 4) * maxr * 2
        b = int(rng.uniform(110, 255))
        d.ellipse((x - r, y - r, x + r, y + r), fill=b)
    small = im.resize((W, H), Image.LANCZOS)
    glow = small.filter(ImageFilter.GaussianBlur(4))
    return np.clip(np.asarray(small, np.float32) / 255 + np.asarray(glow, np.float32) / 255 * 1.4, 0, 1)


def nebula(seed, bg, c1, c2, c3):
    f1, f2, f3 = fbm(seed, 6, 2), fbm(seed + 1, 5, 3), fbm(seed + 2, 4, 4)
    mask = smooth(0.38, 0.82, f1)
    col = hexc(c1) * (1 - f2[..., None]) + hexc(c2) * f2[..., None]
    hot = smooth(0.62, 0.9, f1 * 0.6 + f3 * 0.5)[..., None]
    col = col * (1 - hot) + hexc(c3) * hot
    img = hexc(bg) + mask[..., None] * col * 0.95
    st = stars(seed + 9)
    return img + (st * (1 - 0.7 * mask))[..., None] * 255


def planet_horizon(seed, atmo, planet, sky="#02030a"):
    cy = 1.62
    r = cy - 0.76
    d = np.sqrt(((NX - 0.5) * W / H) ** 2 + (NY - cy) ** 2)
    sky_img = linear(sky, "#0a1030", 180)
    st = stars(seed)[..., None] * 255
    glow = np.exp(-np.clip(d - r, 0, None) / 0.035)[..., None] * hexc(atmo) * (d >= r)[..., None]
    wide = np.exp(-np.clip(d - r, 0, None) / 0.16)[..., None] * hexc(atmo) * 0.35 * (d >= r)[..., None]
    outside = (sky_img + st * (d >= r)[..., None] * 0.9) * 1.0 + glow + wide
    depth = np.clip((r - d) / 0.10, 0, 1)[..., None]
    surf = hexc(atmo) * (1 - depth) + hexc(planet) * depth
    surf *= (0.55 + 0.45 * np.clip((r - d) / 0.5, 0, 1))[..., None] * 0.9 + 0.1
    return np.where((d < r)[..., None], surf, outside)


def eclipse(seed):
    cx, cy, r = 0.5, 0.42, 0.115
    d = np.sqrt(((NX - cx) * W / H) ** 2 + (NY - cy) ** 2)
    corona = np.exp(-((d - r) / 0.022) ** 2) * 1.6 + np.exp(-np.clip(d - r, 0, None) / 0.12) * 0.55
    corona = corona * (d >= r * 0.985)
    img = (corona[..., None] * hexc("#ffe2a8"))
    img = img + stars(seed, 700)[..., None] * 255 * (d > r * 2.6)[..., None] * 0.8
    return img + linear("#000000", "#050818", 180) * 0.8


def moonrise(seed):
    cx, cy, r = 0.5, 0.64, 0.20
    d = np.sqrt(((NX - cx) * W / H) ** 2 + (NY - cy) ** 2)
    sky = linear("#05081c", "#1d2b53", 180, "#7a5c8a")
    maria = fbm(seed, 4, 2)                      # large dark seas
    fine = fbm(seed + 5, 6, 6)                   # small surface texture
    shade = 0.84 + 0.14 * smooth(0.35, 0.75, maria) + 0.08 * (fine - 0.5)
    shade = shade * (0.70 + 0.30 * smooth(1.0, -0.2, (NX - cx) * 2.4))   # lit from the left
    body = hexc("#f4efdf") * shade[..., None]
    st = stars(seed + 3, 800)[..., None] * 255 * (d > r * 1.5)[..., None] * (1 - NY[..., None] * 0.5)
    return add_disc(sky + st, "#c9d6ff", cx, cy, r, 0.55, 0.09, color_img=body)


def add_disc(img, col, cx, cy, r, halo=0.5, spread=0.10, color_img=None):
    """Sun/moon with a soft glow. Halo is blended with the disc edge, so no dark outline."""
    d = np.sqrt(((NX - cx) * W / H) ** 2 + (NY - cy) ** 2)
    disc = smooth(r + 0.0015, r - 0.0015, d)[..., None]
    glow = (np.exp(-np.clip(d - r, 0, None) / spread) * halo)[..., None] * hexc(col)
    body = hexc(col) if color_img is None else color_img
    return (img + glow) * (1 - disc) + body * disc


def ridge_line(seed, y0, amp, roughness=1.0):
    """Mountain outline: height for every x (peaky, ridged noise)."""
    rng = np.random.default_rng(seed)
    x = np.linspace(0, 1, W, dtype=np.float32)
    r = np.zeros(W, np.float32)
    for o in range(4):
        f = 1.1 * (1.9 ** o) * roughness
        r += (1 / (2.4 ** o)) * (1 - np.abs(np.sin(math.tau * f * x * 0.5 + rng.uniform(0, math.tau))))
    r = (r - r.min()) / (r.max() - r.min())
    return y0 - amp * r


def mountains(seed, sky, layers, sun=None, with_stars=False, y_start=0.50, step=0.085, amp=0.11):
    img = linear(*sky[:2], 180, *(sky[2:3] or [None])) if len(sky) > 2 else linear(sky[0], sky[1], 180)
    if with_stars:
        img = img + stars(seed, 600)[..., None] * 255 * (1 - NY[..., None] * 1.3).clip(0, 1) * 0.8
    if sun:
        col, cx, cy, r = sun
        img = add_disc(img, col, cx, cy, r, 0.5, 0.10)
    for i, c in enumerate(layers):
        ridge = ridge_line(seed + i * 7, y_start + i * step, amp * (1 - i * 0.12), 1.0 + i * 0.25)
        m = smooth(0.0012, -0.0012, NY - ridge[None, :])  # 1 under the ridge
        m = 1 - m
        top = y_start + i * step - amp          # same for every column, so no streaks
        depth = np.clip((NY - top) / 0.30, 0, 1)[..., None]
        col = hexc(c) * (1 - 0.30 * depth)
        img = img * (1 - m[..., None]) + col * m[..., None]
    return img


def pines(seed, sky, layers, moon=None):
    S = 2
    base = linear(sky[0], sky[1], 180)
    if moon:
        col, cx, cy, r = moon
        base = add_disc(base, col, cx, cy, r, 0.45, 0.09)
    im = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").resize((W * S, H * S), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    rng = np.random.default_rng(seed)
    for li, c in enumerate(layers):
        fill = tuple(int(v) for v in hexc(c))
        ground = int(H * S * (0.84 + li * 0.045))
        x = -40
        scale = 1.0 + li * 0.40
        while x < W * S + 60:
            th = int(rng.uniform(0.13, 0.19) * H * S * scale)
            tw = int(th * rng.uniform(0.32, 0.42))
            for k in range(4):
                top = ground - th + int(th * 0.20 * k) - int(th * 0.05)
                bot = ground - th + int(th * 0.20 * (k + 1)) + int(th * 0.20)
                half = int(tw * (0.35 + 0.22 * k))
                d.polygon([(x, top), (x - half, bot), (x + half, bot)], fill=fill)
            d.rectangle((x - 5, ground - int(th * 0.05), x + 5, ground + int(H * 0.06 * S)), fill=fill)
            x += int(tw * rng.uniform(0.85, 1.25))
        d.rectangle((0, ground, W * S, H * S), fill=fill)
    return np.asarray(im.resize((W, H), Image.LANCZOS), np.float32)


def ocean(sky, sun_col, sea_top, sea_bot, horizon=0.55, sun_r=0.17):
    img = linear(sky[0], sky[1], 180, sky[2]) if len(sky) > 2 else linear(sky[0], sky[1], 180)
    img = add_disc(img, sun_col, 0.5, horizon, sun_r, 0.55, 0.12)
    sea = linear(sea_top, sea_bot, 180)
    below = smooth(horizon - 0.001, horizon + 0.001, NY)[..., None]
    out = img * (1 - below) + sea * below
    # sun reflection: stripes that get thinner towards the viewer
    rng = np.random.default_rng(1)
    for i in range(26):
        t = i / 26
        y = horizon + 0.012 + t ** 1.6 * 0.34
        wdt = (0.20 - 0.14 * t) * (0.7 + 0.3 * rng.random())
        hgt = 0.0035 + 0.003 * t
        m = smooth(hgt, hgt * 0.4, np.abs(NY - y)) * smooth(wdt * 0.5 * H / W, wdt * 0.3 * H / W, np.abs(NX - 0.5)) * (0.9 - 0.5 * t)
        out = out * (1 - m[..., None]) + hexc(sun_col) * m[..., None]
    return out


def neon_grid(sun_top, sun_bot, grid, sky_top, sky_bot, horizon=0.56):
    S = 2
    sky = linear(sky_top, sky_bot, 180)
    sky[int(H * horizon):] = hexc("#0a0220")
    im = Image.fromarray(np.clip(sky, 0, 255).astype(np.uint8), "RGB").resize((W * S, H * S), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    cx, cy, r = W * S // 2, int(H * S * horizon), int(W * S * 0.30)
    sun = Image.new("RGB", (2 * r, 2 * r))
    sd = ImageDraw.Draw(sun)
    for y in range(2 * r):
        t = y / (2 * r)
        sd.line((0, y, 2 * r, y), fill=tuple(int(a * (1 - t) + b * t) for a, b in zip(hexc(sun_top), hexc(sun_bot))))
    mask = Image.new("L", (2 * r, 2 * r), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((0, 0, 2 * r, 2 * r), fill=255)
    for i in range(8):                       # retro stripes cut into the sun
        y0 = int(r * (1.05 + i * 0.12)); md.rectangle((0, y0, 2 * r, y0 + int(4 + i * 4) * S // 2), fill=0)
    im.paste(sun, (cx - r, cy - r - int(r * 0.05)), mask)
    d.rectangle((0, cy, W * S, H * S), fill=tuple(int(v) for v in hexc("#0a0220")))
    gc = tuple(int(v) for v in hexc(grid))
    for i in range(1, 26):                   # horizontal lines (denser near the horizon)
        y = cy + int((H * S * (1 - horizon)) * (i / 25) ** 2.1)
        d.line((0, y, W * S, y), fill=gc, width=3 * S // 2)
    for k in range(-14, 15):                 # lines running to the vanishing point
        d.line((cx, cy, cx + k * W * S * 0.34, H * S), fill=gc, width=3 * S // 2)
    d.rectangle((0, cy - 2, W * S, cy + 3), fill=gc)
    glow = im.filter(ImageFilter.GaussianBlur(14 * S))
    out = np.asarray(im.resize((W, H), Image.LANCZOS), np.float32) + np.asarray(glow.resize((W, H), Image.LANCZOS), np.float32) * 0.7
    return out


def hex_grid(c1, c2, line, hi, seed=0):
    S = 2
    base = linear(c1, c2, 200)
    im = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").resize((W * S, H * S), Image.LANCZOS).convert("RGBA")
    over = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    rng = np.random.default_rng(seed)
    r = 120 * S
    dx, dy = math.sqrt(3) * r, 1.5 * r
    lc = tuple(int(v) for v in hexc(line)) + (110,)
    hc = tuple(int(v) for v in hexc(hi))
    row = 0
    y = -r
    while y < H * S + r:
        x = -dx + (dx / 2 if row % 2 else 0)
        while x < W * S + dx:
            pts = [(x + r * math.cos(math.radians(60 * k - 30)), y + r * math.sin(math.radians(60 * k - 30))) for k in range(6)]
            if rng.random() < 0.16:
                d.polygon(pts, fill=hc + (int(rng.uniform(30, 90)),))
            d.line(pts + [pts[0]], fill=lc, width=3 * S)
            x += dx
        y += dy
        row += 1
    im = Image.alpha_composite(im, over).convert("RGB")
    return np.asarray(im.resize((W, H), Image.LANCZOS), np.float32)


def low_poly(c1, c2, c3, seed, cols=8, rows=18):
    S = 2
    rng = np.random.default_rng(seed)
    cw, ch = W / cols, H / rows
    pts = [[(i * cw + (rng.uniform(-.32, .32) * cw if 0 < i < cols else 0),
             j * ch + (rng.uniform(-.32, .32) * ch if 0 < j < rows else 0)) for i in range(cols + 1)] for j in range(rows + 1)]
    im = Image.new("RGB", (W * S, H * S))
    d = ImageDraw.Draw(im)
    a, b, c = hexc(c1), hexc(c2), hexc(c3)

    def colour(x, y):
        t = np.clip((y / H) * 0.85 + (x / W) * 0.15, 0, 1)
        base = (a * (1 - t * 2) + b * (t * 2)) if t < .5 else (b * (1 - (t - .5) * 2) + c * ((t - .5) * 2))
        return tuple(int(v) for v in np.clip(base * rng.uniform(0.9, 1.1), 0, 255))

    for j in range(rows):
        for i in range(cols):
            p1, p2, p3, p4 = pts[j][i], pts[j][i + 1], pts[j + 1][i], pts[j + 1][i + 1]
            tris = [(p1, p2, p3), (p2, p4, p3)] if (i + j) % 2 else [(p1, p2, p4), (p1, p4, p3)]
            for tri in tris:
                cx = sum(p[0] for p in tri) / 3
                cy = sum(p[1] for p in tri) / 3
                col = colour(cx, cy)
                d.polygon([(x * S, y * S) for x, y in tri], fill=col, outline=col)
    return np.asarray(im.resize((W, H), Image.LANCZOS), np.float32)


# ----------------------------------------------------------------- list
# (slug, title, category, seed, function returning the image)
# ---------------------------------------------------------------- pack 3: quotes + festivals
from PIL import ImageFont
FONT_DIR = "/usr/share/fonts/opentype/inter/"
SERIF = "/usr/share/fonts/truetype/crosextra/Caladea-Italic.ttf"


def _font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def with_quote(base, text, color="#ffffff", style="sans", y=0.34, size=118, small=None, opacity=0.95):
    """Draw an original short line of text, centred, on top of a float RGB base image."""
    im = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB").convert("RGBA")
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    path = SERIF if style == "serif" else FONT_DIR + ("Inter-Light.otf" if style == "light" else "Inter-SemiBold.otf")
    f = _font(path, size)
    col = tuple(int(v) for v in hexc(color)) + (int(255 * opacity),)
    lines = text.split("\n")
    lh = int(size * 1.28)
    top = int(H * y) - lh * len(lines) // 2
    for i, ln in enumerate(lines):
        w = d.textlength(ln, font=f)
        d.text(((W - w) / 2, top + i * lh), ln, font=f, fill=col)
    if small:
        f2 = _font(FONT_DIR + "Inter-Medium.otf", 44)
        w = d.textlength(small, font=f2)
        d.text(((W - w) / 2, top + len(lines) * lh + 50), small, font=f2, fill=col[:3] + (int(255 * opacity * 0.6),))
    return np.array(Image.alpha_composite(im, layer).convert("RGB"), dtype=np.float32)


def glow_dots(seed, n, colors, rmin, rmax, blur, alpha=0.8, region=(0, 1)):
    rng = np.random.default_rng(seed)
    layer = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(n):
        r = rng.uniform(rmin, rmax)
        x, y = rng.uniform(0, W), rng.uniform(region[0], region[1]) * H
        c = hexc(colors[rng.integers(len(colors))]) * rng.uniform(0.5, 1.0) * alpha
        d.ellipse([x - r, y - r, x + r, y + r], fill=tuple(int(v) for v in c))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    return np.array(layer, dtype=np.float32)


def screen(a, b):
    return 255 - (255 - a) * (255 - np.clip(b, 0, 255)) / 255


def q_over(base_fn, **kw):
    return lambda: with_quote(base_fn(), **kw)


def diwali_glow():
    base = linear("#2a0505", "#8a2a05", 0, c3="#1a0303")
    g = glow_dots(5, 70, ["#ffb347", "#ffd27a", "#ff8c1a"], 6, 26, 7, 0.9, (0.05, 0.95))
    g2 = glow_dots(6, 14, ["#ffcf70", "#ffa930"], 40, 90, 30, 0.8, (0.1, 0.9))
    return screen(screen(base, g), g2)


def diya():
    base = mesh(["#12040a", "#3a0d12", "#0a0203"], [(.5, .45), (.5, .75), (.5, .1)], power=2.0)
    cx, cy = 0.5 * W, 0.56 * H
    # flame glow
    d2 = ((XX - cx) / 520) ** 2 + ((YY - cy) / 620) ** 2
    base = screen(base, np.exp(-d2 * 2.2)[..., None] * hexc("#ff9a2a") * 0.55)
    # flame (teardrop)
    t = (YY - (cy - 190)) / 190.0
    wd = 62 * np.sin(np.clip(t, 0, 1) * np.pi * 0.95) ** 0.85 * (1 - 0.15 * np.clip(t, 0, 1))
    flame = smooth(1.6, 0.0, np.abs(XX - cx) / np.maximum(wd, 1)) * ((t > 0) & (t < 1.05))
    core = np.clip(flame ** 2.2, 0, 1)[..., None]
    fcol = hexc("#ff7a18") * (1 - core) + hexc("#fff3b0") * core
    base = base * (1 - flame[..., None]) + fcol * flame[..., None]
    # bowl
    bx, by = (XX - cx) / 250, (YY - (cy + 20)) / 120
    inside = (bx ** 2 + by ** 2 < 1) & (by > 0)
    shade = np.clip(0.55 + 0.45 * (1 - by), 0, 1)[..., None]
    bowl = hexc("#c2571a") * shade + hexc("#ffb15c") * np.clip(0.4 - np.abs(bx + 0.35), 0, 1)[..., None] * 0.9
    m = inside[..., None]
    base = np.where(m, bowl, base)
    rim = (np.abs(by) < 0.03) & (np.abs(bx) < 1)
    base = np.where(rim[..., None], hexc("#ffcf80"), base)
    return base


def mandala():
    cx, cy = W / 2, H * 0.5
    dx, dy = XX - cx, YY - cy
    r = np.sqrt(dx * dx + dy * dy)
    th = np.arctan2(dy, dx)
    base = mesh(["#2b0a3d", "#7a1530", "#12061f"], [(.5, .5), (.2, .8), (.8, .1)], power=2.0)
    pat = np.zeros_like(r)
    for k, (n, r0, amp, wd) in enumerate([(12, 170, 42, 5), (16, 300, 58, 5), (24, 440, 70, 4), (12, 560, 90, 6), (32, 680, 40, 3)]):
        rr = r0 + amp * np.abs(np.cos(n / 2 * th))
        pat += smooth(wd, 0, np.abs(r - rr))
    pat += smooth(4, 0, np.abs(r - 760)) + smooth(4, 0, np.abs(r - 790)) * 0.7
    pat += smooth(30, 0, r - 0) * 0.0
    pat = np.clip(pat, 0, 1)[..., None]
    gold = hexc("#ffc857")
    base = base * (1 - pat * 0.9) + gold * pat * 0.9
    base = screen(base, np.exp(-(r / 220) ** 2)[..., None] * hexc("#ffb347") * 0.5)
    return base


def holi():
    base = mesh(["#ff2e93", "#ffd400", "#00c2ff", "#7b2ff7", "#2ee6a6"], [(.15, .1), (.85, .25), (.2, .6), (.85, .75), (.4, .95)], power=2.0)
    g = glow_dots(11, 28, ["#ff2e93", "#ffd400", "#00c2ff", "#7b2ff7", "#2ee6a6", "#ff7a00"], 40, 150, 22, 0.55)
    return np.clip(base * 0.8 + g * 0.55, 0, 255)


def snowfall():
    base = linear("#0b2a3a", "#16543f", 0, c3="#081a24")
    s1 = glow_dots(21, 260, ["#ffffff"], 3, 9, 1.5, 0.9)
    s2 = glow_dots(22, 40, ["#ffffff"], 12, 26, 9, 0.7)
    return screen(base, s1 * 0.9 + s2)


def fireworks():
    rng = np.random.default_rng(31)
    base = linear("#050818", "#140a30", 0)
    layer = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(layer)
    cols = ["#ff5d8f", "#ffd166", "#6ee7ff", "#b48cff", "#7dffb3"]
    for cx, cy, R in [(.3, .22, 330), (.72, .35, 420), (.4, .62, 360), (.78, .75, 280)]:
        c = hexc(cols[rng.integers(len(cols))])
        for a in np.linspace(0, 2 * np.pi, 46, endpoint=False):
            for t in np.linspace(0.35, 1, 11):
                rr = R * t
                x, y = cx * W + np.cos(a) * rr, cy * H + np.sin(a) * rr + (t ** 3) * 30
                s = 5 * (1.1 - t) + 1.5
                d.ellipse([x - s, y - s, x + s, y + s], fill=tuple(int(v * (1.1 - t * 0.6)) for v in c))
    layer = layer.filter(ImageFilter.GaussianBlur(2.2))
    glow = layer.filter(ImageFilter.GaussianBlur(24))
    return screen(screen(base, np.array(glow, np.float32) * 1.6), np.array(layer, np.float32))


def lanterns():
    base = linear("#0a1233", "#4a1d5a", 0, c3="#e0653a")
    rng = np.random.default_rng(41)
    layer = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(26):
        x, y = rng.uniform(0.05, 0.95) * W, rng.uniform(0.08, 0.92) * H
        w = rng.uniform(34, 90)
        h = w * 1.3
        c = hexc(["#ffb347", "#ff8c42", "#ffd27a"][rng.integers(3)]) * rng.uniform(0.7, 1)
        d.rounded_rectangle([x - w / 2, y - h / 2, x + w / 2, y + h / 2], radius=w * 0.35, fill=tuple(int(v) for v in c))
    glow = layer.filter(ImageFilter.GaussianBlur(26))
    soft = layer.filter(ImageFilter.GaussianBlur(1.2))
    return screen(screen(base, np.array(glow, np.float32) * 1.4), np.array(soft, np.float32))


def crescent():
    base = mesh(["#041c24", "#0b4a52", "#020b10"], [(.5, .3), (.2, .8), (.85, .9)], power=2.0)
    cx, cy, R = 0.5 * W, 0.36 * H, 300
    a = ((XX - cx) ** 2 + (YY - cy) ** 2) < R * R
    b = ((XX - cx - 95) ** 2 + (YY - cy - 30) ** 2) < (R * 0.86) ** 2
    cr = (a & ~b).astype(np.float32)
    cr = np.array(Image.fromarray((cr * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6)), np.float32) / 255
    glow = np.array(Image.fromarray((cr * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(60)), np.float32) / 255
    base = screen(base, glow[..., None] * hexc("#ffd98a") * 0.7)
    base = base * (1 - cr[..., None]) + hexc("#ffe7a8") * cr[..., None]
    st = stars(8, 260, 1.8)[..., None] * 255
    return screen(base, st)



# ---------------------------------------------------------------- pack 4: anime-style skies + cars
def _poly_mask(points, scale=2, blur=0.0):
    """Anti-aliased polygon mask (points in pixels)."""
    im = Image.new("L", (W * scale, H * scale), 0)
    ImageDraw.Draw(im).polygon([(x * scale, y * scale) for x, y in points], fill=255)
    im = im.resize((W, H), Image.LANCZOS)
    if blur:
        im = im.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(im, np.float32)[..., None] / 255


def _skyline(seed, base_y, min_h, max_h, color, win=None, layers=1):
    rng = np.random.default_rng(seed)
    img = Image.new("RGBA", (W * 2, H * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    x = -20
    col = tuple(int(v) for v in hexc(color)) + (255,)
    while x < W:
        bw = rng.integers(int(W * 0.04), int(W * 0.10))
        bh = rng.uniform(min_h, max_h) * H
        top = base_y * H - bh
        d.rectangle([x * 2, top * 2, (x + bw) * 2, H * 2], fill=col)
        if rng.random() < 0.35:
            d.rectangle([(x + bw * 0.45) * 2, (top - bh * 0.12) * 2, (x + bw * 0.55) * 2, top * 2], fill=col)
        if win:
            wc = tuple(int(v) for v in hexc(win)) + (230,)
            for yy in np.arange(top + 30, base_y * H, 34):
                for xx in np.arange(x + 14, x + bw - 14, 26):
                    if rng.random() < 0.18:
                        d.rectangle([xx * 2, yy * 2, (xx + 9) * 2, (yy + 14) * 2], fill=wc)
        x += bw + rng.integers(0, 6)
    small = img.resize((W, H), Image.LANCZOS)
    a = np.asarray(small, np.float32)
    return a[..., :3], a[..., 3:4] / 255


def anime_sunset():
    base = linear("#3a2a7a", "#ff9a8b", 0, c3="#ffd6a5")
    base = mesh(["#2b2d7a", "#ff7e8b", "#ffd29a"], [(.5, .0), (.4, .7), (.5, .62)], power=1.6)
    sun_y = 0.60
    base = add_disc(base, "#fff2c9", 0.5, sun_y, 0.11, halo=0.55, spread=0.18)
    c = fbm(7, 5, 3, 0.55)
    cl = smooth(0.52, 0.72, c) * (1 - smooth(0.62, 0.9, NY))
    cl = cl * (1 - np.exp(-(((NX - 0.5) * W / H) ** 2 + (NY - sun_y) ** 2) / 0.012))
    lit = np.clip(1.0 - np.abs(NY - sun_y) * 2.2, 0, 1)[..., None]
    ccol = hexc("#ff9fa8") * (1 - lit) + hexc("#ffe2b8") * lit
    base = base * (1 - cl[..., None] * 0.85) + ccol * cl[..., None] * 0.85
    rgb, a = _skyline(5, 1.0, 0.05, 0.16, "#150c2e", win="#ffd27a")
    far, fa = _skyline(9, 0.93, 0.04, 0.10, "#4a2a62")
    base = base * (1 - fa) + far * fa
    return base * (1 - a) + rgb * a


def anime_starry_torii():
    base = linear("#050a2a", "#2d3a8c", 0, c3="#e07aa0")
    base = screen(base, stars(12, 700, 1.7)[..., None] * 255 * (1 - smooth(0.4, 0.8, NY))[..., None])
    base = add_disc(base, "#fff4d6", 0.72, 0.18, 0.05, halo=0.3, spread=0.035)
    # hills
    ridge = 0.80 + 0.05 * np.sin(NX * 5.2 + 1.0) + 0.02 * np.sin(NX * 13 + 2)
    hill = smooth(0.003, -0.003, ridge - NY)[..., None]
    base = base * (1 - hill) + hexc("#0a0d22") * hill
    # torii gate
    u = min(W, H) * 0.30
    cx = 0.5 * W
    gy = float(np.interp(0.5, [0, 1], [1, 1]) * 0) + (0.80 + 0.05 * np.sin(0.5 * 5.2 + 1.0) + 0.02 * np.sin(0.5 * 13 + 2)) * H
    gate = (
        [(cx - u * .95, gy - u * 1.75), (cx + u * .95, gy - u * 1.75), (cx + u * 1.1, gy - u * 1.9), (cx - u * 1.1, gy - u * 1.9)],
        [(cx - u * .75, gy - u * 1.45), (cx + u * .75, gy - u * 1.45), (cx + u * .75, gy - u * 1.33), (cx - u * .75, gy - u * 1.33)],
        [(cx - u * .62, gy + u * .1), (cx - u * .50, gy + u * .1), (cx - u * .50, gy - u * 1.75), (cx - u * .62, gy - u * 1.75)],
        [(cx + u * .50, gy + u * .1), (cx + u * .62, gy + u * .1), (cx + u * .62, gy - u * 1.75), (cx + u * .50, gy - u * 1.75)],
    )
    m = np.zeros((H, W, 1), np.float32)
    for poly in gate:
        m = np.maximum(m, _poly_mask(poly))
    base = base * (1 - m) + hexc("#d83a3a") * m * 0.0 + hexc("#06081a") * m
    # warm rim from the horizon behind the gate
    return base


def anime_sakura():
    base = mesh(["#8ec5fc", "#e0c3fc", "#ffd1e8"], [(.5, .0), (.2, .55), (.7, .95)], power=1.8)
    c = fbm(21, 5, 3, 0.55)
    cl = smooth(0.55, 0.74, c)[..., None]
    base = base * (1 - cl * 0.8) + hexc("#ffffff") * cl * 0.8
    rng = np.random.default_rng(23)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(170):
        x, y = rng.uniform(0, W), rng.uniform(0, H)
        r = rng.uniform(7, 22) * (1 + 0.6 * rng.random())
        ang = rng.uniform(0, 180)
        p = Image.new("RGBA", (int(r * 4), int(r * 4)), (0, 0, 0, 0))
        ImageDraw.Draw(p).ellipse([r * 0.9, r * 1.4, r * 3.1, r * 2.6], fill=(255, int(rng.uniform(170, 205)), int(rng.uniform(205, 225)), int(rng.uniform(170, 240))))
        p = p.rotate(ang, resample=Image.BICUBIC)
        layer.alpha_composite(p, (int(x - r * 2), int(y - r * 2))) if 0 <= x - r * 2 < W - r * 4 and 0 <= y - r * 2 < H - r * 4 else None
    layer = layer.filter(ImageFilter.GaussianBlur(0.8))
    a = np.asarray(layer, np.float32)
    return base * (1 - a[..., 3:4] / 255) + a[..., :3] * a[..., 3:4] / 255


def car_neon_highway():
    base = linear("#10002b", "#ff4d8d", 0, c3="#ffb36b")
    vy, vx = 0.50, 0.5
    # skyline glow at the horizon
    rgb, a = _skyline(3, vy, 0.02, 0.07, "#12002e", win="#ff9ad0")
    base = base * (1 - a) + rgb * a
    ground = (NY > vy)[..., None]
    road = np.zeros((H, W, 1), np.float32)
    t = np.clip((NY - vy) / (1 - vy), 1e-4, 1)
    half = 0.04 + 0.62 * t
    inside = (np.abs(NX - vx) < half) & (NY > vy)
    base = np.where(ground, hexc("#07030f"), base)
    base = np.where(inside[..., None], hexc("#14091f") * (0.6 + 0.8 * t[..., None]), base)
    # edge lines and centre dashes
    for off, col, wd in [(-1, "#ff4fa3", 0.012), (1, "#37e6ff", 0.012)]:
        e = np.abs(NX - (vx + off * half)) / np.maximum(half, 1e-3) < wd * 2.2
        e &= NY > vy
        base = np.where(e[..., None], base * 0.2 + hexc(col) * 0.9, base)
    depth = 1.0 / np.maximum(t, 1e-3)
    dash = ((depth * 0.35) % 1.0) < 0.5
    cen = (np.abs(NX - vx) < (0.004 + 0.012 * t)) & dash & (NY > vy + 0.01)
    base = np.where(cen[..., None], hexc("#ffe9a8"), base)
    # tail lights ahead
    for dx in (-0.05, 0.05):
        base = add_disc(base, "#ff2d3d", vx + dx, vy + 0.19, 0.012, halo=0.8, spread=0.05)
    return base


def car_bokeh():
    base = linear("#05060f", "#1a0a1a", 0)
    g = glow_dots(51, 60, ["#ff2a3a", "#ff6a2a", "#ffd9a0", "#ff2a6a"], 18, 70, 9, 0.85, (0.35, 0.95))
    g2 = glow_dots(52, 20, ["#ffffff", "#ffe3b0"], 10, 34, 6, 0.8, (0.45, 0.9))
    g3 = glow_dots(53, 8, ["#ff2a3a", "#ff7a3a"], 90, 170, 40, 0.7, (0.5, 0.95))
    return screen(screen(screen(base, g), g2), g3)


def car_speed():
    rng = np.random.default_rng(61)
    base = mesh(["#02030a", "#0a1a4a", "#02030a"], [(.5, .5), (.5, .5), (.1, .1)], power=2.0)
    layer = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = W / 2, H * 0.5
    cols = ["#6ee7ff", "#ffffff", "#7aa7ff", "#ff6ad5"]
    for _ in range(260):
        a = rng.uniform(0, math.tau)
        r0 = rng.uniform(0.04, 0.5) * max(W, H)
        r1 = r0 + rng.uniform(0.08, 0.35) * max(W, H)
        c = hexc(cols[rng.integers(len(cols))]) * rng.uniform(0.35, 1)
        d.line([cx + math.cos(a) * r0, cy + math.sin(a) * r0, cx + math.cos(a) * r1, cy + math.sin(a) * r1], fill=tuple(int(v) for v in c), width=int(rng.integers(2, 6)))
    layer = layer.filter(ImageFilter.GaussianBlur(1.4))
    arr = np.asarray(layer, np.float32)
    glow = np.asarray(layer.filter(ImageFilter.GaussianBlur(18)), np.float32)
    out = screen(screen(base, arr), glow * 1.2)
    return add_disc(out, "#bfe9ff", 0.5, 0.5, 0.012, halo=0.6, spread=0.07)


def car_silhouette():
    base = mesh(["#2b1055", "#ff6a5a", "#ffc28a"], [(.5, .0), (.5, .62), (.5, .52)], power=1.7)
    base = add_disc(base, "#fff0c4", 0.5, 0.52, 0.10, halo=0.5, spread=0.16)
    hy = 0.62
    ground = (NY > hy)[..., None]
    base = np.where(ground, hexc("#0c0714") * (0.6 + 0.4 * (1 - (NY - hy)[..., None] / (1 - hy))), base)
    carw = min(0.92 * W, 1.05 * H)
    x0 = W / 2 - carw / 2
    gy = (hy + 0.07) * H
    pts = [(0.02, .09), (0.02, .19), (0.12, .24), (0.27, .26), (0.36, .35), (0.50, .385), (0.62, .37),
           (0.72, .27), (0.90, .23), (0.98, .17), (0.98, .09)]
    poly = [(x0 + x * carw, gy - y * carw) for x, y in pts]
    m = _poly_mask(poly)
    for wx in (0.22, 0.78):
        wr = 0.085 * carw
        yy, xx = YY - (gy - 0.09 * carw + 0), XX - (x0 + wx * carw)
        m = np.maximum(m, smooth(wr + 1.5, wr - 1.5, np.sqrt(xx * xx + yy * yy))[..., None])
    base = base * (1 - m) + hexc("#05030a") * m
    # rim light along the roofline + wheel rings
    rim = Image.new("L", (W, H), 0)
    dr = ImageDraw.Draw(rim)
    dr.line(poly[3:9], fill=255, width=max(2, int(carw * 0.004)))
    rim = np.asarray(rim.filter(ImageFilter.GaussianBlur(1.2)), np.float32)[..., None] / 255
    base = base + rim * hexc("#ffb88a") * 0.9 * m
    for wx in (0.22, 0.78):
        wr = 0.085 * carw
        yy, xx = YY - (gy - 0.09 * carw), XX - (x0 + wx * carw)
        ring = smooth(2.5, 0, np.abs(np.sqrt(xx * xx + yy * yy) - wr * 0.62))[..., None]
        base = base + ring * hexc("#3a3550") * 0.9
    base = add_disc(base, "#fff1cf", (x0 + 0.97 * carw) / W, (gy - 0.17 * carw) / H, 0.006, halo=0.7, spread=0.05)
    base = add_disc(base, "#ff2d3d", (x0 + 0.03 * carw) / W, (gy - 0.18 * carw) / H, 0.006, halo=0.7, spread=0.05)
    # soft reflection glow on the ground
    refl = np.exp(-((YY - (gy + 0.01 * H)) / (0.03 * H)) ** 2) * np.exp(-((XX - W / 2) / (0.45 * carw)) ** 2)
    return base + refl[..., None] * hexc("#ff9a6a") * 0.18


# ---------------------------------------------------------------- pack 5: more anime-style scenes (all original art)
def _rain(seed, n, color="#cfe3ff", length=0.06, slant=0.18, alpha=0.5):
    rng = np.random.default_rng(seed)
    im = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(im)
    c = hexc(color)
    for _ in range(n):
        x, y = rng.uniform(-0.1 * W, W), rng.uniform(0, H)
        l = length * H * rng.uniform(0.5, 1.2)
        v = rng.uniform(0.35, 1.0)
        d.line([x, y, x + l * slant, y + l], fill=tuple(int(k * v * alpha) for k in c), width=int(rng.integers(1, 4)))
    return np.asarray(im.filter(ImageFilter.GaussianBlur(0.8)), np.float32)


def _mirror_ground(base, y0):
    """Wet-street reflection: flip what is above y0, blur it, fade it in."""
    gy = int(y0 * H)
    out = base.copy()
    n = H - gy
    src = base[max(0, gy - n):gy][::-1]
    if src.shape[0] < n:
        src = np.concatenate([src, np.repeat(src[-1:], n - src.shape[0], axis=0)])
    refl = np.asarray(Image.fromarray(np.clip(src, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(9)), np.float32)
    fade = np.linspace(0.65, 0.12, n)[:, None, None]
    ripple = 1 + 0.15 * np.sin(np.arange(n)[:, None, None] * 0.9)
    out[gy:] = base[gy:] * (1 - fade) + refl * fade * ripple
    return out


def anime_rain_neon():
    base = mesh(["#0a0420", "#3a1470", "#ff4fa3"], [(.5, .0), (.3, .5), (.6, .84)], power=1.7)
    base = screen(base, np.exp(-(((NX - .5) * W / H) ** 2 / 0.25 + (NY - .8) ** 2 / 0.03))[..., None] * hexc("#ff5bb0") * 0.45)
    far, fa = _skyline(14, 0.88, 0.10, 0.34, "#2b1052", win="#ff9ad0")
    base = base * (1 - fa) + far * fa
    near, na = _skyline(15, 0.88, 0.05, 0.20, "#0c0520", win="#7ae8ff")
    base = base * (1 - na) + near * na
    # neon signs
    for sx, sy, c in [(.2, .62, "#00e5ff"), (.72, .55, "#ff2d95"), (.45, .7, "#ffe14d"), (.86, .72, "#00e5ff")]:
        d = ((NX - sx) * W / H) ** 2 * 60 + ((NY - sy) / 1.0) ** 2 * 900
        base = screen(base, np.exp(-d)[..., None] * hexc(c) * 0.9)
    base = _mirror_ground(base, 0.88)
    base = screen(base, _rain(16, 520, "#cfe3ff"))
    return base * (1 - 0.15 * smooth(0.6, 1.0, NY)[..., None])


def anime_moon_rooftops():
    base = mesh(["#071a3a", "#1f4e8a", "#e9b6a0"], [(.5, .0), (.5, .55), (.5, .95)], power=1.6)
    base = screen(base, stars(41, 500, 1.6)[..., None] * 255 * (1 - smooth(0.2, 0.6, NY))[..., None])
    base = add_disc(base, "#fff6dc", 0.5, 0.36, 0.17, halo=0.45, spread=0.2)
    # rooftops (pitched roofs)
    rng = np.random.default_rng(42)
    m = np.zeros((H, W, 1), np.float32)
    x = -0.05 * W
    while x < W:
        bw = rng.uniform(0.18, 0.34) * W
        top = rng.uniform(0.80, 0.9) * H
        pk = rng.uniform(0.05, 0.10) * H
        m = np.maximum(m, _poly_mask([(x, H), (x, top), (x + bw / 2, top - pk), (x + bw, top), (x + bw, H)]))
        x += bw * rng.uniform(0.8, 1.0)
    base = base * (1 - m) + hexc("#060a18") * m
    # power lines
    lines = Image.new("L", (W * 2, H * 2), 0)
    d = ImageDraw.Draw(lines)
    for k, (y0, sag) in enumerate([(0.62, 0.05), (0.66, 0.06), (0.70, 0.05)]):
        pts = [(xx * 2, (y0 + sag * math.sin(math.pi * xx / W) ** 1) * H * 2 - (0.03 * H * 2)) for xx in np.linspace(-10, W + 10, 80)]
        d.line(pts, fill=255, width=3)
    for px in (0.12, 0.88):
        d.rectangle([px * W * 2 - 8, 0.55 * H * 2, px * W * 2 + 8, H * 2], fill=255)
        d.rectangle([px * W * 2 - 60, 0.60 * H * 2, px * W * 2 + 60, 0.60 * H * 2 + 10], fill=255)
    la = np.asarray(lines.resize((W, H), Image.LANCZOS), np.float32)[..., None] / 255
    return base * (1 - la) + hexc("#040712") * la


def anime_sakura_tunnel():
    base = mesh(["#2a0b3a", "#ff8fb8", "#ffe3ee"], [(.1, .1), (.5, .55), (.5, .5)], power=1.5)
    r = np.sqrt(((NX - .5) * W / H) ** 2 + (NY - .5) ** 2)
    base = screen(base, np.exp(-(r / 0.16) ** 2)[..., None] * hexc("#fff5e6") * 0.9)
    # canopy of blossoms: dense blurred dots toward the edges
    far = glow_dots(71, 260, ["#ff9fc4", "#ffc2d9", "#ff7aa8"], 18, 60, 10, 0.7)
    mid = glow_dots(72, 90, ["#ffd1e3", "#ffffff", "#ff9fc4"], 40, 120, 20, 0.7)
    edge = (smooth(0.18, 0.7, r))[..., None]
    base = screen(base * (1 - 0.35 * edge), (far + mid) * edge)
    # falling petals
    rng = np.random.default_rng(73)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    for _ in range(140):
        x, y = rng.uniform(0, W), rng.uniform(0, H)
        s = rng.uniform(8, 22)
        p = Image.new("RGBA", (int(s * 4), int(s * 4)), (0, 0, 0, 0))
        ImageDraw.Draw(p).ellipse([s * 0.8, s * 1.3, s * 3.2, s * 2.7], fill=(255, 215, 230, int(rng.uniform(150, 240))))
        p = p.rotate(rng.uniform(0, 180), resample=Image.BICUBIC)
        if 0 <= x < W - s * 4 and 0 <= y < H - s * 4:
            layer.alpha_composite(p, (int(x), int(y)))
    a = np.asarray(layer, np.float32)
    return base * (1 - a[..., 3:4] / 255) + a[..., :3] * a[..., 3:4] / 255


def anime_star_train():
    base = mesh(["#03061f", "#1b2a6b", "#6b4aa0"], [(.5, .0), (.3, .55), (.7, .85)], power=1.7)
    band = np.exp(-(((NX - .5) * W / H * 0.7 + (NY - .4) * 0.9) ** 2) / 0.012)
    cloud = fbm(81, 5, 3, 0.6)
    base = screen(base, (band * (0.25 + 0.6 * cloud))[..., None] * hexc("#9fb4ff") * 0.7)
    base = screen(base, stars(82, 1400, 1.8)[..., None] * 255)
    # hills + train
    ridge = 0.80 + 0.03 * np.sin(NX * 6 + 1) + 0.015 * np.sin(NX * 17)
    hill = smooth(0.003, -0.003, ridge - NY)[..., None]
    base = base * (1 - hill) + hexc("#05071a") * hill
    ty = 0.80 * H
    cars = []
    cw = 0.17 * W
    x = -0.05 * W
    while x < W:
        cars.append(_poly_mask([(x, ty - 0.035 * H), (x + cw, ty - 0.035 * H), (x + cw, ty), (x, ty)]))
        x += cw + 0.01 * W
    m = np.max(cars, axis=0)
    base = base * (1 - m) + hexc("#0a0d26") * m
    # lit windows
    win = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(win)
    xx = 0.0
    while xx < W:
        d.rectangle([xx, ty - 0.028 * H, xx + 0.022 * W, ty - 0.012 * H], fill=255)
        xx += 0.04 * W
    win = np.asarray(win.filter(ImageFilter.GaussianBlur(1.2)), np.float32)[..., None] / 255
    base = base * (1 - win) + hexc("#ffd98a") * win
    # shooting star
    st = Image.new("RGB", (W, H), (0, 0, 0))
    ImageDraw.Draw(st).line([0.25 * W, 0.12 * H, 0.55 * W, 0.2 * H], fill=(255, 255, 255), width=4)
    st = np.asarray(st.filter(ImageFilter.GaussianBlur(2)), np.float32)
    return screen(base, st)


def anime_summer_clouds():
    base = linear("#bfe8ff", "#2b8cff", 0)
    sun = np.exp(-(((NX - .78) * W / H) ** 2 + (NY - .12) ** 2) / 0.04)[..., None]
    base = screen(base, sun * hexc("#fff3c8") * 0.55)
    c = fbm(91, 5, 3, 0.58)
    c2 = fbm(92, 5, 2, 0.6)
    cl = smooth(0.50, 0.70, c * (0.7 + 0.5 * NY ** 0.5))[..., None]
    shade = (0.78 + 0.22 * smooth(0.45, 0.75, c2))[..., None]
    base = base * (1 - cl) + (hexc("#ffffff") * shade * 0.97 + hexc("#8fb2ff") * (1 - shade)) * cl
    hill = (NY > 0.86 + 0.03 * np.sin(NX * 4 + 2))[..., None]
    grass = hexc("#3aa85a") * (0.8 + 0.4 * NX[..., None])
    base = np.where(hill, grass, base)
    # utility pole
    u = min(W, H)
    pole = np.zeros((H, W, 1), np.float32)
    px = 0.22 * W
    pole = np.maximum(pole, _poly_mask([(px - 7, H), (px - 7, 0.40 * H), (px + 7, 0.40 * H), (px + 7, H)]))
    pole = np.maximum(pole, _poly_mask([(px - 0.12 * W, 0.44 * H), (px + 0.12 * W, 0.44 * H), (px + 0.12 * W, 0.45 * H), (px - 0.12 * W, 0.45 * H)]))
    return base * (1 - pole) + hexc("#10203a") * pole


def anime_firefly_forest():
    base = mesh(["#02130f", "#0f3d33", "#020807"], [(.5, .15), (.5, .55), (.5, 1.0)], power=1.8)
    rng = np.random.default_rng(101)
    for layer_i, (col, base_y, hmin, hmax) in enumerate([("#0a2a24", 1.0, 0.18, 0.34), ("#05181a", 1.0, 0.10, 0.26), ("#020a0c", 1.0, 0.05, 0.16)]):
        m = np.zeros((H, W, 1), np.float32)
        x = -0.03 * W
        while x < W:
            tw = rng.uniform(0.06, 0.12) * W
            th = rng.uniform(hmin, hmax) * H
            ytop = base_y * H - th
            for k in range(4):
                yy = ytop + th * k / 4
                ww = tw * (0.35 + 0.22 * k)
                m = np.maximum(m, _poly_mask([(x + tw / 2 - ww / 2, yy + th * 0.34), (x + tw / 2, yy), (x + tw / 2 + ww / 2, yy + th * 0.34)]))
            x += tw * rng.uniform(0.55, 0.85)
        base = base * (1 - m) + hexc(col) * m
    ff = glow_dots(102, 70, ["#d9ff6a", "#aaff4d", "#fff6a0"], 4, 11, 4, 0.95, (0.35, 0.95))
    ff2 = glow_dots(103, 40, ["#d9ff6a", "#fff6a0"], 10, 22, 14, 0.7, (0.4, 0.95))
    return screen(screen(base, ff), ff2)


def anime_fuji_dawn():
    base = mesh(["#2d3a8c", "#ff9aa2", "#ffe3b3"], [(.5, .0), (.5, .5), (.5, .62)], power=1.6)
    base = add_disc(base, "#fff0c4", 0.5, 0.43, 0.08, halo=0.5, spread=0.14)
    cx, bot = 0.5 * W, 0.62 * H
    mw, mh = 0.9 * W, 0.34 * H
    poly = [(cx - mw / 2, bot), (cx - mw * 0.09, bot - mh), (cx + mw * 0.09, bot - mh), (cx + mw / 2, bot)]
    m = _poly_mask(poly)
    grad = linear("#2a2f6b", "#6a5aa8", 0)
    snow = _poly_mask([(cx - mw * 0.09, bot - mh), (cx + mw * 0.09, bot - mh), (cx + mw * 0.15, bot - mh * 0.78), (cx + mw * 0.07, bot - mh * 0.84), (cx, bot - mh * 0.74), (cx - mw * 0.08, bot - mh * 0.83), (cx - mw * 0.15, bot - mh * 0.78)])
    base = base * (1 - m) + grad * m
    base = base * (1 - snow) + hexc("#fff4f0") * snow
    # far hills + lake
    hill = (NY > bot / H + 0.0 * NX)[..., None]
    base = np.where(hill, hexc("#34457f"), base)
    base = _mirror_ground(np.where(hill, base, base), 0.62)
    return base


def anime_snow_village():
    base = mesh(["#050c2e", "#1c2f78", "#5b7bd0"], [(.5, .0), (.5, .6), (.5, .9)], power=1.7)
    base = screen(base, stars(111, 420, 1.5)[..., None] * 255 * (1 - smooth(0.2, 0.55, NY))[..., None])
    base = add_disc(base, "#f4f8ff", 0.74, 0.17, 0.045, halo=0.4, spread=0.1)
    gy = 0.84 * H
    base = np.where((NY > 0.84)[..., None], hexc("#cfe0ff") * (0.55 + 0.35 * (NY[..., None] - 0.84) / 0.16), base)
    rng = np.random.default_rng(112)
    x = 0.02 * W
    wins = Image.new("L", (W, H), 0)
    wd = ImageDraw.Draw(wins)
    while x < W * 0.95:
        bw = rng.uniform(0.14, 0.24) * W
        bh = rng.uniform(0.07, 0.12) * H
        roof = rng.uniform(0.04, 0.07) * H
        m = _poly_mask([(x, gy), (x, gy - bh), (x + bw / 2, gy - bh - roof), (x + bw, gy - bh), (x + bw, gy)])
        base = base * (1 - m) + hexc("#0b1230") * m
        cap = _poly_mask([(x - 4, gy - bh + 4), (x + bw / 2, gy - bh - roof - 4), (x + bw + 4, gy - bh + 4), (x + bw, gy - bh + 12), (x + bw / 2, gy - bh - roof + 10), (x, gy - bh + 12)])
        base = base * (1 - cap * 0.9) + hexc("#f4f8ff") * cap * 0.9
        for k in range(2):
            wd.rectangle([x + bw * (0.2 + 0.4 * k), gy - bh * 0.7, x + bw * (0.34 + 0.4 * k), gy - bh * 0.3], fill=255)
        x += bw + rng.uniform(0.01, 0.05) * W
    wl = np.asarray(wins.filter(ImageFilter.GaussianBlur(1.0)), np.float32)[..., None] / 255
    wglow = np.asarray(wins.filter(ImageFilter.GaussianBlur(18)), np.float32)[..., None] / 255
    base = screen(base, wglow * hexc("#ff9a3c") * 0.8)
    base = base * (1 - wl) + hexc("#ffd27a") * wl
    s1 = glow_dots(113, 240, ["#ffffff"], 3, 8, 1.4, 0.95)
    s2 = glow_dots(114, 40, ["#ffffff"], 10, 22, 8, 0.7)
    return screen(base, s1 + s2)


def anime_cyber_alley():
    base = mesh(["#050816", "#20106a", "#00c8ff"], [(.5, .0), (.4, .5), (.6, .9)], power=1.8)
    far, fa = _skyline(121, 1.0, 0.30, 0.62, "#0a0a28", win="#00e5ff")
    base = base * (1 - fa) + far * fa
    near, na = _skyline(122, 1.0, 0.12, 0.34, "#05030f", win="#ff2d95")
    base = base * (1 - na) + near * na
    for sx, sy, wv, hv, c in [(.15, .5, 14, 380, "#ff2d95"), (.34, .35, 12, 520, "#00e5ff"), (.62, .45, 14, 420, "#b14dff"), (.84, .55, 12, 360, "#00e5ff")]:
        d = (((NX - sx) * W) / wv) ** 2 + (((NY - sy) * H) / hv) ** 2
        base = screen(base, np.exp(-d)[..., None] * hexc(c) * 0.95)
        base = screen(base, np.exp(-d / 40)[..., None] * hexc(c) * 0.28)
    base = _mirror_ground(base, 0.90)
    return screen(base, _rain(123, 420, "#9fe9ff", 0.05, 0.1, 0.4))


def anime_golden_clouds():
    base = mesh(["#3b2a7a", "#ff7a59", "#ffd28a"], [(.5, .0), (.5, .62), (.5, .8)], power=1.5)
    base = add_disc(base, "#fff1c9", 0.5, 0.66, 0.07, halo=0.55, spread=0.2)
    c = fbm(131, 5, 3, 0.58)
    cl = smooth(0.52, 0.70, c * (1.15 - 0.6 * NY))[..., None]
    warm = np.clip(1.0 - np.abs(NY - 0.62) * 2.0, 0, 1)[..., None]
    ccol = hexc("#8d5a9e") * (1 - warm) + hexc("#ffc29a") * warm
    base = base * (1 - cl * 0.9) + ccol * cl * 0.9
    sea = (NY > 0.82)[..., None]
    base = np.where(sea, hexc("#1b1442") * 0.6 + base * 0.25, base)
    # flock of birds
    bi = Image.new("L", (W * 2, H * 2), 0)
    d = ImageDraw.Draw(bi)
    rng = np.random.default_rng(132)
    for _ in range(9):
        x, y = rng.uniform(0.2, 0.8) * W, rng.uniform(0.25, 0.45) * H
        s = rng.uniform(14, 28)
        d.arc([(x - s) * 2, (y - s / 2) * 2, x * 2, (y + s / 2) * 2], 200, 340, fill=255, width=4)
        d.arc([x * 2, (y - s / 2) * 2, (x + s) * 2, (y + s / 2) * 2], 200, 340, fill=255, width=4)
    bm = np.asarray(bi.resize((W, H), Image.LANCZOS), np.float32)[..., None] / 255
    return base * (1 - bm) + hexc("#1a0f2e") * bm


# ---------------------------------------------------------------- pack 6: more original anime-style scenes
def _shape(cx, cy, pts):
    """Polygon mask from points given as pixel offsets from (cx, cy)."""
    return _poly_mask([(cx + x, cy + y) for x, y in pts])


def _paint(base, mask, color, opacity=1.0):
    return base * (1 - mask * opacity) + hexc(color) * mask * opacity


def _clouds(base, seed, lo, hi, tint, lit_y, lit="#ffe2b8", fade_from=0.62, strength=0.85, cut=None):
    c = fbm(seed, 5, 3, 0.55)
    cl = smooth(lo, hi, c) * (1 - smooth(fade_from, fade_from + 0.28, NY))
    if cut is not None:
        cl = cl * smooth(cut, cut - 0.02, NY)
    warm = np.clip(1.0 - np.abs(NY - lit_y) * 2.2, 0, 1)[..., None]
    col = hexc(tint) * (1 - warm) + hexc(lit) * warm
    return base * (1 - cl[..., None] * strength) + col * cl[..., None] * strength


def _lit_windows(base, wins, glow_col="#ff9a3c", win_col="#ffd27a"):
    wl = np.asarray(wins.filter(ImageFilter.GaussianBlur(1.0)), np.float32)[..., None] / 255
    wg = np.asarray(wins.filter(ImageFilter.GaussianBlur(18)), np.float32)[..., None] / 255
    base = screen(base, wg * hexc(glow_col) * 0.8)
    return base * (1 - wl) + hexc(win_col) * wl


def anime_hidden_village():
    k = min(W, H)
    base = mountains(201, ["#3b2a7a", "#ff8a6b", "#ffd7a0"], ["#7a4a86", "#4d2f66", "#2a1a4a"],
                     sun=("#fff0c8", 0.5, 0.48, 0.07), y_start=0.56, step=0.05, amp=0.08)
    gy = 0.86 * H
    base = np.where((NY > 0.86)[..., None], hexc("#150d2e"), base)
    rng = np.random.default_rng(202)
    wins = Image.new("L", (W, H), 0)
    wd = ImageDraw.Draw(wins)
    x = -0.03 * W
    while x < W:
        bw, bh, roof = rng.uniform(0.15, 0.24) * k, rng.uniform(0.08, 0.13) * k, rng.uniform(0.06, 0.10) * k
        base = _paint(base, _shape(x, gy, [(0, 0), (0, -bh), (bw, -bh), (bw, 0)]), "#150d2e")
        base = _paint(base, _shape(x, gy - bh, [(-0.02 * k, 0), (bw / 2, -roof), (bw + 0.02 * k, 0)]), "#0c0720")
        wd.rectangle([x + bw * 0.3, gy - bh * 0.7, x + bw * 0.5, gy - bh * 0.3], fill=255)
        x += bw + rng.uniform(0.02, 0.08) * k
    base = _lit_windows(base, wins)
    return screen(base, glow_dots(203, 22, ["#ff9a3c", "#ffcf7a"], 5, 10, 3, 0.9, region=(0.70, 0.85)))


def anime_sea_voyage():
    k = min(W, H)
    hz = 0.56
    base = ocean(["#2b2f8f", "#ff8f7a", "#ffe0b0"], "#fff1c9", "#6a4a9a", "#10153a", horizon=hz, sun_r=0.10)
    base = _clouds(base, 211, 0.55, 0.72, "#d08aa8", hz - 0.04, fade_from=hz - 0.08, strength=0.8, cut=hz)
    parts = [
        ([(-.32, -.05), (.34, -.05), (.24, .05), (-.22, .05)], "#120e2c"),
        ([(-.012, -.05), (.012, -.05), (.012, -.66), (-.012, -.66)], "#120e2c"),
        ([(.03, -.60), (.30, -.40), (.03, -.12)], "#2a1c4a"),
        ([(-.03, -.58), (-.27, -.38), (-.03, -.12)], "#2a1c4a"),
        ([(.0, -.66), (.0, -.74), (.11, -.70)], "#120e2c"),
    ]
    for fx, sc in [(0.30, 0.55), (0.76, 0.22)]:
        s, cx, cy = k * sc, fx * W, (hz + 0.012) * H
        for pts, col in parts:
            base = _paint(base, _shape(cx, cy, [(x * s, y * s) for x, y in pts]), col)
    return base


def anime_floating_isles():
    k = min(W, H)
    base = mesh(["#6ec6ff", "#c9a8ff", "#ffd6e8"], [(.5, .0), (.3, .55), (.6, .95)], power=1.6)
    base = _clouds(base, 221, 0.52, 0.74, "#e8d8ff", 0.5, lit="#ffffff", fade_from=0.9, strength=0.8)
    rng = np.random.default_rng(222)
    top = lambda t: 0.06 - 0.22 * (1 - t * t) ** 0.7
    for fx, fy, sz, op in [(0.74, 0.62, 0.15, 0.6), (0.30, 0.34, 0.26, 1.0), (0.66, 0.80, 0.17, 0.85)]:
        cx, cy, s = fx * W, fy * H, sz * k
        ts = np.linspace(-1, 1, 9)
        rock = [(0.95 * t, top(t)) for t in ts] + [(0.95 * t, 0.06 + 0.95 * (1 - abs(t) ** 1.5) + rng.uniform(-.04, .04)) for t in ts[::-1]]
        base = _paint(base, _shape(cx, cy, [(x * s, y * s) for x, y in rock]), "#5a4a8a", op)
        grass = [(0.95 * t, top(t)) for t in ts] + [(0.95 * t, top(t) + 0.07 + 0.03 * (1 - t * t)) for t in ts[::-1]]
        base = _paint(base, _shape(cx, cy, [(x * s, y * s) for x, y in grass]), "#5fd08a", op)
        for _ in range(5):
            t = rng.uniform(-0.7, 0.7)
            tx, ty, ts_ = cx + 0.95 * t * s, cy + top(t) * s + 0.01 * s, s * rng.uniform(0.9, 1.3)
            base = _paint(base, _shape(tx, ty, [(-.05 * ts_, 0), (.05 * ts_, 0), (0, -.15 * ts_)]), "#2f9a62", op)
        wx, wy = cx + 0.855 * s, cy + top(0.9) * s
        wf = _shape(wx, wy, [(-.012 * s, 0), (.012 * s, 0), (.008 * s, 1.9 * s), (-.008 * s, 1.9 * s)])
        wf = np.asarray(Image.fromarray((wf[..., 0] * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5)), np.float32)[..., None] / 255
        wf = wf * np.clip(1 - (YY[..., None] - wy) / (1.9 * s), 0, 1)
        base = _paint(base, wf, "#e8f6ff", 0.75 * op)
    return base


def anime_rooftop_dusk():
    k = min(W, H)
    base = mesh(["#4a3a9a", "#ff8aa0", "#ffd0a0"], [(.5, .0), (.5, .55), (.5, .72)], power=1.5)
    base = _clouds(base, 231, 0.5, 0.72, "#c77aa8", 0.64, fade_from=0.62, strength=0.85)
    far, fa = _skyline(232, 0.80, 0.03, 0.10, "#6a3f86")
    base = base * (1 - fa) + far * fa
    near, na = _skyline(233, 0.80, 0.02, 0.07, "#2a1a4a", win="#ffd27a")
    base = base * (1 - na) + near * na
    base = np.where((NY > 0.80)[..., None], hexc("#1b1233"), base)
    fence = Image.new("L", (W * 2, H * 2), 0)
    fd = ImageDraw.Draw(fence)
    y0, y1 = 0.60 * H, 0.80 * H
    g, lw = 0.045 * k, max(2, int(k / 380))
    for i in range(-int((y1 - y0) / g) - 1, int(W / g) + 2):
        fd.line([(i * g * 2, y0 * 2), ((i * g + (y1 - y0)) * 2, y1 * 2)], fill=255, width=lw * 2)
        fd.line([((i * g + (y1 - y0)) * 2, y0 * 2), (i * g * 2, y1 * 2)], fill=255, width=lw * 2)
    fd.line([(0, y0 * 2), (W * 2, y0 * 2)], fill=255, width=lw * 6)
    fd.line([(0, y1 * 2), (W * 2, y1 * 2)], fill=255, width=lw * 6)
    for px in np.arange(0.04 * W, W, 0.24 * W):
        fd.rectangle([(px - lw * 3) * 2, (y0 - 0.03 * H) * 2, (px + lw * 3) * 2, y1 * 2], fill=255)
    rng = np.random.default_rng(234)
    for _ in range(6):
        bx, by, bs = rng.uniform(0.1, 0.9) * W, rng.uniform(0.18, 0.45) * H, rng.uniform(0.012, 0.022) * k
        fd.line([((bx - bs) * 2, (by - bs * .4) * 2), (bx * 2, by * 2)], fill=255, width=lw * 2)
        fd.line([(bx * 2, by * 2), ((bx + bs) * 2, (by - bs * .4) * 2)], fill=255, width=lw * 2)
    fm = np.asarray(fence.resize((W, H), Image.LANCZOS), np.float32)[..., None] / 255
    return _paint(base, fm, "#0d0820", 0.92)


def anime_crossing_sunset():
    k = min(W, H)
    hz = 0.60
    base = mesh(["#2d2a7a", "#ff7e6b", "#ffcf8a"], [(.5, .0), (.5, .55), (.5, .62)], power=1.5)
    base = add_disc(base, "#fff0c0", 0.5, hz - 0.012, 0.08, halo=0.6, spread=0.2)
    base = _clouds(base, 241, 0.52, 0.72, "#c8688a", 0.55, fade_from=0.50, strength=0.85, cut=hz)
    far, fa = _skyline(242, hz + 0.004, 0.015, 0.05, "#5a2f6a")
    base = base * (1 - fa) + far * fa
    base = np.where((NY > hz + 0.004)[..., None], linear("#3a2048", "#120a22", 180), base)
    vx, vy = 0.5 * W, (hz + 0.004) * H
    P = lambda pts: [(x * 2, y * 2) for x, y in pts]
    tr = Image.new("L", (W * 2, H * 2), 0)
    td = ImageDraw.Draw(tr)
    hl = Image.new("L", (W * 2, H * 2), 0)
    hd = ImageDraw.Draw(hl)
    rw = 0.012 * k
    for sgn in (-1, 1):
        bx = vx + sgn * 0.26 * W
        td.polygon(P([(vx, vy), (bx - rw, H), (bx + rw, H)]), fill=255)
        hd.line(P([(vx, vy), (bx - sgn * rw * 0.5, H)]), fill=255, width=3)
    for i in range(1, 27):
        t = (i / 27) ** 2.2
        y = vy + (H - vy) * t
        half = 0.31 * W * t
        td.polygon(P([(vx - half, y), (vx + half, y), (vx + half, y + 0.012 * H * t + 1), (vx - half, y + 0.012 * H * t + 1)]), fill=255)
    px = 0.18 * W
    td.polygon(P([(px - .008 * k, 0.38 * H), (px + .008 * k, 0.38 * H), (px + .008 * k, 0.90 * H), (px - .008 * k, 0.90 * H)]), fill=255)
    td.polygon(P([(px - .055 * k, 0.43 * H), (px + .055 * k, 0.43 * H), (px + .055 * k, 0.43 * H + .012 * k), (px - .055 * k, 0.43 * H + .012 * k)]), fill=255)
    for sgn in (-1, 1):
        td.ellipse(P([(px + sgn * .035 * k - .017 * k, 0.43 * H - .034 * k), (px + sgn * .035 * k + .017 * k, 0.43 * H - .0 * k)]), fill=255)
    td.line(P([(px - .04 * k, .34 * H), (px + .04 * k, .38 * H)]), fill=255, width=int(.010 * k) * 2)
    td.line(P([(px - .04 * k, .38 * H), (px + .04 * k, .34 * H)]), fill=255, width=int(.010 * k) * 2)
    p2 = 0.86 * W
    td.polygon(P([(p2 - .012 * k, 0.26 * H), (p2 + .012 * k, 0.26 * H), (p2 + .012 * k, 0.98 * H), (p2 - .012 * k, 0.98 * H)]), fill=255)
    td.polygon(P([(p2 - .06 * k, 0.30 * H), (p2 + .06 * k, 0.30 * H), (p2 + .06 * k, 0.30 * H + .010 * k), (p2 - .06 * k, 0.30 * H + .010 * k)]), fill=255)
    for j in range(3):
        ya, yb = (0.30 + j * 0.012) * H, (0.28 + j * 0.012) * H
        pts = [(t * p2, ya + (yb - ya) * t + 0.05 * H * 4 * t * (1 - t)) for t in np.linspace(0, 1, 60)]
        td.line(P(pts), fill=255, width=max(2, int(k / 700)) * 2)
    tm = np.asarray(tr.resize((W, H), Image.LANCZOS), np.float32)[..., None] / 255
    hm = np.asarray(hl.resize((W, H), Image.LANCZOS), np.float32)[..., None] / 255
    base = _paint(base, tm, "#0a0618")
    base = _paint(base, hm * (YY[..., None] < H * 0.98), "#ffb58a", 0.35)
    for sgn, a in ((-1, 1.0), (1, 0.35)):
        lx, ly = px + sgn * .035 * k, 0.43 * H - .017 * k
        d = ((XX - lx) ** 2 + (YY - ly) ** 2) / (0.05 * k) ** 2
        base = screen(base, (np.exp(-d)[..., None] * 0.7 + np.exp(-d * 8)[..., None] * 0.6) * hexc("#ff3a3a") * a)
    return base


def anime_river_lanterns():
    hz = 0.58
    base = mesh(["#0b0620", "#3a1470", "#c0507a"], [(.5, .0), (.5, .5), (.5, .6)], power=1.6)
    base = screen(base, stars(251, 500, 1.6)[..., None] * 255 * (1 - smooth(0.2, 0.55, NY))[..., None])
    base = add_disc(base, "#fff0d0", 0.30, 0.18, 0.05, halo=0.35, spread=0.12)
    ridge = ridge_line(252, 0.585, 0.07)
    hill = smooth(-0.002, 0.002, NY - ridge[None, :])[..., None] * (NY < hz)[..., None]
    base = _paint(base, hill, "#140a2e")
    base = np.where((NY >= hz)[..., None], linear("#2a1450", "#07030f", 180), base)
    base = screen(base, glow_dots(253, 70, ["#ffcf7a"], 2, 5, 1.5, 0.9, region=(0.55, 0.585)))
    base = _mirror_ground(base, hz)
    cols = ["#ff9a3c", "#ffcf7a"]
    base = screen(base, glow_dots(254, 40, cols, 9, 20, 8, 1.0, region=(0.64, 0.97)))
    base = screen(base, glow_dots(254, 40, cols, 4, 8, 1.6, 1.0, region=(0.64, 0.97)))
    return screen(base, glow_dots(256, 14, cols, 6, 12, 5, 0.9, region=(0.10, 0.50)))


def anime_lone_tree():
    k = min(W, H)
    base = mesh(["#050a2a", "#1c2a7a", "#5a3a8a"], [(.5, .0), (.5, .6), (.5, .92)], power=1.6)
    d = NX - 0.2 - 0.5 * NY
    band = np.exp(-(d / 0.13) ** 2) * (0.5 + 0.9 * fbm(261, 5, 4))
    base = screen(base, band[..., None] * hexc("#8fa6ff") * 0.5)
    base = screen(base, stars(262, 700, 1.7)[..., None] * 255 * (1 - smooth(0.4, 0.8, NY))[..., None])
    hy = 0.84 + 0.03 * np.sin(NX * 3.0 + 1.0)
    base = _paint(base, smooth(-0.002, 0.002, NY - hy)[..., None], "#050816")
    tx = 0.62 * W
    ty = (0.84 + 0.03 * np.sin(0.62 * 3.0 + 1.0)) * H
    tm = Image.new("L", (W * 2, H * 2), 0)
    td = ImageDraw.Draw(tm)
    rng = np.random.default_rng(263)
    s = 0.5 * k
    td.polygon([((tx - .02 * s) * 2, (ty + 10) * 2), ((tx + .02 * s) * 2, (ty + 10) * 2), ((tx + .012 * s) * 2, (ty - .35 * s) * 2), ((tx - .012 * s) * 2, (ty - .35 * s) * 2)], fill=255)
    for _ in range(26):
        a, r = rng.uniform(0, math.tau), rng.uniform(0, 0.22) * s
        cx, cy, rr = tx + math.cos(a) * r * 1.2, ty - 0.50 * s + math.sin(a) * r * 0.9, rng.uniform(0.07, 0.13) * s
        td.ellipse([(cx - rr) * 2, (cy - rr) * 2, (cx + rr) * 2, (cy + rr) * 2], fill=255)
    tm = np.asarray(tm.resize((W, H), Image.LANCZOS), np.float32)[..., None] / 255
    base = _paint(base, tm, "#050816")
    mt = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mt)
    for sx, sy, ln in [(0.78, 0.10, 0.30), (0.40, 0.26, 0.20)]:
        x0, y0 = sx * W, sy * H
        for i in range(40):
            f0, f1 = i / 40, (i + 1) / 40
            md.line([(x0 + ln * k * f0 * 0.8, y0 - ln * k * f0 * 0.6), (x0 + ln * k * f1 * 0.8, y0 - ln * k * f1 * 0.6)],
                    fill=int(255 * (1 - f0) ** 1.5), width=max(2, int(k / 400)))
    mm = np.asarray(mt.filter(ImageFilter.GaussianBlur(0.8)), np.float32)[..., None] / 255
    base = screen(base, mm * 255 * 0.95)
    return screen(base, glow_dots(264, 28, ["#c8ff7a"], 3, 7, 3, 0.9, region=(0.74, 0.96)))


def anime_ice_castle():
    k = min(W, H)
    base = linear("#030820", "#0b2a5a", 180)
    for i, (c, y0, ph) in enumerate([("#38ffb0", 0.28, 0.0), ("#5ad0ff", 0.36, 1.7), ("#b46bff", 0.22, 3.1)]):
        wave = y0 + 0.06 * np.sin(NX * 6 + ph) + 0.03 * np.sin(NX * 13 + ph * 2)
        dd = NY - wave
        band = np.exp(-(np.where(dd < 0, dd / 0.16, dd / 0.04)) ** 2)
        mod = 0.55 + 0.6 * fbm(270 + i, 4, 4)
        base = screen(base, band[..., None] * hexc(c) * 0.55 * mod[..., None])
    base = screen(base, stars(271, 650, 1.6)[..., None] * 255 * (1 - smooth(0.35, 0.75, NY))[..., None] * 0.9)
    far = ridge_line(272, 0.76, 0.16, 0.9)
    base = _paint(base, smooth(-0.002, 0.002, NY - far[None, :])[..., None], "#16275a")
    cx = 0.60 * W
    gy = float(far[int(0.60 * W)]) * H
    s = 0.5 * k
    wins = Image.new("L", (W, H), 0)
    wd = ImageDraw.Draw(wins)
    for dx, tw, th, rf in [(0.0, .15, .36, .17), (-.21, .09, .26, .12), (.20, .09, .31, .14), (-.35, .07, .17, .10), (.33, .07, .18, .10)]:
        x0 = cx + dx * s - tw * s / 2
        base = _paint(base, _shape(x0, gy, [(0, 0.04 * s), (0, -th * s), (tw * s, -th * s), (tw * s, 0.04 * s)]), "#0b1432")
        base = _paint(base, _shape(x0, gy - th * s, [(-.01 * s, 0), (tw * s / 2, -rf * s), (tw * s + .01 * s, 0)]), "#0b1432")
        wd.rectangle([x0 + tw * s * .4, gy - th * s * .75, x0 + tw * s * .6, gy - th * s * .55], fill=255)
    base = _lit_windows(base, wins, "#ffb050", "#ffe0a0")
    near = ridge_line(273, 0.88, 0.10, 1.1)
    return _paint(base, smooth(-0.002, 0.002, NY - near[None, :])[..., None], "#08122e")


def anime_lighthouse():
    k = min(W, H)
    hz = 0.60
    base = ocean(["#0b1a4a", "#5a3a8a", "#f2a7a0"], "#ffd6b0", "#1f2f6a", "#050a22", horizon=hz, sun_r=0.03)
    base = screen(base, stars(281, 500, 1.6)[..., None] * 255 * (1 - smooth(0.1, 0.45, NY))[..., None])
    cliff = _poly_mask([(0.50 * W, H), (0.54 * W, 0.78 * H), (0.62 * W, 0.68 * H), (0.74 * W, 0.65 * H), (W, 0.63 * H), (W, H)])
    base = _paint(base, cliff, "#0a0f26")
    lx, ly0 = 0.80 * W, 0.645 * H
    hw = lambda y: 0.035 * k - 0.011 * y / 0.22
    base = _paint(base, _shape(lx, ly0, [(-.035 * k, 0), (.035 * k, 0), (.024 * k, -.22 * k), (-.024 * k, -.22 * k)]), "#e9e4f0")
    for y1, y2 in [(.04 * k, .08 * k), (.12 * k, .16 * k)]:
        base = _paint(base, _shape(lx, ly0, [(-hw(y1 / k), -y1), (hw(y1 / k), -y1), (hw(y2 / k), -y2), (-hw(y2 / k), -y2)]), "#d8554a")
    base = _paint(base, _shape(lx, ly0, [(-.032 * k, -.22 * k), (.032 * k, -.22 * k), (.032 * k, -.232 * k), (-.032 * k, -.232 * k)]), "#20213a")
    base = _paint(base, _shape(lx, ly0, [(-.02 * k, -.232 * k), (.02 * k, -.232 * k), (.02 * k, -.262 * k), (-.02 * k, -.262 * k)]), "#ffe9b0")
    base = _paint(base, _shape(lx, ly0, [(-.026 * k, -.262 * k), (0, -.292 * k), (.026 * k, -.262 * k)]), "#20213a")
    ly = ly0 - 0.247 * k
    beam = _poly_mask([(lx, ly - .008 * k), (lx - 1.2 * W, ly - .13 * k), (lx - 1.2 * W, ly + .07 * k), (lx, ly + .008 * k)], blur=6)
    fall = np.clip(1 - (lx - XX) / (1.0 * W), 0, 1)[..., None] ** 1.5
    base = screen(base, beam * fall * hexc("#fff2c0") * 0.45)
    d2 = ((XX - lx) ** 2 + (YY - ly) ** 2) / (0.06 * k) ** 2
    return screen(base, np.exp(-d2)[..., None] * hexc("#ffe9b0") * 0.9)


def anime_blossom_bridge():
    k = min(W, H)
    hz = 0.64
    base = mesh(["#a8c8ff", "#ffd1e8", "#fff0f5"], [(.5, .0), (.4, .5), (.5, .8)], power=1.6)
    base = _clouds(base, 291, 0.55, 0.74, "#ffffff", 0.5, lit="#ffffff", fade_from=0.5, strength=0.6, cut=hz)
    far, fa = _skyline(292, hz, 0.02, 0.06, "#b79ad0")
    base = base * (1 - fa) + far * fa
    base = np.where((NY > hz)[..., None], linear("#8fb4e0", "#2a4a8a", 180), base)
    xs = np.linspace(0.08 * W, 0.92 * W, 70)
    ys = hz * H - 0.09 * k * (1 - ((xs - 0.5 * W) / (0.42 * W)) ** 2)
    th = 0.028 * k
    bm = Image.new("L", (W * 2, H * 2), 0)
    bd = ImageDraw.Draw(bm)
    P = lambda pts: [(x * 2, y * 2) for x, y in pts]
    bd.polygon(P(list(zip(xs, ys)) + list(zip(xs[::-1], ys[::-1] + th))), fill=255)
    bd.polygon(P(list(zip(xs, ys - 0.040 * k)) + list(zip(xs[::-1], ys[::-1] - 0.034 * k))), fill=255)
    for i in range(0, 70, 6):
        bd.polygon(P([(xs[i] - .004 * k, ys[i]), (xs[i] + .004 * k, ys[i]), (xs[i] + .004 * k, ys[i] - .04 * k), (xs[i] - .004 * k, ys[i] - .04 * k)]), fill=255)
    for px in (xs[0], xs[-1]):
        bd.polygon(P([(px - .02 * k, hz * H), (px + .02 * k, hz * H), (px + .02 * k, hz * H + .06 * k), (px - .02 * k, hz * H + .06 * k)]), fill=255)
    bmask = np.asarray(bm.resize((W, H), Image.LANCZOS), np.float32)[..., None] / 255
    base = _paint(base, bmask, "#6e2236")
    base = _mirror_ground(base, hz)
    base = screen(base, glow_dots(293, 160, ["#ff9fc4", "#ffb8d4", "#ffd6e6"], 24, 54, 3, 0.97, region=(0.0, 0.22)))
    br = Image.new("L", (W, H), 0)
    brd = ImageDraw.Draw(br)
    for x0, y0, x1, y1, sag in [(-0.05, 0.07, 0.62, 0.21, 0.04), (1.05, 0.03, 0.45, 0.15, 0.05)]:
        pts = [((x0 + (x1 - x0) * t) * W, (y0 + (y1 - y0) * t + sag * math.sin(t * math.pi)) * H) for t in np.linspace(0, 1, 40)]
        for i in range(len(pts) - 1):
            brd.line([pts[i], pts[i + 1]], fill=255, width=max(2, int(k * 0.016 * (1 - i / 40 * 0.8))))
    brm = np.asarray(br.filter(ImageFilter.GaussianBlur(0.8)), np.float32)[..., None] / 255
    base = _paint(base, brm, "#4a2a3a")
    base = screen(base, glow_dots(295, 50, ["#ff9fc4", "#ffb8d4", "#ffd6e6"], 14, 30, 2, 0.97, region=(0.07, 0.25)))
    return screen(base, glow_dots(294, 70, ["#ffc0d8", "#ffe0ec"], 4, 10, 1.2, 0.95, region=(0.10, 0.95)))


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
    # --- pack 2: space
    ("nebula-violet", "Violet Nebula", "space", lambda: nebula(11, "#04010d", "#5b1a9e", "#d7378c", "#ffd3a8")),
    ("nebula-teal", "Teal Nebula", "space", lambda: nebula(21, "#010a10", "#0b6e8a", "#3a2bb0", "#9ff3e4")),
    ("planet-horizon", "Planet Horizon", "space", lambda: planet_horizon(5, "#6fb7ff", "#10204a")),
    ("total-eclipse", "Total Eclipse", "space", lambda: eclipse(8)),
    ("star-field", "Star Field", "space", lambda: stars(31, 1500)[..., None] * 255 + linear("#000000", "#070b1e", 180)),
    ("moonrise", "Moonrise", "space", lambda: moonrise(14)),
    # --- pack 2: nature
    ("mountain-dawn", "Mountain Dawn", "nature", lambda: mountains(3, ("#ffd9a0", "#ff9e7a", "#f5cfd6"), ["#e4a5a3", "#c5788c", "#8f5a8a", "#4e3a6b", "#2a2547"], ("#fff1c9", .62, .40, .09))),
    ("mountain-dusk", "Mountain Dusk", "nature", lambda: mountains(6, ("#2b1055", "#d4577b", "#ffb88c"), ["#b3567e", "#8a3f7a", "#5d2f70", "#3a2260", "#1b1238"], ("#ffe8c2", .35, .46, .07))),
    ("misty-ridges", "Misty Ridges", "nature", lambda: mountains(9, ("#dbe9f4", "#b9d0e3"), ["#b4c9dd", "#93aec8", "#6f8fb0", "#4c6c92", "#2f4a6e"], None, y_start=.46, step=.10)),
    ("mountain-night", "Mountain Night", "nature", lambda: mountains(13, ("#050b24", "#1a2a5e", "#4a5d9a"), ["#2b3d7a", "#1f2f63", "#16224c", "#0e1738", "#070d24"], ("#f5f1d8", .68, .22, .06), with_stars=True)),
    ("pine-dusk", "Pine Dusk", "nature", lambda: pines(4, ("#35235e", "#f0907a"), ["#8a4f7a", "#5b3470", "#35204f", "#1b1030"])),
    ("pine-night", "Pine Night", "nature", lambda: pines(7, ("#06142b", "#164a59"), ["#1c5a63", "#123f4c", "#0b2a38", "#051620"], ("#f3f1d4", .72, .24, .07))),
    ("ocean-sunset", "Ocean Sunset", "nature", lambda: ocean(("#2a1048", "#e6486a", "#ffb36b"), "#ffe9a8", "#b5456a", "#1a0e3a")),
    ("pastel-shore", "Pastel Shore", "nature", lambda: ocean(("#b8c6f5", "#f7c6d9", "#ffe5c7"), "#fff3df", "#8fbfe0", "#4b7fb5", sun_r=.14)),
    # --- pack 2: tech / geometric
    ("neon-grid", "Neon Grid", "technology", lambda: neon_grid("#ffe94d", "#ff2f92", "#e23dff", "#12012e", "#6a0f7a")),
    ("hex-grid", "Hex Grid", "technology", lambda: hex_grid("#06122b", "#0b3a5c", "#3fd0ff", "#3fd0ff")),
    ("low-poly-blue", "Low Poly Blue", "technology", lambda: low_poly("#0b1f4d", "#1d6fd1", "#76d7ff", 4)),
    ("low-poly-sunset", "Low Poly Sunset", "technology", lambda: low_poly("#3a1c71", "#d76d77", "#ffaf7b", 9)),
    # --- pack 3: quotes (original lines) + festivals
    ("quote-keep-going", "Keep Going", "quotes", lambda: with_quote(mesh(["#0f2027", "#2c5364", "#00c9a7", "#0b1e3b"], [(.2, .1), (.8, .4), (.3, .85), (.6, .5)]), "Keep going.\nYou're closer\nthan you think.", style="sans")),
    ("quote-begin-today", "Begin Today", "quotes", lambda: with_quote(linear("#ff9a76", "#7a2a6b", 0), "Begin today.\nPerfect later.", style="serif", size=140)),
    ("quote-quiet-mind", "Quiet Mind", "quotes", lambda: with_quote(np.zeros((H, W, 3), np.float32), "Quiet mind,\nbig goals.", style="light", size=130, color="#e8e8e8")),
    ("quote-small-steps", "Small Steps", "quotes", lambda: with_quote(mesh(["#ffd6a5", "#ffadad", "#ffc6ff", "#caffbf"], [(.15, .1), (.85, .25), (.2, .75), (.8, .85)], power=2.2), "Small steps\nstill move you\nforward.", color="#3a1f3d")),
    ("quote-stay-curious", "Stay Curious", "quotes", lambda: with_quote(mesh(["#3a0ca3", "#7209b7", "#240046", "#4361ee"], [(.85, .1), (.15, .35), (.5, .9), (.5, .5)]), "Stay curious.", style="serif", size=150)),
    ("quote-be-kind", "Be Kind", "quotes", lambda: with_quote(mesh(["#1b4332", "#52b788", "#081c15", "#2d6a4f"], [(.2, .1), (.8, .35), (.25, .8), (.5, .5)]), "Be kind\nto yourself.", style="light", size=135)),
    ("quote-dream-big", "Dream Big", "quotes", lambda: with_quote(mesh(["#050a30", "#0a2472", "#1e6091", "#000814"], [(.2, .12), (.85, .3), (.3, .75), (.5, .5)]), "Dream big.\nStart small.", size=128)),
    ("quote-focus", "Focus", "quotes", lambda: with_quote(np.zeros((H, W, 3), np.float32), "FOCUS", style="sans", size=170, color="#ffffff", y=0.5)),
    ("diwali-glow", "Diwali Glow", "festival", diwali_glow),
    ("diya-flame", "Diya Flame", "festival", diya),
    ("golden-mandala", "Golden Mandala", "festival", mandala),
    ("holi-colors", "Holi Colors", "festival", holi),
    ("christmas-snow", "Christmas Snow", "festival", snowfall),
    ("new-year-fireworks", "New Year Fireworks", "festival", fireworks),
    ("sky-lanterns", "Sky Lanterns", "festival", lanterns),
    ("eid-crescent", "Eid Crescent", "festival", crescent),
    # --- pack 4: anime-style skies + cars
    ("anime-sunset-city", "Anime Sunset City", "anime", anime_sunset),
    ("anime-torii-night", "Torii Night", "anime", anime_starry_torii),
    ("anime-sakura-sky", "Sakura Sky", "anime", anime_sakura),
    ("car-neon-highway", "Neon Highway", "cars", car_neon_highway),
    ("car-taillight-bokeh", "Taillight Bokeh", "cars", car_bokeh),
    ("car-speed-streaks", "Speed Streaks", "cars", car_speed),
    ("car-dusk-coupe", "Dusk Coupe", "cars", car_silhouette),
    # --- pack 5: more anime-style scenes
    ("anime-rain-neon", "Neon Rain Street", "anime", anime_rain_neon),
    ("anime-moon-rooftops", "Moon Over Rooftops", "anime", anime_moon_rooftops),
    ("anime-sakura-tunnel", "Sakura Tunnel", "anime", anime_sakura_tunnel),
    ("anime-star-train", "Midnight Star Train", "anime", anime_star_train),
    ("anime-summer-clouds", "Summer Cloud Sky", "anime", anime_summer_clouds),
    ("anime-firefly-forest", "Firefly Forest", "anime", anime_firefly_forest),
    ("anime-fuji-dawn", "Fuji Dawn", "anime", anime_fuji_dawn),
    ("anime-snow-village", "Snow Village Night", "anime", anime_snow_village),
    ("anime-cyber-alley", "Cyber Alley", "anime", anime_cyber_alley),
    ("anime-golden-clouds", "Golden Hour Sky", "anime", anime_golden_clouds),
    # --- pack 6: more original anime-style scenes
    ("anime-hidden-village", "Hidden Village Dusk", "anime", anime_hidden_village),
    ("anime-sea-voyage", "Sunset Sea Voyage", "anime", anime_sea_voyage),
    ("anime-floating-isles", "Floating Isles", "anime", anime_floating_isles),
    ("anime-rooftop-dusk", "Rooftop at Dusk", "anime", anime_rooftop_dusk),
    ("anime-crossing-sunset", "Crossing at Sunset", "anime", anime_crossing_sunset),
    ("anime-river-lanterns", "River of Lanterns", "anime", anime_river_lanterns),
    ("anime-lone-tree", "Lone Tree Night", "anime", anime_lone_tree),
    ("anime-ice-castle", "Aurora Ice Castle", "anime", anime_ice_castle),
    ("anime-lighthouse", "Twilight Lighthouse", "anime", anime_lighthouse),
    ("anime-blossom-bridge", "Blossom Bridge", "anime", anime_blossom_bridge),
]


def tags_for(slug):
    """Search words so visitors can find wallpapers (search also reads title and category)."""
    if slug.startswith(("nebula", "planet", "total-eclipse", "star-field", "moonrise")):
        return "space galaxy stars cosmos night"
    if slug.startswith(("mountain", "misty", "pine", "ocean", "pastel-shore")):
        return "nature landscape scenery outdoors"
    if slug.startswith("anime-"):
        return "anime manga illustration sky japan"
    if slug.startswith("car-"):
        return "car cars vehicle road drive speed night"
    if slug.startswith("quote-"):
        return "quote quotes motivation text inspiration words"
    FESTIVAL_TAGS = {'diwali-glow': 'festival diwali lights gold celebration india', 'diya-flame': 'festival diwali diya flame lamp india', 'golden-mandala': 'festival mandala gold pattern india diwali', 'holi-colors': 'festival holi colors india celebration', 'christmas-snow': 'festival christmas snow winter celebration', 'new-year-fireworks': 'festival new year fireworks night celebration', 'sky-lanterns': 'festival lanterns night sky celebration', 'eid-crescent': 'festival eid crescent moon night celebration'}
    if slug in FESTIVAL_TAGS:
        return FESTIVAL_TAGS[slug]
    if slug.startswith(("neon-grid", "hex-grid", "low-poly")):
        return "tech geometric pattern futuristic"
    if slug.startswith("amoled") or slug in ("pure-black", "deep-space-black", "charcoal-fade"):
        t = "amoled black dark oled battery"
    elif slug.startswith("minimal"):
        t = "minimal simple flat clean"
    elif slug.startswith(("topo", "ripple", "dune", "night-waves", "pastel-waves")):
        t = "pattern lines waves"
    else:
        t = "gradient blur colorful smooth"
    return t


def set_size(w, h):
    """Re-point the module-level canvas size (designs read these globals at call time)."""
    global W, H, YY, XX, NX, NY
    W, H = w, h
    YY, XX = np.mgrid[0:H, 0:W].astype(np.float32)
    NX, NY = XX / W, YY / H


def main_wide(only):
    """Landscape (16:9) versions for desktop screens: <slug>-wide.jpg + small thumbs."""
    set_size(1920, 1080)
    os.makedirs(os.path.join(OUT, "thumbs"), exist_ok=True)
    out = {}
    for i, (slug, title, cat, fn) in enumerate(DESIGNS):
        if only and slug not in only:
            continue
        im = Image.fromarray(finish(fn(), seed=i), "RGB")
        im.save(os.path.join(OUT, slug + "-wide.jpg"), "JPEG", quality=84, optimize=True, progressive=True)
        im.resize((480, 270), Image.LANCZOS).save(os.path.join(OUT, "thumbs", slug + "-wide.jpg"), "JPEG", quality=78, optimize=True)
        out[slug] = 301 + i
        print(f"{slug:22s} wide {os.path.getsize(os.path.join(OUT, slug + '-wide.jpg')) // 1024:5d} KB")
    print("wide done:", len(out))


def main():
    if "--wide" in sys.argv:
        return main_wide(set(a for a in sys.argv[1:] if not a.startswith("--")))
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
                     f'thumb: "images/pack/thumbs/{slug}.jpg", wide: "images/pack/{slug}-wide.jpg", wideThumb: "images/pack/thumbs/{slug}-wide.jpg", '
                     f'width: {W}, height: {H}, views: 0, downloads: 0 }},')
    with open(os.path.join(OUT, "entries.js"), "w", encoding="utf-8") as f:
        f.write("// Paste these lines inside the wallpapers array in script.js\n" + "\n".join(lines) + "\n")
    print("done:", len(lines), "wallpapers")


if __name__ == "__main__":
    main()
