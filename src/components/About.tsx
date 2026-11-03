"use client";

import { useRef } from "react";
import { bio, education, experience, languages, PROFILE, skills } from "@/lib/profile";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useSectionMotion } from "@/lib/motion";

/** "Jan 2025 to Jul 2026" -> ["2025", "2026"] for the big year column. */
function years(period: string) {
  const found = period.match(/\d{4}/g) ?? [];
  return [found[0], found[found.length - 1]];
}

export default function About() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  // The statement fills in word by word as it passes through the viewport,
  // and the experience rail draws down alongside the roles.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create("[data-reveal]", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: "[data-reveal]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-rail-wrap]", start: "top 70%", end: "bottom 60%", scrub: true },
          },
        );
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative px-6 sm:px-12 xl:px-24 pt-32 sm:pt-44">
      <h2
        id="about-title"
        data-heading
        className="font-display uppercase text-[17vw] sm:text-[12vw] xl:text-[10vw] leading-[0.85] tracking-[-0.02em] text-white"
      >
        About
      </h2>

      {/* Statement */}
      <p
        data-reveal
        className="mt-14 sm:mt-20 max-w-5xl text-3xl sm:text-5xl xl:text-6xl font-medium leading-[1.12] tracking-[-0.025em] text-white text-balance"
      >
        {bio[0]}
      </p>

      {/* Facts + the rest of the story */}
      <div className="mt-20 sm:mt-28 grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-14 lg:gap-24">
        <dl className="grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-8 self-start lg:sticky lg:top-[14vh]">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/85">Based in</dt>
            <dd className="mt-2 text-white/85">
              {PROFILE.location}
              <span className="block text-sm text-white/55">originally from {PROFILE.hometown}</span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/85">Speaks</dt>
            <dd className="mt-2 text-white/85">
              {languages.map((l) => (
                <span key={l.name} className="block">
                  {l.name} <span className="text-sm text-white/50">{l.level.toLowerCase()}</span>
                </span>
              ))}
            </dd>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/85">Studied</dt>
            <dd className="mt-2 space-y-3 text-white/85">
              {education.map((e) => (
                <span key={e.degree} className="block">
                  {e.degree}
                  <span className="block text-sm text-white/55">
                    {e.school} · {e.period}
                  </span>
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-white/75 max-w-[62ch]">
          {bio.slice(1).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mt-32 sm:mt-44">
        <h3 className="font-coffekan text-5xl sm:text-6xl text-accent">Work Experience</h3>

        <ol data-rail-wrap className="relative mt-12">
          <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden lg:block">
            <span data-rail className="absolute inset-0 origin-top bg-gradient-to-b from-accent via-ember to-transparent" />
          </span>

          {experience.map((job) => {
            const [from, to] = years(job.period);
            return (
              <li
                key={job.company}
                className="relative grid lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,6fr)] gap-6 lg:gap-12 border-t border-white/10 py-12 lg:pl-12"
              >
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute left-0 top-14 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background"
                />
                <p className="font-display text-5xl sm:text-6xl leading-none text-white/90 tracking-[-0.02em]">
                  {from}
                  {to !== from && <span className="text-accent">&ndash;{to?.slice(2)}</span>}
                  <span className="mt-3 block font-mono text-[11px] tracking-[0.15em] uppercase text-white/50">{job.period}</span>
                </p>
                <div>
                  <h4 className="font-display uppercase text-3xl sm:text-4xl leading-[0.95] text-white">{job.role}</h4>
                  <p className="mt-2 text-sm text-white/60">{job.company}</p>
                  {"remote" in job && job.remote && (
                    <span className="mt-3 inline-block rounded-full border border-emerald-400/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-300">
                      Remote
                    </span>
                  )}
                </div>
                <ul className="space-y-3 text-base leading-relaxed text-white/70">
                  {job.bullets.map((b) => (
                    <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent">
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Toolkit */}
      <div className="mt-32 sm:mt-44">
        <h3 className="font-coffekan text-5xl sm:text-6xl text-accent">Toolkit</h3>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-12 border-t border-white/10 pt-10">
          {skills.map((group) => (
            <div key={group.category}>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/85">{group.category}</h4>
              <ul className="mt-4 space-y-2 text-white/80">
                {group.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
