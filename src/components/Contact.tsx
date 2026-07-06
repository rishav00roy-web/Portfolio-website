"use client";

import React from "react";

export default function Contact() {
  return (
    <footer id="contact" className="py-24 px-6 border-t border-app-border bg-app-card/15">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="font-heading text-xs uppercase tracking-widest text-app-accent font-semibold">
            Get In Touch
          </h2>
          <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-app-fg">
            Let&apos;s Build Something
          </p>
          <p className="text-app-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            I am available for full-stack engineering, AI automation integrations, or custom CMS deployments.
          </p>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 pt-4">
          {/* Email */}
          <a 
            href="mailto:rishav00roy@gmail.com" 
            className="group flex items-center gap-3 font-mono text-sm text-app-muted hover:text-app-fg transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-app-card border border-app-border flex items-center justify-center group-hover:border-app-accent/60 transition-colors">
              <svg className="w-4 h-4 text-app-accent group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span>rishav00roy@gmail.com</span>
          </a>

          {/* GitHub */}
          <a 
            href="https://github.com/rishav00roy-web" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-mono text-sm text-app-muted hover:text-app-fg transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-app-card border border-app-border flex items-center justify-center group-hover:border-app-accent/60 transition-colors">
              <svg className="w-4 h-4 text-app-accent group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <span>GitHub / rishav00roy-web</span>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/rishav-roy-web" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-mono text-sm text-app-muted hover:text-app-fg transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-app-card border border-app-border flex items-center justify-center group-hover:border-app-accent/60 transition-colors">
              <svg className="w-4 h-4 text-app-accent group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <span>LinkedIn / Rishav Roy</span>
          </a>
        </div>

        {/* Footer copyright and diagnostics */}
        <div className="pt-16 border-t border-app-border/40 text-[10px] font-mono text-app-muted flex flex-col sm:flex-row justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Rishav Roy. All rights reserved.</span>
          <span>SYS_STATUS: PRODUCTION // PORTFOLIO_V1.0</span>
        </div>
      </div>
    </footer>
  );
}
