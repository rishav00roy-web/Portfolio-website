"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { commissions, otherWork } from "@/lib/work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * Two kinds of work, two visual languages, so a visitor can tell them apart
 * at a glance:
 * - Websites are shown as what they are: pictures of finished sites.
 * - The AI project is shown as a system: the stages it runs, drawn from its
 *   own description, beside a screenshot of the board it drives.
 */

const AI_ID = "job-tracker-and-email-tracker";
const ai = otherWork.find((w) => w.id === AI_ID);
const tools = otherWork.filter((w) => w.id === "gym-crm");
const sites = otherWork.filter((w) => w.id !== AI_ID && w.id !== "gym-crm");

// The three stages, quoted from the project's own description in projectsData.
const AI_STAGES = [
  { name: "Ingest and score", detail: "Pulls listings from 54 job platforms and scores each against the profile." },
  { name: "Track the inbox", detail: "Reads replies and moves each Kanban card on an interview or a rejection, without being told." },
  { name: "Tailor, truthfully", detail: "Rewrites the résumé per role and rejects any claim it cannot back up, server-side." },
];

function useReveal(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-rise]", { y: 32, opacity: 0 });
        ScrollTrigger.batch("[data-rise]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" }),
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

export default function WorkSplit() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <div ref={root}>
      {/* ─────────── Websites ─────────── */}
      <section id="projects" aria-labelledby="sites-title" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-28 sm:pt-36">
        <header data-rise className="grid gap-4 border-b border-ink/15 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end">
          <h2 id="sites-title" className="font-display uppercase text-[15vw] sm:text-8xl xl:text-9xl leading-[0.85] tracking-[-0.02em] [overflow-wrap:break-word] min-w-0">
            Websites
          </h2>
          <p className="text-[15px] leading-relaxed text-ink/65">
            Sites built for real businesses. The first three are paid client builds, each with a full case study.
          </p>
        </header>

        <ol className="mt-12 grid gap-x-8 gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {commissions.map((p, i) => (
            <li key={p.id} data-rise className={i === 0 ? "lg:col-span-2" : undefined}>
              <article className="group">
                <Link href={`/projects/${p.slug}`} className="block relative overflow-hidden rounded-2xl bg-paper-2 aspect-[16/10] lg:aspect-auto lg:h-auto">
                  <span className={`relative block ${i === 0 ? "aspect-[16/10] lg:aspect-[21/9]" : "aspect-[16/10]"}`}>
                    <Image
                      src={p.images[0]}
                      alt={`${p.title}, home page`}
                      fill
                      sizes={i === 0 ? "(max-width: 1439px) 100vw, 1300px" : "(max-width: 1023px) 100vw, 640px"}
                      className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.02]"
                    />
                  </span>
                </Link>
                <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                  <div className="min-w-0">
                    <p className="text-sm text-rust">Paid client build, {p.status.toLowerCase()}</p>
                    <h3 className="mt-1 font-display uppercase text-4xl sm:text-5xl leading-[0.92] [overflow-wrap:break-word]">
                      <Link href={`/projects/${p.slug}`} className="hover:text-rust transition-colors">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink/70">{p.description}</p>
                    <p className="mt-3 text-sm text-ink/50">
                      {p.client}, {p.period}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-rust transition-colors"
                    >
                      Read the case study
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/25 px-5 py-3 text-sm hover:border-ink transition-colors"
                      >
                        Visit the site
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        {/* Other sites: smaller, same picture-first language */}
        <h3 data-rise className="mt-24 text-2xl font-medium">More sites</h3>
        <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {sites.map((w) => (
            <li key={w.id} data-rise>
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
                {w.preview ? (
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-paper-2">
                    <Image src={w.preview} alt={`${w.title} screenshot`} fill sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover object-top" />
                  </span>
                ) : (
                  <span className="flex aspect-[16/10] items-end rounded-xl border border-ink/15 p-5 text-sm text-ink/50">
                    Screenshot coming soon
                  </span>
                )}
                <span className="mt-4 flex items-start justify-between gap-4">
                  <span className="font-display uppercase text-2xl leading-[0.95] group-hover:text-rust transition-colors">{w.title}</span>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink/40 group-hover:text-rust transition-colors" aria-hidden="true" />
                </span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink/65">{w.description}</span>
                <span className="mt-2 block text-sm text-ink/50">{w.tags.join(", ")}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ─────────── AI ─────────── */}
      {ai && (
        <section
          id="selected-work"
          aria-labelledby="ai-title"
          className="relative mt-32 sm:mt-44 border-y border-ink/10 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(245,179,1,0.08),transparent_70%)]"
        >
          <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 py-24 sm:py-32">
            <header data-rise className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end">
              <h2 id="ai-title" className="font-display uppercase text-[15vw] sm:text-8xl xl:text-9xl leading-[0.85] tracking-[-0.02em] min-w-0 [overflow-wrap:break-word]">
                AI &amp; Agents
              </h2>
              <p className="text-[15px] leading-relaxed text-ink/65">
                Not a website: a system that does work on its own. Shown as what it runs, step by step.
              </p>
            </header>

            <article className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div data-rise className="min-w-0">
                <h3 className="font-display uppercase text-5xl sm:text-6xl leading-[0.9]">{ai.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{ai.description}</p>

                {/* The pipeline, as a numbered run of stages joined by a rail */}
                <ol className="mt-10 relative">
                  <span aria-hidden="true" className="absolute left-[1.15rem] top-3 bottom-3 w-px bg-rust/40" />
                  {AI_STAGES.map((s, i) => (
                    <li key={s.name} className="relative grid grid-cols-[2.3rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0">
                      <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-rust/60 bg-paper font-mono text-sm text-rust">
                        {i + 1}
                      </span>
                      <span className="min-w-0 pt-1">
                        <span className="block text-lg font-medium">{s.name}</span>
                        <span className="mt-1 block text-[15px] leading-relaxed text-ink/65">{s.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="mt-10 font-mono text-[13px] text-ink/60">{ai.tags.join("  /  ")}</p>
                <a
                  href={ai.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-rust px-5 py-3 text-sm font-semibold text-paper hover:opacity-90 transition-opacity"
                >
                  Read the code
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              {ai.preview && (
                <figure data-rise className="min-w-0 self-start overflow-hidden rounded-2xl border border-ink/15 bg-paper-2">
                  <span className="relative block aspect-[16/10]">
                    <Image src={ai.preview} alt={`${ai.title}: the Kanban board the agent moves`} fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover object-top" />
                  </span>
                  <figcaption className="border-t border-ink/10 px-5 py-3 text-sm text-ink/55">
                    The board the agent keeps up to date.
                  </figcaption>
                </figure>
              )}
            </article>

            {tools.length > 0 && (
              <div data-rise className="mt-20 border-t border-ink/15 pt-10">
                <h3 className="text-2xl font-medium">Automation tools</h3>
                <ul className="mt-6 grid gap-8 md:grid-cols-2">
                  {tools.map((w) => (
                    <li key={w.id}>
                      <a href={w.href} target="_blank" rel="noopener noreferrer" className="group grid gap-5 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
                        {w.preview && (
                          <span className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-paper-2">
                            <Image src={w.preview} alt={`${w.title} screenshot`} fill sizes="12rem" className="object-cover object-top" />
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="font-display uppercase text-2xl leading-[0.95] group-hover:text-rust transition-colors">{w.title}</span>
                          <span className="mt-2 block text-[15px] leading-relaxed text-ink/65">{w.description}</span>
                          <span className="mt-2 block font-mono text-[13px] text-ink/50">{w.tags.join("  /  ")}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
