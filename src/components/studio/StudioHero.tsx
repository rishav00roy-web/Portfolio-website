"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

/*
 * The studio's opening screen. Left: the name, set big, one line, two
 * actions and three true counts. Right: a lit stage built on the AS mark's
 * construction circles, with real work standing on it: a client site in a
 * browser, another on a phone, and the support agent mid-answer. The
 * devices rise in one after another, then drift apart slightly as you
 * scroll away (transform only).
 */

type Props = { projects: number; live: number; products: number };

export default function StudioHero({ projects, live, products }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-h-line]", { yPercent: 110, duration: 1.3, stagger: 0.05 })
          .from("[data-h-copy]", { y: 20, opacity: 0, duration: 1, stagger: 0.05 }, "-=0.9")
          .from("[data-h-ring]", { scale: 0.85, opacity: 0, duration: 1.6, stagger: 0.05 }, 0.1)
          .from("[data-h-device]", { y: 60, opacity: 0, duration: 1.4, stagger: 0.05 }, 0.3);

        // Leaving the hero: the devices part a little, at different speeds.
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-h-browser]", { yPercent: -6, ease: "none", scrollTrigger: st });
        gsap.to("[data-h-phone]", { yPercent: -18, ease: "none", scrollTrigger: st });
        gsap.to("[data-h-chat]", { yPercent: -30, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="studio-title" className="relative mx-auto max-w-[1440px] overflow-hidden px-6 sm:px-12 xl:px-20 lg:overflow-visible">
      <div className="grid min-h-[calc(100dvh-5.5rem)] items-center gap-12 py-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:py-0">
        {/* The words */}
        <div className="relative z-10 min-w-0">
          <h1 id="studio-title" className="font-display text-[17vw] leading-[0.86] sm:text-[8rem] xl:text-[9.5rem]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-h-line className="block">Atelier</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-h-line className="block">
                Systems<span className="text-rust">.</span>
              </span>
            </span>
          </h1>
          <p data-h-copy className="mt-8 max-w-lg text-xl leading-snug text-ink/80 sm:text-2xl">
            Websites, automation and AI products for small businesses. Designed and built end to end by Rishav Roy.
          </p>
          <div data-h-copy className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rust px-7 text-base font-semibold text-paper hover:opacity-90">
              Start a project <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#projects" className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-7 text-base hover:border-rust hover:text-rust">
              See the work
            </a>
          </div>
          <dl data-h-copy className="mt-14 grid max-w-lg grid-cols-3 border-t border-ink/10 pt-6">
            {[
              [projects, "projects built"],
              [live, "client sites live"],
              [products, "AI and products"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-mono text-3xl tabular-nums text-ink sm:text-4xl">{String(n).padStart(2, "0")}</dd>
                <dd className="mt-1 text-base text-ink/55">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The stage */}
        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[40rem] lg:max-w-none">
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(207,224,122,0.10),rgba(232,235,228,0.04)_55%,transparent)]" />
          <span data-h-ring className="absolute inset-[2%] rounded-full border border-ink/10" />
          <span data-h-ring className="absolute inset-[16%] rounded-full border border-ink/10" />
          <span data-h-ring className="absolute inset-[30%] rounded-full border border-dashed border-ink/10" />
          <span data-h-ring className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/10" />
          <span data-h-ring className="absolute top-1/2 left-0 right-0 h-px bg-ink/10" />
          <Image
            data-h-ring
            src="/brand/atelier-monogram.webp"
            alt=""
            width={357}
            height={292}
            className="absolute left-[41%] top-[8%] w-[18%] opacity-60"
          />

          {/* Browser */}
          <div data-h-device className="absolute left-[2%] top-[24%] w-[78%]">
            <div data-h-browser className="overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]">
              <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 px-3">
                <span className="h-2 w-2 rounded-full bg-ink/25" />
                <span className="h-2 w-2 rounded-full bg-ink/25" />
                <span className="h-2 w-2 rounded-full bg-ink/25" />
                <span className="ml-3 hidden truncate whitespace-nowrap rounded-full bg-ink/[0.06] px-3 py-0.5 font-mono text-[11px] text-ink/55 sm:inline">tea-country-holidays.vercel.app</span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image src="/assets/projects/tea-1.jpg" alt="" fill priority sizes="(max-width: 1023px) 80vw, 36vw" className="object-cover object-top" />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div data-h-device className="absolute right-[4%] top-[34%] w-[25%]">
            <div data-h-phone className="overflow-hidden rounded-[1.4rem] border-4 border-[#2a3233] bg-paper shadow-[0_40px_80px_-20px_rgba(0,0,0,0.95)]">
              <div className="relative aspect-[390/844]">
                <Image src="/assets/projects/mobile/clash-bazar.webp" alt="" fill sizes="(max-width: 1023px) 25vw, 12vw" className="object-cover object-top" />
              </div>
            </div>
          </div>

          {/* The support agent, mid-answer */}
          <div data-h-device className="absolute bottom-[8%] left-[10%] hidden w-[52%] sm:block">
            <div data-h-chat className="rounded-2xl border border-moon/25 bg-paper-2/95 p-4 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.95)]">
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-moon px-3.5 py-2 text-sm text-paper">5-day Kerala trip in December?</p>
              <p className="mt-2 w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-ink/[0.07] px-3.5 py-2 text-sm leading-snug text-ink/85">
                Yes, the Backwaters and Hills package. Shall I send the itinerary?
              </p>
              <p className="mt-3 text-sm text-ink/55">Support agent, sample</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
