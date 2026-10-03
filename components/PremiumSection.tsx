import { PhoneFrame } from "./PhoneFrame";
import { SectionHead } from "./WhatsNew";
import { DOWNLOAD_URL } from "@/lib/links";

/** Mirrors kPremiumLimits in the app (lib/features/premium/data/premium_features.dart). */
const ROWS: [string, string, string][] = [
  ["Bayan AI", "5 so'rov", "Cheksiz"],
  ["Grammatika darslari", "7 dars", "111 dars"],
  ["Imtihon xonasi", "1 matn", "71 matn"],
  ["Mavzulashtirilgan lug'at", "6 mavzu", "51 mavzu"],
  ["Asl manbalar: Al-Vasit, Fiqh ensiklopediyasi, matallar, Vikipediya", "—", "4 manba"],
  ["Kamil Kiloniy kutubxonasi", "—", "Hammasi"],
];

export function PremiumSection() {
  return (
    <section
      id="premium"
      className="relative w-full scroll-mt-24 overflow-hidden px-5 py-20 text-white sm:px-6 lg:px-16 lg:py-28"
      style={{ background: "linear-gradient(160deg, #0E5A46 0%, #082F25 55%, #061F18 100%)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[-12%] h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(243,217,139,0.22), rgba(243,217,139,0))" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.3fr_1fr] min-w-0-children">
        <div className="flex flex-col gap-8">
          <SectionHead
            dark
            eyebrow="BAYAN PREMIUM"
            title={<>Barcha bo&apos;limlar — <span className="text-[#F3D98B]">bitta obunada</span></>}
            lead="Lug'at, iboralar va maqollar doim bepul. Chuqurroq o'rganmoqchi bo'lsangiz, Premium hamma eshikni ochadi."
          />

          <div className="reveal overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
            <table className="w-full text-left text-[14px]">
              <caption className="sr-only">Bepul va Premium imkoniyatlari</caption>
              <thead>
                <tr className="text-[11px] font-bold uppercase tracking-[1.4px] text-white/50">
                  <th scope="col" className="px-4 py-3 font-bold sm:px-5">Bo&apos;lim</th>
                  <th scope="col" className="w-[88px] px-2 py-3 text-center font-bold sm:w-[110px]">Bepul</th>
                  <th scope="col" className="w-[96px] px-2 py-3 text-center font-bold text-[#F3D98B] sm:w-[120px]">Premium</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([name, free, pro]) => (
                  <tr key={name} className="border-t border-white/[0.07]">
                    <th scope="row" className="px-4 py-3 font-medium text-white/90 sm:px-5">{name}</th>
                    <td className="px-2 py-3 text-center tabular-nums text-white/55">{free}</td>
                    <td className="px-2 py-3 text-center font-bold tabular-nums text-[#F3D98B]">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="reveal grid gap-3 sm:grid-cols-2">
            <div className="relative flex flex-col gap-1 rounded-[22px] border border-[#F3D98B]/60 bg-[#F3D98B]/10 p-5">
              <span className="absolute right-4 top-4 rounded-full bg-[#F3D98B] px-2 py-0.5 text-[11px] font-extrabold text-ink">−31%</span>
              <span className="text-[13px] font-semibold text-white/70">Yillik</span>
              <span className="text-[28px] font-semibold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                290 000 <span className="text-[15px] font-normal text-white/60">so&apos;m / yil</span>
              </span>
              <span className="text-[13px] text-[#9FD3B8]">oyiga 24 167 so&apos;m</span>
            </div>
            <div className="flex flex-col gap-1 rounded-[22px] border border-white/12 bg-white/[0.04] p-5">
              <span className="text-[13px] font-semibold text-white/70">Oylik</span>
              <span className="text-[28px] font-semibold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                35 000 <span className="text-[15px] font-normal text-white/60">so&apos;m / oy</span>
              </span>
              <span className="text-[13px] text-white/50">Click yoki do&apos;kon orqali</span>
            </div>
          </div>

          <a
            href={DOWNLOAD_URL}
            className="reveal inline-flex w-fit items-center gap-2.5 rounded-full bg-[#F3D98B] px-6 py-3.5 text-[15px] font-bold text-ink shadow-[0_14px_40px_-14px_rgba(243,217,139,0.8)] transition-transform hover:-translate-y-0.5"
          >
            <span aria-hidden="true">♛</span> Ilovada obuna bo&apos;lish
          </a>
        </div>

        <div className="reveal relative mx-auto w-[64%] max-w-[310px] sm:w-[50%] lg:w-[80%]">
          <div className="bob" style={{ "--d": "9s" } as React.CSSProperties}>
            <PhoneFrame src="/screens/v2/premium.jpg" alt="Bayan Premium sahifasi" sizes="(max-width: 1024px) 60vw, 310px" />
          </div>
        </div>
      </div>
    </section>
  );
}
