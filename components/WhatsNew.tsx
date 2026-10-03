import Link from "next/link";
import { PhoneFrame } from "./PhoneFrame";
import { HarakatDemo } from "./HarakatDemo";

/** Exam room counts per level, from lib/data/qiroa.json. */
const LEVELS = [
  { code: "B1", texts: 21, questions: 228, color: "#2D7A55" },
  { code: "B2", texts: 22, questions: 330, color: "#2F6CF6" },
  { code: "C1", texts: 15, questions: 268, color: "#B8902A" },
  { code: "C2", texts: 13, questions: 254, color: "#DC2626" },
];

export function WhatsNew() {
  return (
    <section id="yangi" className="w-full scroll-mt-24 bg-cream px-5 py-20 sm:px-6 lg:px-16 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <SectionHead
          eyebrow="1.3 VERSIYADA YANGI"
          tone="emerald"
          title={<>O&apos;rganish endi lug&apos;at bilan tugamaydi</>}
          lead="Qoidani o'qing, jadvalda ko'ring, testda mustahkamlang va imtihon matnida o'zingizni sinang. Uchta yangi bo'lim — birinchi qadamdan C2 darajasigacha."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Grammatika — wide card */}
          <article className="reveal relative overflow-hidden rounded-[32px] border border-border bg-white lg:col-span-2">
            <div
              aria-hidden="true"
              className="ar pointer-events-none absolute -right-6 -top-10 text-[220px] leading-none text-emerald/[0.05]"
            >
              ص
            </div>
            <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:p-14">
              <div className="relative flex flex-col gap-5">
                <Eyebrow color="#0E5A46" ar="عِلْمُ الصَّرْفِ وَالنَّحْوِ">
                  GRAMMATIKA
                </Eyebrow>
                <h3 className="font-display text-[30px] font-medium leading-[1.1] tracking-[-0.02em] text-forest sm:text-[40px]" style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}>
                  Sarf va nahv — noldan, o&apos;zbek tilida
                </h3>
                <p className="max-w-[520px] text-[16px] leading-[1.65] text-muted">
                  41 ta sarf va 70 ta nahv darsi: qoidalar, tuslanish jadvallari,
                  misollar va har dars oxirida mashq testi. Arabcha matnni
                  harakatsiz o&apos;qing — qiynalsangiz, harakatni bir bosishda
                  yoqing.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Pill>111 dars</Pill>
                  <Pill>13 bo&apos;lim</Pill>
                  <Pill>2 866 test savoli</Pill>
                  <Pill>Jadvallar va misollar</Pill>
                </div>
                <HarakatDemo />
              </div>
              <div className="relative mx-auto flex w-full max-w-[460px] justify-center gap-4 sm:gap-6">
                <PhoneFrame
                  src="/screens/v2/grammatika.jpg"
                  alt="Grammatika bo'limi: Sarf, Nahv va Testlar"
                  className="w-[47%] translate-y-6"
                  sizes="(max-width: 1024px) 44vw, 220px"
                />
                <PhoneFrame
                  src="/screens/v2/lessons.jpg"
                  alt="Sarf darsi: Mezon"
                  className="w-[47%] -translate-y-2"
                  sizes="(max-width: 1024px) 44vw, 220px"
                />
              </div>
            </div>
          </article>

          {/* Imtihon xonasi */}
          <article className="reveal relative flex flex-col overflow-hidden rounded-[32px] bg-[#EAF1FF]" style={{ "--delay": "80ms" } as React.CSSProperties}>
            <div className="flex flex-col gap-5 p-6 sm:p-10">
              <Eyebrow color="#2F6CF6" ar="فَهْمُ الْمَقْرُوءِ">
                IMTIHON XONASI
              </Eyebrow>
              <h3 className="text-[28px] font-medium leading-[1.12] tracking-[-0.02em] text-forest sm:text-[34px]" style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}>
                B1 dan C2 gacha — haqiqiy imtihon kabi
              </h3>
              <p className="text-[15px] leading-[1.65] text-muted">
                71 ta arabcha matn va 1 080 savol. Vaqt bilan ishlaysiz, yakunda
                ball va har bir savol tahlilini ko&apos;rasiz. Matnni do&apos;stingizga
                havola bilan yuboring — u ham sinab ko&apos;rsin.
              </p>
              <div className="flex flex-col gap-2.5" role="list" aria-label="Darajalar bo'yicha matnlar soni">
                {LEVELS.map((l) => (
                  <div key={l.code} role="listitem" className="flex items-center gap-3">
                    <span className="w-8 rounded-md py-0.5 text-center text-[12px] font-extrabold text-white" style={{ background: l.color }}>
                      {l.code}
                    </span>
                    <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white">
                      <span className="block h-full rounded-full" style={{ width: `${(l.texts / 22) * 100}%`, background: l.color, opacity: 0.85 }} />
                    </span>
                    <span className="w-[118px] text-right text-[12px] font-semibold tabular-nums text-muted">
                      {l.texts} matn · {l.questions} savol
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/qiroa/1"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-blue px-5 py-3 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Bepul namunani ochish
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
            </div>
            <PeekPhone src="/screens/v2/reading.jpg" alt="O'qib tushunish testi: matn va savollar" />
          </article>

          {/* Iboralar */}
          <article className="reveal relative flex flex-col overflow-hidden rounded-[32px] bg-[#E3F3EA]" style={{ "--delay": "160ms" } as React.CSSProperties}>
            <div className="flex flex-col gap-5 p-6 sm:p-10">
              <Eyebrow color="#0E5A46" ar="التَّعَابِيرُ الشَّائِعَةُ">
                IBORALAR · BEPUL
              </Eyebrow>
              <h3 className="text-[28px] font-medium leading-[1.12] tracking-[-0.02em] text-forest sm:text-[34px]" style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}>
                Kitobdagi arabchani jonli suhbatga aylantiring
              </h3>
              <p className="text-[15px] leading-[1.65] text-muted">
                48 mavzu, 650 ta ibora va 1 482 ta misol: salomlashishdan tortib
                minnatdorchilik va uzrgacha. Har bir ibora misollarda rangli
                ajratib ko&apos;rsatiladi.
              </p>
              <figure className="flex flex-col gap-2 rounded-2xl bg-white/80 p-4 sm:p-5">
                <blockquote className="ar text-[28px] leading-[1.5] text-emerald">
                  …كَادَ قَلْبِي يَطِيرُ
                </blockquote>
                <figcaption className="text-[15px] font-medium text-forest">
                  …xursandchilikdan yuragim yorilay dedi.
                </figcaption>
              </figure>
              <p className="text-[12px] leading-[1.55] text-muted">
                Dr. Suvayfiy Fathiyning{" "}
                <span className="ar text-[14px]">«التعابير الشائعة في المحادثة العربية»</span>{" "}
                kitobi asosida, muallifning rasmiy ruxsati bilan. Tarjima — Bayan jamoasiniki.
              </p>
            </div>
            <PeekPhone src="/screens/v2/ibora_ex.jpg" alt="Iboralar: misollar rangli ajratilgan" />
          </article>
        </div>
      </div>
    </section>
  );
}

/** Phone rising from the bottom edge of a card. */
function PeekPhone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mt-auto h-[300px] overflow-hidden sm:h-[360px]">
      <div className="absolute left-1/2 top-2 w-[62%] max-w-[300px] -translate-x-1/2 transition-transform duration-500 hover:-translate-y-3">
        <PhoneFrame src={src} alt={alt} sizes="(max-width: 1024px) 60vw, 300px" />
      </div>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "emerald",
  center = false,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "emerald" | "red" | "blue" | "gold";
  center?: boolean;
  dark?: boolean;
}) {
  const tones = {
    emerald: "bg-emerald-soft text-emerald",
    red: "bg-red-soft text-red",
    blue: "bg-blue-soft text-blue",
    gold: "bg-gold-soft text-[#8A6A12]",
  } as const;
  return (
    <div className={`reveal flex flex-col gap-4 ${center ? "items-center text-center" : ""}`}>
      <span className={`inline-flex w-fit rounded-full px-4 py-2 text-[11px] font-bold tracking-[2px] ${dark ? "bg-white/10 text-[#9FD3B8]" : tones[tone]}`}>
        {eyebrow}
      </span>
      <h2
        className={`max-w-[820px] text-[34px] font-medium leading-[1.08] tracking-[-0.025em] sm:text-[46px] lg:text-[56px] ${dark ? "text-white" : "text-forest"}`}
        style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
      >
        {title}
      </h2>
      {lead && (
        <p className={`max-w-[640px] text-[16px] leading-[1.65] sm:text-[17px] ${dark ? "text-white/70" : "text-muted"}`}>
          {lead}
        </p>
      )}
    </div>
  );
}

function Eyebrow({
  children,
  color,
  ar,
}: {
  children: React.ReactNode;
  color: string;
  ar?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-[11px] font-extrabold tracking-[2px]" style={{ color }}>
        {children}
      </span>
      {ar && (
        <span className="ar text-[18px] leading-none" style={{ color }}>
          {ar}
        </span>
      )}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-cream px-3 py-1.5 text-[12px] font-semibold text-forest">
      {children}
    </span>
  );
}
