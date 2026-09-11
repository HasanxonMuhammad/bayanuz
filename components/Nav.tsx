"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BayanLogo } from "./Logo";
import { DOWNLOAD_URL } from "@/lib/links";

const NAV_LINKS = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Imkoniyatlar", href: "/#features" },
  { label: "Maqolalar", href: "/maqolalar" },
  { label: "Hikoyalar", href: "/hikoyalar" },
  { label: "FAQ", href: "/#faq" },
];

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/") ||
    (href === "/maqolalar" && pathname.startsWith("/maqola/")) ||
    (href === "/hikoyalar" && pathname.startsWith("/hikoya/"));
}

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Close the drawer on route change and lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="w-full bg-cream sticky top-0 z-40 border-b border-transparent [&.scrolled]:border-border">
      <nav className="w-full px-6 lg:px-16 h-20 lg:h-24 flex items-center">
        <Link href="/" aria-label="BAYAN — bosh sahifa" className="shrink-0">
          <BayanLogo size={48} />
        </Link>
        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-forest ${
                isActive(pathname, l.href)
                  ? "font-semibold text-forest"
                  : "font-medium text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href={pathname === "/" ? "#download" : DOWNLOAD_URL}
          className="hidden sm:inline-flex ml-9 pill items-center gap-2 px-5 py-2.5 bg-forest text-white text-[13px] font-bold hover:bg-forest-dark transition-colors"
        >
          <DownloadIcon />
          Yuklab olish
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden ml-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-border-2 text-forest"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-20 bottom-0 z-30 bg-cream transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="px-6 py-8 flex flex-col gap-2">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-4 rounded-2xl text-lg transition-colors ${
                isActive(pathname, l.href)
                  ? "bg-white font-semibold text-forest"
                  : "font-medium text-muted hover:bg-white"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={DOWNLOAD_URL}
            onClick={() => setOpen(false)}
            className="mt-4 pill inline-flex items-center justify-center gap-2 px-5 py-4 bg-forest text-white text-[15px] font-bold hover:bg-forest-dark transition-colors"
          >
            <DownloadIcon />
            Ilovani yuklab olish
          </a>
          <p className="text-center text-[12px] font-medium text-muted-2 pt-1">
            App Store · Google Play
          </p>
        </div>
      </div>
    </header>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
