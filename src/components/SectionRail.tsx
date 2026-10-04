"use client";

import { useEffect, useState, useCallback } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

interface SectionItem {
  id: string;
  number: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: "hero", number: "01", label: "HERO" },
  { id: "projects", number: "02", label: "WORK" },
  { id: "selected-work", number: "03", label: "SELECTED" },
  { id: "about", number: "04", label: "ABOUT" },
  { id: "certificates", number: "05", label: "CERTS" },
  { id: "contact", number: "06", label: "CONTACT" },
];

export default function SectionRail() {
  const [activeId, setActiveId] = useState<string>("hero");
  const lenis = useLenis();

  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // If near bottom of the document, activate contact section
    if (scrollY + windowHeight >= docHeight - 80) {
      setActiveId("contact");
      return;
    }

    // Reference point in viewport (35% from the top)
    const viewportRef = windowHeight * 0.35;

    let current = SECTIONS[0].id;
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewportRef && rect.bottom > viewportRef) {
        current = section.id;
        break;
      } else if (rect.top <= viewportRef) {
        current = section.id;
      }
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const rafId = window.requestAnimationFrame(updateActiveSection);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateActiveSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 sm:right-8 xl:right-10 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5 select-none pointer-events-auto"
    >
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-2.5 py-1 text-right cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400/50 rounded"
            aria-label={`${section.number} ${section.label}`}
          >
            <span
              className={cn(
                "font-mono text-[9px] tracking-[0.2em] transition-all duration-300",
                isActive
                  ? "text-amber-400 font-semibold opacity-100 translate-x-0"
                  : "text-white/40 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
              )}
            >
              <span className="text-white/30">{section.number}</span>{" "}
              {section.label}
            </span>
            <span
              className={cn(
                "h-[2px] rounded-full transition-all duration-300",
                isActive
                  ? "w-6 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                  : "w-2.5 bg-white/20 group-hover:w-4 group-hover:bg-white/60"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
