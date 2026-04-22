import fs from "node:fs";
import path from "node:path";

export interface KilaniChapter {
  number: number;
  heading: string;
  titleHarakat: string;
  title: string;
  body: string;
}

export interface KilaniLicense {
  text: string;
  design: string;
}

/** Kitoblar ro'yxati uchun yengil metadata (body yo'q). */
export interface KilaniBookMeta {
  bookId: string;
  titleAr: string;
  titleAr_harakat: string;
  titleUz: string;
  summaryUz: string;
  author: string;
  publisher: string;
  readingMinutes: number;
  chaptersCount: number;
}

/** Reader uchun to'liq kitob (barcha boblar body bilan). */
export interface KilaniBook extends KilaniBookMeta {
  license: KilaniLicense;
  chapters: KilaniChapter[];
}

const DATA_DIR = path.join(process.cwd(), "lib", "data", "kilani");

function coverPath(bookId: string): string {
  return `/covers/books/${bookId}.png`;
}

/** Barcha kitoblarning metadata ro'yxati — build time'da o'qiladi. */
export function getAllBooksMeta(): (KilaniBookMeta & { coverImage: string })[] {
  const idxPath = path.join(DATA_DIR, "books-index.json");
  if (!fs.existsSync(idxPath)) return [];
  const raw = fs.readFileSync(idxPath, "utf-8");
  const { books } = JSON.parse(raw) as { books: KilaniBookMeta[] };
  return books.map((b) => ({ ...b, coverImage: coverPath(b.bookId) }));
}

/** Bitta kitobning to'liq ma'lumotlarini o'qish. */
export function getBook(
  bookId: string,
): (KilaniBook & { coverImage: string }) | null {
  const p = path.join(DATA_DIR, `${bookId}.json`);
  if (!fs.existsSync(p)) return null;
  const raw = fs.readFileSync(p, "utf-8");
  const data = JSON.parse(raw) as KilaniBook;
  return {
    ...data,
    titleAr_harakat: data.titleAr_harakat ?? data.titleAr,
    chaptersCount: data.chapters.length,
    coverImage: coverPath(bookId),
  };
}
