export const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description:
      "A custom database-driven travel platform built for a non-technical agency owner. The CMS lets her manage 34 packages across 24 destinations, update pricing, and post new offers\u2014without touching code or calling a developer.",
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
      "A cloud-hosted membership CRM with a custom billing engine, salary-slip generator, and operational dashboard\u2014optimized for the owner\u2019s older laptop and iPhone 15 Pro Max.",
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
      "An e-commerce platform for a gaming YouTuber with 12K+ subscribers. Payments via Stripe and PayPal are held through a secure transaction workflow until order completion and a 7-day security window expires.",
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
    problem: "The client was running her travel business on Excel sheets, static Word files, and Gemini-assisted itinerary drafts. She had previously paid good money for a website that underdelivered. She had no way to update package information, pricing, or offers without depending on a developer for every small change.",
    solution: "Built a custom travel platform from scratch with a bespoke admin dashboard. The non-technical owner can now add and edit packages, update fixed pricing, manage destination content, and post promotional offers\u2014all through the CMS without writing code.",
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
        fix: "Built a custom Supabase-backed admin panel with a streamlined interface mapped directly to the owner\u2019s real workflow\u2014packages, destinations, pricing, and offers."
      },
      {
        title: "Content Architecture for 24 Destinations",
        description: "Structuring 34 packages across 24 destinations required a normalized database schema that remained simple enough for a single admin to manage without confusion.",
        fix: "Designed the data model around the owner\u2019s mental model of her business rather than abstract relational purity, keeping the admin interface intuitive."
      }
    ],
    businessValue: "Transformed the client\u2019s operation from a scattered mix of Excel and Word documents into a centralized platform she fully controls. She no longer depends on a developer for routine updates\u2014pricing changes, new packages, and promotional offers are all self-service.",
    lessons: "When building for a non-technical owner, the admin interface and data model matter just as much as the public-facing website. The CMS has to match how the client actually thinks about her business.",
    futureImprovements: "Integration with direct flight APIs and an automated CRM payment gateway link.",
    color: "#F5B301"
  },
  2: {
    title: "IQ Iron Fitness",
    tagline: "Cloud-hosted gym management platform and billing engine",
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
    problem: "The gym owner needed to track 110+ active members, handle billing, and calculate trainer pay. The system had to run smoothly on an older laptop and provide a usable mobile experience on an iPhone 15 Pro Max\u2014no room for a heavy, sluggish UI.",
    solution: "Built a Next.js + Supabase cloud platform with real-time sync, a custom billing engine that generates membership invoices, and a salary-slip builder that computes trainer commissions. The dashboard gives the owner an immediate operational snapshot: pending memberships, expiring memberships, expired memberships, today\u2019s birthdays, outstanding payments, and monthly collection totals.",
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
    businessValue: "Replaced manual record-keeping with a cloud platform that gives the owner instant operational visibility. Billing and payroll are automated, and the system is built to scale comfortably as the gym grows toward 500+ members.",
    lessons: "Designing for real-world hardware constraints\u2014like the owner\u2019s specific older laptop\u2014shapes performance and UI decisions more than abstract benchmarks ever will.",
    futureImprovements: "Full SMS gateway integration and biometric scanner API sync.",
    color: "#10B981"
  },
  3: {
    title: "Clash Bazar",
    tagline: "Secure transaction platform for gaming services",
    client: "YouTube Gaming Community Creator",
    period: "May 2026 \u2013 Ongoing",
    metrics: [
      { label: "Community", value: "12K+" },
      { label: "Security Window", value: "7 Days" },
      { label: "Payments", value: "Stripe + PayPal" },
      { label: "Status Polling", value: "5 Min" }
    ],
    tags: ["Next.js", "Supabase", "Stripe", "PayPal", "Transaction Security", "Discord API"],
    links: [
      { label: "Live Demo", url: "https://clash-bazar.vercel.app", icon: "live" },
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/ClashVault", icon: "github" }
    ],
    problem: "High-value gaming trades are riddled with scams\u2014buyers commit chargeback fraud, sellers reclaim accounts after getting paid. The creator needed a structured platform to protect both sides of every transaction within their 12K+ subscriber community.",
    solution: "Built a secure e-commerce platform with an application-managed escrow-style workflow. Payments via Stripe and PayPal are held securely until the order is verified and a 7-day security window expires. Created a custom admin dashboard so the non-technical owner can manage orders, monitor operations, and maintain a financial ledger without writing code. Connected the platform to Discord for community giveaways and free item distribution.",
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
    businessValue: "Gave the creator a secure middleman platform that protects their 12K+ subscriber community from fraud\u2014complete with the admin tools a non-technical owner needs to run the operation independently.",
    lessons: "Financial workflows require defensive engineering. Every payment state transition needs an idempotent fallback, and you cannot rely solely on webhooks for critical transaction confirmation.",
    futureImprovements: "Full automation of game account checking using Supercell API integrations.",
    color: "#8B5CF6"
  },
  4: {
    title: "Personal Portfolio V2",
    tagline: "A meticulously crafted developer portfolio demonstrating high-end animation and UI/UX design",
    client: "Personal Project",
    period: "July 2026",
    metrics: [
      { label: "Performance", value: "98" },
      { label: "Animations", value: "60 FPS" },
      { label: "SEO", value: "Optimized" },
      { label: "Design", value: "Responsive" }
    ],
    tags: ["Next.js 14", "Framer Motion", "Tailwind CSS", "React 19", "Vercel"],
    links: [
      { label: "Live Site", url: "https://byrishav.online", icon: "live" },
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/Portfolio-website", icon: "github" }
    ],
    problem: "Traditional developer portfolios often lack character and fail to demonstrate actual front-end engineering skills. I needed a platform that not only lists my projects but serves as a living, interactive proof of my ability to build polished, performant UIs.",
    solution: "Developed an immersive portfolio experience using Next.js App Router and Framer Motion. Implemented scroll-linked animations, a custom command menu (Ctrl+K), and a highly optimized rendering strategy to maintain 60fps animations across devices.",
    architecture: {
      description: "A modern React application structured for optimal client-side interactivity and fast static delivery.",
      steps: [
        { title: "Scroll Orchestration", desc: "Framer Motion\u2019s `useScroll` and `useTransform` map scroll position directly to element styles." },
        { title: "Component Architecture", desc: "Strict separation of Server and Client components ensures minimum JS bundle size while preserving rich interactions." },
        { title: "Global Command Palette", desc: "A custom-built `CommandMenu` provides fast, keyboard-first navigation globally." },
        { title: "Responsive Layouts", desc: "Tailwind CSS manages complex grid structures that elegantly collapse on mobile devices without layout shifting." }
      ]
    },
    challenges: [
      {
        title: "Animation Jitter on Mobile Safari",
        description: "Complex scroll-linked transforms were causing layout recalculations and dropped frames on older iOS devices.",
        fix: "Delegated heavy animations to the GPU by forcing `will-change: transform` and using spring physics (`useSpring`) over raw scroll values to smooth out sudden user scrolls."
      },
      {
        title: "Accessibility with Motion",
        description: "Heavy animations can trigger motion sickness and reduce screen reader accessibility.",
        fix: "Implemented `useReducedMotion` hooks to respect OS-level accessibility settings, gracefully degrading animations to simple opacity fades."
      }
    ],
    businessValue: "Acts as a primary lead generation tool for freelance clients and a technical showcase for employment opportunities.",
    lessons: "Animation must serve a purpose and never block the main thread. Prioritizing CSS transforms over layout-triggering properties is essential for 60fps experiences.",
    futureImprovements: "Implementing an interactive 3D WebGL hero background using Three.js.",
    color: "#3B82F6"
  }
};

/** URL slug for each case study. Keep these stable — they are public URLs. */
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
