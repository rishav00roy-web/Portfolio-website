import { categorizedProjects, caseStudiesData, getSlugById, projects } from "./projectsData";

/** The three commercial builds that have full case studies, in display order. */
export const commissions = projects
  .filter((p) => p.id !== 4)
  .map((p) => {
    const cs = caseStudiesData[p.id];
    return {
      id: p.id,
      slug: getSlugById(p.id)!,
      title: p.title,
      description: p.description,
      images: p.images,
      tags: p.tags,
      client: cs.client,
      period: cs.period,
      live: cs.links.find((l) => l.icon === "live")?.url,
      // Rishav is still working on every client site: none is called finished.
      status: "In progress" as "In progress" | "Live",
    };
  });

/** Screenshots for index rows that have one; rows without simply show no preview. */
const PREVIEWS: Record<string, string> = {
  "job-tracker-and-email-tracker": "/assets/projects/job-tracker-board.webp",
  "microgreens-site": "/assets/projects/microgreens-full.webp",
  "gym-crm": "/assets/projects/gym-crm-full.webp",
  "personal-portfolio-v2": "/assets/projects/shots/desktop/personal-portfolio-v2.webp",
  "truwest-company-page": "/assets/projects/truwest-full.png",
  chriskennelsite: "/assets/projects/willchris-full.webp",
  "roy-and-co-website": "/assets/projects/roy-group-full.webp",
};

/** Everything else: tools, showcases and client sites without a case study. */
export const otherWork = categorizedProjects.flatMap((cat) =>
  cat.items
    .filter((item) => !item.caseStudySlug || item.id === "personal-portfolio-v2")
    .map((item) => ({
      id: item.id,
      title: item.title,
      badge: item.badge ?? cat.category,
      description: item.description,
      tags: item.tags.slice(0, 3),
      href: item.liveUrl ?? item.githubUrl ?? "/projects",
      preview: PREVIEWS[item.id],
    })),
);
