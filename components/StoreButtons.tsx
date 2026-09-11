import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";

type Tone = "dark" | "light";
type Size = "md" | "lg";

interface StoreButtonProps {
  store: "apple" | "google";
  /** dark = forest button on light bg; light = white button on dark bg */
  tone?: Tone;
  size?: Size;
  className?: string;
}

const LABELS = {
  apple: { eyebrow: "Yuklab olish", name: "App Store", href: APP_STORE_URL },
  google: { eyebrow: "Yuklab olish", name: "Google Play", href: PLAY_STORE_URL },
} as const;

/**
 * One store badge. Both stores get the same shape so they read as a pair.
 */
export function StoreButton({
  store,
  tone = "dark",
  size = "md",
  className = "",
}: StoreButtonProps) {
  const { eyebrow, name, href } = LABELS[store];
  const pad = size === "lg" ? "px-7 py-4" : "px-6 py-3.5";
  const nameSize = size === "lg" ? "text-[15px]" : "text-sm";
  const toneCls =
    tone === "dark"
      ? "bg-forest text-white hover:bg-forest-dark [&_.eyebrow]:text-forest-light"
      : "bg-white text-forest hover:bg-cream [&_.eyebrow]:text-muted";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} orqali yuklab olish`}
      className={`inline-flex items-center gap-3 ${pad} rounded-full transition-all hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(27,58,40,0.35)] ${toneCls} ${className}`}
    >
      {store === "apple" ? <AppleIcon /> : <PlayStoreIcon />}
      <span className="flex flex-col leading-tight text-left">
        <span className="eyebrow text-[10px] font-medium">{eyebrow}</span>
        <span className={`${nameSize} font-bold`}>{name}</span>
      </span>
    </a>
  );
}

/** Both stores side by side — used in Hero and FinalCta. */
export function StoreButtons({
  tone = "dark",
  size = "md",
  className = "",
}: {
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <StoreButton store="google" tone={tone} size={size} />
      <StoreButton store="apple" tone={tone} size={size} />
    </div>
  );
}

export function PlayStoreIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zM14.5 13.707l2.564 2.564-11.6 6.688 9.036-9.252zM17.866 9.8l3.63 2.093a1 1 0 0 1 0 1.734L17.866 15.72 14.79 13l3.076-3.2zM5.464 1.041l11.6 6.688L14.5 10.293 5.464 1.04z" />
    </svg>
  );
}

export function AppleIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
