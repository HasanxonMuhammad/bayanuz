"use client";

import { useEffect, useRef } from "react";

type Feature = {
  file: string;
  kicker: string;
  title: string;
  accent: string;
  text: string;
  tags: string[];
};

const FEATURES: Feature[] = [
  { file: "14_bosh_sahifa", kicker: "Bosh sahifa", title: "Kun maqoli, kun hikmati va ", accent: "tezkor test",
    text: "Ilovani ochishingiz bilan: qidiruv maydoni, Bayan AI yordamchisi, kun maqoli va hikmati hamda bir bosishda boshlanadigan tezkor test.",
    tags: ["Kun maqoli", "Kun hikmati", "Tezkor test"] },
  { file: "01_qidiruv", kicker: "Lug'at", title: "O'zbekcha yozing — ", accent: "arabchasini toping",
    text: "Lotin harflarida yozasiz, ilova mos so'zlarni darhol chiqaradi. Arabcha ham, o'zbekcha ham qidirsa bo'ladi — internetsiz ham ishlaydi.",
    tags: ["Oflayn", "Ikki tomonlama", "AI qidiruv"] },
  { file: "02_soz_sahifasi", kicker: "So'z sahifasi", title: "Bitta so'z — ", accent: "to'liq ma'lumot",
    text: "Al-Qomus lug'atidan raqamlangan ma'nolar, o'zak va ko'plik shakli, sinonim va antonimlar — hammasi bir sahifada.",
    tags: ["Ma'nolar", "O'zak va ko'plik", "Sinonim / antonim"] },
  { file: "03_manbalar", kicker: "Manbalar", title: "Arab olamining ", accent: "mashhur manbalari",
    text: "So'z sahifasidan bir bosishda: Mu'jam al-Vasit, Kuvayt fiqh ensiklopediyasi, klassik matallar to'plami va arabcha Vikipediya — jild va bet raqami bilan.",
    tags: ["Al-Vasit", "Mavsua", "Matallar", "Vikipediya"] },
  { file: "04_ai_misollar", kicker: "Misollar", title: "Yangi misollarni ", accent: "AI yaratadi",
    text: "“Boshlash”ni bosing — Bayan AI shu so'z ishtirokida 5 ta yangi misol jumla tuzib, har birini o'zbekchaga tarjima qilib beradi.",
    tags: ["5 ta misol", "Tarjimasi bilan", "Yangilash"] },
  { file: "05_sarf", kicker: "Sarf", title: "Fe'lning ", accent: "to'liq tuslanishi",
    text: "Bir tugma — va fe'l barcha zamirlar bo'yicha jadvalda. Ma'lum, majhul va amr shakllari alohida bo'limlarda.",
    tags: ["Ma'lum", "Majhul", "Amr"] },
  { file: "07_ai_tahlil", kicker: "Bayan AI", title: "Jumlani ", accent: "i'rob bilan tahlil qiling",
    text: "Arabcha jumlani yozing — sun'iy intellekt har bir so'zning grammatik o'rnini tushuntirib, jumlani o'zbekchaga tarjima qiladi.",
    tags: ["I'rob", "Tarkib", "O'zbekcha tarjima"] },
  { file: "08_tarjimon", kicker: "Tarjimon", title: "Arab ↔ o'zbek ", accent: "tabiiy tarjima",
    text: "O'zbekcha yoki arabcha gap yozing — soniyalar ichida harakatlari qo'yilgan, tabiiy tarjimani oling.",
    tags: ["Ikki tomonlama", "Harakatlar bilan", "Nusxalash"] },
  { file: "09_kitoblar", kicker: "Kutubxona", title: "Kamil Kiloniyning ", accent: "111 ta kitobi",
    text: "Bolalar uchun mumtoz arab hikoyalari — har biri o'qish vaqti bilan. Ichida qulay o'quvchi: shrift o'lchami, sahifalar, davom ettirish.",
    tags: ["111 ta kitob", "Qulay o'quvchi", "Davom ettirish"] },
  { file: "13_kitobda_tarjima", kicker: "O'qish", title: "Bilmagan so'zni ", accent: "bosing",
    text: "O'qiyotganda notanish so'z ustiga bosing — ma'nolari darhol chiqadi. Butun paragrafni esa Bayan AI o'zbekchaga tarjima qilib beradi.",
    tags: ["So'z ma'nosi", "Butun blok tarjimasi", "Nusxa olish"] },
  { file: "06_toplam", kicker: "To'plamlar", title: "So'zlarni ", accent: "o'z bo'limingizga yig'ing",
    text: "Har bir kitob yoki mavzu uchun alohida daftar kabi: yorliqni bosing, to'plamni tanlang yoki yangisini oching va so'zlarni yodlab boring.",
    tags: ["O'z to'plamingiz", "Bir necha to'plam", "Sevimlilar"] },
  { file: "10_mavzular", kicker: "Mavzular", title: "51 mavzu bo'yicha ", accent: "lug'atlar",
    text: "Hasharotlar, mevalar, kasblar, ob-havo... Har bir mavzuda o'nlab so'z — arabcha, o'zbekcha va inglizcha.",
    tags: ["51 mavzu", "3 tilda", "Yuzlab so'z"] },
  { file: "11_ulashish", kicker: "Ulashish", title: "Hikmatlarni ", accent: "chiroyli ulashing",
    text: "Maqol va hikmatni tanlang, shablon va rangni o'zgartiring — Instagram yoki Telegram uchun tayyor rasm bir bosishda.",
    tags: ["O'nlab shablon", "Ranglar", "3 tilda"] },
  { file: "12_testlar", kicker: "Testlar", title: "Nahv ilmi: ", accent: "1017 ta savol",
    text: "16 bob, har bobda darslar va testlar. Javobni tanlaysiz — to'g'risi darhol ko'rinadi va keyingi savolga o'tasiz.",
    tags: ["16 bob", "1017 savol", "Darhol natija"] },
  { file: "15_premium_holat", kicker: "Premium", title: "Bayan ", accent: "Premium",
    text: "Cheksiz Bayan AI, Kamil Kiloniy kutubxonasi, barcha darslar va cheksiz testlar — obuna holati va amal qilish muddati bilan.",
    tags: ["Cheksiz AI", "Kutubxona", "Barcha darslar"] },
];

export function FeatureVideos() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Faqat ekranda ko'rinib turgan videolar o'ynaydi — trafik va batareya tejaladi.
  useEffect(() => {
    const videos = rootRef.current?.querySelectorAll("video") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            v.preload = "auto";
            void v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.35 },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col">
      {FEATURES.map((f, i) => (
        <section
          key={f.file}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center border-t border-border py-12 lg:py-16"
        >
          <div className={i % 2 === 1 ? "md:order-2" : ""}>
            <div className="text-[12px] font-bold tracking-[3px] text-muted-2 mb-3">
              {String(i + 1).padStart(2, "0")} · <span className="text-forest-soft">{f.kicker}</span>
            </div>
            <h2
              className="text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] font-medium text-forest tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {f.title}
              <span className="text-forest-soft">{f.accent}</span>
            </h2>
            <p className="mt-4 text-[17px] leading-[1.55] text-muted max-w-xl">{f.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {f.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-white px-4 py-2 text-[13px] font-semibold text-forest"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[260px] sm:w-[290px] rounded-[42px] bg-forest-dark p-[10px] shadow-[0_40px_70px_-34px_rgba(15,36,24,0.7)]">
              <video
                className="block w-full rounded-[33px] bg-cream"
                src={`/imkoniyatlar/${f.file}.mp4`}
                poster={`/imkoniyatlar/poster/${f.file}.jpg`}
                muted
                loop
                playsInline
                preload="none"
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
