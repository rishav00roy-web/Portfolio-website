"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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

  // Client-only rendering for date/time to avoid hydration mismatch
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

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Single spring smooths every derived transform below — one spring update
  // per frame, not one per layer, so this stays cheap on integrated graphics.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    mass: 0.7,
    restDelta: 0.0005,
  });

  // --- Layer 1: background image — slow, "far away" ---
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.25]);
  const bgBlur = useTransform(smoothProgress, [0.4, 1], ["blur(0px)", "blur(10px)"]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.7, 1], [0.7, 0.55, 0.3]);

  // --- Layer 2: giant title — fast, flies at/through the viewer ---
  const titleScale = useTransform(smoothProgress, [0, 0.55], [1, 9]);
  const titleBlur = useTransform(smoothProgress, [0.15, 0.55], ["blur(0px)", "blur(24px)"]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.3, 0.55], [1, 1, 0]);

  // --- Layer 3: foreground chrome — clears the frame first ---
  const chromeOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0]);
  const chromeY = useTransform(smoothProgress, [0, 0.22], [0, -40]);

  // Ambient Parallax Orbs
  const orb1Y = useTransform(smoothProgress, [0, 1], [0, 120]);
  const orb2Y = useTransform(smoothProgress, [0, 1], [0, -120]);

  return (
    <div ref={outerRef} className="relative h-[280vh] bg-[#030303]">
      <section className="sticky top-0 h-screen w-full overflow-hidden text-white">
        {/* Layer 1: background */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity, filter: bgBlur }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/assets/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Ambient Parallax Orbs for whole-site designer feel */}
        <motion.div
          style={{ y: orb1Y }}
          className="absolute right-[-10%] top-[15%] w-[450px] h-[450px] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0"
        />
        <motion.div
          style={{ y: orb2Y }}
          className="absolute left-[-10%] bottom-[15%] w-[550px] h-[550px] rounded-full bg-white/5 blur-[150px] pointer-events-none z-0"
        />

        {/* Layer 2: giant flying title — the centerpiece */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity, filter: titleBlur }}
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

        {/* Layer 3: foreground chrome — nav row, subtext, meta grid */}
        <motion.div
          style={{ opacity: chromeOpacity, y: chromeY }}
          className="relative z-20 flex flex-col h-full"
        >
          <div className="flex items-center justify-between px-6 sm:px-12 xl:px-24 py-6 font-mono text-xs uppercase tracking-widest text-white/40">
            <span>Rishav Roy</span>
            <span className="hidden sm:block">Kolkata, India</span>
          </div>

          <div className="flex-1 flex flex-col justify-end px-6 sm:px-12 xl:px-24 py-16 sm:py-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-lg sm:text-2xl text-white/60 font-medium leading-snug font-sans"
            >
              Agentic Full-Stack Developer building commercial software that solves real business problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl font-mono text-xs sm:text-sm"
            >
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">Currently</p>
                <p className="text-white/80">BCA Sem II</p>
                <p className="text-white/50">Building Tea Country Holidays</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">Based in</p>
                <p className="text-white/80">Kolkata, India</p>
                <p className="text-white/50">Originally Jorhat, Assam</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">Date</p>
                <p className="text-white/80">{date}</p>
              </div>
              <div>
                <p className="text-white/30 uppercase tracking-widest mb-2">Time</p>
                <p className="text-white/80 tabular-nums">{time} IST</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
