"use client";

import { useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { bio, certificates, education, experience, languages, PROFILE, skills } from "@/lib/profile";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * v10, the portfolio told as an evening walk down from the hero's mountains.
 * - The story: the opening paragraph sits in the dark and each word lights
 *   up as you read down to it, like the last sun catching the ridge.
 * - The trail: experience as stations on a mountain path that draws itself
 *   in amber as you scroll; each station's lamp lights when you reach it.
 * - The pack: toolkit, studies and credentials, laid out in the open.
 * Motion is opacity and stroke only, scrubbed to the scroll, never pinned.
 */

/** One hand-drawn switchback, repeated down the trail: x wanders 6..34 in a 40-wide box. */
const TRAIL = "M20 0 C 34 60, 6 110, 20 170 S 34 280, 18 340 S 4 450, 22 510 S 36 620, 20 680 S 6 790, 20 850 S 32 940, 20 1000";

export default function Journal() {
  const root = useRef<HTMLDivElement>(null);
  const words = bio[0].split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The story lights up word by word.
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-story]", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );

        // The trail draws itself down the page.
        gsap.fromTo(
          "[data-trail]",
          { yPercent: 0 },
          {
            yPercent: 100,
            ease: "none",
            scrollTrigger: { trigger: "[data-trail-wrap]", start: "top 70%", end: "bottom 70%", scrub: true },
          },
        );

        // Each station's lamp lights as the walker reaches it.
        gsap.utils.toArray<HTMLElement>("[data-station]").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 70%",
            onEnter: () => el.classList.add("is-lit"),
            onLeaveBack: () => el.classList.remove("is-lit"),
          });
        });

        gsap.set("[data-rise]", { y: 30, opacity: 0 });
        ScrollTrigger.batch("[data-rise]", {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.1, stagger: 0.05, ease: "expo.out" }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} id="about" className="relative">
      {/* ─────────── The story ─────────── */}
      <section aria-labelledby="j-story" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-32 sm:pt-48">
        <h2 id="j-story" className="sr-only">About me</h2>
        <p data-story className="max-w-[22ch] font-display text-[9vw] sm:text-6xl xl:text-7xl leading-[1.05] tracking-[-0.015em] sm:max-w-[24ch]">
          {words.map((w, i) => (
            <span key={i} data-word className="inline">
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <p data-rise className="max-w-xs text-base leading-relaxed text-ink/55">
            I can do all things through Christ which strengtheneth me.
            <span className="mt-1 block text-ink/60">Philippians 4:13</span>
          </p>
          <div className="min-w-0">
            <div data-rise className="space-y-5 text-lg leading-relaxed text-ink/70">
              {bio.slice(1).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <dl data-rise className="mt-12 grid gap-x-8 gap-y-3 border-t border-ink/10 pt-8 text-lg leading-relaxed sm:grid-cols-[9.5rem_minmax(0,1fr)]">
              <dt className="text-ink/55">Based in</dt>
              <dd className="text-ink/85">{PROFILE.location}, from {PROFILE.hometown}</dd>
              <dt className="text-ink/55">Runs</dt>
              <dd className="text-ink/85">
                <a href="/atelier-2" className="underline decoration-ink/25 underline-offset-4 hover:text-rust hover:decoration-rust">Atelier Systems</a>, my studio
              </dd>
              <dt className="text-ink/55">Speaks</dt>
              <dd className="text-ink/85">{languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}</dd>
              <dt className="text-ink/55">Résumé</dt>
              <dd className="text-ink/85">
                <a href={PROFILE.resume} download className="inline-flex items-center gap-1.5 underline decoration-ink/25 underline-offset-4 hover:text-rust hover:decoration-rust">
                  Download the PDF <Download className="h-4 w-4" aria-hidden="true" />
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </section>

      {/* ─────────── The trail ─────────── */}
      <section aria-labelledby="j-trail" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-36 sm:pt-52">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-28">
              <h2 id="j-trail" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-[-0.015em]">
                The way here
              </h2>
              <p data-rise className="mt-5 max-w-sm text-lg leading-relaxed text-ink/60">
                Six years running operations before I wrote software for a living. Most recent first.
              </p>
            </div>
          </div>

          <div data-trail-wrap className="relative min-w-0 pl-14 sm:pl-20">
            {/* The path itself: a faint guide, and the amber line drawn over it */}
            <svg aria-hidden="true" viewBox="0 0 40 1000" preserveAspectRatio="none" className="absolute left-0 top-2 bottom-0 h-[calc(100%-0.5rem)] w-10 sm:w-14 overflow-visible">
              <path d={TRAIL} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" className="text-ink/25" strokeDasharray="2 7" />
            </svg>
            {/*
              The amber line sits under a page-coloured cover that slides down
              and away as you scroll (transform only, no repaint of the tall
              line). Non-scaling strokes ignore pathLength dashes, hence this.
            */}
            <div aria-hidden="true" className="absolute left-0 top-2 bottom-0 w-10 overflow-hidden sm:w-14">
              <svg viewBox="0 0 40 1000" preserveAspectRatio="none" className="h-full w-full">
                <path d={TRAIL} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" className="text-rust" />
              </svg>
              <div data-trail className="absolute inset-0 translate-y-full bg-paper motion-safe:translate-y-0" />
            </div>

            <ol className="space-y-24 sm:space-y-28">
              {experience.map((job) => (
                <li key={job.company} data-station className="trail-station relative">
                  <span aria-hidden="true" className="trail-lamp absolute -left-[3.15rem] top-2 h-3 w-3 rounded-full border border-ink/40 bg-paper sm:-left-[4.4rem]" />
                  <p className="text-base text-ink/55">{job.period}</p>
                  <h3 className="mt-2 text-3xl sm:text-4xl font-medium leading-tight tracking-[-0.01em]">{job.role}</h3>
                  <p className="mt-2 text-lg text-ink/60">
                    {job.company}
                    {"remote" in job && job.remote && ", remote"}
                  </p>
                  <ul className="mt-6 space-y-3 text-lg leading-relaxed text-ink/70">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─────────── The pack ─────────── */}
      <section aria-labelledby="j-pack" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-36 sm:pt-52 pb-28 sm:pb-40">
        <h2 id="j-pack" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-[-0.015em]">
          What I carry
        </h2>
        <div className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((g) => (
            <div key={g.category} data-rise className="border-t border-ink/15 pt-6">
              <h3 className="text-xl font-medium text-rust">{g.category}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/75">{g.items.join(", ")}</p>
            </div>
          ))}
          <div data-rise className="border-t border-ink/15 pt-6">
            <h3 className="text-xl font-medium text-rust">Studies</h3>
            {education.map((e) => (
              <p key={e.degree} className="mt-4 text-lg leading-relaxed text-ink/80">
                {e.degree}
                <span className="block text-base text-ink/55">
                  {e.school}{"period" in e && e.period ? `, ${e.period}` : ""}
                </span>
              </p>
            ))}
          </div>
        </div>

        <ul id="certificates" className="mt-20 grid gap-8 sm:grid-cols-2 lg:max-w-4xl">
          {certificates.map((c) => (
            <li key={c.title} data-rise>
              <a href={c.pdf} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[7rem_minmax(0,1fr)] items-center gap-5">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-md bg-[#f4ede3] ring-1 ring-ink/10">
                  <Image src={c.image} alt={`${c.title} certificate, ${c.issuer}`} fill sizes="7rem" className="object-contain p-1" />
                </span>
                <span>
                  <span className="block text-lg leading-snug group-hover:text-rust transition-colors">{c.title}</span>
                  <span className="block text-base text-ink/55">{c.issuer}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
