"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface SocialIconProps {
  href: string;
  label: string;
  username: string;
  bio: string;
  icon: React.ReactNode;
  accentColor: string;
  initials: string;
  download?: string;
}

// Keep this much clear space between a tooltip and the screen edge.
const VIEWPORT_GUTTER = 12;

export default function SocialIcon({
  href,
  label,
  username,
  bio,
  icon,
  accentColor,
  initials,
  download,
}: SocialIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // The tooltip is centred on its icon by the wrapper's `align-items: center`,
  // but it's far wider than the 44px icon — so for icons near either screen
  // edge it hangs off-screen (and drags the document's scrollWidth with it).
  // Measure where it *would* sit and shift it back inside the viewport.
  const [offsetX, setOffsetX] = useState(0);

  const clamp = useCallback(() => {
    const wrapper = wrapperRef.current;
    const tooltip = tooltipRef.current;
    if (!wrapper || !tooltip) return;

    const iconBox = wrapper.getBoundingClientRect();
    const iconCenter = iconBox.left + iconBox.width / 2;
    const halfWidth = tooltip.offsetWidth / 2;

    // Where the tooltip sits with no correction applied.
    const naturalLeft = iconCenter - halfWidth;
    const naturalRight = iconCenter + halfWidth;
    const viewportWidth = document.documentElement.clientWidth;

    let shift = 0;
    if (naturalLeft < VIEWPORT_GUTTER) {
      shift = VIEWPORT_GUTTER - naturalLeft;
    } else if (naturalRight > viewportWidth - VIEWPORT_GUTTER) {
      shift = viewportWidth - VIEWPORT_GUTTER - naturalRight;
    }
    setOffsetX(shift);
  }, []);

  useEffect(() => {
    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [clamp]);

  // Re-measure on open too, in case the row re-wrapped since mount.
  useEffect(() => {
    if (showTooltip) clamp();
  }, [showTooltip, clamp]);

  return (
    <div
      ref={wrapperRef}
      className="social-icon-wrapper"
      style={{ ["--accent" as string]: accentColor }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        ref={tooltipRef}
        className="absolute bottom-full mb-3 w-56 sm:w-64 max-w-[calc(100vw-1.5rem)] rounded border border-white/10 bg-[#0f0f0f] p-3 shadow-xl transition-all duration-200 origin-bottom z-50"
        style={{
          opacity: showTooltip ? 1 : 0,
          transform: showTooltip
            ? `translate(${offsetX}px, -6px) scale(1)`
            : `translate(${offsetX}px, 0px) scale(0.96)`,
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

        {/* Arrow — counter-shifted so it keeps pointing at the icon */}
        <div
          className="absolute left-1/2 -bottom-[5px] w-2 h-2 bg-[#0f0f0f] border-r border-b border-white/10"
          style={{ transform: `translateX(calc(-50% - ${offsetX}px)) rotate(45deg)` }}
        />
      </div>

      {/* Icon link */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
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
      <span className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-white/50 sm:hidden">
        {label}
      </span>
    </div>
  );
}
