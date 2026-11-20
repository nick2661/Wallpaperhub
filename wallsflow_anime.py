"""
Slow, polite downloader for anime live wallpapers from wallsflow.com (personal use only).

How it works
- Gets the list of wallpaper pages from the site's own sitemap (news_pages.xml)
- Keeps only pages under /live-wallpapers/anime/
- Opens each wallpaper page (NOT the /download/ pages) and reads the MP4 link from it
- Downloads one file at a time with a random delay between requests
- Resumes: pages already finished are listed in done.txt and skipped
- Stops at once if the site blocks or challenges the script. No workarounds.

Usage (PowerShell):
    pip install requests
    python wallsflow_anime.py 3        # test run: only the first 3 wallpapers
    python wallsflow_anime.py          # everything
"""
import os
import random
import re
import sys
import time

import requests

BASE = "https://wallsflow.com"
SITEMAP_URL = BASE + "/news_pages.xml"
LOCAL_SITEMAP = "news_pages.xml"      # fallback: save the sitemap from your browser here
CATEGORY = "/live-wallpapers/anime/"
OUT_DIR = "anime_wallpapers"
DONE_FILE = os.path.join(OUT_DIR, "done.txt")
DELAY = (4, 8)                        # seconds to wait between requests

session = requests.Session()
session.headers.update({"User-Agent": "personal-wallpaper-script/1.0"})


class Blocked(Exception):
    pass


def pause():
    time.sleep(random.uniform(*DELAY))


def get_text(url):
    r = session.get(url, timeout=30)
    head = r.text[:3000].lower()
    if r.status_code in (403, 429, 503) or "just a moment" in head or "cf-challenge" in head:
        raise Blocked(f"Blocked or challenged ({r.status_code}) at {url}")
    r.raise_for_status()
    return r.text


def sitemap_page_urls():
    if os.path.exists(LOCAL_SITEMAP):
        print(f"Using local {LOCAL_SITEMAP}")
        text = open(LOCAL_SITEMAP, encoding="utf-8").read()
    else:
        text = get_text(SITEMAP_URL)
    urls = []
    for loc in re.findall(r"<loc>\s*(.*?)\s*</loc>", text):
        if loc.endswith(".xml"):          # nested sitemap
            pause()
            urls += re.findall(r"<loc>\s*(.*?)\s*</loc>", get_text(loc))
        else:
            urls.append(loc)
    return [u for u in dict.fromkeys(urls) if CATEGORY in u]


def find_mp4(html):
    m = re.search(r'"contentUrl"\s*:\s*"([^"]+?\.mp4)"', html)
    if not m:
        m = re.search(r'data-video-src="([^"]+?\.mp4)"', html)
    return m.group(1).replace("\\/", "/") if m else None


def download(url, dest):
    tmp = dest + ".part"
    with session.get(url, stream=True, timeout=60, headers={"Referer": BASE + "/"}) as r:
        if r.status_code in (403, 429, 503):
            raise Blocked(f"Blocked ({r.status_code}) downloading {url}")
        r.raise_for_status()
        size = int(r.headers.get("Content-Length", 0))
        done = 0
        with open(tmp, "wb") as f:
            for chunk in r.iter_content(1024 * 256):
                f.write(chunk)
                done += len(chunk)
                if size:
                    print(f"\r    {done / 1e6:6.1f} / {size / 1e6:.1f} MB", end="")
        print()
    os.replace(tmp, dest)


def main():
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else None
    os.makedirs(OUT_DIR, exist_ok=True)
    finished = set()
    if os.path.exists(DONE_FILE):
        finished = set(open(DONE_FILE, encoding="utf-8").read().split())

    try:
        pages = sitemap_page_urls()
    except Blocked as e:
        print(e)
        print(f"\nOpen {SITEMAP_URL} in your browser, save it as {LOCAL_SITEMAP} "
              "in this folder, then run the script again.")
        return
    print(f"Found {len(pages)} anime wallpaper pages, {len(finished)} already done.")

    count = 0
    for i, page in enumerate(pages, 1):
        if page in finished:
            continue
        if limit is not None and count >= limit:
            break
        print(f"[{i}/{len(pages)}] {page}")
        try:
            pause()
            mp4 = find_mp4(get_text(page))
            if not mp4:
                print("    no MP4 link found, skipping")
                continue
            dest = os.path.join(OUT_DIR, mp4.rsplit("/", 1)[1])
            if not os.path.exists(dest):
                pause()
                download(mp4, dest)
            with open(DONE_FILE, "a", encoding="utf-8") as f:
                f.write(page + "\n")
            count += 1
        except Blocked as e:
            print(e)
            print("The site is blocking the script. Stopping here. Ask the site owner for a pack.")
            return
        except requests.RequestException as e:
            print(f"    network error: {e} (will retry on next run)")

    print(f"Done. {count} new files in {OUT_DIR}")


if __name__ == "__main__":
    main()
