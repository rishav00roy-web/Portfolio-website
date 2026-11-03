import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import SiteHeader from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/Contact";
import CaseStudyArticle from "../../../components/CaseStudyArticle";
import { allCaseStudies, getCaseStudyBySlug } from "../../../lib/projectsData";
import { caseStudySchema, breadcrumbSchema, jsonLd } from "../../../lib/schema";

function clip(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "") + "…";
}

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

  const title = `${caseStudy.title} Case Study`;
  // Taglines alone run ~45 characters; pad with the problem statement so the
  // snippet uses the space search results give it (~155 characters).
  const description = clip(`${caseStudy.tagline}. ${caseStudy.problem}`, 155);

  return {
    title: { absolute: `${title} | Rishav Roy` },
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `/projects/${slug}`,
      siteName: "Rishav Roy Portfolio",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
    <div className="min-h-screen bg-background text-foreground relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          caseStudySchema(caseStudy),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/projects" },
            { name: caseStudy.title, path: `/projects/${caseStudy.slug}` },
          ]),
        ])}
      />

      <div className="relative z-10">
        <SiteHeader />
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
        <SiteFooter />
      </div>
    </div>
  );
}
