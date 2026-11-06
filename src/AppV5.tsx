"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Hero from "./components/Hero";
import SiteNav from "./components/SiteNav";
import StudioLink from "./components/v5/StudioLink";
import { PaperContact } from "./components/v5/Paper";
import Journal from "./components/v10/Journal";
import KineticGrid from "./components/KineticGrid";

const CommandMenu = dynamic(() => import("./components/CommandMenu"), { ssr: false });

/**
 * The portfolio (homepage): the sunset hero, then midnight, ivory and lime.
 * The studio band leads to /atelier; the journal tells the story, the trail
 * of experience and what Rishav carries; then the contact.
 */
export default function AppV5() {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  // GSAP's ticker drives Lenis, and Lenis scrolls drive ScrollTrigger.
  useEffect(() => {
    if (prefersReduced) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [prefersReduced]);

  const content = (
    <main id="main" className="palette-ivory relative min-h-dvh text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-background">
        Skip to content
      </a>
      <SiteNav
        variant="portfolio"
        brandHref="/"
        brandLabel="Rishav Roy, home"
        brand={<span className="font-display text-2xl uppercase leading-none tracking-[0.02em]">Rishav Roy</span>}
        links={[
          { label: "Story", href: "#about" },
          { label: "Experience", href: "#experience" },
          { label: "Skills", href: "#skills" },
        ]}
        other={{ label: "Atelier Systems", href: "/atelier" }}
        cta={{ label: "Get in touch", href: "#contact" }}
      />
      <Hero />
      {/* The cursor-reactive mesh shows through behind the content */}
      <KineticGrid color="#CDF22B" baseOpacity={0.03} boost={0.22} className="mesh-quiet-left" />
      <div className="night afterglow relative z-20 bg-transparent text-ink">
        <StudioLink />
        <Journal />
      </div>
      <PaperContact />
      <CommandMenu />
    </main>
  );

  if (prefersReduced) return content;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, touchMultiplier: 0 }}>
      {content}
    </ReactLenis>
  );
}
