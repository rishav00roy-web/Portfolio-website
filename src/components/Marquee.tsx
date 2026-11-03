"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const ROWS = [
  ["Operations", "Automation", "Custom CRMs", "FOIA at scale", "Procurement"],
  ["Next.js", "Supabase", "Local-first", "Billing engines", "Technical SEO"],
];

/**
 * Two bands of oversized type that drift in opposite directions and speed
 * up with scroll velocity, the way the old horizon would blur past from a
 * moving car. Purely decorative: the same words live in About and Skills.
 */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const bands = gsap.utils.toArray<HTMLElement>("[data-band]");
        const loops = bands.map((band, i) =>
          gsap.to(band, {
            xPercent: i % 2 === 0 ? -50 : 0,
            startAt: { xPercent: i % 2 === 0 ? 0 : -50 },
            duration: 38,
            ease: "none",
            repeat: -1,
          }),
        );

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
            loops.forEach((loop) => {
              gsap.to(loop, { timeScale: boost * self.direction, duration: 0.2, overwrite: true });
              gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
            });
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="relative overflow-hidden py-14 sm:py-20 border-y border-white/[0.06] select-none pointer-events-none"
    >
      {ROWS.map((words, i) => (
        <div key={i} data-band className="flex w-max whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {words.map((w) => (
                <span key={w} className="flex items-center">
                  <span
                    className={
                      i === 0
                        ? "font-display uppercase text-[16vw] sm:text-[9vw] leading-[0.95] text-white"
                        : "font-display uppercase text-[16vw] sm:text-[9vw] leading-[0.95] text-transparent [-webkit-text-stroke:1.5px_rgba(245,179,1,0.55)]"
                    }
                  >
                    {w}
                  </span>
                  <span className="mx-[3vw] font-coffekan text-[8vw] sm:text-[4vw] text-accent">&amp;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
