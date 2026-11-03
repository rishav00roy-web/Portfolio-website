import type { CaseStudyWithSlug } from "./projectsData";
import { PROFILE, education, languages, skills } from "./profile";

export const SITE_URL = "https://byrishav.online";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Every other node points back at the one Person entity by @id. */
const PERSON_REF = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: PROFILE.name,
  url: SITE_URL,
} as const;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    givenName: "Rishav",
    familyName: "Roy",
    jobTitle: PROFILE.role,
    description: PROFILE.summary,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    email: `mailto:${PROFILE.email}`,
    telephone: "+91-60019-14771",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    homeLocation: { "@type": "Place", name: PROFILE.hometown },
    alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
    hasOccupation: {
      "@type": "Occupation",
      name: PROFILE.role,
      description:
        "Building commercial-grade local-first CRMs, enterprise FOIA workflows, and full-stack web applications.",
      occupationLocation: { "@type": "City", name: "Kolkata" },
    },
    worksFor: { "@type": "Organization", name: "Tea Country Holidays" },
    knowsLanguage: languages.map((l) => (l.name === "Bangla" ? "Bengali" : l.name)),
    knowsAbout: [...new Set(skills.flatMap((g) => g.items))],
    sameAs: PROFILE.socials.map((s) => s.url),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: `${PROFILE.name} Portfolio`,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": PERSON_ID },
  };
}

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
    headline: `${caseStudy.title} Case Study`,
    name: caseStudy.title,
    description: caseStudy.tagline,
    abstract: caseStudy.problem,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/opengraph-image`,
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
    isPartOf: { "@id": WEBSITE_ID },
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
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    dateCreated: "2026-08-01T00:00:00+00:00",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}
