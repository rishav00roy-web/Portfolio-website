"use client";

import React from "react";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI Development Tools",
    skills: ["Claude", "Claude Code", "Antigravity/Gemini", "Codex", "Kimi K2"]
  },
  {
    title: "Frontend",
    skills: ["Next.js (App Router)", "React 19", "Tailwind CSS v4", "JavaScript (ES6+)"]
  },
  {
    title: "Backend & Data",
    skills: ["Supabase", "PostgreSQL", "Python", "REST APIs"]
  },
  {
    title: "Other / Fundamentals",
    skills: ["Vercel", "GitHub", "Razorpay / PayPal API", "OCR / Tesseract.js", "Web Security Fundamentals"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 max-w-6xl mx-auto border-t border-app-border relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-app-accent-sec rounded-full filter blur-[150px] opacity-[0.02] pointer-events-none" />

      <div className="mb-20">
        <h2 className="font-heading text-xs uppercase tracking-[0.2em] text-app-accent mb-3 font-bold">
          Technical Stack
        </h2>
        <p className="font-heading text-4xl sm:text-5xl font-black tracking-tight">
          Capabilities & Toolkit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category) => (
          <div 
            key={category.title}
            className="p-6 rounded-2xl glass-panel shadow-neon-hover flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.15em] text-app-fg mb-5 pb-2.5 border-b border-app-border/40">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="font-mono text-[10px] px-2.5 py-1.5 rounded-md bg-black/15 border border-app-border text-app-muted hover:text-app-fg hover:border-app-accent hover:bg-app-accent/5 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Tech vibe line detail */}
            <div className="mt-8 pt-3 flex items-center justify-between text-[9px] font-mono text-app-muted/40 border-t border-app-border/20 select-none">
              <span>SYS_INITIALIZED</span>
              <span className="text-app-accent">100% OK</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
