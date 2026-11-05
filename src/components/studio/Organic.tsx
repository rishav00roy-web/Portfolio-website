"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * Softer pieces for the studio page, all taken from the S swash in the AS
 * mark: a loose line that draws itself between sections, and the process
 * as a path that winds past each step, lighting it as you arrive.
 * Stroke dashes on a viewBox that keeps its aspect, so pathLength works;
 * motion is scrubbed to the scroll and skipped for reduced motion.
 */

/** A loose, hand-drawn line between two sections. */
export function Swash({ flip = false }: { flip?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "path",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", stagger: 0.05, scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom 45%", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} aria-hidden="true" className={`mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 ${flip ? "-scale-x-100" : ""}`}>
      <svg viewBox="0 0 1200 160" fill="none" className="h-auto w-full overflow-visible">
        <path pathLength={1} strokeDasharray="1" d="M0 120 C 180 40, 320 160, 520 90 S 860 10, 1010 80 C 1090 118, 1160 70, 1200 40" stroke="rgba(207,224,122,0.6)" strokeWidth="2" strokeLinecap="round" />
        <path pathLength={1} strokeDasharray="1" d="M40 140 C 220 70, 360 170, 560 110 S 900 40, 1200 90" stroke="rgba(232,235,228,0.18)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const PATH = "M24 0 C 44 70, 4 120, 24 190 S 44 310, 22 380 S 2 500, 24 570 S 44 690, 24 760";

/** How a project runs: four steps along a winding path that lights as you go. */
export function ProcessPath({ steps }: { steps: { name: string; detail: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-p-line]",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>("[data-p-step]").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 72%",
            onEnter: () => el.classList.add("is-lit"),
            onLeaveBack: () => el.classList.remove("is-lit"),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root} className="relative mt-12 pl-16">
      <svg aria-hidden="true" viewBox="0 0 48 760" preserveAspectRatio="none" fill="none" className="absolute left-0 top-0 h-full w-12 overflow-visible">
        <path d={PATH} stroke="rgba(232,235,228,0.16)" strokeWidth="1.2" strokeDasharray="3 8" strokeLinecap="round" />
        <path data-p-line d={PATH} pathLength={1} strokeDasharray="1" stroke="rgba(207,224,122,0.85)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <ol className="space-y-12">
        {steps.map((p) => (
          <li key={p.name} data-p-step className="process-step relative">
            <span aria-hidden="true" className="process-lamp absolute -left-[2.85rem] top-2 size-3.5 rounded-full border border-ink/40 bg-paper" />
            <span className="block text-2xl text-ink/90">{p.name}</span>
            <span className="mt-1.5 block text-lg leading-relaxed text-ink/60">{p.detail}</span>
          </li>
        ))}
      </ol>
      <a href="#contact" className="mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-rust px-7 text-base font-semibold text-paper hover:opacity-90">
        Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
