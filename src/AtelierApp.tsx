"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "./lib/gsap";
import Showcase from "./components/studio/Showcase";
import SiteNav from "./components/SiteNav";
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
        <SiteNav
          variant="studio"
          brandHref="/atelier"
          brandLabel="Atelier Systems, home"
          brand={
            <>
              <Image src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="h-auto w-8" priority />
              <span className="font-display text-2xl leading-none">Atelier Systems</span>
            </>
          }
          links={[
            { label: "Work", href: "#projects" },
            { label: "Clients", href: "#clients" },
            { label: "Services", href: "#process" },
            { label: "FAQ", href: "#faq" },
          ]}
          other={{ label: "Rishav Roy", href: "/" }}
          cta={{ label: "Start a project", href: "#contact" }}
        />
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
