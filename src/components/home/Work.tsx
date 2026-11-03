import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allCaseStudies, categorizedProjects } from "@/lib/projectsData";
import SectionHeading from "./SectionHeading";

/** Cover shot per case study, keyed by slug. */
const COVERS: Record<string, string> = {
  "tea-country-holidays": "/assets/projects/tea-1.jpg",
  "iq-iron-fitness": "/assets/projects/gym-online-1.png",
  "clash-bazar": "/assets/projects/clash-1.png",
  "personal-portfolio-v2": "/assets/projects/portfolio-v2-full.png",
};

const moreProjects = categorizedProjects.flatMap((cat) =>
  cat.items.filter((item) => !item.caseStudySlug).map((item) => ({ ...item, category: cat.category })),
);

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Case studies"
          intro="Commercial builds for real clients, each written up with the problem, the architecture and what it changed for the business."
          action={{ href: "/projects", label: "All projects" }}
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {allCaseStudies.map((cs) => {
            const live = cs.links.find((l) => l.icon === "live");
            return (
              <li key={cs.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
                    <Image
                      src={COVERS[cs.slug]}
                      alt={`${cs.title} screenshot`}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1152px) 50vw, 560px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="font-mono text-xs text-subtle">{cs.period}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      <Link
                        href={`/projects/${cs.slug}`}
                        className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                      >
                        {cs.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-muted">{cs.tagline}</p>

                    <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-4">
                      {cs.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="text-xs text-subtle">{m.label}</dt>
                          <dd className="mt-0.5 text-sm font-semibold text-foreground">{m.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                      <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                        {cs.tags.slice(0, 3).map((t) => (
                          <li key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-foreground group-hover:text-accent">
                        Read
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    {live && (
                      <a
                        href={live.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 mt-4 self-start text-xs text-subtle underline decoration-line-strong underline-offset-4 hover:text-foreground"
                      >
                        Visit {live.label.toLowerCase()} <span className="sr-only">for {cs.title}</span>
                      </a>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-20">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">More projects</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {moreProjects.map((p) => {
              const href = p.liveUrl ?? p.githubUrl ?? "/projects";
              return (
                <li key={p.id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-2 py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                  >
                    <span className="font-medium text-foreground group-hover:text-accent">{p.title}</span>
                    <span className="text-sm leading-relaxed text-muted">{p.description}</span>
                    <span className="hidden items-center gap-1 whitespace-nowrap text-xs text-subtle sm:inline-flex">
                      {p.badge}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
