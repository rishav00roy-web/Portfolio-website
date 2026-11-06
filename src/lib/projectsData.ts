export const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description:
      "A custom database-driven travel platform built for a non-technical agency owner. The CMS lets her manage 34 packages across 24 destinations, update pricing, and post new offers, without touching code or calling a developer.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Custom CMS", "PKCE OAuth"],
    link: "https://tea-country-holidays.vercel.app",
    images: [
      "/assets/projects/tea-1.jpg",
      "/assets/projects/tea-2.jpg",
      "/assets/projects/tea-3.jpg",
    ],
  },
  {
    id: 2,
    title: "IQ Iron Fitness",
    description:
      "A cloud-hosted membership CRM with a custom billing engine, salary-slip generator, and operational dashboard, optimized for the owner\u2019s older laptop and iPhone 15 Pro Max.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "TypeScript", "Billing Engine"],
    link: "https://iq-iron-fitness-online-crm.vercel.app",
    images: [
      "/assets/projects/gym-online-1.png",
      "/assets/projects/gym-online-2.png",
      "/assets/projects/gym-online-3.png",
    ],
  },
  {
    id: 3,
    title: "Clash Bazar",
    description:
      "An e-commerce platform for the V7 CLASH gaming channel. Payments via Stripe and PayPal are held through a secure transaction workflow until order completion and a 7-day security window expires.",
    tags: ["Next.js", "Supabase", "Stripe", "PayPal", "Transaction Security", "Discord API"],
    link: "https://clash-bazar.vercel.app",
    images: [
      "/assets/projects/clash-1.png",
      "/assets/projects/clash-2.png",
      "/assets/projects/clash-3.png",
    ],
  },
  {
    id: 4,
    title: "Personal Portfolio V2",
    description:
      "An immersive, animation-driven developer portfolio built with Next.js App Router and Framer Motion. Features complex scroll-linked animations, a custom command palette, and a localized case-study viewing experience.",
    tags: ["Next.js 14", "Framer Motion", "Tailwind CSS", "TypeScript", "React"],
    link: "https://github.com/rishav00roy-web/Portfolio-website",
    images: [
      "/assets/projects/portfolio-1.jpg",
      "/assets/projects/portfolio-2.jpg",
      "/assets/projects/portfolio-3.jpg",
    ],
  },
];

export interface CaseStudy {
  title: string;
  tagline: string;
  /** One complete sentence for search results, under 155 characters. */
  summary: string;
  client: string;
  period: string;
  color: string;
  tags: string[];
  links: { label: string; url: string; icon?: string }[];
  problem: string;
  solution: string;
  architecture: {
    description: string;
    steps: { title: string; desc: string }[];
  };
  challenges: { title: string; description: string; fix: string }[];
  metrics: { value: string; label: string }[];
  businessValue: string;
  lessons?: string;
  futureImprovements?: string;
}

export const caseStudiesData: Record<number, CaseStudy> = {
  1: {
    title: "Tea Country Holidays",
    tagline: "Custom travel platform and owner-managed CMS",
    summary: "How we built Tea Country Holidays a travel site with its own admin, so the owner updates 34 packages and her prices without a developer.",
    client: "Tea Country Holidays Travel Agency",
    period: "Jan 2026 \u2013 Apr 2026",
    metrics: [
      { label: "Packages", value: "34" },
      { label: "Destinations", value: "24" },
      { label: "CMS", value: "Owner-Managed" },
      { label: "Auth", value: "PKCE OAuth" }
    ],
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Custom CMS", "PKCE OAuth"],
    links: [
      { label: "Live Site", url: "https://tea-country-holidays.vercel.app", icon: "live" }
    ],
    problem: "The owner ran her travel business from Excel sheets and Word files. An earlier website had cost her a lot and did little. She could not change a price or add an offer without paying a developer.",
    solution: "We built her a new travel site with its own admin. She adds packages, changes prices, edits destinations and posts offers herself, with no code.",
    architecture: {
      description: "A database-driven content platform with a custom admin layer designed for a non-technical operator.",
      steps: [
        { title: "Owner Dashboard", desc: "Custom admin interface with full CRUD over packages, destinations, pricing, and site content." },
        { title: "Offer Management", desc: "Dedicated banner system for posting and managing promotional deals." },
        { title: "Authentication", desc: "PKCE OAuth flow securing admin access for the business owner." },
        { title: "Edge Delivery", desc: "Static pages served via Vercel CDN for fast public-facing load times." }
      ]
    },
    challenges: [
      {
        title: "Designing for a Non-Technical Operator",
        description: "Off-the-shelf CMS platforms were too complex and bloated for the client\u2019s needs, while a static site would require a developer for every price change.",
        fix: "Built a custom Supabase-backed admin panel with a streamlined interface mapped directly to the owner\u2019s real workflow: packages, destinations, pricing, and offers."
      },
      {
        title: "Content Architecture for 24 Destinations",
        description: "Structuring 34 packages across 24 destinations required a normalized database schema that remained simple enough for a single admin to manage without confusion.",
        fix: "Designed the data model around the owner\u2019s mental model of her business rather than abstract relational purity, keeping the admin interface intuitive."
      }
    ],
    businessValue: "Her business now runs from one site she controls. Price changes, new packages and offers no longer need a developer.",
    lessons: "For an owner who isn't technical, the admin matters as much as the public site. It has to match how she thinks about her business.",
    futureImprovements: "Integration with direct flight APIs and an automated CRM payment gateway link.",
    color: "#F5B301"
  },
  2: {
    title: "IQ Iron Fitness",
    tagline: "Cloud-hosted gym management platform and billing engine",
    summary: "How we built IQ Iron Fitness a cloud gym system: 110+ members, automatic invoices and trainer pay, fast on an old laptop and a phone.",
    client: "IQ Iron Fitness Gym Owner",
    period: "Oct 2025 \u2013 Jan 2026 (Online Overhaul)",
    metrics: [
      { label: "Members", value: "110+" },
      { label: "Capacity", value: "500+" },
      { label: "Data Sync", value: "Realtime" },
      { label: "Billing", value: "Automated" }
    ],
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "TypeScript", "Billing Engine"],
    links: [
      { label: "Live Demo", url: "https://iq-iron-fitness-online-crm.vercel.app", icon: "live" },
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/IQ-iron-fitness-online-crm", icon: "github" }
    ],
    problem: "The gym owner had 110+ members to track, bills to send and trainer pay to work out. It all had to run well on an old laptop and on his phone.",
    solution: "We built a cloud system that keeps every device in sync. It writes membership invoices, works out trainer salary slips, and shows the day at a glance: pending, expiring and expired memberships, birthdays, money owed and the month's takings.",
    architecture: {
      description: "A cloud-hosted architecture with real-time data sync, automated billing, and a hardware-conscious UI layer.",
      steps: [
        { title: "Real-time Sync", desc: "Supabase subscriptions broadcast changes instantly across all connected devices." },
        { title: "Billing Engine", desc: "Computes membership dues, tracks payments, and generates downloadable invoices." },
        { title: "Salary-Slip Generator", desc: "Calculates trainer base pay plus PT commissions and produces employee salary statements." },
        { title: "Hardware-Conscious UI", desc: "Responsive design tested and optimized for older hardware and iOS Safari." }
      ]
    },
    challenges: [
      {
        title: "Client-Side Invoice Rendering",
        description: "Generating print-accurate invoice layouts on mobile browsers caused CSS overflow bugs.",
        fix: "Implemented a clean grid-based print layout using flexbox and standard print styles, producing high-resolution outputs without heavy library dependencies."
      },
      {
        title: "Concurrent State Updates",
        description: "Multiple receptionists updating records simultaneously caused stale data and UI inconsistencies.",
        fix: "Configured optimistic UI updates via React hooks alongside Supabase real-time replication broadcasts, keeping the interface responsive while maintaining data integrity."
      }
    ],
    businessValue: "Paper records are gone. The owner sees the whole gym at a glance, billing and pay are automatic, and the system can grow with the gym.",
    lessons: "Building for the owner's real laptop shaped the design more than any benchmark would have.",
    futureImprovements: "Full SMS gateway integration and biometric scanner API sync.",
    color: "#10B981"
  },
  3: {
    title: "Clash Bazar",
    tagline: "Secure transaction platform for gaming services",
    summary: "How we built Clash Bazar for V7 CLASH: a gaming store that holds payments until each order is checked, so buyers and sellers are safe.",
    client: "YouTube Gaming Community Creator",
    period: "May 2026 \u2013 Ongoing",
    metrics: [
      { label: "Payment hold", value: "7 days" },
      { label: "Security Window", value: "7 Days" },
      { label: "Payments", value: "Stripe + PayPal" },
      { label: "Status Polling", value: "5 Min" }
    ],
    tags: ["Next.js", "Supabase", "Stripe", "PayPal", "Transaction Security", "Discord API"],
    links: [
      { label: "Live Demo", url: "https://clash-bazar.vercel.app", icon: "live" },
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/ClashVault", icon: "github" }
    ],
    problem: "Trading game accounts is full of scams. Buyers reverse payments, and sellers take accounts back after being paid. The V7 CLASH channel needed a safe way to trade for its community.",
    solution: "We built a store that holds each payment until the order is checked and a 7-day safety window passes. Payments go through Stripe and PayPal. The owner runs orders, checks activity and keeps the books from his own admin, with no code.",
    architecture: {
      description: "An application-managed transaction pipeline with secure payment handling and automated status verification.",
      steps: [
        { title: "Payment Hold", desc: "Buyer deposits via Stripe/PayPal; funds are secured through the order lifecycle." },
        { title: "Order Verification", desc: "Credentials or service completion are verified before release." },
        { title: "Security Window", desc: "A mandatory 7-day hold period before final settlement." },
        { title: "Owner Dashboard", desc: "Admin portal for order management, background monitoring, and ledger maintenance." }
      ]
    },
    challenges: [
      {
        title: "Webhook Reliability",
        description: "Stripe and PayPal webhooks occasionally drop, leaving transactions in a pending state where the buyer has paid but the system hasn\u2019t confirmed it.",
        fix: "Built a 5-minute background polling fallback that directly queries the payment provider APIs to guarantee ledger accuracy regardless of webhook failures."
      },
      {
        title: "Post-Sale Account Recovery",
        description: "Sellers can attempt to reclaim gaming accounts through Supercell\u2019s recovery process after receiving payment.",
        fix: "Implemented a mandatory 7-day security window during which the account\u2019s credentials must be fully transferred and locked before funds are released."
      }
    ],
    businessValue: "The channel now has a safe middleman for its community, with the admin tools to run it alone.",
    lessons: "Money needs careful handling. Every payment step needs a backup check, because payment notifications can go missing.",
    futureImprovements: "Full automation of game account checking using Supercell API integrations.",
    color: "#8B5CF6"
  },
  4: {
    title: "byrishav.online",
    tagline: "Rishav Roy's portfolio and the Atelier Systems studio page: two sites, one codebase",
    summary: "How Rishav Roy rebuilt byrishav.online: a portfolio for recruiters and a studio page for clients, with an AI assistant, fast pages and local SEO.",
    client: "Personal project",
    period: "Nov 2026",
    metrics: [
      { label: "Pages", value: "2 sites" },
      { label: "Layout shift", value: "0.01" },
      { label: "AI assistant", value: "Psunk" },
      { label: "Tests", value: "15 passing" }
    ],
    tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "GSAP", "Lenis", "Groq AI", "Schema.org"],
    links: [
      { label: "Live Site", url: "https://byrishav.online", icon: "live" },
      { label: "Atelier Systems", url: "https://byrishav.online/atelier", icon: "live" },
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/Portfolio-website", icon: "github" }
    ],
    problem: "One site had to do two jobs. Recruiters want to read about Rishav quickly. Clients want to see work and start a project. Mixing both on one page served neither.",
    solution: "We split it into two sites that share one codebase. The portfolio has a sunset hero, a story of his path and his experience. Atelier Systems, the studio page, has its own ivory and teal look, the client work, a clients section and a contact form. Psunk, an AI assistant, answers questions on both, trained on each site's own content.",
    architecture: {
      description: "One Next.js app serving two identities, with shared data so the pages, the assistant and the search data never disagree.",
      steps: [
        { title: "Two identities", desc: "Each site has its own colours and fonts, scoped in CSS, and an animated logo trace carries you from one to the other." },
        { title: "One source of facts", desc: "Profile, services, work and FAQ live in shared data files that feed the pages, the AI assistant, llms.txt and the search schema." },
        { title: "AI assistant", desc: "Psunk runs on Groq and answers from each site's facts only, with no prices or private client details." },
        { title: "Found by people and AI", desc: "Structured data, an FAQ written answer-first, llms.txt and a robots.txt that welcomes AI search and answer engines." }
      ]
    },
    challenges: [
      {
        title: "Smooth on slow phones",
        description: "A moving background grid, screenshots and animations made the page stutter on slower phones.",
        fix: "The grid sleeps when nothing moves, screenshots are plain images, and text effects that cost a repaint were removed. Dropped frames fell from 78% to 6% in a slowed-down test."
      },
      {
        title: "Two looks without two codebases",
        description: "The studio needed a light ivory look while the portfolio stays dark, on the same components.",
        fix: "Each site sets its own colour and font variables in one scope, so shared parts like the contact form and chat dress themselves for the site they're on."
      }
    ],
    businessValue: "Recruiters get a clear story and a CV in a few seconds. Clients get the studio, its work and a quote request, and the studio can be found when someone asks a search engine or an AI assistant for a developer in Jorhat.",
    lessons: "Plain words and fast pages beat effects. Every animation has to earn its place, and every claim on the page has to be true.",
    futureImprovements: "Add Chennai to the studio's local pages after the move, and a short video demo of the invoice reader.",
    color: "#CDF22B"
  }
};

/** URL slug for each case study. Keep these stable, they are public URLs. */
export const caseStudySlugs: Record<number, string> = {
  1: "tea-country-holidays",
  2: "iq-iron-fitness",
  3: "clash-bazar",
  4: "personal-portfolio-v2",
};

export type CaseStudyWithSlug = CaseStudy & { id: number; slug: string };

export const allCaseStudies: CaseStudyWithSlug[] = Object.keys(caseStudiesData).map((key) => {
  const id = Number(key);
  return { id, slug: caseStudySlugs[id], ...caseStudiesData[id] };
});

export function getCaseStudyBySlug(slug: string): CaseStudyWithSlug | null {
  return allCaseStudies.find((c) => c.slug === slug) ?? null;
}

export function getSlugById(id: number): string | undefined {
  return caseStudySlugs[id];
}

export interface ProjectListing {
  id: string;
  title: string;
  githubRepoName: string;
  category: "Client Websites" | "Design-Heavy / Showcase Builds" | "Web Apps / Tools";
  description: string;
  tags: string[];
  caseStudySlug?: string;
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
}

export const categorizedProjects: {
  category: "Client Websites" | "Design-Heavy / Showcase Builds" | "Web Apps / Tools";
  summary: string;
  items: ProjectListing[];
}[] = [
  {
    category: "Client Websites",
    summary: "Production database-driven systems and client-acquisition platforms engineered for commercial businesses.",
    items: [
      {
        id: "tea-country-holidays",
        title: "Tea Country Holidays",
        githubRepoName: "tea-country-holidays",
        category: "Client Websites",
        description: "Database-driven travel platform for a non-technical agency owner. Custom CMS for managing 34 packages across 24 destinations, role-gated admin dashboard, Gemini-powered AI concierge chat, server-side booking flow.",
        tags: ["Next.js 16", "Supabase", "PKCE OAuth", "Google Gemini"],
        caseStudySlug: "tea-country-holidays",
        liveUrl: "https://tea-country-holidays.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/tea-country-holidays",
        badge: "Commercial CMS",
      },
      {
        id: "iq-iron-fitness-online-crm",
        title: "IQ Iron Fitness (Cloud CRM)",
        githubRepoName: "IQ-iron-fitness-online-crm",
        category: "Client Websites",
        description: "Cloud-hosted gym membership CRM with a custom billing engine, salary-slip generator, and operational dashboard. Built and sold as a commercial product, optimized for the owner's older laptop and mobile.",
        tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
        caseStudySlug: "iq-iron-fitness",
        liveUrl: "https://iq-iron-fitness-online-crm.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/IQ-iron-fitness-online-crm",
        badge: "Commercial CRM",
      },
      {
        id: "microgreens-site",
        title: "Microgreens Storefront",
        githubRepoName: "microgreens-site",
        category: "Client Websites",
        description: "Brand and catalog marketing site for a Surrey, BC microgreens farm. Motion-driven storefront with product, recipe, and blog routes; dashboard in planning.",
        tags: ["Next.js", "Tailwind v4", "Motion", "Lenis"],
        liveUrl: "https://microgreens-site.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/microgreens-site",
        badge: "Storefront",
      },
      {
        id: "truwest-company-page",
        title: "TruWest Mortgage",
        githubRepoName: "Truwest-company-page-",
        category: "Client Websites",
        description: "Lead-generation platform for a BC/Alberta mortgage broker. Targeted borrower funnels, embedded mortgage calculator suite, 30+ city SEO pages, multi-step lead qualification wizard.",
        tags: ["Next.js 16", "Turbopack", "Tailwind CSS", "Financial Engine"],
        liveUrl: "https://truwest-company-page.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/Truwest-company-page-",
        badge: "FinTech Funnel",
      },
      {
        id: "clashvault",
        title: "ClashVault (Clash Bazar)",
        githubRepoName: "ClashVault",
        category: "Client Websites",
        description: "E-commerce and services store for the V7 CLASH gaming channel. Payments held through a secure transaction workflow until order completion and a 7-day security window expires. Dispute resolution admin panel, dual buyer/seller dashboards.",
        tags: ["Next.js", "Supabase", "Stripe", "PayPal", "Discord API"],
        caseStudySlug: "clash-bazar",
        liveUrl: "https://clash-bazar.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/ClashVault",
        badge: "Escrow Marketplace",
      },
    ],
  },
  {
    category: "Design-Heavy / Showcase Builds",
    summary: "Visual design showcases featuring compositor-driven scroll dynamics, bespoke typography, and high-performance layout architecture.",
    items: [
      {
        id: "roy-and-co-website",
        title: "Roy Group & Co",
        githubRepoName: "Roy-and-co-website",
        category: "Design-Heavy / Showcase Builds",
        description: "Desktop-first marketing site for a wedding/events brand, kept as a design showcase. Compositor-only scroll animations, Lenis smooth scroll, tone-shifting header. Built with Claude Code.",
        tags: ["Next.js", "React 19", "CSS Scroll Timeline", "Editorial Design"],
        liveUrl: "https://roy-and-co-website.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/Roy-and-co-website",
        badge: "Design Showcase",
      },
      {
        id: "chriskennelsite",
        title: "Chris Kennels (Willchris)",
        githubRepoName: "Chriskennelsite",
        category: "Design-Heavy / Showcase Builds",
        description: "Multi-page site for a dog boarding/daycare/grooming business, kept as a design showcase. Full service pages for daycare, boarding, grooming, and trail walks.",
        tags: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
        liveUrl: "https://chriskennel-ruddy.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/Chriskennelsite",
        badge: "Design Showcase",
      },
    ],
  },
  {
    category: "Web Apps / Tools",
    summary: "Autonomous workflows, agentic email pipelines, offline-first databases, and developer engineering tools.",
    items: [
      {
        id: "gym-crm",
        title: "Gym CRM (Offline Local-First)",
        githubRepoName: "Gym-CRM",
        category: "Web Apps / Tools",
        description: "Offline-first member management system built for basement gyms in dead cellular zones. Real-time camera-based OCR for frictionless member onboarding, client-side IndexedDB replication that queues broadcasts until service resumes.",
        tags: ["Vanilla JS", "IndexedDB", "Tesseract.js OCR", "Service Workers"],
        githubUrl: "https://github.com/rishav00roy-web/Gym-CRM",
        badge: "Offline Local-First",
      },
      {
        id: "job-tracker-and-email-tracker",
        title: "Agentic Job Tracker",
        githubRepoName: "JOB-TRACKER-AND-EMAIL-TRACKER",
        category: "Web Apps / Tools",
        description: "Agentic job application and intelligence platform (Turborepo monorepo). ATS ingestion and scoring engine across 54 platforms, autonomous email tracker that moves Kanban cards on interview/rejection emails, and a truth-guarded resume tailorer that rejects hallucinated claims server-side.",
        tags: ["Next.js 16", "Turborepo", "Supabase", "IMAP Engine", "Claude AI"],
        liveUrl: "https://job-tracker-and-email-tracker-web-five.vercel.app",
        githubUrl: "https://github.com/rishav00roy-web/JOB-TRACKER-AND-EMAIL-TRACKER",
        badge: "Agentic Monorepo",
      },
      {
        id: "personal-portfolio-v2",
        title: "byrishav.online",
        githubRepoName: "Portfolio-website",
        category: "Web Apps / Tools",
        description: "This site: Rishav Roy's portfolio and the Atelier Systems studio page in one Next.js app, with an AI assistant trained on both and local SEO.",
        tags: ["Next.js 16", "GSAP", "Tailwind CSS v4", "React 19", "Groq AI"],
        caseStudySlug: "personal-portfolio-v2",
        liveUrl: "https://byrishav.online",
        githubUrl: "https://github.com/rishav00roy-web/Portfolio-website",
        badge: "Interactive UI",
      },
    ],
  },
];
