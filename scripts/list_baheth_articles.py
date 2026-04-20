"""Walk Baheth category pages and emit article URL + title pairs.

Categories to survey (useful for non-Arab learners):
  - lughwiyat  (لغويات — general language)
  - nahv       (النحو)
  - sarf       (الصرف)
  - imla       (الإملاء)
  - balagha    (البلاغة)
  - nasaih     (نصائح)
"""
import re
import sys
from urllib.request import Request, urlopen
from urllib.parse import quote

sys.stdout.reconfigure(encoding="utf-8")

UA = {"User-Agent": "Mozilla/5.0", "Accept-Language": "ar,en;q=0.8"}

CATEGORIES = {
    "lughwiyat": "لغويات",
    "nahv": "النحو",
    "sarf": "الصرف",
    "imla": "الإملاء",
    "balagha": "البلاغة",
    "nasaih": "نصائح",
}


def fetch(url: str) -> str:
    req = Request(url, headers=UA)
    return urlopen(req, timeout=45).read().decode("utf-8", "replace")


def list_category(ar_slug: str, pages: int = 3) -> list[tuple[str, str]]:
    """Return list of (url, title) for a category across N pages."""
    seen = {}
    for page in range(1, pages + 1):
        path = f"/category/{quote(ar_slug)}/page/{page}/" if page > 1 else f"/category/{quote(ar_slug)}/"
        try:
            html = fetch("https://bahethoarabia.com" + path)
        except Exception:
            continue
        for m in re.finditer(
            r'<h2[^>]*class="[^"]*post-title[^"]*"[^>]*>\s*<a href="(https://bahethoarabia\.com/[a-z0-9_-]+/)"[^>]*>([^<]+)</a>',
            html,
        ):
            url, title = m.group(1), m.group(2).strip()
            if url not in seen:
                seen[url] = title
        # fallback pattern if class differs
        if not seen:
            for m in re.finditer(
                r'<a href="(https://bahethoarabia\.com/[a-z][a-z0-9_-]+/)"[^>]*rel="bookmark"[^>]*>([^<]+)</a>',
                html,
            ):
                url, title = m.group(1), m.group(2).strip()
                if url not in seen:
                    seen[url] = title
    return list(seen.items())


def main():
    for short, ar in CATEGORIES.items():
        print(f"\n{'='*60}\n{short}  ({ar})\n{'='*60}")
        items = list_category(ar, pages=3)
        for url, title in items:
            slug = url.strip("/").split("/")[-1]
            print(f"  {slug:30}  {title[:70]}")


if __name__ == "__main__":
    main()
