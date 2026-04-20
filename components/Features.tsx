import { PhoneMockup } from "./PhoneMockup";

interface FeatureProps {
  number: string;
  eyebrow: string;
  eyebrowBg: string;
  eyebrowColor: string;
  title: React.ReactNode;
  body: string;
  children?: React.ReactNode;
  screen: string;
  blob: string;
  reverse?: boolean;
  bg: string;
}

function Feature({
  number,
  eyebrow,
  eyebrowBg,
  eyebrowColor,
  title,
  body,
  children,
  screen,
  blob,
  reverse,
  bg,
}: FeatureProps) {
  return (
    <section className="w-full py-16 lg:py-20" style={{ background: bg }}>
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <PhoneMockup src={screen} alt="App screen" blobColor={blob} />
        <div className="flex flex-col gap-6">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full w-fit"
            style={{ background: eyebrowBg }}
          >
            <span
              className="text-[11px] font-bold tracking-[2px]"
              style={{ color: eyebrowColor }}
            >
              {number} · {eyebrow}
            </span>
          </div>
          <h2
            className="text-[44px] lg:text-[48px] leading-[1.1] font-medium text-forest tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <p className="text-base lg:text-lg text-muted leading-[1.65] max-w-[560px]">
            {body}
          </p>
          {children && <div className="pt-2">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <>
      <section className="w-full px-6 lg:px-16 pt-24 pb-12 bg-cream">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 text-center">
          <div className="inline-flex px-4 py-2 bg-red-soft rounded-full">
            <span className="text-[11px] font-bold tracking-[2.2px] text-red">
              IMKONIYATLAR
            </span>
          </div>
          <h2
            className="text-[44px] lg:text-[56px] leading-[1.1] font-medium text-forest tracking-[-0.025em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bitta ilovada — butun arab tili
          </h2>
          <p className="text-lg text-muted leading-[1.6] max-w-[620px]">
            Bir so&apos;zni qidirishdan butun ilmni anglashgacha — kerakli
            hamma vosita yagona dargohda jamlangan.
          </p>
        </div>
      </section>

      <div id="features">
        <Feature
          number="01"
          eyebrow="QIDIRUV"
          eyebrowBg="#FFE4E4"
          eyebrowColor="#DC2626"
          title={
            <>
              Qidirgan so&apos;zingiz —
              <br />
              bir nafasda
            </>
          }
          body="Lotincha yozing yoki kirillcha — BAYAN sizni tushunadi. Yuz mingdan ortiq so'z, ma'no tuslari va to'g'ri talaffuz. Internet — ixtiyoriy."
          screen="/screens/2.png"
          blob="#D6E4FF"
          bg="#F5F3EE"
        >
          <ul className="flex flex-col gap-3">
            <CheckItem>Lotin va kirill — ikkalasini ham biladi</CheckItem>
            <CheckItem>Izlagan so&apos;zlaringiz eslab qoladi</CheckItem>
            <CheckItem>Sinonim va qarama-qarshi so&apos;zlar o&apos;z-o&apos;zidan</CheckItem>
          </ul>
        </Feature>

        <Feature
          number="02"
          eyebrow="FE'L TUSLANISHI"
          eyebrowBg="#D6E4FF"
          eyebrowColor="#2F6CF6"
          title="Har bir fe'l — butun bir dunyo"
          body="O'tgan, hozirgi va buyruq zamonlari, barcha shaxslar, mu'tal va sahih fe'llar — bir marta bosing, tuslash jadvali ko'z oldingizda."
          screen="/screens/3.png"
          blob="#FFE4E4"
          reverse
          bg="#F5F3EE"
        >
          <div className="flex flex-wrap gap-2.5">
            <span className="px-4 py-2 bg-white border border-border rounded-full text-base font-bold text-forest ar">
              الماضي
            </span>
            <span className="px-4 py-2 bg-white border border-border rounded-full text-base font-bold text-forest ar">
              المضارع
            </span>
            <span className="px-4 py-2 bg-white border border-border rounded-full text-base font-bold text-forest ar">
              الأمر
            </span>
          </div>
        </Feature>

        <Feature
          number="03"
          eyebrow="DONOLIK"
          eyebrowBg="#FFF4D6"
          eyebrowColor="#D4AF37"
          title="Asrlar osha yetgan donolik"
          body="Har tong yangi hikmat yoki maqol — arabcha asl, o'zbekcha va inglizcha tarjimada. Yigirmadan ortiq go'zal ko'rinish bilan do'stlaringiz qalbiga yetkazing."
          screen="/screens/4.png"
          blob="#FFF4D6"
          bg="#F5F3EE"
        >
          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-soft rounded-xl text-[13px] font-bold text-red">
              <QuoteIcon /> 303 maqol
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold-soft rounded-xl text-[13px] font-bold text-gold">
              <FeatherIcon /> 5 924 hikmat
            </span>
          </div>
        </Feature>

        <Feature
          number="04"
          eyebrow="ILMIY MAQOLALAR"
          eyebrowBg="#D6E4FF"
          eyebrowColor="#2F6CF6"
          title="Bilim chashmasidan — Baheth maqolalari"
          body='«باحثو اللغة العربية» — arab tili ilmining ishonchli manbai. Nahv, sarf, balag‘a va imlo — o‘zbek o‘quvchisi uchun ochilgan ilm eshigi. Rasmiy hamkorlik bilan.'
          screen="/screens/5.png"
          blob="#E8F3E0"
          reverse
          bg="#F5F3EE"
        >
          <a
            href="/maqolalar"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-forest text-white rounded-full hover:bg-forest-dark transition-colors"
          >
            <span className="text-sm font-bold">Maqolalarga o&apos;tish</span>
            <ArrowIcon />
          </a>
        </Feature>
      </div>
    </>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="#2D5E3A"
        className="shrink-0"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      <span className="text-sm font-semibold text-forest">{children}</span>
    </li>
  );
}

function QuoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 21V13c0-6 2-9 7-10v3c-3 1-4 3-4 6h4v9H3zm12 0V13c0-6 2-9 7-10v3c-3 1-4 3-4 6h4v9h-7z" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
