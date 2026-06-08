import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Akkauntni o'chirish — BAYAN",
  description:
    "BAYAN — Arabcha-O'zbekcha lug'at ilovasidagi akkauntingizni va u bilan bog'liq ma'lumotlarni o'chirish bo'yicha ko'rsatma.",
  robots: { index: true, follow: true },
};

export default function AccountDeletionPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      <section className="px-6 lg:px-16 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <p className="text-sm font-semibold tracking-widest text-forest/60 uppercase mb-3">
              Maxfiylik va xavfsizlik
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-forest leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Akkauntni o&apos;chirish
            </h1>
            <p className="text-lg text-forest/80 leading-relaxed">
              Ushbu sahifa <strong>BAYAN — Arabcha-O&apos;zbekcha lug&apos;at</strong>{" "}
              mobil ilovasidan akkauntingizni va u bilan bog&apos;liq barcha
              ma&apos;lumotlarni butunlay o&apos;chirish qoidalarini bayon qiladi.
            </p>
          </header>

          <article className="prose prose-lg max-w-none">
            <Section title="1. Ilova ichidan o'chirish (asosiy yo'l)">
              <p>
                Bu — eng tez va ishonchli yo&apos;l. Akkauntingiz bilan kirgan
                holatda quyidagi qadamlarni bajaring:
              </p>
              <ol>
                <li>
                  BAYAN ilovasini oching va pastdagi panel orqali{" "}
                  <strong>&laquo;Profil&raquo;</strong> bo&apos;limiga o&apos;ting.
                </li>
                <li>
                  <strong>&laquo;Hisob ma&apos;lumotlari&raquo;</strong> bandiga
                  bosing.
                </li>
                <li>
                  Sahifaning pastidan{" "}
                  <strong className="text-red-600">
                    &laquo;Akkauntni o&apos;chirish&raquo;
                  </strong>{" "}
                  qizil tugmasini bosing.
                </li>
                <li>
                  Ochilgan tasdiqlash oynasida{" "}
                  <strong>&laquo;O&apos;chirish&raquo;</strong> tugmasini bosing.
                </li>
              </ol>
              <p className="text-sm text-forest/70">
                Tasdiqlangach, akkauntingiz va Firestore&apos;dagi shaxsiy
                hujjatlaringiz darhol o&apos;chiriladi. Firebase Authentication
                yozuvi 30 kun ichida butunlay tozalanadi.
              </p>
            </Section>

            <Section title="2. Email orqali o'chirishni so'rash (zaxira yo'l)">
              <p>
                Agar ilovaga kira olmasangiz (parolni unutgan, telefon yo&apos;qolgan
                yoki boshqa sabab), quyidagi manzilga akkauntdagi email
                manzilingizdan xat yuboring:
              </p>
              <div className="bg-forest/5 border border-forest/10 rounded-2xl p-6 my-6">
                <p className="text-sm font-semibold tracking-wider text-forest/60 uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:albayanuz@gmail.com?subject=Akkauntni%20o%27chirish"
                  className="text-2xl font-bold text-forest hover:underline"
                >
                  albayanuz@gmail.com
                </a>
              </div>
              <p>
                Xat mavzusiga <strong>&laquo;Akkauntni o&apos;chirish&raquo;</strong>{" "}
                deb yozing. Akkaunt mavjud bo&apos;lganligini tekshirib, 7 ish
                kuni ichida o&apos;chiramiz va sizga tasdiq xati yuboramiz.
              </p>
            </Section>

            <Section title="3. Qaysi ma'lumotlar o'chiriladi">
              <p>
                Akkauntingiz o&apos;chirilganda quyidagilar{" "}
                <strong>butunlay yo&apos;qotiladi</strong>:
              </p>
              <ul>
                <li>Ism, email va profil rasmi (Firebase Authentication)</li>
                <li>Foydalanuvchi hujjatingiz: <code>users/{`{uid}`}</code> (Cloud Firestore)</li>
                <li>Premium obuna holati va sozlamalari</li>
                <li>Saqlangan so&apos;zlar, kollektsiyalar, o&apos;qish progressi (qurilmangizda turgan ma&apos;lumotlar — ilovani o&apos;chirib qayta o&apos;rnatsangiz ham tozalanadi)</li>
                <li>Provider identifikatori (Google/Apple/Telegram <code>uid</code>)</li>
              </ul>
            </Section>

            <Section title="4. Qancha vaqt ichida o'chiriladi">
              <ul>
                <li>
                  <strong>Firestore hujjatlari:</strong> darhol (ilova ichidan
                  yoki email so&apos;rov tasdiqlangandan keyin bir necha soat
                  ichida)
                </li>
                <li>
                  <strong>Firebase Authentication yozuvi:</strong> 30 kun ichida
                </li>
                <li>
                  <strong>Crashlytics nosozlik xabarlari:</strong> 90 kunlik
                  qoldiq muddat (lekin ular shaxsni aniqlash imkonini bermaydi —
                  faqat qurilma modeli va stack trace)
                </li>
                <li>
                  <strong>Backup nusxalari:</strong> Firebase&apos;ning ichki
                  zaxiralarida 35 kun davomida saqlanadi va shu muddat tugashi
                  bilan tozalanadi
                </li>
              </ul>
            </Section>

            <Section title="5. Qaysi ma'lumotlar saqlanib qolishi mumkin">
              <p>
                Quyidagilar <strong>texnik yoki qonuniy sabablarga ko&apos;ra</strong>{" "}
                qisqa muddat saqlanishi mumkin:
              </p>
              <ul>
                <li>
                  <strong>To&apos;lov tarixi</strong> — Google Play Billing
                  tomonidan moliyaviy hisobot qonunlari talab qilgan muddatga
                  (odatda 5 yil). Bu ma&apos;lumot biz emas, Google tomonidan
                  saqlanadi.
                </li>
                <li>
                  <strong>Anonim agregat statistika</strong> — Firebase Analytics
                  ilova ochilishlari kabi ko&apos;rsatkichlarning umumiy hisobi
                  saqlanadi, lekin sizning aniq harakatlaringizni qayta tiklash
                  mumkin emas.
                </li>
                <li>
                  <strong>AI so&apos;rovlari</strong> — saqlanmaydi (Gemini API
                  ga jo&apos;natilgandan keyin biznikida iz qolmaydi).
                </li>
              </ul>
            </Section>

            <Section title="6. Bog'lanish">
              <p>
                Akkauntni o&apos;chirish bo&apos;yicha qo&apos;shimcha savollar
                yoki muammolar bo&apos;lsa:
              </p>
              <ul className="list-none pl-0">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:albayanuz@gmail.com"
                    className="text-forest underline font-semibold"
                  >
                    albayanuz@gmail.com
                  </a>
                </li>
                <li>
                  <strong>To&apos;liq maxfiylik siyosati:</strong>{" "}
                  <a
                    href="https://github.com/hasanxonmuhammadjon/albayanuz/blob/main/docs/legal/privacy_policy.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest underline font-semibold"
                  >
                    docs/legal/privacy_policy.md
                  </a>
                </li>
              </ul>
            </Section>
          </article>

          <p className="mt-16 text-sm text-forest/60 text-center">
            Ushbu sahifa{" "}
            <strong>BAYAN — Arabcha-O&apos;zbekcha lug&apos;at</strong>{" "}
            (com.arabdict.arab_lugat) ilovasi uchun amal qiladi. Oxirgi
            yangilangan: 2026-06-07.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2
        className="text-2xl lg:text-3xl font-bold text-forest mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="text-forest/80 leading-relaxed space-y-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_code]:bg-forest/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono">
        {children}
      </div>
    </section>
  );
}
