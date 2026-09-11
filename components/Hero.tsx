import { PhoneMockup } from "./PhoneMockup";
import { StoreButtons } from "./StoreButtons";

export function Hero() {
  return (
    <section className="w-full px-6 lg:px-16 pt-10 pb-20 lg:pb-28 bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center min-w-0-children">
        <div className="flex flex-col gap-7">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-soft rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            <span className="text-[11px] font-bold tracking-[2.2px] text-red">
              ARABCHA-O&apos;ZBEKCHA LUG&apos;AT
            </span>
          </div>
          <h1
            className="text-[42px] sm:text-[54px] lg:text-[80px] leading-[1.02] font-medium text-forest tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Til va qalb orasidagi ko&apos;prik
          </h1>
          <p className="text-lg text-muted leading-[1.55] max-w-[560px]">
            Yuz mingdan ortiq so&apos;z, olti mingdan oshiq maqol va hikmat,
            fe&apos;l tuslanishi va ilmiy maqolalar — arab tili ilmi
            cho&apos;ntagingizda, internetsiz ham.
          </p>

          <div id="download" className="flex flex-col gap-3 pt-2 scroll-mt-28">
            <StoreButtons />
            <p className="text-[12px] font-medium text-muted-2">
              iPhone va Android uchun · Bepul · Reklamasiz
            </p>
          </div>

          <div className="flex flex-wrap gap-10 pt-3">
            <Stat value="+120K" label="so'z" color="forest" />
            <Stat value="+6 227" label="maqol & hikmat" color="red" />
            <Stat value="4.9 ★" label="do'kon bahosi" color="gold" />
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
