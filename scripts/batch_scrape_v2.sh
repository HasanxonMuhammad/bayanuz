#!/bin/bash
# Second batch of Baheth articles - useful for Uzbek learners.
set -e

OUT="D:/flutter/bayan_web/.scraped_v2.txt"
: > "$OUT"

urls=(
  "arab-tili-birinchi       https://bahethoarabia.com/awllogah/"
  "arab-tili-kuni           https://bahethoarabia.com/arabicday/"
  "xato-galat-farqi         https://bahethoarabia.com/htaglat/"
  "akademik-yozish          https://bahethoarabia.com/academicwriting/"
  "yozuv-texnikalari        https://bahethoarabia.com/writingtech/"
  "laisa                    https://bahethoarabia.com/laisa/"
  "la-nafiya                https://bahethoarabia.com/lanafjns/"
  "jar-harflari             https://bahethoarabia.com/hrofjar/"
  "jamid-mushtaq            https://bahethoarabia.com/jamidmshtq/"
  "malum-majhul             https://bahethoarabia.com/active-passive-voice-arabic/"
  "masdar                   https://bahethoarabia.com/masdar/"
  "sarf-organish            https://bahethoarabia.com/talmsrf/"
  "sarf-nima                https://bahethoarabia.com/elmsrf/"
  "imlo-xatolari            https://bahethoarabia.com/aktafilemla/"
  "ishoratli-belgilar       https://bahethoarabia.com/tarqim/"
  "izan-idhan               https://bahethoarabia.com/ethan/"
  "imlo-asoslari            https://bahethoarabia.com/emla/"
)

for line in "${urls[@]}"; do
  slug=$(echo "$line" | awk '{print $1}')
  url=$(echo "$line" | awk '{print $2}')
  echo "================================ $slug"
  python scripts/scrape_baheth.py "$slug" "$url" >> "$OUT" 2>&1
  echo "" >> "$OUT"
done

echo "DONE  -> $OUT"
wc -l "$OUT"
