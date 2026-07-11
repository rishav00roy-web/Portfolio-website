"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Hero from "./components/Hero";
import KineticGrid from "./components/KineticGrid";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";

import { useFontLoading } from "./hooks/useFontLoading";

export default function App() {
  // Trigger rebuild to deploy yesterday's version
  // The original version always wrapped the page in ReactLenis, so anyone
  // with prefers-reduced-motion on still got smoothed/eased scrolling —
  // that's exactly the kind of motion that setting should turn off.
  const prefersReduced = useReducedMotion();
  const { fontsLoaded } = useFontLoading();

  const content = (
    <>
      <main className={`min-h-screen text-white selection:bg-white/20 selection:text-white relative transition-opacity duration-300 ${fontsLoaded ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <KineticGrid />
        <div className="relative z-10">
          <Projects />
          <About />
          <Footer />
        </div>
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
