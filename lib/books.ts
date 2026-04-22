import naradaRaw from "./data/kilani/narada.json";

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

export interface KilaniBook {
  bookId: string;
  titleAr: string;
  titleUz: string;
  author: string;
  authorUz: string;
  publisher: string;
  license: KilaniLicense;
  coverImage: string;
  summaryUz: string;
  readingMinutes: number;
  chapters: KilaniChapter[];
}

const narada = naradaRaw as unknown as {
  bookId: string;
  titleAr: string;
  author: string;
  publisher: string;
  license: KilaniLicense;
  chapters: KilaniChapter[];
};

export const books: KilaniBook[] = [
  {
    ...narada,
    titleUz: "Narada",
    authorUz: "Komil Kiloniy",
    coverImage: "/covers/books/narada.png",
    readingMinutes: 12,
    summaryUz:
      "Hindistonda yashagan jasur bola Narada haqidagi klassik arab tilidagi bolalar hikoyasi. Ayiq, sehrgarlar, qutqarilgan amaki qizi — 16 bobda.",
  },
];

export function getBookById(id: string): KilaniBook | undefined {
  return books.find((b) => b.bookId === id);
}

export function getChapter(
  bookId: string,
  chapterNumber: number,
): { book: KilaniBook; chapter: KilaniChapter } | undefined {
  const book = getBookById(bookId);
  if (!book) return undefined;
  const chapter = book.chapters.find((c) => c.number === chapterNumber);
  if (!chapter) return undefined;
  return { book, chapter };
}
