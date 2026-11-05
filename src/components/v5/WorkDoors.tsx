"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { commissions, otherWork } from "@/lib/work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * v5: two doors. Straight after the hero the visitor chooses a kind of work.
 * Websites are lit by the sun (amber) and laid out as a swipeable filmstrip
 * of finished sites; the AI work is lit by moonlight (a cool blue) and laid
 * out as a flow of stages. Different colour, different shape, same night.
 */

const AI_ID = "job-tracker-and-email-tracker";
const ai = otherWork.find((w) => w.id === AI_ID)!;
const tools = otherWork.filter((w) => w.id === "gym-crm");

// Paid builds first, then the rest of the sites, as one strip.
const strip = [
  ...commissions.map((p) => ({
    key: p.slug,
    title: p.title,
    note: `Paid client build, ${p.status.toLowerCase()}`,
    description: p.description,
    image: p.images[0],
    href: `/projects/${p.slug}`,
    internal: true,
    cta: "Read the case study",
  })),
  ...otherWork
    .filter((w) => w.id !== AI_ID && w.id !== "gym-crm")
    .map((w) => ({
      key: w.id,
      title: w.title,
      note: w.badge,
      description: w.description,
      image: w.preview,
      href: w.href,
      internal: false,
      cta: w.href.includes("github.com") ? "View the code" : "Open the site",
    })),
];

const AI_STAGES = [
  { name: "Ingest and score", detail: "Pulls listings from 54 job platforms and scores each one." },
  { name: "Track the inbox", detail: "Moves each Kanban card on an interview or a rejection email, on its own." },
  { name: "Tailor, truthfully", detail: "Tailors the résumé per role and rejects any claim it cannot back up." },
];

export default function WorkDoors() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  // A thin line under the strip shows how far through the sites you are.
  // Written straight to the style on scroll, so no re-render per frame.
  const onStripScroll = () => {
    const el = track.current;
    const bar = progress.current;
    if (!el || !bar) return;
    const max = el.scrollWidth - el.clientWidth;
    const done = max > 0 ? el.scrollLeft / max : 1;
    bar.style.transform = `scaleX(${0.08 + done * 0.92})`;
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-rise]", { y: 32, opacity: 0 });
        ScrollTrigger.batch("[data-rise]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "expo.out" }),
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

  return (
    <div ref={root}>
      {/* ─────────── The two doors ─────────── */}
      <nav aria-label="Kinds of work" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-24 sm:pt-32">
        <p data-rise className="max-w-xl text-lg text-ink/70">
          Two kinds of work. Pick a door.
        </p>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          <li data-rise>
            <a href="#projects" className="group relative block overflow-hidden rounded-3xl border border-rust/30 aspect-[4/3] md:aspect-[5/4]">
              <Image src={commissions[0].images[0]} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-top opacity-55 transition-[opacity,transform] duration-700 ease-out-expo group-hover:opacity-70 group-hover:scale-[1.03]" />
              <span className="absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <span>
                  <span className="block font-display uppercase text-6xl sm:text-7xl leading-[0.85] text-ink">Websites</span>
                  <span className="mt-3 block text-[15px] text-ink/70">{strip.length} sites, three of them paid client builds</span>
                </span>
                <ArrowRight className="h-8 w-8 shrink-0 rotate-90 text-rust transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
              </span>
            </a>
          </li>
          <li data-rise>
            <a href="#selected-work" className="group relative block overflow-hidden rounded-3xl border border-moon/30 aspect-[4/3] md:aspect-[5/4]">
              {ai.preview && (
                <Image src={ai.preview} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-top opacity-35 grayscale transition-[opacity,transform] duration-700 ease-out-expo group-hover:opacity-50 group-hover:scale-[1.03]" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-paper via-paper/50 to-[rgba(159,194,214,0.08)]" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <span>
                  <span className="block font-display uppercase text-6xl sm:text-7xl leading-[0.85] text-ink">AI &amp; Agents</span>
                  <span className="mt-3 block text-[15px] text-ink/70">An agent that runs a job hunt, plus an automation tool</span>
                </span>
                <ArrowRight className="h-8 w-8 shrink-0 rotate-90 text-moon transition-transform duration-500 group-hover:translate-y-1" aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </nav>

      {/* ─────────── Websites: a filmstrip ─────────── */}
      <section id="projects" aria-labelledby="v5-sites" className="pt-28 sm:pt-40">
        <header data-rise className="mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-6 sm:px-12 xl:px-20">
          <div>
            <h2 id="v5-sites" className="font-display uppercase text-[15vw] sm:text-8xl leading-[0.85] tracking-[-0.02em]">
              Websites
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/65">Swipe through, or use the arrows. Paid client builds come first.</p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
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
          {strip.map((s, i) => {
            const body = (
              <>
                <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-ink/10">
                  {s.image ? (
                    <Image src={s.image} alt={`${s.title} screenshot`} fill sizes="(max-width: 639px) 85vw, 620px" className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-sm text-ink/45">Screenshot coming soon</span>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 font-mono text-xs text-ink">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="mt-5 block text-sm text-rust">{s.note}</span>
                <span className="mt-1 block font-display uppercase text-3xl sm:text-4xl leading-[0.92] group-hover:text-rust transition-colors">{s.title}</span>
                <span className="mt-3 block text-[15px] leading-relaxed text-ink/65 line-clamp-3">{s.description}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-rust transition-colors">
                  {s.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </>
            );
            return (
              <li key={s.key} className="w-[85vw] max-w-[620px] shrink-0 snap-start">
                {s.internal ? (
                  <Link href={s.href} className="group block">{body}</Link>
                ) : (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block">{body}</a>
                )}
              </li>
            );
          })}
        </ul>
        <div aria-hidden="true" className="mx-6 sm:mx-12 xl:mx-20 mt-2 h-px bg-ink/10">
          <span ref={progress} className="block h-px origin-left scale-x-[0.08] bg-rust transition-transform duration-200 ease-out" />
        </div>
      </section>

      {/* ─────────── AI: moonlit flow ─────────── */}
      <section
        id="selected-work"
        aria-labelledby="v5-ai"
        className="relative mt-32 sm:mt-44 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(159,194,214,0.10),transparent_70%)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 py-24 sm:py-32">
          <header data-rise>
            <h2 id="v5-ai" className="font-display uppercase text-[15vw] sm:text-8xl leading-[0.85] tracking-[-0.02em] text-moon">
              AI &amp; Agents
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/65">Systems that do the work themselves. Shown as what they run.</p>
          </header>

          <article className="mt-14">
            <div data-rise className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
              <h3 className="font-display uppercase text-5xl sm:text-7xl leading-[0.88]">{ai.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink/70">{ai.description}</p>
            </div>

            {/* Flow: three stages left to right on desktop, top to bottom on phones */}
            <ol data-rise className="mt-12 grid gap-4 md:grid-cols-3">
              {AI_STAGES.map((s, i) => (
                <li key={s.name} className="relative rounded-2xl border border-moon/25 bg-[rgba(159,194,214,0.04)] p-6">
                  <span className="font-mono text-sm text-moon">Stage {i + 1}</span>
                  <span className="mt-3 block text-xl font-medium">{s.name}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-ink/65">{s.detail}</span>
                  {i < AI_STAGES.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-paper text-moon md:block" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>

            {ai.preview && (
              <figure data-rise className="mt-10 overflow-hidden rounded-2xl border border-moon/20">
                <span className="relative block aspect-[16/9]">
                  <Image src={ai.preview} alt={`${ai.title}: the board the agent keeps up to date`} fill sizes="(max-width: 1439px) 100vw, 1300px" className="object-cover object-top" />
                </span>
                <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-moon/15 px-5 py-4 text-sm text-ink/60">
                  <span className="font-mono">{ai.tags.join("  /  ")}</span>
                  <a href={ai.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-moon px-5 py-2.5 font-medium text-paper hover:opacity-90 transition-opacity">
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
              className="group mt-16 grid gap-6 border-t border-ink/15 pt-10 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] sm:items-center"
            >
              {w.preview && (
                <span className="relative block aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-moon/20">
                  <Image src={w.preview} alt={`${w.title} screenshot`} fill sizes="16rem" className="object-cover object-top" />
                </span>
              )}
              <span className="min-w-0">
                <span className="text-sm text-moon">Automation tool</span>
                <span className="mt-1 block font-display uppercase text-3xl leading-[0.95] group-hover:text-moon transition-colors">{w.title}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink/65">{w.description}</span>
              </span>
              <ArrowUpRight className="hidden h-6 w-6 text-ink/40 group-hover:text-moon sm:block" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
