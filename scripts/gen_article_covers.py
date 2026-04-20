"""
Generate a branded 1200x630 OG cover image for each article.

The cover contains:
  - Cream background
  - BAYAN mark in the corner
  - Category label
  - Large Arabic title
  - Baheth attribution footer
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display


def shape_arabic(text: str) -> str:
    """Turn Unicode Arabic into joined, RTL-ordered glyphs for PIL."""
    return get_display(arabic_reshaper.reshape(text))

OUT = Path("public/covers")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1200, 630
CREAM = (245, 243, 238)
FOREST = (27, 58, 40)
RED = (220, 38, 38)
MUTED = (74, 107, 82)

# Arabic font — use Scheherazade New if available
FONT_CANDIDATES = [
    "d:/flutter/arab_lugat_v2/assets/fonts/ScheherazadeNew-Bold.ttf",
    "d:/flutter/arab_lugat_v2/assets/fonts/ScheherazadeNew-Regular.ttf",
    "C:/Windows/Fonts/arial.ttf",
]
INTER_CANDIDATES = [
    "d:/flutter/arab_lugat_v2/assets/fonts/Inter-Bold.ttf",
    "d:/flutter/arab_lugat_v2/assets/fonts/Inter-SemiBold.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
]


def load_font(candidates, size):
    for p in candidates:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def wrap_text(text: str, font, max_w: int, draw):
    """Simple word-wrap."""
    words = text.split()
    lines, current = [], ""
    for w in words:
        trial = f"{current} {w}".strip()
        if draw.textlength(trial, font=font) <= max_w:
            current = trial
        else:
            if current:
                lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines


def make_cover(title_ar: str, category_uz: str, out_name: str):
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # BAYAN mark — top-left
    try:
        mark = Image.open("public/logo/bayan-mark.png").convert("RGBA")
        mark.thumbnail((90, 90))
        img.paste(mark, (60, 50), mark)
    except Exception:
        pass

    # BAYAN wordmark next to mark
    wf = load_font(INTER_CANDIDATES, 28)
    draw.text((170, 75), "BAYAN", fill=FOREST, font=wf)

    # Category pill (top-right)
    cf = load_font(INTER_CANDIDATES, 20)
    cat_text = category_uz.upper()
    cat_w = draw.textlength(cat_text, font=cf)
    pill_x, pill_y = W - 60 - cat_w - 40, 60
    draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + cat_w + 40, pill_y + 48],
        radius=24,
        fill=(255, 228, 228),
    )
    draw.text((pill_x + 20, pill_y + 12), cat_text, fill=RED, font=cf)

    # Arabic title — centered-ish, wrapped
    title_font = load_font(FONT_CANDIDATES, 82)
    lines_raw = wrap_text(title_ar, title_font, W - 120, draw)
    lines = [shape_arabic(line) for line in lines_raw]

    total_h = len(lines) * 110
    y = (H - total_h) // 2 - 20
    for line in lines:
        line_w = draw.textlength(line, font=title_font)
        x = W - 60 - line_w  # right-align for RTL
        draw.text((x, y), line, fill=FOREST, font=title_font)
        y += 110

    # Footer attribution — arabic part shaped separately
    ff = load_font(INTER_CANDIDATES, 22)
    ar_font = load_font(FONT_CANDIDATES, 28)
    manba = "Manba:"
    source_ar = shape_arabic("باحثو اللغة العربية")
    site = "·  bahethoarabia.com"
    manba_w = draw.textlength(manba, font=ff)
    source_w = draw.textlength(source_ar, font=ar_font)
    site_w = draw.textlength(site, font=ff)
    gap = 14
    total = manba_w + gap + source_w + gap + site_w
    x = (W - total) // 2
    fy = H - 76
    draw.text((x, fy + 4), manba, fill=MUTED, font=ff)
    draw.text((x + manba_w + gap, fy), source_ar, fill=MUTED, font=ar_font)
    draw.text((x + manba_w + gap + source_w + gap, fy + 4), site, fill=MUTED, font=ff)

    # Red accent bar
    draw.rectangle([0, H - 12, W, H], fill=RED)

    out_path = OUT / out_name
    img.save(out_path, "JPEG", quality=88, optimize=True)
    print(f"Saved {out_path} ({out_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    make_cover(
        title_ar="كيف تتقن القراءة والكتابة باللغة العربية",
        category_uz="Til bo'yicha",
        out_name="kif-tutqin-al-qiraa.jpg",
    )
