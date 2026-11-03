"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { commissions } from "@/lib/work";
import { useSectionMotion } from "@/lib/motion";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Paid projects as chapters. On desktop each chapter is a two-column spread:
 * the copy pins while that project's screenshots scroll past beside it, then
 * the next chapter pushes it away. On phones it is a plain stack.
 */
export default function Commissions() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  // Each main screenshot opens like a window as it arrives, the image
  // settling from a slight zoom. One authored moment per chapter.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-frame]").forEach((frame) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top 85%", once: true } });
          tl.fromTo(frame, { clipPath: "inset(18% 12% 18% 12% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.4, ease: "expo.inOut" })
            .fromTo(frame.querySelector("img"), { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projects" aria-labelledby="projects-title" className="relative px-6 sm:px-12 xl:px-24 pt-32 sm:pt-44">
      <header className="max-w-6xl">
        <h2
          id="projects-title"
          data-heading
          className="font-display uppercase text-[17vw] sm:text-[12vw] xl:text-[10vw] leading-[0.85] tracking-[-0.02em] text-white"
        >
          Paid Projects
        </h2>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-white/65">
          <span className="font-coffekan text-3xl sm:text-4xl text-accent mr-2">for paying clients.</span>
          Commercial builds, each with a full case study.
        </p>
      </header>

      <ol className="mt-20 sm:mt-28">
        {commissions.map((p, i) => (
          <li key={p.id} className="border-t border-white/10">
            <article className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-20 py-16 lg:py-24">
              {/* Copy: pins for the length of its screenshots */}
              <div className="lg:sticky lg:top-[14vh] self-start">
                <p className="font-coffekan text-4xl sm:text-5xl text-accent">Project 0{i + 1}</p>
                <h3 className="mt-2 font-display uppercase text-[13vw] sm:text-7xl xl:text-8xl leading-[0.88] tracking-[-0.02em] text-white">
                  <Link href={`/projects/${p.slug}`} className="hover:text-accent transition-colors duration-300">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-6 max-w-[46ch] text-base sm:text-lg leading-relaxed text-white/75">{p.description}</p>

                <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 max-w-md text-sm">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80">Client</dt>
                    <dd className="mt-1 text-white/85">{p.client}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80">When</dt>
                    <dd className="mt-1 text-white/85">{p.period}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80">Built with</dt>
                    <dd className="mt-1 text-white/85">{p.tags.join(" · ")}</dd>
                  </div>
                </dl>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-background hover:bg-[#ffc72c] transition-colors"
                  >
                    Read the case study
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm text-white/85 hover:border-white/45 transition-colors"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${p.status === "Live" ? "bg-emerald-400" : "bg-accent"}`}
                        aria-hidden="true"
                      />
                      {p.status === "Live" ? "Visit live site" : "Preview (in progress)"}
                      <span className="sr-only"> for {p.title}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Screenshots: one hero frame, two offset details */}
              <div className="relative">
                <figure
                  data-frame
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
                >
                  <Image
                    src={p.images[0]}
                    alt={`${p.title}, main screen`}
                    fill
                    sizes="(max-width: 1023px) 100vw, 55vw"
                    className="object-cover object-top"
                  />
                </figure>
                <div className="relative z-10 -mt-[12%] ml-[8%] grid grid-cols-2 gap-4 lg:gap-6">
                  {p.images.slice(1, 3).map((src, k) => (
                    <figure
                      key={src}
                      data-parallax={k === 0 ? 8 : 16}
                      className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-surface ring-8 ring-background shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] ${k === 1 ? "mt-[18%]" : ""}`}
                    >
                      <Image
                        src={src}
                        alt={`${p.title}, detail ${k + 1}`}
                        fill
                        sizes="(max-width: 1023px) 50vw, 27vw"
                        className="object-cover object-top"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
