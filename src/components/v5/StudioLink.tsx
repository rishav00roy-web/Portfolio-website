"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { studioFont } from "@/lib/studioFont";

/** Sharp phone screen grabs from the studio page: the flagship and two client sites. */
const PREVIEWS = [
  { key: "pheonix", src: "/assets/projects/pheonix-cassette.webp", alt: "Pheonix's 3D cassette player" },
  { key: "tea-country-holidays", src: "/assets/projects/shots/mobile/tea-country-holidays.webp", alt: "Tea Country Holidays on a phone" },
  { key: "clash-bazar", src: "/assets/projects/shots/mobile/clash-bazar.webp", alt: "Clash Bazar on a phone" },
] as const;

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
        className={`studio ${studioFont.variable} group relative grid gap-10 overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 transition-colors duration-300 hover:border-accent/50 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center`}
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
          <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--s-ink)] py-2 pl-6 pr-2 text-lg font-medium text-[var(--s-bg)] transition-colors duration-300 group-hover:bg-[var(--s-teal)]">
            See the studio&apos;s work
            <span className="grid h-10 w-10 place-items-center rounded-full bg-rust transition-transform duration-300 ease-out-expo group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {PREVIEWS.map((p, i) => (
            <span
              key={p.key}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="relative block aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-ink/10 transition-transform duration-300 ease-out-expo group-hover:-translate-y-1.5"
            >
              <Image src={p.src} alt={p.alt} fill sizes="(max-width: 1023px) 30vw, 240px" className={`object-cover ${p.key === "pheonix" ? "object-center" : "object-top"}`} />
            </span>
          ))}
        </div>
      </Link>
    </section>
  );
}
