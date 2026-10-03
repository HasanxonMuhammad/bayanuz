import { StoreButtons } from "./StoreButtons";
import { DOWNLOAD_URL } from "@/lib/links";
import { FloatingLetters } from "./FloatingLetters";

export function FinalCta() {
  return (
    <section className="w-full bg-cream px-5 pb-20 sm:px-6 lg:px-16 lg:pb-28">
      <div className="reveal relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-white px-6 py-14 shadow-[0_40px_90px_-50px_rgba(16,38,27,0.45)] sm:px-12 lg:px-16 lg:py-20">
        <FloatingLetters className="opacity-70" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto] min-w-0-children">
          <div className="flex flex-col gap-5">
            <span className="ar w-fit text-[30px] leading-none text-emerald">اِبْدَأِ الْيَوْمَ</span>
            <h2
              className="text-[38px] font-medium leading-[1.04] tracking-[-0.03em] text-forest sm:text-[52px] lg:text-[64px]"
              style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
            >
              Ilm yo&apos;li — bir qadamdan boshlanadi
            </h2>
            <p className="max-w-[540px] text-[17px] leading-[1.6] text-muted">
              Bugun bitta so&apos;zdan boshlang, ertaga bitta dars, keyin butun
              bir matn. BAYAN har qadamda yoningizda — iPhone&apos;da ham,
              Android&apos;da ham.
            </p>
            <StoreButtons size="lg" className="pt-2" />
          </div>

          <a
            href={DOWNLOAD_URL}
            className="hidden flex-col items-center gap-3 rounded-3xl border border-border bg-cream p-5 transition-transform hover:-translate-y-1 md:flex"
            aria-label="QR orqali yuklab olish"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qr/download.svg"
              alt="BAYAN ilovasini yuklab olish uchun QR kod"
              width={168}
              height={168}
              className="h-[168px] w-[168px] rounded-2xl bg-white p-3"
            />
            <span className="text-sm font-bold text-forest">Kamerani QR&apos;ga tuting</span>
            <span className="-mt-2 text-[11px] font-medium text-muted-2">
              Telefoningiz kerakli do&apos;konni o&apos;zi ochadi
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
