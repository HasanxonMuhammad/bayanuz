"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BayanLogo } from "./Logo";
import { DOWNLOAD_URL } from "@/lib/links";

const NAV_LINKS = [
  { label: "Yangi", href: "/#yangi" },
  { label: "Imkoniyatlar", href: "/#features" },
  { label: "Bayan AI", href: "/#ai" },
  { label: "Premium", href: "/#premium" },
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
  // Lock scrolling on <html>, not <body>: html has overflow-x: clip, so an
  // overflow on body would turn body into the scroll container and the
  // sticky header would jump back to the top of the page.
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="w-full bg-cream/80 backdrop-blur-xl supports-[backdrop-filter]:bg-cream/70 sticky top-0 z-40 border-b border-border/60">
        <nav className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-16 h-16 lg:h-20 flex items-center">
          <Link href="/" aria-label="BAYAN — bosh sahifa" className="shrink-0">
            <BayanLogo size={40} />
          </Link>
          <div className="flex-1" />

          <div className="hidden lg:flex items-center gap-7">
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
            className="hidden sm:inline-flex ml-7 pill items-center gap-2 px-5 py-2.5 bg-forest text-white text-[13px] font-bold hover:bg-forest-dark transition-colors"
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
            className="lg:hidden ml-3 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-border-2 text-forest"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer — kept outside <header>: the header's backdrop-filter
          would otherwise become the containing block of this fixed panel. */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-cream transition-opacity duration-200 ${
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
    </>
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
