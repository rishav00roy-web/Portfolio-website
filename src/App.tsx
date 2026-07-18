"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Hero from "./components/Hero";
import KineticGrid from "./components/KineticGrid";
import Projects from "./components/Projects";
import About from "./components/About";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";
import CommandMenu from "./components/CommandMenu";

import { useFontLoading } from "./hooks/useFontLoading";

export default function App() {
  const prefersReduced = useReducedMotion();
  const { fontsLoaded } = useFontLoading();
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const content = (
    <>
      <main className={`min-h-screen text-white selection:bg-white/20 selection:text-white relative transition-opacity duration-300 ${fontsLoaded ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <KineticGrid />
        <div className="relative z-10">
          <Projects activeProjectId={activeProjectId} setActiveProjectId={setActiveProjectId} />
          <About />
          <Certificates />
          <Footer />
        </div>
        <CommandMenu onOpenCaseStudy={setActiveProjectId} />
      </main>
    </>
  );

  // prefersReduced is `null` during the very first render (before Framer
  // Motion can read the media query) — default to smooth scroll in that
  // brief window rather than flashing native scroll then switching.
  if (prefersReduced) {
    return content;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        smoothWheel: true,
        touchMultiplier: 0,
      }}
    >
      {content}
    </ReactLenis>
  );
}
