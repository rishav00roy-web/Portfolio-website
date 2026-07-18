"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, GitBranch, ExternalLink } from "lucide-react";

interface CaseStudyModalProps {
  projectId: number | null;
  onClose: () => void;
}

const caseStudiesData: Record<number, {
  title: string;
  tagline: string;
  client: string;
  period: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  links: { label: string; url: string; icon: "github" | "live" }[];
  problem: string;
  solution: string;
  architecture: {
    description: string;
    steps: { title: string; desc: string }[];
  };
  challenges: { title: string; description: string; fix: string }[];
  businessValue: string;
  lessons: string;
  futureImprovements: string;
  color: string;
}> = {
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
    tags: ["HTML", "JavaScript", "OCR (Tesseract)", "WhatsApp Business API", "Billing Engine", "IndexedDB", "Tailwind"],
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
  }
};

export default function CaseStudyModal({ projectId, onClose }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (projectId !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [projectId, onClose]);

  // Trap focus inside modal
  useEffect(() => {
    if (projectId === null) return;
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstEl = focusableElements[0] as HTMLElement;
    const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleTab);
    firstEl.focus();

    return () => {
      window.removeEventListener("keydown", handleTab);
    };
  }, [projectId]);

  const data = projectId !== null ? caseStudiesData[projectId] : null;

  return (
    <AnimatePresence>
      {projectId !== null && data && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={modalRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col focus:outline-none z-10"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md px-6 sm:px-10 py-5 border-b border-white/10 flex items-center justify-between z-20">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40">
                <GitBranch className="w-4 h-4 text-accent" />
                <span>Case Study</span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 text-white/50 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-12">
              {/* Project Title & Tagline */}
              <div>
                <h1 id="case-study-title" className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-white leading-none">
                  {data.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/60 font-sans mt-4 max-w-3xl leading-relaxed">
                  {data.tagline}
                </p>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap gap-4 border-b border-white/5 pb-8">
                {data.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/80 transition-colors text-sm"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">Client</span>
                  <span className="block text-sm font-medium mt-1 text-white">{data.client}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">Period</span>
                  <span className="block text-sm font-medium mt-1 text-white">{data.period}</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">Services</span>
                  <span className="block text-sm font-medium mt-1 text-white">Full-Stack Dev</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-white/40">Scale</span>
                  <span className="block text-sm font-medium mt-1 text-accent">Commercial</span>
                </div>
              </div>

              {/* Key Metrics Board */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-6">
                  Key Metrics & Impact
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.metrics.map((metric) => (
                    <div key={metric.label} className="border border-white/5 bg-[#0f0f0f] p-5 rounded-xl">
                      <span className="block text-2xl sm:text-3xl font-extrabold text-white font-display uppercase tracking-tight">
                        {metric.value}
                      </span>
                      <span className="block text-xs text-white/50 mt-1 font-sans font-medium">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-4">
                    The Problem
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base font-sans">
                    {data.problem}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-4">
                    The Solution
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base font-sans">
                    {data.solution}
                  </p>
                </div>
              </div>

              {/* System Architecture Flow */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-6">
                  System Architecture
                </h3>
                <p className="text-white/70 text-sm font-sans mb-6">
                  {data.architecture.description}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                  {data.architecture.steps.map((step, index) => (
                    <div key={step.title} className="relative border border-white/10 bg-[#0f0f0f] p-5 rounded-xl flex flex-col">
                      <span className="absolute top-4 right-4 font-mono text-xs text-white/20 font-bold">
                        0{index + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono">
                        {step.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed font-sans">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-6">
                  Technical Challenges & Resolution
                </h3>
                <div className="space-y-6">
                  {data.challenges.map((challenge) => (
                    <div key={challenge.title} className="border border-white/10 bg-[#0c0c0c] p-6 rounded-xl space-y-3">
                      <div className="flex items-start gap-2.5 text-rose-500 font-bold text-sm sm:text-base uppercase tracking-wider font-mono">
                        <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                        <span>{challenge.title}</span>
                      </div>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed pl-7 font-sans">
                        <strong>Challenge:</strong> {challenge.description}
                      </p>
                      <p className="text-white/90 text-xs sm:text-sm leading-relaxed pl-7 font-sans">
                        <strong>Resolution:</strong> <span className="text-accent">{challenge.fix}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Value & Lessons */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-4">
                    Business Value Delivered
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base font-sans">
                    {data.businessValue}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-4">
                    Engineering Lessons
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm sm:text-base font-sans">
                    {data.lessons}
                  </p>
                </div>
              </div>

              {/* Tech Stack List */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-2 mb-4">
                  Technologies Utilized
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <span key={tag} className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Future Improvements */}
              <div className="border border-dashed border-white/20 p-6 rounded-2xl bg-white/[0.01]">
                <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">Future Roadmap</h4>
                <p className="text-white/60 text-xs sm:text-sm font-sans">{data.futureImprovements}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
