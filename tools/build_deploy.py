#!/usr/bin/env python3
"""Build a clean folder (dist/) with only the files the public site needs.

Why: the project folder also holds things that must NOT go online or only waste space:
  - the admin files (admin.html, admin-script.js, admin-styles.css)
  - images/pack/cars/originals (hundreds of MB of source photos the site never loads)
  - notes, the wallsflow downloader script, tools, scratch folders

It uses an ALLOW-LIST: only the files named below (plus everything in images/, minus any
"originals" folder) are copied, so a new script or note can never be published by accident.

Usage (from the project folder, e.g. in PowerShell):
    py tools/build_deploy.py            # builds dist/
    py tools/build_deploy.py --dry-run  # only shows what would be copied and the size
    py tools/build_deploy.py --out C:\\site_build

Then upload / deploy the dist folder (Netlify, Cloudflare Pages, Vercel, a web host, or
publish it with GitHub Pages). dist/ is rebuilt from scratch on every run.
"""
import argparse
import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKER = ".wallpaperhub-dist"          # only a folder with this file is ever wiped and rebuilt

# Files that make up the public site (copied only if they exist)
SITE_FILES = [
    "index.html", "404.html", "privacy.html", "terms.html",
    "styles.css", "script.js", "search.js", "live.js", "editor.js",
    "favicon.svg",
    # typical hosting / SEO files, used once they are added to the project
    "robots.txt", "sitemap.xml", "CNAME", ".nojekyll", "ads.txt", "_headers", "_redirects",
]
SITE_DIRS = ["images"]
EXCLUDE_DIR_NAMES = {"originals"}        # skipped anywhere inside the site folders


def human(n):
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024 or unit == "GB":
            return f"{n:.0f} {unit}" if unit in ("B", "KB") else f"{n:.1f} {unit}"
        n /= 1024


def walk_site():
    """Yield (source Path, relative Path) for every file that goes into the build; also collect skipped dirs."""
    skipped = []
    files = []
    for name in SITE_FILES:
        p = ROOT / name
        if p.is_file():
            files.append((p, Path(name)))
    for d in SITE_DIRS:
        base = ROOT / d
        if not base.is_dir():
            continue
        for dirpath, dirnames, filenames in os.walk(base):
            keep = []
            for dn in dirnames:
                if dn.lower() in EXCLUDE_DIR_NAMES:
                    skipped.append(Path(dirpath) / dn)
                else:
                    keep.append(dn)
            dirnames[:] = keep
            for fn in filenames:
                p = Path(dirpath) / fn
                files.append((p, p.relative_to(ROOT)))
    return files, skipped


def dir_size(path):
    total = 0
    for dirpath, _, filenames in os.walk(path):
        for fn in filenames:
            try:
                total += (Path(dirpath) / fn).stat().st_size
            except OSError:
                pass
    return total


def check_references(out):
    """Every local file that index.html and script.js point to must exist in the build."""
    missing = []
    text = (out / "index.html").read_text(encoding="utf-8", errors="ignore") if (out / "index.html").exists() else ""
    refs = set(re.findall(r'(?:src|href)="((?!https?:|//|#|mailto:|tel:|data:)[^"?#]+)', text))
    js = (out / "script.js").read_text(encoding="utf-8", errors="ignore") if (out / "script.js").exists() else ""
    js = "\n".join(l for l in js.split("\n") if not l.lstrip().startswith("//"))   # commented-out entries are not used
    refs |= set(re.findall(r'["\']((?:images|videos)/[A-Za-z0-9_./ -]+\.(?:jpg|jpeg|png|webp|gif|svg|mp4|webm))["\']', js))
    for r in sorted(refs):
        if not (out / r).exists():
            missing.append(r)
    return len(refs), missing


def main():
    ap = argparse.ArgumentParser(description="Build the clean deploy folder (dist/)")
    ap.add_argument("--out", default=str(ROOT / "dist"), help="output folder (default: dist next to index.html)")
    ap.add_argument("--dry-run", action="store_true", help="only report, copy nothing")
    ap.add_argument("--link", action="store_true", help="hard-link instead of copy (fast, no extra disk; do not edit files inside dist)")
    args = ap.parse_args()

    out = Path(args.out).resolve()
    if out == ROOT or ROOT in out.parents and out.relative_to(ROOT).parts[0] in ("images", "tools"):
        sys.exit(f"Refusing to build into {out}: choose another output folder.")

    files, skipped = walk_site()
    total = sum(p.stat().st_size for p, _ in files)
    print(f"Site files: {len(files)}  ({human(total)})")
    for d in skipped:
        print(f"  skipped folder: {d.relative_to(ROOT)}  ({human(dir_size(d))})")
    left_out = [n for n in sorted(os.listdir(ROOT))
                if n not in SITE_FILES and n not in SITE_DIRS and not n.startswith(".") and n != out.name]
    print("  not included (not needed online): " + ", ".join(left_out))
    if args.dry_run:
        print("Dry run: nothing copied.")
        return

    if out.exists():
        if not (out / MARKER).exists() and any(out.iterdir()):
            sys.exit(f"{out} exists and was not made by this script. Remove it yourself or use --out with another folder.")
        shutil.rmtree(out)
    out.mkdir(parents=True)
    (out / MARKER).write_text("Built by tools/build_deploy.py. Safe to delete; it is rebuilt on every run.\n")

    for src, rel in files:
        dst = out / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        if args.link:
            try:
                os.link(src, dst)
                continue
            except OSError:
                pass
        shutil.copy2(src, dst)

    n_refs, missing = check_references(out)
    built = dir_size(out)
    print(f"\nBuilt {out}  ({human(built)})")
    if built > 1024 ** 3:
        print("  Note: over 1 GB. GitHub Pages recommends sites under 1 GB; other hosts differ.")
    print(f"Checked {n_refs} file references from index.html / script.js: {len(missing)} missing")
    for m in missing[:20]:
        print("  MISSING", m)
    if missing:
        sys.exit(1)
    print("Done. Deploy the folder above (it contains no admin files, no originals, no notes or scripts).")


if __name__ == "__main__":
    main()
