/* ===== WallpaperHub Wallpaper Editor =====
 * Lets a visitor rotate, flip, zoom, move/crop and colour-adjust a wallpaper
 * for THEIR screen, then download exactly what they see.
 *
 *   openEditor(wallpaper, { device: 'android', resolution: '4k' })
 *
 * Everything runs in the browser on <canvas> (no server needed).
 * It uses these globals from script.js: RESOLUTIONS, isPortraitDevice,
 * showNotification, bumpDownloads, slug, saveBlob.
 *
 * Maths note: the image is drawn rotated by theta about the frame centre.
 * To never show empty corners we compute the smallest scale ("cover scale")
 * at which the rotated frame still fits inside the image, and clamp panning
 * so it stays that way.
 */
(function () {
    const ASPECTS = [
        { id: 'phone',   label: 'Phone 9:19.5', r: 9 / 19.5 },
        { id: 'phone16', label: 'Phone 9:16',   r: 9 / 16 },
        { id: 'tablet',  label: 'Tablet 3:4',   r: 3 / 4 },
        { id: 'desktop', label: 'Desktop 16:9', r: 16 / 9 },
        { id: 'ultra',   label: 'Ultrawide 21:9', r: 21 / 9 },
        { id: 'square',  label: 'Square 1:1',   r: 1 }
    ];
    const PRESETS = {
        none:  { label: 'Original', b: 100, c: 100, s: 100 },
        vivid: { label: 'Vivid',    b: 103, c: 112, s: 140 },
        bw:    { label: 'B&W',      b: 100, c: 110, s: 0 },
        dim:   { label: 'Dim',      b: 72,  c: 110, s: 100 },
        soft:  { label: 'Soft',     b: 105, c: 90,  s: 90 }
    };
    const DEFAULTS = { quarter: 0, fine: 0, flip: false, zoom: 1, px: 0, py: 0, b: 100, c: 100, s: 100, blur: 0 };

    let root = null, st = null, img = null, tainted = false, wallpaper = null, opts = null;
    let aspectId = 'phone', resKey = '4k', lockOn = false, canvas, ctx, frame, stage, ro, lastFocus;
    const $ = (sel) => root.querySelector(sel);

    // ---------- helpers ----------
    function imgFull(url, w) {
        return /images\.unsplash\.com/.test(url) ? `${url.split('?')[0]}?w=${w}&auto=format&q=85` : url;
    }
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const ratio = () => ASPECTS.find(a => a.id === aspectId).r;
    const theta = () => (st.quarter * 90 + st.fine) * Math.PI / 180;
    const blurPx = (W) => st.blur * W / 800;           // blur is stored as a fraction of frame width
    const bleed = (W) => (st.blur ? blurPx(W) * 2.5 : 0); // extra cover so blurred edges never show transparency

    function cssFilter(W) {
        return `brightness(${st.b / 100}) contrast(${st.c / 100}) saturate(${st.s / 100})` + (st.blur ? ` blur(${blurPx(W)}px)` : '');
    }

    // Smallest scale at which the (rotated) frame fits inside the image
    function coverScale(W, H) {
        const m = bleed(W), fw = W + 2 * m, fh = H + 2 * m;
        const c = Math.abs(Math.cos(theta())), s = Math.abs(Math.sin(theta()));
        return Math.max(((fw / 2) * c + (fh / 2) * s) / (img.naturalWidth / 2),
                        ((fw / 2) * s + (fh / 2) * c) / (img.naturalHeight / 2));
    }

    // Keep the picture covering the whole frame after any change
    function clampPan(W, H) {
        const m = bleed(W), fw = W + 2 * m, fh = H + 2 * m;
        const S = coverScale(W, H) * st.zoom, t = theta(), c = Math.cos(t), s = Math.sin(t);
        const ac = Math.abs(c), as = Math.abs(s);
        const mx = Math.max(0, img.naturalWidth * S / 2 - ((fw / 2) * ac + (fh / 2) * as));
        const my = Math.max(0, img.naturalHeight * S / 2 - ((fw / 2) * as + (fh / 2) * ac));
        const px = st.px * W, py = st.py * H;
        let qx = c * px + s * py, qy = -s * px + c * py;      // into image space
        qx = clamp(qx, -mx, mx); qy = clamp(qy, -my, my);
        st.px = (c * qx - s * qy) / W; st.py = (s * qx + c * qy) / H; // back to frame space
    }

    function drawFrame(g, W, H) {
        const S = coverScale(W, H) * st.zoom;
        g.save();
        g.translate(W / 2 + st.px * W, H / 2 + st.py * H);
        g.rotate(theta());
        g.scale(st.flip ? -S : S, S);
        g.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        g.restore();
    }

    // Output pixel size for the chosen quality + shape (capped so phones do not run out of memory)
    function outSize() {
        const long = RESOLUTIONS[resKey][0], r = ratio();
        let W = r >= 1 ? long : Math.round(long * r), H = r >= 1 ? Math.round(long / r) : long;
        const coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
        const maxPx = coarse ? 16e6 : 40e6;
        if (W * H > maxPx) { const k = Math.sqrt(maxPx / (W * H)); W = Math.round(W * k); H = Math.round(H * k); }
        return { W, H };
    }

    // ---------- preview ----------
    function layout() {
        if (!root) return;
        const pad = 16, aw = stage.clientWidth - pad * 2, ah = stage.clientHeight - pad * 2;
        if (aw <= 0 || ah <= 0) return;
        const r = ratio();
        let w = aw, h = aw / r;
        if (h > ah) { h = ah; w = ah * r; }
        frame.style.width = Math.floor(w) + 'px';
        frame.style.height = Math.floor(h) + 'px';
        frame.style.setProperty('--fw', Math.floor(w) + 'px');
        render();
    }

    let raf = 0;
    function render() { cancelAnimationFrame(raf); raf = requestAnimationFrame(renderNow); }
    function renderNow() {
        if (!root) return;
        if (!img) { updateLabels(); return; }
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const W = Math.max(2, Math.round(frame.clientWidth * dpr)), H = Math.max(2, Math.round(frame.clientHeight * dpr));
        if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }
        clampPan(W, H);
        ctx.clearRect(0, 0, W, H);
        ctx.imageSmoothingQuality = 'high';
        drawFrame(ctx, W, H);
        canvas.style.filter = cssFilter(W);          // CSS filter keeps the preview fast and works in every browser
        updateLabels();
    }

    function updateLabels() {
        const { W, H } = outSize();
        $('#edDownloadLabel').textContent = `Download ${W}×${H}`;
        $('#edZoomV').textContent = st.zoom.toFixed(2) + '×';
        $('#edFineV').textContent = st.fine + '°';
        $('#edBV').textContent = st.b; $('#edCV').textContent = st.c; $('#edSV').textContent = st.s; $('#edBlurV').textContent = st.blur;
    }

    // ---------- UI ----------
    function build() {
        root = document.createElement('div');
        root.className = 'editor';
        root.setAttribute('role', 'dialog');
        root.setAttribute('aria-modal', 'true');
        root.setAttribute('aria-label', 'Customize wallpaper');
        const chips = (arr, attr) => arr.map(a => `<button type="button" class="ed-chip" data-${attr}="${a.id}">${a.label}</button>`).join('');
        root.innerHTML = `
        <div class="ed-head">
            <div class="ed-title"><i class="fas fa-sliders"></i> Customize <span class="ed-sub" id="edName"></span></div>
            <button type="button" class="ed-close" id="edClose" aria-label="Close editor"><i class="fas fa-times"></i><span class="sr-only">Close</span></button>
        </div>
        <div class="ed-stage" id="edStage">
            <div class="ed-frame" id="edFrame">
                <canvas id="edCanvas" aria-label="Wallpaper preview. Drag to move, pinch or scroll to zoom."></canvas>
                <div class="ed-lock" id="edLock" hidden><div class="ed-time">9:41</div><div class="ed-date">Saturday, 14 November</div></div>
            </div>
            <div class="ed-loading" id="edLoading">Loading image…</div>
            <p class="ed-hint">Drag to move · pinch or scroll to zoom</p>
        </div>
        <div class="ed-panel">
            <div class="ed-scroll">
                <div class="ed-tools">
                    <button type="button" class="ed-tool" id="edRotL"><i class="fas fa-rotate-left"></i><span>Rotate left</span></button>
                    <button type="button" class="ed-tool" id="edRotR"><i class="fas fa-rotate-right"></i><span>Rotate right</span></button>
                    <button type="button" class="ed-tool" id="edFlip"><i class="fas fa-left-right"></i><span>Flip</span></button>
                </div>
                <h4>Shape</h4>
                <div class="ed-chips" id="edAspects">${chips(ASPECTS, 'aspect')}</div>
                <h4>Position</h4>
                <label class="ed-row"><span>Zoom</span><input type="range" id="edZoom" min="1" max="4" step="0.01" value="1"><output id="edZoomV"></output></label>
                <label class="ed-row"><span>Straighten</span><input type="range" id="edFine" min="-45" max="45" step="1" value="0"><output id="edFineV"></output></label>
                <h4>Adjust</h4>
                <label class="ed-row"><span>Brightness</span><input type="range" id="edB" min="40" max="160" value="100"><output id="edBV"></output></label>
                <label class="ed-row"><span>Contrast</span><input type="range" id="edC" min="50" max="160" value="100"><output id="edCV"></output></label>
                <label class="ed-row"><span>Saturation</span><input type="range" id="edS" min="0" max="200" value="100"><output id="edSV"></output></label>
                <label class="ed-row" id="edBlurRow"><span>Blur</span><input type="range" id="edBlur" min="0" max="10" step="0.5" value="0"><output id="edBlurV"></output></label>
                <h4>Looks</h4>
                <div class="ed-chips" id="edPresets">${Object.keys(PRESETS).map(k => `<button type="button" class="ed-chip" data-preset="${k}">${PRESETS[k].label}</button>`).join('')}</div>
                <h4>Quality</h4>
                <div class="ed-chips" id="edRes">${['hd', '2k', '4k', '8k'].map(k => `<button type="button" class="ed-chip" data-res="${k}">${k.toUpperCase()}</button>`).join('')}</div>
                <label class="ed-check"><input type="checkbox" id="edLockChk"> Show lock-screen preview</label>
            </div>
            <div class="ed-foot">
                <button type="button" class="ed-reset" id="edReset"><i class="fas fa-rotate"></i> Reset</button>
                <button type="button" class="ed-download" id="edDownload"><i class="fas fa-download"></i> <span id="edDownloadLabel">Download</span></button>
            </div>
        </div>`;
        document.body.appendChild(root);
        stage = $('#edStage'); frame = $('#edFrame'); canvas = $('#edCanvas'); ctx = canvas.getContext('2d');
    }

    function syncControls() {
        $('#edZoom').value = st.zoom; $('#edFine').value = st.fine;
        $('#edB').value = st.b; $('#edC').value = st.c; $('#edS').value = st.s; $('#edBlur').value = st.blur;
        $('#edFlip').classList.toggle('active', st.flip);
        root.querySelectorAll('[data-aspect]').forEach(b => b.classList.toggle('active', b.dataset.aspect === aspectId));
        root.querySelectorAll('[data-res]').forEach(b => b.classList.toggle('active', b.dataset.res === resKey));
        root.querySelectorAll('[data-preset]').forEach(b => {
            const p = PRESETS[b.dataset.preset];
            b.classList.toggle('active', p.b === st.b && p.c === st.c && p.s === st.s);
        });
        $('#edLock').hidden = !lockOn;
        $('#edLockChk').checked = lockOn;
    }

    function bind() {
        const change = () => { syncControls(); render(); };
        $('#edClose').addEventListener('click', closeEditor);
        $('#edRotL').addEventListener('click', () => { st.quarter = (st.quarter + 3) % 4; st.px = st.py = 0; change(); });
        $('#edRotR').addEventListener('click', () => { st.quarter = (st.quarter + 1) % 4; st.px = st.py = 0; change(); });
        $('#edFlip').addEventListener('click', () => { st.flip = !st.flip; change(); });
        $('#edZoom').addEventListener('input', e => { st.zoom = +e.target.value; change(); });
        $('#edFine').addEventListener('input', e => { st.fine = +e.target.value; change(); });
        $('#edB').addEventListener('input', e => { st.b = +e.target.value; change(); });
        $('#edC').addEventListener('input', e => { st.c = +e.target.value; change(); });
        $('#edS').addEventListener('input', e => { st.s = +e.target.value; change(); });
        $('#edBlur').addEventListener('input', e => { st.blur = +e.target.value; change(); });
        $('#edLockChk').addEventListener('change', e => { lockOn = e.target.checked; change(); });
        $('#edAspects').addEventListener('click', e => {
            const b = e.target.closest('[data-aspect]'); if (!b) return;
            aspectId = b.dataset.aspect; syncControls(); layout();
        });
        $('#edPresets').addEventListener('click', e => {
            const b = e.target.closest('[data-preset]'); if (!b) return;
            const p = PRESETS[b.dataset.preset]; st.b = p.b; st.c = p.c; st.s = p.s; change();
        });
        $('#edRes').addEventListener('click', e => {
            const b = e.target.closest('[data-res]'); if (!b) return;
            resKey = b.dataset.res; change();
        });
        $('#edReset').addEventListener('click', () => { Object.assign(st, DEFAULTS); change(); });
        $('#edDownload').addEventListener('click', download);

        // Drag to move, two-finger pinch to zoom, wheel to zoom
        const ptrs = new Map(); let pinch = null;
        canvas.addEventListener('pointerdown', e => {
            canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: st.zoom }; }
            canvas.classList.add('grabbing');
        });
        canvas.addEventListener('pointermove', e => {
            if (!ptrs.has(e.pointerId)) return;
            const p = ptrs.get(e.pointerId), dx = e.clientX - p.x, dy = e.clientY - p.y;
            ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (ptrs.size === 1) {
                st.px += dx / frame.clientWidth; st.py += dy / frame.clientHeight;
            } else if (ptrs.size === 2 && pinch) {
                const [a, b] = [...ptrs.values()];
                st.zoom = clamp(pinch.z * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d, 1, 4);
            }
            syncControls(); render();
        });
        const up = e => { ptrs.delete(e.pointerId); pinch = null; if (!ptrs.size) canvas.classList.remove('grabbing'); };
        canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
        canvas.addEventListener('wheel', e => {
            e.preventDefault(); st.zoom = clamp(st.zoom * Math.exp(-e.deltaY * 0.0015), 1, 4); syncControls(); render();
        }, { passive: false });
        document.addEventListener('keydown', onKey);
        ro = ('ResizeObserver' in window) ? new ResizeObserver(layout) : null;
        if (ro) ro.observe(stage); else window.addEventListener('resize', layout);
    }

    function onKey(e) { if (e.key === 'Escape') closeEditor(); }

    // ---------- export ----------
    // Safari older than 18 has no ctx.filter; fall back to a pixel loop for brightness/contrast/saturation
    function pixelAdjust(g, W, H) {
        const d = g.getImageData(0, 0, W, H), a = d.data, B = st.b / 100, C = st.c / 100, S = st.s / 100;
        for (let i = 0; i < a.length; i += 4) {
            let r = a[i] * B, gr = a[i + 1] * B, b = a[i + 2] * B;
            const l = 0.2126 * r + 0.7152 * gr + 0.0722 * b;
            r = l + (r - l) * S; gr = l + (gr - l) * S; b = l + (b - l) * S;
            a[i] = clamp((r - 127.5) * C + 127.5, 0, 255);
            a[i + 1] = clamp((gr - 127.5) * C + 127.5, 0, 255);
            a[i + 2] = clamp((b - 127.5) * C + 127.5, 0, 255);
        }
        g.putImageData(d, 0, 0);
    }

    async function download() {
        const btn = $('#edDownload');
        if (btn.disabled) return;
        btn.disabled = true;
        const { W, H } = outSize();
        try {
            const c = document.createElement('canvas'); c.width = W; c.height = H;
            const g = c.getContext('2d');
            g.imageSmoothingQuality = 'high';
            const native = 'filter' in g;
            if (native) g.filter = cssFilter(W);
            clampPan(W, H);
            drawFrame(g, W, H);
            if (!native) pixelAdjust(g, W, H);
            const blob = await new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error('encode')), 'image/jpeg', 0.93));
            saveBlob(blob, `${slug(wallpaper.title)}_${W}x${H}_custom.jpg`);
            showNotification('Saved your custom wallpaper!');
            bumpDownloads(wallpaper);
        } catch (err) {
            const blocked = err && (err.name === 'SecurityError' || tainted);
            showNotification(blocked
                ? 'This image does not allow editing downloads. Use the normal Download button.'
                : 'Could not create the image. Try a lower quality.');
        } finally {
            btn.disabled = false;
        }
    }

    // ---------- open / close ----------
    function loadImage(url) {
        return new Promise((resolve, reject) => {
            const a = new Image(); a.crossOrigin = 'anonymous';
            a.onload = () => { tainted = false; resolve(a); };
            a.onerror = () => {                       // retry without CORS: preview works, export may be blocked
                const b = new Image();
                b.onload = () => { tainted = true; resolve(b); };
                b.onerror = reject; b.src = url;
            };
            a.src = url;
        });
    }

    window.openEditor = function (w, o) {
        if (root) return;
        wallpaper = w; opts = o || {};
        lastFocus = document.activeElement;
        st = Object.assign({}, DEFAULTS);
        aspectId = (typeof isPortraitDevice === 'function' && isPortraitDevice(opts.device)) ? 'phone' : 'desktop';
        resKey = opts.resolution && RESOLUTIONS[opts.resolution] ? opts.resolution : '4k';
        lockOn = false; img = null;
        build(); bind();
        $('#edName').textContent = '· ' + w.title;
        if (!('filter' in ctx)) $('#edBlurRow').hidden = true;   // blur needs native canvas filters
        document.body.classList.add('editor-open');
        syncControls(); layout();
        $('#edClose').focus();
        loadImage(imgFull(w.image, 3000)).then(i => {
            if (!root) return;
            img = i; $('#edLoading').hidden = true; layout();
        }).catch(() => {
            if (!root) return;
            $('#edLoading').textContent = 'Could not load the image.';
        });
    };

    function closeEditor() {
        if (!root) return;
        document.removeEventListener('keydown', onKey);
        if (ro) ro.disconnect(); else window.removeEventListener('resize', layout);
        cancelAnimationFrame(raf);
        root.remove(); root = null; img = null;
        document.body.classList.remove('editor-open');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    window.closeEditor = closeEditor;
})();
