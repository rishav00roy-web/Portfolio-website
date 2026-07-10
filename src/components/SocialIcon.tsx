"use client";

import React, { useState } from "react";

interface SocialIconProps {
  href: string;
  label: string;
  username: string;
  bio: string;
  icon: React.ReactNode;
  accentColor: string;
  initials: string;
}

export default function SocialIcon({
  href,
  label,
  username,
  bio,
  icon,
  accentColor,
  initials,
}: SocialIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    <div
      className="social-icon-wrapper"
      style={{ ["--accent" as string]: accentColor }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div
        className="absolute bottom-full mb-3 w-56 sm:w-64 rounded border border-white/10 bg-[#0f0f0f] p-3 shadow-xl transition-all duration-200 origin-bottom"
        style={{
          opacity: showTooltip ? 1 : 0,
          transform: showTooltip
            ? "translateY(-6px) scale(1)"
            : "translateY(0px) scale(0.96)",
          pointerEvents: showTooltip ? "auto" : "none",
        }}
        aria-hidden={!showTooltip}
      >
        {/* Accent top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t"
          style={{ backgroundColor: accentColor }}
        />

        {/* Profile row */}
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-black flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {initials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-xs font-medium truncate">
              {label}
            </span>
            <span className="text-white/40 text-[10px] font-mono truncate">
              {username}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-white/50 text-[10px] leading-relaxed">{bio}</p>

        {/* Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[5px] w-2 h-2 rotate-45 bg-[#0f0f0f] border-r border-b border-white/10" />
      </div>

      {/* Icon link */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="icon focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
        aria-label={label}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        <div className="layer">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="fab">
            <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
          </span>
        </div>
      </a>

      {/* Label below icon (visible on touch) */}
      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-white/30 sm:hidden">
        {label}
      </span>
    </div>
  );
}
