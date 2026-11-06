import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Atelier Systems: websites, automations and AI tools for growing businesses";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Studio",
    title: "Atelier Systems",
    subtitle: "Websites, automations and AI tools for growing businesses",
    theme: "studio",
  });
}
