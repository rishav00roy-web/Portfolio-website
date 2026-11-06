"use client";

import { useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import ContactForm from "../ContactForm";
import SocialRow from "./SocialRow";
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
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out", clearProps: "transform,opacity" }),
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
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
              <p data-rise className="mt-6 max-w-xs text-base leading-relaxed text-ink/55">
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

            <dl data-rise className="mt-12 grid gap-x-8 gap-y-3 border-t border-ink/10 pt-8 text-lg leading-relaxed sm:grid-cols-[9.5rem_minmax(0,1fr)]">
              <dt className="text-ink/55">Based in</dt>
              <dd className="text-ink/80">{PROFILE.location}</dd>
              <dt className="text-ink/55">Runs</dt>
              <dd className="text-ink/80">
                <a href="/atelier" className="underline decoration-ink/25 underline-offset-4 hover:text-rust hover:decoration-rust">Atelier Systems</a>, my studio
              </dd>
              <dt className="text-ink/55">Client sites</dt>
              <dd className="text-ink/80">{PROFILE.currently.join(", ")}</dd>
              <dt className="text-ink/55">Speaks</dt>
              <dd className="text-ink/80">{languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ")}</dd>
              <dt className="text-ink/55">Résumé</dt>
              <dd className="text-ink/80">
                <a href={PROFILE.resume} download className="inline-flex items-center gap-1.5 underline decoration-ink/25 underline-offset-4 hover:text-rust hover:decoration-rust">
                  Download the PDF <Download className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <span className="text-ink/55">, updated {PROFILE.resumeUpdated}</span>
              </dd>
            </dl>
          </div>
        </div>

        {/* Experience: quiet rows, everything readable without a click */}
        <div className="mt-28 sm:mt-36 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <h3 data-rise className="text-3xl sm:text-4xl font-medium tracking-[-0.01em]">Experience</h3>
          <ol className="space-y-12">
            {experience.map((job) => (
              <li key={job.company} data-rise className="grid gap-x-8 gap-y-2 border-t border-ink/10 pt-8 sm:grid-cols-[12rem_minmax(0,1fr)]">
                <p className="whitespace-nowrap text-base text-ink/55 sm:pt-1.5">{job.period}</p>
                <div className="min-w-0">
                  <h4 className="text-2xl sm:text-[1.75rem] font-medium leading-snug text-ink/90">{job.role}</h4>
                  <p className="mt-1 text-base text-ink/55">
                    {job.company}
                    {"remote" in job && job.remote && ", remote"}
                  </p>
                  <ul className="mt-5 space-y-3 text-lg leading-relaxed text-ink/70">
                    {job.bullets.map((b) => (
                      <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2 before:bg-ink/30">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Toolkit, studies and credentials */}
        <div className="mt-28 sm:mt-36 grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div data-rise className="min-w-0">
            <h3 className="text-3xl sm:text-4xl font-medium tracking-[-0.01em]">Toolkit</h3>
            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {/* Each group opens on demand: a full wall of skill names is noise. */}
              {skills.map((g) => (
                <details key={g.category} className="group border-b border-ink/10 pb-4">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="text-lg text-ink/85">{g.category}</span>
                    <span className="shrink-0 text-base text-rust">
                      {g.items.length}
                      <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-300 group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-lg leading-relaxed text-ink/70">{g.items.join(", ")}</p>
                </details>
              ))}
              <div>
                <h4 className="text-base text-rust">Studies</h4>
                {education.map((e) => (
                  <p key={e.degree} className="mt-2 text-lg leading-relaxed text-ink/80">
                    {e.degree}
                    <span className="block text-base text-ink/55">
                      {e.school}{"period" in e && e.period ? `, ${e.period}` : ""}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div id="certificates" data-rise className="min-w-0">
            <h3 className="text-3xl sm:text-4xl font-medium tracking-[-0.01em]">Credentials</h3>
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
                    <span className="mt-4 block text-base leading-snug group-hover:text-rust transition-colors">{c.title}</span>
                    <span className="block text-sm text-ink/55">{c.issuer}</span>
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
              <Image src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="h-auto w-12" />
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
                <li><a href="/v10" className="text-white/85 hover:text-accent">About Rishav Roy</a></li>
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
