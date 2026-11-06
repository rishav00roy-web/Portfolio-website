"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

/*
 * The top bar for both sites. One component, two looks:
 * - portfolio: floats over the sunset hero, clear at the top, then a solid
 *   midnight bar once you scroll; lime "Get in touch".
 * - studio: an ivory bar from the start; coral "Start a project".
 * The section you're reading is marked in the bar (a dot, not colour alone),
 * found with IntersectionObserver (no scroll listener). On phones the links
 * move into a full-width sheet opened by a labelled button; Escape or a tap
 * on a link closes it. No hover-only behaviour anywhere.
 */

type NavLink = { label: string; href: string };

type SiteNavProps = {
  variant: "portfolio" | "studio";
  brand: ReactNode;
  brandHref: string;
  brandLabel: string;
  links: NavLink[];
  /** The other site, shown with an outward arrow. */
  other: NavLink;
  cta: NavLink;
};

const LOOK = {
  portfolio: {
    bar: "fixed",
    clear: "bg-transparent border-transparent",
    solid: "bg-[#08090b]/95 border-white/10 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]",
    text: "text-[#faf8f3]",
    muted: "text-[#faf8f3]/70 hover:text-[#faf8f3]",
    dot: "bg-[#cdf22b]",
    cta: "bg-[#cdf22b] text-[#08090b]",
    sheet: "bg-[#08090b] text-[#faf8f3] border-white/10",
    ring: "focus-visible:ring-[#cdf22b]",
  },
  studio: {
    bar: "sticky",
    clear: "bg-[var(--s-bg)] border-[rgba(15,53,50,0.10)]",
    solid: "bg-[var(--s-bg)] border-[rgba(15,53,50,0.12)] shadow-[0_10px_30px_-20px_rgba(15,53,50,0.45)]",
    text: "text-[var(--s-ink)]",
    muted: "text-[var(--s-ink)]/70 hover:text-[var(--s-ink)]",
    dot: "bg-[var(--s-accent)]",
    cta: "bg-[var(--s-accent)] text-[var(--s-ink)]",
    sheet: "bg-[var(--s-bg)] text-[var(--s-ink)] border-[rgba(15,53,50,0.12)]",
    ring: "focus-visible:ring-[var(--s-accent)]",
  },
} as const;

export default function SiteNav({ variant, brand, brandHref, brandLabel, links, other, cta }: SiteNavProps) {
  const look = LOOK[variant];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Solid once the top of the page has scrolled away.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { rootMargin: "80px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mark the section in the middle of the screen.
  useEffect(() => {
    const targets = links
      .filter((l) => l.href.startsWith("#"))
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [links]);

  // Phone sheet: focus the first link on open, Escape closes and returns focus.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;
  const focus = `focus-visible:outline-none focus-visible:ring-2 ${look.ring}`;

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px" />
      <header
        className={`${look.bar} inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          solid ? look.solid : look.clear
        } ${look.text}`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-6 sm:h-[4.5rem] sm:px-12 xl:px-20">
          <Link href={brandHref} aria-label={brandLabel} className={`flex min-h-11 items-center gap-2.5 rounded-md ${focus}`}>
            {brand}
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-base transition-colors ${focus} ${
                    isActive ? look.text : look.muted
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full transition-opacity ${look.dot} ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              );
            })}
            <span aria-hidden="true" className="mx-2 h-5 w-px bg-current opacity-20" />
            <Link href={other.href} className={`inline-flex min-h-11 items-center gap-1 rounded-full px-4 text-base transition-colors ${focus} ${look.muted}`}>
              {other.label}
              <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a href={cta.href} className={`hidden min-h-11 items-center rounded-full px-5 text-base font-semibold transition-opacity hover:opacity-90 sm:inline-flex ${focus} ${look.cta}`}>
              {cta.label}
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-nav-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={`grid size-11 place-items-center rounded-full lg:hidden ${focus}`}
            >
              {open ? <X className="size-6" strokeWidth={1.75} aria-hidden="true" /> : <Menu className="size-6" strokeWidth={1.75} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="site-nav-sheet" aria-label="Main" className={`border-t px-6 pb-8 pt-4 sm:px-12 lg:hidden ${look.sheet}`}>
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.href ? "location" : undefined}
                    className={`flex min-h-14 items-center justify-between rounded-md text-2xl ${focus}`}
                  >
                    {l.label}
                    {active === l.href && <span aria-hidden="true" className={`size-2 rounded-full ${look.dot}`} />}
                  </a>
                </li>
              ))}
              <li>
                <Link href={other.href} onClick={() => setOpen(false)} className={`flex min-h-14 items-center gap-2 rounded-md text-2xl ${focus}`}>
                  {other.label}
                  <ArrowUpRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </li>
            </ul>
            <a href={cta.href} onClick={() => setOpen(false)} className={`mt-6 flex min-h-12 items-center justify-center rounded-full text-lg font-semibold ${focus} ${look.cta}`}>
              {cta.label}
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
