"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, GitBranch, ExternalLink } from "lucide-react";

interface CaseStudyModalProps {
  projectId: number | null;
  onClose: () => void;
}

import { caseStudiesData } from "../lib/projectsData";

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
            className="relative w-full max-w-4xl h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col focus:outline-none z-10 overflow-hidden"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            {/* Kinetic Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

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
            <div className="relative z-10 flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-12">
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
              <div className="flex flex-wrap gap-4 border-b border-white/5 pb-8 relative z-10">
                {data.links.map((link: { label: string; url: string; icon?: string }) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-xl text-sm"
                  >
                    <span>{link.label}</span>
                    {link.icon === "github" ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-[#2EA44F] group-hover:scale-110 transition-transform">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    ) : (
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                    )}
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
                  {data.metrics.map((metric: { label: string; value: string }) => (
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
                  {data.architecture.steps.map((step: { title: string; desc: string }, index: number) => (
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
                  {data.challenges.map((challenge: { title: string; description: string; fix: string }) => (
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
                  {data.tags.map((tag: string) => (
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
