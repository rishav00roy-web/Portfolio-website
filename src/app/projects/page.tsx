import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import KineticGrid from "../../components/KineticGrid";
import { allCaseStudies } from "../../lib/projectsData";

export const metadata: Metadata = {
  title: "Case Studies | Rishav Roy",
  description: "Deep dives into commercial builds, tools, and technical experiments.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Case Studies | Rishav Roy",
    description: "Deep dives into commercial builds, tools, and technical experiments.",
    url: "/projects",
    siteName: "Rishav Roy Portfolio",
    type: "website",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Rishav Roy",
    description: "Deep dives into commercial builds, tools, and technical experiments.",
    images: ["/twitter-image.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-white/20 relative">
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
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Case Studies</div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className="max-w-3xl mb-20">
            <h1 className="text-4xl sm:text-6xl font-sans tracking-tight mb-6">Detailed Case Studies</h1>
            <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-sans">
              A comprehensive look at the commercial builds, tools, and experiments I&apos;ve engineered. Each
              case study details the architecture, challenges overcome, and the ultimate business value
              delivered.
            </p>
          </div>

          <ul className="flex flex-col gap-6">
            {allCaseStudies.map((caseStudy) => (
              <li key={caseStudy.id}>
                <Link
                  href={`/projects/${caseStudy.slug}`}
                  className="group block rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 sm:p-10 hover:bg-white/[0.08] hover:border-white/25 transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                    <div className="lg:w-2/3">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: caseStudy.color }}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                          {caseStudy.period}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 flex items-start gap-3">
                        <span className="group-hover:text-white/80 transition-colors">{caseStudy.title}</span>
                        <ArrowUpRight className="w-6 h-6 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all text-white/70" />
                      </h2>

                      <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-5">
                        {caseStudy.tagline}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-[10px] font-mono tracking-wider uppercase bg-white/5 text-white/60 rounded border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-1/3 grid grid-cols-2 gap-4 lg:gap-3 self-center w-full">
                      {caseStudy.metrics.slice(0, 4).map((metric) => (
                        <div key={metric.label}>
                          <div
                            className={`font-bold tracking-tight leading-tight ${
                              metric.value.length > 8 ? "text-base" : "text-xl sm:text-2xl"
                            }`}
                            style={{ color: caseStudy.color }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest font-mono text-white/40 truncate">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>

        <footer className="py-12 border-t border-white/5 text-center text-sm text-white/50 font-mono">
          Rishav Roy — Case Studies Archive
        </footer>
      </div>
    </div>
  );
}
