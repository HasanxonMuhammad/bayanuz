import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StoreButtons } from "@/components/StoreButtons";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex flex-col">
      <Nav />
      <section className="flex-1 w-full px-6 lg:px-16 py-20 flex items-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <span
            className="ar text-[72px] leading-none text-red"
            aria-hidden="true"
          >
            ٤٠٤
          </span>
          <h1
            className="text-[40px] lg:text-[56px] leading-[1.05] font-medium text-forest tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bu sahifa topilmadi
          </h1>
          <p className="text-lg text-muted leading-[1.55] max-w-[520px]">
            Havola eskirgan yoki manzil noto&apos;g&apos;ri yozilgan bo&apos;lishi
            mumkin. Bosh sahifaga qayting yoki ilovani yuklab oling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3.5 bg-white text-forest rounded-full border border-border-2 text-sm font-bold hover:-translate-y-0.5 transition-transform"
            >
              Bosh sahifa
            </Link>
            <Link
              href="/maqolalar"
              className="inline-flex items-center px-6 py-3.5 bg-white text-forest rounded-full border border-border-2 text-sm font-bold hover:-translate-y-0.5 transition-transform"
            >
              Maqolalar
            </Link>
          </div>
          <StoreButtons className="justify-center pt-2" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
