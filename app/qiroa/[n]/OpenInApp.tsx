"use client";

import { useEffect, useState } from "react";

/**
 * Sahifa ochilishi bilan foydalanuvchini ilovaga yoki marketga yo'naltiradi.
 *
 * - Ilova o'rnatilgan telefonda havola odatda bu sahifaga umuman kelmaydi:
 *   Android App Links / iOS Universal Links uni to'g'ridan-to'g'ri ilovada
 *   ochadi. Bu sahifa — ilovasi YO'Q yoki havolani ilova ichidagi brauzerda
 *   ochganlar uchun.
 * - Android: `intent://` — ilova bo'lsa ochiladi, bo'lmasa Play Store.
 * - iOS: qisqa kutib, App Store'ga o'tadi.
 * - Kompyuter: hech qayerga yo'naltirilmaydi, sahifaning o'zi ko'rinadi.
 */
export function OpenInApp({
  intentUrl,
  appUrl,
  appStoreUrl,
  playUrl,
}: {
  intentUrl: string;
  appUrl: string;
  appStoreUrl: string;
  playUrl: string;
}) {
  const [os, setOs] = useState<"android" | "ios" | "other">("other");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(ua);
    const isIos =
      /iphone|ipad|ipod/.test(ua) ||
      (/macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    setOs(isAndroid ? "android" : isIos ? "ios" : "other");
    if (isAndroid) {
      window.location.replace(intentUrl);
    } else if (isIos) {
      const t = window.setTimeout(() => {
        if (!document.hidden) window.location.href = appStoreUrl;
      }, 1600);
      return () => window.clearTimeout(t);
    }
  }, [intentUrl, appStoreUrl]);

  // Kompyuterda ilova yo'q — tugma yuklab olish sahifasiga olib boradi.
  const primary =
    os === "android" ? intentUrl : os === "ios" ? appUrl : "/download";
  const store = os === "ios" ? appStoreUrl : playUrl;

  return (
    <div className="flex flex-col gap-3">
      <a
        href={primary}
        className="w-full text-center rounded-2xl bg-forest text-white font-bold py-4 text-[16px] shadow-[0_12px_30px_-14px_rgba(27,58,40,0.6)] hover:bg-forest-dark transition-colors"
      >
        {os === "other" ? "Ilovani yuklab olish" : "Ilovada yechish"}
      </a>
      {os !== "other" && (
        <a
          href={store}
          className="w-full text-center rounded-2xl border border-border-2 bg-white text-forest font-semibold py-3.5 text-[15px] hover:bg-cream transition-colors"
        >
          {os === "ios" ? "App Store'dan yuklab olish" : "Google Play'dan yuklab olish"}
        </a>
      )}
    </div>
  );
}
