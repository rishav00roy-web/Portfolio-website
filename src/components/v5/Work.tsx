"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { commissions, otherWork } from "@/lib/work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import AIStage from "./AIStage";

/*
 * The work, in two kinds:
 * - Paid client websites, each a full-screen panel that the next one slides
 *   over (CSS sticky, no scroll scripting), then every other site in a
 *   swipeable strip.
 * - The AI work, lit by moonlight instead of the sun's amber: three
 *   products on one tabbed stage (AIStage).
 */

const AI_ID = "job-tracker-and-email-tracker";
const tools = otherWork.filter((w) => w.id === "gym-crm");
const sites = otherWork.filter((w) => w.id !== AI_ID && w.id !== "gym-crm");

export type WorkLayout = "rows" | "index" | "grid";

// Every website as one list, paid builds first: used by the index and grid layouts.
const indexRows = [
  ...commissions.map((p) => ({
    key: p.slug,
    title: p.title,
    description: p.description,
    note: `Paid client build, ${p.status.toLowerCase()}`,
    image: p.images[0],
    href: `/projects/${p.slug}`,
    internal: true,
  })),
  ...sites.map((w) => ({
    key: w.id,
    title: w.title,
    description: w.description,
    note: w.badge,
    image: w.preview,
    href: w.href,
    internal: false,
  })),
];

export default function Work({ layout = "rows" }: { layout?: WorkLayout }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

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
    { scope: root },
  );

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  };

  const onStripScroll = () => {
    const el = track.current;
    const bar = progress.current;
    if (!el || !bar) return;
    const max = el.scrollWidth - el.clientWidth;
    bar.style.transform = `scaleX(${0.08 + (max > 0 ? el.scrollLeft / max : 1) * 0.92})`;
  };

  return (
    <div ref={root}>
      {/* ─────────── Websites ─────────── */}
      <section id="projects" aria-labelledby="w-sites">
        <header className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-28 sm:pt-40 pb-14 sm:pb-20">
          <h2 id="w-sites" data-rise className="font-display uppercase text-[14vw] sm:text-7xl xl:text-8xl leading-[0.85] tracking-[-0.02em]">
            Websites
          </h2>
          <p data-rise className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            Built for real businesses. Three paid client builds first, each with a full case study, then the rest.
          </p>
        </header>

        {layout === "rows" && (
          <>
        {/* Paid builds: calm rows, picture and words side by side */}
        <ol className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20">
          {commissions.map((p, i) => (
            <li key={p.id} data-rise className="border-t border-ink/10 py-14 sm:py-20">
              <article className="grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
                <Link href={`/projects/${p.slug}`} className="group block overflow-hidden rounded-2xl ring-1 ring-ink/10">
                  <span className="relative block aspect-[16/10]">
                    <Image
                      src={p.images[0]}
                      alt={`${p.title}, home page`}
                      fill
                      sizes="(max-width: 1023px) 100vw, 700px"
                      className="object-cover object-top opacity-90 transition-[opacity,transform] duration-700 ease-out-expo group-hover:opacity-100 group-hover:scale-[1.02]"
                    />
                  </span>
                </Link>
                <div className="min-w-0">
                  <p className="text-sm text-ink/50">
                    {String(i + 1).padStart(2, "0")}, paid client build, {p.status.toLowerCase()}
                  </p>
                  <h3 className="mt-2 font-display uppercase text-4xl sm:text-5xl leading-[0.92] [overflow-wrap:break-word]">
                    <Link href={`/projects/${p.slug}`} className="hover:text-rust transition-colors">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-ink/70">{p.description}</p>
                  <p className="mt-3 text-sm text-ink/45">
                    {p.client}, {p.period}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
                    <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1.5 font-medium text-rust hover:opacity-80 transition-opacity">
                      Read the case study
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ink transition-colors">
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

        {/* Everything else: a swipeable strip */}
        <div className="relative z-10 bg-paper pt-16 sm:pt-24">
          <header className="mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-6 sm:px-12 xl:px-20">
            <h3 data-rise className="font-display uppercase text-3xl sm:text-5xl leading-[0.9]">More sites</h3>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => nudge(-1)} aria-label="Previous site" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 hover:border-rust hover:text-rust transition-colors">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => nudge(1)} aria-label="Next site" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 hover:border-rust hover:text-rust transition-colors">
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </header>

          <ul
            ref={track}
            onScroll={onStripScroll}
            data-lenis-prevent
            className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-6 sm:px-12 xl:px-20 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-px-6 sm:scroll-px-12 xl:scroll-px-20"
          >
            {sites.map((w) => (
              <li key={w.id} className="w-[82vw] max-w-[520px] shrink-0 snap-start">
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-ink/10">
                    {w.preview ? (
                      <Image src={w.preview} alt={`${w.title} screenshot`} fill sizes="(max-width: 639px) 82vw, 520px" className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center p-8 text-center font-display uppercase text-4xl leading-[0.9] text-ink/25">{w.title}</span>
                    )}
                  </span>
                  <span className="mt-5 block text-sm text-rust">{w.badge}</span>
                  <span className="mt-1 block font-display uppercase text-3xl leading-[0.92] group-hover:text-rust transition-colors">{w.title}</span>
                  <span className="mt-3 block text-[15px] leading-relaxed text-ink/65 line-clamp-3">{w.description}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:text-rust transition-colors">
                    {w.href.includes("github.com") ? "View the code" : "Open the site"}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mx-6 sm:mx-12 xl:mx-20 mt-2 h-px bg-ink/10">
            <span ref={progress} className="block h-px origin-left scale-x-[0.08] bg-rust transition-transform duration-200 ease-out" />
          </div>
        </div>
          </>
        )}
        {layout === "index" && (
          /* v6: one quiet index. Every site is a row with a small picture,
             paid builds first and marked, so the list reads top to bottom. */
          <ol className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 border-t border-ink/10">
            {indexRows.map((r, i) => (
              <li key={r.key} data-rise className="border-b border-ink/10">
                <a
                  href={r.href}
                  {...(r.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-center gap-5 py-5 sm:grid-cols-[2.5rem_9rem_minmax(0,1fr)_minmax(0,14rem)_auto] sm:gap-8 sm:py-6"
                >
                  <span className="hidden font-mono text-sm text-ink/40 sm:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-md bg-paper-2 ring-1 ring-ink/10">
                    {r.image && <Image src={r.image} alt="" fill sizes="9rem" className="object-cover object-top" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display uppercase text-2xl sm:text-3xl leading-[0.95] group-hover:text-rust transition-colors">{r.title}</span>
                    <span className="mt-1 text-sm text-ink/55 line-clamp-2 sm:line-clamp-1">{r.description}</span>
                  </span>
                  <span className="hidden text-sm text-ink/50 sm:block">{r.note}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink/35 transition-colors group-hover:text-rust" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        )}

        {layout === "grid" && (
          /* v7: an even, calm grid. Paid builds carry a small case-study tag. */
          <ul className="mx-auto grid max-w-[1440px] gap-x-8 gap-y-14 px-6 sm:px-12 xl:px-20 md:grid-cols-2">
            {indexRows.map((r) => (
              <li key={r.key} data-rise>
                <a
                  href={r.href}
                  {...(r.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group block"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-ink/10">
                    {r.image ? (
                      <Image src={r.image} alt={`${r.title} screenshot`} fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover object-top opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center font-display uppercase text-3xl text-ink/25">{r.title}</span>
                    )}
                    {r.internal && (
                      <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 text-xs text-rust">Case study</span>
                    )}
                  </span>
                  <span className="mt-5 flex items-start justify-between gap-4">
                    <span className="min-w-0">
                      <span className="block font-display uppercase text-3xl leading-[0.95] group-hover:text-rust transition-colors">{r.title}</span>
                      <span className="mt-2 text-[15px] leading-relaxed text-ink/60 line-clamp-2">{r.description}</span>
                    </span>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink/35 transition-colors group-hover:text-rust" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ─────────── AI & Agents ─────────── */}
      <section
        id="selected-work"
        aria-labelledby="w-ai"
        className="relative z-10 mt-32 sm:mt-44 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(159,194,214,0.12),transparent_70%)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-24 sm:pt-32 pb-24">
          <h2 id="w-ai" data-rise className="font-display uppercase text-[14vw] sm:text-7xl xl:text-8xl leading-[0.85] tracking-[-0.02em] text-moon">
            AI &amp; Agents
          </h2>
          <p data-rise className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            Not websites: three AI products that do the work themselves. Pick one to see it at work.
          </p>

          <AIStage />

          {tools.map((w) => (
            <a
              key={w.id}
              data-rise
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-20 grid gap-6 border-t border-ink/15 pt-10 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_auto] sm:items-center"
            >
              {w.preview && (
                <span className="relative block aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-moon/20">
                  <Image src={w.preview} alt={`${w.title} screenshot`} fill sizes="18rem" className="object-cover object-top" />
                </span>
              )}
              <span className="min-w-0">
                <span className="text-sm text-moon">Automation tool</span>
                <span className="mt-1 block font-display uppercase text-4xl leading-[0.92] group-hover:text-moon transition-colors">{w.title}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink/65">{w.description}</span>
              </span>
              <ArrowUpRight className="hidden h-7 w-7 text-ink/40 group-hover:text-moon sm:block" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
