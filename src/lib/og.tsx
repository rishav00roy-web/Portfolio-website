import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const THEMES = {
  /** The portfolio: warm black, amber. */
  portfolio: { bg: "radial-gradient(70% 60% at 10% 0%, rgba(245,179,1,0.22), #0a0a0b 70%)", base: "#0a0a0b", ink: "#ededef", muted: "#a1a1aa", accent: "#f5b301", onAccent: "#0a0a0b", mark: "R", site: "byrishav.online" },
  /** Atelier Systems: ivory, deep teal, coral. */
  studio: { bg: "#f3eee8", base: "#f3eee8", ink: "#17645f", muted: "#3d5e5b", accent: "#ff6845", onAccent: "#0f3532", mark: "AS", site: "byrishav.online/atelier" },
} as const;

/** Shared 1200x630 social card so every page previews the same way. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  theme = "portfolio",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  theme?: keyof typeof THEMES;
}) {
  const t = THEMES[theme];
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
          background: t.bg,
          backgroundColor: t.base,
          color: t.ink,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: t.accent,
              color: t.onAccent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: t.mark.length > 1 ? 28 : 36,
              fontWeight: 700,
            }}
          >
            {t.mark}
          </div>
          <div style={{ fontSize: 28, color: t.muted }}>{t.site}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: theme === "studio" ? "#c2401d" : t.accent, letterSpacing: 2, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 16, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 34, color: t.muted, marginTop: 20, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
