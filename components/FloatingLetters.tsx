/**
 * Harakat-bearing Arabic letters and words drifting behind the hero — the same
 * motif as the app's Premium screen. Positions come from a seeded generator so
 * the server and client render identical markup.
 */
const GLYPHS = [
  "عِلْمٌ", "ضَ", "بَيَانٌ", "نَحْوٌ", "صَرْفٌ", "كِتَابٌ", "حُ", "ظَ", "غُ",
  "لُغَةٌ", "قِرَاءَةٌ", "قَلَمٌ", "سِ", "طُ", "مِيزَانٌ", "إِعْرَابٌ", "خَ",
  "فَهْمٌ", "ذِ", "حِوَارٌ", "ثَ", "كَلِمَةٌ", "عَ", "شُ",
];

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = rng(20261003);
const r2 = (n: number) => Math.round(n * 100) / 100;
const ITEMS = GLYPHS.map((g, i) => {
  const left = rand() * 100;
  const top = rand() * 100;
  const size = g.length > 3 ? 18 + rand() * 16 : 22 + rand() * 30;
  return {
    g,
    left: r2(left),
    top: r2(top),
    size: Math.round(size),
    gold: i % 4 === 1,
    opacity: r2(0.1 + rand() * 0.22),
    r: r2((rand() - 0.5) * 24),
    d: r2(8 + rand() * 8),
    delay: r2(-rand() * 10),
    mobile: i % 2 === 0,
  };
});

export function FloatingLetters({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className={`ar drift absolute leading-none ${it.mobile ? "" : "max-md:hidden"}`}
          style={
            {
              left: `${it.left}%`,
              top: `${it.top}%`,
              fontSize: it.size,
              color: it.gold ? "#B8902A" : "#2D7A55",
              opacity: it.opacity,
              "--r": `${it.r}deg`,
              "--d": `${it.d}s`,
              "--delay": `${it.delay}s`,
            } as React.CSSProperties
          }
        >
          {it.g}
        </span>
      ))}
    </div>
  );
}
