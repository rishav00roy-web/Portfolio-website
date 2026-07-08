"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  
  // Use client-only rendering for date/time to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const date = mounted 
    ? now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";
    
  const time = mounted 
    ? now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";

  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.7, 0.4, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={outerRef} className="relative h-[250vh] bg-[#030303]">
      <section className="sticky top-0 h-screen overflow-hidden flex flex-col text-white">
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/assets/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex flex-col flex-1"
        >
          <div className="flex items-center justify-between px-6 sm:px-12 xl:px-24 py-6 font-mono text-xs uppercase tracking-widest text-white/40">
            <span>Rishav Roy</span>
            <span className="hidden sm:block">Kolkata, India</span>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 xl:px-24 py-16 sm:py-24">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display leading-[0.82] uppercase tracking-tight"
            >
              <span className="block text-[4rem] sm:text-[7rem] lg:text-[11rem] font-extrabold text-white">
                Rishav
              </span>
              <span className="block text-[4rem] sm:text-[7rem] lg:text-[11rem] font-extrabold text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]">
                Roy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 max-w-xl text-lg sm:text-2xl text-white/60 font-medium leading-snug"
            >
              Agentic Full-Stack Developer — Building commercial software that solves real business problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
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
      </section>
    </div>
  );
}
