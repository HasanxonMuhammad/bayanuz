"""
Scrape a Baheth article page and emit a ready-to-paste `BahethArticle` entry
for `lib/articles.ts`, plus download the cover image.

Usage:
    python scripts/scrape_baheth.py <slug> <baheth-url>

Example:
    python scripts/scrape_baheth.py al-fahm-al-qirai https://bahethoarabia.com/لغويات/الفهم-القرائي

Output:
    public/covers/<slug>.png
    stdout: a TypeScript object you can paste into articles.ts
"""
import re
import sys
import io
from pathlib import Path
from urllib.request import Request, urlopen

# Windows: force UTF-8 stdout so we can print Arabic + symbols safely
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
else:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Missing dependency. Run: pip install beautifulsoup4")
    sys.exit(1)

OUT_COVERS = Path("public/covers")
OUT_COVERS.mkdir(parents=True, exist_ok=True)

UA = {
    "User-Agent": "Mozilla/5.0 (compatible; BAYAN/1.0; +https://bayanuz.vercel.app)",
    "Accept-Language": "ar,en;q=0.8",
}

# Category mapping: Baheth slug → (nameAr, nameUz)
CATEGORY_MAP = {
    "لغويات": ("لغويات", "Til bo'yicha"),
    "النحو": ("النحو", "Nahv"),
    "الصرف": ("الصرف", "Sarf"),
    "الإملاء": ("الإملاء", "Imlo qoidalari"),
    "البلاغة": ("البلاغة", "Balag'a"),
    "المعجم": ("المعجم", "Lug'at va ma'nolar"),
    "نصائح": ("نصائح", "Maslahatlar"),
    "تعليم": ("تعليم", "Ta'lim"),
}


def fetch(url: str) -> bytes:
    from urllib.parse import quote, urlsplit, urlunsplit

    parts = urlsplit(url)
    encoded = urlunsplit(
        (
            parts.scheme,
            parts.netloc,
            quote(parts.path, safe="/"),
            quote(parts.query, safe="=&"),
            parts.fragment,
        )
    )
    req = Request(encoded, headers=UA)
    with urlopen(req, timeout=60) as r:
        return r.read()


def resolve_url(url: str) -> str:
    """Baheth uses short transliterated slugs. If the given URL 404s,
    extract the Arabic title from the slug and use Baheth's search to find
    the canonical permalink."""
    from urllib.parse import urlsplit, unquote, quote
    from urllib.error import HTTPError

    try:
        fetch(url)
        return url
    except HTTPError as e:
        if e.code != 404:
            raise

    print("  404. Resolving via search...")
    parts = urlsplit(url)
    slug_decoded = unquote(parts.path.strip("/").split("/")[-1])
    words = slug_decoded.replace("-", " ").strip().split()
    # Baheth search gets picky with long queries — use first 3 meaningful words
    # (skip leading particles like "كيف", "ما", "هل")
    skip = {"كيف", "ما", "هل", "لماذا", "متى", "أين"}
    picked = [w for w in words if w not in skip][:3]
    if len(picked) < 2:
        picked = words[:3]
    query = " ".join(picked)
    if not query:
        raise RuntimeError("Cannot derive search query from URL")
    search_url = f"https://bahethoarabia.com/?s={quote(query)}"
    html = fetch(search_url).decode("utf-8", errors="replace")
    # Try multiple selectors
    for pattern in [
        r'<h2[^>]*>\s*<a href="([^"]+)"',
        r'class="post-title"[^>]*>\s*<a href="([^"]+)"',
        r'<a[^>]*class="[^"]*post-thumb[^"]*"[^>]*href="([^"]+)"',
        r'<a[^>]*href="(https://bahethoarabia\.com/[a-z0-9_-]+/)"[^>]*>',
    ]:
        m = re.search(pattern, html)
        if m and "page" not in m.group(1) and "category" not in m.group(1):
            resolved = m.group(1)
            print(f"  -> resolved to {resolved}")
            return resolved
    raise RuntimeError(f"No Baheth search hit for query: {query}")


def clean(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip()


def ts_escape(s: str) -> str:
    """Escape string for single-quoted TypeScript literal."""
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")


def find_category(soup: BeautifulSoup, url: str) -> tuple[str, str, str]:
    """Return (slug, nameAr, nameUz) from the article's breadcrumb/category links."""
    # Try breadcrumb first
    for a in soup.select(".breadcrumbs a, .tie-breadcrumb a, nav[aria-label*=breadcrumb] a"):
        text = clean(a.get_text())
        if text in CATEGORY_MAP:
            ar, uz = CATEGORY_MAP[text]
            return text, ar, uz

    # Try rel category link
    for a in soup.select('a[rel="category tag"], .entry-categories a'):
        text = clean(a.get_text())
        if text in CATEGORY_MAP:
            ar, uz = CATEGORY_MAP[text]
            return text, ar, uz

    # Try URL path — Baheth URLs look like /<category-ar>/<slug>/
    m = re.search(r"bahethoarabia\.com/([^/]+)/", url)
    if m:
        from urllib.parse import unquote
        cat = unquote(m.group(1))
        if cat in CATEGORY_MAP:
            ar, uz = CATEGORY_MAP[cat]
            return cat, ar, uz

    return "لغويات", "لغويات", "Til bo'yicha"


def find_published_date(soup: BeautifulSoup) -> str:
    # Look for meta first
    meta = soup.find("meta", {"property": "article:published_time"})
    if meta and meta.get("content"):
        date_iso = meta["content"][:10]  # 2024-10-02
        return format_date_uz(date_iso)
    # Fallback: look for date in breadcrumb/meta area
    time = soup.find("time")
    if time:
        return clean(time.get_text())
    return ""


MONTHS_UZ = [
    "", "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
]


def format_date_uz(iso: str) -> str:
    """2024-10-02 → 'Oktabr 2, 2024'."""
    try:
        y, m, d = iso.split("-")
        return f"{MONTHS_UZ[int(m)]} {int(d)}, {y}"
    except Exception:
        return iso


def find_reading_minutes(soup: BeautifulSoup) -> int:
    # Look for "X دقائق" or "X min" type text
    for el in soup.find_all(string=re.compile(r"\d+\s*(دقائق|دقيقة|min)")):
        m = re.search(r"(\d+)", el)
        if m:
            return int(m.group(1))
    return 8  # sensible default


def find_author(soup: BeautifulSoup) -> str:
    # Try schema.org author
    for sel in [
        'meta[name="author"]',
        'meta[property="article:author"]',
    ]:
        el = soup.select_one(sel)
        if el and el.get("content"):
            return clean(el["content"])
    # Try visible byline
    for sel in [".author-name", ".entry-author a", 'a[rel="author"]']:
        el = soup.select_one(sel)
        if el:
            return clean(el.get_text())
    return "أ. منيب محمد مراد"


def find_tags(soup: BeautifulSoup) -> list[str]:
    tags = []
    for a in soup.select('a[rel="tag"], .tagcloud a, .tags-links a'):
        t = clean(a.get_text()).lstrip("#")
        if t and t not in tags:
            tags.append(t)
    return tags[:8]


def find_cover_url(soup: BeautifulSoup) -> str | None:
    og = soup.find("meta", {"property": "og:image"})
    if og and og.get("content"):
        return og["content"]
    # Fallback: first image inside content area
    img = soup.select_one(".entry-content img, article img")
    if img:
        return img.get("data-src") or img.get("src")
    return None


def find_article_body(soup: BeautifulSoup) -> BeautifulSoup | None:
    # Baheth/WordPress convention
    for sel in [
        ".entry-content",
        "article .post-content",
        "article .content",
        'div[itemprop="articleBody"]',
        "article",
    ]:
        el = soup.select_one(sel)
        if el:
            return el
    return None


def find_title_ar(soup: BeautifulSoup) -> str:
    h1 = soup.find("h1")
    if h1:
        return clean(h1.get_text())
    og = soup.find("meta", {"property": "og:title"})
    if og:
        return clean(og.get("content", ""))
    return ""


def extract_body_blocks(body: BeautifulSoup) -> list[dict]:
    """Walk the body and emit paragraph/heading/readAlso blocks."""
    blocks: list[dict] = []
    toc_items: list[str] = []
    seen_toc_wrapper = False

    for el in body.find_all(
        ["h2", "h3", "p", "blockquote", "div"],
        recursive=True,
    ):
        # Skip table-of-contents widget
        if not seen_toc_wrapper and (
            "toc" in (el.get("class") or [])
            or el.find("summary") is not None
            or (el.name == "div" and "محتويات" in el.get_text())
        ):
            # Capture TOC items if visible
            for li in el.find_all(["li", "a"]):
                t = clean(li.get_text())
                if not t or t in toc_items or t.startswith("."):
                    continue
                if t.lower() in ("toggle", "expand", "collapse", "open", "close"):
                    continue
                if t.startswith(("1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.")):
                    # remove any leading number-period
                    t = re.sub(r"^\d+\.\s*", "", t)
                toc_items.append(t)
            seen_toc_wrapper = True
            continue

        # "اقرأ أيضاً" detection (italic link block or special wrapper)
        readalso_match = None
        for a in el.find_all("a", href=True):
            sib = a.parent.get_text() if a.parent else ""
            if "اقرأ أيضاً" in sib or "اقرأ ايضا" in sib:
                readalso_match = (clean(a.get_text()), a["href"])
                break

        if readalso_match and el.name == "div":
            blocks.append({"type": "readAlso", "text": readalso_match[0], "link": readalso_match[1]})
            continue

        if el.name in ("h2", "h3"):
            text = clean(el.get_text())
            if text:
                blocks.append({"type": "heading", "text": text})
            continue

        if el.name == "p":
            text = clean(el.get_text())
            if len(text) < 20:
                continue  # skip stubs
            if "bahethoarabia.com" in text and len(text) < 40:
                continue
            blocks.append({"type": "paragraph", "text": text})
            continue

    # Dedupe consecutive identical blocks
    deduped: list[dict] = []
    for b in blocks:
        if deduped and deduped[-1] == b:
            continue
        deduped.append(b)
    return deduped, toc_items


def emit_ts(
    slug: str,
    url: str,
    cat_slug: str,
    cat_ar: str,
    cat_uz: str,
    title_ar: str,
    author: str,
    author_avatar: str,
    published_at: str,
    reading_minutes: int,
    toc: list[str],
    body: list[dict],
    tags: list[str],
    cover_path: str,
) -> str:
    def esc(s):
        return ts_escape(s)

    toc_ts = ",\n      ".join(f"'{esc(t)}'" for t in toc)
    tags_ts = ",\n      ".join(f"'{esc(t)}'" for t in tags)
    body_ts_parts = []
    for b in body:
        if b["type"] == "readAlso":
            body_ts_parts.append(
                f"      {{ type: 'readAlso', text: '{esc(b['text'])}', link: '{esc(b['link'])}' }}"
            )
        else:
            body_ts_parts.append(
                f"      {{ type: '{b['type']}', text: '{esc(b['text'])}' }}"
            )
    body_ts = ",\n".join(body_ts_parts)

    return f"""  {{
    slug: '{slug}',
    categorySlug: '{esc(cat_slug)}',
    categoryNameAr: '{esc(cat_ar)}',
    categoryNameUz: '{esc(cat_uz)}',
    titleAr: '{esc(title_ar)}',
    titleUz: '',
    authorName: '{esc(author)}',
    authorAvatar: '{author_avatar}',
    publishedAt: '{esc(published_at)}',
    readingMinutes: {reading_minutes},
    heroTitle: '',
    heroSubtitle: '',
    coverImage: '{cover_path}',
    sourceUrl: '{esc(url)}',
    tableOfContents: [
      {toc_ts}
    ],
    body: [
{body_ts}
    ],
    tags: [
      {tags_ts}
    ],
  }},"""


def main(slug: str, url: str):
    print(f"\n→ {url}")
    url = resolve_url(url)
    html = fetch(url).decode("utf-8", errors="replace")
    soup = BeautifulSoup(html, "html.parser")

    # Metadata
    title_ar = find_title_ar(soup)
    author = find_author(soup)
    published = find_published_date(soup)
    minutes = find_reading_minutes(soup)
    cat_slug, cat_ar, cat_uz = find_category(soup, url)
    tags = find_tags(soup)

    # Body
    body_root = find_article_body(soup)
    if not body_root:
        print("✗ Could not locate article body")
        sys.exit(1)
    blocks, toc = extract_body_blocks(body_root)

    # Cover
    cover_url = find_cover_url(soup)
    cover_path = ""
    if cover_url:
        cover_bytes = fetch(cover_url)
        ext = Path(cover_url.split("?")[0]).suffix.lstrip(".") or "png"
        cover_path_rel = f"/covers/{slug}.{ext}"
        out = OUT_COVERS / f"{slug}.{ext}"
        out.write_bytes(cover_bytes)
        cover_path = cover_path_rel
        print(f"  cover → {out} ({len(cover_bytes) // 1024} KB)")

    # Summary
    print(f"  title:     {title_ar[:60]}...")
    print(f"  author:    {author}")
    print(f"  date:      {published}")
    print(f"  category:  {cat_slug} → {cat_uz}")
    print(f"  body:      {len(blocks)} blocks, {len(toc)} TOC items, {len(tags)} tags")

    ts_entry = emit_ts(
        slug,
        url,
        cat_slug,
        cat_ar,
        cat_uz,
        title_ar,
        author,
        "/authors/munib-murad.webp",
        published,
        minutes,
        toc,
        blocks,
        tags,
        cover_path,
    )
    print("\n" + "=" * 72)
    print("Add this to lib/articles.ts (inside the `articles` array):")
    print("=" * 72)
    print(ts_entry)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python scripts/scrape_baheth.py <slug> <baheth-url>")
        sys.exit(1)
    main(slug=sys.argv[1], url=sys.argv[2])
