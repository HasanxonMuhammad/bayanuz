"""Convert lib/articles.ts (11 BAYAN articles) into Flutter Dart format and
write it to ../arab_lugat_v2/lib/data/baheth_articles.dart."""
import re
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

TS = Path("lib/articles.ts")
OUT = Path("../arab_lugat_v2/lib/data/baheth_articles.dart")

DART_HEADER = """import 'article.dart';

/// Baheth saytidan olingan maqolalar.
///
/// MUHIM: matn rasmiy ruxsat shartlari bo'yicha aynan asl manbadagidek
/// saqlangan. O'zgartirish kiritilmasin. Asl havolalar saqlansin.
class BahethArticles {
  BahethArticles._();

  /// Kategoriya slug'i bo'yicha maqolalar ro'yxatini qaytaradi.
  static List<BahethArticle> byCategory(String slug) {
    return all.where((a) => a.categorySlug == slug).toList();
  }

  static BahethArticle? byId(String id) {
    try {
      return all.firstWhere((a) => a.id == id);
    } catch (_) {
      return null;
    }
  }

  static final List<BahethArticle> all = [
"""

DART_FOOTER = """  ];
}
"""


def dart_escape(s: str) -> str:
    """Escape a Dart single-quoted string literal."""
    return (
        s.replace("\\", "\\\\")
        .replace("$", "\\$")
        .replace("'", "\\'")
        .replace("\n", "\\n")
    )


def convert_cover_web_to_flutter(path: str) -> str | None:
    """/covers/foo.png → assets/covers/foo.png"""
    if not path:
        return None
    if path.startswith("/covers/"):
        return "assets/covers/" + path[len("/covers/") :]
    return path


def convert_author_avatar(path: str | None) -> str | None:
    if not path:
        return None
    if path.startswith("/authors/"):
        return "assets/images/authors/" + path[len("/authors/") :]
    return path


def parse_ts_entries(ts: str) -> list[dict]:
    """Extract each BahethArticle object as a dict."""
    entries = []
    # Match each `  {` to matching `  },`
    pat = re.compile(r"^  \{\s*\n((?:.*\n)*?)^  \},", re.MULTILINE)
    for m in pat.finditer(ts):
        body = m.group(1)
        entry = {
            "slug": find_str(body, "slug"),
            "categorySlug": find_str(body, "categorySlug"),
            "categoryNameAr": find_str(body, "categoryNameAr"),
            "categoryNameUz": find_str(body, "categoryNameUz"),
            "titleAr": find_str(body, "titleAr"),
            "authorName": find_str(body, "authorName"),
            "authorAvatar": find_str(body, "authorAvatar"),
            "publishedAt": find_str(body, "publishedAt"),
            "readingMinutes": int(re.search(r"readingMinutes:\s*(\d+)", body).group(1))
            if re.search(r"readingMinutes:\s*(\d+)", body)
            else 8,
            "coverImage": find_str(body, "coverImage"),
            "sourceUrl": find_str(body, "sourceUrl"),
            "tableOfContents": find_list(body, "tableOfContents"),
            "tags": find_list(body, "tags"),
            "body": find_blocks(body),
        }
        entries.append(entry)
    return entries


def find_str(body: str, key: str) -> str:
    m = re.search(rf"{key}:\s*'((?:\\.|[^'\\])*)'", body)
    return (
        m.group(1)
        .replace("\\'", "'")
        .replace("\\\\", "\\")
        if m
        else ""
    )


def slice_bracketed(body: str, key: str) -> str | None:
    """Return substring between `key: [` and the matching `]` (balanced)."""
    start_m = re.search(rf"{key}:\s*\[", body)
    if not start_m:
        return None
    i = start_m.end()
    depth = 1
    while i < len(body) and depth > 0:
        ch = body[i]
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return body[start_m.end() : i]
        elif ch == "'":
            # skip quoted string
            i += 1
            while i < len(body) and body[i] != "'":
                if body[i] == "\\" and i + 1 < len(body):
                    i += 2
                    continue
                i += 1
        i += 1
    return None


def find_list(body: str, key: str) -> list[str]:
    inner = slice_bracketed(body, key)
    if inner is None:
        return []
    return [
        s.replace("\\'", "'").replace("\\\\", "\\")
        for s in re.findall(r"'((?:\\.|[^'\\])*)'", inner)
    ]


def find_blocks(body: str) -> list[dict]:
    inner = slice_bracketed(body, "body")
    if inner is None:
        return []
    m = type("m", (), {"group": lambda self, i: inner})()
    blocks = []
    for line in re.finditer(r"\{\s*([^}]+)\}", m.group(1)):
        fields = {}
        for kv in re.finditer(r"(\w+):\s*'((?:\\.|[^'\\])*)'", line.group(1)):
            fields[kv.group(1)] = (
                kv.group(2).replace("\\'", "'").replace("\\\\", "\\")
            )
        if "type" in fields and "text" in fields:
            blocks.append(fields)
    return blocks


def dart_escape_list(items: list[str], indent: str = "      ") -> str:
    if not items:
        return ""
    return ",\n".join(f"{indent}'{dart_escape(s)}'" for s in items)


def dart_escape_blocks(blocks: list[dict], indent: str = "      ") -> str:
    parts = []
    for b in blocks:
        text = dart_escape(b["text"])
        if b["type"] == "heading":
            parts.append(f"{indent}ArticleBlock.heading('{text}')")
        elif b["type"] == "readAlso":
            link = dart_escape(b.get("link", ""))
            parts.append(
                f"{indent}ArticleBlock.readAlso(title: '{text}', link: '{link}')"
            )
        else:
            parts.append(f"{indent}ArticleBlock.paragraph('{text}')")
    return ",\n".join(parts)


def entry_to_dart(e: dict, index: int) -> str:
    id_ = e["slug"]
    cover = convert_cover_web_to_flutter(e.get("coverImage"))
    avatar = convert_author_avatar(e.get("authorAvatar"))
    cover_line = f"      coverImage: '{dart_escape(cover)}',\n" if cover else ""
    avatar_line = f"      authorAvatar: '{dart_escape(avatar)}',\n" if avatar else ""

    def block(label: str, inner: str) -> str:
        if not inner:
            return f"      {label}: const [],\n"
        return f"      {label}: [\n{inner},\n      ],\n"

    toc_body = dart_escape_list(e["tableOfContents"], "        ")
    tags_body = dart_escape_list(e["tags"], "        ")
    body_body = dart_escape_blocks(e["body"], "        ")

    return (
        f"    BahethArticle(\n"
        f"      id: '{dart_escape(id_)}',\n"
        f"      slug: '{dart_escape(e['slug'])}',\n"
        f"      categorySlug: '{dart_escape(e['categorySlug'])}',\n"
        f"      categoryNameAr: '{dart_escape(e['categoryNameAr'])}',\n"
        f"      titleAr: '{dart_escape(e['titleAr'])}',\n"
        f"      authorName: '{dart_escape(e['authorName'])}',\n"
        f"{avatar_line}"
        f"      publishedAt: '{dart_escape(e['publishedAt'])}',\n"
        f"      readingMinutes: {e['readingMinutes']},\n"
        f"{cover_line}"
        f"      sourceUrl: '{dart_escape(e['sourceUrl'])}',\n"
        f"{block('tableOfContents', toc_body)}"
        f"{block('body', body_body)}"
        f"{block('tags', tags_body)}"
        f"    ),"
    )


def main():
    ts = TS.read_text(encoding="utf-8")
    entries = parse_ts_entries(ts)
    print(f"Parsed {len(entries)} entries")
    for e in entries:
        print(f"  {e['slug']:30} body={len(e['body'])} blocks, toc={len(e['tableOfContents'])}, tags={len(e['tags'])}")

    dart_entries = [entry_to_dart(e, i) for i, e in enumerate(entries)]
    OUT.write_text(DART_HEADER + "\n".join(dart_entries) + "\n" + DART_FOOTER, encoding="utf-8")
    print(f"\nWrote {OUT}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
