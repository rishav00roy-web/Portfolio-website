export const projects = [
  {
    id: 1,
    title: "Tea Country Holidays",
    description:
      "A complete travel booking platform accompanied by a custom rate management CMS, developed for a travel agency client. I designed the CMS architecture to support 94+ packages spanning 24 destinations, while also automating the creation of client-ready PDF itineraries.",
    tags: ["Next.js 14", "React 19", "Supabase", "PostgreSQL", "Tailwind CSS", "Python (ReportLab)", "PKCE OAuth"],
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
      "A cloud-hosted membership management platform with real-time Supabase sync. Features a custom billing engine for generating membership invoices, an automated employee salary slip builder, and role-based trainer tracking.",
    tags: ["Next.js 14", "Supabase", "PostgreSQL", "Tailwind CSS", "TypeScript", "Billing Engine"],
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
      "A Clash of Clans services marketplace connecting players with pro boosters, coaches, and base builders. Features escrow-secured transactions, custom order management dashboard, and secure holding ledger.",
    tags: ["Next.js", "Supabase", "Razorpay", "PayPal", "Escrow Engine", "PostgreSQL"],
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
    tagline: "Commercial travel booking platform and bespoke rate-management CMS",
    client: "Tea Country Holidays Travel Agency",
    period: "Jan 2026 – Apr 2026",
    metrics: [
      { label: "Packages Managed", value: "94+" },
      { label: "Destinations Covered", value: "24+" },
      { label: "Itinerary Overhead Reduced", value: "70%" },
      { label: "LCP Load Speed Boost", value: "2.2s faster" }
    ],
    tags: ["Next.js 14", "React 19", "Supabase", "PostgreSQL", "Tailwind CSS", "Python (ReportLab)", "PKCE OAuth"],
    links: [
      { label: "Live Site", url: "https://tea-country-holidays.vercel.app", icon: "live" }
    ],
    problem: "The client operated manually with Excel sheets and static Word files. Generating personalized itineraries, updating rates for dozens of destinations, and managing packages caused extreme administrative lag and conversion drops.",
    solution: "Built a custom database-driven travel CMS using Next.js and Supabase. Features a rate-calculation engine, an admin panel with PKCE OAuth authentication, and a Python ReportLab microservice that converts destination packets into client-ready PDFs dynamically.",
    architecture: {
      description: "A serverless, edge-cached content model designed for fast load times and absolute data integrity.",
      steps: [
        { title: "Client Interaction", desc: "User views and builds custom vacation packets using Next.js server actions." },
        { title: "Authentication & Role Security", desc: "Admin modifies rate tables via PKCE OAuth validation." },
        { title: "Dynamic Processing", desc: "Python worker pulls from PostgreSQL database and generates customized, printable PDF packets." },
        { title: "Edge Caching", desc: "Assets cached on Vercel CDN, bringing First Contentful Paint down to 0.8s." }
      ]
    },
    challenges: [
      {
        title: "PDF Compilation Crash on Mobile Devices",
        description: "Initial client-side PDF creation crashed low-memory mobile browsers due to complex image rendering.",
        fix: "Offloaded PDF compilation to a dedicated serverless Python API worker using ReportLab and cached the compiled outputs on S3 with signed URLs."
      },
      {
        title: "Rate Calculations Synchronization",
        description: "Seasonal rates, transport multipliers, and room-occupancy matrices made query responses slow.",
        fix: "Denormalized rate tables with daily index caching and implemented PostgreSQL materialized views, cutting query durations from 1.2s to 15ms."
      }
    ],
    businessValue: "Empowered the travel agency to manage 94+ custom packages. Fully automated the itinerary packet assembly, reducing staff time per package from 45 minutes to 30 seconds. Attracted 250+ booking inquiries in the first month.",
    lessons: "Delegating resource-intensive operations (like PDF generation) to serverless background workers is critical for keeping the web UI responsive and achieving high Lighthouse Performance scores.",
    futureImprovements: "Integration with direct flight APIs and an automated CRM payment gateway link.",
    color: "#F5B301"
  },
  2: {
    title: "IQ Iron Fitness",
    tagline: "Cloud-hosted gym membership management platform and billing engine",
    client: "IQ Iron Fitness Gym Owner",
    period: "Oct 2025 – Jan 2026 (Online Overhaul)",
    metrics: [
      { label: "Active Members Managed", value: "500+" },
      { label: "Sync Overhead", value: "Real-time" },
      { label: "Invoice Generation Time", value: "< 2 Seconds" },
      { label: "Payslip Processing", value: "Automated" }
    ],
    tags: ["Next.js 14", "Supabase", "PostgreSQL", "Tailwind CSS", "TypeScript", "Billing Engine", "Salary Dashboard"],
    links: [
      { label: "Live Demo", url: "https://iq-iron-fitness-online-crm.vercel.app", icon: "live" },
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/IQ-iron-fitness-online-crm", icon: "github" }
    ],
    problem: "The initial local-first offline CRM was excellent for basement connectivity, but as the gym expanded, the owner needed real-time cloud data sync across multiple admin devices, a professional invoice generator for memberships, and a salary slip generator for personal trainers based on client sessions.",
    solution: "Migrated the app to a Next.js 14 cloud architecture integrated with Supabase. Built a custom billing engine that generates downloadable PDF invoices for memberships and a salary calculation system for employees that computes base pay plus PT commissions, generating instant employee salary slips.",
    architecture: {
      description: "A cloud-hosted serverless architecture with active PostgreSQL row-level security and dynamic client-side PDF compilation.",
      steps: [
        { title: "Real-time Database Sync", desc: "Supabase client subscriptions broadcast table changes instantly to all connected admin dashboards." },
        { title: "Billing Engine", desc: "Computes total fees, paid amounts, and remaining balances, rendering clean printable invoice vouchers." },
        { title: "Salary Slip Generator", desc: "Formulas automatically calculate PT commissions based on trainer client count, generating downloadable salary statements." },
        { title: "Cloud Security", desc: "Supabase Row-Level Security (RLS) protects client and trainer data from unauthorized API queries." }
      ]
    },
    challenges: [
      {
        title: "Dynamic PDF Invoice Generation on Client Browsers",
        description: "Generating layout-accurate printable invoice sheets directly on client mobile devices caused layout overflow bugs in CSS printing.",
        fix: "Implemented a clean grid-based print layout using modern flex-box borders and standard print css styles, ensuring high resolution outputs without library dependencies."
      },
      {
        title: "State Synchronizations",
        description: "Concurrent updates by multiple receptionists caused database locks and stale client lists.",
        fix: "Configured optimistic state updates via React hooks alongside realtime Supabase replication broadcasts, ensuring a smooth, single-page UI feeling."
      }
    ],
    businessValue: "Transformed gym operations by moving client management to the cloud. Empowered the gym owner to manage trainer payroll and customer invoicing in seconds, reducing administrative overhead by 80%.",
    lessons: "Migrating from a local-first architecture to the cloud requires a robust state management layer to maintain a fast, responsive UI while ensuring data integrity.",
    futureImprovements: "Full SMS gateway integration and biometric scanner API sync.",
    color: "#10B981"
  },
  3: {
    title: "Clash Bazar",
    tagline: "Escrow-secured Clash of Clans services marketplace and boosting transactions engine",
    client: "YouTube Gaming Community Creator",
    period: "May 2026 – Ongoing",
    metrics: [
      { label: "Target Community Size", value: "50,000+ gamers" },
      { label: "Chargeback Risk", value: "Minimized to <0.5%" },
      { label: "Escrow Holding Period", value: "7 Days" },
      { label: "Supported Gateways", value: "Razorpay & PayPal" }
    ],
    tags: ["Next.js", "Supabase", "Razorpay", "PayPal", "Escrow Engine", "PostgreSQL", "Webhooks"],
    links: [
      { label: "Live Demo", url: "https://clash-bazar.vercel.app", icon: "live" },
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/ClashVault", icon: "github" }
    ],
    problem: "Buying and selling high-value gaming accounts and purchasing boosting or coaching services is plagued by scams. Buyers commit chargeback fraud and sellers can reclaim their accounts, leading to high transaction distrust.",
    solution: "Architected a secure digital escrow platform. The seller surrenders account credentials, or boosters verify completion of services, while the buyer deposits funds into the escrow vault. The platform secures both and releases funds only after confirmation or warranty period.",
    architecture: {
      description: "An escrow validation pipeline using PostgreSQL transaction isolation and secure payment webhook handlers.",
      steps: [
        { title: "Deposit Phase", desc: "Buyer sends payment which Razorpay/PayPal holds in merchant accounts." },
        { title: "Credential Vaulting", desc: "Seller credentials stored encrypted in a secure vault DB table." },
        { title: "Secured Verification", desc: "Account security details are transferred; buyer verifies the credentials." },
        { title: "Escrow Settlement", desc: "A cron worker releases funds to the seller after the 7-day warranty expires." }
      ]
    },
    challenges: [
      {
        title: "Escrow State Synchronization on Webhook Failure",
        description: "Intermittent webhook failures from Razorpay or PayPal left transactions in an unverified state where buyers paid but escrow did not trigger.",
        fix: "Designed an idempotent database ledger. Implemented polling fallbacks that query the payment gateway API directly every 5 minutes to verify status if webhook fails."
      },
      {
        title: "Digital Asset Reclaim Prevention",
        description: "Sellers reclaiming accounts using Supercell recovery after receiving payout.",
        fix: "Developed a mandatory 7-day security window during which the account's registered email must be locked and changed to a platform-owned temporary inbox until the change is permanent."
      }
    ],
    businessValue: "Provides a safe escrow solution for a gaming YouTuber's 50k+ subscriber community, monetizing trade middleman actions while securing members from fraud.",
    lessons: "Handling transactions requires absolute consistency. Atomic DB transactions (`BEGIN...COMMIT`) prevent double-spend or incomplete state updates in case of connection dropouts.",
    futureImprovements: "Full automation of game account checking using Supercell API integrations.",
    color: "#8B5CF6"
  },
  4: {
    title: "Personal Portfolio V2",
    tagline: "A meticulously crafted developer portfolio demonstrating high-end animation and UI/UX design",
    client: "Personal Project",
    period: "July 2026",
    metrics: [
      { label: "Performance Score", value: "98/100" },
      { label: "Animations", value: "Framer Motion" },
      { label: "Architecture", value: "App Router" },
      { label: "Styling", value: "Tailwind CSS" }
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
        { title: "Scroll Orchestration", desc: "Framer Motion's `useScroll` and `useTransform` map scroll position directly to element styles." },
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
    businessValue: "Acts as a primary lead generation tool for freelance clients and a technical showcase for employment opportunities, significantly increasing conversion rates from profile views to direct outreach.",
    lessons: "Animation must serve a purpose and never block the main thread. Prioritizing CSS transforms over layout-triggering properties is essential for 60fps experiences.",
    futureImprovements: "Implementing an interactive 3D WebGL hero background using Three.js.",
    color: "#3B82F6"
  }
};
