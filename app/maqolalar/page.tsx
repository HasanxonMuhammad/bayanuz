import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { articles } from "@/lib/articles";

export default function MaqolalarPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <section className="w-full px-6 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="inline-flex px-4 py-2 bg-red-soft rounded-full w-fit">
              <span className="text-[11px] font-bold tracking-[2.2px] text-red">
                MAQOLALAR
              </span>
            </span>
            <h1
              className="text-[48px] lg:text-[60px] leading-[1.05] font-medium text-forest tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Arab tili bo&apos;yicha
              <br />
              ilmiy maqolalar
            </h1>
            <p className="text-lg text-muted leading-[1.55] max-w-2xl">
              &ldquo;باحثو اللغة العربية&rdquo; jamoasidan rasmiy ruxsat asosida.
            </p>
          </div>

          <details className="group max-w-3xl rounded-2xl border border-border bg-white open:bg-cream transition-colors">
            <summary className="flex cursor-pointer items-center gap-3 px-5 py-3 list-none [&::-webkit-details-marker]:hidden">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-soft">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-deep"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8h.01M11 12h1v4h1" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-forest tracking-[-0.01em]">
                Maqolalar haqida
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto text-muted-2 transition-transform group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <p className="px-5 pb-5 text-[15px] text-muted leading-[1.6]">
              Ushbu bo&apos;limdagi barcha maqolalar <strong>arab tili,
              grammatika, balag&apos;at va imlo</strong> bo&apos;yicha ilmiy-akademik
              yozuvlardir. Matnlarda keltirilgan Qur&apos;on oyatlari va
              hadislar faqat <em>til va uslub misoli</em> sifatida olingan
              bo&apos;lib, diniy da&apos;vat yoki diniy ta&apos;lim maqsadida
              emas. O&apos;quvchilar manbalarni original kontekstda
              o&apos;rganishlari tavsiya etiladi.
            </p>
          </details>

          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/maqola/${a.slug}`}
                className="group flex flex-col gap-4 p-6 lg:p-7 bg-white rounded-3xl border border-border hover:border-border-2 lift"
              >
                <div className="flex items-center gap-2">
                  <span className="ar text-sm font-semibold text-blue-deep px-3 py-1 bg-blue-soft rounded-full">
                    {a.categoryNameAr}
                  </span>
                  <span className="text-[11px] font-medium text-muted">
                    · {a.readingMinutes} min
                  </span>
                </div>
                <h2
                  dir="rtl"
                  className="ar text-2xl font-bold text-forest text-right leading-[1.4] group-hover:text-red transition-colors"
                >
                  {a.titleAr}
                </h2>
                <p
                  className="italic text-base text-muted leading-[1.45]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {a.titleUz}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="ar text-sm font-semibold text-muted-2">
                    {a.authorName}
                  </span>
                  <span className="text-xs text-muted-2">· {a.publishedAt}</span>
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
