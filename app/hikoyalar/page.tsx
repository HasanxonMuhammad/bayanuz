import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { books } from "@/lib/books";

export const metadata: Metadata = {
  title: "Hikoyalar · BAYAN",
  description:
    "Komil Kiloniyning arab tilidagi bolalar hikoyalari — tashkeel bilan, bobma-bob o'qish uchun.",
};

export default function HikoyalarPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <section className="w-full px-6 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="inline-flex px-4 py-2 bg-red-soft rounded-full w-fit">
              <span className="text-[11px] font-bold tracking-[2.2px] text-red">
                HIKOYALAR
              </span>
            </span>
            <h1
              className="text-[48px] lg:text-[60px] leading-[1.05] font-medium text-forest tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Komil Kiloniy
              <br />
              bolalar kutubxonasi
            </h1>
            <p className="text-lg text-muted leading-[1.55] max-w-2xl">
              Arab tilidagi klassik bolalar hikoyalari — tashkeel bilan, sodda
              uslubda. Hindoviy nashriyotining jamoat mulkida bo&apos;lgan
              matnlari.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {books.map((b) => (
              <Link
                key={b.bookId}
                href={`/hikoya/${b.bookId}`}
                className="group flex flex-col gap-4 p-6 lg:p-7 bg-white rounded-3xl border border-border hover:border-border-2 lift"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.coverImage}
                  alt={b.titleAr}
                  className="w-full aspect-[1600/932] object-cover rounded-2xl border border-border"
                />
                <div className="flex items-center gap-2 pt-2">
                  <span className="ar text-sm font-semibold text-blue-deep px-3 py-1 bg-blue-soft rounded-full">
                    حكاية
                  </span>
                  <span className="text-[11px] font-medium text-muted">
                    · {b.chapters.length} bob · {b.readingMinutes} min
                  </span>
                </div>
                <h2
                  dir="rtl"
                  className="ar text-2xl font-bold text-forest text-right leading-[1.4] group-hover:text-red transition-colors"
                >
                  {b.titleAr}
                </h2>
                <p
                  className="italic text-base text-muted leading-[1.45]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {b.titleUz}
                </p>
                <p className="text-sm text-muted-2 leading-[1.55]">
                  {b.summaryUz}
                </p>
                <div className="flex items-center gap-2 pt-1 mt-auto">
                  <span className="ar text-sm font-semibold text-muted-2">
                    {b.author}
                  </span>
                  <span className="text-xs text-muted-2">· {b.publisher}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
