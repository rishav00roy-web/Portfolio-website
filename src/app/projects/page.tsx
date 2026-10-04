import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Code2, Globe, Sparkles, Wrench, Layers } from "lucide-react";
import type { Metadata } from "next";
import KineticGrid from "../../components/KineticGrid";
import { allCaseStudies, categorizedProjects } from "../../lib/projectsData";
import { caseStudyIndexSchema, breadcrumbSchema, jsonLd } from "../../lib/schema";

export const metadata: Metadata = {
  title: "Case Studies & Project Directory | Rishav Roy",
  description: "Comprehensive catalog of commercial client platforms, design showcases, and web automation tools engineered by Rishav Roy.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Case Studies & Project Directory | Rishav Roy",
    description: "Comprehensive catalog of commercial client platforms, design showcases, and web automation tools engineered by Rishav Roy.",
    url: "/projects",
    siteName: "Rishav Roy Portfolio",
    type: "website",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Project Directory | Rishav Roy",
    description: "Comprehensive catalog of commercial client platforms, design showcases, and web automation tools engineered by Rishav Roy.",
    images: ["/twitter-image.jpg"],
  },
};

const categoryIcons = {
  "Client Websites": Globe,
  "Design-Heavy / Showcase Builds": Sparkles,
  "Web Apps / Tools": Wrench,
} as const;

const categoryIds = {
  "Client Websites": "client-websites",
  "Design-Heavy / Showcase Builds": "showcase-builds",
  "Web Apps / Tools": "web-apps-tools",
} as const;

export default function ProjectsPage() {
  const totalProjectsCount = categorizedProjects.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-white/20 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          caseStudyIndexSchema(allCaseStudies),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/projects" },
          ]),
        ])}
      />
      <KineticGrid spacing={44} radius={260} baseOpacity={0.05} />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/5 bg-[#030303]/80">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/60 uppercase tracking-widest hidden sm:inline">
                Catalog Archive
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-mono">
                {totalProjectsCount} Builds
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12 sm:py-20">
          {/* Breadcrumb trail */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/60 uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-white/70 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">
                Case Studies
              </li>
            </ol>
          </nav>

          {/* Page Intro Lockup */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/60 font-mono text-xs uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Engineering Directory</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white mb-4 leading-[1.05]">
              Detailed Case Studies
            </h1>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed font-sans">
              A categorized index of production client platforms, design showcases, and web automation tools engineered by Rishav Roy. Every system was built to remove manual operational overhead so non-technical stakeholders can operate autonomously.
            </p>
          </div>

          {/* Quick Jump Category Rail */}
          <nav aria-label="Category navigation" className="flex flex-wrap items-center gap-2.5 mb-16 p-2 rounded-2xl bg-white/[0.02] border border-white/10">
            {categorizedProjects.map((cat) => {
              const catId = categoryIds[cat.category];
              const Icon = categoryIcons[cat.category];
              return (
                <a
                  key={cat.category}
                  href={`#${catId}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white transition-all cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{cat.category}</span>
                  <span className="text-white/60">({cat.items.length})</span>
                </a>
              );
            })}
          </nav>

          {/* Categorized Sections */}
          <div className="space-y-20">
            {categorizedProjects.map((group) => {
              const catId = categoryIds[group.category];
              const Icon = categoryIcons[group.category];

              return (
                <section key={group.category} id={catId} className="space-y-6 scroll-mt-24">
                  {/* Category Header */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-amber-400" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-white">
                        {group.category}
                      </h2>
                      <span className="font-mono text-xs text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                        {group.items.length} {group.items.length === 1 ? "Build" : "Builds"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/50 max-w-lg font-sans">
                      {group.summary}
                    </p>
                  </div>

                  {/* Project Cards Grid */}
                  <div className="grid grid-cols-1 gap-5">
                    {group.items.map((item) => {
                      const fullCaseStudy = item.caseStudySlug
                        ? allCaseStudies.find((c) => c.slug === item.caseStudySlug)
                        : null;

                      return (
                        <article
                          key={item.id}
                          className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all shadow-xl flex flex-col xl:flex-row xl:items-start justify-between gap-6"
                        >
                          <div className="flex-1 space-y-4">
                            {/* Card Top Meta */}
                            <div className="flex flex-wrap items-center gap-2.5">
                              {item.badge && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border border-amber-500/20 bg-amber-500/10 text-amber-400 font-semibold">
                                  {item.badge}
                                </span>
                              )}
                              <span className="font-mono text-[11px] text-white/60 tracking-wider">
                                {item.githubRepoName}
                              </span>
                              {fullCaseStudy && (
                                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                  Deep Dive Available
                                </span>
                              )}
                            </div>

                            {/* Title & Description */}
                            <div>
                              <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-white group-hover:text-white/90 transition-colors">
                                {item.title}
                              </h3>
                              <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed font-sans max-w-3xl">
                                {item.description}
                              </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-white/5 text-white/70 rounded-full border border-white/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Featured Metrics if full case study */}
                            {fullCaseStudy && fullCaseStudy.metrics && fullCaseStudy.metrics.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
                                {fullCaseStudy.metrics.slice(0, 4).map((metric) => (
                                  <div key={metric.label}>
                                    <div
                                      className="font-bold tracking-tight text-base sm:text-lg text-white"
                                      style={{ color: fullCaseStudy.color }}
                                    >
                                      {metric.value}
                                    </div>
                                    <div className="text-[9px] uppercase tracking-widest font-mono text-white/60 truncate">
                                      {metric.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action CTAs Column */}
                          <div className="flex flex-wrap xl:flex-col items-start xl:items-end gap-2.5 shrink-0 pt-2 xl:pt-0">
                            {item.caseStudySlug && (
                              <Link
                                href={`/projects/${item.caseStudySlug}`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-white/90 shadow-md transition-all group/btn"
                              >
                                <span>Read Deep Dive</span>
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </Link>
                            )}

                            {item.liveUrl && (
                              <a
                                href={item.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs text-white/90 hover:bg-white/10 hover:border-white/40 transition-all"
                              >
                                <span>Live Site</span>
                                <ExternalLink className="w-3 h-3 text-white/60" />
                              </a>
                            )}

                            {item.githubUrl && (
                              <a
                                href={item.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs text-white/90 hover:bg-white/10 hover:border-white/40 transition-all"
                              >
                                <span>GitHub</span>
                                <Code2 className="w-3 h-3 text-white/60" />
                              </a>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </main>

        <footer className="py-12 border-t border-white/10 text-center text-sm text-white/50 font-mono">
          Rishav Roy | Engineering Case Studies &amp; System Directory
        </footer>
      </div>
    </div>
  );
}
