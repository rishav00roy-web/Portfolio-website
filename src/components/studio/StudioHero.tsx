"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

/*
 * The studio's opening screen. Left: the name, set big, one line, two
 * actions. Right: the AS mark's S swash drawn
 * loose behind real work, set at easy angles: Pheonix, the latest
 * build, in a browser and on a phone, and the support agent mid-answer. The
 * devices rise in one after another.
 */

export default function StudioHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-h-line]", { yPercent: 110, duration: 1.3, stagger: 0.05 })
          .from("[data-h-copy]", { y: 20, opacity: 0, duration: 1, stagger: 0.05 }, "-=0.9")
          .fromTo("[data-h-swash]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", stagger: 0.05 }, 0)
          .from("[data-h-device]", { y: 60, opacity: 0, duration: 1.4, stagger: 0.05 }, 0.3);

      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="studio-title" className="relative mx-auto max-w-[1440px] overflow-hidden px-6 sm:px-12 xl:px-20 lg:overflow-visible">
      <div className="grid min-h-[calc(100dvh-5.5rem)] items-center gap-12 py-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:py-0">
        {/* The words */}
        <div className="relative z-10 min-w-0">
          <h1 id="studio-title" className="font-display text-[17vw] leading-[0.86] sm:text-[8rem] xl:text-[9.5rem]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-h-line className="block">Atelier</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-h-line className="block">
                Systems<span className="text-rust">.</span>
              </span>
            </span>
          </h1>
          <p data-h-copy className="mt-8 max-w-lg text-xl leading-snug text-ink/80 sm:text-2xl">
            A small studio that designs and builds websites, automations and AI tools for growing businesses. Rishav Roy runs it and builds every project himself.
          </p>
          <div data-h-copy className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rust px-7 text-base font-semibold text-paper hover:opacity-90">
              Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#projects" className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-7 text-base hover:border-rust hover:text-rust">
              See the work
            </a>
          </div>
        </div>

        {/* The stage */}
        <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[40rem] sm:aspect-square lg:max-w-none">
          {/* The S swash from the AS mark, drawn loose and large behind the work */}
          <svg viewBox="0 0 600 600" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path data-h-swash pathLength={1} strokeDasharray="1" d="M30 470 C 120 360, 230 560, 320 420 S 430 120, 560 170 C 610 190, 600 260, 540 270" style={{ stroke: "rgba(var(--s-accent-rgb), 0.7)" }} strokeWidth="2" strokeLinecap="round" />
            <path data-h-swash pathLength={1} strokeDasharray="1" d="M70 520 C 170 420, 270 600, 360 460 S 470 180, 590 230" style={{ stroke: "rgba(var(--s-ink-rgb), 0.22)" }} strokeWidth="1.2" strokeLinecap="round" />
            <path data-h-swash pathLength={1} strokeDasharray="1" d="M10 600 C 170 680, 360 520, 470 615 S 620 650, 650 560" style={{ stroke: "rgba(var(--s-accent-rgb), 0.45)" }} strokeWidth="1.6" strokeLinecap="round" />
            <path data-h-swash pathLength={1} strokeDasharray="1" d="M120 120 C 220 40, 360 90, 420 40" style={{ stroke: "rgba(var(--s-ink-rgb), 0.2)" }} strokeWidth="1.2" strokeLinecap="round" />
          </svg>

          {/* Browser */}
          <div data-h-device className="absolute left-[2%] top-[24%] w-[78%]">
            <div data-h-browser className="-rotate-[1.5deg] overflow-hidden rounded-2xl border border-ink/15 bg-paper shadow-[0_18px_36px_-14px_rgba(0,0,0,0.55)]">
              <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 px-3">
                <span className="h-2 w-2 rounded-full bg-ink/25" />
                <span className="h-2 w-2 rounded-full bg-ink/25" />
                <span className="h-2 w-2 rounded-full bg-ink/25" />
                <span className="ml-3 hidden truncate whitespace-nowrap rounded-full bg-ink/[0.06] px-3 py-0.5 font-mono text-[11px] text-ink/55 sm:inline">pheonix-ashy.vercel.app</span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image src="/assets/projects/shots/desktop/pheonix.webp" alt="" fill priority sizes="(max-width: 1023px) 80vw, 36vw" className="object-cover object-top" />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div data-h-device className="absolute right-[4%] top-[34%] w-[25%]">
            <div data-h-phone className="rotate-[3deg] overflow-hidden rounded-[1.6rem] border-4 border-[var(--s-bezel)] bg-paper shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)]">
              <div className="relative aspect-[390/844]">
                <Image src="/assets/projects/shots/mobile/pheonix.webp" alt="" fill sizes="(max-width: 1023px) 25vw, 12vw" className="object-cover object-top" />
              </div>
            </div>
          </div>

          {/* The support agent, mid-answer */}
          <div data-h-device className="absolute bottom-[8%] left-[10%] hidden w-[52%] sm:block">
            <div data-h-chat className="-rotate-1 rounded-3xl border border-moon/25 bg-paper-2/95 p-4 shadow-[0_14px_28px_-12px_rgba(0,0,0,0.5)]">
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-moon px-3.5 py-2 text-sm text-paper">Got the Phoenix Rise Tee in XL?</p>
              <p className="mt-2 w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-ink/[0.07] px-3.5 py-2 text-sm leading-snug text-ink/85">
                It comes in S to XXL. Want me to add XL to your bag?
              </p>
              {/* And it keeps going: a typing indicator */}
              <p className="typing mt-2 flex w-fit gap-1 rounded-2xl rounded-bl-md bg-ink/[0.07] px-3.5 py-3">
                <span className="size-1.5 rounded-full bg-ink/60" />
                <span className="size-1.5 rounded-full bg-ink/60" />
                <span className="size-1.5 rounded-full bg-ink/60" />
              </p>
              <p className="mt-3 text-sm text-ink/55">Support agent, sample</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
