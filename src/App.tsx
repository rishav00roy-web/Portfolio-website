"use client";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";
import Background from "./components/Background";

export default function App() {
  return (
    <main className="min-h-screen text-white selection:bg-white/20 selection:text-white relative">
      <Background />
      <Hero />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
