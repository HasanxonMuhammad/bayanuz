import type { Metadata } from "next";
import { Playfair_Display, Inter, Scheherazade_New } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "BAYAN — Til va qalb orasidagi ko'prik",
  description:
    "Arabcha-O'zbekcha lug'at ilovasi. 120 000+ so'z, fe'l tuslanishi, maqol-hikmat va ilmiy maqolalar. Offline ishlaydi, bepul.",
  openGraph: {
    title: "BAYAN — Til va qalb orasidagi ko'prik",
    description:
      "Arabcha-O'zbekcha lug'at ilovasi. 120 000+ so'z, fe'l tuslanishi, maqol-hikmat va ilmiy maqolalar.",
    type: "website",
    locale: "uz_UZ",
  },
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
    >
      <body>{children}</body>
    </html>
  );
}
