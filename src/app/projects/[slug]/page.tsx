import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import KineticGrid from "../../../components/KineticGrid";
import CaseStudyArticle from "../../../components/CaseStudyArticle";
import { allCaseStudies, getCaseStudyBySlug } from "../../../lib/projectsData";

export async function generateStaticParams() {
  return allCaseStudies.map((c) => ({ slug: c.slug }));
}

// Unknown slugs 404 instead of being rendered on demand — the set of case
// studies is fixed and known at build time.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  const title = `${caseStudy.title} — Case Study | Rishav Roy`;
  const description = caseStudy.tagline;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      siteName: "Rishav Roy Portfolio",
      type: "article",
      images: ["/opengraph-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image.jpg"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const index = allCaseStudies.findIndex((c) => c.slug === slug);
  const next = allCaseStudies[(index + 1) % allCaseStudies.length];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-white/20 relative">
      <KineticGrid spacing={44} radius={260} baseOpacity={0.05} />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/5 bg-[#030303]/80">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/projects"
              className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              All case studies
            </Link>
            <div className="font-mono text-xs text-white/40 uppercase tracking-widest">Case Study</div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          {/* Breadcrumb trail */}
          <nav aria-label="Breadcrumb" className="mb-12">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/40 uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-white/70 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="hover:text-white/70 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/70">
                {caseStudy.title}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl sm:text-6xl font-sans tracking-tight mb-6">{caseStudy.title}</h1>
            <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-sans">{caseStudy.tagline}</p>
          </div>

          <CaseStudyArticle caseStudy={caseStudy} />

          {/* Next case study */}
          <div className="mt-24 pt-10 border-t border-white/10">
            <span className="block font-mono text-xs uppercase tracking-widest text-white/40 mb-3">
              Next case study
            </span>
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-semibold text-white hover:text-white/70 transition-colors"
            >
              {next.title}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </main>

        <footer className="py-12 border-t border-white/5 text-center text-sm text-white/50 font-mono">
          Rishav Roy — Case Studies Archive
        </footer>
      </div>
    </div>
  );
}
