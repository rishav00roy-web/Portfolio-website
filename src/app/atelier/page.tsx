import type { Metadata, Viewport } from "next";
import AtelierApp from "../../AtelierApp";

const DESCRIPTION =
  "Websites, automation and AI agents for small businesses. A one-person studio run by Rishav Roy.";

// Kept out of search while the redesign is a preview; drop `robots` and add
// the route to the sitemap when the two-page site goes live.
// Browser chrome matches the studio's aubergine, not the portfolio's dusk.
export const viewport: Viewport = { themeColor: "#110d14" };

export const metadata: Metadata = {
  title: { absolute: "Atelier Systems | Websites, automation and AI agents" },
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: "/atelier" },
  openGraph: { title: "Atelier Systems", description: DESCRIPTION, url: "/atelier", siteName: "Atelier Systems", type: "website" },
};

export default function AtelierPage() {
  return <AtelierApp />;
}
