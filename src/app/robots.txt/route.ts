import { SITE_URL } from "@/lib/schema";

/*
 * robots.txt, written by hand so it can carry Content-Signal lines (a draft
 * standard the Next.js robots helper cannot emit). Rishav's policy, 2026-11-06:
 * search engines, AI answer engines and AI training are all welcome, so the
 * studio can be found and named when someone asks an assistant for a website
 * or app developer in Jorhat or Assam. Only the API stays closed.
 *
 * AI crawlers are named in their own group so the policy is deliberate per
 * purpose: search/citation bots, bots fetching for a user, and training bots.
 */
export const dynamic = "force-static";

const SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

const AI_AGENTS = [
  // Search and citation in AI answers
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  // Fetching a page because a person asked
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  // Model training
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export function GET() {
  const body = [
    ...AI_AGENTS.map((ua) => `User-Agent: ${ua}`),
    "Allow: /",
    "Disallow: /api/",
    SIGNAL,
    "",
    "User-Agent: *",
    "Allow: /",
    "Disallow: /api/",
    SIGNAL,
    "",
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
