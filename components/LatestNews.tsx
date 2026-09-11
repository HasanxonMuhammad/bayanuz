import Link from "next/link";
import { articles, type BahethArticle } from "@/lib/articles";

const UZ_MONTHS: Record<string, number> = {
  yanvar: 0, fevral: 1, mart: 2, aprel: 3, may: 4, iyun: 5,
  iyul: 6, avgust: 7, sentabr: 8, oktabr: 9, noyabr: 10, dekabr: 11,
};

/** "Oktabr 16, 2025" → timestamp (0 when unparsable so it sorts last). */
function parseUzDate(s: string): number {
  const m = s.trim().match(/^([A-Za-z']+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!m) return 0;
  const month = UZ_MONTHS[m[1].toLowerCase()];
  if (month === undefined) return 0;
  return new Date(Number(m[3]), month, Number(m[2])).getTime();
}

export function latestArticles(n: number): BahethArticle[] {
  return [...articles]
    .sort((a, b) => parseUzDate(b.publishedAt) - parseUzDate(a.publishedAt))
    .slice(0, n);
}

export function LatestNews() {
  const latest = latestArticles(3);
  return (
    <section className="w-full px-6 lg:px-16 py-24 bg-cream">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col gap-4">
            <span className="inline-flex px-4 py-2 bg-red-soft rounded-full w-fit">
              <span className="text-[11px] font-bold tracking-[2.2px] text-red">
                SO&apos;NGI MAQOLALAR
              </span>
            </span>
            <h2
              className="text-[36px] sm:text-[40px] lg:text-[44px] leading-[1.15] font-medium text-forest tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Har maqola — bilim{" "}
              <br className="hidden lg:block" />
              sari yangi qadam
            </h2>
          </div>
          <Link
            href="/maqolalar"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full text-sm font-bold text-forest border border-border hover:border-border-2 transition-colors w-fit"
          >
            Barcha maqolalar ({articles.length})
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((a) => (
            <NewsCardTile key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCardTile({ article: a }: { article: BahethArticle }) {
  return (
    <Link
      href={`/maqola/${a.slug}`}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden lift border border-border"
    >
      <div className="relative h-52 overflow-hidden bg-paper-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={a.coverImage}
          alt={a.titleAr}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-bold tracking-[1.5px] text-red uppercase">
            {a.categoryNameUz}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-border-2" />
          <span className="text-[11px] font-medium text-muted">
            {a.readingMinutes} min
          </span>
        </div>
        <h3
          dir="rtl"
          className="ar text-[22px] leading-[1.45] font-bold text-forest text-right group-hover:text-red transition-colors"
        >
          {a.titleAr}
        </h3>
        {a.titleUz && (
          <p
            className="italic text-[15px] text-muted leading-[1.45]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {a.titleUz}
          </p>
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="ar text-[13px] font-semibold text-muted-2">{a.authorName}</span>
          <span className="text-[11px] text-muted-2">· {a.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}
