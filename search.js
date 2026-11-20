/* WallpaperHub search engine (loaded before script.js).
   - word by word (every word must match), plural-proof, filler words ignored
   - related words: "tree" also finds forest / woods / pine, "car" finds supercar / mustang ...
   - typo fixing: "lamborgini" -> "lamborghini"
   - ranking: title matches first, exact words before related words
   - suggestions with counts and "related searches" chips
   Exposes window.WHSearch. */
(function () {
    'use strict';

    const STOP = new Set('wallpaper wallpapers background backgrounds hd uhd fhd 2k 4k 8k free download for of the a an and in on with to phone mobile pc best new cool image images pic pics picture pictures photo photos amoled iphone android'.split(' '));
    const SYN = { animated: 'live', moving: 'live', motion: 'live', video: 'live', videos: 'live', gif: 'live', woman: 'girl', women: 'girl', female: 'girl', lady: 'girl', gal: 'girl', chick: 'girl',
        man: 'boy', male: 'boy', guy: 'boy', cartoon: 'anime', manga: 'anime', otaku: 'anime', sportscar: 'supercar', automobile: 'car', auto: 'car', vehicle: 'car', motorbike: 'motorcycle', bike: 'motorcycle' };
    const PHRASE = { jjk: 'jujutsu kaisen', aot: 'attack on titan', mha: 'my hero academia', bnha: 'my hero academia', ds: 'demon slayer', kny: 'demon slayer', op: 'one piece',
        dbz: 'dragon ball', dragonball: 'dragon ball', hxh: 'hunter x hunter', sao: 'sword art online', csm: 'chainsaw man', gtr: 'gtr', jdm: 'jdm' };

    // Words that mean nearly the same thing. A search for any one of them also finds the others (shown after exact matches).
    // "heads | extras": searching a head word also finds the other heads and the extras;
    // searching an extra (a brand, a specific thing) finds only that, so "lamborghini" does not return every car.
    const GROUPS = [
        'tree forest woods jungle | wood pine leaf leaves autumn palm bamboo grove',
        'flower floral blossom bloom | sakura rose petal garden tulip lotus hydrangea poppy',
        'water sea ocean beach coast | wave island lake river waterfall shore surf lagoon',
        'sky cloud sunset sunrise | dawn dusk horizon sun',
        'mountain hill peak | alps volcano valley cliff canyon rock fuji',
        'car supercar hypercar sports muscle roadster sedan racing drift | mustang lamborghini ferrari bmw porsche audi nissan skyline mclaren bugatti challenger camaro corvette mercedes maserati aston kia honda mazda toyota supra civic lotus rolls',
        'motorcycle bike | rider kawasaki ducati',
        'girl woman female lady | maiden princess witch',
        'boy man male guy',
        'animal pet | cat kitten neko kitsune dog wolf tiger lion bird fox horse penguin pikachu pokemon',
        'cat kitten neko',
        'city urban skyline downtown town | street building tokyo shibuya',
        'night midnight evening | moon moonlit moonlight',
        'moon moonlit moonlight',
        'space galaxy planet nebula cosmos universe | astronaut star stars constellation',
        'fire flame blaze | lava burning inferno blazing',
        'rain rainy storm drizzle',
        'snow winter ice glacier frost',
        'abstract pattern gradient geometric | fluid',
        'dark black gothic goth | shadow',
        'neon cyber cyberpunk glow synthwave',
        'cozy | room cafe coffee reading bedroom desk',
        'samurai katana ronin | sword blade warrior ninja shinobi',
        'anime manga cartoon',
        'live animated video motion'
    ];
    const groupOf = new Map(), upOf = new Map();
    GROUPS.forEach(g => {
        const [h, m] = g.split('|');
        const heads = h.trim().split(' '), extras = (m || '').trim().split(' ').filter(Boolean);
        heads.forEach(w => { if (!groupOf.has(w)) groupOf.set(w, []); groupOf.get(w).push([...heads, ...extras]); });
        extras.forEach(w => { if (!groupOf.has(w)) groupOf.set(w, []); if (!upOf.has(w)) upOf.set(w, []); upOf.get(w).push([...heads, ...extras]); });   // known word; only used as a fallback
    });

    const POPULAR = ['anime girl', 'live anime', 'jujutsu kaisen', 'naruto', 'one piece', 'dragon ball', 'demon slayer', 'sports car', 'muscle car', 'lamborghini', 'mustang',
        'samurai', 'neon', 'rain', 'cozy', 'nature', 'space', 'sunset', 'minimal'];

    function stem(w) {
        if (w.length > 3) {
            if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
            if (/(ses|xes|ches|shes)$/.test(w)) return w.slice(0, -2);
            if (w.endsWith('s') && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
        }
        return w;
    }
    const split = t => (t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
    const words = t => split(t).map(stem);

    let vocab = new Map(), phraseList = [], builtFor = null, corpus = null;

    function itemIndex(w) {
        if (!w._sx) {
            const typeWords = (w.type === 'live' || w.type === 'video') ? 'live animated video' : '';
            const title = words(w.title);
            const tags = words(w.tags);
            const cat = words(w.category);
            w._sx = { title, tags, cat, all: [...new Set([...title, ...tags, ...cat, ...words(typeWords)])] };
        }
        return w._sx;
    }

    function build(given) {
        const list = corpus || given;   // vocabulary always comes from the whole collection
        if (builtFor === list && vocab.size) return;
        builtFor = list;
        vocab = new Map();
        const phrases = new Map();
        list.forEach(w => {
            const ix = itemIndex(w);
            ix.all.forEach(x => { if (x.length >= 2 && !STOP.has(x)) vocab.set(x, (vocab.get(x) || 0) + 1); });
            const t = (w.title || '').toLowerCase();
            phrases.set(t, 1);
        });
        phraseList = POPULAR.slice();
    }

    function lev(a, b, max) {
        if (Math.abs(a.length - b.length) > max) return max + 1;
        let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
        for (let i = 1; i <= a.length; i++) {
            const cur = [i]; let rowMin = i;
            for (let j = 1; j <= b.length; j++) {
                const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
                cur[j] = v; if (v < rowMin) rowMin = v;
            }
            if (rowMin > max) return max + 1;
            prev = cur;
        }
        return prev[b.length];
    }

    const known = t => vocab.has(t) || groupOf.has(t) || [...vocab.keys()].some(v => t.length >= 4 && v.startsWith(t));

    function fixTypo(t) {
        if (t.length < 5 || known(t)) return null;
        const max = t.length >= 8 ? 2 : 1;
        let best = null, bd = max + 1, bc = 0;
        const pool = new Set([...vocab.keys(), ...groupOf.keys()]);
        pool.forEach(v => {
            const d = lev(t, v, max);
            const c = vocab.get(v) || 1;
            if (d < bd || (d === bd && c > bc)) { best = v; bd = d; bc = c; }
        });
        return bd <= max ? best : null;
    }

    function tokenize(query) {
        let ws = split(query);
        ws = ws.flatMap(w => PHRASE[w] ? PHRASE[w].split(' ') : [w]);
        const toks = [...new Set(ws.map(stem).map(w => SYN[w] || w).filter(w => !STOP.has(w)))];
        return toks;
    }

    function expand(t) {
        const m = new Map([[t, 1]]);
        (groupOf.get(t) || []).forEach(g => g.forEach(x => { if (!m.has(x)) m.set(x, 0.5); }));
        return m;
    }

    const hit = (arr, t) => arr.some(h => h === t || (t.length >= 4 && h.startsWith(t)));

    function scoreItem(w, exps) {
        const ix = itemIndex(w);
        let matched = 0, exact = 0, score = 0;
        exps.forEach(ex => {
            let best = 0, wasExact = false;
            ex.forEach((weight, word) => {
                if (hit(ix.title, word)) { const s = (weight === 1 ? 5 : 2); if (s > best) { best = s; wasExact = weight === 1; } }
                else if (hit(ix.tags, word) || hit(ix.cat, word)) { const s = (weight === 1 ? 3 : 1); if (s > best) { best = s; wasExact = weight === 1; } }
                else if (hit(ix.all, word)) { const s = (weight === 1 ? 2 : 0.8); if (s > best) { best = s; wasExact = weight === 1; } }
            });
            if (best) { matched++; score += best; if (wasExact) exact++; }
        });
        return { matched, exact, score };
    }

    /* search(list, query) -> { items, tokens, shown, corrected:[[from,to]], mode } ; mode: 'all' | 'exact' | 'related' | 'closest' | 'none' */
    function search(list, query) {
        build(list);
        let toks = tokenize(query);
        if (!toks.length) return { items: list, tokens: [], shown: [], corrected: [], mode: 'all' };
        const corrected = [];
        toks = toks.map(t => { const f = fixTypo(t); if (f) { corrected.push([t, f]); return f; } return t; });
        toks = [...new Set(toks)];
        const exps = toks.map(expand);
        const scored = list.map(w => [w, scoreItem(w, exps)]);
        let hits = scored.filter(x => x[1].matched === toks.length);
        let mode = 'exact';
        if (hits.length) {
            if (!hits.some(x => x[1].exact === toks.length)) mode = 'related';
        } else {
            hits = scored.filter(x => x[1].matched > 0);
            mode = hits.length ? 'closest' : 'none';
            if (!hits.length) {
                // nothing for that exact thing (e.g. "dog"): fall back to its wider family (animals)
                const up = toks.map(t => { const m = expand(t); (upOf.get(t) || []).forEach(g => g.forEach(x => { if (!m.has(x)) m.set(x, 0.5); })); return m; });
                const s2 = list.map(w => [w, scoreItem(w, up)]).filter(x => x[1].matched === toks.length);
                if (s2.length) { hits = s2; mode = 'related'; }
            }
        }
        hits.sort((a, b) => (b[1].exact - a[1].exact) || (b[1].score - a[1].score));
        return { items: hits.map(x => x[0]), tokens: toks, shown: toks, corrected, mode };
    }

    /* typed-prefix suggestions: [{ text, count, kind }] */
    function suggest(list, prefix, limit) {
        build(list);
        limit = limit || 8;
        const p = prefix.toLowerCase().trim();
        if (!p) return [];
        const out = [];
        const seen = new Set();
        const lastWord = p.split(/\s+/).pop();
        const head = p.slice(0, p.length - lastWord.length);
        // curated phrases first
        POPULAR.forEach(ph => {
            if (ph.startsWith(p) || (p.length >= 2 && ph.includes(p))) { out.push({ text: ph, kind: 'phrase' }); seen.add(ph); }
        });
        // then single words from the collection
        const cands = [];
        vocab.forEach((c, w) => {
            if (w.length >= 3 && w.startsWith(lastWord) && !/^\d/.test(w)) cands.push([w, c]);
        });
        cands.sort((a, b) => b[1] - a[1] || a[0].length - b[0].length);
        cands.forEach(([w, c]) => {
            const text = head + w;
            if (!seen.has(text)) { out.push({ text, kind: 'word' }); seen.add(text); }
        });
        // typo-friendly: nothing starts with it, offer the closest word
        if (!out.length) { const f = fixTypo(lastWord); if (f) out.push({ text: head + f, kind: 'fix' }); }
        const res = out.slice(0, limit);
        res.forEach(r => { r.count = search(list, r.text).items.length; });
        return res.filter(r => r.count > 0);
    }

    /* related search chips: the most common extra tags among the results */
    function related(items, tokens, limit) {
        limit = limit || 10;
        if (!items.length) return [];
        const skip = new Set(['anime', 'live', 'video', 'animated', 'wallpaper', 'female', 'male', 'woman', 'guy', 'live wallpaper']);
        tokens.forEach(t => { skip.add(t); expand(t).forEach((_, w) => skip.add(w)); });
        const counts = new Map(), label = new Map();
        items.forEach(w => {
            const seenHere = new Set();
            split(w.tags).forEach(raw => {
                const t = stem(raw);
                if (t.length < 3 || skip.has(t) || STOP.has(t) || /^\d/.test(t) || seenHere.has(t)) return;
                seenHere.add(t); counts.set(t, (counts.get(t) || 0) + 1);
                if (!label.has(t)) label.set(t, raw);
            });
        });
        const min = Math.min(3, Math.max(1, Math.floor(items.length / 20)));
        return [...counts.entries()].filter(([, c]) => c >= min && c < items.length * 0.9)
            .sort((a, b) => b[1] - a[1]).slice(0, limit).map(([t]) => label.get(t) || t);
    }

    window.WHSearch = { search, suggest, related, popular: POPULAR, tokenize, setCorpus: l => { corpus = l; builtFor = null; } };
})();
