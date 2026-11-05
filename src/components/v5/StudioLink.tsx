"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { commissions } from "@/lib/work";
import { studioFont } from "@/lib/studioFont";

/**
 * The portfolio's one door to the studio. All client work lives on the
 * Atelier Systems page. The card already wears the studio's own identity
 * (graphite, lime, Jost), so it reads as a door into somewhere else.
 */
export default function StudioLink({ href = "/atelier" }: { href?: string }) {
  return (
    <section id="projects" aria-labelledby="studio-link-title" className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-28 sm:pt-40">
      <Link
        href={href}
        className={`studio ${studioFont.variable} group relative grid gap-10 overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 transition-colors duration-500 hover:border-accent/50 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center`}
      >
        <div className="min-w-0">
          <Image src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="h-auto w-20 opacity-90" />
          <p className="mt-8 text-base text-ink/55">My work lives at my studio</p>
          <h2 id="studio-link-title" className="mt-2 font-display text-5xl sm:text-6xl leading-[0.95] group-hover:text-rust transition-colors">
            Atelier Systems
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/65">
            Websites, automation and AI agents for small businesses. Every project I have built, with case studies.
          </p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-rust px-6 py-3.5 text-base font-semibold text-paper">
            See the studio&apos;s work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {commissions.map((p, i) => (
            <span
              key={p.slug}
              className={`relative block aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-ink/10 transition-transform duration-700 ease-out-expo ${
                i === 1 ? "translate-y-6 group-hover:translate-y-3" : "group-hover:-translate-y-2"
              }`}
            >
              <Image src={p.images[0]} alt={`${p.title} screenshot`} fill sizes="(max-width: 1023px) 30vw, 220px" className="object-cover object-top" />
            </span>
          ))}
        </div>
      </Link>
    </section>
  );
}
