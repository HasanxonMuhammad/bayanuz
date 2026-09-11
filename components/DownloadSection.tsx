import { StoreButton } from "./StoreButtons";
import { DOWNLOAD_URL } from "@/lib/links";

/**
 * Dark "get the app" band. Replaces the old video teaser (there was no video).
 * Two platform cards + one QR that routes each phone to its own store.
 */
export function DownloadSection() {
  return (
    <section className="w-full px-6 lg:px-16 py-20 lg:py-24 bg-forest text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-center min-w-0-children">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center px-4 py-2 rounded-full w-fit bg-[rgba(220,38,38,0.2)]">
              <span className="text-[11px] font-bold tracking-[2px] text-[#FFA8A8]">
                IKKALA PLATFORMADA
              </span>
            </span>
            <h2
              className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.15] font-medium tracking-[-0.015em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              iPhone&apos;da ham,
              <br />
              Android&apos;da ham — BAYAN
            </h2>
            <p className="text-base text-forest-light leading-[1.55] max-w-[520px]">
              Ilova App Store va Google Play&apos;da. Bir marta yuklab oling —
              lug&apos;at, fe&apos;l tuslanishi va hikmatlar internetsiz ham
              yoningizda.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-[640px]">
            <PlatformCard
              store="apple"
              title="iPhone & iPad"
              note="iOS 14 va undan yuqori"
            />
            <PlatformCard
              store="google"
              title="Android"
              note="Telefon va planshetlar uchun"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 p-7 bg-white rounded-3xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] w-full max-w-[360px] mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/qr/download.svg"
            alt="BAYAN ilovasini yuklab olish uchun QR kod"
            width={220}
            height={220}
            className="w-[220px] h-[220px] rounded-2xl border border-border p-3 bg-white"
          />
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-sm font-bold text-forest">
              Kamerani QR&apos;ga tuting
            </span>
            <span className="text-[12px] text-muted leading-snug">
              Telefoningiz o&apos;zi kerakli do&apos;konni ochadi
            </span>
            <a
              href={DOWNLOAD_URL}
              className="mt-1 text-[12px] font-semibold text-red hover:underline"
            >
              bayanai.uz/download
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  store,
  title,
  note,
}: {
  store: "apple" | "google";
  title: string;
  note: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-forest-soft/60 border border-forest-soft">
      <div className="flex flex-col gap-1">
        <span className="text-base font-bold text-white">{title}</span>
        <span className="text-[12px] font-medium text-forest-light">{note}</span>
      </div>
      <StoreButton store={store} tone="light" className="w-fit" />
    </div>
  );
}
