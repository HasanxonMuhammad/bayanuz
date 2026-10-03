"use client";
import { useState } from "react";
import { PhoneFrame } from "./PhoneFrame";

/**
 * The analysis below is what Bayan AI returned in the app for this sentence
 * (screenshot assets/premium/ai.jpg); Uzbek tags use the app's lesson terms.
 */
const WORDS = [
  {
    w: "أَكَلْتُ",
    tag: "fe'l + foil",
    irab:
      "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ لِاتِّصَالِهِ بِتَاءِ الْفَاعِلِ، وَالتَّاءُ ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ رَفْعٍ فَاعِلٌ.",
  },
  {
    w: "السَّمَكَةَ",
    tag: "maf'ul bihi",
    irab: "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ عَلَى آخِرِهِ.",
  },
  { w: "حَتَّى", tag: "jarr harfi", irab: "حَرْفُ جَرٍّ وَغَايَةٍ." },
  {
    w: "رَأْسِ",
    tag: "majrur ism · muzof",
    irab: "اسْمٌ مَجْرُورٌ بِـ«حَتَّى» وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ عَلَى آخِرِهِ، وَهُوَ مُضَافٌ.",
  },
  {
    w: "هَا",
    tag: "muzof ilayh",
    irab: "ضَمِيرٌ مُتَّصِلٌ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ.",
  },
];

export function AiDemo() {
  const [mode, setMode] = useState<"irab" | "tarjima">("irab");
  const [sel, setSel] = useState(0);

  return (
    <section id="ai" className="relative w-full scroll-mt-24 overflow-hidden bg-ink px-5 py-20 text-white sm:px-6 lg:px-16 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(47,108,246,0.28), rgba(47,108,246,0))" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(220,38,38,0.18), rgba(220,38,38,0))" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16 min-w-0-children">
        <div className="flex flex-col gap-7">
          <div className="reveal flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[2px] text-[#B9CCFF]">
              <span aria-hidden="true">✦</span> BAYAN AI
            </span>
            <h2
              className="text-[34px] font-medium leading-[1.08] tracking-[-0.025em] sm:text-[46px] lg:text-[54px]"
              style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
            >
              Jumlani bering — ustozdek tahlil qilib beradi
            </h2>
            <p className="max-w-[560px] text-[16px] leading-[1.65] text-white/70 sm:text-[17px]">
              Arabcha jumlaning har bir so&apos;zi uchun i&apos;rob, butun jumla
              tarjimasi va arab ↔ o&apos;zbek tarjimon. Quyidagi so&apos;zlarni
              bosib ko&apos;ring.
            </p>
          </div>

          <div className="reveal flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur sm:p-6" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <div className="flex w-fit rounded-full bg-white/[0.07] p-1" role="tablist" aria-label="Bayan AI namunasi">
              {[
                ["irab", "Grammatik tahlil"],
                ["tarjima", "Tarjimon"],
              ].map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={mode === k}
                  onClick={() => setMode(k as "irab" | "tarjima")}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                    mode === k ? "bg-white text-ink" : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === "irab" ? (
              <div className="flex flex-col gap-4">
                <div dir="rtl" className="flex flex-wrap gap-2">
                  {WORDS.map((x, i) => (
                    <button
                      key={x.w}
                      type="button"
                      onClick={() => setSel(i)}
                      aria-pressed={sel === i}
                      className={`ar rounded-2xl px-3.5 py-1.5 text-[26px] leading-[1.5] transition-all sm:text-[30px] ${
                        sel === i
                          ? "bg-blue text-white shadow-[0_10px_30px_-10px_rgba(47,108,246,0.9)]"
                          : "bg-white/[0.06] text-white hover:bg-white/[0.12]"
                      }`}
                    >
                      {x.w}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2 rounded-2xl bg-white/[0.06] p-4" aria-live="polite">
                  <span className="w-fit rounded-full bg-[#F3D98B] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[1px] text-ink">
                    {WORDS[sel].tag}
                  </span>
                  <p dir="rtl" className="ar text-[21px] leading-[1.75] text-white/95">
                    <span className="text-[#9DB8FF]">{WORDS[sel].w}:</span> {WORDS[sel].irab}
                  </p>
                </div>
                <p className="text-[14px] text-white/60">
                  <b className="font-semibold text-white/85">Tarjimasi:</b> Men baliqni
                  (butunligicha), hatto boshini ham yedim.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-[#B6E27A] px-4 py-2.5 text-[15px] font-semibold text-ink">
                  Men har kuni kitob o&apos;qiyman.
                </div>
                <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
                  <p dir="rtl" className="ar text-[28px] leading-[1.6] text-white">
                    أَنَا أَقْرَأُ الْكِتَابَ كُلَّ يَوْمٍ.
                  </p>
                </div>
                <p className="text-[14px] text-white/60">
                  O&apos;zbekchadan arabchaga ham, arabchadan o&apos;zbekchaga ham —
                  harakatlari bilan.
                </p>
              </div>
            )}
          </div>

          <p className="reveal text-[13px] text-white/50">
            Bepul: 5 ta so&apos;rov · Premium bilan cheksiz. AI ba&apos;zan xato
            qilishi mumkin — muhim joylarda manbaga qayting.
          </p>
        </div>

        <div className="reveal relative mx-auto w-[64%] max-w-[300px] sm:w-[52%] lg:w-[78%]" style={{ "--delay": "150ms" } as React.CSSProperties}>
          <div className="bob" style={{ "--d": "8s" } as React.CSSProperties}>
            <PhoneFrame src="/screens/v2/ai.jpg" alt="Bayan AI: grammatik tahlil" sizes="(max-width: 1024px) 60vw, 300px" />
          </div>
        </div>
      </div>
    </section>
  );
}
