import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Foydalanish shartlari — BAYAN",
  description:
    "BAYAN — Arabcha-O'zbekcha lug'at ilovasidan foydalanish qoidalari va shartlari.",
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Nav />

      <section className="px-6 lg:px-16 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <p className="text-sm font-semibold tracking-widest text-forest/60 uppercase mb-3">
              Huquqiy hujjat
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold text-forest leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Foydalanish shartlari
            </h1>
            <p className="text-base text-forest/60">
              <strong>BAYAN — Arabcha-O&apos;zbekcha lug&apos;at</strong>
              <br />
              Oxirgi yangilangan sana: <strong>2026-06-07</strong>
            </p>
          </header>

          <article className="prose prose-lg max-w-none">
            <Intro>
              Ushbu shartlar &laquo;BAYAN — Arabcha-O&apos;zbekcha lug&apos;at&raquo;
              mobil ilovasidan (bundan keyin <strong>&laquo;Ilova&raquo;</strong>)
              foydalanish qoidalarini belgilaydi. Ilovadan foydalangan holda siz
              ushbu shartlarga rozilik bildirasiz.
            </Intro>

            <Section title="1. Xizmatning tavsifi">
              <p>Ilova arab tilini o&apos;rganuvchilar uchun quyidagi xizmatlarni taqdim etadi:</p>
              <ul>
                <li>Arabcha-O&apos;zbekcha lug&apos;at</li>
                <li>So&apos;zlar morfologiyasi, sinonim va antonimlar</li>
                <li>Arabcha hikmatlar, maqollar, maqolalar</li>
                <li>Grammatika mashqlari va testlar</li>
                <li>Sun&apos;iy intellekt yordamchisi (Bayan AI)</li>
              </ul>
            </Section>

            <Section title="2. Akkaunt">
              <p>
                Ilovaning ayrim funksiyalaridan foydalanish uchun akkaunt yaratishingiz kerak. Siz:
              </p>
              <ul>
                <li>To&apos;g&apos;ri va haqiqiy ma&apos;lumot kiritishga</li>
                <li>Akkauntingiz xavfsizligini ta&apos;minlashga</li>
                <li>Akkauntingizdan boshqalar foydalanmasligiga javobgar bo&apos;lasiz.</li>
              </ul>
            </Section>

            <Section title="3. Premium obuna">
              <Sub title="3.1 Xizmatlar">
                <p>Premium obuna quyidagi imkoniyatlarni ochadi:</p>
                <ul>
                  <li>Cheksiz Bayan AI so&apos;rovlari</li>
                  <li>Premium kontent (ilmiy maqolalar, kengaytirilgan grammatika materiallari)</li>
                  <li>Reklamalarsiz foydalanish</li>
                </ul>
              </Sub>
              <Sub title="3.2 To'lov">
                <p>
                  Obuna Google Play Billing orqali amalga oshiriladi. To&apos;lovlar
                  sizning Google akkauntingiz orqali qabul qilinadi.
                </p>
              </Sub>
              <Sub title="3.3 Avtomatik yangilanish">
                <p>
                  Obuna amal qilish muddati tugashidan 24 soat oldin avtomatik
                  yangilanadi. Siz Google Play sozlamalari orqali istalgan vaqtda
                  bekor qilishingiz mumkin.
                </p>
              </Sub>
              <Sub title="3.4 To'lovni qaytarish">
                <p>To&apos;lovni qaytarish Google Play siyosatiga muvofiq amalga oshiriladi.</p>
              </Sub>
            </Section>

            <Section title="4. Foydalanuvchining xatti-harakatlari">
              <p>
                Siz Ilovadan qonuniy maqsadlarda foydalanishingiz va quyidagilarni qilmasligingiz lozim:
              </p>
              <ul>
                <li>Ilova kodini reverse engineering qilish, dekompilyatsiya qilish</li>
                <li>Avtomatlashtirilgan vositalar bilan tizimga yuk berish</li>
                <li>Boshqa foydalanuvchilarga zarar yetkazish</li>
                <li>Qonunga xilof kontent yaratish yoki tarqatish</li>
              </ul>
            </Section>

            <Section title="5. Intellektual mulk va lug'at manbasi">
              <Sub title="5.1 Lug'at bazasi manbasi">
                <p>Ilovaning asosiy lug&apos;at bazasi quyidagi nashr asosida raqamlashtirilgan:</p>
                <p>
                  <strong>
                    &laquo;Ал-Қомус&raquo; — Арабча-ўзбекча қомусий луғат
                  </strong>{" "}
                  (4 жилдлик).
                </p>
                <p>
                  Ushbu lug&apos;at klassik va zamonaviy arab adabiy hamda
                  so&apos;zlashuv tilidagi yuz mingdan ortiq so&apos;z va
                  iboralarni, shuningdek, fan, texnika, san&apos;at va madaniyat
                  sohalariga oid atama va tushunchalarni o&apos;z ichiga oladi.
                  U sharqshunos-arabshunoslar, manbashunos-tarixchilar va arab
                  tili o&apos;rganuvchilari hamda keng kitobxonlar ommasiga
                  mo&apos;ljallangan.
                </p>
                <p>
                  <strong>Tuzuvchilar:</strong> Ne&apos;matulloh Ibrohimov,
                  Abdulhakim Oripov, Akmaljon Ikromjonov, Abdulhamid Zayriev.
                </p>
                <p>
                  Ilovada manba mualliflari hurmati saqlangan holda lug&apos;at
                  maqolalari raqamli formatga o&apos;tkazilgan, ba&apos;zi
                  joylarda tahrir, tashkeel va misol jumlalar bilan
                  kengaytirilgan.
                </p>
              </Sub>
              <Sub title="5.2 Ilova kontenti">
                <p>
                  Ilovaning kodi, dizayni, logotiplari, qo&apos;shimcha
                  materiallari (hikmatlar, maqollar, ilmiy maqolalar to&apos;plami,
                  AI bilan generatsiya qilingan misollar){" "}
                  <strong>&laquo;BAYAN&raquo;</strong> loyihasining intellektual
                  mulkidir va mualliflik huquqi qonunlari bilan himoyalangan.
                </p>
              </Sub>
              <Sub title="5.3 Cheklovlar">
                <p>
                  Ilovadagi materiallarni ruxsatsiz nusxa ko&apos;chirish,
                  qayta tarqatish yoki tijorat maqsadida ishlatish taqiqlanadi.
                  Akademik va shaxsiy o&apos;rganish maqsadida foydalanish
                  ushbu shartlar doirasida ruxsat etiladi.
                </p>
              </Sub>
            </Section>

            <Section title="6. Uchinchi shaxs xizmatlari">
              <p>
                Ilova Google Firebase va Google Gemini API kabi uchinchi shaxs
                xizmatlaridan foydalanadi. Ularning shartlari ham qo&apos;llaniladi.
              </p>
            </Section>

            <Section title="7. Kafolat yo'qligi">
              <p>
                Ilova <strong>&laquo;qanday bo&apos;lsa shunday&raquo;</strong>{" "}
                taqdim etiladi. Biz:
              </p>
              <ul>
                <li>Ilova uzluksiz ishlashini kafolatlamaymiz</li>
                <li>Barcha ma&apos;lumotlar 100% to&apos;g&apos;riligini kafolatlamaymiz</li>
                <li>Sun&apos;iy intellekt javoblarining aniqligiga javob bermaymiz</li>
              </ul>
            </Section>

            <Section title="8. Javobgarlikni cheklash">
              <p>
                Biz Ilovadan foydalanish oqibatida yuzaga keladigan bilvosita
                zararlar uchun javobgar emasmiz.
              </p>
            </Section>

            <Section title="9. Shartlarning o'zgarishi">
              <p>
                Biz ushbu shartlarni o&apos;zgartirish huquqini saqlab qolamiz.
                Jiddiy o&apos;zgarishlar bo&apos;lganda ilovada bildirishnoma
                ko&apos;rsatamiz.
              </p>
            </Section>

            <Section title="10. Qo'llaniladigan qonun">
              <p>
                Ushbu shartlar O&apos;zbekiston Respublikasi qonunlariga muvofiq
                tartibga solinadi.
              </p>
            </Section>

            <Section title="11. Bog'lanish">
              <p>Savollar uchun:</p>
              <div className="bg-forest/5 border border-forest/10 rounded-2xl p-6 my-4">
                <p className="text-sm font-semibold tracking-wider text-forest/60 uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:albayanuz@gmail.com"
                  className="text-2xl font-bold text-forest hover:underline"
                >
                  albayanuz@gmail.com
                </a>
              </div>
            </Section>
          </article>

          <p className="mt-16 text-sm text-forest/60 text-center">
            © 2026 BAYAN. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Intro({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-lg text-forest/80 leading-relaxed mb-10 pb-10 border-b border-forest/10">
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2
        className="text-2xl lg:text-3xl font-bold text-forest mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="text-forest/80 leading-relaxed space-y-3 [&_a]:text-forest [&_a]:underline [&_a]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-forest mb-2">{title}</h3>
      {children}
    </div>
  );
}
