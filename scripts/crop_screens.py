"""
Render each SVG to high-res PNG, convert near-white pixels to TRANSPARENT,
then trim borders so the phone floats on any page background.
"""
from pathlib import Path
from resvg_py import svg_to_bytes
from PIL import Image
from io import BytesIO
import numpy as np

SRC = Path("for_web_screens")
OUT = Path("public/screens")
# Pixels with all RGB channels >= this become fully transparent
WHITE_THRESHOLD = 245


def make_white_transparent(img: Image.Image) -> Image.Image:
    """Replace near-white pixels with transparent."""
    rgba = img.convert("RGBA")
    arr = np.array(rgba)
    near_white = (
        (arr[:, :, 0] >= WHITE_THRESHOLD)
        & (arr[:, :, 1] >= WHITE_THRESHOLD)
        & (arr[:, :, 2] >= WHITE_THRESHOLD)
    )
    arr[near_white, 3] = 0
    return Image.fromarray(arr, "RGBA")


def trim_transparent(img: Image.Image, pad: int = 16) -> Image.Image:
    """Crop the image to the bounding box of non-transparent pixels."""
    bbox = img.getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(img.width, r + pad)
    b = min(img.height, b + pad)
    return img.crop((l, t, r, b))


def process(idx: int):
    src_svg = SRC / f"{idx}.svg"
    print(f"Processing {src_svg}...")
    png_bytes = svg_to_bytes(svg_path=str(src_svg))
    img = Image.open(BytesIO(bytes(png_bytes)))
    print(f"  Raw: {img.size}")
    img = make_white_transparent(img)
    img = trim_transparent(img)
    print(f"  Trimmed transparent: {img.size}")
    # Downsample to reasonable size for web (max width 900)
    max_w = 900
    if img.width > max_w:
        ratio = max_w / img.width
        new_size = (max_w, int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)
        print(f"  Resized: {img.size}")
    out_path = OUT / f"{idx}.png"
    img.save(out_path, optimize=True)
    print(f"  Saved: {out_path} ({out_path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    for i in range(1, 6):
        process(i)
