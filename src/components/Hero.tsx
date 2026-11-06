"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/*
 * The hero is one photograph split into two plates: the sky, and the ridge
 * cut out of it (an alpha matte derived from hero-bg.jpg). The name is set
 * between them, so it rises from behind the mountains; scrolling sinks it
 * back down like the sun going behind the peaks. Both plates share every
 * transform so the cut line never drifts.
 *
 * The screen carries one idea: the name, one sentence, two actions. Facts
 * (location, résumé, credentials) live in About.
 */
const PLATE_POSITION = "50% 38%";

export default function Hero() {
  const lenis = useLenis();
  const outerRef = useRef<HTMLDivElement>(null);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    // On pages with the studio section, "See my work" lands on Atelier Systems.
    const el = (id === "projects" && document.getElementById("atelier")) || document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro: the letters rise from behind the ridge (the name layer sits
        // under the ridge plate, so the mountain itself is the mask), then
        // the signature writes itself and the line beneath settles in.
        const split = SplitText.create("[data-hero-name]", { type: "chars" });
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .from(split.chars, { yPercent: 115, duration: 1.6, stagger: 0.06 }, 0.15)
          .from("[data-hero-sun]", { opacity: 0, scale: 0.6, duration: 2.2, ease: "power2.out" }, 0)
          .fromTo(
            "[data-hero-signature]",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut" },
            0.9,
          )
          .from("[data-hero-line]", { y: 24, duration: 1.2, stagger: 0.08 }, 0.5);

        // Scroll: the name sets behind the peaks like the sun.
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: outerRef.current, start: "top top", end: "bottom bottom", scrub: true },
          })
          .to("[data-hero-plate]", { scale: 1.14, yPercent: -3 }, 0)
          .to("[data-hero-name-wrap]", { y: () => window.innerHeight * 0.36 }, 0)
          .to("[data-hero-signature]", { opacity: 0, y: 40, duration: 0.35 }, 0)
          .to("[data-hero-sun]", { opacity: 0.15, duration: 0.7 }, 0)
          .to("[data-hero-chrome]", { opacity: 0, y: -32, duration: 0.28 }, 0)
          .to("[data-hero-dusk]", { opacity: 1, duration: 0.55 }, 0.45);

        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: outerRef },
  );

  return (
    <div id="hero" ref={outerRef} className="relative h-[200dvh] bg-transparent">
      <section className="sticky top-0 h-[100dvh] w-full overflow-hidden text-white z-10">
        {/* Plate 1: sky */}
        <div data-hero-plate className="absolute inset-0 z-0 will-change-transform">
          <Image src="/assets/hero-sky-dusk.webp" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: PLATE_POSITION }} />
        </div>

        {/* Sun line glow behind the name */}
        <div data-hero-sun aria-hidden="true" className="sunline absolute inset-x-0 top-[22%] h-[30%] z-[1] pointer-events-none" />

        {/* The name, between the plates */}
        <div
          data-hero-name-wrap
          className="will-change-transform absolute inset-x-0 top-[13%] sm:top-[16%] lg:top-[12%] z-[2] flex justify-center pointer-events-none select-none"
        >
          <h1 className="font-display uppercase text-center leading-[0.78] tracking-[-0.02em]">
            <span className="sr-only">Rishav Roy, Operations &amp; Automation Specialist</span>
            <span aria-hidden="true" data-hero-name className="block text-[24vw] lg:text-[17.5vw] text-[#fbf3e6] [text-shadow:0_8px_40px_rgba(224,121,31,0.35)]">
              Rishav
            </span>
          </h1>
        </div>

        {/* Plate 2: the ridge, cut from the same photo */}
        <div data-hero-plate aria-hidden="true" className="absolute inset-0 z-[3] pointer-events-none will-change-transform">
          <Image src="/assets/hero-ridge-dusk.webp" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: PLATE_POSITION }} />
        </div>

        {/* "Roy", signed on the mountain */}
        <p
          data-hero-signature
          aria-hidden="true"
          className="absolute z-[4] right-[8%] lg:right-[17%] top-[21%] sm:top-[28%] lg:top-[34%] font-coffekan text-[15vw] lg:text-[8vw] leading-none text-accent -rotate-6 pointer-events-none select-none will-change-[transform,opacity] [text-shadow:0_4px_24px_rgba(0,0,0,0.6)]"
        >
          Roy
        </p>

        {/* Ground fade so copy reads on the shadowed slope, then dusk on scroll */}
        <div className="absolute inset-x-0 bottom-0 h-[50%] z-[4] bg-gradient-to-t from-background via-background/75 to-transparent pointer-events-none" />
        <div data-hero-dusk className="absolute inset-0 z-[5] bg-background pointer-events-none opacity-0" />

        {/* One sentence, two actions */}
        <div data-hero-chrome className="will-change-[transform,opacity] absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-6 sm:px-12 xl:px-20 pb-24 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              {/* LCP text: visible from the first frame, it only slides. */}
              <p data-hero-line className="max-w-2xl text-xl sm:text-2xl xl:text-3xl font-medium leading-[1.2] tracking-[-0.015em] text-white text-balance">
                Ex-ops guy who got tired of manual work. Now I build tools so nobody else has to.
              </p>
            </div>
            <div data-hero-line className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href="#projects"
                onClick={goTo("projects")}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-background hover:bg-[#ffc72c] transition-colors"
              >
                See my work
                <ArrowDown className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={goTo("contact")}
                className="inline-flex items-center rounded-full border border-white/30 bg-black/45 px-7 py-4 text-sm font-semibold text-white hover:border-white/60 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Scroll cue: a thin line that drips down, nothing more */}
          <span aria-hidden="true" className="absolute bottom-5 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-white/15 sm:block motion-reduce:hidden">
            <span className="block h-1/2 w-px animate-[drip_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-accent" />
          </span>
        </div>
      </section>
    </div>
  );
}
