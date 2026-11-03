"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Marquee from "./components/Marquee";
import Hero from "./components/Hero";
import KineticGrid from "./components/KineticGrid";
import Projects from "./components/Projects";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";
import SectionRail from "./components/SectionRail";
import dynamic from "next/dynamic";

// Hidden until invoked (Ctrl+K), so it does not belong in the first-paint bundle.
const CommandMenu = dynamic(() => import("./components/CommandMenu"), { ssr: false });

export default function App() {
  const prefersReduced = useReducedMotion();
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const lenisRef = useRef<LenisRef>(null);

  // One clock for everything: GSAP's ticker drives Lenis, and every Lenis
  // scroll tells ScrollTrigger to update, so pinned and scrubbed sections
  // stay locked to the smoothed scroll position instead of the raw one.
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
    <main className="min-h-screen text-white selection:bg-white/20 selection:text-white relative">
      <Hero />
      <KineticGrid />
      <SectionRail />
      <div className="relative z-10">
        <Marquee />
        <Projects activeProjectId={activeProjectId} setActiveProjectId={setActiveProjectId} />
        <SelectedWork />
        <About />
        <Certificates />
        <Footer />
      </div>
      <CommandMenu onOpenCaseStudy={setActiveProjectId} />
    </main>
  );

  // prefersReduced is `null` during the very first render (before Framer
  // Motion can read the media query) — default to smooth scroll in that
  // brief window rather than flashing native scroll then switching.
  if (prefersReduced) {
    return content;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        touchMultiplier: 0,
        wheelMultiplier: 0.95,
      }}
    >
      {content}
    </ReactLenis>
  );
}
