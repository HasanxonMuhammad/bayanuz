import Link from "next/link";
import { BayanLogo } from "./Logo";

export function Footer() {
  return (
    <footer className="w-full px-6 lg:px-16 py-16 bg-forest text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div className="flex flex-col gap-4">
            <BayanLogo size={48} variant="light" />
            <p
              className="italic text-lg text-forest-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Til va qalb orasidagi ko&apos;prik
            </p>
            <p className="text-[13px] text-[#7A9A80] leading-[1.6] max-w-sm">
              Arabcha-O&apos;zbekcha lug&apos;at ilovasi. Offline ishlaydi, bepul,
              reklamasiz.
            </p>
          </div>

          <FooterCol
            title="ILOVA"
            links={[
              { label: "Google Play", href: "#", active: true },
              { label: "App Store (tez orada)", href: "#", muted: true },
              { label: "Yangilanishlar", href: "#", active: true },
            ]}
          />
          <FooterCol
            title="KONTENT"
            links={[
              { label: "Maqolalar", href: "/maqolalar", active: true },
              { label: "Maqollar", href: "#", active: true },
              { label: "Hikmatlar", href: "#", active: true },
            ]}
          />
          <FooterCol
            title="BOG'LANISH"
            links={[
              { label: "Telegram", href: "https://t.me/mudarrisblog", active: true },
              { label: "Instagram", href: "https://www.instagram.com/hasanxon_muhammad", active: true },
              { label: "Email", href: "mailto:hasanmuhammadiy@gmail.com", active: true },
            ]}
          />
        </div>

        <div className="w-full h-px bg-forest-soft" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 text-[12px] font-medium text-[#7A9A80]">
          <span>© 2026 BAYAN · Barcha huquqlar himoyalangan</span>
          <span>Lotin · Кирилл · Maxfiylik siyosati</span>
        </div>
      </div>
    </footer>
  );
}

interface FooterColProps {
  title: string;
  links: { label: string; href: string; active?: boolean; muted?: boolean }[];
}

function FooterCol({ title, links }: FooterColProps) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[11px] font-bold text-white tracking-[2.5px]">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((l, i) => (
          <li key={i}>
            <Link
              href={l.href}
              className={`text-[13px] font-medium hover:text-white transition-colors ${
                l.muted ? "text-[#7A9A80]" : "text-forest-light"
              }`}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
