/**
 * BAYAN brand lockup — uses the baked artwork with mark + red diamond dots,
 * followed by the BAYAN wordmark.
 *
 * variant:
 *  - "dark"  (default): black artwork for light bg
 *  - "light": white artwork for dark bg (footer, dark sections)
 */
export function BayanLogo({
  size = 40,
  variant = "dark",
}: {
  size?: number;
  variant?: "dark" | "light";
}) {
  const src = variant === "light" ? "/logo/bayan-white.png" : "/logo/bayan.png";
  const wordColor = variant === "light" ? "#FFFFFF" : "#1B3A28";
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="BAYAN logo"
        style={{ height: size, width: "auto" }}
        className="select-none"
      />
      <span
        className="font-bold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: Math.round(size * 0.52),
          color: wordColor,
          letterSpacing: 2.8,
        }}
      >
        BAYAN
      </span>
    </div>
  );
}
