"use client";

import React from "react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto border-t border-app-border">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Heading and metadata */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="font-heading text-xs uppercase tracking-widest text-app-accent mb-3 font-semibold">
              Profile
            </h2>
            <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
              About Rishav
            </p>
          </div>

          <div className="p-4 rounded-lg bg-app-card border border-app-border space-y-3 font-mono text-xs text-app-muted">
            <p className="font-bold text-app-fg uppercase tracking-wider text-[10px]">Developer Profile</p>
            <div className="flex justify-between">
              <span>Focus:</span>
              <span className="text-app-fg">Full-Stack / AI-Dev</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="text-app-fg">Kolkata, India</span>
            </div>
            <div className="flex justify-between">
              <span>Philosophy:</span>
              <span className="text-app-fg">Solve real problems</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Narrative */}
        <div className="lg:col-span-2 space-y-6 text-app-muted text-sm sm:text-base leading-relaxed font-body">
          <p className="text-app-fg font-medium text-lg">
            I build and ship full-stack web applications by directing autonomous AI workflows.
          </p>
          
          <p>
            Rather than writing boilerplate by hand, I focus on architecting robust systems, directing code generation models, and auditing output for security and performance. I treat tools like Claude, Claude Code, Antigravity, Codex, and Kimi K2 as an extension of my developer environment — guiding them through full cycles of implementation, integration, testing, and debugging.
          </p>

          <p>
            I am driven by practical, real-world utility rather than technology for its own sake. If a browser&apos;s local storage is the most efficient and secure database for a client, I will ship it. If a client needs a custom CMS to manage dozens of pages without touching code, I build it.
          </p>

          <div className="border-l-2 border-app-border pl-6 py-1 my-6 space-y-2">
            <h4 className="font-mono text-xs uppercase font-bold text-app-fg tracking-widest">
              Operations & U.S. Public Records (FOIA)
            </h4>
            <p className="text-xs sm:text-sm text-app-muted">
              My background includes professional operations experience and work as a Freedom of Information Act (FOIA) specialist. In this role, I coordinated, parsed, and facilitated complex public records requests for U.S. law enforcement agencies, requiring high attention to detail, regulatory compliance, and analytical sorting of massive documentation databases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
