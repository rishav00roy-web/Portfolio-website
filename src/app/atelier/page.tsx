import type { Metadata, Viewport } from "next";
import AtelierApp from "../../AtelierApp";
import { jsonLd, studioSchema } from "@/lib/schema";
import { SERVICES } from "@/lib/studio";

const DESCRIPTION =
  "A small studio that designs and builds websites, automations and AI tools for growing businesses. Run by Rishav Roy in Kolkata.";

// Kept out of search while the redesign is a preview; drop `robots` and add
// the route to the sitemap when the two-page site goes live.
// Browser chrome matches the studio's ivory, not the portfolio's dusk.
export const viewport: Viewport = { themeColor: "#f3eee8" };

export const metadata: Metadata = {
  title: { absolute: "Atelier Systems | Websites, automation and AI agents" },
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: "/atelier" },
  openGraph: { title: "Atelier Systems", description: DESCRIPTION, url: "/atelier", siteName: "Atelier Systems", type: "website" },
};

export default function AtelierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(studioSchema(SERVICES))} />
      <AtelierApp />
    </>
  );
}
