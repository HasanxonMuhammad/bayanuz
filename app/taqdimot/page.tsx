import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PresentationView } from "@/components/PresentationView";

export const metadata: Metadata = {
  title: "Taqdimot",
  description:
    "BAYAN ilovasi taqdimoti: 4 tomlik Al-Qomus lug'ati, arab manbalari, Bayan AI, kitoblar va testlar — 14 ta slaydda. To'liq ekranda oching yoki PDF'ni yuklab oling.",
  alternates: { canonical: "/taqdimot" },
  openGraph: {
    title: "BAYAN taqdimoti",
    description:
      "Ilova imkoniyatlari 14 ta slaydda: Al-Qomus, manbalar, Bayan AI, kitoblar, testlar.",
    url: "/taqdimot",
    type: "article",
  },
};

const HIGHLIGHTS = [
  "Al-Qomus · 100 000+ so'z",
  "4 ta qo'shimcha manba",
  "Bayan AI",
  "111 ta kitob",
  "1017 ta test",
];

export default function TaqdimotPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />
      <section className="w-full px-6 lg:px-16 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="inline-flex px-4 py-2 bg-gold-soft rounded-full w-fit">
              <span className="text-[11px] font-bold tracking-[2.2px] text-forest">
                TAQDIMOT
              </span>
            </span>
            <h1
              className="text-[38px] sm:text-[48px] lg:text-[60px] leading-[1.05] font-medium text-forest tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BAYAN ilovasi
              <br />
              taqdimoti
            </h1>
            <p className="text-lg text-muted leading-[1.55] max-w-2xl">
              14 ta slayd: 4 tomlik Al-Qomus lug&apos;ati, arab olamining mashhur manbalari,
              Bayan AI, Kamil Kiloniy kutubxonasi, testlar va boshqalar. Barcha ekranlar
              ilovaning o&apos;zidan olingan.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {HIGHLIGHTS.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-border bg-white px-4 py-2 text-[13px] font-semibold text-forest"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <PresentationView />
        </div>
      </section>
      <Footer />
    </main>
  );
}
