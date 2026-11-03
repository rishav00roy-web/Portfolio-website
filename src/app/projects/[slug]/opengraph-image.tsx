import { allCaseStudies, getCaseStudyBySlug } from "@/lib/projectsData";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Case study by Rishav Roy";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return allCaseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  return renderOgImage({
    eyebrow: "Case study",
    title: caseStudy?.title ?? "Case study",
    subtitle: caseStudy?.tagline ?? "Rishav Roy",
  });
}
