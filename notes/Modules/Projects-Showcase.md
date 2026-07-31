---
status: done
updated: 2026-07-24
---

# Projects Showcase (Paid Projects)

> Part of [[Overview]] · Related: [[Case-Studies]] · [[Hero-Landing]] · [[KineticGrid-Background]] · [[Problems-Solved]]
> Cross-project: [[tea-country-holidays/notes/Overview|Tea Country Holidays — Overview]]

## What it does

A horizontal-scrolling carousel of paid commercial projects, driven by vertical scroll. As the user scrolls down, the viewport pans left through a row of full-screen project cards. Each card shows a 3-image parallax collage (left/center/right screenshots with independent rotate + translate transforms), a project number, title, description, tech tags, a live-status badge, and a floating "open case study" button. Clicking the title or the button opens the [[Case-Studies]] modal.

## Current state

Fully built and styled. Features include:
- Sticky horizontal track using `position: sticky` + Framer Motion `x` transform driven by scroll progress
- 3-card parallax collage per project (left/right cards counter-translate and rotate on scroll; center card scales)
- `prefers-reduced-motion` fallback: collage cards rendered as static divs with no transforms
- Live-status badge: project 1 ([[tea-country-holidays/notes/Overview|Tea Country Holidays]]) pings its Vercel URL via `fetch` with `no-cors`; project 2 shows "Repository"; project 3 shows "In Progress"
- Project-specific accent colours (amber for #1, emerald for #2, violet for #3)
- Portfolio itself (id: 4) filtered out of homepage carousel — visible only on the [[Case-Studies]] page
- Section labelled "Paid Projects" (renamed from earlier "Selected Works")
- [[Case-Studies]] modal wired up — triggered by card click or floating ArrowUpRight button
- Project data centralised in `src/lib/projectsData.ts` (not inline)
- Mobile: cards stack correctly; image collage scales flexibly on small screens (`flex-1 min-h-[25vh]`) which prevents tall text blocks from pushing the collage out of bounds on tall/narrow screens. The tags, text block, and FAB now co-exist cleanly without overlapping, and the previous hacky padding solutions (`pb-24` and `pr-16`) have been removed.

## Known gaps / TODO

- The live-status `fetch` uses `no-cors` mode — badge can show "Live" even if the site returns an error page
- No loading skeleton while status badge resolves
- Clash Bazar (project 3) is marked "In Progress" (frontend is live on Vercel but OAuth and backend API integrations are pending)
- Only 3 projects shown on homepage; fourth is intentionally hidden (visible via [[Case-Studies]])
