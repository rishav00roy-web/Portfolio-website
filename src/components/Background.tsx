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

  // Subtle scroll-driven parallax for the glow layer (compositor-only)
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 5000], [0, -350]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-[#030303] overflow-hidden z-[-1] pointer-events-none">
        {/* Static Grid Layer */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: "55px 55px",
            backgroundPosition: "center",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#030303] overflow-hidden z-[-1] pointer-events-none">
      
      {/* Drifting Glow Blobs Container with subtle scroll parallax */}
      <motion.div style={{ y: glowY }} className="absolute inset-0 w-full h-full pointer-events-none">
        
        {/* Blob 1: Indigo Glow (Upper Right)
            Uses a radial gradient background directly instead of heavy CSS blur filters for 60fps scroll. */}
        <motion.div
          animate={isAnimated ? {
            x: ["0px", "80px", "-50px", "0px"],
            y: ["0px", "-70px", "50px", "0px"],
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.8, 1.0, 0.7, 0.8],
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0) 70%)"
          }}
          className="absolute right-[-5%] top-[10%] w-[65vw] h-[65vw] max-w-[850px] rounded-full pointer-events-none"
        />

        {/* Blob 2: Blue Glow (Lower Left) */}
        <motion.div
          animate={isAnimated ? {
            x: ["0px", "-60px", "60px", "0px"],
            y: ["0px", "80px", "-60px", "0px"],
            scale: [1, 0.92, 1.12, 1],
            opacity: [0.7, 0.9, 0.6, 0.7],
          } : {}}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0) 70%)"
          }}
          className="absolute left-[-10%] bottom-[8%] w-[60vw] h-[60vw] max-w-[750px] rounded-full pointer-events-none"
        />

        {/* Blob 3: Violet Glow (Center Right) */}
        <motion.div
          animate={isAnimated ? {
            x: ["0px", "50px", "-40px", "0px"],
            y: ["0px", "60px", "-70px", "0px"],
            scale: [0.95, 1.1, 0.95, 0.95],
            opacity: [0.6, 0.85, 0.5, 0.6],
          } : {}}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0) 70%)"
          }}
          className="absolute left-[30%] top-[35%] w-[55vw] h-[55vw] max-w-[700px] rounded-full pointer-events-none"
        />

      </motion.div>

      {/* Static Grid Layer (Layered on top of glows so grid lines are crisp) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
          backgroundPosition: "center",
        }}
      />

    </div>
  );
}
