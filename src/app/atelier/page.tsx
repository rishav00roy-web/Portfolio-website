import type { Metadata, Viewport } from "next";
import AtelierApp from "../../AtelierApp";
import { faqSchema, jsonLd, studioSchema } from "@/lib/schema";
import { FAQ, SERVICES } from "@/lib/studio";

const DESCRIPTION =
  "A Jorhat, Assam studio that designs and builds websites, web apps, automations and AI tools for growing businesses. Run by Rishav Roy, working with clients across India and abroad.";

// Browser chrome matches the studio's ivory, not the portfolio's dusk.
export const viewport: Viewport = { themeColor: "#f3eee8" };

export const metadata: Metadata = {
  title: { absolute: "Atelier Systems | Website and app developers in Jorhat, Assam" },
  description: DESCRIPTION,
  alternates: { canonical: "/atelier" },
  openGraph: { title: "Atelier Systems", description: DESCRIPTION, url: "/atelier", siteName: "Atelier Systems", type: "website" },
};

export default function AtelierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([studioSchema(SERVICES), faqSchema(FAQ)])} />
      <AtelierApp />
    </>
  );
}
