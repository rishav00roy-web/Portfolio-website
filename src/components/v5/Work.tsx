"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { commissions, otherWork } from "@/lib/work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * The work, in two kinds:
 * - Paid client websites, each a full-screen panel that the next one slides
 *   over (CSS sticky, no scroll scripting), then every other site in a
 *   swipeable strip.
 * - The AI work, lit by moonlight instead of the sun's amber, laid out as
 *   a circuit of the stages the agent runs.
 */

const AI_ID = "job-tracker-and-email-tracker";
const ai = otherWork.find((w) => w.id === AI_ID)!;
const tools = otherWork.filter((w) => w.id === "gym-crm");
const sites = otherWork.filter((w) => w.id !== AI_ID && w.id !== "gym-crm");

const AI_STAGES = [
  { name: "Ingest and score", detail: "Pulls listings from 54 job platforms and scores each one." },
  { name: "Track the inbox", detail: "Moves each Kanban card on an interview or a rejection email, on its own." },
  { name: "Tailor, truthfully", detail: "Tailors the résumé per role and rejects any claim it cannot back up." },
];

export default function Work() {
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
          <p data-rise className="text-sm text-rust">Part one</p>
          <h2 id="w-sites" data-rise className="mt-2 font-display uppercase text-[14vw] sm:text-7xl xl:text-8xl leading-[0.85] tracking-[-0.02em]">
            Websites
          </h2>
          <p data-rise className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            Built for real businesses. Three paid client builds first, each with a full case study, then the rest.
          </p>
        </header>

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
      </section>

      {/* ─────────── AI & Agents ─────────── */}
      <section
        id="selected-work"
        aria-labelledby="w-ai"
        className="relative z-10 mt-32 sm:mt-44 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(159,194,214,0.12),transparent_70%)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-24 sm:pt-32 pb-24">
          <p data-rise className="text-sm text-moon">Part two</p>
          <h2 id="w-ai" data-rise className="mt-2 font-display uppercase text-[14vw] sm:text-7xl xl:text-8xl leading-[0.85] tracking-[-0.02em] text-moon">
            AI &amp; Agents
          </h2>
          <p data-rise className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            Not websites: systems that do the work themselves. Shown as what they run.
          </p>

          <article className="mt-16 sm:mt-24">
            <div data-rise className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
              <h3 className="font-display uppercase text-4xl sm:text-6xl leading-[0.9]">{ai.title}</h3>
              <p className="text-base sm:text-lg leading-relaxed text-ink/70">{ai.description}</p>
            </div>

            {/* The circuit: three nodes on one moonlit wire */}
            <ol data-rise className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              <span aria-hidden="true" className="absolute left-[1.4rem] top-0 bottom-0 w-px bg-gradient-to-b from-moon/60 to-moon/0 md:left-0 md:right-0 md:top-[1.4rem] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r" />
              {AI_STAGES.map((s, i) => (
                <li key={s.name} className="relative grid grid-cols-[2.8rem_minmax(0,1fr)] gap-5 md:block">
                  <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-moon/70 bg-paper font-display text-xl text-moon shadow-[0_0_30px_rgba(159,194,214,0.25)]">
                    {i + 1}
                  </span>
                  <span className="md:mt-6 block">
                    <span className="block font-display uppercase text-3xl leading-[0.95]">{s.name}</span>
                    <span className="mt-3 block text-[15px] leading-relaxed text-ink/65">{s.detail}</span>
                  </span>
                </li>
              ))}
            </ol>

            {ai.preview && (
              <figure data-rise className="mt-16 overflow-hidden rounded-3xl border border-moon/25 shadow-[0_40px_120px_-40px_rgba(159,194,214,0.25)]">
                <span className="relative block aspect-[16/9]">
                  <Image src={ai.preview} alt={`${ai.title}: the board the agent keeps up to date`} fill sizes="(max-width: 1439px) 100vw, 1300px" className="object-cover object-top" />
                </span>
                <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-moon/15 px-6 py-4 text-sm text-ink/60">
                  <span>{ai.tags.join(", ")}</span>
                  <a href={ai.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-moon px-5 py-2.5 font-semibold text-paper hover:opacity-90 transition-opacity">
                    Read the code
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </figcaption>
              </figure>
            )}
          </article>

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
