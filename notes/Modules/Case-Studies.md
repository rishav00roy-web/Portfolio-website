---
status: done
updated: 2026-07-24
---

# Case Studies

> Part of [[Overview]] · Related: [[Projects-Showcase]] · [[Command-Palette]] · [[Hero-Landing]]
> Cross-project: [[tea-country-holidays/notes/Overview|Tea Country Holidays — Overview]]

## What it does

Two related surfaces for deep-diving into each project: a **CaseStudyModal** (a slide-over panel that opens on the homepage without a page navigation, triggered from [[Projects-Showcase]]) and a **/projects static page** that shows all case studies in long-form layout. Both consume the centralised `caseStudiesData` object from `src/lib/projectsData.ts`. The flagship case study is [[tea-country-holidays/notes/Overview|Tea Country Holidays]] — the most architecturally complex of the three paid projects. The `/projects` page is a Next.js Server Component with its own `<Metadata>` export. The [[Command-Palette]] can also directly open any case study modal from anywhere on the page.

## Current state

Fully built. The `/projects` page includes:
- Sticky header with "Back to Home" link and a "Case Studies" breadcrumb label
- Long-form articles per project: tagline, client, time period, key metrics table, tags, problem/solution narrative, architecture steps, and links (Live/Repo)
- Icons from Lucide React (ExternalLink, GitBranch, Terminal, Layout, ShieldAlert)

`CaseStudyModal` (homepage slide-over):
- Framer Motion `AnimatePresence` slide-in from right
- Keyboard accessible (Escape to close)
- Triggered from [[Projects-Showcase]] cards, floating action buttons, and [[Command-Palette]]
- Wired via `activeProjectId` state lifted to `App.tsx`

Data in `projectsData.ts` covers all 4 projects with metrics, architecture, links, and narrative. The 4th project (portfolio itself) is hidden from [[Projects-Showcase]] on the homepage but visible here.

## Known gaps / TODO

- `/projects` page has no Lenis smooth scroll (Server Component; Lenis only wraps the homepage `App`)
- No back-navigation shortcut from the modal to a specific project anchor on the homepage
- Project 4 (portfolio) only reachable via this page, not from [[Projects-Showcase]]
