import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "./WhatsNew";

type Card = {
  key: string;
  title: string;
  text: string;
  stat?: string;
  img?: string;
  href?: string;
  tint: string;
  accent: string;
  wide?: boolean;
};

/** Numbers checked against the app's databases on 2026-10-03. */
const CARDS: Card[] = [
  {
    key: "lugat",
    title: "Lug'at — asl manbalar bilan",
    text: "Har bir so'zning ma'nolari, ko'pligi, o'zagi va sinonimlari. Al-Vasit, Fiqh ensiklopediyasi va Vikipediya — bir bosishda.",
    stat: "81 000+ so'z",
    img: "/screens/v2/sources.jpg",
    tint: "#FFFFFF",
    accent: "#0E5A46",
    wide: true,
  },
  {
    key: "tuslanish",
    title: "Fe'l tuslanishi",
    text: "Ma'lum va majhul, moziy, muzore va amr — barcha shaxslarda, to'liq jadvalda.",
    stat: "23 735 fe'l",
    img: "/screens/v2/conjugation.jpg",
    tint: "#EAF1FF",
    accent: "#2F6CF6",
  },
  {
    key: "kiloniy",
    title: "Kamil Kiloniy kutubxonasi",
    text: "Arab bolalar adabiyoti durdonalari: o'qing, notanish so'zni bosing — tarjimasi shu yerda.",
    stat: "111 hikoya",
    img: "/screens/v2/kilani.jpg",
    href: "/hikoyalar",
    tint: "#FFF4D6",
    accent: "#8A6A12",
  },
  {
    key: "mavzular",
    title: "Mavzulashtirilgan lug'at",
    text: "Ta'lim, fan, siyosat, huquq, iqtisod, din… So'zlarni mavzu bo'yicha, tizimli o'rganing.",
    stat: "51 mavzu · 8 400+ so'z",
    img: "/screens/v2/thematic.jpg",
    tint: "#E3F3EA",
    accent: "#0E5A46",
  },
  {
    key: "sinonim",
    title: "Sinonim va antonimlar",
    text: "So'zning yaqin va qarama-qarshi ma'nolilarini ko'ring — nutqingiz boyiydi.",
    stat: "77 000+ juftlik",
    img: "/screens/v2/synonyms.jpg",
    tint: "#FFFFFF",
    accent: "#0E5A46",
  },
  {
    key: "misollar",
    title: "AI misollar",
    text: "Istalgan so'z uchun jonli gaplar, so'zning o'zi rangli ajratiladi, tarjimasi bilan.",
    stat: "Har bir so'zga",
    img: "/screens/v2/examples.jpg",
    tint: "#F1EDFF",
    accent: "#6D4BE0",
  },
  {
    key: "testlar",
    title: "Testlar",
    text: "Nahv, sarf va imlo bo'yicha savollar banki: bob-bob yoki aralash, xatolar tahlili bilan.",
    stat: "1 626 savol",
    img: "/screens/v2/tests.jpg",
    tint: "#FFE9E9",
    accent: "#DC2626",
  },
];

export function FeatureBento() {
  return (
    <section id="features" className="w-full scroll-mt-24 bg-cream px-5 py-20 sm:px-6 lg:px-16 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <SectionHead
          eyebrow="IMKONIYATLAR"
          tone="blue"
          title="Bitta ilovada — butun arab tili"
          lead="So'z qidirishdan tortib mumtoz hikoyalargacha: arab tilini o'rganayotgan har bir kishiga kerakli vositalar bir joyda."
        />

        {/* Phone: swipe row · Desktop: bento grid */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {CARDS.map((c, i) => (
            <FeatureCard key={c.key} c={c} i={i} />
          ))}
          <ProverbCard />
          <ArticlesCard />
        </div>

        <ul className="reveal flex flex-wrap gap-2.5">
          {[
            "Internetsiz ishlaydi",
            "Lotin va kirill",
            "Tungi rejim",
            "Reklamasiz",
            "Sevimli so'zlar",
            "Kun maqoli",
          ].map((t) => (
            <li key={t} className="inline-flex items-center gap-2 rounded-full border border-border-2 bg-white px-4 py-2 text-[13px] font-semibold text-forest">
              <span className="h-1.5 w-1.5 rotate-45 bg-red" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureCard({ c, i }: { c: Card; i: number }) {
  const body = (
    <>
      <div className={`flex flex-col gap-2.5 p-6 pb-4 sm:p-7 sm:pb-5 ${c.wide ? "lg:max-w-[46%] lg:justify-center lg:p-9" : ""}`}>
        {c.stat && (
          <span className="w-fit rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-[0.6px]" style={{ color: c.accent, background: `${c.accent}14` }}>
            {c.stat}
          </span>
        )}
        <h3 className="text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] text-forest" style={{ fontFamily: "var(--font-display)" }}>
          {c.title}
          {c.href && <span className="ml-1.5 text-[16px] text-muted-2 transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span>}
        </h3>
        <p className="text-[14px] leading-[1.6] text-muted">{c.text}</p>
      </div>
      {c.img && (
        <div className={`relative mt-auto overflow-hidden px-6 sm:px-7 ${c.wide ? "h-[230px] lg:absolute lg:bottom-0 lg:right-8 lg:h-[88%] lg:w-[300px] lg:px-0" : "h-[230px]"}`}>
          <div className="relative h-[520px] overflow-hidden rounded-t-[26px] border-[6px] border-b-0 border-[#0d1712] bg-[#F5F3EE] shadow-[0_-10px_40px_-20px_rgba(16,38,27,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
            <Image
              src={c.img}
              alt={c.title}
              fill
              sizes="(max-width: 1024px) 78vw, 340px"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}
    </>
  );
  const cls = `reveal group relative flex w-[80vw] max-w-[360px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-black/[0.04] lg:w-auto lg:max-w-none ${
    c.wide ? "lg:col-span-2 lg:min-h-[360px]" : ""
  }`;
  const style = { background: c.tint, "--delay": `${(i % 4) * 70}ms` } as React.CSSProperties;
  return c.href ? (
    <Link href={c.href} className={cls} style={style}>
      {body}
    </Link>
  ) : (
    <article className={cls} style={style}>
      {body}
    </article>
  );
}

function ProverbCard() {
  return (
    <article className="reveal relative flex w-[80vw] max-w-[360px] shrink-0 snap-center flex-col justify-between gap-6 overflow-hidden rounded-[28px] bg-forest p-6 text-white sm:p-7 lg:col-span-2 lg:w-auto lg:max-w-none lg:p-9">
      <span className="w-fit rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-extrabold tracking-[0.6px] text-[#F3D98B]">
        680 maqol va matal
      </span>
      <div className="flex flex-col gap-3">
        <span className="text-[40px] leading-none text-red" aria-hidden="true">❝</span>
        <p className="ar text-[30px] leading-[1.5]">مَادِحُ نَفْسِهِ يُقْرِئُكَ السَّلَامَ</p>
        <p className="text-[15px] font-medium text-[#B6E27A]">O&apos;zini maqtagan uzoqdan salom beradi</p>
      </div>
      <p className="text-[13px] leading-[1.6] text-white/60">
        Har kuni yangi maqol — arabcha asli va o&apos;zbekcha muqobili bilan. Chiroyli kartochka qilib ulashing.
      </p>
    </article>
  );
}

function ArticlesCard() {
  return (
    <Link
      href="/maqolalar"
      className="reveal group relative flex w-[80vw] max-w-[360px] shrink-0 snap-center flex-col justify-between gap-6 overflow-hidden rounded-[28px] border border-border bg-white p-6 sm:p-7 lg:col-span-2 lg:w-auto lg:max-w-none lg:p-9"
    >
      <span className="w-fit rounded-full bg-blue-soft px-2.5 py-1 text-[11px] font-extrabold tracking-[0.6px] text-blue">
        78 maqola
      </span>
      <div className="flex flex-col gap-2.5">
        <span className="ar text-[30px] leading-[1.3] text-forest">بَاحِثُو اللُّغَةِ الْعَرَبِيَّةِ</span>
        <h3 className="text-[21px] font-semibold leading-[1.2] text-forest" style={{ fontFamily: "var(--font-display)" }}>
          Ilmiy maqolalar
          <span className="ml-1.5 text-[16px] text-muted-2" aria-hidden="true">↗</span>
        </h3>
        <p className="text-[14px] leading-[1.6] text-muted">
          Nahv, sarf, balog&apos;at va imlo bo&apos;yicha maqolalar — rasmiy hamkorlik asosida.
        </p>
      </div>
    </Link>
  );
}
