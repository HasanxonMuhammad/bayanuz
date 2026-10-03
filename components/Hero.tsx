import { PhoneFrame } from "./PhoneFrame";
import { StoreButtons } from "./StoreButtons";
import { FloatingLetters } from "./FloatingLetters";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-cream">
      <FloatingLetters />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 right-[-18%] h-[820px] w-[820px] rounded-full"
        style={{ background: "radial-gradient(closest-side, #DDF1E8, rgba(221,241,232,0))" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-[-20%] h-[640px] w-[640px] rounded-full"
        style={{ background: "radial-gradient(closest-side, #FFF4D6, rgba(255,244,214,0))" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-16 lg:pb-24 lg:pt-12 min-w-0-children">
        <div className="relative z-10 flex flex-col gap-6">
          <a
            href="#yangi"
            className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-emerald/15 bg-white/80 py-1.5 pl-1.5 pr-4 shadow-[0_8px_24px_-14px_rgba(14,90,70,0.5)] backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            <span className="rounded-full bg-emerald px-2.5 py-1 text-[10px] font-extrabold tracking-[1.6px] text-white">
              YANGI
            </span>
            <span className="text-[13px] font-semibold text-forest">
              Grammatika, Imtihon xonasi va Iboralar
            </span>
            <span className="text-emerald transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              →
            </span>
          </a>

          <h1
            className="text-[42px] font-medium leading-[1.04] tracking-[-0.03em] text-forest sm:text-[56px] lg:text-[72px]"
            style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
          >
            Lug&apos;atdan imtihongacha&nbsp;—{" "}
            <em className="font-medium not-italic text-emerald">arab tili</em>{" "}
            bitta ilovada
          </h1>

          <p className="max-w-[560px] text-[17px] leading-[1.6] text-muted sm:text-lg">
            81 000+ so&apos;zli lug&apos;at, sarf va nahv bo&apos;yicha 111 dars,
            B1–C2 darajadagi imtihon matnlari, 650 ta so&apos;zlashuv iborasi va
            sun&apos;iy intellekt yordamchisi — hammasi o&apos;zbek tilida.
          </p>

          <div id="download" className="flex scroll-mt-28 flex-col gap-4 pt-1">
            <StoreButtons size="lg" className="max-sm:[&_a]:px-5 max-sm:[&_a]:py-3" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Stars />
                <b className="font-bold text-forest">4.9</b> Google Play
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-2" />
              <span>iOS 15+ · Android 7+</span>
              <span className="h-1 w-1 rounded-full bg-muted-2" />
              <span>Reklamasiz</span>
            </div>
          </div>
        </div>

        <HeroPhones />
      </div>
    </section>
  );
}

function HeroPhones() {
  return (
    <div className="relative z-10 mx-auto aspect-[1/1.02] w-full max-w-[560px] sm:aspect-[1/0.95]">
      <div
        className="bob absolute left-[1%] top-[13%] w-[40%]"
        style={{ "--tilt": "-8deg", "--d": "8s", "--delay": "-2s" } as React.CSSProperties}
      >
        <PhoneFrame
          src="/screens/v2/grammatika.jpg"
          alt="Grammatika: sarf, nahv va testlar"
          sizes="(max-width: 1024px) 38vw, 230px"
        />
      </div>
      <div
        className="bob absolute right-[1%] top-[9%] w-[40%]"
        style={{ "--tilt": "8deg", "--d": "9s", "--delay": "-5s" } as React.CSSProperties}
      >
        <PhoneFrame
          src="/screens/v2/reading.jpg"
          alt="Imtihon xonasi: o'qib tushunish testi"
          sizes="(max-width: 1024px) 38vw, 230px"
        />
      </div>
      <div
        className="bob absolute left-1/2 top-0 z-10 w-[47%] -translate-x-1/2"
        style={{ "--d": "7s" } as React.CSSProperties}
      >
        <PhoneFrame
          src="/screens/v2/home.jpg"
          alt="BAYAN ilovasining bosh sahifasi"
          priority
          sizes="(max-width: 1024px) 46vw, 270px"
        />
      </div>

      <Chip className="left-[-6%] top-[56%] max-sm:hidden" delay="-1s">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-blue to-[#8B5CF6] text-[15px] text-white">✦</span>
        <span className="flex flex-col leading-tight">
          <b className="text-[13px] text-forest">Bayan AI</b>
          <span className="text-[11px] text-muted">i&apos;rob tahlili va tarjimon</span>
        </span>
      </Chip>
      <Chip className="right-[-2%] top-[64%] sm:right-[-4%]" delay="-4s">
        <span className="flex gap-1">
          {["B1", "B2", "C1", "C2"].map((l, i) => (
            <span
              key={l}
              className="rounded-md px-1.5 py-0.5 text-[11px] font-extrabold text-white"
              style={{ background: ["#2D7A55", "#2F6CF6", "#B8902A", "#DC2626"][i] }}
            >
              {l}
            </span>
          ))}
        </span>
        <span className="text-[11px] font-semibold text-muted">71 matn</span>
      </Chip>
      <Chip className="bottom-[2%] left-1/2 -translate-x-1/2" delay="-2.5s">
        <span className="ar text-[19px] leading-none text-emerald">كَادَ قَلْبِي يَطِيرُ</span>
        <span className="text-[11px] font-semibold text-muted">650 ibora</span>
      </Chip>
    </div>
  );
}

function Chip({
  children,
  className = "",
  delay = "0s",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute z-20 ${className}`}
    >
      <div
        className="bob flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/70 bg-white/85 px-3 py-2 shadow-[0_18px_40px_-18px_rgba(16,38,27,0.45)] backdrop-blur-md"
        style={{ "--d": "6s", "--delay": delay } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

function Stars() {
  return (
    <span className="inline-flex text-gold" aria-hidden="true">
      {"★★★★★"}
    </span>
  );
}
