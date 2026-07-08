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

  // Parallax on scroll for the glow layers
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
        
        {/* Blob 1: Indigo/Blue Glow (Upper Right) */}
        <motion.div
          animate={isAnimated ? {
            x: ["0px", "60px", "-40px", "0px"],
            y: ["0px", "-60px", "40px", "0px"],
            scale: [1, 1.12, 0.92, 1],
            opacity: [0.32, 0.45, 0.28, 0.32],
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[5%] top-[15%] w-[55vw] h-[55vw] max-w-[750px] rounded-full bg-indigo-900/8 filter blur-[110px] sm:blur-[140px] pointer-events-none"
        />

        {/* Blob 2: Blue/Violet Glow (Lower Left) */}
        <motion.div
          animate={isAnimated ? {
            x: ["0px", "-50px", "50px", "0px"],
            y: ["0px", "70px", "-50px", "0px"],
            scale: [1, 0.9, 1.1, 1],
            opacity: [0.24, 0.38, 0.2, 0.24],
          } : {}}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-5%] bottom-[12%] w-[50vw] h-[50vw] max-w-[650px] rounded-full bg-blue-900/8 filter blur-[100px] sm:blur-[130px] pointer-events-none"
        />

        {/* Blob 3: Violet/Purple Glow (Center Right) */}
        <motion.div
          animate={isAnimated ? {
            x: ["0px", "40px", "-30px", "0px"],
            y: ["0px", "50px", "-60px", "0px"],
            scale: [0.95, 1.08, 0.95, 0.95],
            opacity: [0.18, 0.32, 0.15, 0.18],
          } : {}}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[35%] top-[40%] w-[45vw] h-[45vw] max-w-[600px] rounded-full bg-violet-950/6 filter blur-[120px] sm:blur-[150px] pointer-events-none"
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
