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
    if slug in ("diwali-glow", "diya-flame", "golden-mandala", "holi-colors", "christmas-snow", "new-year-fireworks", "sky-lanterns", "eid-crescent"):
        return "festival celebration india diwali holi christmas eid new year lights"
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
