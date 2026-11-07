"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Showcase from "./components/studio/Showcase";
import Faq from "./components/studio/Faq";
import { studioFont } from "./lib/studioFont";
import { PaperContact } from "./components/v5/Paper";

/**
 * Atelier Systems, the studio's own page (/atelier). Its own identity, not
 * the portfolio's: a warm ivory page, deep teal type and a coral accent with
 * a geometric sans (see .studio in globals.css). A floating bar, the work as
 * a showroom, what the studio does and how a project runs, then contact.
 */
export default function AtelierApp() {
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

  const content = (
    <main id="main" className={`studio ${studioFont.variable} relative min-h-dvh`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-background">
        Skip to content
      </a>
      <div className="relative z-20 bg-paper text-ink">
        <header className="sticky top-4 z-40 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-1 rounded-full border border-ink/10 bg-paper/95 py-1.5 pl-4 pr-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] sm:gap-3">
          <Link href="/atelier" aria-label="Atelier Systems, home" className="mr-2 flex items-center gap-2.5">
            <Image src="/brand/atelier-monogram.webp" alt="Atelier Systems logo" width={357} height={292} className="h-auto w-8" priority />
            <span className="hidden whitespace-nowrap text-sm font-medium tracking-[0.14em] lg:inline">ATELIER SYSTEMS</span>
          </Link>
          <nav aria-label="Studio" className="flex items-center gap-1 text-base">
            <a href="#projects" className="hidden rounded-full px-3 py-2 text-ink/70 hover:text-ink sm:inline">Work</a>
            <a href="#process" className="hidden rounded-full px-3 py-2 text-ink/70 hover:text-ink sm:inline">Services</a>
            <Link href="/" className="whitespace-nowrap rounded-full px-3 py-2 text-ink/70 hover:text-ink">Rishav Roy</Link>
            <a href="#contact" className="ml-1 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full bg-rust px-4 font-semibold text-paper transition-opacity hover:opacity-90">
              Start a project
            </a>
          </nav>
        </header>
        <Showcase />
        <Faq />
      </div>
      <PaperContact studio />
    </main>
  );

  if (prefersReduced) return content;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, touchMultiplier: 0 }}>
      {content}
    </ReactLenis>
  );
}
