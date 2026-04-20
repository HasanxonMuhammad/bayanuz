"""
Generate a branded 1200x630 OG cover image for each article.

Uses only Latin text (Uzbek + BAYAN branding) to avoid PIL Arabic shaping issues.
Saves to public/covers/<slug>.jpg.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path("public/covers")
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1200, 630
CREAM = (245, 243, 238)
FOREST = (27, 58, 40)
RED = (220, 38, 38)
MUTED = (74, 107, 82)
MUTED_2 = (122, 154, 128)

FONT_PLAYFAIR = "d:/flutter/arab_lugat_v2/assets/fonts/Inter-Bold.ttf"
FONT_INTER = "d:/flutter/arab_lugat_v2/assets/fonts/Inter-Bold.ttf"
FONT_INTER_MED = "d:/flutter/arab_lugat_v2/assets/fonts/Inter-Medium.ttf"


def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def wrap(text, font, max_w, draw):
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


def make_cover(title_uz: str, category_uz: str, out_name: str):
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # BAYAN logo (mark + wordmark) — top-left
    try:
        mark = Image.open("public/logo/bayan-mark.png").convert("RGBA")
        mark.thumbnail((70, 70))
        img.paste(mark, (64, 60), mark)
    except Exception:
        pass

    # Red dot
    dot_cx, dot_cy = 64 + 70 + 10, 60 + 35
    draw.ellipse(
        [dot_cx - 4, dot_cy - 4, dot_cx + 4, dot_cy + 4], fill=RED
    )

    wf = load_font(FONT_INTER, 34)
    draw.text((dot_cx + 18, dot_cy - 19), "BAYAN", fill=FOREST, font=wf)

    # Category pill — top-right
    cf = load_font(FONT_INTER, 20)
    cat_text = category_uz.upper()
    cat_w = draw.textlength(cat_text, font=cf)
    pad_x, pad_y = 24, 14
    pill_w = cat_w + pad_x * 2
    pill_h = 48
    pill_x = W - 64 - pill_w
    pill_y = 60 + 35 - pill_h // 2
    draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
        radius=pill_h // 2,
        fill=(255, 228, 228),
    )
    cat_y = pill_y + (pill_h - 20) // 2 - 3
    draw.text((pill_x + pad_x, cat_y), cat_text, fill=RED, font=cf)

    # Big title — centered, Uzbek/Latin
    title_font = load_font(FONT_PLAYFAIR, 72)
    lines = wrap(title_uz, title_font, W - 128, draw)
    total_h = len(lines) * 88
    y = 180
    for line in lines:
        line_w = draw.textlength(line, font=title_font)
        x = 64
        draw.text((x, y), line, fill=FOREST, font=title_font)
        y += 92

    # Big quote mark decoration — right side
    quote_font = load_font(FONT_INTER, 240)
    draw.text((W - 200, 180), "\u201C", fill=RED, font=quote_font)

    # Footer — source attribution
    ff = load_font(FONT_INTER_MED, 22)
    footer_text = "Manba: bahethoarabia.com  ·  BAYAN jamoasi"
    fw = draw.textlength(footer_text, font=ff)
    draw.text(((W - fw) // 2, H - 76), footer_text, fill=MUTED, font=ff)

    # Red accent bar
    draw.rectangle([0, H - 12, W, H], fill=RED)

    out_path = OUT / out_name
    img.save(out_path, "JPEG", quality=90, optimize=True)
    print(f"Saved {out_path} ({out_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    make_cover(
        title_uz="Arab tilida o'qish va yozishni qanday o'zlashtirasiz",
        category_uz="Til bo'yicha",
        out_name="kif-tutqin-al-qiraa.jpg",
    )
