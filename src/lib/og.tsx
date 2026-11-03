import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Shared 1200x630 social card so every page previews the same way. */
export function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(70% 60% at 10% 0%, rgba(245,179,1,0.22), #0a0a0b 70%)",
          backgroundColor: "#0a0a0b",
          color: "#ededef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#f5b301",
              color: "#0a0a0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa" }}>byrishav.online</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#f5b301", letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 16, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#a1a1aa", marginTop: 20, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
