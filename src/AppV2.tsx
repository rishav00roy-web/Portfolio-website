"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Hero from "./components/Hero";
import { PaperAbout, PaperContact, PaperMoreWork, PaperWork } from "./components/v2/Paper";
import BentoWork from "./components/v2/BentoWork";
import WorkSplit from "./components/v2/WorkSplit";
import WorkDoors from "./components/v2/WorkDoors";

const CommandMenu = dynamic(() => import("./components/CommandMenu"), { ssr: false });

/**
 * v2: the same hero, then a sheet of warm paper slides up over the sunset
 * and the rest reads like a printed magazine. Deliberately light on motion:
 * no background canvas, no pinning, a handful of entrance reveals.
 */
export type V2Variant = "paper" | "night" | "bento" | "split" | "doors";

export default function AppV2({ variant = "paper" }: { variant?: V2Variant }) {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

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

  const night = variant !== "paper";

  const content = (
    <main className="relative min-h-screen text-white">
      <Hero />
      <div
        className={
          night
            ? "night afterglow relative z-20 bg-paper text-ink"
            : "relative z-20 -mt-[18vh] rounded-t-[2rem] sm:rounded-t-[3rem] bg-paper text-ink shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.6)]"
        }
      >
        {variant === "doors" ? <WorkDoors /> : variant === "split" ? <WorkSplit /> : variant === "bento" ? <BentoWork /> : <PaperWork />}
        {(variant === "paper" || variant === "night") && <PaperMoreWork />}
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
