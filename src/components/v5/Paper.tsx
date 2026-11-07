"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import ContactForm from "../ContactForm";
import SocialRow from "./SocialRow";
import { PROFILE } from "@/lib/profile";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * One cheap entrance for these sections: `[data-rise]` blocks lift in as they
 * arrive, batched so a row moves together. Transform and opacity only.
 */
function useRise(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-rise]", { y: 36, opacity: 0 });
        ScrollTrigger.batch("[data-rise]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity" }),
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

/* ───────────────────────── About ───────────────────────── */

export function PaperContact({ studio = false }: { studio?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useRise(root);

  return (
    <footer
      ref={root}
      id="contact"
      className={`relative overflow-hidden bg-background text-white ${
        studio
          ? ""
          : "bg-[radial-gradient(60%_50%_at_50%_100%,rgba(224,121,31,0.2),transparent_70%)]"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-32 sm:pt-44 pb-10">
        {/* Details left, form right on large screens; stacked and centred on phones. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 xl:gap-24">
        <div className="relative text-center lg:text-left">
          {studio ? (
            <>
              <h2 data-rise className="font-display text-[11vw] sm:text-7xl leading-[0.95]">
                Start a project<span className="text-accent">.</span>
              </h2>
              {/* The AS mark's swash, underlining the invitation */}
              <svg data-rise aria-hidden="true" viewBox="0 0 420 40" fill="none" className="mx-auto mt-3 h-auto w-64 sm:w-80 lg:mx-0">
                <path d="M4 26 C 70 6, 130 38, 210 20 S 340 6, 416 18" style={{ stroke: "rgba(var(--s-accent-rgb), 0.75)" }} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p data-rise className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-white/65 lg:mx-0">
                Tell us what your business needs. You&apos;ll get a written, fixed-scope quote before any work starts.
              </p>
            </>
          ) : (
            <>
              <h2 data-rise className="font-display uppercase text-[13vw] sm:text-7xl xl:text-8xl leading-[0.86] tracking-[-0.02em]">
                Let&apos;s build
                <br />
                something
              </h2>
              <p data-rise className="mt-4 font-coffekan text-4xl sm:text-5xl text-accent">before the sun sets.</p>
            </>
          )}

          <a
            data-rise
            href={`mailto:${PROFILE.email}`}
            className="mt-14 inline-block break-all font-sans font-medium text-2xl sm:text-4xl underline decoration-white/20 decoration-1 underline-offset-[0.18em] hover:text-accent hover:decoration-accent transition-colors"
          >
            {PROFILE.email}
          </a>
          <p data-rise className="mt-4">
            <a href={PROFILE.phoneHref} className="font-sans text-2xl sm:text-3xl text-white/80 tabular-nums hover:text-accent transition-colors">
              {PROFILE.phone}
            </a>
          </p>

          <div data-rise className="mt-14">
            <SocialRow className="lg:justify-start" />
          </div>
        </div>

        <div data-rise className="mx-auto mt-20 max-w-2xl lg:mt-0 lg:w-full">
          <ContactForm />
        </div>
        </div>

        {studio ? (
          <div className="mt-24 grid gap-10 border-t border-white/10 pt-12 text-base sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
            <div>
              <Image src="/brand/atelier-monogram.webp" alt="Atelier Systems logo" width={357} height={292} className="h-auto w-12" />
              <p className="mt-4 text-lg text-white/90">Atelier Systems</p>
              <p className="mt-1 max-w-xs leading-relaxed text-white/60">Websites, automation and AI products for growing businesses.</p>
              {/* Quiet, like a note in the margin */}
              <p className="mt-6 max-w-xs text-base italic leading-relaxed text-white/45">
                &ldquo;Do not despise these small beginnings.&rdquo;
                <span className="mt-1 block not-italic">Zechariah 4:10</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-white/55">Studio</p>
              <ul className="mt-3 space-y-2">
                <li><a href="#projects" className="text-white/85 hover:text-accent">Work</a></li>
                <li><a href="#process" className="text-white/85 hover:text-accent">Services and process</a></li>
                <li><Link href="/" className="text-white/85 hover:text-accent">About Rishav Roy</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-white/55">Contact</p>
              <ul className="mt-3 space-y-2">
                <li><a href={`mailto:${PROFILE.email}`} className="break-all text-white/85 hover:text-accent">{PROFILE.email}</a></li>
                <li><a href={PROFILE.phoneHref} className="text-white/85 hover:text-accent">{PROFILE.phone}</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-white/55">Based in</p>
              <p className="mt-3 text-white/85">{PROFILE.location}</p>
              <p className="mt-1 text-white/60">Working with clients remotely</p>
            </div>
            <p className="text-sm text-white/55 sm:col-span-2 lg:col-span-4">&copy; {new Date().getFullYear()} Atelier Systems. All rights reserved.</p>
          </div>
        ) : (
          <p className="mt-24 border-t border-white/10 pt-8 text-center text-sm text-white/60">
            &copy; {new Date().getFullYear()} {PROFILE.name}. Designed and built by me.
          </p>
        )}
      </div>
    </footer>
  );
}
