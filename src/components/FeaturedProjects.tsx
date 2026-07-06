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
}

const projects: Project[] = [
  {
    id: "tea-country-holidays",
    title: "Tea Country Holidays",
    tags: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
    problem: "A boutique travel agency needed to manage 90+ complex travel packages dynamically, update seasonal pricing, and secure admin routes without writing code or hiring ongoing developers.",
    solution: "Architected a serverless Next.js app integrated with Supabase. Built a custom CMS panel for non-technical admins, wrote a Python scraper to migrate hundreds of legacy CRM entries, secured admin access with RLS (Row Level Security) and middleware checks, and optimized for core web vitals.",
    highlights: ["Custom CMS module for 90+ packages", "Secure middleware-level admin routes", "Python CRM data scraper migration", "SEO & mobile optimizations"],
    visualType: "cms"
  },
  {
    id: "gym-crm",
    title: "Gym CRM",
    tags: ["HTML5", "CSS3", "JavaScript", "localStorage"],
    problem: "A local gym owner demanded a simple customer tracking and billing manager, but refused to pay for recurring cloud subscription plans or store sensitive client information online.",
    solution: "Designed and deployed a pure client-side, zero-database CRM system that persists data entirely in the browser's localStorage. Integrated OCR scanning via Tesseract.js to migrate client CSV logs, automated offline billing alerts, and upsold automated backup capabilities.",
    highlights: ["LocalStorage-based data persistence", "100% on-premise browser execution", "OCR CSV client-log importer", "Automated billing-automation engine"],
    visualType: "crm"
  },
  {
    id: "clashvault",
    title: "ClashVault",
    tags: ["Next.js", "Supabase", "Razorpay", "PayPal", "Vercel"],
    problem: "A gaming service marketplace required a secure order workflow, escrow payouts, and live event integrations to prevent buyer fraud and coordinate seasonal service spikes.",
    solution: "Created an escrow-style transaction manager that locks payments via API webhooks until order milestones are validated. Built a comprehensive dispute panel, and created a cron-triggered sync engine that aligns marketplace store promotions with Supercell's game event calendar.",
    highlights: ["Escrow order milestone validation", "Multi-processor payment webhook panel", "Supercell calendar sync engine", "Admin dispute-resolution dashboard"],
    visualType: "marketplace"
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
              </div>

              {/* Code-Snippet / Wireframe Visual Placeholder */}
              <div className="flex-1 w-full aspect-video lg:aspect-[4/3] rounded-xl glass-panel shadow-neon-hover overflow-hidden relative shadow-lg flex flex-col font-mono text-xs transition-all duration-300">
                {/* Visualizing an ambient radial spot inside the card */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-app-accent rounded-full filter blur-[40px] opacity-[0.1] pointer-events-none" />

                {/* Window Header */}
                <div className="px-5 py-3.5 bg-black/10 border-b border-app-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                  </div>
                  <span className="text-app-muted text-[10px] tracking-widest uppercase font-bold">
                    {project.id}.json
                  </span>
                  <div className="w-4 h-4" /> {/* Spacer */}
                </div>

                {/* Abstract Visual Content */}
                <div className="p-8 flex-1 flex flex-col justify-center bg-gradient-to-br from-app-card/30 to-black/20 relative">
                  {project.visualType === "cms" && (
                    <div className="space-y-5">
                      {/* CMS Package Manager Mock Layout */}
                      <div className="border border-app-border p-4 rounded-lg bg-black/20 backdrop-blur-sm shadow-inner">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-app-accent font-bold text-xs uppercase tracking-wider">CMS://Packages</span>
                          <span className="bg-app-accent/10 border border-app-accent/20 text-app-accent text-[9px] px-2 py-0.5 rounded font-bold">ACTIVE_OK</span>
                        </div>
                        <div className="h-2 w-full bg-app-border rounded-full overflow-hidden">
                          <div className="h-full w-[88%] bg-gradient-to-r from-app-accent to-purple-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-4 text-[10px] text-app-muted">
                          <div>Total: <span className="text-app-fg font-semibold">94</span></div>
                          <div>Scraped: <span className="text-app-fg font-semibold">94</span></div>
                          <div>SSL_Cert: <span className="text-app-fg font-semibold">TLS_1.3</span></div>
                        </div>
                      </div>
                      {/* Code Snippet block */}
                      <div className="text-[10px] text-app-muted/80 space-y-1 bg-black/10 p-3 rounded border border-app-border/40">
                        <div><span className="text-purple-400">const</span> adminOnly = <span className="text-yellow-400">authMiddleware</span>(req =&gt; &#123;</div>
                        <div className="pl-4"><span className="text-purple-400">if</span> (!req.session.isAdmin) <span className="text-purple-400">return</span> <span className="text-red-400">redirect</span>(<span className="text-green-400">&apos;/login&apos;</span>);</div>
                        <div>&#125;);</div>
                      </div>
                    </div>
                  )}

                  {project.visualType === "crm" && (
                    <div className="space-y-5">
                      {/* LocalStorage CRM mock UI */}
                      <div className="border border-app-border p-4 rounded-lg bg-black/20 backdrop-blur-sm shadow-inner space-y-3">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-app-fg font-bold tracking-wider uppercase">localStorage.crm_users</span>
                          <span className="text-green-400 border border-green-500/20 bg-green-500/5 px-2 py-0.5 rounded text-[8px] font-bold">CLIENT_PERSISTED</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex justify-between border-b border-app-border/50 pb-1.5 text-[9px] text-app-muted">
                            <span>Client DB Size</span>
                            <span className="text-app-fg font-semibold">1.24 MB (IndexDB fallback)</span>
                          </div>
                          <div className="flex justify-between border-b border-app-border/50 pb-1.5 text-[9px] text-app-muted">
                            <span>CSV OCR Status</span>
                            <span className="text-app-accent font-semibold">Tesseract.js Engine (Success)</span>
                          </div>
                        </div>
                      </div>
                      {/* LocalStorage visualization graph */}
                      <div className="flex justify-around items-end h-16 pt-2 gap-1.5">
                        {[40, 75, 55, 90, 80, 100].map((h, i) => (
                          <div key={i} className="flex-1 bg-app-border/30 hover:bg-app-accent/40 transition-all duration-200 rounded-t h-full flex flex-col justify-end">
                            <div className="w-full bg-gradient-to-t from-app-accent to-indigo-500 rounded-t" style={{ height: `${h}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.visualType === "marketplace" && (
                    <div className="space-y-4">
                      {/* Escrow timeline map */}
                      <div className="flex justify-between items-center text-[10px] mb-2 text-app-muted border-b border-app-border pb-2">
                        <span>Escrow: TX_#88491</span>
                        <span className="text-yellow-500 bg-yellow-500/5 border border-yellow-500/20 px-2 py-0.5 rounded text-[8px] font-bold">🔒 FUNDS_SECURED</span>
                      </div>
                      
                      <div className="flex items-center justify-between relative py-2 px-1">
                        <div className="absolute left-0 right-0 h-0.5 bg-app-border" />
                        <div className="z-10 w-6 h-6 rounded-full bg-app-accent flex items-center justify-center text-[9px] font-bold text-app-bg shadow-[0_0_8px_rgba(var(--color-app-accent-rgb),0.5)]">1</div>
                        <div className="z-10 w-6 h-6 rounded-full bg-app-accent flex items-center justify-center text-[9px] font-bold text-app-bg shadow-[0_0_8px_rgba(var(--color-app-accent-rgb),0.5)]">2</div>
                        <div className="z-10 w-6 h-6 rounded-full bg-app-border flex items-center justify-center text-[9px] font-bold text-app-muted">3</div>
                      </div>
                      
                      <div className="flex justify-between text-[8px] text-app-muted font-semibold tracking-wider uppercase px-1">
                        <span>Payment Init</span>
                        <span>Service Complete</span>
                        <span>Admin Release</span>
                      </div>

                      <div className="border border-app-border/50 p-2.5 rounded-lg bg-black/15 text-[9px] text-app-muted">
                        <span className="text-pink-400 font-bold">Cron Sync:</span> Supercell Live Calendar API synced at 00:00 UTC (OK)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
