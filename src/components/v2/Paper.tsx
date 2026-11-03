"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import ContactForm from "../ContactForm";
import { commissions, otherWork } from "@/lib/work";
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
      {note && <p className="max-w-xs text-sm leading-relaxed text-ink/60 sm:text-right">{note}</p>}
    </header>
  );
}

/* ───────────────────────── Paid projects ───────────────────────── */

export function PaperWork() {
  const root = useRef<HTMLElement>(null);
  useRise(root);

  return (
    <section ref={root} id="projects" aria-labelledby="v2-work" className="px-6 sm:px-12 xl:px-24 pt-24 sm:pt-32">
      <SectionTitle id="v2-work" note={<>Commercial builds for paying clients, each with a full case study.</>}>
        Paid Projects
      </SectionTitle>

      <ol>
        {commissions.map((p, i) => (
          <li key={p.id} className="border-b border-ink/15 py-14 sm:py-20">
            <article>
              <Link
                href={`/projects/${p.slug}`}
                data-rise
                className="group block relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-paper-2"
              >
                <Image
                  src={p.images[0]}
                  alt={`${p.title}, main screen`}
                  fill
                  sizes="(max-width: 1279px) 100vw, 1240px"
                  className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.02]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink">
                  {p.status}
                </span>
              </Link>

              <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div data-rise className="lg:col-span-5">
                  <Kicker>Project 0{i + 1}, {p.period}</Kicker>
                  <h3 className="mt-3 font-display uppercase text-5xl sm:text-6xl leading-[0.9] tracking-[-0.02em]">
                    <Link href={`/projects/${p.slug}`} className="hover:text-rust transition-colors">
                      {p.title}
                    </Link>
                  </h3>
                </div>
                <p data-rise className="lg:col-span-4 text-lg leading-relaxed text-ink/75">
                  {p.description}
                </p>
                <div data-rise className="lg:col-span-3 flex flex-col gap-5">
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-ink/50">Client</dt>
                      <dd>{p.client}</dd>
                    </div>
                    <div>
                      <dt className="text-ink/50">Built with</dt>
                      <dd>{p.tags.slice(0, 4).join(", ")}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-rust transition-colors"
                    >
                      Case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/25 px-5 py-3 text-sm hover:border-ink transition-colors"
                      >
                        Visit <span className="sr-only">{p.title}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* The two detail screens, small and side by side */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:ml-[41.666%]">
                {p.images.slice(1, 3).map((src, k) => (
                  <figure key={src} data-rise className="relative aspect-[16/10] overflow-hidden rounded-xl bg-paper-2">
                    <Image src={src} alt={`${p.title}, detail ${k + 1}`} fill sizes="(max-width: 1023px) 50vw, 30vw" className="object-cover object-top" />
                  </figure>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────────────────── Everything else ───────────────────────── */

export function PaperMoreWork() {
  const root = useRef<HTMLElement>(null);
  useRise(root);
  const withShots = otherWork.filter((w) => w.preview);
  const textOnly = otherWork.filter((w) => !w.preview);

  return (
    <section ref={root} id="selected-work" aria-labelledby="v2-more" className="px-6 sm:px-12 xl:px-24 pt-24 sm:pt-32">
      <SectionTitle id="v2-more" note={<>Tools, showcases and experiments, built for clients, for practice, and for my own job hunt.</>}>
        More Work
      </SectionTitle>

      <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
        {withShots.map((w) => (
          <li key={w.id} data-rise>
            <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-2 ring-1 ring-ink/10 transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-24px_rgba(27,20,13,0.45)]">
                <Image src={w.preview!} alt={`${w.title} screenshot`} fill sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover object-top" />
              </figure>
              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="font-display uppercase text-3xl leading-[0.95] group-hover:text-rust transition-colors">{w.title}</h3>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink/40 group-hover:text-rust transition-colors" aria-hidden="true" />
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{w.description}</p>
              <p className="mt-3 text-sm text-ink/50">
                <span className="text-rust">{w.badge}</span>, {w.tags.join(", ")}
              </p>
            </a>
          </li>
        ))}
      </ul>

      {textOnly.length > 0 && (
        <ul data-rise className="mt-16 border-t border-ink/15">
          {textOnly.map((w) => (
            <li key={w.id} className="border-b border-ink/15">
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] md:gap-10 md:items-baseline">
                <span className="font-display uppercase text-2xl group-hover:text-rust transition-colors">{w.title}</span>
                <span className="text-[15px] leading-relaxed text-ink/65">{w.description}</span>
                <ArrowUpRight className="hidden md:block h-5 w-5 text-ink/40 group-hover:text-rust" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ───────────────────────── About, experience, toolkit ───────────────────────── */

export function PaperAbout() {
  const root = useRef<HTMLElement>(null);
  useRise(root);

  return (
    <section ref={root} id="about" aria-labelledby="v2-about" className="px-6 sm:px-12 xl:px-24 pt-24 sm:pt-32 pb-24 sm:pb-32">
      <SectionTitle id="v2-about">About</SectionTitle>

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
        &copy; {new Date().getFullYear()} {PROFILE.name}. Designed and built by me.
      </p>
    </footer>
  );
}
