"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Background() {
  const [mounted, setMounted] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const shouldReduceMotion = useReducedMotion();
  const isAnimated = !shouldReduceMotion && isTabVisible;

  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 5000], [0, -350]);

  // Static SSR/first-paint fallback — zero animation, identical layout
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#030303] overflow-hidden z-[-1] pointer-events-none">
        {/* Grid with intersection dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "55px 55px, 55px 55px, 55px 55px",
            backgroundPosition: "center, center, center",
          }}
        />
        {/* Static monochrome glow blob */}
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(100, 120, 200, 0.10) 0%, rgba(100, 120, 200, 0) 70%)",
          }}
          className="absolute right-[-5%] top-[10%] w-[65vw] h-[65vw] max-w-[850px] rounded-full pointer-events-none"
        />
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#030303] overflow-hidden z-[-1] pointer-events-none">
      {/* Glow layer with scroll-linked parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Primary glow — restrained blue-white, slower */}
        <motion.div
          animate={
            isAnimated
              ? {
                  x: ["0px", "70px", "-40px", "0px"],
                  y: ["0px", "-60px", "40px", "0px"],
                  scale: [1, 1.1, 0.95, 1],
                  opacity: [0.7, 0.9, 0.65, 0.7],
                }
              : {}
          }
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(100, 120, 200, 0.14) 0%, rgba(100, 120, 200, 0) 70%)",
          }}
          className="absolute right-[-5%] top-[10%] w-[65vw] h-[65vw] max-w-[850px] rounded-full pointer-events-none"
        />

        {/* Secondary glow — cooler, smaller, opposite corner */}
        <motion.div
          animate={
            isAnimated
              ? {
                  x: ["0px", "-50px", "55px", "0px"],
                  y: ["0px", "65px", "-50px", "0px"],
                  scale: [1, 0.95, 1.08, 1],
                  opacity: [0.55, 0.75, 0.5, 0.55],
                }
              : {}
          }
          transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(80, 100, 160, 0.11) 0%, rgba(80, 100, 160, 0) 70%)",
          }}
          className="absolute left-[-8%] bottom-[12%] w-[55vw] h-[55vw] max-w-[700px] rounded-full pointer-events-none"
        />
      </motion.div>

      {/* Grid with faint intersection dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px, 55px 55px, 55px 55px",
          backgroundPosition: "center, center, center",
        }}
      />

      {/* Thin diagonal accent lines — subtle structural feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.3) 49%, rgba(255,255,255,0.3) 51%, transparent 52%)`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Subtle grain texture overlay (static, zero animation cost) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
