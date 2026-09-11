import { StoreButtons } from "./StoreButtons";
import { DOWNLOAD_URL } from "@/lib/links";

export function FinalCta() {
  return (
    <section className="w-full px-6 lg:px-16 py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center min-w-0-children">
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span className="text-[11px] font-bold tracking-[2px] text-forest">
              MUTLAQO BEPUL
            </span>
          </div>
          <h2
            className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[1.02] font-medium text-forest tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ilm yo&apos;li —
            <br />
            bir qadamda
          </h2>
          <p className="text-lg text-muted leading-[1.55] max-w-[520px]">
            Internetsiz ham yashaydi. Har ikki yozuvni biladi. Doim bepul,
            doim yoningizda — iPhone&apos;da ham, Android&apos;da ham.
          </p>
          <StoreButtons size="lg" className="pt-3" />
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          <div
            className="absolute rounded-full"
            style={{
              width: 340,
              height: 340,
              background:
                "radial-gradient(closest-side, #FFE4E4, transparent 80%)",
              zIndex: 0,
            }}
          />
          <a
            href={DOWNLOAD_URL}
            className="relative z-10 flex flex-col items-center gap-4 p-6 bg-white rounded-3xl shadow-[0_30px_60px_-20px_rgba(27,58,40,0.2)] hover:-translate-y-1 transition-transform"
            aria-label="QR orqali yuklab olish"
          >
            <div className="w-44 h-44 rounded-2xl bg-white border border-border p-3 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qr/download.svg"
                alt="BAYAN ilovasini yuklab olish uchun QR kod"
                width={160}
                height={160}
                className="w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-forest">QR orqali yuklash</span>
            <span className="text-[11px] font-medium text-muted-2 -mt-2">
              App Store · Google Play
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
