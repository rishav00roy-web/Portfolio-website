"use client";

import { FileText } from "lucide-react";
import SocialIcon from "../SocialIcon";
import { PROFILE } from "@/lib/profile";

/*
 * The contact icon row from the live site: layered cards that fan out on
 * hover, each with a small profile card above it.
 */

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

const MailIcon = () => (
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
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);


export default function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 sm:gap-6 ${className}`}>
      <SocialIcon href={PROFILE.resume} download="Rishav-Roy-CV.pdf" label="Resume" username="Download PDF" bio={`Updated ${PROFILE.resumeUpdated}.`} icon={<FileText className="h-5 w-5" />} accentColor="#F5B301" initials="CV" />
      <SocialIcon href="https://github.com/rishav00roy-web" label="GitHub" username="@rishav00roy-web" bio="Full-stack builds, AI-orchestrated projects and technical experiments." icon={<GithubIcon />} accentColor="#2EA44F" initials="GH" />
      <SocialIcon href="https://www.linkedin.com/in/rishav-the-roy/" label="LinkedIn" username="Rishav Roy" bio="Operations and automation specialist, open to new roles." icon={<LinkedinIcon />} accentColor="#0A66C2" initials="in" />
      <SocialIcon href="https://instagram.com/justbeingpsunk_" label="Instagram" username="@justbeingpsunk_" bio="Glimpses of life beyond the screen." icon={<InstagramIcon />} accentColor="#E1306C" initials="IG" />
      <SocialIcon href={`mailto:${PROFILE.email}`} label="Gmail" username={PROFILE.email} bio="Direct contact for commercial builds and professional inquiries." icon={<MailIcon />} accentColor="#EA4335" initials="GM" />
      <SocialIcon href={PROFILE.phoneHref} label="Phone" username={PROFILE.phone} bio="Voice calls or WhatsApp messages about new work." icon={<PhoneIcon />} accentColor="#34A853" initials="PH" />
    </div>
  );
}
