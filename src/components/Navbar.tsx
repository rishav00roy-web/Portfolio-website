"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-app-card/70 backdrop-blur-md border-b border-app-border shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-black text-xl tracking-tight text-app-fg hover:text-app-accent transition-colors">
          RR<span className="text-app-accent">.</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-app-muted">
          <Link href="#projects" className="hover:text-app-accent transition-colors">Projects</Link>
          <Link href="#skills" className="hover:text-app-accent transition-colors">Skills</Link>
          <Link href="#about" className="hover:text-app-accent transition-colors">About</Link>
          <Link href="#contact" className="hover:text-app-accent transition-colors">Contact</Link>
        </div>

        {/* Mobile menu button (simple) */}
        <div className="md:hidden">
          <a href="#contact" className="font-mono text-[10px] uppercase tracking-widest text-app-accent border border-app-accent/50 px-3 py-1.5 rounded-md hover:bg-app-accent/10 transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
