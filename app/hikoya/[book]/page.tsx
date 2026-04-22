import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { books, getBookById } from "@/lib/books";

export async function generateStaticParams() {
  return books.map((b) => ({ book: b.bookId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string }>;
}): Promise<Metadata> {
  const { book: bookId } = await params;
  const book = getBookById(bookId);
  if (!book) return { title: "Hikoya topilmadi" };
  return {
    title: `${book.titleUz} · BAYAN`,
    description: book.summaryUz,
    openGraph: {
      title: `${book.titleAr} — ${book.author}`,
      description: book.summaryUz,
      type: "book",
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book: bookId } = await params;
  const book = getBookById(bookId);
  if (!book) notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <section className="w-full px-6 lg:px-16 py-16">
        <div className="max-w-[780px] mx-auto flex flex-col gap-8">
          <nav className="flex items-center gap-2 text-[12px]">
            <Link
              href="/hikoyalar"
              className="font-semibold text-muted hover:text-forest"
            >
              Hikoyalar
            </Link>
            <span className="text-muted-2">/</span>
            <span className="ar text-[13px] font-semibold text-forest truncate">
              {book.titleAr}
            </span>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="inline-flex px-4 py-2 bg-red-soft rounded-full w-fit">
              <span className="text-[11px] font-bold tracking-[2.2px] text-red">
                {book.chapters.length} BOB
              </span>
            </span>
            <h1
              dir="rtl"
              className="ar text-[48px] lg:text-[56px] leading-[1.15] font-bold text-forest text-right"
            >
              {book.titleAr}
            </h1>
            <p
              className="italic text-xl text-muted leading-[1.4]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {book.titleUz}
            </p>
            <p className="text-base text-muted-2 leading-[1.65] max-w-2xl">
              {book.summaryUz}
            </p>
            <div className="flex flex-wrap items-center gap-3 py-3 border-y border-border">
              <span className="ar text-[15px] font-bold text-forest">
                {book.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-border-2" />
              <span className="ar text-sm font-medium text-muted">
                {book.publisher}
              </span>
              <span className="w-1 h-1 rounded-full bg-border-2" />
              <span className="text-sm text-muted">{book.license.text}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold tracking-[2px] text-muted">
              BOBLAR
            </span>
            <ol className="flex flex-col gap-2.5">
              {book.chapters.map((ch) => (
                <li key={ch.number}>
                  <Link
                    href={`/hikoya/${book.bookId}/${ch.number}`}
                    className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-border hover:border-border-2 lift"
                  >
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-soft text-blue-deep font-bold text-base shrink-0"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {ch.number}
                    </span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span
                        dir="rtl"
                        className="ar text-[18px] font-bold text-forest text-right leading-[1.4] group-hover:text-red transition-colors"
                      >
                        {ch.titleHarakat}
                      </span>
                      <span
                        dir="rtl"
                        className="ar text-xs font-medium text-muted-2 text-right"
                      >
                        {ch.heading}
                      </span>
                    </div>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="text-muted-2 shrink-0"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-2 p-5 bg-white rounded-2xl border border-border text-xs italic text-muted-2 leading-[1.6]">
            Matn asli Komil Kiloniyga tegishli bo&apos;lib, jamoat mulkida
            (Public Domain). Hindoviy nashriyotining kitob dizayni — CC BY 4.0.
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
