"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import ContactForm from "../ContactForm";
import { bio, certificates, education, experience, languages, PROFILE, skills } from "@/lib/profile";
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
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out" }),
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

/** "Jan 2025 to Jul 2026" -> "2025–26" */
function span(period: string) {
  const y = period.match(/\d{4}/g) ?? [];
  const [a, b] = [y[0], y[y.length - 1]];
  return a === b ? a : `${a}–${b?.slice(2)}`;
}

/* ───────────────────────── About ───────────────────────── */

export function PaperAbout() {
  const root = useRef<HTMLElement>(null);
  useRise(root);

  return (
    <section ref={root} id="about" aria-labelledby="v5-about" className="relative z-10 bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-28 sm:pt-40 pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="min-w-0">
            <div className="lg:sticky lg:top-24">
              <h2 id="v5-about" data-rise className="font-display uppercase text-[14vw] sm:text-7xl xl:text-8xl leading-[0.85] tracking-[-0.02em]">
                About
              </h2>
              {/* Quiet, like a note in the margin */}
              <p data-rise className="mt-6 max-w-xs text-sm leading-relaxed text-ink/40">
                I can do all things through Christ which strengtheneth me.
                <span className="block mt-1 text-ink/55">Philippians 4:13</span>
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <p data-rise className="font-display text-3xl sm:text-4xl leading-[1.1] tracking-[-0.01em]">
              {bio[0]}
            </p>
            <details data-rise className="group mt-8 max-w-[62ch]">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-rust [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Read the rest</span>
                <span className="hidden group-open:inline">Show less</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70">
                {bio.slice(1).map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </details>
          </div>
        </div>

        {/* At a glance: the facts that used to crowd the hero */}
        <dl data-rise className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-paper p-6 sm:p-8">
            <dt className="text-sm text-rust">Based in</dt>
            <dd className="mt-3 font-display text-3xl leading-none">{PROFILE.location}</dd>
            <dd className="mt-2 text-sm text-ink/55">originally from {PROFILE.hometown}</dd>
          </div>
          <div className="bg-paper p-6 sm:p-8">
            <dt className="text-sm text-rust">Working with</dt>
            {PROFILE.currently.map((c) => (
              <dd key={c} className="mt-2 text-ink/85">{c}</dd>
            ))}
          </div>
          <div className="bg-paper p-6 sm:p-8">
            <dt className="text-sm text-rust">Speaks</dt>
            {languages.map((l) => (
              <dd key={l.name} className="mt-2 text-ink/85">
                {l.name} <span className="text-sm text-ink/50">{l.level.toLowerCase()}</span>
              </dd>
            ))}
          </div>
          <div className="bg-paper p-6 sm:p-8">
            <dt className="text-sm text-rust">Résumé</dt>
            <dd className="mt-3">
              <a href={PROFILE.resume} download className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-rust px-5 py-3 text-sm font-semibold text-paper hover:opacity-90 transition-opacity">
                Download PDF <Download className="h-4 w-4" aria-hidden="true" />
              </a>
            </dd>
            <dd className="mt-3 text-sm text-ink/55">Updated {PROFILE.resumeUpdated}</dd>
          </div>
        </dl>

        {/* Experience */}
        <div className="mt-32 sm:mt-40">
          <h3 data-rise className="font-display uppercase text-4xl sm:text-5xl leading-[0.9]">Experience</h3>
          <ol className="mt-6 border-t border-ink/15">
            {experience.map((job) => (
              <li key={job.company} data-rise className="border-b border-ink/15">
                <details className="group">
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 py-7 sm:grid-cols-[13rem_minmax(0,1fr)_auto] [&::-webkit-details-marker]:hidden">
                    <span className="whitespace-nowrap font-display text-4xl sm:text-5xl leading-none text-rust">{span(job.period)}</span>
                    <span className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:row-start-auto">
                      <span className="block font-display uppercase text-2xl sm:text-4xl leading-[0.95]">{job.role}</span>
                      <span className="mt-1 block text-sm text-ink/55">
                        {job.company}
                        {"remote" in job && job.remote && ", remote"}
                      </span>
                    </span>
                    <span aria-hidden="true" className="col-start-2 row-start-1 grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-rust transition-transform duration-300 group-open:rotate-45 sm:col-start-auto sm:row-start-auto">
                      +
                    </span>
                  </summary>
                  <ul className="grid gap-x-10 gap-y-3 pb-8 text-[15px] leading-relaxed text-ink/70 sm:pl-[calc(13rem+1.5rem)] lg:grid-cols-2">
                    {job.bullets.map((b) => (
                      <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2.5 before:bg-rust">
                        {b}
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ol>
        </div>

        {/* Toolkit, studies and credentials */}
        <div className="mt-32 sm:mt-40 grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div data-rise className="min-w-0">
            <h3 className="font-display uppercase text-4xl sm:text-5xl leading-[0.9]">Toolkit</h3>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {/* Each group opens on demand: a full wall of skill names is noise. */}
              {skills.map((g) => (
                <details key={g.category} className="group border-b border-ink/10 pb-4">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="text-ink/85">{g.category}</span>
                    <span className="shrink-0 text-sm text-rust">
                      {g.items.length}
                      <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink/65">{g.items.join(", ")}</p>
                </details>
              ))}
              <div>
                <h4 className="text-sm text-rust">Studies</h4>
                {education.map((e) => (
                  <p key={e.degree} className="mt-2 leading-relaxed text-ink/80">
                    {e.degree}
                    <span className="block text-sm text-ink/50">
                      {e.school}, {e.period}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div id="certificates" data-rise className="min-w-0">
            <h3 className="font-display uppercase text-4xl sm:text-5xl leading-[0.9]">Credentials</h3>
            <ul className="mt-6 grid grid-cols-2 gap-5">
              {certificates.map((c, i) => (
                <li key={c.title}>
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block transition-transform duration-700 ease-out-expo hover:rotate-0 ${i === 0 ? "-rotate-2" : "rotate-2 translate-y-6"}`}
                  >
                    <span className="block rounded-md bg-[#f4ede3] p-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
                      <span className="relative block aspect-[4/3] overflow-hidden bg-white">
                        <Image src={c.image} alt={`${c.title} certificate, ${c.issuer}`} fill sizes="(max-width: 1023px) 45vw, 20vw" className="object-contain" />
                      </span>
                    </span>
                    <span className="mt-4 block text-sm leading-snug group-hover:text-rust transition-colors">{c.title}</span>
                    <span className="block text-xs text-ink/50">{c.issuer}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */

export function PaperContact() {
  const root = useRef<HTMLElement>(null);
  useRise(root);

  return (
    <footer
      ref={root}
      id="contact"
      className="relative overflow-hidden bg-background text-white bg-[radial-gradient(60%_50%_at_50%_100%,rgba(224,121,31,0.2),transparent_70%)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-32 sm:pt-44 pb-10">
        <div className="text-center">
          <h2 data-rise className="font-display uppercase text-[13vw] sm:text-7xl xl:text-8xl leading-[0.86] tracking-[-0.02em]">
            Let&apos;s build
            <br />
            something
          </h2>
          <p data-rise className="mt-4 font-coffekan text-4xl sm:text-5xl text-accent">before the sun sets.</p>

          <a
            data-rise
            href={`mailto:${PROFILE.email}`}
            className="mt-14 inline-block break-all font-display text-2xl sm:text-4xl underline decoration-white/20 decoration-1 underline-offset-[0.18em] hover:text-accent hover:decoration-accent transition-colors"
          >
            {PROFILE.email}
          </a>
          <p data-rise className="mt-4">
            <a href={PROFILE.phoneHref} className="font-display text-2xl sm:text-3xl text-white/80 hover:text-accent transition-colors">
              {PROFILE.phone}
            </a>
          </p>

          <ul data-rise className="mt-10 flex flex-wrap justify-center gap-2">
            {PROFILE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm hover:border-accent hover:text-accent transition-colors">
                  {s.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <a href={PROFILE.resume} download className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm hover:border-accent hover:text-accent transition-colors">
                Résumé <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div data-rise className="mx-auto mt-20 max-w-2xl">
          <ContactForm />
        </div>

        <p className="mt-24 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} {PROFILE.name}. Designed and built by me.
        </p>
      </div>
    </footer>
  );
}
