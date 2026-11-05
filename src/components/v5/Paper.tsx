"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import ContactForm from "../ContactForm";
import Verse from "./Verse";
import { bio, certificates, education, experience, languages, PROFILE, skills } from "@/lib/profile";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * One cheap entrance for the whole paper sheet: `[data-rise]` blocks lift in
 * as they arrive, batched so a row of cards moves together. Transform and
 * opacity only, no scrubbing, so scrolling stays on the compositor.
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
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out" }),
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-sm text-rust">{children}</p>;
}

function SectionTitle({ id, children, note }: { id: string; children: ReactNode; note?: ReactNode }) {
  return (
    <header data-rise className="flex flex-col gap-4 border-b border-ink/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
      <h2 id={id} className="font-display uppercase text-[13vw] sm:text-7xl xl:text-8xl leading-[0.86] tracking-[-0.02em] text-ink">
        {children}
      </h2>
      {note && <div className="max-w-xs text-sm leading-relaxed text-ink/60 sm:text-right">{note}</div>}
    </header>
  );
}

/* ───────────────────────── About, experience, toolkit ───────────────────────── */

export function PaperAbout() {
  const root = useRef<HTMLElement>(null);
  useRise(root);

  return (
    <section ref={root} id="about" aria-labelledby="v5-about" className="px-6 sm:px-12 xl:px-24 pt-24 sm:pt-32 pb-24 sm:pb-32">
      <SectionTitle id="v5-about" note={<Verse text="I can do all things through Christ which strengtheneth me." reference="Philippians 4:13" className="sm:ml-auto sm:text-right" />}>About</SectionTitle>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <blockquote data-rise className="lg:col-span-7 font-display text-4xl sm:text-5xl xl:text-6xl leading-[1.02] tracking-[-0.01em]">
          <span className="text-rust">&ldquo;</span>
          {bio[0]}
          <span className="text-rust">&rdquo;</span>
        </blockquote>
        <div data-rise className="lg:col-span-5 space-y-5 text-lg leading-relaxed text-ink/75">
          {bio.slice(1).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <dl data-rise className="mt-16 grid gap-8 border-y border-ink/15 py-10 sm:grid-cols-3">
        <div>
          <dt><Kicker>Based in</Kicker></dt>
          <dd className="mt-2">{PROFILE.location}<span className="block text-sm text-ink/55">from {PROFILE.hometown}</span></dd>
        </div>
        <div>
          <dt><Kicker>Languages</Kicker></dt>
          <dd className="mt-2">{languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}</dd>
        </div>
        <div>
          <dt><Kicker>Education</Kicker></dt>
          <dd className="mt-2 space-y-2">
            {education.map((e) => (
              <span key={e.degree} className="block">
                {e.degree}
                <span className="block text-sm text-ink/55">{e.school}, {e.period}</span>
              </span>
            ))}
          </dd>
        </div>
      </dl>

      {/* Experience: compact rows, details open on demand (tap or click) */}
      <h3 data-rise className="mt-24 font-display uppercase text-4xl sm:text-5xl">Experience</h3>
      <ol className="mt-8 border-t border-ink/15">
        {experience.map((job) => (
          <li key={job.company} data-rise className="border-b border-ink/15">
            <details className="group" open={job === experience[0]}>
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6 sm:grid-cols-[12rem_1fr_auto] [&::-webkit-details-marker]:hidden">
                <span className="order-2 col-span-2 text-sm text-ink/55 sm:order-none sm:col-span-1">{job.period}</span>
                <span>
                  <span className="font-display uppercase text-2xl sm:text-3xl leading-none">{job.role}</span>
                  <span className="mt-1 block text-sm text-ink/60">
                    {job.company}
                    {"remote" in job && job.remote && ", remote"}
                  </span>
                </span>
                <span aria-hidden="true" className="font-mono text-xl text-rust transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <ul className="space-y-2 pb-8 sm:pl-[calc(12rem+1.5rem)] text-[15px] leading-relaxed text-ink/75">
                {job.bullets.map((b) => (
                  <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2.5 before:bg-rust">{b}</li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ol>

      {/* Toolkit + credentials side by side */}
      <div className="mt-24 grid gap-16 lg:grid-cols-12">
        <div data-rise className="lg:col-span-7">
          <h3 className="font-display uppercase text-4xl sm:text-5xl">Toolkit</h3>
          <dl className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
            {skills.map((g) => (
              <div key={g.category} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt><Kicker>{g.category}</Kicker></dt>
                <dd className="text-ink/80">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div id="certificates" data-rise className="lg:col-span-5">
          <h3 className="font-display uppercase text-4xl sm:text-5xl">Credentials</h3>
          <ul className="mt-8 grid grid-cols-2 gap-4">
            {certificates.map((c) => (
              <li key={c.title}>
                <a href={c.pdf} target="_blank" rel="noopener noreferrer" className="group block">
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white ring-1 ring-ink/10 transition-shadow group-hover:shadow-[0_20px_40px_-20px_rgba(27,20,13,0.5)]">
                    <Image src={c.image} alt={`${c.title} certificate, ${c.issuer}`} fill sizes="(max-width: 1023px) 50vw, 20vw" className="object-contain" />
                  </figure>
                  <p className="mt-3 text-sm leading-snug group-hover:text-rust transition-colors">{c.title}</p>
                  <p className="text-xs text-ink/55">{c.issuer}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact (night returns) ───────────────────────── */

export function PaperContact() {
  const root = useRef<HTMLElement>(null);
  useRise(root);

  return (
    <footer ref={root} id="contact" className="relative bg-background px-6 sm:px-12 xl:px-24 pt-24 sm:pt-32 pb-10 text-white">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div data-rise>
          <h2 className="font-display uppercase text-[14vw] sm:text-8xl xl:text-9xl leading-[0.86] tracking-[-0.02em]">
            Let&apos;s build something
          </h2>
          <p className="mt-4 font-coffekan text-4xl text-accent">before the sun sets.</p>

          <a
            href={`mailto:${PROFILE.email}`}
            className="mt-12 block break-all font-display text-3xl sm:text-4xl underline decoration-white/25 underline-offset-[0.2em] hover:text-accent hover:decoration-accent transition-colors"
          >
            {PROFILE.email}
          </a>
          <a href={PROFILE.phoneHref} className="mt-3 block font-display text-2xl sm:text-3xl text-white/80 hover:text-accent transition-colors">
            {PROFILE.phone}
          </a>

          <ul className="mt-10 flex flex-wrap gap-2">
            {PROFILE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors">
                  {s.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <a href={PROFILE.resume} download className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm hover:border-accent hover:text-accent transition-colors">
                Résumé <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <div data-rise>
          <ContactForm />
        </div>
      </div>
      <p className="mt-24 border-t border-white/10 pt-8 text-sm text-white/50">
        &copy; {new Date().getFullYear()} {PROFILE.name}. Designed and built by me, for the glory of Jesus Christ.
        <span className="ml-1 font-medium text-accent">Psalm 90:17</span>
      </p>
    </footer>
  );
}
