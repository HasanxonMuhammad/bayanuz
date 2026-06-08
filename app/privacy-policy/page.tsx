import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati — BAYAN",
  description:
    "BAYAN — Arabcha-O'zbekcha lug'at ilovasining maxfiylik siyosati. Qanday ma'lumotlar yig'iladi, qanday ishlatiladi va himoya qilinadi.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
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
              Maxfiylik siyosati
            </h1>
            <p className="text-base text-forest/60">
              <strong>BAYAN — Arabcha-O&apos;zbekcha lug&apos;at</strong>
              <br />
              Oxirgi yangilangan sana: <strong>2026-06-07</strong>
            </p>
          </header>

          <article className="prose prose-lg max-w-none">
            <Intro>
              Ushbu maxfiylik siyosati &laquo;BAYAN — Arabcha-O&apos;zbekcha
              lug&apos;at&raquo; mobil ilovasi (bundan keyin <strong>&laquo;Ilova&raquo;</strong>)
              tomonidan qanday ma&apos;lumotlar yig&apos;ilishi, ishlatilishi,
              ulashilishi va himoya qilinishini bayon qiladi. Siyosat Google
              Play User Data siyosatiga muvofiq tuzilgan.
            </Intro>

            <Section title="1. Yig'iladigan ma'lumotlar">
              <Sub title="1.1 Akkaunt ma'lumotlari (siz o'zingiz taqdim etasiz)">
                <p>
                  Google yoki Apple orqali ro&apos;yxatdan o&apos;tganingizda biz
                  quyidagilarni olamiz:
                </p>
                <ul>
                  <li>Ism-familiya (agar provider tomonidan taqdim etilsa)</li>
                  <li>Email manzil</li>
                  <li>Profil rasmi URL (ixtiyoriy)</li>
                  <li>
                    Provider identifikatori (Google/Apple <code>uid</code>)
                  </li>
                </ul>
                <p>
                  Bu ma&apos;lumotlar <strong>Firebase Authentication</strong>{" "}
                  orqali xavfsiz saqlanadi.
                </p>
              </Sub>

              <Sub title="1.2 Obuna holati">
                <p>
                  Sizning Premium obuna holatingiz, amal qilish muddati va
                  avtomatik yangilanish sozlamalari <strong>Cloud Firestore</strong>
                  &apos;da saqlanadi.
                </p>
              </Sub>

              <Sub title="1.3 Sun'iy intellekt so'rovlari (Bayan AI)">
                <p>
                  &laquo;Bayan AI&raquo; xizmatidan foydalanganingizda, siz
                  kiritgan matn (arabcha jumla, so&apos;rov, va h.k.) Google
                  Gemini API&apos;ga uzatiladi va javob qaytarib beriladi. Biz
                  bu <strong>so&apos;rov tarixini o&apos;z serverimizda saqlamaymiz</strong>.
                  Google Gemini siyosati:{" "}
                  <a
                    href="https://ai.google.dev/gemini-api/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ai.google.dev/gemini-api/terms
                  </a>.
                </p>
                <p>
                  <strong>Eslatma:</strong> AI tomonidan qaytarilgan natijalar{" "}
                  <strong>noaniq yoki xato</strong> bo&apos;lishi mumkin
                  (hallucinations). Muhim qarorlar yoki ilmiy yozuvlar uchun
                  ularni mustaqil tekshiring.
                </p>
              </Sub>

              <Sub title="1.4 Avtomatik yig'iladigan texnik ma'lumotlar">
                <ul>
                  <li>
                    <strong>Crashlytics</strong> — ilova to&apos;satdan
                    to&apos;xtaganda: qurilma modeli, Android/iOS versiyasi,
                    stack trace, ilova versiyasi. Shaxsiy ma&apos;lumot (email,
                    ism, kontent) jo&apos;natilmaydi.
                  </li>
                  <li>
                    <strong>Firebase Analytics</strong> — ilova ochilish, ekran
                    ko&apos;rilishi, sessiya davomiyligi, til sozlamasi.
                    Shaxslantirilmagan agregat statistika.
                  </li>
                  <li>
                    <strong>Firebase Remote Config va Storage</strong> — ilova
                    konfiguratsiyasi va lug&apos;at bazasini yetkazib berish.
                    Bu yerda foydalanuvchi ma&apos;lumoti yo&apos;q.
                  </li>
                </ul>
              </Sub>

              <Sub title="1.5 Qurilmada saqlanadigan ma'lumotlar (off-device emas)">
                <p>
                  Quyidagilar <strong>faqat sizning qurilmangizda</strong> turadi
                  va serverimizga jo&apos;natilmaydi:
                </p>
                <ul>
                  <li>Saqlangan so&apos;zlar, so&apos;nggi qidiruvlar, kollektsiyalaringiz</li>
                  <li>O&apos;qish progressi</li>
                  <li>Foydalanuvchi sozlamalari (qora rejim, shrift hajmi)</li>
                </ul>
              </Sub>
            </Section>

            <Section title="2. Ma'lumotlar qanday ishlatiladi">
              <ul>
                <li>Akkauntingizni yaratish, autentifikatsiya qilish va boshqarish</li>
                <li>Premium obunangizning to&apos;g&apos;ri ishlashini ta&apos;minlash</li>
                <li>AI so&apos;rovlariga javob olish</li>
                <li>Ilova nosozliklarini aniqlash va tuzatish (Crashlytics)</li>
                <li>Ilovani funksional jihatdan takomillashtirish (anonim statistika)</li>
              </ul>
              <p>
                Biz sizning ma&apos;lumotlaringizni <strong>sotmaymiz</strong>,
                uchinchi shaxslarga <strong>reklama maqsadida bermaymiz</strong> va
                siz roziligingizsiz boshqa firmalar bilan{" "}
                <strong>ulashmaymiz</strong>.
              </p>
            </Section>

            <Section title="3. Ma'lumotlarni uchinchi shaxslar bilan ulashish">
              <p>
                Biz ma&apos;lumotlaringizni faqat quyidagi xizmat
                ko&apos;rsatuvchilarga (data processors), faqat zarur darajada
                uzatamiz:
              </p>
              <Table
                rows={[
                  ["Google Firebase (Authentication, Firestore, Crashlytics, Remote Config, Storage)", "Akkaunt va texnik infratuzilma", "Email, uid, obuna holati, qurilma modeli"],
                  ["Google Gemini API", "AI yordamchisi javoblari", "Faqat sizning so'rov matningiz (saqlanmasdan o'tib ketadi)"],
                  ["Google Play Billing", "Obuna to'lovini qabul qilish", "Google sizning hisobingizdan tuzilgan obuna tokeni"],
                ]}
              />
              <p>Reklama tarmoqlari ishlatilmaydi. Affiliate trekerlar yo&apos;q.</p>
            </Section>

            <Section title="4. Ma'lumotlarni saqlash muddati">
              <ul>
                <li>
                  <strong>Akkaunt ma&apos;lumotlari</strong> — akkauntingiz
                  mavjud bo&apos;lgan vaqt davomida saqlanadi
                </li>
                <li>
                  <strong>Akkaunt o&apos;chirilgandan keyin</strong> — 30 kun
                  ichida butunlay o&apos;chiriladi (Firestore + Authentication)
                </li>
                <li>
                  <strong>Crashlytics nosozlik xabarlari</strong> — 90 kundan
                  keyin avtomatik o&apos;chiriladi
                </li>
                <li>
                  <strong>AI so&apos;rov matnlari</strong> — saqlanmaydi (faqat
                  real vaqtda Gemini&apos;ga yuboriladi)
                </li>
              </ul>
            </Section>

            <Section title="5. Sizning huquqlaringiz">
              <Sub title="5.1 Akkauntingizni o'chirish">
                <p>
                  Akkauntingizni va u bilan bog&apos;liq barcha ma&apos;lumotlarni
                  o&apos;chirishning ikki yo&apos;li bor:
                </p>
                <ol>
                  <li>
                    <strong>Ilova ichida:</strong> Profile → Hisob ma&apos;lumotlari →{" "}
                    <strong className="text-red-600">
                      &laquo;Akkauntni o&apos;chirish&raquo;
                    </strong>{" "}
                    tugmasi. Tasdiqlangandan keyin 30 kun ichida o&apos;chiriladi.
                  </li>
                  <li>
                    <strong>Email orqali:</strong>{" "}
                    <a href="mailto:albayanuz@gmail.com?subject=Akkauntni%20o%27chirish">
                      albayanuz@gmail.com
                    </a>{" "}
                    ga akkauntdagi email manzilingizdan xat yuboring.
                  </li>
                  <li>
                    <strong>Veb-sayt orqali:</strong> alohida{" "}
                    <a href="/account-deletion">
                      /account-deletion
                    </a>{" "}
                    sahifasidagi qadamlarga amal qiling.
                  </li>
                </ol>
              </Sub>
              <Sub title="5.2 Boshqa huquqlar">
                <ul>
                  <li>
                    <strong>Ma&apos;lumotlar nusxasini olish</strong> —{" "}
                    <a href="mailto:albayanuz@gmail.com">albayanuz@gmail.com</a>{" "}
                    ga xat yuboring, 30 kun ichida javob beriladi
                  </li>
                  <li>
                    <strong>Ma&apos;lumotlarni to&apos;g&apos;rilash</strong> — ilova
                    ichidan profil tahriri orqali
                  </li>
                  <li>
                    <strong>Obunani bekor qilish</strong> — Google Play → Obunalar
                    bo&apos;limidan istalgan vaqtda
                  </li>
                </ul>
              </Sub>
            </Section>

            <Section title="6. Ma'lumotlar xavfsizligi">
              <ul>
                <li>
                  <strong>Lug&apos;at bazasi (kontent)</strong> — Firebase
                  Storage&apos;da <strong>AES-256-GCM</strong> bilan shifrlangan
                  holda saqlanadi va HTTPS orqali yetkaziladi
                </li>
                <li>
                  <strong>Akkaunt ma&apos;lumotlari</strong> — Firebase
                  Authentication tomonidan sanoat standartlari bo&apos;yicha
                  himoyalangan
                </li>
                <li>
                  <strong>Qurilma bilan aloqa</strong> — barcha tarmoq trafigi
                  HTTPS/TLS orqali
                </li>
              </ul>
            </Section>

            <Section title="7. Bolalar maxfiyligi">
              <p>
                Ilova <strong>13 yoshdan kichik bolalar</strong> uchun
                mo&apos;ljallanmagan. Biz ulardan bilib turib ma&apos;lumot
                yig&apos;maymiz. Agar siz ota-ona/vasiy bo&apos;lsangiz va
                bolangizning ma&apos;lumoti bizga noqonuniy yo&apos;l bilan
                kelganini bilsangiz,{" "}
                <a href="mailto:albayanuz@gmail.com">albayanuz@gmail.com</a> ga
                xabar bering — biz darhol o&apos;chiramiz.
              </p>
            </Section>

            <Section title="8. Hududiy huquqlar (GDPR, CCPA va h.k.)">
              <p>
                Yashagan mamlakatingiz qonuniga ko&apos;ra qo&apos;shimcha
                huquqlaringiz bo&apos;lishi mumkin (masalan, Yevropa Ittifoqida —
                GDPR Article 15–22, Kaliforniyada — CCPA). Bu huquqlardan
                foydalanish uchun yuqoridagi email orqali murojaat qiling.
              </p>
            </Section>

            <Section title="9. Google Play Data Safety bilan moslik">
              <p>
                Bizning Google Play do&apos;koni qaydidagi &laquo;Data Safety&raquo;
                bo&apos;limi ushbu siyosatdagi e&apos;lonlarga to&apos;liq mos
                keladi.
              </p>
            </Section>

            <Section title="10. Siyosatning o'zgarishi">
              <p>
                Ushbu siyosat vaqti-vaqti bilan yangilanishi mumkin.{" "}
                <strong>Jiddiy o&apos;zgarishlar</strong> bo&apos;lganda
                (masalan, yangi ma&apos;lumot turi yig&apos;ilishi yoki yangi
                3-shaxs xizmati qo&apos;shilishi) ilovada ko&apos;rinarli
                bildirishnoma chiqamiz.
              </p>
            </Section>

            <Section title="11. Bog'lanish">
              <p>Maxfiylik bilan bog&apos;liq savollar yoki so&apos;rovlar uchun:</p>
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
      <div className="text-forest/80 leading-relaxed space-y-3 [&_a]:text-forest [&_a]:underline [&_a]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_code]:bg-forest/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono">
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

function Table({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-2xl border border-forest/10">
      <table className="w-full text-sm">
        <thead className="bg-forest/5">
          <tr className="text-left">
            <th className="px-4 py-3 font-semibold text-forest">Xizmat</th>
            <th className="px-4 py-3 font-semibold text-forest">Maqsad</th>
            <th className="px-4 py-3 font-semibold text-forest">Ma&apos;lumot</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-forest/10 align-top">
              <td className="px-4 py-3 font-semibold text-forest">{row[0]}</td>
              <td className="px-4 py-3 text-forest/80">{row[1]}</td>
              <td className="px-4 py-3 text-forest/80">{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
