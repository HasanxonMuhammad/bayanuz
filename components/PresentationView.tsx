"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DECK_SRC = "/taqdimot/index.html";

/**
 * Taqdimotni sahifa ichida ko'rsatadi va to'liq ekranga o'tkazadi.
 * To'liq ekranda iframe'ning o'ziga fokus beriladi — shunda strelka
 * tugmalari taqdimotni boshqaradi.
 */
export function PresentationView() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [isFull, setIsFull] = useState(false);

  const focusDeck = useCallback(() => {
    frameRef.current?.contentWindow?.focus();
  }, []);

  const openFullscreen = useCallback(async () => {
    const el = frameRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
      setTimeout(focusDeck, 120);
    } catch {
      window.open(DECK_SRC, "_blank", "noopener");
    }
  }, [focusDeck]);

  useEffect(() => {
    const onChange = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div
        className="relative w-full overflow-hidden rounded-3xl border border-border bg-forest shadow-[0_40px_80px_-50px_rgba(15,36,24,0.65)]"
        style={{ aspectRatio: "16 / 9" }}
      >
        <iframe
          ref={frameRef}
          src={DECK_SRC}
          title="BAYAN taqdimoti"
          allowFullScreen
          onLoad={focusDeck}
          className="absolute inset-0 h-full w-full border-0 bg-cream"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={openFullscreen}
          className="pill inline-flex items-center gap-2 bg-forest px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-forest-dark"
        >
          <FullscreenIcon />
          {isFull ? "To'liq ekrandan chiqish" : "To'liq ekranda ochish"}
        </button>

        <a
          href={DECK_SRC}
          target="_blank"
          rel="noopener"
          className="pill inline-flex items-center gap-2 border border-border-2 bg-white px-6 py-3 text-[14px] font-bold text-forest transition-colors hover:bg-cream-dark"
        >
          Yangi oynada ochish
        </a>

        <a
          href="/taqdimot/bayan-taqdimot.pdf"
          download
          className="pill inline-flex items-center gap-2 border border-border-2 bg-white px-6 py-3 text-[14px] font-bold text-forest transition-colors hover:bg-cream-dark"
        >
          <PdfIcon />
          PDF yuklab olish
        </a>
      </div>

      <p className="text-sm text-muted-2">
        Slaydlar orasida yurish:{" "}
        <kbd className="rounded bg-white px-2 py-1 text-[12px] font-semibold text-forest border border-border-2">→</kbd>{" "}
        yoki bo&apos;sh joy — oldinga,{" "}
        <kbd className="rounded bg-white px-2 py-1 text-[12px] font-semibold text-forest border border-border-2">←</kbd>{" "}
        — orqaga. Sichqoncha bilan: o&apos;ng tomonga bosish — oldinga, chap tomonga — orqaga.
      </p>
    </div>
  );
}

function FullscreenIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}
