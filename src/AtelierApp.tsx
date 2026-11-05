"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Atelier from "./components/v5/Atelier";
import { PaperContact } from "./components/v5/Paper";

/**
 * The studio's own page. Same night palette and type as the portfolio, its
 * own front door: the Atelier mark in the bar, the studio as the h1, the
 * work, how a project runs, and the contact form.
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
    <main className="relative min-h-screen text-white">
      <div className="night afterglow relative z-20 bg-paper text-ink">
        <header className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-12 xl:px-20 py-6">
          <Link href="/atelier" className="flex items-center gap-3" aria-label="Atelier Systems, home">
            <Image src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="h-auto w-10" priority />
            <span className="text-sm tracking-wide">Atelier Systems</span>
          </Link>
          <nav aria-label="Studio" className="flex items-center gap-5 text-sm">
            <a href="#projects" className="hidden text-ink/70 hover:text-ink sm:inline">Work</a>
            <a href="#process-title" className="hidden text-ink/70 hover:text-ink sm:inline">Process</a>
            <Link href="/v9" className="text-ink/70 hover:text-ink">Rishav Roy</Link>
            <a href="#contact" className="rounded-full border border-ink/25 px-4 py-2 hover:border-rust hover:text-rust transition-colors">
              Contact
            </a>
          </nav>
        </header>
        <Atelier asPage />
      </div>
      <PaperContact />
    </main>
  );

  if (prefersReduced) return content;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, touchMultiplier: 0 }}>
      {content}
    </ReactLenis>
  );
}
