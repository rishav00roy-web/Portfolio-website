import Image from "next/image";
import { FileText } from "lucide-react";
import { bio, certificates, education, experience, languages, skills } from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading id="about-title" eyebrow="About" title="Operations first, then code." />
        </div>
        <div className="space-y-6">
          <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">{bio[0]}</p>
          {bio.slice(1).map((p) => (
            <p key={p.slice(0, 24)} className="text-base leading-relaxed text-muted sm:text-lg">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="Where I've worked"
          intro="Six years across remote compliance work, HR and procurement, and running my own trading business."
        />

        <ol className="mt-12 space-y-4">
          {experience.map((job) => (
            <li
              key={job.company}
              className="grid gap-4 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[16rem_1fr] lg:gap-10"
            >
              <div>
                <p className="font-mono text-xs text-subtle">{job.period}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{job.role}</h3>
                <p className="mt-1 text-sm text-muted">{job.company}</p>
                {"remote" in job && job.remote && (
                  <span className="mt-3 inline-block rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-2.5 py-0.5 text-xs text-emerald-300">
                    Remote
                  </span>
                )}
              </div>
              <ul className="space-y-2.5 text-sm leading-relaxed text-muted sm:text-base">
                {job.bullets.map((b) => (
                  <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-2.5 before:rounded-full before:bg-accent/60">
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading id="skills-title" eyebrow="Toolkit" title="Skills, education & credentials" />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="bg-background p-6">
              <h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="bg-background p-6">
            <h3 className="text-sm font-semibold text-foreground">Languages</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {languages.map((l) => (
                <li key={l.name}>
                  <span className="block text-sm text-foreground">{l.name}</span>
                  <span className="text-xs text-subtle">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">Education</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {education.map((e) => (
                <li key={e.degree} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <p className="font-medium text-foreground">{e.degree}</p>
                    <p className="text-sm text-muted">{e.school}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-subtle">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="certificates">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">Certificates</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {certificates.map((c) => (
                <li key={c.title}>
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-line-strong"
                  >
                    <div className="relative aspect-[4/3] bg-surface-2">
                      <Image
                        src={c.image}
                        alt={`${c.issuer} certificate: ${c.title}`}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 280px"
                        className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{c.title}</p>
                        <p className="text-xs text-subtle">{c.issuer}</p>
                      </div>
                      <FileText className="h-4 w-4 shrink-0 text-subtle group-hover:text-accent" aria-hidden="true" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
