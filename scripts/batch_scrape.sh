#!/bin/bash
# Run scraper for all 10 URLs and collect TypeScript entries.
set -e

OUT="D:/flutter/bayan_web/.scraped_entries.txt"
: > "$OUT"

urls=(
  "arab-ahamiyati          https://bahethoarabia.com/arabicvalue/"
  "somiy-tillar            https://bahethoarabia.com/logarbihwi/"
  "arab-kompyuterlashtirish https://bahethoarabia.com/linguistic-value/"
  "nahv-organsh            https://bahethoarabia.com/etqwadlog/"
  "bolalar-tarbiyasi       https://bahethoarabia.com/bnathqtfl/"
  "maktab-hayoti           https://bahethoarabia.com/bakscolfiti/"
  "ma-anna                 https://bahethoarabia.com/meaning-of-anna/"
  "as-sah                  https://bahethoarabia.com/assah/"
  "mahjaziya               https://bahethoarabia.com/mahjazyah/"
  "tashbih                 https://bahethoarabia.com/attashbih/"
)

for line in "${urls[@]}"; do
  slug=$(echo "$line" | awk '{print $1}')
  url=$(echo "$line" | awk '{print $2}')
  echo "================================ $slug"
  python scripts/scrape_baheth.py "$slug" "$url" >> "$OUT" 2>&1
  echo ""
done

echo "DONE → $OUT"
wc -l "$OUT"
