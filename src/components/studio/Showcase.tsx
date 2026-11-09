"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Globe, HeartHandshake, LayoutDashboard, LayoutGrid, MonitorSmartphone, Plug, Rows3, Search, Star } from "lucide-react";
import { SupportStage } from "../v5/AIStage";
import { SkeletonImage } from "../Skeleton";
import InvoicePrinterDemo from "./InvoicePrinterDemo";
import Clients from "./Clients";
import StudioHero from "./StudioHero";
import { Doodle, ProcessPath, Swash } from "./Organic";
import { SERVICES, PROCESS } from "@/lib/studio";
import { commissions, otherWork } from "@/lib/work";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * /atelier: the studio's work as a showroom. Each project sits on its own
 * lit stage, the desktop build in a browser frame with the real phone view
 * (captured from the live site) leaning in front. Filters with counts split
 * websites from products; a toggle swaps the stages for a compact list.
 * Each stage is a soft panel with a loose swash, in Atelier's teal and
 * coral.
 */

type Kind = "website" | "product";
type Entry = {
  key: string;
  title: string;
  description: string;
  kind: Kind;
  discipline: string;
  image?: string;
  phone?: string;
  stage?: "support" | "invoice";
  href: string;
  internal: boolean;
  cta: string;
  /** The flagship: double width, a second screen on its stage. */
  featured?: { second: string; label: string };
};

/*
 * Screen grabs of each live site, taken with Playwright (desktop 1440x900 at
 * 2x, phone 390x844 at 3x, after fonts and reveals settle). IQ Iron Fitness
 * keeps its earlier desktop shot: the live CRM shows an empty demo account.
 */
const SHOT_KEYS = [
  "pheonix",
  "tea-country-holidays",
  "iq-iron-fitness",
  "clash-bazar",
  "microgreens-site",
  "truwest-company-page",
  "roy-and-co-website",
  "chriskennelsite",
  "personal-portfolio-v2",
] as const;
const PHONES: Record<string, string> = Object.fromEntries(SHOT_KEYS.map((k) => [k, `/assets/projects/shots/mobile/${k}.webp`]));
const DESKTOPS: Record<string, string> = Object.fromEntries(
  SHOT_KEYS.filter((k) => k !== "iq-iron-fitness").map((k) => [k, `/assets/projects/shots/desktop/${k}.webp`]),
);

/*
 * Card copy written for the studio page (plain words, the studio's voice).
 * The project data keeps its fuller, more technical descriptions for the
 * case studies and the portfolio.
 */
const COPY: Record<string, { title?: string; description: string }> = {
  "tea-country-holidays": {
    description: "A travel site for an agency owner who isn't technical. She runs 34 packages across 24 destinations, changes prices and posts offers herself, with no developer needed.",
  },
  "iq-iron-fitness": {
    description: "A membership system for a gym: billing, salary slips and a daily dashboard, built to run well on the owner's older laptop and phone.",
  },
  "clash-bazar": {
    description: "A store for the Clash of Clans YouTuber V7 CLASH. Stripe and PayPal payments are held until the order is done and a 7-day window has passed.",
  },
  "microgreens-site": {
    title: "Infinity Greens",
    description: "A site for a vertical microgreens farm in Surrey, BC, with its products, recipes and story, and gentle motion throughout.",
  },
  "truwest-company-page": {
    description: "A lead site for a mortgage broker in BC and Alberta: borrower guides, mortgage calculators, 30+ city pages for local search and a step-by-step pre-qualification form.",
  },
  "roy-and-co-website": {
    description: "A marketing site for a weddings and events brand, with smooth scrolling and a header that changes colour as you move down the page.",
  },
  chriskennelsite: {
    title: "Willchris Kennels",
    description: "A site for a dog boarding, daycare and grooming business, with its own page for each service and for trail walks.",
  },
  "personal-portfolio-v2": {
    title: "byrishav.online",
    description: "Rishav's own site: a portfolio for recruiters and this studio page, with Psunk, an AI assistant trained on both.",
  },
  "gym-crm": {
    title: "Gym CRM",
    description: "A member system for gyms in basements with no signal. It reads sign-up forms with the camera and keeps everything on the device until the connection comes back.",
  },
};

const host = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
};

const ENTRIES: Entry[] = [
  {
    key: "pheonix",
    title: "Pheonix",
    description: "A streetwear shop from Jorhat, styled after the rapper AJ Shield. It has 3D models, a cassette player that plays her songs, and orders go straight to WhatsApp. Our most detailed build so far.",
    kind: "website",
    discipline: "Design and build",
    image: DESKTOPS.pheonix,
    phone: PHONES.pheonix,
    href: "https://pheonix-ashy.vercel.app",
    internal: false,
    cta: "Visit site",
    featured: { second: "/assets/projects/pheonix-cassette.webp", label: "Latest build" },
  },
  {
    key: "invoice-reader",
    title: "Invoice reader",
    description: "Reads invoices and receipts and pulls out the vendor, date and amounts, so nobody has to type them in.",
    kind: "product",
    discipline: "AI tool, demos on request",
    stage: "invoice",
    href: "#contact",
    internal: false,
    cta: "Book a demo",
  },
  {
    key: "support-agent",
    title: "Support agent",
    description: "Answers your customers from your own information, day or night, and hands over to a person when it should.",
    kind: "product",
    discipline: "AI agent, live on this site",
    stage: "support",
    href: "#chat",
    internal: false,
    cta: "Try it now",
  },
  ...commissions.map((p) => ({
    key: p.slug,
    title: COPY[p.slug]?.title ?? p.title,
    description: COPY[p.slug]?.description ?? p.description,
    kind: "website" as const,
    discipline: "Client build",
    image: DESKTOPS[p.slug] ?? p.images[0],
    phone: PHONES[p.slug],
    // Just the way to the site itself: no status, no extra links.
    href: p.live ?? `/projects/${p.slug}`,
    internal: !p.live,
    cta: p.live ? "Visit site" : "Case study",
  })),
  ...otherWork
    .filter((w) => w.preview && w.id !== "job-tracker-and-email-tracker" && w.id !== "gym-crm")
    .map((w) => ({
      key: w.id,
      title: COPY[w.id]?.title ?? w.title,
      description: COPY[w.id]?.description ?? w.description,
      kind: "website" as const,
      discipline: "Design and build",
      image: DESKTOPS[w.id] ?? w.preview,
      phone: PHONES[w.id],
      href: w.href,
      internal: false,
      cta: w.href.includes("github.com") ? "Read the code" : "Visit site",
    })),
  {
    key: "job-tracker",
    title: "Job tracker",
    description: "Runs a job hunt on its own. It scores listings from 54 sites, moves each application when an email arrives, and tailors the résumé without inventing anything.",
    kind: "product",
    discipline: "AI agent",
    image: "/assets/projects/job-tracker-board.webp",
    href: "https://job-tracker-and-email-tracker-web-five.vercel.app",
    internal: false,
    cta: "Try it live",
  },
  ...otherWork
    .filter((w) => w.id === "gym-crm")
    .map((w) => ({
      key: w.id,
      title: COPY["gym-crm"].title!,
      description: COPY["gym-crm"].description,
      kind: "product" as const,
      discipline: "Offline-first tool",
      image: w.preview,
      href: w.href,
      internal: false,
      cta: "Read the code",
    })),
];

const FILTERS: { id: "all" | Kind; label: string; Icon: typeof Globe }[] = [
  { id: "all", label: "All", Icon: LayoutGrid },
  { id: "website", label: "Websites", Icon: Globe },
  { id: "product", label: "AI and products", Icon: Bot },
];

/** One line icon per service, in the order of SERVICES. */
const SERVICE_ICONS = [MonitorSmartphone, Search, LayoutDashboard, Plug, Bot, HeartHandshake];


const openChat = () => document.querySelector<HTMLButtonElement>('[aria-label="Open Psunk AI Chat"]')?.click();

/** The lit stage a project stands on: a soft pool of light, a loose swash, the devices. */
function Stage({ e }: { e: Entry }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-paper-2/60">
      <svg aria-hidden="true" viewBox="0 0 400 250" fill="none" className="absolute inset-0 h-full w-full">
        <path d="M-10 210 C 70 150, 140 250, 220 190 S 340 90, 410 120" style={{ stroke: "rgba(var(--s-ink-rgb), 0.10)" }} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {e.stage ? (
        <div className="relative p-4 sm:p-8">
          <div className="mx-auto max-w-xl">{e.stage === "support" ? <SupportStage /> : <InvoicePrinterDemo />}</div>
        </div>
      ) : e.featured ? (
        <div className="relative px-5 pt-8 pb-10 sm:px-10 sm:pt-12 sm:pb-14">
          <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="-rotate-1 overflow-hidden rounded-xl border border-ink/15 bg-paper shadow-[0_16px_32px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out-expo group-hover:-translate-y-1">
              <div className="flex h-7 items-center gap-1.5 border-b border-ink/10 px-3" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
              </div>
              <div className="relative aspect-[16/10]">
                <SkeletonImage src={e.image!} alt={`${e.title}, the home page`} fill sizes="(max-width: 1023px) 90vw, 50vw" className="object-cover object-top" />
              </div>
            </div>
            <div className="relative mx-auto w-4/5 lg:mx-0 lg:w-full">
              <div className="rotate-2 transition-transform duration-300 ease-out-expo group-hover:-translate-y-2">
                <div className="relative aspect-[1100/897]">
                  <SkeletonImage src={e.featured.second} alt={`${e.title}, the 3D cassette player`} fill sizes="30vw" className="object-contain" />
                </div>
              </div>
              <p className="mt-2 text-center font-mono text-sm text-ink/55">The 3D cassette player</p>
            </div>
          </div>
          {e.phone && (
            <div className="absolute bottom-6 right-6 hidden w-[17%] rotate-[4deg] lg:block overflow-hidden rounded-[1.3rem] border-[3px] border-[var(--s-bezel)] bg-paper shadow-[0_14px_28px_-10px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out-expo group-hover:-translate-y-2 lg:right-[38%] lg:w-[11%]">
              <div className="relative aspect-[390/844]">
                <SkeletonImage src={e.phone} alt={`${e.title}, on a phone`} fill sizes="12vw" className="object-cover object-top" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative px-5 pt-8 pb-8 sm:px-10 sm:pt-12 sm:pb-12">
          {/* Browser frame */}
          <div className={`overflow-hidden rounded-lg border border-ink/15 bg-paper shadow-[0_16px_32px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out-expo group-hover:-translate-y-1 ${e.phone ? "mr-[18%]" : ""}`}>
            <div className="flex h-6 items-center gap-1.5 border-b border-ink/10 px-3" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
              <span className="h-1.5 w-1.5 rounded-full bg-ink/25" />
            </div>
            <div className="relative aspect-[16/10]">
              <SkeletonImage src={e.image!} alt={`${e.title}, desktop`} fill sizes="(max-width: 1023px) 90vw, 40vw" className="object-cover object-top" />
            </div>
          </div>
          {/* Phone, leaning in front, taken from the live site */}
          {e.phone && (
            <div className="absolute bottom-5 right-5 w-[26%] rotate-2 overflow-hidden rounded-[1.3rem] border-[3px] border-[var(--s-bezel)] bg-paper shadow-[0_14px_28px_-10px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out-expo group-hover:-translate-y-2 sm:bottom-8 sm:right-10">
              <div className="relative aspect-[390/844]">
                <SkeletonImage src={e.phone} alt={`${e.title}, on a phone`} fill sizes="(max-width: 1023px) 26vw, 12vw" className="object-cover object-top" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Action({ e, className, children }: { e: Entry; className: string; children: React.ReactNode }) {
  if (e.internal) return <Link href={e.href} className={className}>{children}</Link>;
  if (e.href === "#chat")
    return (
      <button type="button" onClick={openChat} className={className}>
        {children}
      </button>
    );
  if (e.href.startsWith("#")) return <a href={e.href} className={className}>{children}</a>;
  return (
    <a href={e.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function Showcase() {
  const root = useRef<HTMLDivElement>(null);
  // The filter lives in the URL (?show=websites|products), so a filtered view can be shared.
  // Read without an effect: the server renders "all", the client reads the URL.
  const fromUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("show") ?? "",
    () => "",
  );
  const [picked, setPicked] = useState<"all" | Kind | null>(null);
  const filter: "all" | Kind = picked ?? (fromUrl === "websites" ? "website" : fromUrl === "products" ? "product" : "all");
  const [view, setView] = useState<"stage" | "list">("stage");
  const choose = (id: "all" | Kind) => {
    setPicked(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("show");
    else url.searchParams.set("show", id === "website" ? "websites" : "products");
    window.history.replaceState(null, "", url);
  };
  const shown = useMemo(() => ENTRIES.filter((e) => filter === "all" || e.kind === filter), [filter]);
  const count = (id: "all" | Kind) => (id === "all" ? ENTRIES.length : ENTRIES.filter((e) => e.kind === id).length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set("[data-rise]", { y: 36, opacity: 0 });
        ScrollTrigger.batch("[data-rise]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.1, stagger: 0.05, ease: "expo.out", clearProps: "transform,opacity" }),
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [filter, view], revertOnUpdate: true },
  );

  return (
    <div ref={root} className="relative overflow-x-clip">
      <StudioHero />

      <section id="projects" aria-labelledby="work-title" className="relative mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-20 sm:pt-28">
        <Doodle kind="browser" className="left-[30rem] top-14 hidden w-32 -rotate-6 lg:block" />
        <Doodle kind="cursor" className="left-[38rem] top-32 hidden w-12 rotate-6 lg:block" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <h2 id="work-title" data-rise className="font-display text-7xl leading-[0.85] sm:text-8xl">
            Work<span className="text-rust">.</span>
          </h2>
          <p data-rise className="max-w-md text-xl leading-snug text-ink/75 lg:pb-3">
            Everything we&apos;ve built. Filter by type, or switch to a list.
          </p>
        </div>

        {/* Filters with counts, and the view toggle */}
        <div data-rise className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
          <div role="group" aria-label="Filter the work" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(f.id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-base transition-colors ${
                    on ? "bg-ink text-paper" : "border border-ink/20 text-ink/75 hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  <f.Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {f.label}
                  <span className={`text-sm tabular-nums ${on ? "text-paper/75" : "text-ink/55"}`}>{count(f.id)}</span>
                </button>
              );
            })}
          </div>
          <div role="group" aria-label="Layout" className="flex rounded-full border border-ink/15 p-1">
            {(
              [
                ["stage", "Stages", LayoutGrid],
                ["list", "List", Rows3],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-base transition-colors ${
                  view === id ? "bg-ink/10 text-ink" : "text-ink/55 hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tells screen-reader users what the filter did */}
        <p role="status" className="sr-only">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>

        {view === "stage" ? (
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {shown.map((e, i) => (
              <li key={e.key} data-rise className={`${e.featured ? "lg:col-span-2" : ""} group flex flex-col rounded-[28px] border border-ink/10 bg-paper/80 p-3 sm:rounded-[32px] sm:p-4 transition-colors duration-300 hover:border-ink/25`}>
                <div className="flex items-baseline justify-between px-2 pb-3 pt-1 font-mono text-sm">
                  <span className="tabular-nums">
                    <span className="text-rust">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-ink/55"> / {String(shown.length).padStart(2, "0")}</span>
                  </span>
                  <span className={`inline-flex items-center gap-1.5 ${e.featured ? "text-rust" : "text-ink/55"}`}>
                    {e.featured ? (
                      <Star className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    ) : e.kind === "website" ? (
                      <Globe className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                    )}
                    {e.featured ? e.featured.label : e.kind === "website" ? "Website" : "Product"}
                  </span>
                </div>
                <Stage e={e} />
                <div className="flex flex-1 flex-col px-2 pt-6 pb-2">
                  <h3 className="text-3xl font-medium tracking-[-0.01em]">{e.title}</h3>
                  <p className="mt-3 mb-6 font-mono text-base leading-relaxed text-ink/65 line-clamp-3">{e.description}</p>
                  <div className="mt-auto flex items-center justify-between gap-x-6 border-t border-ink/10 pt-5 font-mono text-sm">
                    <span className="shrink-0 text-ink/55">{e.discipline}</span>
                    {!e.internal && host(e.href) && <span className="hidden min-w-0 flex-1 truncate text-center text-ink/55 sm:inline">{host(e.href)}</span>}
                    <Action e={e} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-rust hover:opacity-80">
                      {e.cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Action>
                  </div>
                </div>
              </li>
            ))}
            {(shown.length + (shown.some((x) => x.featured) ? 1 : 0)) % 2 === 1 && (
              <li data-rise className="hidden lg:flex">
                <a href="#contact" className="group flex w-full flex-col justify-end rounded-[32px] border border-dashed border-ink/20 p-10 transition-colors duration-300 hover:border-rust">
                  <span className="font-display text-5xl leading-[0.95] group-hover:text-rust transition-colors">Yours could be next</span>
                  <span className="mt-4 max-w-sm text-lg leading-relaxed text-ink/60">Tell us what your business needs. You&apos;ll get a written, fixed-scope quote before any work starts.</span>
                  <span className="mt-8 inline-flex items-center gap-2 text-base text-rust">
                    Start a project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            )}
          </ul>
        ) : (
          <ol className="mt-6">
            {shown.map((e, i) => (
              <li key={e.key} data-rise className="group grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-4 border-b border-ink/10 py-5 sm:grid-cols-[3rem_9rem_minmax(0,1fr)_auto] sm:gap-8">
                <span className="text-base tabular-nums text-rust">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative hidden aspect-[16/10] overflow-hidden rounded-md border border-ink/10 bg-paper-2 sm:block">
                  {e.image && <Image src={e.image} alt={`${e.title} website screenshot`} fill sizes="9rem" className="object-cover object-top" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-2xl font-medium">{e.title}</span>
                  <span className="mt-1 block text-base text-ink/55">{e.discipline}</span>
                </span>
                <Action e={e} className="col-start-2 inline-flex min-h-11 items-center gap-2 text-base text-rust hover:opacity-80 sm:col-start-auto">
                  {e.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Action>
              </li>
            ))}
          </ol>
        )}
      </section>

      <Clients />

      <div className="pt-24 sm:pt-36">
        <Swash />
      </div>

      {/* What the studio does, and how a project runs */}
      <section id="process" aria-labelledby="services-title" className="relative mx-auto max-w-[1440px] px-6 sm:px-12 xl:px-20 pt-16 sm:pt-24 pb-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 id="services-title" data-rise className="font-display text-5xl sm:text-6xl leading-[0.95]">What we build</h2>
            <ul className="mt-10">
              {SERVICES.map((sv, i) => {
                const Icon = SERVICE_ICONS[i];
                return (
                <li key={sv.name} data-rise className="group grid grid-cols-[3.5rem_minmax(0,1fr)] items-start py-4">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-[42%_58%_55%_45%/50%_45%_55%_50%] bg-rust/10 text-rust transition-colors duration-300 group-hover:bg-rust/20">
                    <Icon className="icon-wiggle h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span>
                  <span className="block text-xl text-ink/90">{sv.name}</span>
                  <span className="mt-1 block text-lg leading-relaxed text-ink/55">{sv.detail}</span>
                  </span>
                </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 data-rise className="font-display text-5xl sm:text-6xl leading-[0.95]">How we work</h2>
            <ProcessPath steps={PROCESS} />
          </div>
        </div>
        <div aria-hidden="true">
          <Doodle kind="chat" className="right-[4%] top-[38%] hidden w-36 rotate-3 lg:block" />
          <Doodle kind="code" className="right-[10%] bottom-10 hidden w-28 -rotate-3 lg:block" />
        </div>
      </section>
    </div>
  );
}
