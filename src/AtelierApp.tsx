"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Atelier from "./components/v5/Atelier";
import Sheet from "./components/studio/Sheet";
import Showcase from "./components/studio/Showcase";
import { studioFont } from "./lib/studioFont";
import { PaperContact } from "./components/v5/Paper";

/**
 * The studio's own page. Its own identity, not the portfolio's: graphite, chalk
 * and signal lime with a geometric sans (see .studio in globals.css), and its
 * own front door: the Atelier mark in the bar, the studio as the h1, the
 * work, how a project runs, and the contact form.
 */
export default function AtelierApp({ sheet = false, showcase = false }: { sheet?: boolean; showcase?: boolean }) {
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
    <main id="main" className={`studio ${studioFont.variable} relative min-h-screen`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-background">
        Skip to content
      </a>
      <div className="relative z-20 bg-paper text-ink">
        {showcase ? (
          /* Floating pill bar, centred */
          <header className="sticky top-4 z-40 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-1 rounded-full border border-ink/10 bg-paper/95 py-1.5 pl-4 pr-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)] sm:gap-3">
            <Link href="/atelier-3" aria-label="Atelier Systems, home" className="mr-2 flex items-center">
              <Image src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="h-auto w-8" priority />
            </Link>
            <nav aria-label="Studio" className="flex items-center gap-1 text-base">
              <a href="#projects" className="hidden rounded-full px-3 py-2 text-ink/70 hover:text-ink sm:inline">Work</a>
              <a href="#process" className="hidden rounded-full px-3 py-2 text-ink/70 hover:text-ink sm:inline">Studio</a>
              <Link href="/v10" className="whitespace-nowrap rounded-full px-3 py-2 text-ink/70 hover:text-ink">Rishav Roy</Link>
              <a href="#contact" className="ml-1 inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full bg-rust px-4 font-semibold text-paper hover:opacity-90 transition-opacity">
                Start a project
              </a>
            </nav>
          </header>
        ) : (
          <header className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-12 xl:px-20 py-6">
            <Link href={sheet ? "/atelier-2" : "/atelier"} className="flex items-center gap-3" aria-label="Atelier Systems, home">
              <Image src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="h-auto w-9" priority />
              <span className="hidden text-base font-medium tracking-[0.12em] sm:inline">ATELIER SYSTEMS</span>
            </Link>
            <nav aria-label="Studio" className="flex items-center gap-6 text-base">
              <a href="#projects" className="hidden text-ink/70 hover:text-ink sm:inline">Work</a>
              <a href="#process-title" className="hidden text-ink/70 hover:text-ink sm:inline">Process</a>
              <Link href={sheet ? "/v10" : "/v9"} className="whitespace-nowrap text-ink/70 hover:text-ink">Rishav Roy</Link>
              <a href="#contact" className="rounded-full border border-ink/25 px-4 py-2 hover:border-rust hover:text-rust transition-colors">
                Contact
              </a>
            </nav>
          </header>
        )}
        {showcase ? <Showcase /> : sheet ? <Sheet /> : <Atelier asPage />}
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
