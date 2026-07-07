"use client";

import React from "react";

interface Project {
  id: string;
  title: string;
  tags: string[];
  problem: string;
  solution: string;
  highlights: string[];
  visualType: "cms" | "crm" | "marketplace";
  liveUrl: string;
  sourceUrl: string;
  statusIndicator?: string;
  images?: string[];
}

const projects: Project[] = [
  {
    id: "tea-country-holidays",
    title: "Tea Country Holidays",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
    problem: "A boutique travel agency needed to manage 90+ complex travel packages dynamically, update seasonal pricing, and secure admin routes without writing code or hiring ongoing developers.",
    solution: "Architected a serverless Next.js app integrated with Supabase. Built a custom CMS panel for non-technical admins, wrote a Python scraper to migrate hundreds of legacy CRM entries, secured admin access with RLS (Row Level Security) and middleware checks, and optimized for core web vitals.",
    highlights: ["Custom CMS module for 90+ packages", "Secure middleware-level admin routes", "Python CRM data scraper migration", "SEO & mobile optimizations"],
    visualType: "cms",
    liveUrl: "https://tea-country-holidays.vercel.app/",
    sourceUrl: "",
    images: [
      "/assets/TEA%20COUNTRY%20SITE/Screenshot%202026-07-07%20232203.png",
      "/assets/TEA%20COUNTRY%20SITE/Screenshot%202026-07-07%20232228.png",
      "/assets/TEA%20COUNTRY%20SITE/Screenshot%202026-07-07%20232249.png",
      "/assets/TEA%20COUNTRY%20SITE/Screenshot%202026-07-07%20232308.png",
      "/assets/TEA%20COUNTRY%20SITE/Screenshot%202026-07-07%20232337.png"
    ]
  },
  {
    id: "gym-crm",
    title: "Gym CRM",
    tags: ["HTML5", "CSS3", "JavaScript", "localStorage"],
    problem: "A local gym owner demanded a simple customer tracking and billing manager, but refused to pay for recurring cloud subscription plans or store sensitive client information online.",
    solution: "Designed and deployed a pure client-side, zero-database CRM system that persists data entirely in the browser's localStorage. Integrated OCR scanning via Tesseract.js to migrate client CSV logs, automated offline billing alerts, and upsold automated backup capabilities.",
    highlights: ["LocalStorage-based data persistence", "100% on-premise browser execution", "OCR CSV client-log importer", "Automated billing-automation engine"],
    visualType: "crm",
    liveUrl: "",
    sourceUrl: "",
    statusIndicator: "Internal / Offline Tool",
    images: [
      "/assets/IQ%20IRON%20FITNESS%20GYM%20CRM/Screenshot%202026-07-07%20232423.png",
      "/assets/IQ%20IRON%20FITNESS%20GYM%20CRM/Screenshot%202026-07-07%20232443.png",
      "/assets/IQ%20IRON%20FITNESS%20GYM%20CRM/Screenshot%202026-07-07%20232510.png"
    ]
  },
  {
    id: "clashvault",
    title: "ClashVault",
    tags: ["Next.js", "Supabase", "Razorpay", "PayPal", "Vercel"],
    problem: "A gaming service marketplace required a secure order workflow, escrow payouts, and live event integrations to prevent buyer fraud and coordinate seasonal service spikes.",
    solution: "Created an escrow-style transaction manager that locks payments via API webhooks until order milestones are validated. Built a comprehensive dispute panel, and created a cron-triggered sync engine that aligns marketplace store promotions with Supercell's game event calendar.",
    highlights: ["Escrow order milestone validation", "Multi-processor payment webhook panel", "Supercell calendar sync engine", "Admin dispute-resolution dashboard"],
    visualType: "marketplace",
    liveUrl: "",
    sourceUrl: "",
    statusIndicator: "In Development",
    images: [
      "/assets/CLASHVERSE/Screenshot%202026-07-07%20231838.png",
      "/assets/CLASHVERSE/Screenshot%202026-07-07%20232032.png",
      "/assets/CLASHVERSE/Screenshot%202026-07-07%20232055.png"
    ]
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-28 px-6 max-w-6xl mx-auto border-t border-app-border relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-app-accent rounded-full filter blur-[150px] opacity-[0.03] pointer-events-none" />

      <div className="mb-20">
        <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-app-accent mb-3 font-bold">
          Featured Work
        </h2>
        <p className="font-heading text-4xl sm:text-5xl font-black tracking-tight">
          Problem-Solution Narratives
        </p>
      </div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={project.id}
              className={`flex flex-col lg:flex-row gap-16 lg:items-center ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Narrative Content */}
              <div className="flex-1 space-y-6 relative z-10">
                {/* Project Title & Tags */}
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-app-fg to-app-muted">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-md bg-app-card border border-app-border text-app-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Block */}
                <div className="space-y-2 border-l-2 border-red-500/50 pl-4 py-1">
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-red-500">
                    The Problem
                  </h4>
                  <p className="text-app-muted text-sm sm:text-base leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Solution Block */}
                <div className="space-y-2 border-l-2 border-app-accent/50 pl-4 py-1">
                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-app-accent">
                    The Solution
                  </h4>
                  <p className="text-app-fg text-sm sm:text-base leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Key Details */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-[11px] font-mono text-app-muted">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-app-accent mt-1.5 shadow-[0_0_6px_rgba(var(--color-app-accent-rgb),0.5)]" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Project Links */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-app-border/40 mt-4">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-app-accent/10 border border-app-accent/30 text-app-accent text-xs font-mono uppercase tracking-wider rounded-md hover:bg-app-accent hover:text-app-bg transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2 focus:ring-offset-app-bg">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      Live Site
                    </a>
                  )}
                  {project.sourceUrl && project.sourceUrl !== "#" && (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-app-card border border-app-border text-app-muted hover:text-app-fg text-xs font-mono uppercase tracking-wider rounded-md hover:border-app-border/80 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-app-muted focus:ring-offset-2 focus:ring-offset-app-bg">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /></svg>
                      Source Code
                    </a>
                  )}
                  {(!project.liveUrl || project.liveUrl === "#") && (!project.sourceUrl || project.sourceUrl === "#") && (
                     <span className="text-app-muted/60 text-[10px] font-mono uppercase tracking-widest px-1 py-1">
                       {project.statusIndicator || "Internal / Offline Tool"}
                     </span>
                  )}
                </div>
              </div>

              {/* Project Image Gallery */}
              <div className="flex-1 w-full aspect-video lg:aspect-[4/3] rounded-xl glass-panel shadow-neon-hover overflow-hidden relative shadow-lg group">
                <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory pb-4 mb-[-16px]">
                  {project.images?.length ? (
                    project.images.map((img, i) => (
                      <div key={i} className="min-w-full h-full relative snap-center shrink-0">
                        <img 
                          src={img} 
                          alt={`${project.title} screenshot ${i+1}`} 
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-app-card/30 text-app-muted font-mono text-xs">
                      No images available
                    </div>
                  )}
                </div>
                
                {/* Visual hints for scrolling */}
                {project.images && project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 pointer-events-none">
                    {project.images.map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    ))}
                  </div>
                )}
                
                {/* Scroll Instructions overlay (shows on hover) */}
                {project.images && project.images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white/80 text-[9px] px-2 py-1 rounded font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10 shadow-lg">
                    Scroll ➔
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
