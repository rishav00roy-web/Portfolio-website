"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";
import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  // The original version always wrapped the page in ReactLenis, so anyone
  // with prefers-reduced-motion on still got smoothed/eased scrolling —
  // that's exactly the kind of motion that setting should turn off.
  const prefersReduced = useReducedMotion();

  const content = (
    <>
      <CustomCursor />
      <main className="min-h-screen text-white selection:bg-white/20 selection:text-white relative">
        <Background />
        <Hero />
        <Projects />
        <About />
        <Footer />
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
        lerp: 0.08,
        smoothWheel: true,
        touchMultiplier: 0,
      }}
    >
      {content}
    </ReactLenis>
  );
}
