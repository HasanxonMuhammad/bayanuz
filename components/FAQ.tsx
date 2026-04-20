"use client";
import { useState } from "react";

interface QA {
  q: string;
  a: string;
}

const qas: QA[] = [
  {
    q: "BAYAN offline ishlaydimi?",
    a: "Ha, ilovaning asosiy qismi (lug'at, maqol-hikmat, fe'l tuslanishi) internet talab qilmaydi. Faqat yuklab olishda internet kerak.",
  },
  {
    q: "iPhone uchun versiyasi qachon chiqadi?",
    a: "Hozir Android versiyasi chop etilgan. iOS versiyasi 2026 yilning ikkinchi yarmida chiqarilishi rejalashtirilgan.",
  },
  {
    q: "Ilovadan foydalanish pullikmi?",
    a: "Yo'q, BAYAN butunlay bepul. Reklamalar yo'q, maxfiy to'lov tizimi yo'q.",
  },
  {
    q: "Maqolalar qaysi manbalardan olinadi?",
    a: "Hozirda \"باحثو اللغة العربية\" (bahethoarabia.com) saytidan rasmiy ruxsat bilan. Har bir maqolaga asl manbaga havola qo'shilgan.",
  },
  {
    q: "Lotin va kirill ikkalasi ishlaydimi?",
    a: "Ha, qidiruv har ikkala yozuvni tushunadi. Sozlamalardan yozuvni tanlash mumkin.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="w-full px-6 lg:px-16 py-24 bg-cream">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[440px_1fr] gap-20">
        <div className="flex flex-col gap-5">
          <span className="inline-flex px-4 py-2 bg-blue-soft rounded-full w-fit">
            <span className="text-[11px] font-bold tracking-[2.2px] text-blue">
              TEZ-TEZ SO&apos;RALADIGAN
            </span>
          </span>
          <h2
            className="text-[48px] lg:text-[52px] leading-[1.1] font-medium text-forest tracking-[-0.025em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Savollar va
            <br />
            javoblar
          </h2>
          <p className="text-base text-muted leading-[1.6] max-w-[380px]">
            Ilova haqida tez-tez so&apos;raladigan savollar va ularning qisqa,
            ochiq javoblari. Ro&apos;yxatda topmagan narsangizni — bevosita
            yozing.
          </p>
          <a
            href="https://t.me/mudarrisblog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-white rounded-full border border-border-2 hover:-translate-y-0.5 transition-transform w-fit"
          >
            <TelegramIcon />
            <span className="text-sm font-bold text-forest">
              Telegram&apos;da yozish
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-3">
          {qas.map((qa, i) => (
            <button
              key={i}
              type="button"
              className="text-left p-6 bg-white rounded-2xl border border-[#EEEEEE] hover:border-border-2 transition-colors"
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3
                  className="text-lg lg:text-xl font-medium text-forest"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {qa.q}
                </h3>
                <span
                  className={`shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  {open === i ? <MinusIcon /> : <PlusIcon />}
                </span>
              </div>
              {open === i && (
                <p className="mt-4 text-sm text-muted leading-[1.6]">{qa.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1B3A28">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A6B52" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
