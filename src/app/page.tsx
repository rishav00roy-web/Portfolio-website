"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import ThemeInitializer from "@/components/ThemeInitializer";
import SmokeBackground from "@/components/SmokeBackground";
import LogoLoader from "@/components/LogoLoader";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

// Dynamically import the F1TrackMap with no SSR
const F1TrackMap = dynamic(() => import("@/components/F1TrackMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[10/6] rounded-xl bg-app-card border border-app-border flex items-center justify-center font-mono text-xs text-app-muted">
      Loading track telemetry module...
    </div>
  ),
});

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [f1Visible, setF1Visible] = useState(false);
  const f1ContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loader is active
    if (showLoader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // High-performance lazy loading of F1 module via IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setF1Visible(true);
          observer.disconnect(); // Disconnect once triggered to avoid multiple evaluations
        }
      },
      {
        rootMargin: "200px", // Trigger slightly before the section comes into viewport
      }
    );

    const currentRef = f1ContainerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [showLoader]);

  return (
    <>
      {/* Handles loading dark/light themes via URL params during selection phase */}
      <ThemeInitializer />

      <AnimatePresence mode="wait">
        {showLoader && (
          <LogoLoader onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: showLoader ? 0 : 0.2 }}
        className={showLoader ? "pointer-events-none" : ""}
      >
        {/* Ambient charcoal drifting smoke background */}
        <SmokeBackground />

        <main className="flex-1 w-full flex flex-col relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* Featured Projects Section */}
          <FeaturedProjects />

          {/* Dynamic F1 Track Map Section */}
          <div ref={f1ContainerRef}>
            {f1Visible ? (
              <F1TrackMap />
            ) : (
              <section className="py-24 px-6 max-w-6xl mx-auto border-t border-app-border">
                <div className="mb-12">
                  <h2 className="font-heading text-xs uppercase tracking-widest text-app-accent mb-3 font-semibold">
                    Interactive Lab
                  </h2>
                  <div className="w-full aspect-[10/6] rounded-xl bg-app-card border border-app-border flex items-center justify-center font-mono text-xs text-app-muted">
                    Scrolling into view prepares telemetry module...
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Technical Skills Section */}
          <Skills />

          {/* About Section */}
          <About />

          {/* Contact Footer Section */}
          <Contact />
        </main>
      </motion.div>
    </>
  );
}
