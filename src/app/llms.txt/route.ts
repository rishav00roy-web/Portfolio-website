import { categorizedProjects } from "../../lib/projectsData";
import { SITE_URL } from "../../lib/schema";
import { FAQ, PROCESS, SERVICES } from "../../lib/studio";

/**
 * llms.txt — a curated map of this site for AI crawlers and answer engines.
 * Generated from the same categorized project data the pages render, so it cannot go
 * stale the way a hand-maintained static file would.
 * Complies with the llmstxt.org specification.
 */
export const dynamic = "force-static";

export function GET() {
  const categoriesMarkdown = categorizedProjects
    .map((cat) => {
      const items = cat.items
        .map((item) => {
          const url = item.caseStudySlug
            ? `${SITE_URL}/projects/${item.caseStudySlug}`
            : item.liveUrl || item.githubUrl || `${SITE_URL}/projects#${item.id}`;
          return `- [${item.title}](${url}): ${item.description} (Tags: ${item.tags.join(", ")})`;
        })
        .join("\n");
      return `## ${cat.category}\n\n${items}`;
    })
    .join("\n\n");

  const body = `# Rishav Roy

> Operations and automation specialist in Kolkata, India. Six years running HR, procurement, logistics, and compliance alongside building production web software and local-first automation tools. Every system is engineered so a non-technical owner can run operations without ongoing developer dependency.

${categoriesMarkdown}

## Atelier Systems (studio)

> Rishav Roy's studio. It designs and builds websites, automations and AI tools for small and growing businesses. Every project on this site was made under Atelier Systems.

- [Atelier Systems](${SITE_URL}/atelier): Studio page with the work, services, clients and how a project runs.
- Clients include AJ Shield, an Assamese rapper from Jorhat (Pheonix, her streetwear shop: https://pheonix-ashy.vercel.app), and V7 CLASH, a Clash of Clans YouTuber (Clash Bazar, the channel's store).

### Services

${SERVICES.map((s) => `- ${s.name}: ${s.detail}`).join("\n")}

### How a project runs

${PROCESS.map((p, i) => `${i + 1}. ${p.name}: ${p.detail}`).join("\n")}

### Questions

${FAQ.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Profiles & Contact

- [Portfolio Website](${SITE_URL}): Live production portfolio and interactive project showcases.
- [GitHub Profile](https://github.com/rishav00roy-web): Open-source repositories and development history.
- [LinkedIn Profile](https://www.linkedin.com/in/rishav-the-roy/): Professional experience, enterprise operations, and recommendations.

## Technical Capabilities

- Languages & Frameworks: Next.js, React, TypeScript, Tailwind CSS, Python, Vanilla JS.
- Backend & Data: Supabase, PostgreSQL, REST APIs, IndexedDB, Authentication (PKCE OAuth).
- AI & Automation: Claude Code, Gemini, OpenAI Codex, Multi-Agent Workflows, OCR (Tesseract.js).
- Optimization & Reliability: Technical SEO, Answer Engine Optimization (AEO), Schema.org JSON-LD, Core Web Vitals.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
