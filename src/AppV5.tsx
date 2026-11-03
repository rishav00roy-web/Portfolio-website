"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Hero from "./components/Hero";
import WorkDoors from "./components/v5/WorkDoors";
import { PaperAbout, PaperContact } from "./components/v5/Paper";

const CommandMenu = dynamic(() => import("./components/CommandMenu"), { ssr: false });

/**
 * v5, the chosen direction (in progress, served at /v5): the same hero, then
 * everything stays in the hero's night palette. Websites and the AI work sit
 * behind "two doors" with their own light (amber vs moonlight). Motion below
 * the hero is limited to batched transform/opacity entrances.
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
    <main className="relative min-h-screen text-white">
      <Hero />
      <div className="night afterglow relative z-20 bg-paper text-ink">
        <WorkDoors />
        <PaperAbout />
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
