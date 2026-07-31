"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ExtraProject {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
}

const extraProjects: ExtraProject[] = [
  {
    id: 1,
    title: "Gym CRM (Offline Local-First)",
    tagline: "Local-first member management system & in-browser OCR Aadhaar scanning",
    description:
      "A commercial-grade offline-first CRM designed for basement gyms with dead cellular zones. Features real-time camera-based OCR text extraction for frictionless member onboarding, and client-side IndexedDB local database replication that automatically queue broadcasts and notifications until internet service resumes.",
    tags: ["Vanilla JS", "IndexedDB", "Tesseract.js OCR", "Local-first", "Service Workers", "HTML5 Canvas"],
    githubUrl: "https://github.com/rishav00roy-web/Gym-CRM",
    accentColor: "#10B981", // Emerald
  },
  {
    id: 2,
    title: "Personal Portfolio V2",
    tagline: "An immersive, animation-driven developer portfolio built with Next.js & React 19",
    description:
      "A meticulously designed developer portfolio highlighting advanced scroll-orchestration and custom fluid UI. Integrates GPU-accelerated spring animations, responsive grid boundaries, a Ctrl+K command menu, theme persistence, and modular CSS-timeline boundaries.",
    tags: ["Next.js 16", "Framer Motion", "Tailwind CSS v4", "React 19", "TypeScript"],
    githubUrl: "https://github.com/rishav00roy-web/Portfolio-website",
    liveUrl: "https://byrishav.online",
    accentColor: "#3B82F6", // Blue
  },
];

export default function ExtraProjects() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="extra-projects" className="relative px-6 sm:px-12 xl:px-24 py-24 sm:py-32 bg-transparent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl xl:text-7xl font-display uppercase tracking-tight text-white mb-4">
            Technical Experiments
          </h2>
          <p className="text-white/50 max-w-xl text-sm sm:text-base font-sans leading-relaxed">
            A curation of side ventures, open-source utilities, and architectural prototypes built to test new front-end patterns and local-first databases.
          </p>
        </div>

        {/* Tab Menu & Details Grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[300px]">
          {/* Left Menu / Tabs */}
          <div className="w-full lg:w-[35%] flex flex-col gap-3 justify-start">
            {extraProjects.map((project, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveTab(idx)}
                  className="relative w-full text-left py-5 px-6 rounded-2xl border border-white/5 bg-[#0f0f0f]/30 hover:bg-[#0f0f0f]/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer group"
                >
                  {/* Sliding Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeExtraTab"
                      className="absolute inset-0 rounded-2xl border bg-white/[0.03]"
                      style={{ borderColor: project.accentColor + "20" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Tab Label */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <span
                        className="text-xs font-mono tracking-widest uppercase mb-1 block"
                        style={{ color: isActive ? project.accentColor : "rgba(255,255,255,0.3)" }}
                      >
                        Experiment 0{idx + 1}
                      </span>
                      <h3
                        className="text-lg sm:text-xl font-display uppercase tracking-wide transition-colors"
                        style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)" }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{
                        color: isActive ? project.accentColor : "rgba(255,255,255,0.3)",
                        opacity: isActive ? 1 : 0.4
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Details Panel */}
          <div className="w-full lg:w-[65%] rounded-3xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient background glow matching active project color */}
            <div
              className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[120px] pointer-events-none opacity-20 transition-all duration-500"
              style={{ backgroundColor: extraProjects[activeTab].accentColor }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col h-full justify-between gap-6"
              >
                <div>
                  <h4 className="text-2xl sm:text-3xl font-display uppercase text-white mb-2 leading-tight">
                    {extraProjects[activeTab].title}
                  </h4>
                  <p
                    className="text-sm font-mono tracking-wide mb-6 uppercase"
                    style={{ color: extraProjects[activeTab].accentColor }}
                  >
                    {extraProjects[activeTab].tagline}
                  </p>
                  <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed mb-6">
                    {extraProjects[activeTab].description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {extraProjects[activeTab].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs font-mono text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <a
                    href={extraProjects[activeTab].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    Source Code
                  </a>
                  {extraProjects[activeTab].liveUrl && (
                    <a
                      href={extraProjects[activeTab].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-black hover:opacity-90 transition-opacity text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer"
                      style={{ backgroundColor: extraProjects[activeTab].accentColor }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Link
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
