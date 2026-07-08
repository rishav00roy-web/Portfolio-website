"use client";

import { ArrowUpRight } from "lucide-react";
import SocialIcon from "./SocialIcon";

const GithubIcon = () => (
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
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
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
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
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
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

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

        <div className="flex gap-6 mt-16">
          <SocialIcon
            href="https://github.com/rishav00roy-web"
            label="GitHub"
            username="@rishav00roy-web"
            bio="Full-stack projects, AI-orchestrated builds, and experiments."
            icon={<GithubIcon />}
            accentColor="#2EA44F"
            initials="GH"
          />
          <SocialIcon
            href="https://www.linkedin.com/in/rishav-roy-858b0b365/"
            label="LinkedIn"
            username="Rishav Roy"
            bio="Full-stack developer. Open to opportunities."
            icon={<LinkedinIcon />}
            accentColor="#0A66C2"
            initials="in"
          />
          <SocialIcon
            href="https://instagram.com/justbeingpsunk_"
            label="Instagram"
            username="@justbeingpsunk_"
            bio="Life outside the code."
            icon={<InstagramIcon />}
            accentColor="#E1306C"
            initials="IG"
          />
        </div>

        <p className="mt-24 font-mono text-xs text-white/30 tracking-widest">
          © {new Date().getFullYear()} RISHAV ROY — DESIGNED & DEVELOPED FROM
          KOLKATA.
        </p>
      </div>
    </footer>
  );
}
