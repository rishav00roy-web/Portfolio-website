"use client";

import React, { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    // Performance optimization check: disable parallax on mobile or low-power reduced-motion
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (isMobile || prefersReduced) return;

    const heroElement = document.getElementById("hero");
    const bgElement = document.getElementById("hero-bg-glows");
    const textElement = document.getElementById("hero-content");

    if (!heroElement || !bgElement || !textElement) return;

    let scrollY = 0;
    let scheduledAnimationFrame = false;
    let isHeroInView = true;

    // Intersection Observer ensures the scroll listener only updates DOM when Hero is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroInView = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(heroElement);

    const onScroll = () => {
      scrollY = window.scrollY;
      if (scheduledAnimationFrame || !isHeroInView) return;

      scheduledAnimationFrame = true;
      requestAnimationFrame(() => {
        // GPU-accelerated parallax zoom and translation (transform and opacity only)
        // Background glows translate slower (30% speed) and zoom out slightly (scale multiplier)
        const bgTranslateY = scrollY * 0.35;
        const bgScale = 1 + scrollY * 0.0004; // subtle parallax zoom
        
        // Text translates at 15% speed and fades out as it scrolls
        const textTranslateY = scrollY * 0.18;
        const textOpacity = Math.max(0, 1 - scrollY / 550);

        bgElement.style.transform = `translate3d(0, ${bgTranslateY}px, 0) scale(${bgScale})`;
        textElement.style.transform = `translate3d(0, ${textTranslateY}px, 0)`;
        textElement.style.opacity = `${textOpacity}`;

        scheduledAnimationFrame = false;
      });
    };

    // Passive listener keeps touch scroll scrolling thread free
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[600px] md:min-h-[700px] flex flex-col justify-center items-center px-6 py-20 text-center overflow-hidden tech-dots"
    >
      {/* Background Ambient Glows - Animated in Parallax Zoom */}
      <div 
        id="hero-bg-glows"
        className="absolute inset-0 pointer-events-none w-full h-full flex justify-center items-center select-none"
        style={{ willChange: "transform" }}
      >
        <div className="absolute w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-app-accent rounded-full filter blur-[100px] sm:blur-[130px] opacity-[0.07] sm:opacity-[0.11] pointer-events-none" />
        <div className="absolute w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-app-accent-sec rounded-full filter blur-[100px] sm:blur-[130px] opacity-[0.05] sm:opacity-[0.08] pointer-events-none translate-x-12 translate-y-8" />
      </div>

      {/* Content Container - Animated in Parallax Translation & Fade */}
      <div 
        id="hero-content"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Name / Title */}
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-black tracking-tight mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-br from-app-fg to-app-muted">
            Rishav Roy
          </span>
          <span className="inline-block mt-3 text-xs sm:text-sm font-mono font-bold text-app-accent uppercase tracking-[0.25em] bg-app-accent/5 border border-app-accent/15 px-3 py-1 rounded">
            Full-Stack Developer
          </span>
        </h1>

        {/* Pitch */}
        <p className="max-w-xl text-base sm:text-lg md:text-xl text-app-muted font-body font-normal leading-relaxed mb-12">
          building and shipping production web apps through <span className="text-app-fg font-semibold">AI-augmented development</span>
        </p>

        {/* Scroll Indicator containing the F1 Starting Lights Easter Egg */}
        <a 
          href="#projects" 
          className="group flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-app-muted hover:text-app-accent transition-colors"
        >
          <span>Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border border-app-border flex flex-col items-center justify-between p-1 bg-app-card backdrop-blur shadow-sm relative">
            {/* Scroll Wheel dot */}
            <div className="w-1 h-2 rounded-full bg-app-accent/80 animate-bounce mt-1" />
            
            {/* Subtle, tiny 5-dot starting lights sequence embedded at the bottom edge */}
            <div className="flex gap-[1.5px] mb-1.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-0.5 h-0.5 rounded-full bg-red-600/30" 
                />
              ))}
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
