import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getAllBooksMeta, getBook } from "@/lib/books";

export async function generateStaticParams() {
  return getAllBooksMeta().map((b) => ({ book: b.bookId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string }>;
}): Promise<Metadata> {
  const { book: bookId } = await params;
  const book = getBook(bookId);
  if (!book) return { title: "Hikoya topilmadi" };
  return {
    title: `${book.titleUz} · Komil Kiloniy · BAYAN`,
    description: book.summaryUz,
    openGraph: {
      title: `${book.titleAr} — ${book.author}`,
      description: book.summaryUz,
      type: "article",
      authors: [book.author],
      images: [
        {
          url: book.coverImage,
          width: 1600,
          height: 932,
          alt: book.titleAr,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: book.titleUz,
      description: book.summaryUz,
      images: [book.coverImage],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book: bookId } = await params;
  const book = getBook(bookId);
  if (!book) notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <article id="iv-article" className="w-full px-6 lg:px-16 pt-8 pb-20">
        <div className="max-w-[780px] mx-auto flex flex-col gap-6">
          <Breadcrumb book={book} />
          <CategoryPill />
          <TitleBlock book={book} />
          <AuthorRow book={book} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="iv-cover"
            src={book.coverImage}
            alt={book.titleAr}
            className="w-full rounded-2xl border border-border"
          />
          <TableOfContents book={book} />
          <div id="iv-body" className="flex flex-col gap-4">
            <Body book={book} />
            <SourceFooter book={book} />
          </div>
          <ShareRow book={book} />
        </div>
      </article>
      <Footer />
    </main>
  );
}

function Breadcrumb({ book }: { book: { titleAr: string } }) {
  return (
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
  );
}

function CategoryPill() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-soft rounded-full w-fit">
      <span className="ar text-sm font-semibold text-blue-deep">حكاية</span>
      <span className="text-[11px] font-semibold text-blue-deep">·</span>
      <span className="text-[11px] font-bold tracking-wider text-blue-deep">
        HIKOYA
      </span>
    </div>
  );
}

function TitleBlock({ book }: { book: { titleAr: string } }) {
  return (
    <h1
      dir="rtl"
      className="ar text-[36px] lg:text-[44px] leading-[1.5] font-bold text-forest text-right"
    >
      {book.titleAr}
    </h1>
  );
}

function AuthorRow({
  book,
}: {
  book: {
    author: string;
    publisher: string;
    readingMinutes: number;
    chapters: { number: number }[];
  };
}) {
  return (
    <div className="flex flex-wrap items-center gap-3.5 py-3 border-y border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/authors/kamil-kilani.webp"
        alt={book.author}
        className="w-11 h-11 rounded-full object-cover shrink-0 border border-border"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="ar text-[15px] font-bold text-forest text-right truncate">
          {book.author}
        </span>
        <span className="ar text-xs font-medium text-muted-2 text-right">
          {book.publisher}
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>Komil Kiloniy</span>
        <span className="w-1 h-1 rounded-full bg-border-2" />
        <span>{book.chapters.length} bob</span>
        <span className="w-1 h-1 rounded-full bg-border-2" />
        <span>{book.readingMinutes} daqiqa</span>
      </div>
    </div>
  );
}

function TableOfContents({
  book,
}: {
  book: { chapters: { number: number; titleHarakat: string; title: string }[] };
}) {
  return (
    <details className="bg-white rounded-xl border border-border group" open>
      <summary className="flex items-center justify-between cursor-pointer px-5 py-4 list-none">
        <span className="flex items-center gap-2.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A6B52"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span className="text-sm font-medium text-muted">Ochish</span>
        </span>
        <span className="flex items-center gap-2.5">
          <span
            className="ar text-lg font-bold text-forest"
            style={{ fontFamily: "var(--font-arabic)" }}
          >
            جدول المحتويات
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1B3A28"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </span>
      </summary>
      <ol className="px-5 pb-5 pt-2 border-t border-border flex flex-col gap-2.5">
        {book.chapters.map((ch) => (
          <li
            key={ch.number}
            className="ar flex items-start gap-2 text-right"
            dir="rtl"
          >
            <span className="text-red font-bold shrink-0">{ch.number}.</span>
            <a
              href={`#fasl-${ch.number}`}
              className="text-base font-semibold text-red underline decoration-red hover:decoration-forest hover:text-forest transition-colors"
            >
              {ch.titleHarakat}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

function Body({
  book,
}: {
  book: {
    chapters: {
      number: number;
      heading: string;
      titleHarakat: string;
      body: string;
    }[];
  };
}) {
  return (
    <div className="flex flex-col">
      {book.chapters.map((ch) => (
        <section key={ch.number} id={`fasl-${ch.number}`}>
          <h2
            dir="rtl"
            className="ar mt-8 mb-4 px-5 py-4 bg-white border-r-4 border-red rounded-sm text-right text-[26px] font-bold text-forest leading-[1.5] flex flex-col gap-1"
          >
            <span className="text-[14px] font-semibold text-muted tracking-wide">
              {ch.heading}
            </span>
            <span>{ch.titleHarakat}</span>
          </h2>
          {ch.body
            .split("\n\n")
            .filter((p) => p.trim().length)
            .map((p, i) => (
              <p
                key={i}
                dir="rtl"
                className="ar mb-4 text-right text-xl lg:text-[22px] font-medium text-forest leading-[2]"
                style={{ textAlign: "justify" }}
              >
                {p}
              </p>
            ))}
        </section>
      ))}
    </div>
  );
}

function SourceFooter({
  book,
}: {
  book: {
    author: string;
    publisher: string;
    license: { text: string; design: string };
  };
}) {
  return (
    <div className="mt-4 bg-white rounded-sm border border-border p-7 lg:p-8 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "#1E3A8A" }}
        >
          <span className="ar text-3xl font-bold text-white">ك</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[2px] text-muted">
            MUALLIF · NASHRIYOT
          </span>
          <span className="ar text-xl font-bold text-forest">
            {book.author} — {book.publisher}
          </span>
        </div>
      </div>
      <p className="text-xs italic text-muted-2 leading-[1.5]">
        Asl matn: {book.license.text}. Kitob dizayni: {book.license.design}.
        Matn o&apos;zgartirilmagan.
      </p>
    </div>
  );
}

function ShareRow({
  book,
}: {
  book: { bookId: string; titleAr: string; titleUz: string };
}) {
  const url = `https://bayanuz.vercel.app/hikoya/${book.bookId}`;
  const title = `${book.titleAr} — ${book.titleUz}`;
  return (
    <div className="flex items-center gap-4 pt-5">
      <span className="text-[11px] font-bold tracking-[2px] text-muted">
        ULASHISH
      </span>
      <div className="flex items-center gap-2">
        <ShareBtn
          href={`https://t.me/share/url?url=${encodeURIComponent(
            url,
          )}&text=${encodeURIComponent(title)}`}
          label="Telegram"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
          </svg>
        </ShareBtn>
        <ShareBtn
          href={`https://wa.me/?text=${encodeURIComponent(title + " — " + url)}`}
          label="WhatsApp"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </ShareBtn>
        <ShareBtn href={url} label="Havolani ko'chirish">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </ShareBtn>
      </div>
    </div>
  );
}

function ShareBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-forest hover:-translate-y-0.5 transition-transform"
    >
      {children}
    </a>
  );
}
