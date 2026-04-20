"""
Download the original cover image from a Baheth article page and save it
as public/covers/<slug>.png — ready to use as the article's coverImage.

Usage:
    python scripts/fetch_baheth_cover.py <slug> <baheth-article-url>

Example:
    python scripts/fetch_baheth_cover.py ism-fail https://bahethoarabia.com/some-article/
"""
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen

OUT = Path("public/covers")
OUT.mkdir(parents=True, exist_ok=True)

UA = {"User-Agent": "Mozilla/5.0 (compatible; BAYAN/1.0)"}


def fetch(url: str) -> bytes:
    req = Request(url, headers=UA)
    with urlopen(req, timeout=60) as r:
        return r.read()


def find_cover_url(html: str) -> str | None:
    """Find the Open Graph image URL in the article's HTML."""
    m = re.search(
        r'<meta[^>]*property=[\'"]og:image[\'"][^>]*content=[\'"]([^\'"]+)[\'"]',
        html,
    )
    if m:
        return m.group(1)
    m = re.search(
        r'<meta[^>]*content=[\'"]([^\'"]+)[\'"][^>]*property=[\'"]og:image[\'"]',
        html,
    )
    return m.group(1) if m else None


def main(slug: str, article_url: str):
    print(f"Fetching {article_url} ...")
    html = fetch(article_url).decode("utf-8", errors="replace")
    cover_url = find_cover_url(html)
    if not cover_url:
        print("No og:image found in article HTML.")
        sys.exit(1)
    print(f"Cover URL: {cover_url}")
    ext = Path(cover_url).suffix.split("?")[0].lstrip(".") or "png"
    out_path = OUT / f"{slug}.{ext}"
    img = fetch(cover_url)
    out_path.write_bytes(img)
    print(f"OK  →  {out_path}  ({len(img) // 1024} KB)")
    print(f"\nNow add this to lib/articles.ts:")
    print(f'    coverImage: "/covers/{slug}.{ext}",')


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python scripts/fetch_baheth_cover.py <slug> <baheth-article-url>")
        sys.exit(1)
    main(slug=sys.argv[1], article_url=sys.argv[2])
