import type { Metadata, Viewport } from "next";
import AtelierApp from "../../AtelierApp";

// The studio page as a showroom (preview): out of search.
// Browser chrome matches the studio's graphite, not the portfolio's dusk.
export const viewport: Viewport = { themeColor: "#110d14" };

export const metadata: Metadata = {
  title: { absolute: "Atelier Systems | Preview (showroom)" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/atelier" },
};

export default function Atelier3() {
  return <AtelierApp showcase />;
}
