import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "BAYAN — Arabcha-O'zbekcha lug'at. App Store va Google Play'da.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const pub = join(process.cwd(), "public");
  const [inter, logo] = await Promise.all([
    readFile(join(pub, "fonts/Inter-Bold.ttf")),
    readFile(join(pub, "logo/bayan-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #1B3A28 0%, #0F2418 100%)",
          color: "#FFFFFF",
          fontFamily: "Inter",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(182,226,122,0.10)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="" width={40} height={100} />
            <span style={{ fontSize: 44, letterSpacing: 6, fontWeight: 700 }}>BAYAN</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontSize: 24, letterSpacing: 4, color: "#FFA8A8", fontWeight: 700 }}>
              ARABCHA-O&apos;ZBEKCHA LUG&apos;AT
            </span>
            <span style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700, letterSpacing: -2, maxWidth: 820 }}>
              Til va qalb orasidagi ko&apos;prik
            </span>
            <span style={{ fontSize: 28, color: "#B6E27A", marginTop: 8 }}>
              120 000+ so&apos;z · fe&apos;l tuslanishi · 6 000+ hikmat · offline
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 14 }}>
              <span style={{ fontSize: 22, padding: "14px 26px", borderRadius: 9999, background: "#FFFFFF", color: "#1B3A28", fontWeight: 700 }}>
                 App Store
              </span>
              <span style={{ fontSize: 22, padding: "14px 26px", borderRadius: 9999, background: "#FFFFFF", color: "#1B3A28", fontWeight: 700 }}>
                ▶ Google Play
              </span>
            </div>
            <span style={{ fontSize: 26, padding: "14px 26px", borderRadius: 9999, background: "rgba(255,255,255,0.12)", color: "#FFD666", fontWeight: 700 }}>
              4.9 ★ · Bepul
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: inter, weight: 700, style: "normal" }],
    }
  );
}
