import type { Metadata, Viewport } from "next";
import AtelierApp from "../../AtelierApp";

// The studio page drawn as an architect's sheet (preview): out of search.
// Browser chrome matches the studio's graphite, not the portfolio's dusk.
export const viewport: Viewport = { themeColor: "#0d1112" };

export const metadata: Metadata = {
  title: { absolute: "Atelier Systems | Preview (drawing sheet)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/atelier" },
};

export default function Atelier2() {
  return <AtelierApp sheet />;
}
