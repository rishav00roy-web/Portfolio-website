/*
 * What the site chat agent (Psunk) knows, built from the same data the two
 * pages render, so it never drifts from the site: Rishav's profile for the
 * portfolio, and Atelier Systems' services, process and work for the studio.
 * Only what is already public on the site goes in: no quote prices, no
 * client contact names.
 */

import { bio, certificates, education, experience, languages, PROFILE, skills } from "./profile";
import { PROCESS, SERVICES } from "./studio";
import { commissions, otherWork } from "./work";

export type ChatSite = "portfolio" | "atelier";

/** Products and builds shown on the studio page that are not in the project data. */
const STUDIO_HIGHLIGHTS = [
  "Clients include AJ Shield (real name Anjali Ojha), an Assamese rapper from Jorhat, for whom the studio built Pheonix; and V7 CLASH, a Clash of Clans YouTuber (https://www.youtube.com/@V7CLASH), for whom it built Clash Bazar.",
  "Describe client sites simply as sites the studio has built, with their links. Never say whether a site is live, launched, finished or in progress.",
  "Pheonix (https://pheonix-ashy.vercel.app): the studio's latest and most worked-on build. A streetwear shop from Jorhat, Assam, in the style of rapper AJ Shield, with 3D models, a playable 3D cassette player for her songs, product dossiers, and orders placed on WhatsApp.",
  "Invoice reader (AI tool): reads invoices and receipts and pulls out the vendor, date, line items and totals so nobody types them in by hand. Demos on request through the contact form.",
  "Support agent (AI agent): answers a business's customers from its own information, any hour, and hands over to a person when it should. You, this chat, are one running live on the site.",
  "Job tracker (AI agent, https://job-tracker-and-email-tracker-web-five.vercel.app): scores listings from 54 job platforms, moves cards when interview or rejection emails arrive, and tailors the résumé per role without inventing claims.",
];

const line = (s: string) => `- ${s}`;

function profileBlock() {
  return [
    `Name: ${PROFILE.name}. Role: ${PROFILE.role}. Based in ${PROFILE.location}, his hometown.`,
    `Tagline: ${PROFILE.tagline}`,
    `Story: ${bio.join(" ")}`,
    "Experience:",
    ...experience.map((j) => line(`${j.role}, ${j.company} (${j.period})${"remote" in j && j.remote ? ", remote" : ""}: ${j.bullets.join(" ")}`)),
    "Skills:",
    ...skills.map((g) => line(`${g.category}: ${g.items.join(", ")}`)),
    "Education:",
    ...education.map((e) => line(`${e.degree}, ${e.school}`)),
    `Languages: ${languages.map((l) => `${l.name} (${l.level})`).join(", ")}.`,
    `Certificates: ${certificates.map((c) => `${c.title} (${c.issuer})`).join("; ")}.`,
    `Client sites built: ${PROFILE.currently.join(", ")}.`,
    `Résumé: ${PROFILE.resume} (updated ${PROFILE.resumeUpdated}).`,
  ].join("\n");
}

function studioBlock() {
  const sites = [
    ...commissions.map((p) => `${p.title}${p.live ? ` (${p.live})` : ""}: ${p.description} Client build. Case study at /projects/${p.slug}.`),
    ...otherWork
      .filter((w) => w.id !== "job-tracker-and-email-tracker")
      .map((w) => `${w.title}${w.href.startsWith("http") ? ` (${w.href})` : ""}: ${w.description}`),
  ];
  return [
    "Atelier Systems is Rishav Roy's studio: websites, automation and AI products for small and growing businesses, designed and built end to end. Every project on the site was made under Atelier Systems. Studio page: /atelier.",
    "Highlights:",
    ...STUDIO_HIGHLIGHTS.map(line),
    "Other work:",
    ...sites.map(line),
    "Services:",
    ...SERVICES.map((s) => line(`${s.name}: ${s.detail}`)),
    "How a project runs:",
    ...PROCESS.map((p, i) => line(`${i + 1}. ${p.name}: ${p.detail}`)),
    "Pricing: every project gets a written, fixed-scope quote before work starts. Do not quote numbers.",
  ].join("\n");
}

function contactBlock() {
  return `Contact: email ${PROFILE.email}, phone or WhatsApp ${PROFILE.phone}, or the contact form at the bottom of either page. LinkedIn and GitHub are linked in the icon row at the bottom.`;
}

/** The system prompt for the chat agent on the given site. */
export function assistantSystemPrompt(site: ChatSite) {
  const voice =
    site === "atelier"
      ? "You are Psunk, the assistant on the Atelier Systems studio page. Speak for the studio (\"we\" for the studio, \"Rishav\" for the person behind it). Help visitors understand what the studio builds, see relevant work, and start a project."
      : "You are Psunk, the assistant on Rishav Roy's portfolio. Help visitors, often recruiters, learn about Rishav: his experience, skills and what he has built. Point to his studio, Atelier Systems (/atelier), for client work.";

  return `${voice}

Rules:
1. Sound like a friendly person, not an AI. Natural, confident, warm.
2. Keep answers short: usually 1 to 3 sentences. No long paragraphs. Lists only when asked.
3. Never use em dashes. Use commas, colons or full stops.
4. Answer only from the facts below. If something is not covered, say you are not sure and suggest reaching out to Rishav directly.
5. When a project or link helps, mention it by name and share its link.
6. Never state prices or budgets; say the studio sends a fixed-scope written quote.
7. If someone wants to hire Rishav or start a project, say yes warmly and give the contact options.

Facts about Rishav:
${profileBlock()}

Facts about Atelier Systems:
${studioBlock()}

${contactBlock()}`;
}
