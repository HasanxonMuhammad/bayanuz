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
              Arab tilini o&apos;zbek tilida o&apos;rganish ilovasi: lug&apos;at,
              grammatika, imtihon va Bayan AI. Internetsiz ishlaydi, reklamasiz.
              iPhone va Android uchun.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <SocialButton
                href={TELEGRAM_URL}
                label="Telegram"
                handle="@mudarrisblog"
                icon={<TelegramLogo />}
              />
              <SocialButton
                href={INSTAGRAM_URL}
                label="Instagram"
                handle={`@${INSTAGRAM_URL.replace(/\/$/, "").split("/").pop()}`}
                icon={<InstagramLogo />}
              />
            </div>
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
              { label: "Video ko'rsatmalar", href: "/imkoniyatlar" },
              { label: "Taqdimot", href: "/taqdimot" },
              { label: "Savol-javob", href: "/#faq" },
            ]}
          />
          <FooterCol
            title="BOG'LANISH"
            links={[
              { label: "Telegram kanal", href: TELEGRAM_URL, external: true },
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

function SocialButton({
  href,
  label,
  handle,
  icon,
}: {
  href: string;
  label: string;
  handle: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${handle}`}
      className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] py-2 pl-2 pr-4 transition-all hover:-translate-y-0.5 hover:bg-white/[0.12]"
    >
      {icon}
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium text-[#9FD3B8]">{label}</span>
        <span className="text-[13px] font-bold text-white">{handle}</span>
      </span>
    </a>
  );
}

function TelegramLogo() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#229ED9]" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <path d="M9.78 15.27 9.6 18.9c.37 0 .53-.16.72-.35l1.73-1.66 3.59 2.63c.66.36 1.13.17 1.3-.61l2.36-11.06c.24-.96-.36-1.38-1-1.14L4.4 11.95c-.94.38-.93.91-.16 1.15l3.54 1.1 8.2-5.17c.39-.24.74-.11.45.15l-6.65 6.09Z" />
      </svg>
    </span>
  );
}

function InstagramLogo() {
  return (
    <span
      className="grid h-10 w-10 place-items-center rounded-xl"
      style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="#fff" stroke="none" />
      </svg>
    </span>
  );
}
