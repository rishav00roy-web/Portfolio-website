"use client";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="bg-[#030303] min-h-screen text-white selection:bg-[#F5B301]/30 selection:text-white">
      <Hero />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
