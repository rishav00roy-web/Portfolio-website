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

/*
 * Doodles from a studio sketchbook: loose, single-line drawings of the
 * things the studio makes (a browser, a phone, a chat, code, a cursor, a
 * pencil). Each draws itself once when it scrolls in, then breathes very
 * slowly. Faint ink, decorative only.
 */
const DOODLES = {
  browser: [
    "M8 22 C 40 19, 90 21, 112 20 C 113 45, 111 75, 112 98 C 80 100, 40 99, 9 100 C 7 75, 9 45, 8 22 Z",
    "M8 36 C 45 34, 85 37, 112 35",
    "M16 28 a2 2 0 1 0 0.1 0 M24 28 a2 2 0 1 0 0.1 0 M32 28 a2 2 0 1 0 0.1 0",
    "M20 52 C 40 50, 60 53, 78 51 M20 64 C 45 63, 70 65, 96 63 M20 76 C 35 75, 50 77, 64 76",
  ],
  phone: [
    "M38 8 C 55 6, 72 7, 84 9 C 88 40, 87 80, 85 112 C 70 114, 52 113, 37 111 C 34 80, 35 40, 38 8 Z",
    "M54 16 C 59 15, 64 16, 68 16",
    "M56 104 C 60 103, 64 104, 66 104",
  ],
  chat: [
    "M14 30 C 40 24, 84 25, 106 32 C 110 50, 108 64, 102 72 C 80 76, 60 75, 44 74 L 26 90 L 30 72 C 20 70, 14 66, 12 58 C 10 48, 11 38, 14 30 Z",
    "M34 46 C 50 45, 70 47, 88 45 M34 58 C 46 57, 58 58, 70 57",
  ],
  code: [
    "M44 20 C 30 22, 34 44, 30 56 C 28 62, 22 60, 20 60 C 24 61, 28 62, 30 70 C 34 82, 28 100, 44 100",
    "M76 20 C 90 22, 86 44, 90 56 C 92 62, 98 60, 100 60 C 96 61, 92 62, 90 70 C 86 82, 92 100, 76 100",
    "M54 74 C 58 60, 62 48, 66 44",
  ],
  cursor: [
    "M36 20 C 40 50, 44 76, 46 96 C 52 86, 56 80, 62 76 C 72 90, 78 98, 82 104 C 86 102, 88 100, 90 98 C 84 90, 78 82, 72 72 C 80 70, 88 68, 96 66 C 76 50, 56 34, 36 20 Z",
  ],
  pencil: [
    "M22 98 C 24 90, 26 84, 28 80 C 50 58, 74 34, 92 16 C 98 18, 102 22, 104 28 C 86 46, 62 70, 40 92 C 34 94, 28 96, 22 98 Z",
    "M28 80 C 32 84, 36 88, 40 92 M84 24 C 88 28, 92 32, 96 36",
  ],
} as const;

export type DoodleKind = keyof typeof DOODLES;

export function Doodle({ kind, className = "" }: { kind: DoodleKind; className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current!.querySelectorAll("path"),
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: "power2.inOut",
            stagger: 0.05,
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <svg ref={root} aria-hidden="true" viewBox="0 0 120 120" fill="none" className={`doodle pointer-events-none absolute text-ink/[0.14] ${className}`}>
      {DOODLES[kind].map((d) => (
        <path key={d} d={d} pathLength={1} strokeDasharray="1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
