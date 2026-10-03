"use client";
import { useEffect, useRef, useState } from "react";

/** Counts verified against the app's own databases (2026-10-03). */
const STATS = [
  { value: 81000, suffix: "+", label: "arabcha so'z" },
  { value: 111, suffix: "", label: "grammatika darsi" },
  { value: 2866, suffix: "", label: "test savoli" },
  { value: 71, suffix: "", label: "imtihon matni" },
  { value: 650, suffix: "", label: "so'zlashuv iborasi" },
  { value: 23735, suffix: "", label: "fe'l tuslanishi" },
];

const fmt = (n: number) => n.toLocaleString("en-US").replace(/,/g, " ");

function Count({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  // Server HTML carries the final number; the client resets to 0 before the
  // band scrolls into view, then counts up once.
  const [n, setN] = useState(to);
  const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (!still()) setN(0);
  }, []);
  useEffect(() => {
    if (!run || still()) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <span className="tabular-nums">
      {fmt(n)}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-emerald-deep text-white">
      <ArabicMarquee />
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 pb-14 pt-10 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:px-16"
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col gap-1.5">
            <span
              className="text-[34px] font-semibold leading-none text-[#F3D98B] sm:text-[40px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Count to={s.value} suffix={s.suffix} run={run} />
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[1.4px] text-[#9FD3B8]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

const WORDS = [
  "بَيَانٌ", "عِلْمٌ", "لُغَةٌ", "نَحْوٌ", "صَرْفٌ", "قِرَاءَةٌ", "كِتَابَةٌ",
  "حِوَارٌ", "فَهْمٌ", "إِعْرَابٌ", "بَلَاغَةٌ", "مُعْجَمٌ",
];

function ArabicMarquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-b border-white/10 py-4">
      <div className="marquee flex w-max gap-10" style={{ "--d": "70s" } as React.CSSProperties}>
        {row.map((w, i) => (
          <span key={i} className="ar flex items-center gap-10 text-[26px] leading-none text-white/25">
            {w}
            <span className="h-1.5 w-1.5 rotate-45 bg-red/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
