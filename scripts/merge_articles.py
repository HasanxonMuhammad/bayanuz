"""Extract article entries from the batch scraper output, fix categories,
and write the final `lib/articles.ts`."""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

SCRAPED_FILES = [Path(".scraped_entries.txt"), Path(".scraped_v2.txt")]
OUT = Path("lib/articles.ts")

# Slug → (nameAr, nameUz) — overrides the scraper's default detection
CATEGORY_FIX = {
    # Batch 1
    "arab-ahamiyati":            ("لغويات", "Til bo'yicha"),
    "somiy-tillar":              ("لغويات", "Til bo'yicha"),
    "arab-kompyuterlashtirish":  ("لغويات", "Til bo'yicha"),
    "nahv-organsh":              ("نصائح", "Maslahatlar"),
    "bolalar-tarbiyasi":         ("نصائح", "Maslahatlar"),
    "maktab-hayoti":             ("نصائح", "Maslahatlar"),
    "ma-anna":                   ("النحو", "Nahv"),
    "as-sah":                    ("النحو", "Nahv"),
    "mahjaziya":                 ("النحو", "Nahv"),
    "tashbih":                   ("البلاغة", "Balag'a"),
    # Batch 2
    "arab-tili-birinchi":        ("لغويات", "Til bo'yicha"),
    "arab-tili-kuni":            ("لغويات", "Til bo'yicha"),
    "xato-galat-farqi":          ("لغويات", "Til bo'yicha"),
    "akademik-yozish":           ("لغويات", "Til bo'yicha"),
    "yozuv-texnikalari":         ("لغويات", "Til bo'yicha"),
    "laisa":                     ("النحو", "Nahv"),
    "la-nafiya":                 ("النحو", "Nahv"),
    "jar-harflari":              ("النحو", "Nahv"),
    "jamid-mushtaq":             ("النحو", "Nahv"),
    "malum-majhul":              ("الصرف", "Sarf"),
    "masdar":                    ("الصرف", "Sarf"),
    "sarf-organish":             ("الصرف", "Sarf"),
    "sarf-nima":                 ("الصرف", "Sarf"),
    "imlo-xatolari":             ("الإملاء", "Imlo qoidalari"),
    "ishoratli-belgilar":        ("الإملاء", "Imlo qoidalari"),
    "izan-idhan":                ("الإملاء", "Imlo qoidalari"),
    "imlo-asoslari":             ("الإملاء", "Imlo qoidalari"),
}


def extract_entries(raw: str) -> list[str]:
    """Find each `  {` ... `  },` block emitted by the scraper."""
    entries = []
    # Each entry starts with "  {" at line start, ends with "  },"
    pat = re.compile(r"^  \{\s*\n(?:.*\n)*?  \},", re.MULTILINE)
    for m in pat.finditer(raw):
        entries.append(m.group(0))
    return entries


def fix_category(entry: str) -> str:
    """Override categoryNameAr/Uz/Slug for a given entry using its slug."""
    slug_m = re.search(r"slug: '([^']+)'", entry)
    if not slug_m:
        return entry
    slug = slug_m.group(1)
    fix = CATEGORY_FIX.get(slug)
    if not fix:
        return entry
    ar, uz = fix
    uz_esc = uz.replace("'", "\\'")
    # Replace entire lines (comma-terminated) — regex handles escaped quotes
    entry = re.sub(
        r"categorySlug: '(?:\\.|[^'\\])*',",
        f"categorySlug: '{ar}',",
        entry,
    )
    entry = re.sub(
        r"categoryNameAr: '(?:\\.|[^'\\])*',",
        f"categoryNameAr: '{ar}',",
        entry,
    )
    entry = re.sub(
        r"categoryNameUz: '(?:\\.|[^'\\])*',",
        f"categoryNameUz: '{uz_esc}',",
        entry,
    )
    return entry


HEADER = '''export type BlockType = "paragraph" | "heading" | "readAlso";

export interface ArticleBlock {
  type: BlockType;
  text: string;
  link?: string;
}

export interface BahethArticle {
  slug: string;
  categorySlug: string;
  categoryNameAr: string;
  categoryNameUz: string;
  titleAr: string;
  titleUz: string;
  authorName: string;
  /** Path to the author's avatar image (relative to /public). */
  authorAvatar: string;
  publishedAt: string;
  readingMinutes: number;
  heroTitle: string;
  heroSubtitle: string;
  sourceUrl: string;
  tableOfContents: string[];
  body: ArticleBlock[];
  tags: string[];
  /** Absolute or relative path to the article's cover image (for OG + IV). */
  coverImage: string;
}

export const articles: BahethArticle[] = [
'''

FOOTER = '''];

export function getArticleBySlug(slug: string): BahethArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
'''


def main():
    raw = ""
    for f in SCRAPED_FILES:
        if f.exists():
            raw += f.read_text(encoding="utf-8") + "\n"
    entries = extract_entries(raw)
    print(f"Extracted {len(entries)} entries")
    entries = [fix_category(e) for e in entries]

    # Deduplicate by slug (keep last — most recent scrape wins)
    seen: dict[str, str] = {}
    for e in entries:
        m = re.search(r"slug: '([^']+)'", e)
        if m:
            seen[m.group(1)] = e
    entries = list(seen.values())
    print(f"After dedupe: {len(entries)} entries")

    body = "\n".join(entries)
    OUT.write_text(HEADER + body + "\n" + FOOTER, encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
