import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rishav Roy — Agentic Full-Stack Developer",
    short_name: "Rishav Roy",
    description:
      "Building and shipping high-performance production web apps through AI-augmented development.",
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#030303",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
