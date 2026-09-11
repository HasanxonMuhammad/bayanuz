import Link from "next/link";
import { BayanLogo } from "./Logo";
import {
  APP_STORE_URL,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  PLAY_STORE_URL,
  TELEGRAM_URL,
} from "@/lib/links";

export function Footer() {
  return (
    <footer className="w-full px-6 lg:px-16 py-16 bg-forest text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <BayanLogo size={48} variant="light" />
            <p
              className="italic text-lg text-forest-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Til va qalb orasidagi ko&apos;prik
            </p>
            <p className="text-[13px] text-[#7A9A80] leading-[1.6] max-w-sm">
              Arabcha-O&apos;zbekcha lug&apos;at ilovasi. Offline ishlaydi, bepul,
              reklamasiz. iPhone va Android uchun.
            </p>
          </div>

          <FooterCol
            title="ILOVA"
            links={[
              { label: "App Store (iPhone)", href: APP_STORE_URL, external: true },
              { label: "Google Play (Android)", href: PLAY_STORE_URL, external: true },
              { label: "Yangiliklar — Telegram", href: TELEGRAM_URL, external: true },
            ]}
          />
          <FooterCol
            title="KONTENT"
            links={[
              { label: "Maqolalar", href: "/maqolalar" },
              { label: "Hikoyalar", href: "/hikoyalar" },
              { label: "Imkoniyatlar", href: "/#features" },
              { label: "Savol-javob", href: "/#faq" },
            ]}
          />
          <FooterCol
            title="BOG'LANISH"
            links={[
              { label: "Telegram", href: TELEGRAM_URL, external: true },
              { label: "Instagram", href: INSTAGRAM_URL, external: true },
              { label: "Email", href: `mailto:${CONTACT_EMAIL}` },
            ]}
          />
        </div>

        <div className="w-full h-px bg-forest-soft" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-[12px] font-medium text-[#7A9A80]">
          <span>© {new Date().getFullYear()} BAYAN · Barcha huquqlar himoyalangan</span>
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Foydalanish shartlari
            </Link>
            <span className="text-forest-soft">·</span>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Maxfiylik siyosati
            </Link>
            <span className="text-forest-soft">·</span>
            <Link
              href="/account-deletion"
              className="hover:text-white transition-colors"
            >
              Akkauntni o&apos;chirish
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[11px] font-bold text-white tracking-[2.5px]">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-forest-light hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="text-[13px] font-medium text-forest-light hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
