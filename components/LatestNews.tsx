import Link from "next/link";

interface NewsCard {
  slug: string;
  category: string;
  readMinutes: number;
  titleUz: string;
  subtitle: string;
  headlineAr: string;
  gradientFrom: string;
  gradientTo: string;
}

const newsCards: NewsCard[] = [
  {
    slug: "kif-tutqin-al-qiraa",
    category: "TIL BO'YICHA",
    readMinutes: 8,
    titleUz: "Arab tilini o'qish va yozishni qanday o'zlashtirish",
    subtitle:
      "An'anaviy va zamonaviy uslublar kombinatsiyasi — amaliy maslahatlar.",
    headlineAr: "اللغة العربية",
    gradientFrom: "#FDF6E3",
    gradientTo: "#EAD9B7",
  },
  {
    slug: "tashbih-va-turlari",
    category: "BALAG'A",
    readMinutes: 6,
    titleUz: "Tashbih va uning turlari — arab balag'asi",
    subtitle: "O'xshatish san'ati orqali matnni boyitish uslublari.",
    headlineAr: "البلاغة",
    gradientFrom: "#FFE4E4",
    gradientTo: "#F5CACA",
  },
  {
    slug: "ism-fail-va-maful",
    category: "SARF",
    readMinutes: 10,
    titleUz: "Ism fail va ism maf'ul — vaznlari va ma'nolari",
    subtitle:
      "Arabcha so'z yasalishi asoslari, ism fail va ism maf'ul vaznlari.",
    headlineAr: "الصرف",
    gradientFrom: "#D6E4FF",
    gradientTo: "#B7CCEE",
  },
];

export function LatestNews() {
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
              className="text-[40px] lg:text-[44px] leading-[1.15] font-medium text-forest tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Har maqola — bilim
              <br className="hidden lg:block" />
              sari yangi qadam
            </h2>
          </div>
          <Link
            href="/maqolalar"
            className="inline-flex items-center gap-2 px-5 py-3 bg-cream rounded-full text-sm font-bold text-forest hover:bg-cream-dark transition-colors w-fit"
          >
            Barcha maqolalar
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsCards.map((n) => (
            <NewsCardTile key={n.slug} {...n} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCardTile({
  slug,
  category,
  readMinutes,
  titleUz,
  subtitle,
  headlineAr,
  gradientFrom,
  gradientTo,
}: NewsCard) {
  return (
    <Link
      href={`/maqola/${slug}`}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden lift border border-border"
    >
      <div
        className="h-56 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <span
          className="text-5xl font-bold text-forest"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          {headlineAr}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-bold tracking-[1.5px] text-red">
            {category}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-border-2" />
          <span className="text-[11px] font-medium text-muted">
            {readMinutes} min
          </span>
        </div>
        <h3
          className="text-xl leading-[1.3] font-medium text-forest group-hover:text-red transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {titleUz}
        </h3>
        <p className="text-[13px] text-muted leading-[1.55]">{subtitle}</p>
      </div>
    </Link>
  );
}
