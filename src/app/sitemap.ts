import type { MetadataRoute } from "next";
import { allCaseStudies } from "@/lib/projectsData";
import { SITE_URL } from "@/lib/schema";

/**
 * Bump this when page content actually changes. A lastModified of
 * `new Date()` stamps every URL as freshly edited on every build, which
 * teaches crawlers to ignore the field altogether.
 */
const CONTENT_UPDATED = new Date("2026-11-06");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/atelier`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    ...allCaseStudies.map((caseStudy) => ({
      url: `${SITE_URL}/projects/${caseStudy.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
