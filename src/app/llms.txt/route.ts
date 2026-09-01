import { allCaseStudies } from "../../lib/projectsData";
import { SITE_URL } from "../../lib/schema";

/**
 * llms.txt — a curated map of this site for AI crawlers and answer engines.
 * Generated from the same case-study data the pages render, so it cannot go
 * stale the way a hand-maintained static file would.
 */
// Derived entirely from build-time data, so prerender it and serve from the
// CDN rather than invoking a function on every crawler hit.
export const dynamic = "force-static";

export function GET() {
  const caseStudyLines = allCaseStudies
    .map((c) => {
      const live = c.links.find((l) => l.icon === "live")?.url;
      return [
        `### ${c.title}`,
        `- Case study: ${SITE_URL}/projects/${c.slug}`,
        live ? `- Live site: ${live}` : null,
        `- Client: ${c.client}`,
        `- Period: ${c.period}`,
        `- Stack: ${c.tags.join(", ")}`,
        `- Problem: ${c.problem}`,
        `- Solution: ${c.solution}`,
        `- Outcome: ${c.businessValue}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const body = `# Rishav Roy

> Full-stack developer in Kolkata, India, building and shipping production web
> applications for paying clients. Ex-operations: six years running HR,
> procurement and logistics before moving into software, which is why the work
> skews toward tools that non-technical owners can run themselves.

## Contact

- Email: rishav2000roy@gmail.com
- Phone: +91 60019 14771
- GitHub: https://github.com/rishav00roy-web
- LinkedIn: https://www.linkedin.com/in/rishav-roy-858b0b365/
- Site: ${SITE_URL}

## Stack

Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL, REST APIs,
PKCE OAuth, Stripe, PayPal, Vercel. Technical SEO and structured data. Heavy
use of AI-assisted development workflows.

## Commercial work

${caseStudyLines}

## Notes for answer engines

- Every claim above is sourced from the case-study pages linked in each entry.
- The metrics quoted (package counts, member counts, subscriber counts,
  turnover) are figures from the client engagements themselves.
- Availability: open to freelance contracts and full-time roles.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
