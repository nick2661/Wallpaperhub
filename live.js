/* ===== WallpaperHub Live Wallpaper Engine =====
 * Self-contained animated wallpapers drawn on <canvas>.
 * No external files needed, so they work offline and on any phone.
 *
 * Each engine is a factory: (w, h) => { draw(ctx, w, h, t, dt) }
 *   t  = seconds since start, dt = seconds since last frame
 * All sizes are scaled from `u = min(w, h)` so one engine looks right
 * in portrait (phone) and landscape (desktop) at any resolution.
 *
 * To add a new live wallpaper:
 *   1. add an engine to LIVE_ENGINES below
 *   2. add an entry to the `wallpapers` array in script.js with
 *      { type: 'live', engine: '<your key>', category: 'live', ... }
 */

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);

// Pre-render a static background once so each frame only draws the moving parts.
const makeLayer = (w, h, paint) => {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
    paint(c.getContext('2d'), c.width, c.height);
    return c;
};

// Row of random buildings (optionally with lit windows) for city scenes.
const skylineLayer = (c, w, h, baseY, minH, maxH, color, win) => {
    const sx = Math.max(10, Math.min(w, h) / 55);
    let x = -10;
    while (x < w) {
        const bw = rand(0.05, 0.11) * w * (w > h ? 0.6 : 1);
        const bh = rand(minH, maxH) * h, top = baseY * h - bh;
        c.fillStyle = color; c.fillRect(x, top, bw, h - top);
        if (win) {
            c.fillStyle = win;
            for (let yy = top + sx; yy < baseY * h - sx; yy += sx * 1.4)
                for (let xx = x + sx * 0.5; xx < x + bw - sx; xx += sx * 1.1)
                    if (Math.random() < 0.2) c.fillRect(xx, yy, sx * 0.4, sx * 0.6);
        }
        x += bw + rand(0, 6);
    }
};

const LIVE_ENGINES = {
    // --- Aurora: drifting glowing ribbons over a night sky ---
    aurora(w, h) {
        const u = Math.min(w, h);
        const stars = Array.from({ length: 70 }, () => ({ x: rand(0, w), y: rand(0, h * 0.7), r: rand(0.4, 1.4) * u / 600, p: rand(0, TAU) }));
        const bands = [
            { hue: 150, y: 0.38, amp: 0.10, sp: 0.35, ph: 0 },
            { hue: 190, y: 0.46, amp: 0.12, sp: 0.28, ph: 2 },
            { hue: 285, y: 0.32, amp: 0.09, sp: 0.22, ph: 4 }
        ];
        return {
            draw(ctx, w, h, t) {
                const bg = ctx.createLinearGradient(0, 0, 0, h);
                bg.addColorStop(0, '#020617'); bg.addColorStop(1, '#0b1a2e');
                ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
                stars.forEach(s => {
                    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 1.5 + s.p);
                    ctx.fillStyle = '#fff';
                    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.fill();
                });
                ctx.globalAlpha = 1;
                ctx.globalCompositeOperation = 'lighter';
                bands.forEach(b => {
                    const step = Math.max(6, w / 60);
                    for (let x = 0; x <= w + step; x += step) {
                        const wave = Math.sin(x / w * 5 + t * b.sp + b.ph) + 0.5 * Math.sin(x / w * 11 - t * b.sp * 1.4);
                        const y = h * b.y + wave * h * b.amp;
                        const len = h * (0.22 + 0.08 * Math.sin(x / w * 7 + t * 0.6 + b.ph));
                        const g = ctx.createLinearGradient(0, y - len, 0, y + len * 0.2);
                        g.addColorStop(0, `hsla(${b.hue},90%,60%,0)`);
                        g.addColorStop(0.7, `hsla(${b.hue},90%,60%,0.16)`);
                        g.addColorStop(1, `hsla(${b.hue},90%,70%,0)`);
                        ctx.fillStyle = g;
                        ctx.fillRect(x, y - len, step + 1, len * 1.2);
                    }
                });
                ctx.globalCompositeOperation = 'source-over';
            }
        };
    },

    // --- Warp: flying through a starfield ---
    warp(w, h) {
        const u = Math.min(w, h);
        const N = 220;
        const mk = () => ({ x: rand(-1, 1), y: rand(-1, 1), z: rand(0.1, 1) });
        const stars = Array.from({ length: N }, mk);
        return {
            draw(ctx, w, h, t, dt) {
                ctx.fillStyle = 'rgba(2,4,15,0.35)'; ctx.fillRect(0, 0, w, h);
                const cx = w / 2, cy = h / 2, speed = 0.55;
                stars.forEach(s => {
                    const pz = s.z;
                    s.z -= dt * speed;
                    if (s.z <= 0.02) { Object.assign(s, mk(), { z: 1 }); return; }
                    const k = u * 0.9;
                    const x = cx + (s.x / s.z) * k * 0.5, y = cy + (s.y / s.z) * k * 0.5;
                    const px = cx + (s.x / pz) * k * 0.5, py = cy + (s.y / pz) * k * 0.5;
                    const a = 1 - s.z;
                    ctx.strokeStyle = `rgba(${180 + 75 * a},${200 + 55 * a},255,${0.3 + 0.7 * a})`;
                    ctx.lineWidth = Math.max(0.6, a * u / 280);
                    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke();
                });
            }
        };
    },

    // --- Matrix: falling green code ---
    matrix(w, h) {
        const size = Math.max(12, Math.round(Math.min(w, h) / 32));
        const cols = Math.ceil(w / size);
        const drops = Array.from({ length: cols }, () => rand(-h / size, 0));
        const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789';
        let acc = 0, primed = false;
        return {
            draw(ctx, w, h, t, dt) {
                if (!primed) { ctx.fillStyle = '#000a04'; ctx.fillRect(0, 0, w, h); primed = true; }
                acc += dt;
                if (acc < 0.045) return; // ~22 steps/s, trail fades per step
                acc = 0;
                ctx.fillStyle = 'rgba(0,10,4,0.14)'; ctx.fillRect(0, 0, w, h);
                ctx.font = `${size}px monospace`;
                drops.forEach((d, i) => {
                    const ch = chars[(Math.random() * chars.length) | 0];
                    ctx.fillStyle = '#d6ffe0'; ctx.fillText(ch, i * size, d * size);
                    ctx.fillStyle = '#00ff66'; ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, (d - 1) * size);
                    if (d * size > h && Math.random() > 0.975) drops[i] = 0;
                    drops[i] += 1;
                });
            }
        };
    },

    // --- Neon waves: synthwave sunset with moving sine layers ---
    waves(w, h) {
        return {
            draw(ctx, w, h, t) {
                const sky = ctx.createLinearGradient(0, 0, 0, h);
                sky.addColorStop(0, '#12002b'); sky.addColorStop(0.55, '#5b0a6e'); sky.addColorStop(1, '#ff3d7f');
                ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
                const u = Math.min(w, h), sx = w / 2, sy = h * 0.48, sr = u * 0.28;
                const sun = ctx.createLinearGradient(0, sy - sr, 0, sy + sr);
                sun.addColorStop(0, '#ffe66d'); sun.addColorStop(1, '#ff4d6d');
                ctx.fillStyle = sun; ctx.beginPath(); ctx.arc(sx, sy, sr, 0, TAU); ctx.fill();
                const layers = [
                    { y: 0.56, a: 0.020, c: '#7a1fa2', f: 3, s: 0.6 },
                    { y: 0.64, a: 0.026, c: '#4a1170', f: 4, s: -0.8 },
                    { y: 0.74, a: 0.032, c: '#2a0a4d', f: 5, s: 1.0 },
                    { y: 0.86, a: 0.040, c: '#12002b', f: 6, s: -1.2 }
                ];
                layers.forEach(l => {
                    ctx.fillStyle = l.c; ctx.beginPath(); ctx.moveTo(0, h);
                    const step = Math.max(4, w / 90);
                    for (let x = 0; x <= w + step; x += step) {
                        ctx.lineTo(x, h * l.y + Math.sin(x / w * l.f * TAU / 2 + t * l.s) * h * l.a);
                    }
                    ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = 'rgba(255,120,220,0.55)'; ctx.lineWidth = Math.max(1, u / 400); ctx.stroke();
                });
            }
        };
    },

    // --- Constellation: drifting nodes joined by lines ---
    constellation(w, h) {
        const u = Math.min(w, h);
        const n = Math.round(Math.min(90, Math.max(40, (w * h) / 14000)));
        const pts = Array.from({ length: n }, () => ({ x: rand(0, w), y: rand(0, h), vx: rand(-1, 1) * u / 25, vy: rand(-1, 1) * u / 25, r: rand(1, 2.4) * u / 500 }));
        const link = u * 0.17;
        return {
            draw(ctx, w, h, t, dt) {
                const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
                bg.addColorStop(0, '#13233f'); bg.addColorStop(1, '#050a14');
                ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
                pts.forEach(p => {
                    p.x += p.vx * dt; p.y += p.vy * dt;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                });
                ctx.lineWidth = Math.max(0.6, u / 700);
                for (let i = 0; i < n; i++) {
                    for (let j = i + 1; j < n; j++) {
                        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
                        if (d < link) {
                            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / link) * 0.55})`;
                            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
                        }
                    }
                }
                ctx.fillStyle = '#bfdbfe';
                pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill(); });
            }
        };
    },

    // --- Bokeh: soft glowing lights floating upward ---
    bokeh(w, h) {
        const u = Math.min(w, h);
        const orbs = Array.from({ length: 28 }, () => ({
            x: rand(0, w), y: rand(0, h), r: rand(0.03, 0.11) * u, vy: rand(0.01, 0.05) * u,
            hue: rand(300, 40), a: rand(0.15, 0.5), p: rand(0, TAU)
        }));
        return {
            draw(ctx, w, h, t, dt) {
                const bg = ctx.createLinearGradient(0, 0, w, h);
                bg.addColorStop(0, '#1a0933'); bg.addColorStop(1, '#3a0d3f');
                ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
                ctx.globalCompositeOperation = 'lighter';
                orbs.forEach(o => {
                    o.y -= o.vy * dt;
                    if (o.y < -o.r) { o.y = h + o.r; o.x = rand(0, w); }
                    const x = o.x + Math.sin(t * 0.4 + o.p) * u * 0.03;
                    const hue = (o.hue + 360) % 360;
                    const g = ctx.createRadialGradient(x, o.y, 0, x, o.y, o.r);
                    const a = o.a * (0.7 + 0.3 * Math.sin(t + o.p));
                    g.addColorStop(0, `hsla(${hue},95%,65%,${a})`);
                    g.addColorStop(0.8, `hsla(${hue},95%,60%,${a * 0.5})`);
                    g.addColorStop(1, `hsla(${hue},95%,60%,0)`);
                    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, o.y, o.r, 0, TAU); ctx.fill();
                });
                ctx.globalCompositeOperation = 'source-over';
            }
        };
    },

    // --- Lava: slow morphing colour blobs ---
    lava(w, h) {
        const u = Math.min(w, h);
        const blobs = [
            { hue: 15, r: 0.55, sx: 0.23, sy: 0.31, px: 0, py: 1 },
            { hue: 330, r: 0.50, sx: 0.19, sy: 0.27, px: 2, py: 3 },
            { hue: 45, r: 0.45, sx: 0.31, sy: 0.17, px: 4, py: 5 },
            { hue: 265, r: 0.55, sx: 0.17, sy: 0.23, px: 1, py: 4 }
        ];
        return {
            draw(ctx, w, h, t) {
                ctx.fillStyle = '#2a0a2e'; ctx.fillRect(0, 0, w, h);
                ctx.globalCompositeOperation = 'screen';
                blobs.forEach(b => {
                    const x = w / 2 + Math.sin(t * b.sx + b.px) * w * 0.35;
                    const y = h / 2 + Math.sin(t * b.sy + b.py) * h * 0.35;
                    const r = b.r * Math.max(u, Math.min(w, h) * 1.1);
                    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
                    g.addColorStop(0, `hsla(${b.hue},95%,58%,0.9)`);
                    g.addColorStop(1, `hsla(${b.hue},95%,58%,0)`);
                    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
                });
                ctx.globalCompositeOperation = 'source-over';
            }
        };
    },

    // --- Sakura: petals drifting down a twilight sky ---
    sakura(w, h) {
        const u = Math.min(w, h);
        const petals = Array.from({ length: 45 }, () => ({
            x: rand(0, w), y: rand(-h, h), s: rand(0.012, 0.028) * u, vy: rand(0.05, 0.12) * u,
            sw: rand(0.5, 1.4), p: rand(0, TAU), rot: rand(0, TAU), vr: rand(-1.5, 1.5)
        }));
        return {
            draw(ctx, w, h, t, dt) {
                const sky = ctx.createLinearGradient(0, 0, 0, h);
                sky.addColorStop(0, '#2b1b4e'); sky.addColorStop(0.6, '#b0558a'); sky.addColorStop(1, '#f7b2a6');
                ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
                petals.forEach(p => {
                    p.y += p.vy * dt; p.rot += p.vr * dt;
                    if (p.y > h + p.s * 2) { p.y = -p.s * 2; p.x = rand(0, w); }
                    const x = p.x + Math.sin(t * p.sw + p.p) * u * 0.05;
                    ctx.save(); ctx.translate(x, p.y); ctx.rotate(p.rot);
                    ctx.scale(1, 0.6 + 0.4 * Math.sin(t * 2 + p.p));
                    ctx.fillStyle = 'rgba(255,205,225,0.92)';
                    ctx.beginPath();
                    ctx.moveTo(0, -p.s);
                    ctx.bezierCurveTo(p.s, -p.s * 0.8, p.s * 0.9, p.s * 0.6, 0, p.s);
                    ctx.bezierCurveTo(-p.s * 0.9, p.s * 0.6, -p.s, -p.s * 0.8, 0, -p.s);
                    ctx.fill(); ctx.restore();
                });
            }
        };
    },

    // --- Rain City: neon skyline in a downpour (anime night street) ---
    rainCity(w, h) {
        const u = Math.min(w, h);
        const bg = makeLayer(w, h, c => {
            const g = c.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#0a0420'); g.addColorStop(0.55, '#3a1470'); g.addColorStop(1, '#ff4fa3');
            c.fillStyle = g; c.fillRect(0, 0, w, h);
            skylineLayer(c, w, h, 0.88, 0.10, 0.34, '#2b1052', '#ff9ad0');
            skylineLayer(c, w, h, 0.88, 0.05, 0.20, '#0c0520', '#7ae8ff');
            const s = c.createLinearGradient(0, h * 0.88, 0, h);
            s.addColorStop(0, 'rgba(255,79,163,0.55)'); s.addColorStop(1, 'rgba(10,4,32,0.95)');
            c.fillStyle = s; c.fillRect(0, h * 0.88, w, h * 0.12);
        });
        const signs = [{ x: .2, y: .62, c: '0,229,255' }, { x: .72, y: .55, c: '255,45,149' },
            { x: .45, y: .70, c: '255,225,77' }, { x: .86, y: .72, c: '0,229,255' }].map(s => ({ ...s, p: rand(0, TAU) }));
        const drops = Array.from({ length: 170 }, () => ({ x: rand(-0.1 * w, w), y: rand(0, h), l: rand(0.03, 0.07) * h, v: rand(0.9, 1.6) * h * 0.9, a: rand(0.2, 0.55) }));
        return {
            draw(ctx, w, h, t, dt) {
                ctx.drawImage(bg, 0, 0, w, h);
                ctx.globalCompositeOperation = 'lighter';
                signs.forEach(s => {
                    const fl = 0.75 + 0.25 * Math.sin(t * 3 + s.p) * Math.sin(t * 0.7 + s.p * 2);
                    const r = u * 0.18, cx = s.x * w, cy = s.y * h;
                    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                    g.addColorStop(0, `rgba(${s.c},${0.5 * fl})`); g.addColorStop(1, `rgba(${s.c},0)`);
                    ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
                });
                ctx.lineWidth = Math.max(1, u / 700);
                drops.forEach(d => {
                    d.y += d.v * dt; d.x += d.v * dt * 0.18;
                    if (d.y > h) { d.y = -d.l; d.x = rand(-0.1 * w, w); }
                    ctx.strokeStyle = `rgba(207,227,255,${d.a})`;
                    ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x + d.l * 0.18, d.y + d.l); ctx.stroke();
                });
                ctx.globalCompositeOperation = 'source-over';
            }
        };
    },

    // --- Fireflies: glowing lights drifting through a night forest ---
    fireflies(w, h) {
        const u = Math.min(w, h);
        const bg = makeLayer(w, h, c => {
            const g = c.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#04101f'); g.addColorStop(0.65, '#0b2a2c'); g.addColorStop(1, '#03100d');
            c.fillStyle = g; c.fillRect(0, 0, w, h);
            [['#0a2420', 0.80, 0.13], ['#06160f', 0.90, 0.17], ['#020a07', 1.0, 0.20]].forEach(([col, base, ph], i) => {
                c.fillStyle = col;
                const n = 7 + i * 3, step = w / n;
                for (let k = -1; k <= n; k++) {
                    const x = k * step + rand(-step * 0.2, step * 0.2), th = h * (ph + rand(0, 0.12)), bw = step * rand(0.7, 1.1);
                    c.beginPath(); c.moveTo(x - bw / 2, h * base); c.lineTo(x, h * base - th); c.lineTo(x + bw / 2, h * base); c.closePath(); c.fill();
                }
                c.fillRect(0, h * base - 1, w, h);
            });
        });
        const glow = makeLayer(64, 64, c => {
            const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
            g.addColorStop(0, 'rgba(235,255,150,1)'); g.addColorStop(0.25, 'rgba(190,255,90,0.55)'); g.addColorStop(1, 'rgba(120,255,60,0)');
            c.fillStyle = g; c.fillRect(0, 0, 64, 64);
        });
        const flies = Array.from({ length: 70 }, () => ({
            x: rand(0, w), y: rand(h * 0.25, h * 0.95), s: rand(0.012, 0.04) * u, ph: rand(0, TAU), sp: rand(0.4, 1.1), pr: rand(0.6, 1.6)
        }));
        return {
            draw(ctx, w, h, t) {
                ctx.drawImage(bg, 0, 0, w, h);
                ctx.globalCompositeOperation = 'lighter';
                flies.forEach(f => {
                    const x = f.x + Math.sin(t * f.sp + f.ph) * u * 0.06;
                    const y = f.y + Math.cos(t * f.sp * 0.8 + f.ph * 2) * u * 0.05;
                    const a = Math.pow(Math.max(0, Math.sin(t * f.pr + f.ph)), 2);
                    ctx.globalAlpha = 0.15 + 0.85 * a;
                    const sz = f.s * 4;
                    ctx.drawImage(glow, x - sz / 2, y - sz / 2, sz, sz);
                });
                ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
            }
        };
    },

    // --- Shooting Stars: meteors streaking over a twilight hill ---
    shootingStars(w, h) {
        const u = Math.min(w, h);
        const stars = Array.from({ length: 130 }, () => ({ x: rand(0, w), y: rand(0, h * 0.8), r: rand(0.4, 1.5) * u / 600, p: rand(0, TAU) }));
        const bg = makeLayer(w, h, c => {
            const g = c.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#050a2a'); g.addColorStop(0.65, '#2d3a8c'); g.addColorStop(1, '#e07aa0');
            c.fillStyle = g; c.fillRect(0, 0, w, h);
            c.fillStyle = '#050816'; c.beginPath(); c.moveTo(0, h);
            for (let x = 0; x <= w; x += Math.max(4, w / 120))
                c.lineTo(x, h * 0.86 + Math.sin(x / w * 5) * h * 0.025 + Math.sin(x / w * 13 + 2) * h * 0.01);
            c.lineTo(w, h); c.closePath(); c.fill();
        });
        const meteors = []; let next = 0.4;
        return {
            draw(ctx, w, h, t, dt) {
                ctx.drawImage(bg, 0, 0, w, h);
                ctx.fillStyle = '#fff';
                stars.forEach(s => {
                    ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.2 + s.p));
                    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.fill();
                });
                ctx.globalAlpha = 1;
                next -= dt;
                if (next <= 0) {
                    meteors.push({ x: rand(0.35 * w, 1.05 * w), y: rand(-0.05 * h, 0.3 * h), age: 0, life: rand(0.8, 1.3), len: u * rand(0.25, 0.45) });
                    next = rand(0.7, 2.0);
                }
                ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
                for (let i = meteors.length - 1; i >= 0; i--) {
                    const m = meteors[i];
                    m.age += dt; m.x -= u * 1.0 * dt; m.y += u * 0.75 * dt;
                    if (m.age > m.life) { meteors.splice(i, 1); continue; }
                    const a = Math.sin(Math.PI * m.age / m.life);
                    const tx = m.x + m.len * 0.8, ty = m.y - m.len * 0.6;
                    const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
                    g.addColorStop(0, `rgba(255,255,255,${a})`); g.addColorStop(1, 'rgba(160,190,255,0)');
                    ctx.strokeStyle = g; ctx.lineWidth = Math.max(1.5, u / 320);
                    ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
                    ctx.fillStyle = `rgba(255,255,255,${a})`;
                    ctx.beginPath(); ctx.arc(m.x, m.y, Math.max(2, u / 260), 0, TAU); ctx.fill();
                }
                ctx.globalCompositeOperation = 'source-over';
            }
        };
    },

    // --- Drift Clouds: puffy summer-sky clouds sailing past ---
    driftClouds(w, h) {
        const u = Math.min(w, h);
        const bg = makeLayer(w, h, c => {
            const g = c.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#2f7bff'); g.addColorStop(0.6, '#8fd0ff'); g.addColorStop(1, '#ffe9c7');
            c.fillStyle = g; c.fillRect(0, 0, w, h);
            const sun = c.createRadialGradient(w * 0.78, h * 0.16, 0, w * 0.78, h * 0.16, u * 0.6);
            sun.addColorStop(0, 'rgba(255,250,220,0.85)'); sun.addColorStop(1, 'rgba(255,250,220,0)');
            c.fillStyle = sun; c.fillRect(0, 0, w, h);
        });
        const puffs = [[0.5, 0.62, 0.30], [0.9, 0.45, 0.38], [1.35, 0.5, 0.42], [1.8, 0.62, 0.30], [1.15, 0.72, 0.36]];
        const sprite = r => makeLayer(r * 2.4, r * 1.3, c => {
            [['#bcd3f5', r * 0.07], ['#ffffff', 0]].forEach(([col, dy]) => {
                puffs.forEach(([px, py, pr]) => {
                    const g = c.createRadialGradient(px * r, py * r - pr * r * 0.2 + dy, 0, px * r, py * r + dy, pr * r);
                    g.addColorStop(0, col); g.addColorStop(1, col === '#ffffff' ? '#e3eeff' : col);
                    c.fillStyle = g; c.beginPath(); c.arc(px * r, py * r + dy, pr * r, 0, TAU); c.fill();
                });
            });
        });
        const clouds = Array.from({ length: 9 }, () => {
            const d = Math.random(), r = u * (0.10 + 0.16 * d);
            return { d, r, x: rand(-r * 2, w), y: rand(0.05, 0.78) * h, v: u * (0.012 + 0.03 * d), spr: sprite(r) };
        }).sort((a, b) => a.d - b.d);
        return {
            draw(ctx, w, h, t, dt) {
                ctx.drawImage(bg, 0, 0, w, h);
                clouds.forEach(c => {
                    c.x += c.v * dt;
                    if (c.x > w + c.r * 0.5) { c.x = -c.r * 2.6; c.y = rand(0.05, 0.78) * h; }
                    ctx.globalAlpha = 0.72 + 0.28 * c.d;
                    ctx.drawImage(c.spr, c.x, c.y);
                });
                ctx.globalAlpha = 1;
            }
        };
    },

    // --- Snow Village: quiet snowfall over a lit mountain village ---
    snowVillage(w, h) {
        const u = Math.min(w, h);
        const bg = makeLayer(w, h, c => {
            const g = c.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#050c2e'); g.addColorStop(0.6, '#1c2f78'); g.addColorStop(1, '#5b7bd0');
            c.fillStyle = g; c.fillRect(0, 0, w, h);
            c.fillStyle = '#fff';
            for (let i = 0; i < 120; i++) { c.globalAlpha = rand(0.3, 0.9); c.beginPath(); c.arc(rand(0, w), rand(0, h * 0.5), rand(0.5, 1.4) * u / 700, 0, TAU); c.fill(); }
            c.globalAlpha = 1;
            const m = c.createRadialGradient(w * 0.74, h * 0.17, 0, w * 0.74, h * 0.17, u * 0.22);
            m.addColorStop(0, 'rgba(244,248,255,1)'); m.addColorStop(0.2, 'rgba(244,248,255,0.9)'); m.addColorStop(1, 'rgba(244,248,255,0)');
            c.fillStyle = m; c.fillRect(0, 0, w, h);
            const gy = h * 0.84;
            c.fillStyle = '#cfe0ff'; c.fillRect(0, gy, w, h - gy);
            let x = w * 0.02;
            while (x < w * 0.95) {
                const bw = rand(0.14, 0.24) * w * (w > h ? 0.5 : 1), bh = rand(0.07, 0.12) * h * (w > h ? 1.3 : 1), roof = rand(0.04, 0.07) * h;
                c.fillStyle = '#0b1230'; c.beginPath();
                c.moveTo(x, gy); c.lineTo(x, gy - bh); c.lineTo(x + bw / 2, gy - bh - roof); c.lineTo(x + bw, gy - bh); c.lineTo(x + bw, gy); c.fill();
                c.fillStyle = '#f4f8ff'; c.beginPath();
                c.moveTo(x - 4, gy - bh + 4); c.lineTo(x + bw / 2, gy - bh - roof - 4); c.lineTo(x + bw + 4, gy - bh + 4);
                c.lineTo(x + bw, gy - bh + 12); c.lineTo(x + bw / 2, gy - bh - roof + 10); c.lineTo(x, gy - bh + 12); c.fill();
                c.shadowColor = '#ff9a3c'; c.shadowBlur = u * 0.03; c.fillStyle = '#ffd27a';
                for (let k = 0; k < 2; k++) c.fillRect(x + bw * (0.2 + 0.4 * k), gy - bh * 0.7, bw * 0.14, bh * 0.4);
                c.shadowBlur = 0;
                x += bw + rand(0.01, 0.05) * w;
            }
        });
        const flakes = Array.from({ length: 150 }, () => ({ x: rand(0, w), y: rand(0, h), r: rand(0.8, 3.2) * u / 700, v: rand(0.03, 0.09) * u, sw: rand(0.4, 1.2), p: rand(0, TAU) }));
        return {
            draw(ctx, w, h, t, dt) {
                ctx.drawImage(bg, 0, 0, w, h);
                ctx.fillStyle = '#fff';
                flakes.forEach(f => {
                    f.y += f.v * dt;
                    if (f.y > h + 4) { f.y = -4; f.x = rand(0, w); }
                    ctx.globalAlpha = 0.5 + 0.5 * (f.r * 700 / u / 3.2);
                    ctx.beginPath(); ctx.arc(f.x + Math.sin(t * f.sw + f.p) * u * 0.02, f.y, f.r, 0, TAU); ctx.fill();
                });
                ctx.globalAlpha = 1;
            }
        };
    },

    // --- Sky Lanterns: glowing lanterns rising over a still river ---
    skyLanterns(w, h) {
        const u = Math.min(w, h);
        const bg = makeLayer(w, h, c => {
            const g = c.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#0a0422'); g.addColorStop(0.6, '#3a1470'); g.addColorStop(1, '#c0507a');
            c.fillStyle = g; c.fillRect(0, 0, w, h);
            c.fillStyle = '#fff';
            for (let i = 0; i < 110; i++) { c.globalAlpha = rand(0.3, 0.9); c.beginPath(); c.arc(rand(0, w), rand(0, h * 0.6), rand(0.5, 1.4) * u / 700, 0, TAU); c.fill(); }
            c.globalAlpha = 1;
            const r = c.createLinearGradient(0, h * 0.9, 0, h);
            r.addColorStop(0, '#1a0b35'); r.addColorStop(1, '#07030f');
            c.fillStyle = r; c.fillRect(0, h * 0.9, w, h * 0.1);
        });
        const glow = makeLayer(128, 128, c => {
            const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
            g.addColorStop(0, 'rgba(255,190,90,0.9)'); g.addColorStop(0.35, 'rgba(255,140,50,0.35)'); g.addColorStop(1, 'rgba(255,120,40,0)');
            c.fillStyle = g; c.fillRect(0, 0, 128, 128);
        });
        const lanterns = Array.from({ length: 34 }, () => ({
            x: rand(0, w), y: rand(0, h), s: rand(0.026, 0.07) * u, v: rand(0.02, 0.06) * u, sw: rand(0.3, 0.9), p: rand(0, TAU)
        }));
        return {
            draw(ctx, w, h, t, dt) {
                ctx.drawImage(bg, 0, 0, w, h);
                lanterns.forEach(l => {
                    l.y -= l.v * dt;
                    if (l.y < -l.s * 4) { l.y = h * 0.9 + l.s; l.x = rand(0, w); }
                    const x = l.x + Math.sin(t * l.sw + l.p) * u * 0.03;
                    const fl = 0.85 + 0.15 * Math.sin(t * 5 + l.p);
                    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = fl;
                    ctx.drawImage(glow, x - l.s * 3, l.y - l.s * 3, l.s * 6, l.s * 6);
                    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
                    const body = ctx.createLinearGradient(0, l.y - l.s * 0.6, 0, l.y + l.s * 0.6);
                    body.addColorStop(0, '#ffd27a'); body.addColorStop(1, '#ff7a30');
                    ctx.fillStyle = body;
                    ctx.fillRect(x - l.s * 0.42, l.y - l.s * 0.6, l.s * 0.84, l.s * 1.2);
                    ctx.fillStyle = '#5a2a14';
                    ctx.fillRect(x - l.s * 0.42, l.y - l.s * 0.66, l.s * 0.84, l.s * 0.12);
                    ctx.fillRect(x - l.s * 0.3, l.y + l.s * 0.56, l.s * 0.6, l.s * 0.1);
                });
            }
        };
    }
};

/* ===== LivePlayer: runs an engine on a canvas =====
 * Keeps the canvas bitmap sized to its CSS box (capped for battery),
 * and only animates while started. Respects reduced-motion by drawing
 * a few still frames instead of looping.
 */
class LivePlayer {
    constructor(canvas, engineName, opts = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.name = engineName;
        this.fixedSize = opts.fixedSize || null;   // {w,h} for offscreen recording
        this.maxDpr = opts.maxDpr || 1.5;
        this.raf = 0;
        this.running = false;
        this.engine = null;
        this.resize();
    }

    resize() {
        let w, h;
        if (this.fixedSize) {
            ({ w, h } = this.fixedSize);
        } else {
            const r = this.canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
            w = Math.max(2, Math.round(r.width * dpr));
            h = Math.max(2, Math.round(r.height * dpr));
        }
        if (w === this.canvas.width && h === this.canvas.height && this.engine) return;
        this.canvas.width = w; this.canvas.height = h;
        this.engine = LIVE_ENGINES[this.name](w, h);
        this.t = this.t || 0;
        this.renderFrame(0);
    }

    renderFrame(dt) {
        this.t = (this.t || 0) + dt;
        this.engine.draw(this.ctx, this.canvas.width, this.canvas.height, this.t, dt);
    }

    start() {
        if (this.running) return;
        if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches && !this.fixedSize) {
            for (let i = 0; i < 30; i++) this.renderFrame(1 / 30); // settle a still frame
            return;
        }
        this.running = true;
        let last = performance.now();
        const loop = now => {
            if (!this.running) return;
            const dt = Math.min(0.05, (now - last) / 1000); // clamp after tab switches
            last = now;
            this.renderFrame(dt);
            this.raf = requestAnimationFrame(loop);
        };
        this.raf = requestAnimationFrame(loop);
    }

    stop() {
        this.running = false;
        cancelAnimationFrame(this.raf);
    }
}

/* ===== Record a live wallpaper to a downloadable video =====
 * Renders offscreen at the requested size and records with MediaRecorder.
 * Returns a Blob (webm, or mp4 on Safari). Rejects if unsupported.
 */
function recordLiveWallpaper(engineName, width, height, seconds = 10, onProgress) {
    return new Promise((resolve, reject) => {
        if (!window.MediaRecorder) return reject(new Error('Recording is not supported in this browser'));
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        if (!canvas.captureStream) return reject(new Error('Recording is not supported in this browser'));
        const player = new LivePlayer(canvas, engineName, { fixedSize: { w: width, h: height } });
        const types = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'];
        const mime = types.find(t => MediaRecorder.isTypeSupported(t));
        let rec;
        try {
            rec = new MediaRecorder(canvas.captureStream(30), mime ? { mimeType: mime, videoBitsPerSecond: 8e6 } : {});
        } catch (e) { return reject(e); }
        const chunks = [];
        rec.ondataavailable = e => e.data && e.data.size && chunks.push(e.data);
        rec.onstop = () => { player.stop(); resolve(new Blob(chunks, { type: rec.mimeType || 'video/webm' })); };
        rec.onerror = e => { player.stop(); reject(e.error || new Error('Recording failed')); };
        rec.start(250);
        player.start();
        const startedAt = performance.now();
        const tick = setInterval(() => {
            const p = Math.min(1, (performance.now() - startedAt) / (seconds * 1000));
            if (onProgress) onProgress(p);
            if (p >= 1) { clearInterval(tick); rec.stop(); }
        }, 200);
    });
}
