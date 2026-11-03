"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { certificates } from "@/lib/profile";
import { useSectionMotion } from "@/lib/motion";

/** Certificates hung like prints: slightly askew, straightening on hover. */
export default function Certificates() {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  return (
    <section ref={root} id="certificates" aria-labelledby="certs-title" className="relative px-6 sm:px-12 xl:px-24 pt-32 sm:pt-44">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 lg:gap-24 items-center">
        <div>
          <h2
            id="certs-title"
            data-heading
            className="font-display uppercase text-[12vw] sm:text-[9vw] lg:text-[5vw] leading-[0.85] tracking-[-0.02em] text-white"
          >
            Credentials
          </h2>
          <p className="mt-6 max-w-sm text-base text-white/65">
            <span className="font-coffekan text-3xl text-accent mr-2">always learning,</span>
            one certificate at a time.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 gap-10 sm:gap-8">
          {certificates.map((c, i) => (
            <li key={c.title}>
              <a
                href={c.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block transition-transform duration-700 ease-out-expo hover:rotate-0 hover:-translate-y-2 focus-visible:rotate-0 ${
                  i === 0 ? "-rotate-2" : "rotate-2 sm:translate-y-10"
                }`}
              >
                <figure className="rounded-sm bg-[#f4ede3] p-3 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <Image
                      src={c.image}
                      alt={`${c.title} certificate, ${c.issuer}`}
                      fill
                      sizes="(max-width: 639px) 100vw, 30vw"
                      className="object-contain"
                    />
                  </div>
                </figure>
                <p className="mt-5 flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-white">{c.title}</span>
                    <span className="text-sm text-white/55">{c.issuer}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
