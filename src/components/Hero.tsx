"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Hero() {
  const now = useClock();
  const shouldReduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const date = mounted
    ? now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "";
  const time = mounted
    ? now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "";

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
          <img
            src="/assets/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
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
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <h1 className="font-display leading-[0.82] uppercase tracking-tight text-center">
            <span className="block text-[4.5rem] sm:text-[8.5rem] lg:text-[12.5rem] font-extrabold text-white">
              Rishav
            </span>
            <span className="block text-[4.5rem] sm:text-[8.5rem] lg:text-[12.5rem] font-extrabold text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]">
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
          <div className="flex items-center justify-between px-6 sm:px-12 xl:px-24 py-6 font-mono text-xs uppercase tracking-widest text-white/40">
            <span>Rishav Roy</span>
            <span className="hidden sm:block">Kolkata, India</span>
          </div>

          {/* Bottom content area */}
          <div className="flex-1 flex flex-col justify-end px-6 sm:px-12 xl:px-24 py-16 sm:py-24">
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }
              }
              className="max-w-xl text-lg sm:text-2xl text-white/60 font-medium leading-snug font-sans"
            >
              Agentic Full-Stack Developer building commercial software that
              solves real business problems.
            </motion.p>

            {/* Info grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 1, delay: 0.6 }
              }
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl font-mono text-xs sm:text-sm"
            >
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Currently
                </p>
                <p className="text-white/80">BCA Sem II</p>
                <p className="text-white/50">Building Tea Country Holidays</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Based in
                </p>
                <p className="text-white/80">Kolkata, India</p>
                <p className="text-white/50">Originally Jorhat, Assam</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Date
                </p>
                <p className="text-white/80">{date}</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">
                  Time
                </p>
                <p className="text-white/80 tabular-nums">{time} IST</p>
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
