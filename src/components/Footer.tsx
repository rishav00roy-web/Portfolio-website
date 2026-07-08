"use client";

import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] text-white px-6 sm:px-12 xl:px-24 py-24 sm:py-32 border-t border-white/10">
      <div className="flex flex-col items-start">
        <h2 className="font-display font-black text-5xl sm:text-8xl uppercase tracking-tight leading-[0.9] mb-10">
          Let&apos;s Build <br /> Something
        </h2>

        <div className="flex flex-col gap-2">
          <a
            href="mailto:rishav2000roy@gmail.com"
            className="group inline-flex items-center gap-3 font-mono text-lg sm:text-2xl text-white/70 hover:text-[#F5B301] transition-colors"
          >
            rishav2000roy@gmail.com
            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
          </a>
          <a
            href="tel:+916001914771"
            className="group inline-flex items-center gap-3 font-mono text-sm sm:text-lg text-white/50 hover:text-[#F5B301] transition-colors"
          >
            +91 60019 14771
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>

        <div className="flex gap-8 mt-16 font-mono text-xs uppercase tracking-widest text-white/40">
          <a href="https://github.com/rishav00roy-web" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/rishav-roy-858b0b365/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="https://instagram.com/justbeingpsunk_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Instagram
          </a>
        </div>

        <p className="mt-24 font-mono text-xs text-white/30 tracking-widest">
          © {new Date().getFullYear()} RISHAV ROY — DESIGNED & DEVELOPED FROM
          KOLKATA.
        </p>
      </div>
    </footer>
  );
}
