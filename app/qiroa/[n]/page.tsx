import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StoreButtons } from "@/components/StoreButtons";
import {
  APP_STORE_URL,
  LEVEL_COLOR,
  LEVEL_NAME,
  androidIntentUrl,
  appUrl,
  coverOf,
  getAllTests,
  getTest,
  ogOf,
  playUrl,
} from "@/lib/qiroa";
import { OpenInApp } from "./OpenInApp";

export async function generateStaticParams() {
  return getAllTests().map((t) => ({ n: String(t.n) }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const t = getTest(Number(n));
  if (!t) return { title: "Test topilmadi" };
  const title = `${t.title_uz} — o'qib tushunish testi (${t.level})`;
  return {
    title,
    description: t.desc_uz,
    alternates: { canonical: `/qiroa/${t.n}` },
    openGraph: {
      title: `${t.title_ar} · ${t.title_uz}`,
      description: `Arab tilida o'qib tushunish testi, ${t.level} daraja: ${t.questions} savol, 100 ball. ${t.desc_uz}`,
      type: "website",
      images: [{ url: ogOf(t), width: 1200, height: 630, alt: t.title_ar }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.desc_uz,
      images: [ogOf(t)],
    },
  };
}

export default async function ReadingTestPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const t = getTest(Number(n));
  if (!t) notFound();
  const color = LEVEL_COLOR[t.level];

  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <section className="px-5 pt-6 pb-16">
        <div className="max-w-[460px] mx-auto flex flex-col gap-5">
          <div className="rounded-[32px] bg-white border border-border p-5 shadow-[0_20px_50px_-30px_rgba(27,58,40,0.45)] flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverOf(t)}
              alt=""
              width={420}
              height={420}
              className="w-full aspect-square rounded-[24px] object-cover"
            />
            <div className="flex flex-wrap items-center justify-center gap-2 text-[12px] font-bold">
              <span className="rounded-full px-3 py-1 text-white" style={{ background: color }}>
                {t.level} · {LEVEL_NAME[t.level]}
              </span>
              {t.genre_uz && (
                <span className="rounded-full px-3 py-1" style={{ color, background: `${color}1f` }}>
                  {t.genre_uz}
                </span>
              )}
            </div>
            <div className="text-center">
              <h1 dir="rtl" className="font-arabic text-[34px] leading-[1.35] text-forest font-bold">
                {t.title_ar}
              </h1>
              <p className="text-[16px] font-semibold text-muted">{t.title_uz}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-2">{t.desc_uz}</p>
            </div>
            <dl className="grid grid-cols-4 text-center border-t border-border pt-4">
              {[
                [t.word_count, "so'z"],
                [t.questions, "savol"],
                [t.minutes, "daqiqa"],
                [100, "ball"],
              ].map(([v, l]) => (
                <div key={String(l)}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-[20px] font-extrabold text-forest tabular-nums">{v}</dd>
                  <dd className="text-[12px] text-muted-2">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <OpenInApp
            intentUrl={androidIntentUrl(t)}
            appUrl={appUrl(t)}
            appStoreUrl={APP_STORE_URL}
            playUrl={playUrl(t)}
          />
          <p className="text-center text-[13px] text-muted-2 leading-relaxed">
            Test Bayan ilovasida yechiladi. Ilova o&apos;rnatilmagan bo&apos;lsa,
            avval yuklab oling, so&apos;ng shu havolani qayta bosing — test
            ilovada ochiladi.
          </p>
          <div className="hidden md:flex justify-center">
            <StoreButtons />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
