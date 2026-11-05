"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { ArrowRight, Award, Download } from "lucide-react";
import { useLenis } from "lenis/react";
import HyperText from "./HyperText";

const currentlyItems = [
  "Tea Country Holidays",
  "IQ Iron Fitness",
  "Clash Bazar (In Progress)"
];

/*
 * The hero is one photograph split into two plates: the sky, and the ridge
 * cut out of it (public/assets/hero-ridge.webp, an alpha matte derived from
 * hero-bg.jpg). The name is set between them, so it rises from behind the
 * mountains; scrolling sinks it back down like the sun going behind the
 * peaks. Both plates share every transform so the cut line never drifts.
 */
const PLATE_POSITION = "50% 38%";
// Both plates are pre-toned (darker, slightly warmer) in the image files
// themselves; a CSS filter on two full-screen transformed layers cost
// visible frames while scrolling on phones.

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const lenis = useLenis();

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [currentlyIndex, setCurrentlyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentlyIndex((prev) => (prev + 1) % currentlyItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [commitCount, setCommitCount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("github-commit-count");
      if (cached) {
        // Set after mount: localStorage is unavailable during SSR, and seeding
        // state from it during render would trip a hydration mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCommitCount(parseInt(cached, 10));
      }
    }
    fetch("https://api.github.com/repos/rishav00roy-web/Portfolio-website/commits?per_page=1")
      .then((res) => {
        if (!res.ok) return; // rate-limited or error — keep cached value
        const linkHeader = res.headers.get("Link");
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match && match[1]) {
            const count = parseInt(match[1], 10);
            setCommitCount(count);
            localStorage.setItem("github-commit-count", String(count));
          }
        } else {
          res.json().then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setCommitCount(data.length);
              localStorage.setItem("github-commit-count", String(data.length));
            }
          });
        }
      })
      .catch(() => {
        // Keep cached value
      });
  }, []);

  const outerRef = useRef<HTMLDivElement>(null);

  const still = shouldReduceMotion;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro: the letters rise from behind the ridge (the name layer sits
        // under the ridge plate, so the mountain itself is the mask).
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
          );

        // Scroll: the name sets behind the peaks like the sun.
        const sunset = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        sunset
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
          <Image
            src="/assets/hero-sky-dusk.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: PLATE_POSITION }}
          />
        </div>

        {/* Sun line glow behind the name */}
        <div data-hero-sun aria-hidden="true" className="sunline absolute inset-x-0 top-[22%] h-[30%] z-[1] pointer-events-none"
        />

        {/* The name, between the plates */}
        <div data-hero-name-wrap className="will-change-transform absolute inset-x-0 top-[13%] sm:top-[16%] lg:top-[12%] z-[2] flex justify-center pointer-events-none select-none"
        >
          <h1 className="font-display uppercase text-center leading-[0.78] tracking-[-0.02em]">
            <span className="sr-only">Rishav Roy, Operations &amp; Automation Specialist</span>
            <span
              aria-hidden="true"
              data-hero-name
              className="block text-[24vw] lg:text-[17.5vw] text-[#fbf3e6] [text-shadow:0_8px_40px_rgba(224,121,31,0.35)]"
            >
              Rishav
            </span>
          </h1>
        </div>

        {/* Plate 2: the ridge, cut from the same photo */}
        <div data-hero-plate aria-hidden="true" className="absolute inset-0 z-[3] pointer-events-none will-change-transform">
          <Image
            src="/assets/hero-ridge-dusk.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: PLATE_POSITION }}
          />
        </div>

        {/* "Roy", signed on the mountain */}
        <p data-hero-signature aria-hidden="true" className="absolute z-[4] right-[8%] lg:right-[17%] top-[21%] sm:top-[28%] lg:top-[34%] font-coffekan text-[15vw] lg:text-[8vw] leading-none text-accent -rotate-6 pointer-events-none select-none will-change-[transform,opacity] [text-shadow:0_4px_24px_rgba(0,0,0,0.6)]"
        >
          Roy
        </p>

        {/* Ground fade so copy reads on the shadowed slope, then dusk on scroll */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] z-[4] bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
        <div data-hero-dusk className="absolute inset-0 z-[5] bg-background pointer-events-none opacity-0" />

        {/* Chrome */}
        <div data-hero-chrome className="will-change-[transform,opacity] relative z-20 flex flex-col h-full">

          <div className="flex-1 flex flex-col justify-end px-6 sm:px-12 xl:px-24 pb-24 sm:pb-14">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
              {/* Tagline is the LCP element: it paints at full opacity on the
                  first frame and only slides. Do not add an opacity fade. */}
              <motion.div
                initial={{ opacity: 1, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={still ? { duration: 0 } : { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="max-w-xl"
              >
                <p className="font-coffekan text-3xl sm:text-4xl text-accent mb-1">Operations &amp; Automation</p>
                <HyperText
                  as="p"
                  preserveCase
                  duration={800}
                  animateOnHover
                  className="text-xl sm:text-[1.75rem] text-white font-medium leading-[1.3] font-sans text-balance"
                >
                  Ex-ops guy who got tired of manual work. Now I build tools so nobody else has to.
                </HyperText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={still ? { duration: 0 } : { duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-wrap gap-3 shrink-0"
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-accent text-background font-semibold text-sm hover:bg-[#ffc72c] transition-colors cursor-pointer"
                >
                  Case Studies
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <button
                  onClick={scrollToContact}
                  className="px-6 py-3.5 rounded-full border border-white/25 bg-black/45 text-white hover:border-white/50 transition-colors font-semibold text-sm cursor-pointer"
                >
                  Get in Touch
                </button>
              </motion.div>
            </div>

            {/* Ledger */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={still ? { duration: 0 } : { duration: 1, delay: 0.5 }}
              className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-accent/25"
            >
              <div className="pt-4 pr-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80 mb-1.5">Currently</dt>
                <dd className="relative h-[2.6em] overflow-hidden text-sm text-white/90">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentlyIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="absolute inset-x-0 line-clamp-2"
                    >
                      {currentlyItems[currentlyIndex]}
                    </motion.span>
                  </AnimatePresence>
                </dd>
              </div>
              <div className="pt-4 pr-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80 mb-1.5">Based in</dt>
                <dd className="text-sm text-white/90">
                  Kolkata, India
                  <span className="block text-xs text-white/55">from Jorhat, Assam</span>
                </dd>
              </div>
              <div className="pt-4 pr-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80 mb-1.5">Resume</dt>
                <dd className="text-sm">
                  <a
                    href="/Rishav-Roy-CV.pdf"
                    download="Rishav-Roy-CV.pdf"
                    className="inline-flex items-center gap-1.5 text-white/90 hover:text-accent transition-colors underline decoration-white/25 hover:decoration-accent/60"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    Download PDF
                  </a>
                  <span className="block text-xs text-white/55">July 2026</span>
                </dd>
              </div>
              <div className="pt-4 pr-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80 mb-1.5">Commits</dt>
                <dd className="text-sm text-white/90">
                  {commitCount !== null ? `${commitCount} on GitHub` : "… on GitHub"}
                </dd>
              </div>
              <div className="pt-4 pr-4 hidden sm:block">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80 mb-1.5">Credentials</dt>
                <dd className="text-sm">
                  <a
                    href="#certificates"
                    onClick={(e) => {
                      e.preventDefault();
                      if (lenis) {
                        lenis.scrollTo("#certificates", { duration: 1.4 });
                      } else {
                        document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-white/90 hover:text-accent transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    Google · Coursera
                  </a>
                </dd>
              </div>
            </motion.dl>
          </div>
        </div>
      </section>
    </div>
  );
}
