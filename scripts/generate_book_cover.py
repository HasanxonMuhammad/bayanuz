"""
Kamil Kiloniy (va boshqa) kitoblari uchun muqova generator.

BAYAN uslubi, 1600×932 (Baheth cover bilan bir xil o'lcham), PNG.
Palitra bookId hash'dan olinadi — har kitob o'ziga xos rang bilan chiqadi.

Ishlatish:
    python scripts/generate_book_cover.py <bookId> <titleAr> <subtitleAr> [--out path]

Masalan:
    python scripts/generate_book_cover.py narada "نارادا" "حكاية عربية للأطفال"
"""
from __future__ import annotations

import argparse
import hashlib
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display


def shape_ar(text: str) -> str:
    """Arab matnini ulangan va to'g'ri yo'nalishda qilish."""
    if not text:
        return text
    return get_display(arabic_reshaper.reshape(text))

W, H = 1600, 932
ROOT = Path(__file__).resolve().parent.parent
# Scheherazade New Bold PIL'da presentation formlarsiz (HarfBuzz yo'q).
# Windows'dagi trado.ttf (Traditional Arabic) — presentation formlarga ega,
# shuning uchun PIL bilan to'g'ri shape bo'ladi. Kelajakda Amiri/Noto Naskh
# bundle qilinsa, shu yo'lni almashtirish kerak.
FONT_AR = Path("C:/Windows/Fonts/trado.ttf")
FONT_AR_BOLD = Path("C:/Windows/Fonts/tradbdo.ttf")
if not FONT_AR_BOLD.exists():
    FONT_AR_BOLD = FONT_AR
FONT_LAT = ROOT / "public" / "fonts" / "Inter-Bold.ttf"
LOGO_PATH = ROOT / "public" / "logo" / "bayan.png"

# Palitra variantlari — bookId hash'ga qarab tanlanadi.
# Har bir palette: (bg, accent, deep, text)
PALETTES: list[tuple[str, str, str, str]] = [
    ("#FAF3E7", "#DC4E17", "#1B3A28", "#1B3A28"),  # cream + red + forest
    ("#EFE7D7", "#1E3A8A", "#4A6B52", "#1B3A28"),  # sand + blue
    ("#F4EADF", "#7A2E1F", "#324E3E", "#1B3A28"),  # warm + brown
    ("#F5EDE0", "#0B6E4F", "#8A3B2A", "#1B3A28"),  # forest
    ("#ECE1CF", "#5B2B82", "#1B3A28", "#1B3A28"),  # aubergine
    ("#EADFCB", "#B04A2A", "#1B3A28", "#1B3A28"),  # ochre
    ("#F3E9D5", "#1B5E87", "#6B3A1B", "#1B3A28"),  # teal + umber
    ("#ECE1CE", "#7A2E1F", "#1E3A8A", "#1B3A28"),  # red + blue
]


def pick_palette(book_id: str) -> tuple[str, str, str, str]:
    idx = int(hashlib.md5(book_id.encode()).hexdigest(), 16) % len(PALETTES)
    return PALETTES[idx]


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def draw_decor(img: Image.Image, palette: tuple[str, str, str, str], seed: int) -> None:
    """Dekorativ shakllar — Baheth kabi chet-chetlarga yumshoq abstraksiya."""
    bg, accent, deep, _ = palette
    accent_rgb = hex_to_rgb(accent)
    deep_rgb = hex_to_rgb(deep)

    rnd = random.Random(seed)
    decor = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(decor)

    # Yuqori-chap burchak: katta doira (accent)
    r1 = rnd.randint(140, 200)
    cx1 = rnd.randint(-40, 60)
    cy1 = rnd.randint(-30, 40)
    d.ellipse(
        [cx1 - r1, cy1 - r1, cx1 + r1, cy1 + r1],
        fill=(*accent_rgb, 58),
    )

    # Yuqori-chap kichik to'g'ri burchak / blob (deep)
    r2 = rnd.randint(60, 100)
    d.ellipse(
        [cx1 + 30, cy1 + r1 // 2, cx1 + 30 + r2, cy1 + r1 // 2 + r2],
        fill=(*deep_rgb, 52),
    )

    # O'ng tomonda gorizontal egri chiziq (deep accent) — matn zonasidan pastroq
    y_curve = rnd.randint(H - 160, H - 110)
    curve_pts = [
        (W - 880, y_curve + rnd.randint(-20, 20)),
        (W - 600, y_curve - 50),
        (W - 300, y_curve + 40),
        (W + 40, y_curve - 20),
    ]
    # Bezier-ish smooth line with wider band
    for w, alpha in ((28, 180), (12, 230)):
        d.line(curve_pts, fill=(*deep_rgb, alpha), width=w, joint="curve")

    img.paste(decor, (0, 0), decor)


def fit_font(font_path: Path, text: str, max_width: int, max_size: int, min_size: int = 40) -> ImageFont.FreeTypeFont:
    size = max_size
    while size > min_size:
        f = ImageFont.truetype(str(font_path), size)
        bbox = f.getbbox(text)
        if bbox[2] - bbox[0] <= max_width:
            return f
        size -= 4
    return ImageFont.truetype(str(font_path), min_size)


def draw_title_arabic(
    img: Image.Image,
    title_ar: str,
    subtitle_ar: str,
    author_ar: str,
    palette: tuple[str, str, str, str],
) -> None:
    _, accent, deep, text = palette
    draw = ImageDraw.Draw(img)

    title_shaped = shape_ar(title_ar)
    sub_shaped = shape_ar(subtitle_ar) if subtitle_ar else ""
    author_shaped = shape_ar(author_ar) if author_ar else ""

    # Asosiy sarlavha — markazda, biroz tepaga ko'tarilgan
    title_font = fit_font(FONT_AR_BOLD, title_shaped, W - 280, 240, 110)
    tb = title_font.getbbox(title_shaped)
    tw = tb[2] - tb[0]
    th = tb[3] - tb[1]
    tx = (W - tw) // 2 - tb[0]
    ty = H // 2 - th // 2 - 170
    draw.text((tx, ty), title_shaped, font=title_font, fill=hex_to_rgb(text))

    # Subtitle — sarlavhadan pastroqda, bo'sh joy kattaroq
    cursor_y = ty + th + 80
    if sub_shaped:
        sub_font = fit_font(FONT_AR, sub_shaped, W - 320, 78, 44)
        sb = sub_font.getbbox(sub_shaped)
        sw = sb[2] - sb[0]
        sh = sb[3] - sb[1]
        sx = (W - sw) // 2 - sb[0]
        draw.text((sx, cursor_y), sub_shaped, font=sub_font, fill=hex_to_rgb(deep))
        cursor_y += sh + 36

    # Muallif — subtitle'dan pastda, kichikroq, accent rangda
    if author_shaped:
        auth_font = fit_font(FONT_AR, author_shaped, W - 360, 54, 34)
        ab = auth_font.getbbox(author_shaped)
        aw = ab[2] - ab[0]
        ax = (W - aw) // 2 - ab[0]
        draw.text((ax, cursor_y), author_shaped, font=auth_font, fill=hex_to_rgb(accent))


def draw_footer(img: Image.Image, palette: tuple[str, str, str, str]) -> None:
    _, accent, deep, _ = palette
    draw = ImageDraw.Draw(img)
    deep_rgb = hex_to_rgb(deep)

    # Barcha elementlar bitta gorizontal qatorda — chap BAYAN block, o'ng bayanuz.com
    row_center_y = H - 90  # qator markazi vertical
    brand_font = ImageFont.truetype(str(FONT_LAT), 34)
    tag_font = ImageFont.truetype(str(FONT_LAT), 18)
    site_font = ImageFont.truetype(str(FONT_LAT), 26)

    # ── Chap: logo (red dots saqlanadi — tint yo'q) + BAYAN + tagline
    logo_h = 72
    lw = 0
    if LOGO_PATH.exists():
        logo = Image.open(LOGO_PATH).convert("RGBA")
        ratio = logo_h / logo.height
        lw = int(logo.width * ratio)
        logo = logo.resize((lw, logo_h), Image.LANCZOS)
        logo_x = 80
        logo_y = row_center_y - logo_h // 2
        img.paste(logo, (logo_x, logo_y), logo)
        text_x = logo_x + lw + 14
    else:
        text_x = 80

    brand_text = "BAYAN"
    bbb = brand_font.getbbox(brand_text)
    bh = bbb[3] - bbb[1]
    tag_text = "Til va qalb orasidagi ko'prik"
    tbb = tag_font.getbbox(tag_text)
    tagh = tbb[3] - tbb[1]

    total_text_h = bh + 4 + tagh
    brand_y = row_center_y - total_text_h // 2 - bbb[1]
    draw.text((text_x, brand_y), brand_text, font=brand_font, fill=deep_rgb)
    draw.text(
        (text_x, brand_y + bh + 6 - (tbb[1] - bbb[1])),
        tag_text,
        font=tag_font,
        fill=hex_to_rgb(accent),
    )

    # ── O'ng: rombcha + "bayanuz.com" — bir qatorda
    site_text = "bayanuz.com"
    sbb = site_font.getbbox(site_text)
    sw = sbb[2] - sbb[0]
    sh = sbb[3] - sbb[1]
    sx = W - sw - 100
    sy = row_center_y - sh // 2 - sbb[1]
    # Rombcha chapda matn yonida
    dx = sx - 22
    dy = row_center_y
    pts = [(dx, dy - 9), (dx + 9, dy), (dx, dy + 9), (dx - 9, dy)]
    draw.polygon(pts, fill=hex_to_rgb(accent))
    draw.text((sx, sy), site_text, font=site_font, fill=deep_rgb)


DEFAULT_AUTHOR = "كامل كيلاني"


def generate(
    book_id: str,
    title_ar: str,
    subtitle_ar: str,
    author_ar: str,
    out_path: Path,
) -> None:
    palette = pick_palette(book_id)
    bg = hex_to_rgb(palette[0])
    img = Image.new("RGB", (W, H), bg)
    seed = int(hashlib.md5(book_id.encode()).hexdigest(), 16) & 0xFFFF
    draw_decor(img, palette, seed)
    draw_title_arabic(img, title_ar, subtitle_ar, author_ar, palette)
    draw_footer(img, palette)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "PNG", optimize=True)
    print(f"OK  ->  {out_path}  ({out_path.stat().st_size // 1024} KB)  palette={palette}")


def main() -> None:
    ap = argparse.ArgumentParser(description="BAYAN book cover generator")
    ap.add_argument("book_id")
    ap.add_argument("title_ar")
    ap.add_argument("subtitle_ar", nargs="?", default="")
    ap.add_argument(
        "--author",
        default=DEFAULT_AUTHOR,
        help=f"Muallif arabcha (default: {DEFAULT_AUTHOR})",
    )
    ap.add_argument("--out", default=None, help="Chiqish fayli (default: public/covers/books/<bookId>.png)")
    args = ap.parse_args()

    out = Path(args.out) if args.out else ROOT / "public" / "covers" / "books" / f"{args.book_id}.png"
    generate(args.book_id, args.title_ar, args.subtitle_ar, args.author, out)


if __name__ == "__main__":
    main()
