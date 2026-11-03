"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
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
// Both plates are toned down together, keeping the original site's dusk mood
// and giving the light name enough contrast against the sky.
const PLATE_FILTER = "brightness(0.62) saturate(1.08)";

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

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    mass: 0.7,
    restDelta: 0.0005,
  });

  // Plates drift together; the name sinks behind the ridge.
  const plateScale = useTransform(progress, [0, 1], [1, 1.14]);
  const plateY = useTransform(progress, [0, 1], ["0%", "-3%"]);
  const nameY = useTransform(progress, [0, 0.8], ["0vh", "34vh"]);
  const signatureOpacity = useTransform(progress, [0, 0.35], [1, 0]);
  const sunOpacity = useTransform(progress, [0, 0.7], [1, 0.15]);
  const dusk = useTransform(progress, [0.45, 1], [0, 1]);
  const chromeOpacity = useTransform(progress, [0, 0.28], [1, 0]);
  const chromeY = useTransform(progress, [0, 0.28], [0, -32]);

  const still = shouldReduceMotion;

  return (
    <div id="hero" ref={outerRef} className="relative h-[200dvh] bg-transparent">
      <section className="sticky top-0 h-[100dvh] w-full overflow-hidden text-white z-10">
        {/* Plate 1: sky */}
        <motion.div
          style={still ? undefined : { scale: plateScale, y: plateY }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src="/assets/hero-sky.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: PLATE_POSITION, filter: PLATE_FILTER }}
          />
        </motion.div>

        {/* Sun line glow behind the name */}
        <motion.div
          aria-hidden="true"
          style={still ? undefined : { opacity: sunOpacity }}
          className="sunline absolute inset-x-0 top-[22%] h-[30%] z-[1] pointer-events-none mix-blend-screen"
        />

        {/* The name, between the plates */}
        <motion.div
          style={still ? undefined : { y: nameY }}
          className="absolute inset-x-0 top-[25%] sm:top-[18%] lg:top-[12%] z-[2] flex justify-center pointer-events-none select-none"
        >
          <h1 className="font-display uppercase text-center leading-[0.78] tracking-[-0.02em]">
            <span className="sr-only">Rishav Roy, Operations &amp; Automation Specialist</span>
            <span
              aria-hidden="true"
              className="block text-[24vw] lg:text-[17.5vw] text-[#fbf3e6] drop-shadow-[0_8px_40px_rgba(224,121,31,0.35)]"
            >
              Rishav
            </span>
          </h1>
        </motion.div>

        {/* Plate 2: the ridge, cut from the same photo */}
        <motion.div
          aria-hidden="true"
          style={still ? undefined : { scale: plateScale, y: plateY }}
          className="absolute inset-0 z-[3] pointer-events-none will-change-transform"
        >
          <Image
            src="/assets/hero-ridge.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: PLATE_POSITION, filter: PLATE_FILTER }}
          />
        </motion.div>

        {/* "Roy", signed on the mountain */}
        <motion.p
          aria-hidden="true"
          style={still ? undefined : { opacity: signatureOpacity }}
          className="absolute z-[4] right-[8%] lg:right-[17%] top-[33%] lg:top-[34%] font-coffekan text-[15vw] lg:text-[8vw] leading-none text-accent -rotate-6 pointer-events-none select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
        >
          Roy
        </motion.p>

        {/* Ground fade so copy reads on the shadowed slope, then dusk on scroll */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] z-[4] bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
        <motion.div
          style={still ? { opacity: 0 } : { opacity: dusk }}
          className="absolute inset-0 z-[5] bg-background pointer-events-none"
        />

        {/* Chrome */}
        <motion.div
          style={still ? undefined : { opacity: chromeOpacity, y: chromeY }}
          className="relative z-20 flex flex-col h-full"
        >
          <div className="flex items-center justify-between px-6 sm:px-12 xl:px-24 py-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/70">
            <span>Rishav Roy</span>
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-emerald-400/30 bg-black/30 backdrop-blur-sm text-emerald-300 text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] hover:border-emerald-400/60 transition-colors cursor-pointer"
              aria-label="Available for hire, jump to contact"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
              <span>Available for Hire</span>
            </button>
            <span className="hidden sm:block">Kolkata, India</span>
          </div>

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
                  className="px-6 py-3.5 rounded-full border border-white/25 bg-black/20 backdrop-blur-sm text-white hover:border-white/50 transition-colors font-semibold text-sm cursor-pointer"
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
        </motion.div>
      </section>
    </div>
  );
}
