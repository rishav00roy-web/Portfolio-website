"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { commissions, otherWork } from "@/lib/work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Direction B: all the work on one bento board, like an operations wall.
 * Paid projects take the big tiles, everything else fills in around them.
 * Tiles stack to one column on phones; nothing depends on hover.
 */
export default function BentoWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-tile]", { y: 40, opacity: 0 });
        ScrollTrigger.batch("[data-tile]", {
          start: "top 92%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" }),
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const [lead, ...restPaid] = commissions;
  const shots = otherWork.filter((w) => w.preview);

  const tile =
    "group relative flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper-2 transition-colors duration-500 hover:border-rust/60";

  return (
    <section ref={root} id="projects" aria-labelledby="bento-title" className="px-4 sm:px-8 xl:px-16 pt-28 sm:pt-36 pb-8">
      <header className="mb-10 flex flex-col gap-3 px-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="bento-title" className="font-display uppercase text-[15vw] sm:text-8xl leading-[0.85] tracking-[-0.02em]">
          The Work
        </h2>
        <p className="max-w-sm text-sm text-ink/60">
          <span className="font-coffekan text-3xl text-rust mr-2">all of it,</span>
          paid client builds first, then tools and showcases.
        </p>
      </header>

      <ul className="grid auto-rows-[minmax(0,auto)] gap-4 sm:gap-5 md:grid-cols-6 xl:grid-cols-12">
        {/* Lead commission: the big tile */}
        <li data-tile className="md:col-span-6 xl:col-span-8 xl:row-span-2">
          <Link href={`/projects/${lead.slug}`} className={`${tile} h-full`}>
            <div className="relative aspect-[16/10] xl:aspect-auto xl:flex-1 min-h-[16rem]">
              <Image src={lead.images[0]} alt={`${lead.title}, main screen`} fill sizes="(max-width: 1279px) 100vw, 66vw" className="object-cover object-top" />
              <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em]">
                Paid · {lead.status}
              </span>
            </div>
            <div className="flex items-end justify-between gap-6 p-6 sm:p-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rust">Project 01 · {lead.period}</p>
                <h3 className="mt-2 font-display uppercase text-4xl sm:text-6xl leading-[0.9]">{lead.title}</h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/70">{lead.description}</p>
              </div>
              <ArrowUpRight className="h-7 w-7 shrink-0 text-ink/40 transition-colors group-hover:text-rust" aria-hidden="true" />
            </div>
          </Link>
        </li>

        {restPaid.map((p, i) => (
          <li key={p.id} data-tile className="md:col-span-3 xl:col-span-4">
            <Link href={`/projects/${p.slug}`} className={`${tile} h-full`}>
              <div className="relative aspect-[16/10]">
                <Image src={p.images[0]} alt={`${p.title}, main screen`} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover object-top" />
                <span className="absolute left-3 top-3 rounded-full bg-paper/85 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em]">
                  Paid · {p.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rust">Project 0{i + 2}</p>
                <h3 className="mt-2 font-display uppercase text-3xl leading-[0.95]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 line-clamp-3">{p.description}</p>
              </div>
            </Link>
          </li>
        ))}

        {shots.map((w, i) => (
          <li key={w.id} data-tile className={i === 0 ? "md:col-span-6 xl:col-span-6" : "md:col-span-3 xl:col-span-3"}>
            <a href={w.href} target="_blank" rel="noopener noreferrer" className={`${tile} h-full`}>
              <div className="relative aspect-[16/10]">
                <Image src={w.preview!} alt={`${w.title} screenshot`} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw" className="object-cover object-top" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">{w.badge}</p>
                <h3 className="mt-1.5 font-display uppercase text-2xl leading-[0.95] group-hover:text-rust transition-colors">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 line-clamp-2">{w.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
