"use client";
import { useState } from "react";

/** Same rule as the app: tapping «العربية» toggles harakat on the word and the text. */
const TEXT =
  "الْمِيزَانُ الصَّرْفِيُّ: هُوَ مِقْيَاسٌ وُضِعَ لِمَعْرِفَةِ أَحْوَالِ بِنْيَةِ الْكَلِمَةِ.";
const strip = (s: string) => s.replace(/[ً-ْٰ]/g, "");

export function HarakatDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border bg-white p-4 shadow-[0_20px_40px_-28px_rgba(16,38,27,0.4)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[1.6px] text-muted-2">
          Bosib ko&apos;ring
        </span>
        <div className="flex items-center rounded-full border border-border bg-cream p-1">
          <span className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-muted">
            O&apos;zbekcha
          </span>
          <button
            type="button"
            onClick={() => setOn((v) => !v)}
            aria-pressed={on}
            aria-label={on ? "Harakatni o'chirish" : "Harakatni yoqish"}
            className="ar rounded-full bg-forest px-4 py-1 text-[17px] leading-[1.6] text-white transition-colors hover:bg-forest-dark"
          >
            {on ? "الْعَرَبِيَّةُ" : "العربية"}
          </button>
        </div>
      </div>
      <p className="ar text-[22px] leading-[1.9] text-forest sm:text-[24px]">
        {on ? TEXT : strip(TEXT)}
      </p>
      <span className="text-[12px] text-muted">
        {on
          ? "Harakatli — boshlovchilar uchun qulay"
          : "Harakatsiz — asl matn kabi, o'qishni mashq qiling"}
      </span>
    </div>
  );
}
