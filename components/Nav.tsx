import Link from "next/link";
import { BayanLogo } from "./Logo";

export function Nav() {
  return (
    <nav className="w-full px-6 lg:px-16 h-24 flex items-center bg-cream">
      <Link href="/" aria-label="BAYAN">
        <BayanLogo size={56} />
      </Link>
      <div className="flex-1" />
      <div className="hidden md:flex items-center gap-9">
        <Link href="/" className="text-sm font-semibold text-forest">
          Bosh sahifa
        </Link>
        <a href="#features" className="text-sm font-medium text-muted">
          Imkoniyatlar
        </a>
        <Link href="/maqolalar" className="text-sm font-medium text-muted">
          Maqolalar
        </Link>
        <a href="#faq" className="text-sm font-medium text-muted">
          FAQ
        </a>
      </div>
      <a
        href="#download"
        className="ml-9 pill inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-[13px] font-bold hover:bg-forest-dark transition-colors"
      >
        <DownloadIcon />
        Yuklab olish
      </a>
    </nav>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
