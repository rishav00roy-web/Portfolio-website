"use client";

import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="bg-[#030303] min-h-screen text-white selection:bg-white/20 selection:text-white relative">
      {/* Global Background Alive Grid & Glowing Mesh */}
      <div className="fixed inset-0 alive-grid pointer-events-none z-0 opacity-50" />
      
      {/* Dynamic Animated Floating Glow Mesh Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute right-[-10%] top-[20%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/10 blur-[150px] glow-orb-1" />
        <div className="absolute left-[-5%] bottom-[15%] w-[45vw] h-[45vw] rounded-full bg-blue-900/10 blur-[130px] glow-orb-2" />
        <div className="absolute left-[30%] top-[45%] w-[35vw] h-[35vw] rounded-full bg-violet-950/5 blur-[140px] glow-orb-1" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Footer />
      </div>
    </main>
  );
}
