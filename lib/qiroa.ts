import data from "@/lib/data/qiroa.json";
import { APP_STORE_URL, PLAY_PACKAGE, PLAY_STORE_URL } from "@/lib/links";

/**
 * O'qib tushunish testlari ro'yxati — ilovadagi bilan bir xil raqamlar
 * (`bayanai.uz/qiroa/17` → ilovada 17-test). Bu yerda faqat kartochka
 * ma'lumoti bor: matn ham, savollar ham saytga chiqmaydi.
 *
 * Fayl `albayanuz/scripts/fahm/build_reading_pack.py` chiqargan
 * `reading_index.json` dan olinadi.
 */
export interface ReadingTest {
  n: number;
  level: "B1" | "B2" | "C1" | "C2";
  ord: number;
  title_ar: string;
  title_uz: string;
  genre_uz: string;
  desc_uz: string;
  tint: string;
  word_count: number;
  minutes: number;
  questions: number;
}

const TESTS = data as ReadingTest[];

export function getAllTests(): ReadingTest[] {
  return TESTS;
}

export function getTest(n: number): ReadingTest | undefined {
  return TESTS.find((t) => t.n === n);
}

export function coverOf(t: ReadingTest): string {
  return `/qiroa/covers/r${String(t.n).padStart(3, "0")}.webp`;
}

export function ogOf(t: ReadingTest): string {
  return `/qiroa/og/r${String(t.n).padStart(3, "0")}.jpg`;
}

export const LEVEL_NAME: Record<ReadingTest["level"], string> = {
  B1: "O'rta",
  B2: "O'rtadan yuqori",
  C1: "Yuqori",
  C2: "Mukammal",
};

export const LEVEL_COLOR: Record<ReadingTest["level"], string> = {
  B1: "#2F8F5E",
  B2: "#2F80C2",
  C1: "#7C4DEB",
  C2: "#C2410C",
};

/** Ilova sxemasi — ilovadagi `ReadingLinks` shuni ochadi. */
export function appUrl(t: ReadingTest): string {
  return `bayan://qiroa/${t.n}`;
}

/** Play Store havolasi — o'rnatish manbasi (referrer) bilan. */
export function playUrl(t: ReadingTest): string {
  const ref = encodeURIComponent(`utm_source=qiroa&utm_content=${t.n}`);
  return `${PLAY_STORE_URL}&referrer=${ref}`;
}

/**
 * Android Chrome uchun: ilova bo'lsa — ilovada ochadi, bo'lmasa —
 * `browser_fallback_url` orqali Play Store'ga o'tadi.
 */
export function androidIntentUrl(t: ReadingTest): string {
  return (
    `intent://qiroa/${t.n}#Intent;scheme=bayan;package=${PLAY_PACKAGE};` +
    `S.browser_fallback_url=${encodeURIComponent(playUrl(t))};end`
  );
}

export { APP_STORE_URL };
