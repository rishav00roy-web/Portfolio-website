"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LogoLoader({ onComplete }: { onComplete: () => void }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        className={`w-full max-w-sm md:max-w-md transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/assets/LOGO.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
