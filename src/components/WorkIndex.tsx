"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { otherWork } from "@/lib/work";
import { useSectionMotion } from "@/lib/motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Everything that isn't a paid case study, as an index. On a desktop with a
 * mouse, a screenshot of the hovered row follows the cursor; elsewhere the
 * rows stand on their own.
 */
export default function WorkIndex() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  useSectionMotion(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const el = preview.current;
        if (!el) return;
        const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          x(e.clientX + 28);
          y(e.clientY - el.offsetHeight / 2);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const current = otherWork.find((w) => w.id === active);

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

      <ol className="mt-16 border-t border-white/10" onPointerLeave={() => setActive(null)}>
        {otherWork.map((w, i) => (
          <li key={w.id} className="border-b border-white/10">
            <a
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(w.id)}
              onFocus={() => setActive(w.id)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[2.5rem_1fr_auto] lg:grid-cols-[4rem_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_2rem] items-baseline gap-x-4 lg:gap-x-8 py-6 lg:py-8"
            >
              <span className="font-mono text-xs text-accent/80">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display uppercase text-3xl sm:text-4xl xl:text-5xl leading-none tracking-[-0.01em] text-white transition-[color,transform] duration-500 ease-out-expo group-hover:text-accent group-hover:translate-x-2 group-focus-visible:text-accent">
                {w.title}
              </span>
              <span className="lg:hidden" aria-hidden="true" />
              {/* Touch screens can't hover, so phones and tablets get the screenshot inline */}
              {w.preview && (
                <span className="lg:hidden col-start-2 col-span-2 mt-5 block relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-surface">
                  <Image
                    src={w.preview}
                    alt={`${w.title} screenshot`}
                    fill
                    sizes="(max-width: 1023px) 85vw, 1px"
                    className="object-cover object-top"
                  />
                </span>
              )}
              <span className="col-start-2 col-span-2 lg:col-span-1 lg:col-start-auto mt-4 lg:mt-0 text-sm leading-relaxed text-white/65">
                {w.description}
              </span>
              <span className="lg:hidden col-start-2 col-span-2 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
                <span className="text-accent/85">{w.badge}</span>
                <span className="normal-case tracking-normal">{w.tags.join(" · ")}</span>
              </span>
              <span className="lg:hidden col-start-2 col-span-2 mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {w.href.includes("github.com") ? "View the code" : "Open the site"}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="hidden lg:block font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
                {w.badge}
                <span className="block mt-1 normal-case tracking-normal text-white/45">{w.tags.join(" · ")}</span>
              </span>
              <ArrowUpRight
                className="hidden lg:block h-6 w-6 self-center text-white/40 transition-[color,transform] duration-500 ease-out-expo group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ol>

      {/* Cursor-follow preview (desktop with a mouse only) */}
      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[340px] [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-white/15 bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] transition-[opacity,transform] duration-300 ease-out-expo ${
            current?.preview ? "opacity-100 scale-100 rotate-[-2deg]" : "opacity-0 scale-90 rotate-0"
          }`}
        >
          {otherWork
            .filter((w) => w.preview)
            .map((w) => (
              <Image
                key={w.id}
                src={w.preview!}
                alt=""
                fill
                sizes="340px"
                className={`object-cover object-top transition-opacity duration-300 ${active === w.id ? "opacity-100" : "opacity-0"}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
