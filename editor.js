/* WallpaperHub editor: rotate / flip / zoom / pan / adjust one picture, then download it at the
   exact size of the chosen screen shape and quality. Opened from script.js via openEditor(wallpaper, {device, resolution}).
   Uses helpers from script.js: SHAPES, RESOLUTIONS, sizeFor, pickSrc, slug, saveBlob, showNotification, bumpDownloads. */
(function () {
    'use strict';

    const DEFAULTS = { rot: 0, flip: false, zoom: 1, px: 0, py: 0, brightness: 100, contrast: 100, saturate: 100, warmth: 0, blur: 0, bgblur: 0, focus: 55, fx: 0.5, fy: 0.5 };
    const SLIDERS = [
        ['brightness', 'Brightness', 50, 150, '%'],
        ['contrast', 'Contrast', 50, 150, '%'],
        ['saturate', 'Colour', 0, 200, '%'],
        ['warmth', 'Warmth', 0, 60, '%'],
        ['blur', 'Blur', 0, 20, ''],
        ['bgblur', 'BG blur', 0, 20, ''],
        ['focus', 'Focus size', 20, 100, '%']
    ];

    let root, frame, canvas, ctx, loadingEl, lockEl, dlBtn, subEl;
    let img = null, wp = null, shape = 'desktop', res = 'hd', st = null, showLock = false;
    let fw = 0, fh = 0, busy = false, focusMode = false;
    const FILTER_OK = (() => { try { return 'filter' in document.createElement('canvas').getContext('2d'); } catch (e) { return false; } })();

    const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    // ---------- drawing (shared by the preview and the final download) ----------
    // soft background blur: the centre stays sharp, everything outside the focus circle is blurred
    // (a focus effect, not subject cut-out; move the focus with the 'Focus point' tool)
    function mk(W, H) { const c = document.createElement('canvas'); c.width = W; c.height = H; return { c, g: c.getContext('2d') }; }
    function draw(g, W, H) {
        if (!st.bgblur) { base(g, W, H, st.blur); return; }
        const B = mk(W, H); base(B.g, W, H, st.blur + st.bgblur * 1.6);
        const A = mk(W, H); base(A.g, W, H, st.blur);
        const cx = st.fx * W, cy = st.fy * H, r = Math.max(W, H) * st.focus / 200;
        const m = A.g; m.globalCompositeOperation = 'destination-in';
        const gr = m.createRadialGradient(cx, cy, r * 0.55, cx, cy, r);
        gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        m.fillStyle = gr; m.fillRect(0, 0, W, H);
        g.drawImage(B.c, 0, 0); g.drawImage(A.c, 0, 0);
    }
    function base(g, W, H, blur) {
        const odd = st.rot % 2 === 1;
        const rw = odd ? img.naturalHeight : img.naturalWidth, rh = odd ? img.naturalWidth : img.naturalHeight;
        const k = W / 1000;
        // blurring pulls in black from outside the picture, so grow it a little to hide the dark edge
        const grow = 1 + (blur * k * 3) / Math.min(W, H);
        const s = Math.max(W / rw, H / rh) * st.zoom;
        const maxX = Math.max(0, (rw * s - W) / 2), maxY = Math.max(0, (rh * s - H) / 2);
        const ox = clamp(st.px * W, -maxX, maxX), oy = clamp(st.py * H, -maxY, maxY);
        g.save();
        g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
        if (FILTER_OK) {
            g.filter = `brightness(${st.brightness}%) contrast(${st.contrast}%) saturate(${st.saturate}%) sepia(${st.warmth}%)` +
                (blur ? ` blur(${(blur * k).toFixed(2)}px)` : '');
        }
        g.imageSmoothingQuality = 'high';
        g.translate(W / 2 + ox, H / 2 + oy);
        g.rotate(st.rot * Math.PI / 2);
        g.scale(st.flip ? -s * grow : s * grow, s * grow);
        g.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        g.restore();
        if (!FILTER_OK) softAdjust(g, W, H);
    }
    // browsers without canvas filters (older Safari): brightness / contrast / colour done per pixel
    function softAdjust(g, W, H) {
        if (st.brightness === 100 && st.contrast === 100 && st.saturate === 100 && !st.warmth) return;
        let d; try { d = g.getImageData(0, 0, W, H); } catch (e) { return; }
        const p = d.data, b = st.brightness / 100, c = st.contrast / 100, sa = st.saturate / 100, wm = st.warmth / 100;
        for (let i = 0; i < p.length; i += 4) {
            let r = p[i], gg = p[i + 1], bl = p[i + 2];
            const l = 0.299 * r + 0.587 * gg + 0.114 * bl;
            r = l + (r - l) * sa; gg = l + (gg - l) * sa; bl = l + (bl - l) * sa;
            r = ((r * b - 128) * c + 128) + 30 * wm; gg = ((gg * b - 128) * c + 128) + 8 * wm; bl = ((bl * b - 128) * c + 128) - 30 * wm;
            p[i] = clamp(r, 0, 255); p[i + 1] = clamp(gg, 0, 255); p[i + 2] = clamp(bl, 0, 255);
        }
        g.putImageData(d, 0, 0);
    }

    function paint() {
        if (!img || !canvas) return;
        draw(ctx, canvas.width, canvas.height);
        if (focusMode) {   // show where the sharp area is while placing it
            const W = canvas.width, H = canvas.height, r = Math.max(W, H) * st.focus / 200;
            ctx.save(); ctx.lineWidth = Math.max(2, W / 240); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.setLineDash([10, 8]);
            ctx.beginPath(); ctx.arc(st.fx * W, st.fy * H, r * 0.8, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        }
    }

    // ---------- layout: fit a frame of the chosen screen shape into the stage ----------
    function layout() {
        if (!root) return;
        const stage = root.querySelector('.ed-stage');
        const ar = SHAPES[shape].ar;
        const pad = 24, aw = Math.max(80, stage.clientWidth - pad * 2), ah = Math.max(80, stage.clientHeight - pad * 2);
        fw = Math.min(aw, ah * ar); fh = fw / ar;
        frame.style.width = Math.round(fw) + 'px'; frame.style.height = Math.round(fh) + 'px';
        frame.style.setProperty('--fw', Math.round(fw) + 'px');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(2, Math.round(fw * dpr)); canvas.height = Math.max(2, Math.round(fh * dpr));
        paint();
    }

    // ---------- UI ----------
    function build() {
        root = el('div', 'editor');
        root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'Customize wallpaper');

        const head = el('div', 'ed-head');
        const title = el('div', 'ed-title', '<i class="fas fa-sliders"></i><span>Customize</span>');
        subEl = el('span', 'ed-sub'); title.appendChild(subEl);
        const close = el('button', 'ed-close', '<i class="fas fa-times"></i>');
        close.type = 'button'; close.setAttribute('aria-label', 'Close editor');
        close.addEventListener('click', closeEditor);
        head.append(title, close);

        const stage = el('div', 'ed-stage');
        frame = el('div', 'ed-frame');
        canvas = el('canvas'); ctx = canvas.getContext('2d');
        loadingEl = el('div', 'ed-loading', 'Loading…');
        lockEl = el('div', 'ed-lock', '<div class="ed-time">9:41</div><div class="ed-date">Thursday, 19 November</div>');
        lockEl.hidden = true;
        frame.append(canvas, lockEl);
        stage.append(frame, loadingEl, el('p', 'ed-hint', 'Drag to move · scroll or pinch to zoom'));

        const panel = el('div', 'ed-panel');
        const scroll = el('div', 'ed-scroll');

        scroll.appendChild(el('h4', null, 'Transform'));
        const tools = el('div', 'ed-tools');
        [['rotl', 'fa-rotate-left', 'Rotate left'], ['rotr', 'fa-rotate-right', 'Rotate right'], ['flip', 'fa-left-right', 'Flip'], ['focus', 'fa-bullseye', 'Focus point']].forEach(([id, icon, label]) => {
            const b = el('button', 'ed-tool', `<i class="fas ${icon}"></i><span>${label}</span>`);
            b.type = 'button'; b.dataset.tool = id; tools.appendChild(b);
        });
        tools.addEventListener('click', e => {
            const b = e.target.closest('.ed-tool'); if (!b) return;
            if (b.dataset.tool === 'rotl') st.rot = (st.rot + 3) % 4;
            if (b.dataset.tool === 'rotr') st.rot = (st.rot + 1) % 4;
            if (b.dataset.tool === 'flip') { st.flip = !st.flip; b.classList.toggle('active', st.flip); }
            if (b.dataset.tool === 'focus') {
                focusMode = !focusMode; b.classList.toggle('active', focusMode);
                if (focusMode && !st.bgblur) { st.bgblur = 8; syncControls(); }
                paint(); return;
            }
            st.px = st.py = 0; paint();
        });
        scroll.appendChild(tools);
        scroll.appendChild(sliderRow('zoom', 'Zoom', 100, 400, '%', v => { st.zoom = v / 100; }, () => Math.round(st.zoom * 100)));

        scroll.appendChild(el('h4', null, 'Screen shape'));
        const shapes = el('div', 'ed-chips'); shapes.dataset.group = 'shape';
        Object.keys(SHAPES).forEach(k => {
            const c = el('button', 'ed-chip', SHAPES[k].label); c.type = 'button'; c.dataset.v = k; shapes.appendChild(c);
        });
        shapes.addEventListener('click', e => {
            const c = e.target.closest('.ed-chip'); if (!c) return;
            shape = c.dataset.v; st.px = st.py = 0; syncChips(); layout(); syncInfo();
            swapSource();
        });
        scroll.appendChild(shapes);

        scroll.appendChild(el('h4', null, 'Quality'));
        const quals = el('div', 'ed-chips'); quals.dataset.group = 'res';
        Object.keys(RESOLUTIONS).forEach(k => {
            const c = el('button', 'ed-chip', k.toUpperCase()); c.type = 'button'; c.dataset.v = k; quals.appendChild(c);
        });
        quals.addEventListener('click', e => {
            const c = e.target.closest('.ed-chip'); if (!c) return;
            res = c.dataset.v; syncChips(); syncInfo();
        });
        scroll.appendChild(quals);

        scroll.appendChild(el('h4', null, 'Adjust'));
        SLIDERS.forEach(([key, label, min, max, unit]) =>
            scroll.appendChild(sliderRow(key, label, min, max, unit, v => { st[key] = v; }, () => st[key])));

        const chk = el('label', 'ed-check');
        const cb = el('input'); cb.type = 'checkbox';
        cb.addEventListener('change', () => { showLock = cb.checked; lockEl.hidden = !showLock; });
        chk.append(cb, document.createTextNode('Show lock-screen clock preview'));
        scroll.appendChild(chk);

        const foot = el('div', 'ed-foot');
        const reset = el('button', 'ed-reset', '<i class="fas fa-undo"></i> Reset'); reset.type = 'button';
        reset.addEventListener('click', () => { st = Object.assign({}, DEFAULTS); focusMode = false; syncControls(); layout(); });
        dlBtn = el('button', 'ed-download', '<i class="fas fa-download"></i><span>Download</span>'); dlBtn.type = 'button';
        dlBtn.addEventListener('click', download);
        foot.append(reset, dlBtn);

        panel.append(scroll, foot);
        root.append(head, stage, panel);
        document.body.appendChild(root);

        // pan (drag), pinch and wheel zoom
        const ptrs = new Map(); let lastDist = 0;
        canvas.addEventListener('pointerdown', e => {
            canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]);
            canvas.classList.add('grabbing'); lastDist = 0;
            if (focusMode) setFocus(e);
        });
        canvas.addEventListener('pointermove', e => {
            if (!ptrs.has(e.pointerId)) return;
            const prev = ptrs.get(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]);
            if (focusMode && ptrs.size === 1) { setFocus(e); return; }
            if (ptrs.size === 1) {
                st.px += (e.clientX - prev[0]) / fw; st.py += (e.clientY - prev[1]) / fh; paintClamped();
            } else if (ptrs.size === 2) {
                const [a, b] = [...ptrs.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
                if (lastDist) { st.zoom = clamp(st.zoom * d / lastDist, 1, 4); syncControls(); paintClamped(); }
                lastDist = d;
            }
        });
        const up = e => { ptrs.delete(e.pointerId); lastDist = 0; if (!ptrs.size) canvas.classList.remove('grabbing'); };
        canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
        canvas.addEventListener('wheel', e => {
            e.preventDefault(); st.zoom = clamp(st.zoom * (e.deltaY < 0 ? 1.08 : 1 / 1.08), 1, 4); syncControls(); paintClamped();
        }, { passive: false });

        window.addEventListener('resize', () => { if (root && !root.hidden) layout(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && root && !root.hidden) closeEditor(); });
    }

    function setFocus(e) {
        const r = canvas.getBoundingClientRect();
        st.fx = clamp((e.clientX - r.left) / r.width, 0, 1); st.fy = clamp((e.clientY - r.top) / r.height, 0, 1); paint();
    }
    // keep the stored pan inside the picture so the next drag does not feel stuck
    function paintClamped() {
        const odd = st.rot % 2 === 1;
        const rw = odd ? img.naturalHeight : img.naturalWidth, rh = odd ? img.naturalWidth : img.naturalHeight;
        const s = Math.max(canvas.width / rw, canvas.height / rh) * st.zoom;
        const mx = Math.max(0, (rw * s - canvas.width) / 2) / canvas.width, my = Math.max(0, (rh * s - canvas.height) / 2) / canvas.height;
        st.px = clamp(st.px, -mx, mx); st.py = clamp(st.py, -my, my);
        paint();
    }

    const rowInputs = {};
    function sliderRow(key, label, min, max, unit, set, get) {
        const row = el('label', 'ed-row');
        const name = el('span', null, label);
        const input = el('input'); input.type = 'range'; input.min = min; input.max = max; input.step = 1;
        const out = el('output', null, '');
        const show = () => { out.textContent = get() + unit; };
        input.addEventListener('input', () => { set(+input.value); show(); paintClamped(); });
        rowInputs[key] = { input, show, get };
        row.append(name, input, out);
        return row;
    }

    function syncChips() {
        root.querySelectorAll('.ed-chips[data-group="shape"] .ed-chip').forEach(c => c.classList.toggle('active', c.dataset.v === shape));
        root.querySelectorAll('.ed-chips[data-group="res"] .ed-chip').forEach(c => c.classList.toggle('active', c.dataset.v === res));
    }
    function syncControls() {
        Object.values(rowInputs).forEach(r => { r.input.value = r.get(); r.show(); });
        root.querySelector('[data-tool="flip"]').classList.toggle('active', st.flip);
        root.querySelector('[data-tool="focus"]').classList.toggle('active', focusMode);
    }
    function syncInfo() {
        const [w, h] = sizeFor(shape, res);
        subEl.textContent = `${wp.title} · ${w}×${h}`;
    }

    // ---------- download ----------
    async function download() {
        if (busy || !img) return;
        busy = true; dlBtn.disabled = true;
        try {
            let [w, h] = sizeFor(shape, res);
            const coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
            const maxPx = coarse ? 16e6 : 40e6;
            if (w * h > maxPx) { const k = Math.sqrt(maxPx / (w * h)); w = Math.round(w * k); h = Math.round(h * k); }
            const c = document.createElement('canvas'); c.width = w; c.height = h;
            const g = c.getContext('2d');
            draw(g, w, h);
            const blob = await new Promise((ok, no) => c.toBlob(b => b ? ok(b) : no(new Error('encode')), 'image/jpeg', 0.92));
            saveBlob(blob, `${slug(wp.title)}_${w}x${h}_custom.jpg`);
            showNotification('Download started!');
            bumpDownloads(wp);
        } catch (e) {
            showNotification('Could not save this picture. Try a lower quality, or download the original instead.');
        } finally {
            busy = false; dlBtn.disabled = false;
        }
    }

    // ---------- open / close ----------
    function loadImage(src) {
        return new Promise((ok, no) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => ok(i); i.onerror = no; i.src = src; });
    }

    // our pack has a portrait and a 16:9 version: use the one that matches the chosen shape
    let srcUrl = '';
    async function swapSource() {
        const src = pickSrc(wp, !!SHAPES[shape].portrait);
        if (!img || src === srcUrl) return;
        try { const i = await loadImage(src); img = i; srcUrl = src; paint(); } catch (e) { /* keep the current picture */ }
    }

    window.openEditor = async function (wallpaper, opts) {
        opts = opts || {};
        wp = wallpaper;
        if (!root) build();
        st = Object.assign({}, DEFAULTS);
        shape = SHAPES[opts.device] ? opts.device : 'desktop';
        res = RESOLUTIONS[opts.resolution] ? opts.resolution : 'hd';
        img = null; focusMode = false; showLock = false; lockEl.hidden = true; root.querySelector('.ed-check input').checked = false;
        root.hidden = false; document.body.classList.add('editor-open');
        loadingEl.hidden = false; loadingEl.textContent = 'Loading…';
        syncChips(); syncControls(); syncInfo();
        layout();
        // best source for the chosen shape (our pack ships a 16:9 and a portrait version)
        const src = pickSrc(wallpaper, !!SHAPES[shape].portrait);
        try {
            img = await loadImage(src); srcUrl = src;
        } catch (e) {
            try { img = await loadImage(wallpaper.image); } catch (e2) {
                loadingEl.textContent = 'Could not load this picture.'; return;
            }
        }
        loadingEl.hidden = true;
        layout();
    };

    function closeEditor() {
        if (!root) return;
        root.hidden = true; document.body.classList.remove('editor-open');
    }
    window.closeEditor = closeEditor;
})();
