import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "To'lov muvaffaqiyatli — BAYAN",
  description: "Click orqali to'lov qabul qilindi.",
  robots: { index: false, follow: false },
};

const APP_DEEP_LINK = "bayanlugat://payment/success";

export default function ClickSuccessPage() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10 text-forest"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1
          className="text-3xl lg:text-4xl font-bold text-forest mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          To&apos;lov qabul qilindi
        </h1>
        <p className="text-base text-forest/70 leading-relaxed mb-8">
          Bayan ilovasi sizning to&apos;lovingizni qabul qildi. Allohu Taolo qabul
          qilsin. Ilovaga qaytib, premium imkoniyatlardan foydalanishingiz mumkin.
        </p>
        <a
          href={APP_DEEP_LINK}
          className="inline-flex items-center justify-center w-full px-6 py-4 rounded-full bg-forest text-white font-bold text-base hover:bg-forest/90 transition-colors mb-3"
        >
          Bayan ilovasiga qaytish
        </a>
        <Link
          href="/"
          className="inline-block text-sm text-forest/60 hover:text-forest transition-colors"
        >
          Yoki bosh sahifaga o&apos;tish
        </Link>
        <p className="mt-10 text-xs text-forest/40">
          Agar ilovada premium darhol ko&apos;rinmasa, ilovani qayta oching —
          serverdan yangilanish 5-10 soniya ichida keladi.
        </p>
      </div>
    </main>
  );
}
