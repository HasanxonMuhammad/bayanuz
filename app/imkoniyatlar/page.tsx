import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FeatureVideos } from "@/components/FeatureVideos";
import { StoreButtons } from "@/components/StoreButtons";

export const metadata: Metadata = {
  title: "Imkoniyatlar",
  description:
    "BAYAN ilovasining barcha imkoniyatlari jonli yozuvlarda: Al-Qomus lug'ati, Al-Vasit va fiqh ensiklopediyasi, Bayan AI tahlil va tarjima, Kamil Kiloniy kitoblari, to'plamlar va testlar.",
  alternates: { canonical: "/imkoniyatlar" },
  openGraph: {
    title: "BAYAN — ilova imkoniyatlari",
    description:
      "Har bir imkoniyat qisqa video bilan: lug'at, manbalar, sun'iy intellekt, kitoblar, testlar.",
    url: "/imkoniyatlar",
    type: "article",
  },
};

const STATS = [
  "Al-Qomus · 100 000+ so'z",
  "4 ta qo'shimcha manba",
  "111 ta kitob",
  "1017 ta test",
  "Oflayn ishlaydi",
];

export default function ImkoniyatlarPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <section className="w-full px-6 lg:px-16 pt-12 lg:pt-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-5">
          <span className="inline-flex px-4 py-2 bg-blue-soft rounded-full w-fit">
            <span className="text-[11px] font-bold tracking-[2.2px] text-blue-deep">
              IMKONIYATLAR
            </span>
          </span>
          <h1
            className="text-[38px] sm:text-[48px] lg:text-[60px] leading-[1.05] font-medium text-forest tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BAYAN nimalarni
            <br />
            qila oladi?
          </h1>
          <p className="text-lg text-muted leading-[1.55] max-w-2xl">
            Har bir imkoniyat — ilovaning o&apos;zidan olingan jonli yozuv. Aylantiring va
            ko&apos;ring: lug&apos;at, manbalar, sun&apos;iy intellekt, kitoblar va testlar.
          </p>
          <div className="flex flex-wrap gap-2">
            {STATS.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-white px-4 py-2 text-[13px] font-semibold text-forest"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="pt-2">
            <StoreButtons />
          </div>
          <p className="text-sm text-muted-2">
            <a
              href="/imkoniyatlar/bayan-imkoniyatlar.mp4"
              download
              className="font-semibold text-forest underline underline-offset-4"
            >
              Hammasi bitta videoda (3:31)
            </a>{" "}
            — Telegram yoki Instagram uchun yuklab oling.
          </p>
          <p className="text-sm text-muted-2">
            Slaydli taqdimot kerakmi?{" "}
            <Link href="/taqdimot" className="font-semibold text-forest underline underline-offset-4">
              Taqdimot bo&apos;limiga o&apos;ting
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="w-full px-6 lg:px-16 pb-4">
        <div className="max-w-6xl mx-auto">
          <FeatureVideos />
        </div>
      </section>

      <Footer />
    </main>
  );
}
