export function FinalCta() {
  return (
    <section className="w-full px-6 lg:px-16 py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span className="text-[11px] font-bold tracking-[2px] text-forest">
              MUTLAQO BEPUL
            </span>
          </div>
          <h2
            className="text-[56px] lg:text-[72px] leading-[1.02] font-medium text-forest tracking-[-0.035em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ilm yo&apos;li —
            <br />
            bir qadamda
          </h2>
          <p className="text-lg text-muted leading-[1.55] max-w-[520px]">
            Internetsiz ham yashaydi. Har ikki yozuvni biladi. Doim bepul,
            doim yoningizda.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="#"
              className="inline-flex items-center gap-3.5 px-7 py-4 bg-forest text-white rounded-full hover:bg-forest-dark transition-colors"
            >
              <PlayStoreIcon />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[10px] font-medium text-forest-light">
                  Yuklab olish
                </span>
                <span className="text-[15px] font-bold">Google Play</span>
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-white rounded-full border border-border-2"
            >
              <AppleIcon />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[10px] font-medium text-muted">
                  Tez orada
                </span>
                <span className="text-[15px] font-bold text-forest">
                  App Store
                </span>
              </span>
            </a>
          </div>
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
          <div className="relative z-10 flex flex-col items-center gap-4 p-6 bg-white rounded-3xl shadow-[0_30px_60px_-20px_rgba(27,58,40,0.2)]">
            <div className="w-40 h-40 rounded-2xl bg-forest flex items-center justify-center">
              <QrIcon />
            </div>
            <span className="text-sm font-bold text-forest">QR orqali yuklash</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zM14.5 13.707l2.564 2.564-11.6 6.688 9.036-9.252zM17.866 9.8l3.63 2.093a1 1 0 0 1 0 1.734L17.866 15.72 14.79 13l3.076-3.2zM5.464 1.041l11.6 6.688L14.5 10.293 5.464 1.04z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1B3A28">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg width="110" height="110" viewBox="0 0 24 24" fill="white">
      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2z" />
    </svg>
  );
}
