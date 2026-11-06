import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/*
 * Who the studio has built for. Only what Rishav has confirmed and what the
 * clients show publicly: names, who they are, what we made for them, and
 * links. No prices.
 */

const CLIENTS = [
  {
    name: "AJ Shield",
    realName: "Anjali Ojha",
    who: "Assamese rapper from Jorhat, Assam",
    photo: "/assets/clients/aj-shield.webp",
    alt: "AJ Shield in a silver wig and a pink graffiti-print dress",
    built: "Pheonix, her streetwear shop, with a page on her music and a cassette player that plays her songs.",
    links: [
      { label: "Pheonix preview", href: "https://pheonix-ashy.vercel.app" },
      { label: "Her page", href: "https://pheonix-ashy.vercel.app/aj-shield" },
    ],
  },
  {
    name: "V7 CLASH",
    realName: null,
    who: "Clash of Clans YouTuber",
    photo: "/assets/clients/v7clash.webp",
    alt: "V7 CLASH channel picture: a purple Legend League shield with the number 119",
    built: "Clash Bazar, the channel's store for clan services, with payments held until each order is done.",
    links: [
      { label: "Case study", href: "/projects/clash-bazar" },
      { label: "YouTube channel", href: "https://www.youtube.com/@V7CLASH" },
    ],
  },
] as const;

export default function Clients() {
  return (
    <section aria-labelledby="clients-title" className="mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-28 sm:pt-36">
      <h2 id="clients-title" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95]">
        Who we&apos;ve built for
      </h2>
      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {CLIENTS.map((c) => (
          <li key={c.name} data-rise className="grid gap-6 rounded-[28px] border border-ink/10 bg-paper-2/60 p-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:rounded-[32px] sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-2">
              <Image src={c.photo} alt={c.alt} fill sizes="(max-width: 639px) 90vw, 11rem" className="object-cover object-top" />
            </div>
            <div className="flex min-w-0 flex-col">
              <h3 className="text-3xl">{c.name}</h3>
              <p className="mt-1 text-base text-ink/60">
                {c.who}
                {c.realName ? `, real name ${c.realName}` : ""}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">{c.built}</p>
              <div className="mt-auto flex flex-wrap gap-x-6 pt-5">
                {c.links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex min-h-11 items-center gap-1.5 text-base text-rust hover:opacity-80"
                    >
                      {l.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
