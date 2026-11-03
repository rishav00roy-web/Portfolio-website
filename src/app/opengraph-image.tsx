import { PROFILE } from "@/lib/profile";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${PROFILE.name}, ${PROFILE.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: PROFILE.name,
    subtitle: `${PROFILE.role} · ${PROFILE.location}`,
  });
}
