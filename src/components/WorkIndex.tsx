"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { otherWork } from "@/lib/work";
import { useSectionMotion } from "@/lib/motion";

const withShots = otherWork.filter((w) => w.preview);
const textOnly = otherWork.filter((w) => !w.preview);

/**
 * Everything that isn't a paid case study, as a contact sheet: every
 * project shows its screenshot up front, so it reads the same on a phone
 * (one column) as on a desktop (two staggered columns). No hover needed.
 */
export default function WorkIndex() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  return (
    <section ref={root} id="selected-work" aria-labelledby="index-title" className="relative px-6 sm:px-12 xl:px-24 pt-32 sm:pt-44 pb-12">
      <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <h2
          id="index-title"
          data-heading
          className="font-display uppercase text-[17vw] sm:text-[12vw] xl:text-[10vw] leading-[0.85] tracking-[-0.02em] text-white"
        >
          More Work
        </h2>
        <p className="max-w-sm text-base text-white/65 lg:pb-4">
          <span className="font-coffekan text-3xl text-accent mr-2">tools &amp; showcases,</span>
          built for clients, for practice, and for my own job hunt.
        </p>
      </header>

      <ol className="mt-16 sm:mt-20 grid md:grid-cols-2 gap-x-10 xl:gap-x-16 gap-y-16 sm:gap-y-20">
        {withShots.map((w, i) => (
          <li key={w.id} className={i % 2 === 1 ? "md:mt-28" : undefined}>
            <a href={w.href} target="_blank" rel="noopener noreferrer" className="group block">
              <figure
                className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-colors duration-500 group-hover:border-accent/60 group-focus-visible:border-accent"
              >
                <Image
                  src={w.preview!}
                  alt={`${w.title} screenshot`}
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                  className="object-cover object-top"
                />
              </figure>

              <div className="mt-6 grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3">
                <span className="font-mono text-xs text-accent/85">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display uppercase text-[2rem] sm:text-4xl leading-[0.95] tracking-[-0.01em] text-white transition-colors duration-300 group-hover:text-accent">
                  {w.title}
                </h3>
                <ArrowUpRight
                  className="h-5 w-5 self-start text-white/45 transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
                <p className="col-start-2 col-span-2 mt-3 text-[15px] leading-relaxed text-white/65 max-w-[52ch]">{w.description}</p>
                <p className="col-start-2 col-span-2 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
                  <span className="text-accent/85">{w.badge}</span>
                  <span className="normal-case tracking-normal">{w.tags.join(" · ")}</span>
                </p>
              </div>
            </a>
          </li>
        ))}
      </ol>

      {textOnly.length > 0 && (
        <div className="mt-24 sm:mt-32">
          <h3 className="font-coffekan text-4xl text-accent">Also built</h3>
          <ul className="mt-6 border-t border-white/10">
            {textOnly.map((w) => (
              <li key={w.id} className="border-b border-white/10">
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] gap-x-10 gap-y-2 py-6 items-baseline"
                >
                  <span className="font-display uppercase text-2xl sm:text-3xl leading-none text-white group-hover:text-accent transition-colors">
                    {w.title}
                  </span>
                  <span className="text-[15px] leading-relaxed text-white/60">{w.description}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 group-hover:text-accent">
                    {w.badge}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
