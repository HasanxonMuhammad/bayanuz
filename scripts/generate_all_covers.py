"""
Barcha mavjud kitoblar uchun cover PNG yasaydi.

Resume qiladi — cover fayli allaqachon bor bo'lsa skip.
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "lib" / "data" / "kilani"
COVER_DIR = ROOT / "public" / "covers" / "books"
FLUTTER_COVER_DIR = Path(
    r"D:/flutter/arab_lugat_v2/assets/covers/books"
)
GEN_SCRIPT = ROOT / "scripts" / "generate_book_cover.py"

DEFAULT_SUBTITLE = "حكاية عربية للأطفال"


def main() -> None:
    COVER_DIR.mkdir(parents=True, exist_ok=True)
    FLUTTER_COVER_DIR.mkdir(parents=True, exist_ok=True)
    jsons = sorted(DATA_DIR.glob("*.json"))
    done = 0
    skipped = 0
    failed = 0
    for p in jsons:
        if p.name.startswith(("_", ".")) or p.name == "books-index.json":
            continue
        d = json.load(p.open(encoding="utf-8"))
        slug = d["bookId"]
        title_ar = d.get("titleAr_harakat") or d.get("titleAr")
        out = COVER_DIR / f"{slug}.png"
        if out.exists():
            skipped += 1
            continue
        print(f"[{slug}] {d.get('titleUz','?')} — generating...")
        try:
            subprocess.run(
                [
                    sys.executable,
                    str(GEN_SCRIPT),
                    slug,
                    title_ar,
                    DEFAULT_SUBTITLE,
                ],
                check=True,
                encoding="utf-8",
            )
            # Flutter'ga ham nusxa
            flutter_out = FLUTTER_COVER_DIR / f"{slug}.png"
            flutter_out.write_bytes(out.read_bytes())
            done += 1
        except subprocess.CalledProcessError as e:
            print(f"  FAIL: {e}")
            failed += 1
    print(f"\nDone: {done} new, {skipped} skipped, {failed} failed")


if __name__ == "__main__":
    main()
