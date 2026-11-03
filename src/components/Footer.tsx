"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import ContactForm from "./ContactForm";
import { PROFILE } from "@/lib/profile";
import { useSectionMotion } from "@/lib/motion";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  useSectionMotion(root);

  const scrollToTop = () => {
    // Route through Lenis when it is running; a native smooth scroll would
    // fight its interpolation.
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={root} id="contact" className="relative px-6 sm:px-12 xl:px-24 pt-32 sm:pt-44 pb-10">
      {/* A last warm light at the bottom of the page, echoing the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(60%_60%_at_50%_100%,rgba(224,121,31,0.18),transparent_70%)]"
      />

      <div className="relative">
        <h2
          data-heading
          className="font-display uppercase text-[17vw] sm:text-[12vw] xl:text-[10.5vw] leading-[0.84] tracking-[-0.02em] text-white"
        >
          Let&apos;s build
          <br />
          something
        </h2>
        <p className="mt-4 font-coffekan text-4xl sm:text-5xl text-accent">before the sun sets.</p>

        <div className="mt-20 grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col gap-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/85">Write to me</p>
              <a
                href={`mailto:${PROFILE.email}`}
                className="mt-3 inline-block break-all font-display text-3xl sm:text-5xl leading-none text-white underline decoration-white/20 decoration-1 underline-offset-[0.2em] hover:text-accent hover:decoration-accent transition-colors"
              >
                {PROFILE.email}
              </a>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/85">Call or WhatsApp</p>
              <a href={PROFILE.phoneHref} className="mt-3 inline-block font-display text-3xl sm:text-4xl text-white hover:text-accent transition-colors">
                {PROFILE.phone}
              </a>
            </div>

            <ul className="border-t border-white/10">
              {PROFILE.socials.map((s) => (
                <li key={s.label} className="border-b border-white/10">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="text-lg text-white group-hover:text-accent transition-colors">{s.label}</span>
                    <span className="flex items-center gap-3 text-sm text-white/50">
                      {s.handle}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-white/10">
                <a href={PROFILE.resume} download className="group flex items-center justify-between py-4">
                  <span className="text-lg text-white group-hover:text-accent transition-colors">Résumé</span>
                  <span className="flex items-center gap-3 text-sm text-white/50">
                    PDF, {PROFILE.resumeUpdated}
                    <Download className="h-4 w-4 group-hover:text-accent" aria-hidden="true" />
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <ContactForm />
        </div>

        <div className="mt-24 flex items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. Designed and built by me.</p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            Back to the top
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
