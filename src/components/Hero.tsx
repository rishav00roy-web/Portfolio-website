"use client";

import Image from "next/image";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

const currentlyItems = [
  "Tea Country Holidays",
  "Gym CRM",
  "ClashVault (In Progress)"
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();


  const [currentlyIndex, setCurrentlyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentlyIndex((prev) => (prev + 1) % currentlyItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [commitCount, setCommitCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/rishav00roy-web/Portfolio-website/commits?per_page=1")
      .then((res) => {
        const linkHeader = res.headers.get("Link");
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match && match[1]) {
            setCommitCount(parseInt(match[1], 10));
          }
        } else {
          res.json().then((data) => {
            if (Array.isArray(data)) {
              setCommitCount(data.length);
            }
          });
        }
      })
      .catch(() => {
        setCommitCount(84); // Fallback to a static commit count
      });
  }, []);

  const outerRef = useRef<HTMLDivElement>(null);

  // ---- Scroll-linked progress ----
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // ---- Layer 1: Background image (deepest) ----
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.6, 1], [0.65, 0.4, 0.2]);
  const darkOverlayOpacity = useTransform(smoothProgress, [0, 1], [0.3, 0.85]);


  // ---- Layer 3: Title (foreground) — staged easing with hang-time ----
  const titleScale = useTransform(
    smoothProgress,
    [0, 0.25, 0.45, 0.7],
    [1, 1.4, 3.5, 9.5]
  );
  const titleOpacity = useTransform(smoothProgress, [0, 0.5, 0.75], [1, 1, 0]);

  // ---- Chrome (meta UI) ----
  const chromeOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const chromeY = useTransform(smoothProgress, [0, 0.25], [0, -40]);


  // ---- Mouse parallax (desktop only) ----
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rx = -(e.clientY / window.innerHeight - 0.5) * 5;
      const ry = (e.clientX / window.innerWidth - 0.5) * 5;
      setTilt({ rotateX: rx, rotateY: ry });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={outerRef} className="relative h-[280vh] bg-transparent">
      <section
        className="sticky top-0 h-screen w-full overflow-hidden text-white z-10"
        style={{ perspective: "1200px" }}
      >

        {/* ---- Layer 1: Background image (deepest) ---- */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/assets/hero-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          {/* Vignette overlay replaces blur — pure GPU opacity */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, rgba(3,3,3,0.5) 70%, rgba(3,3,3,0.9) 100%)",
            }}
          />
          {/* Darkening overlay driven by scroll */}
          <motion.div
            style={{ opacity: darkOverlayOpacity }}
            className="absolute inset-0 bg-[#030303]"
          />
        </motion.div>

        {/* ---- Grain texture overlay ---- */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />

        {/* ---- Layer 3: Title (foreground, mouse parallax) ---- */}
        <motion.div
          style={{
            scale: titleScale,
            opacity: titleOpacity,
            rotateX: shouldReduceMotion ? 0 : tilt.rotateX,
            rotateY: shouldReduceMotion ? 0 : tilt.rotateY,
          }}
          className="absolute inset-0 z-10 flex items-start pt-[18vh] sm:pt-0 sm:items-center justify-center pointer-events-none"
        >
          <h1 className="font-display leading-[0.82] uppercase tracking-tight text-center">
            <span className="block text-[15vw] sm:text-[8.5rem] lg:text-[12.5rem] font-extrabold text-white">
              Rishav
            </span>
            <span className="block text-[15vw] sm:text-[8.5rem] lg:text-[12.5rem] font-extrabold text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]">
              Roy
            </span>
          </h1>
        </motion.div>

        {/* ---- Chrome: meta UI + tagline + info grid ---- */}
        <motion.div
          style={{ opacity: chromeOpacity, y: chromeY }}
          className="relative z-20 flex flex-col h-full"
        >
          {/* Top nav bar */}
          <div className="flex items-center justify-between px-6 sm:px-12 xl:px-24 py-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/40 z-30">
            <span>Rishav Roy</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[9px] sm:text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Hire</span>
            </div>
            <span className="hidden sm:block">Kolkata, India</span>
          </div>

          {/* Bottom content area */}
          <div className="flex-1 flex flex-col justify-end px-6 sm:px-12 xl:px-24 pb-32 sm:pb-24 pt-16 sm:pt-24">
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }
              }
              className="max-w-2xl text-lg sm:text-2xl text-white/70 font-medium leading-snug font-sans"
            >
              I build and launch robust web applications and rate management systems tailored to solve concrete operational challenges.
            </motion.p>

            {/* Above-the-fold CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const }
              }
              className="mt-6 flex flex-wrap gap-4 z-30 pointer-events-auto"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                View Commercial Projects
              </button>
              <button
                onClick={() => {
                  const el = document.querySelector("footer");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors font-semibold text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Info grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.6 }
              }
              className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl font-mono text-xs sm:text-sm"
            >
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Currently
                </p>
                <div className="relative h-[2.5em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentlyIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="text-white/80 absolute left-0 right-0 truncate sm:whitespace-nowrap text-[10px] sm:text-[11px] md:text-xs tracking-tight font-mono"
                    >
                      {currentlyItems[currentlyIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Based in
                </p>
                <p className="text-white/80">Kolkata, India</p>
                <p className="text-white/50 text-[10px]">(originally from Jorhat, Assam)</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Resume
                </p>
                <a
                  href="/Rishav-Roy-Resume.pdf"
                  download="Rishav-Roy-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-amber-400 transition-colors underline decoration-white/20 hover:decoration-amber-400/40"
                >
                  Download PDF
                </a>
                <p className="text-white/50 text-[10px] mt-1">July 2026</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Commits
                </p>
                <p className="text-white/80">
                  {commitCount !== null ? `${commitCount} Commits` : "84 Commits"}
                </p>
                <p className="text-white/50 text-[10px] mt-1">on GitHub</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Credentials
                </p>
                <a 
                  href="#certificates"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 group cursor-pointer mt-1"
                >
                  <div className="bg-white/10 p-1.5 rounded-md group-hover:bg-white/20 transition-colors">
                    <Award className="w-4 h-4 text-white/80 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <span className="text-white/80 group-hover:text-amber-400 transition-colors">Coursera</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ---- Mouse scroll indicator ---- */}
        <motion.div
          style={{ opacity: chromeOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <div className="mouse-btn">
            <span className="mouse-scroll" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
