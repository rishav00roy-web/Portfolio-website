import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { studioFont } from "@/lib/studioFont";

/*
 * The portfolio's one door to the studio. The dark page opens onto a band of
 * the studio's own ivory paper, edged with a soft wave, so it reads as
 * stepping into another room. Three arched windows show what is inside.
 * Static on purpose: plain images, no scroll or cursor work, so it costs
 * nothing while you scroll past.
 */

const WINDOWS = [
  { name: "Pheonix", src: "/assets/projects/pheonix-cassette.webp", alt: "Pheonix's 3D cassette player", position: "object-center" },
  { name: "Tea Country Holidays", src: "/assets/projects/shots/mobile/tea-country-holidays.webp", alt: "Tea Country Holidays on a phone", position: "object-top" },
  { name: "Clash Bazar", src: "/assets/projects/shots/mobile/clash-bazar.webp", alt: "Clash Bazar on a phone", position: "object-top" },
] as const;

/** A gentle wave the width of the page, filled with the studio's ivory. */
function Wave({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`-my-px block h-12 w-full sm:h-20 ${flip ? "rotate-180" : ""}`}
    >
      <path d="M0 90 V52 C 200 8, 420 8, 640 44 S 1080 96, 1440 30 V90 Z" fill="var(--s-bg)" />
    </svg>
  );
}

export default function StudioLink({ href = "/atelier" }: { href?: string }) {
  return (
    <section id="projects" aria-labelledby="studio-link-title" className={`studio ${studioFont.variable} relative z-10 mt-28 !bg-transparent sm:mt-40`}>
      <Wave />
      <Link href={href} className="group block bg-[var(--s-bg)] text-[var(--s-ink)]">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-12 sm:px-12 sm:py-16 xl:px-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-lg text-[var(--s-ink)]/70">
              <Image src="/brand/atelier-monogram.webp" alt="" width={357} height={292} className="h-auto w-10" />
              Where my client work lives
            </p>
            <h2 id="studio-link-title" className="mt-6 font-display text-6xl leading-[0.9] sm:text-7xl xl:text-8xl">
              Atelier Systems<span className="text-[var(--s-accent)]">.</span>
            </h2>
            {/* The swash from the AS mark */}
            <svg aria-hidden="true" viewBox="0 0 420 40" fill="none" className="mt-3 h-auto w-56 sm:w-72">
              <path d="M4 26 C 70 6, 130 38, 210 20 S 340 6, 416 18" stroke="var(--s-accent)" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="mt-6 max-w-md text-xl leading-relaxed text-[var(--s-ink)]/75">
              My studio. Websites, automation and AI agents for small businesses, and every project I&apos;ve built for them.
            </p>
            <span className="mt-10 inline-flex items-center gap-3 rounded-full bg-[var(--s-ink)] py-2 pl-7 pr-2 text-lg font-medium text-[var(--s-bg)] transition-colors duration-300 group-hover:bg-[var(--s-teal)]">
              Step into the studio
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--s-accent)] text-[var(--s-ink)]">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </span>
          </div>

          <ul className="grid grid-cols-3 gap-3 sm:gap-6">
            {WINDOWS.map((w) => (
              <li key={w.name} className="min-w-0">
                <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-full rounded-b-2xl bg-[var(--s-surface)] ring-1 ring-[var(--s-ink)]/10">
                  <Image src={w.src} alt={w.alt} fill sizes="(max-width: 1023px) 30vw, 260px" className={`object-cover ${w.position}`} />
                </div>
                <p className="mt-3 text-base leading-snug text-[var(--s-ink)]/70 sm:text-lg">{w.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </Link>
      <Wave flip />
    </section>
  );
}
