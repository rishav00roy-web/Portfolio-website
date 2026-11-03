import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { PROFILE, highlights } from "@/lib/profile";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:pt-32">
        <a
          href="#contact"
          className="rise inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1 text-xs font-medium text-emerald-300 transition-colors hover:border-emerald-400/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for hire
        </a>

        <h1 id="hero-title" className="rise mt-7 font-display tracking-tight">
          <span className="block text-5xl font-bold leading-[1.02] text-foreground sm:text-7xl lg:text-8xl">
            {PROFILE.name}
          </span>
          <span className="mt-3 block text-2xl font-semibold leading-tight text-muted sm:text-4xl">
            {PROFILE.role}
          </span>
        </h1>

        <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
          {PROFILE.tagline}
        </p>
        <p className="rise mt-4 max-w-2xl text-base leading-relaxed text-muted">{PROFILE.summary}</p>

        <div className="rise mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
          >
            View case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground/40 hover:bg-white/5"
          >
            Get in touch
          </a>
          <a
            href={PROFILE.resume}
            download
            className="inline-flex items-center gap-2 px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
            <span className="text-subtle">({PROFILE.resumeUpdated})</span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-subtle">
          <span className="inline-flex items-start gap-1.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {PROFILE.location} <span className="text-subtle/80">(originally from {PROFILE.hometown})</span>
            </span>
          </span>
          <span>
            Currently with <span className="text-muted">{PROFILE.currently.join(", ")}</span>
          </span>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="bg-background/90 p-5 sm:p-6">
              <dt className="text-xs text-subtle">{h.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {h.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
