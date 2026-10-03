import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Scheherazade_New } from "next/font/google";
import "./globals.css";
import { APP_STORE_ID, PLAY_PACKAGE, SITE_URL } from "@/lib/links";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-scheherazade",
  display: "swap",
});

const TITLE = "BAYAN — arab tili: lug'at, grammatika va imtihon | iPhone va Android";
const DESCRIPTION =
  "BAYAN — arab tilini o'zbek tilida o'rganish ilovasi: 81 000+ so'zli lug'at, sarf va nahv bo'yicha 111 dars, B1–C2 darajadagi imtihon matnlari, 650 ta so'zlashuv iborasi va Bayan AI. App Store va Google Play'da.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · BAYAN",
  },
  description: DESCRIPTION,
  applicationName: "BAYAN",
  keywords: [
    "arabcha o'zbekcha lug'at",
    "arab tili lug'at",
    "arabcha lug'at ilova",
    "fe'l tuslanishi",
    "arab tili o'rganish",
    "BAYAN lug'at",
    "arab uzbek dictionary",
    "arab tili grammatika",
    "sarf va nahv",
    "arab tili imtihon",
    "arabcha iboralar",
  ],
  authors: [{ name: "BAYAN", url: SITE_URL }],
  creator: "BAYAN",
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "uz_UZ",
    url: SITE_URL,
    siteName: "BAYAN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  appleWebApp: {
    capable: true,
    title: "BAYAN",
    statusBarStyle: "default",
  },
  itunes: {
    appId: APP_STORE_ID,
  },
  appLinks: {
    ios: {
      app_store_id: APP_STORE_ID,
      app_name: "BAYAN",
      url: `https://apps.apple.com/app/id${APP_STORE_ID}`,
    },
    android: {
      package: PLAY_PACKAGE,
      app_name: "BAYAN",
      url: `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`,
    },
    web: { url: SITE_URL, should_fallback: true },
  },
  robots: { index: true, follow: true },
  other: {
    "google-play-app": `app-id=${PLAY_PACKAGE}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#1B3A28",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uz"
      className={`${playfair.variable} ${inter.variable} ${scheherazade.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll-reveal starts hidden only when JS runs (see globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
