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
