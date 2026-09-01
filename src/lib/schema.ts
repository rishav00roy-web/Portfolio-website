import type { CaseStudyWithSlug } from "./projectsData";

export const SITE_URL = "https://byrishav.online";

const PERSON_REF = {
  "@type": "Person",
  name: "Rishav Roy",
  url: SITE_URL,
} as const;

/**
 * The case-study page is an Article *about* the software that was built.
 * Modelling it that way (rather than typing the page itself as a
 * SoftwareApplication) keeps both entities honest and lets the tech stack
 * hang off `about` where it belongs.
 *
 * No datePublished: the case studies record a working period ("Jan 2026 –
 * Apr 2026"), not a publication date, and inventing one to satisfy a rich
 * result would be a fabricated claim.
 */
export function caseStudySchema(caseStudy: CaseStudyWithSlug) {
  const url = `${SITE_URL}/projects/${caseStudy.slug}`;
  const liveLink = caseStudy.links.find((l) => l.icon === "live")?.url;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${caseStudy.title} — Case Study`,
    name: caseStudy.title,
    description: caseStudy.tagline,
    abstract: caseStudy.problem,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/opengraph-image.jpg`,
    author: PERSON_REF,
    publisher: PERSON_REF,
    keywords: caseStudy.tags.join(", "),
    about: {
      "@type": "SoftwareApplication",
      name: caseStudy.title,
      description: caseStudy.tagline,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      ...(liveLink ? { url: liveLink } : {}),
      author: PERSON_REF,
    },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

export function caseStudyIndexSchema(caseStudies: CaseStudyWithSlug[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies",
    description: "Deep dives into commercial builds, tools, and technical experiments.",
    url: `${SITE_URL}/projects`,
    isPartOf: { "@type": "WebSite", name: "Rishav Roy Portfolio", url: SITE_URL },
    author: PERSON_REF,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((caseStudy, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: caseStudy.title,
        description: caseStudy.tagline,
        url: `${SITE_URL}/projects/${caseStudy.slug}`,
      })),
    },
  };
}

/** Render a JSON-LD block. */
export function jsonLd(data: object | object[]) {
  return { __html: JSON.stringify(data) };
}

/**
 * ProfilePage is a claim about *this page*, not about the site, so it belongs
 * on the homepage alone — a case-study index that also calls itself a profile
 * page is telling search engines two different things about one URL.
 */
export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2026-08-01T00:00:00+00:00",
    mainEntity: PERSON_REF,
  };
}
