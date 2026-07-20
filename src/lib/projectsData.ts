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
    title: "Gym CRM (IQ Iron Fitness)",
    description:
      "A lightweight CRM for gym owners featuring member management, WhatsApp messaging, and a membership expiry tracker. Built as a standalone application optimized for Chrome and Edge, providing a simple interface for tracking fees and membership details.",
    tags: ["HTML", "CSS", "JavaScript", "WhatsApp API", "Member Management"],
    link: "https://github.com/rishav00roy-web/Gym-CRM",
    images: [
      "/assets/projects/gym-1.jpg",
      "/assets/projects/gym-2.jpg",
      "/assets/projects/gym-3.jpg",
    ],
  },
  {
    id: 3,
    title: "ClashVault",
    description:
      "An escrow-secured digital asset marketplace created for the community of a Clash of Clans YouTube creator. This platform manages transaction validation, integrates Razorpay and PayPal for payments, and maintains a secure holding ledger.",
    tags: ["Next.js", "Supabase", "Razorpay", "PayPal", "Escrow Engine", "PostgreSQL"],
    link: "https://github.com/rishav00roy-web/ClashVault",
    images: [
      "/assets/projects/clash-1.jpg",
      "/assets/projects/clash-2.jpg",
      "/assets/projects/clash-3.jpg",
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

export const caseStudiesData: Record<number, any> = {
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
      { label: "Live Demo", url: "https://tea-country-holidays.vercel.app", icon: "live" }
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
    title: "Gym CRM (IQ Iron Fitness)",
    tagline: "Local membership management CRM and OCR document scanning onboarding system",
    client: "IQ Iron Fitness Gym Owner",
    period: "Oct 2025 – Dec 2025",
    metrics: [
      { label: "Active Members Managed", value: "500+" },
      { label: "Member Onboarding Time", value: "-90% reduction" },
      { label: "Renewal Rate Increase", value: "+35%" },
      { label: "Data Input Errors", value: "Near 0%" }
    ],
    tags: ["HTML", "CSS", "JavaScript", "WhatsApp API", "Member Management"],
    links: [
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/Gym-CRM", icon: "github" }
    ],
    problem: "Member onboarding required writing paper forms. Staff then manually entered details into Excel files. This process led to spelling mistakes in email/phone records and missed billing notifications for expiring memberships.",
    solution: "Designed and built a local-first web app utilizing Tesseract.js OCR. Staff scan member photo IDs (e.g., Aadhaar cards) via device camera, automatic text extraction fills the fields, and a local database tracks memberships, scheduling SMS/WhatsApp alerts via a Node.js gateway.",
    architecture: {
      description: "A local-first offline-capable architecture designed to run reliably in basement gyms with spotty internet connection.",
      steps: [
        { title: "Image Capture", desc: "HTML5 Canvas pre-processes live camera stream to maximize contrast." },
        { title: "OCR Parsing", desc: "Tesseract.js executes character recognition directly in-browser." },
        { title: "Local Store", desc: "Data saved in browser IndexedDB to support continuous offline operations." },
        { title: "Gateway Sync", desc: "WhatsApp API sends automatic broadcast templates when connection is online." }
      ]
    },
    challenges: [
      {
        title: "OCR Text Errors from Sub-optimal Lighting",
        description: "Low-quality camera captures in the gym's basement led to incorrect character extraction (OCR accuracy was below 60%).",
        fix: "Wrote a canvas pre-processor applying grayscale filters, high-pass thresholding, and scale-up resampling before passing the image to Tesseract, raising accuracy to 94%."
      },
      {
        title: "Basement Network Deadzones",
        description: "Spotty cellular data prevented membership records from reaching cloud servers, stopping sign-ups.",
        fix: "Restructured the application as a Local-First Web App. Signs ups write to IndexedDB instantly and a service worker syncs records in the background when network is stable."
      }
    ],
    businessValue: "Eliminated paper sign-ups completely for 500+ gym members. Cut onboarding registration time from 6 minutes to 30 seconds. WhatsApp broadcasts improved member retention and dues renewal by 35%.",
    lessons: "Offline-first architectures are crucial for operational systems. Building local-first apps utilizing browser storage makes for bulletproof software.",
    futureImprovements: "Adding fingerprint scanner hardware integration directly via WebAuthn or USB serial API.",
    color: "#10B981"
  },
  3: {
    title: "ClashVault",
    tagline: "Escrow-secured digital gaming assets marketplace and transactions engine",
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
      { label: "GitHub Code", url: "https://github.com/rishav00roy-web/ClashVault", icon: "github" }
    ],
    problem: "Buying and selling high-value gaming accounts within online communities is plagued by scams. Sellers often pull back accounts via security recoveries, and buyers commit chargeback fraud, leading to high transaction distrust.",
    solution: "Architected a secure digital escrow platform. The seller surrenders account credentials, which are verified. The buyer deposits funds into the escrow vault. The platform secures both and schedules account transfers, releasing funds to the seller only after a 7-day security lock.",
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
