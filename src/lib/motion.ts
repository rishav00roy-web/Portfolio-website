"use client";

import type { RefObject } from "react";
import { gsap, SplitText, useGSAP } from "./gsap";

/**
 * Shared section motion. Inside `scope`:
 * - `[data-heading]` letters rise out of a mask the first time they scroll in;
 * - `[data-parallax="<n>"]` drifts by n% of its height while it crosses the viewport.
 * Reduced-motion users get the finished state with no animation.
 */
export function useSectionMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const splits = gsap.utils.toArray<HTMLElement>("[data-heading]").map((el) => {
          const split = SplitText.create(el, { type: "lines,chars", mask: "lines" });
          gsap.from(split.chars, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.025,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
          return split;
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 10;
          gsap.fromTo(
            el,
            { yPercent: amount },
            {
              yPercent: -amount,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        return () => splits.forEach((s) => s.revert());
      });
      return () => mm.revert();
    },
    { scope },
  );
}
