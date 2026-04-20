import { PhoneMockup } from "./PhoneMockup";

export function Hero() {
  return (
    <section className="w-full px-6 lg:px-16 pt-10 pb-20 lg:pb-28 bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-7">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-soft rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span className="text-[11px] font-bold tracking-[2.2px] text-red">
              ARABCHA-O&apos;ZBEKCHA LUG&apos;AT
            </span>
          </div>
          <h1
            className="text-[54px] lg:text-[80px] leading-[1.02] font-medium text-forest tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Til va qalb orasidagi ko&apos;prik
          </h1>
          <p className="text-lg text-muted leading-[1.55] max-w-[560px]">
            Yuz mingdan ortiq so&apos;z, olti mingdan oshiq maqol va hikmat,
            fe&apos;l tuslanishi va ilmiy maqolalar — arab tili ilmi
            cho&apos;ntagingizda, internetsiz ham.
          </p>
          <div id="download" className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-forest text-white rounded-full hover:bg-forest-dark transition-colors"
            >
              <PlayStoreIcon />
              <span className="flex flex-col leading-tight text-left">
                <span className="text-[10px] font-medium text-forest-light">
                  Yuklab olish
                </span>
                <span className="text-sm font-bold">Google Play</span>
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-forest rounded-full border border-border-2 hover:-translate-y-0.5 transition-transform"
            >
              <PlayIcon />
              <span className="text-sm font-bold">Demo video</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-10 pt-5">
            <Stat value="+120K" label="so'z" color="forest" />
            <Stat value="+6 227" label="maqol & hikmat" color="red" />
            <Stat value="4.9 ★" label="baho" color="gold" />
          </div>
        </div>

        <div className="relative">
          <PhoneMockup src="/screens/1.png" alt="BAYAN bosh sahifa" blobColor="#FFE4E4" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: "forest" | "red" | "gold";
}) {
  const colorMap: Record<string, string> = {
    forest: "text-forest",
    red: "text-red",
    gold: "text-gold",
  };
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`text-[30px] font-bold ${colorMap[color]}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value}
      </span>
      <span className="text-[11px] font-medium text-muted tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zM14.5 13.707l2.564 2.564-11.6 6.688 9.036-9.252zM17.866 9.8l3.63 2.093a1 1 0 0 1 0 1.734L17.866 15.72 14.79 13l3.076-3.2zM5.464 1.041l11.6 6.688L14.5 10.293 5.464 1.04z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#DC2626">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
