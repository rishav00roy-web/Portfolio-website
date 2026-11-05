"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AIStage from "../v5/AIStage";
import { commissions, otherWork } from "@/lib/work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * /atelier-2: the studio's page drawn as an architect's sheet. A framed
 * drawing with registration marks and a title block opens it; the work
 * slides past sideways like drawings pulled from a plan chest (desktop
 * only, a plain stack on phones); the process is a dimension line; and the
 * AI products keep their tabbed stage. Graphite, chalk and lime from .studio.
 */

export const SERVICES = [
  { name: "Websites and migrations", detail: "New builds, or an existing HTML site moved to Next.js and React." },
  { name: "Search-ready structure", detail: "Titles, meta, canonical URLs and location pages for local search." },
  { name: "Owner-run admin", detail: "A CMS or dashboard the owner updates without calling a developer." },
  { name: "Integrations", detail: "Maps, payments, booking and the tools a business already uses." },
  { name: "AI agents and automation", detail: "Systems that take repetitive work off a team's plate." },
  { name: "Monthly care", detail: "Updates, fixes and uptime checks after launch, month to month." },
];

export const PROCESS = [
  { name: "A fixed scope", detail: "A written quote listing exactly what gets built." },
  { name: "Half to start", detail: "50% up front, the rest on delivery." },
  { name: "Two rounds of revisions", detail: "Each round is one consolidated list of changes." },
  { name: "Handover", detail: "Once paid in full, the code and access are yours." },
];

const AI_ID = "job-tracker-and-email-tracker";
const drawings = [
  ...commissions.map((p) => ({
    key: p.slug,
    title: p.title,
    description: p.description,
    note: p.status === "Live" ? "Client build, live" : "Client build, in progress",
    image: p.images[0],
    href: `/projects/${p.slug}`,
    internal: true,
  })),
  ...otherWork
    .filter((w) => w.id !== AI_ID && w.id !== "gym-crm" && w.preview)
    .map((w) => ({ key: w.id, title: w.title, description: w.description, note: w.badge, image: w.preview!, href: w.href, internal: false })),
];

/** Corner registration marks, like a printed drawing sheet. */
function Ticks() {
  const c = "absolute h-4 w-4 border-ink/40";
  return (
    <span aria-hidden="true">
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

export default function Sheet() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-mark]", { opacity: 0, scale: 0.94, duration: 1.8, ease: "expo.out", delay: 0.1 });
        gsap.from("[data-sheet-in]", { y: 24, opacity: 0, duration: 1.2, stagger: 0.05, ease: "expo.out", delay: 0.2 });

        gsap.set("[data-rise]", { y: 30, opacity: 0 });
        ScrollTrigger.batch("[data-rise]", {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.1, stagger: 0.05, ease: "expo.out" }),
        });

        // The dimension line extends across the process as it arrives.
        gsap.fromTo("[data-dim]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-dim-wrap]", start: "top 80%", end: "top 35%", scrub: true } });
      });

      // The plan chest: on wide screens the drawings slide past sideways.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = document.querySelector<HTMLElement>("[data-track]");
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-chest]",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ─────────── Sheet 01: the studio ─────────── */}
      <section aria-labelledby="sheet-title" className="px-4 sm:px-8 pt-2 pb-10">
        <div className="studio-grid-full relative mx-auto max-w-[1440px] border border-ink/15 px-6 py-12 sm:px-12 sm:py-16 xl:px-16">
          <Ticks />
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:min-h-[min(38rem,72svh)]">
            <div className="min-w-0">
              <h1 id="sheet-title" data-sheet-in className="font-display text-[15vw] sm:text-8xl xl:text-[8.5rem] leading-[0.9]">
                Atelier
                <br />
                Systems
              </h1>
              <p data-sheet-in className="mt-8 max-w-xl text-xl sm:text-2xl leading-snug text-ink/85">
                Websites, automation and AI agents for small businesses, drawn up and built end to end.
              </p>
              <div data-sheet-in className="mt-10 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rust px-7 py-3.5 text-base font-semibold text-paper hover:opacity-90 transition-opacity">
                  Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#projects" className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-7 py-3.5 text-base hover:border-rust hover:text-rust transition-colors">
                  See the work
                </a>
              </div>
            </div>
            <div className="relative hidden min-w-0 lg:block">
              {/* Construction lines through the mark's centre */}
              <span aria-hidden="true" className="absolute left-1/2 top-[-3rem] bottom-[-3rem] w-px bg-ink/10" />
              <span aria-hidden="true" className="absolute top-1/2 left-[-2rem] right-[-2rem] h-px bg-ink/10" />
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10" />
              <Image data-mark src="/brand/atelier-monogram.webp" alt="" width={357} height={292} priority className="relative mx-auto h-auto w-full max-w-[24rem]" />
            </div>
          </div>

          {/* Title block, bottom right, the way every drawing is signed off */}
          <dl data-sheet-in className="mt-14 grid border border-ink/15 text-base sm:grid-cols-4 lg:ml-auto lg:max-w-3xl">
            {[
              ["Studio", "Atelier Systems"],
              ["Principal", "Rishav Roy"],
              ["Based in", "Kolkata, India"],
              ["Disciplines", "Web, automation, AI"],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-ink/15 px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <dt className="text-sm text-ink/55">{k}</dt>
                <dd className="mt-0.5 text-ink/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─────────── What the studio does ─────────── */}
      <section aria-labelledby="services-title" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-24 sm:pt-36">
        <h2 id="services-title" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95]">What the studio does</h2>
        <ol className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.name} data-rise className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-t border-ink/15 py-7">
              <span className="text-base tabular-nums text-rust">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-xl text-ink/90">{s.name}</span>
                <span className="mt-1.5 block text-lg leading-relaxed text-ink/55">{s.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ─────────── The plan chest ─────────── */}
      <section id="projects" aria-labelledby="work-title" data-chest className="relative mt-24 sm:mt-36 lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-12 xl:px-20">
          <h2 id="work-title" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95]">The work</h2>
          <p data-rise className="mt-4 max-w-xl text-lg leading-relaxed text-ink/60">
            Every site the studio has built. Client builds first, each with a full case study.
          </p>
        </div>
        <ul data-track className="mt-12 grid gap-6 px-6 sm:px-12 xl:px-20 lg:flex lg:w-max lg:gap-8">
          {drawings.map((d, i) => {
            const body = (
              <>
                <span className="relative block aspect-[16/10] overflow-hidden border border-ink/15 bg-paper-2">
                  <Image src={d.image} alt={`${d.title} screenshot`} fill sizes="(max-width: 1023px) 100vw, 34rem" className="object-cover object-top opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                </span>
                <span className="mt-4 flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
                  <span className="min-w-0">
                    <span className="block text-2xl font-medium leading-tight group-hover:text-rust transition-colors">{d.title}</span>
                    <span className="mt-1 block text-base text-ink/55">{d.note}</span>
                  </span>
                  <span className="shrink-0 text-sm tabular-nums text-ink/55">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="mt-3 block text-lg leading-relaxed text-ink/60 line-clamp-2">{d.description}</span>
              </>
            );
            return (
              <li key={d.key} className="min-w-0 lg:w-[34rem] lg:shrink-0">
                {d.internal ? (
                  <Link href={d.href} className="group block">{body}</Link>
                ) : (
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className="group block">
                    {body}
                  </a>
                )}
              </li>
            );
          })}
          <li className="hidden lg:flex lg:w-[24rem] lg:shrink-0 lg:items-center">
            <a href="#contact" className="group inline-flex items-center gap-3 font-display text-4xl leading-tight hover:text-rust transition-colors">
              Yours could be next <ArrowUpRight className="h-7 w-7" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </section>

      {/* ─────────── AI products ─────────── */}
      <section id="selected-work" aria-labelledby="ai-title" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-28 sm:pt-40">
        <h2 id="ai-title" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95] text-moon">AI products</h2>
        <p data-rise className="mt-4 max-w-xl text-lg leading-relaxed text-ink/60">Not websites: three products that do the work themselves. Pick one to see it at work.</p>
        <AIStage />
      </section>

      {/* ─────────── How a project runs ─────────── */}
      <section aria-labelledby="process-title" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-28 sm:pt-40 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="process-title" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95]">How a project runs</h2>
          <a data-rise href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rust px-7 py-3.5 text-base font-semibold text-paper hover:opacity-90 transition-opacity">
            Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div data-dim-wrap className="mt-16">
          {/* A dimension line: end stops and a line that extends between them */}
          <div aria-hidden="true" className="relative hidden h-6 md:block">
            <span className="absolute left-0 top-0 h-6 w-px bg-ink/40" />
            <span className="absolute right-0 top-0 h-6 w-px bg-ink/40" />
            <span data-dim className="absolute left-0 right-0 top-1/2 h-px origin-left bg-rust" />
            {[25, 50, 75].map((p) => (
              <span key={p} className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-ink/40" style={{ left: `${p}%` }} />
            ))}
          </div>
          <ol className="mt-8 grid gap-10 md:grid-cols-4 md:gap-8">
            {PROCESS.map((p, i) => (
              <li key={p.name} data-rise>
                <span className="text-base tabular-nums text-rust">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-2 block text-2xl">{p.name}</span>
                <span className="mt-2 block text-lg leading-relaxed text-ink/55">{p.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
