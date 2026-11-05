"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Work from "./Work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * Atelier Systems, Rishav's studio. Every project on the site was built
 * under it, so the studio frames all of the work: what it does, the work
 * itself (the v7 grid and the AI circuit), how a project runs, and the way
 * in. Services and terms are taken from the studio's own quotation; prices
 * and client contacts stay off the page (the quote is confidential).
 */

const SERVICES = [
  { name: "Websites and migrations", detail: "New builds, or an existing HTML site moved to Next.js and React." },
  { name: "Search-ready structure", detail: "Titles, meta, canonical URLs and location pages for local search." },
  { name: "Owner-run admin", detail: "A CMS or dashboard the owner updates without calling a developer." },
  { name: "Integrations", detail: "Maps, payments, booking and the third-party tools a business already uses." },
  { name: "AI agents and automation", detail: "Systems that take repetitive work off a team's plate." },
  { name: "Monthly care", detail: "Updates, fixes and uptime checks after launch. Optional, month to month." },
];

const PROCESS = [
  { name: "A fixed scope", detail: "A written quote listing exactly what gets built." },
  { name: "Half to start", detail: "50% up front, the rest on delivery." },
  { name: "Two rounds of revisions", detail: "Each round is one consolidated list of changes." },
  { name: "Handover", detail: "Once paid in full, the code and access are yours." },
];

/** `asPage`: the studio's own page (/atelier), where its name is the page's h1. */
export default function Atelier({ asPage = false }: { asPage?: boolean }) {
  const Title = asPage ? "h1" : "h2";
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-at-rise]", { y: 32, opacity: 0 });
        ScrollTrigger.batch("[data-at-rise]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out" }),
        });
        gsap.from("[data-at-mark]", {
          opacity: 0,
          scale: 0.9,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-at-mark]", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} id="atelier">
      {/* The studio */}
      <section aria-labelledby="atelier-title" className={`relative mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 ${asPage ? "pt-10 sm:pt-16" : "pt-28 sm:pt-40"}`}>
        {asPage && <div aria-hidden="true" className="studio-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]" />}
        <div className={`relative grid gap-12 lg:items-center ${asPage ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:min-h-[min(40rem,78svh)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end"}`}>
          <div className="min-w-0">
            {!asPage && (
              <Image data-at-mark src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="mb-8 h-auto w-28 sm:w-36 opacity-90" />
            )}
            <Title id="atelier-title" data-at-rise className={`font-display ${asPage ? "text-[15vw] sm:text-8xl xl:text-[8.5rem] leading-[0.9]" : "uppercase text-[13vw] sm:text-7xl xl:text-8xl leading-[0.85] tracking-[-0.02em]"}`}>
              Atelier Systems
            </Title>
            <div data-at-rise className="mt-8 max-w-xl">
              <p className="text-xl sm:text-2xl leading-snug text-ink/85">
                {asPage
                  ? "Websites, automation and AI agents for small businesses. A one-person studio run by Rishav Roy, built end to end."
                  : "My studio. Websites, automation and AI agents for small businesses, built end to end by me."}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/55">Every project below was made under Atelier Systems.</p>
              {asPage && (
                <div className="mt-10 flex flex-wrap gap-3">
                  <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rust px-7 py-3.5 text-base font-semibold text-paper hover:opacity-90 transition-opacity">
                    Start a project
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a href="#projects" className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-7 py-3.5 text-base hover:border-rust hover:text-rust transition-colors">
                    See the work
                  </a>
                </div>
              )}
            </div>
          </div>
          {asPage && (
            <div className="relative hidden min-w-0 lg:block">
              <Image data-at-mark src="/brand/atelier-monogram.webp" alt="" width={357} height={292} priority className="ml-auto h-auto w-full max-w-[26rem] opacity-90" />
            </div>
          )}
        </div>

        <ul data-at-rise className={`${asPage ? "mt-20" : "mt-16"} grid gap-x-10 border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3`}>
          {SERVICES.map((s) => (
            <li key={s.name} className="border-b border-ink/10 py-6">
              <p className="text-xl text-ink/90">{s.name}</p>
              <p className="mt-1.5 text-lg leading-relaxed text-ink/55">{s.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* The work */}
      <Work layout="grid" />

      {/* How a project runs, and the way in */}
      <section aria-labelledby="process-title" className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-8 pb-8">
        <div className="rounded-3xl border border-ink/10 bg-paper-2/60 p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <div data-at-rise>
              <h2 id="process-title" className="font-display uppercase text-4xl sm:text-5xl leading-[0.95]">How a project runs</h2>
              <a
                href="#contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-rust px-6 py-3.5 text-sm font-semibold text-paper hover:opacity-90 transition-opacity"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
            <ol data-at-rise className="grid gap-6 sm:grid-cols-2">
              {PROCESS.map((p, i) => (
                <li key={p.name} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                  <span className="font-display text-2xl leading-none text-rust">{i + 1}</span>
                  <span>
                    <span className="block text-xl">{p.name}</span>
                    <span className="mt-1 block text-lg leading-relaxed text-ink/55">{p.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
