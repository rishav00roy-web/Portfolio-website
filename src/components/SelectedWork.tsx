"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import StackingCards, { StackingCardItem } from "./StackingCards";
import { cn } from "@/lib/utils";

interface SelectedProject {
  id: number;
  title: string;
  kicker: string;
  category: string;
  place: string;
  description: string;
  tags: string[];
  imageSrc: string;
  githubUrl?: string;
  liveUrl?: string;
  badge: string;
  bgClass: string;
  accentColor: string;
  accentDot: string;
}

const otherProjects: SelectedProject[] = [
  {
    id: 1,
    title: "Agentic Job Tracker",
    kicker: "TURBOREPO MONOREPO · ATS INGESTION & EMAIL PIPELINE",
    category: "AGENTIC TOOL",
    place: "KOLKATA, INDIA",
    description:
      "Agentic job application and intelligence platform (Turborepo monorepo). ATS ingestion and scoring engine across 54 platforms, autonomous email tracker that moves Kanban cards on interview/rejection emails, and a truth-guarded resume tailorer.",
    tags: ["Next.js 16", "Turborepo", "Supabase", "IMAP Engine", "Claude AI"],
    imageSrc: "/assets/projects/job-tracker-full.png",
    githubUrl: "https://github.com/rishav00roy-web/JOB-TRACKER-AND-EMAIL-TRACKER",
    badge: "Production Monorepo",
    bgClass: "bg-[#0b1613] border-emerald-500/25",
    accentColor: "text-emerald-400",
    accentDot: "bg-emerald-400",
  },
  {
    id: 2,
    title: "Gym CRM (Offline Local-First)",
    kicker: "OFFLINE FIRST · LOCAL DATABASE & OCR",
    category: "OFFLINE CRM",
    place: "KOLKATA, INDIA",
    description:
      "Commercial-grade offline-first CRM designed for basement gyms with dead cellular zones. Features real-time camera-based OCR text extraction for frictionless member onboarding, and client-side IndexedDB local database replication.",
    tags: ["Vanilla JS", "IndexedDB", "Tesseract.js OCR", "Service Workers"],
    imageSrc: "/assets/projects/gym-crm-full.png",
    githubUrl: "https://github.com/rishav00roy-web/Gym-CRM",
    badge: "Local-First Architecture",
    bgClass: "bg-[#081510] border-emerald-500/20",
    accentColor: "text-emerald-400",
    accentDot: "bg-emerald-400",
  },
  {
    id: 3,
    title: "Personal Portfolio V2",
    kicker: "NEXT.JS 16 · FRAMER MOTION · TURBOPACK",
    category: "INTERACTIVE UI",
    place: "KOLKATA, INDIA",
    description:
      "A meticulously designed developer portfolio highlighting advanced scroll-orchestration and fluid UI. Integrates GPU spring animations, responsive grid boundaries, a command menu, and modular CSS-timeline boundaries.",
    tags: ["Next.js 16", "Framer Motion", "Tailwind CSS v4", "React 19"],
    imageSrc: "/assets/projects/portfolio-v2-full.png",
    githubUrl: "https://github.com/rishav00roy-web/Portfolio-website",
    liveUrl: "https://byrishav.online",
    badge: "Production V2",
    bgClass: "bg-[#090e18] border-sky-500/20",
    accentColor: "text-sky-400",
    accentDot: "bg-sky-400",
  },
  {
    id: 4,
    title: "TruWest Mortgage",
    kicker: "FINTECH · MORTGAGE CALCULATOR SUITE",
    category: "MORTGAGE SUITE",
    place: "CALIFORNIA, USA",
    description:
      "Full-suite mortgage application with interactive loan calculators, payment schedule modelling, real-time rate tables, and lead origination workflows built for modern mortgage advisors.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Financial Engine"],
    imageSrc: "/assets/projects/truwest-full.png",
    githubUrl: "https://github.com/rishav00roy-web/Truwest-company-page-",
    badge: "Financial Engine",
    bgClass: "bg-[#140e06] border-amber-500/20",
    accentColor: "text-amber-400",
    accentDot: "bg-amber-400",
  },
  {
    id: 5,
    title: "Willchris Kennels",
    kicker: "PORTAL & BREEDING RESERVATIONS",
    category: "RESERVATIONS",
    place: "UNITED KINGDOM",
    description:
      "Modern web portal and booking reservation workflow for a premier kennel facility, featuring pedigree records, deposit handling, and client intake management.",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
    imageSrc: "/assets/projects/willchris-full.png",
    githubUrl: "https://github.com/rishav00roy-web/Chriskennelsite",
    badge: "Client Portal",
    bgClass: "bg-[#16080e] border-rose-500/20",
    accentColor: "text-rose-400",
    accentDot: "bg-rose-400",
  },
  {
    id: 6,
    title: "Roy Group",
    kicker: "EDITORIAL · THREE LUXURY HOUSES",
    category: "EDITORIAL WEB",
    place: "HYDERABAD, INDIA",
    description:
      "High-fashion editorial web platform designed across three luxury event and production houses with bespoke typographic hierarchies and CSS scroll-driven timelines.",
    tags: ["Next.js", "React 19", "CSS Scroll Timeline", "Editorial Design"],
    imageSrc: "/assets/projects/roy-group-full.jpg",
    githubUrl: "https://github.com/rishav00roy-web/Roy-and-co-website",
    badge: "Editorial System",
    bgClass: "bg-[#180816] border-purple-500/20",
    accentColor: "text-purple-400",
    accentDot: "bg-purple-400",
  },
];

export default function SelectedWork() {
  const total = otherProjects.length;

  return (
    <section id="selected-work" className="relative w-full bg-transparent py-12 lg:py-20">
      <StackingCards
        totalCards={total}
        scaleMultiplier={0.012}
        className="relative w-full"
      >
        {otherProjects.map((project, i) => (
          <StackingCardItem
            key={project.id}
            index={i}
            className="h-screen py-2 sm:py-4 px-3 sm:px-6 xl:px-12"
          >
            <div
              className={cn(
                "w-full max-w-[1360px] h-[470px] sm:h-[500px] lg:h-[510px] xl:h-[530px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border flex flex-col justify-between lg:grid lg:grid-cols-12 text-[#f3f1ea] transform-gpu",
                project.bgClass
              )}
            >
              {/* Left Column: Editorial Information & Directory */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between p-4 sm:p-5 lg:p-6 xl:p-7 z-10 shrink-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {/* Header Lockup */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#f3f1ea]/50 truncate">
                      0{total} PROJECTS ACROSS ARCHITECTURES
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1" aria-hidden="true">
                        {Array.from({ length: total }).map((_, pipIdx) => (
                          <span
                            key={pipIdx}
                            className={cn(
                              "h-1 rounded-full transition-all duration-300",
                              pipIdx === i
                                ? "w-3 sm:w-4 bg-amber-400"
                                : pipIdx < i
                                ? "w-1 sm:w-1.5 bg-white/40"
                                : "w-1 sm:w-1.5 bg-white/15"
                            )}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#f3f1ea]/60 font-semibold">
                        0{i + 1} / 0{total}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-display uppercase tracking-tight text-white leading-none mb-2 sm:mb-2.5">
                    SELECTED{" "}
                    <span className="font-coffekan italic lowercase tracking-normal text-amber-300/90 font-normal">
                      work
                    </span>
                  </h2>

                  {/* Project Details */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <p className={cn("font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold", project.accentColor)}>
                      {project.kicker}
                    </p>

                    <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-display uppercase tracking-tight text-white leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-[#f3f1ea]/70 max-w-md leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>

                    <p className="font-mono text-[9px] uppercase tracking-widest text-[#f3f1ea]/70">
                      {project.place}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-white/10 border border-white/20 text-white/90 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="hidden sm:inline-flex px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-white/10 border border-white/20 text-white/90 rounded-full">
                          {project.tags[3]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-2.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white text-black text-[11px] sm:text-xs font-medium hover:bg-white/90 transition-all duration-200 cursor-pointer shadow-md group"
                      >
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 bg-white/5 text-[11px] sm:text-xs text-white/90 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Directory List */}
                <div className="hidden lg:block mt-2 pt-2 border-t border-white/10">
                  <ol className="flex flex-col gap-0.5">
                    {otherProjects.map((p, pIdx) => {
                      const isCurrent = pIdx === i;
                      return (
                        <li
                          key={p.id}
                          className={cn(
                            "flex items-center justify-between text-xs py-0.5 transition-colors",
                            isCurrent
                              ? "text-white font-medium"
                              : "text-white/70"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "font-mono text-[10px]",
                                isCurrent ? "text-amber-400 font-semibold" : "text-white/60"
                              )}
                            >
                              0{pIdx + 1}
                            </span>
                            <span
                              className={cn(
                                "font-display uppercase tracking-wider text-[11px]",
                                isCurrent ? "text-white" : "text-white/75"
                              )}
                            >
                              {p.title}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] uppercase text-white/60 tracking-wider">
                            {p.category}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>

              {/* Right Column: Visual Stage (Exact Aspect Ratio Framing - No Letterboxing) */}
              <div className="lg:col-span-7 xl:col-span-8 relative flex items-center justify-center p-2.5 sm:p-3 lg:p-4 xl:p-5 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/40 overflow-hidden">
                <div className="relative w-full aspect-[1024/529] max-h-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-black/90 group flex items-center justify-center">
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} preview`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 65vw, 900px"
                    className="object-cover pointer-events-none group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                  {/* Subtle top and bottom atmospheric vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                  {/* Floating pill badge pinned neatly to image */}
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/85 border border-white/20 text-white/90 text-[9px] sm:text-[10px] font-mono backdrop-blur-md z-10 shadow-lg">
                    <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", project.accentDot)} />
                    <span>{project.badge}</span>
                  </div>
                </div>
              </div>
            </div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </section>
  );
}
