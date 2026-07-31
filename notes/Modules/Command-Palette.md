---
status: done
updated: 2026-07-24
---

# Command Palette

> Part of [[Overview]] · Related: [[Case-Studies]] · [[Hero-Landing]] · [[Projects-Showcase]] · [[Footer-Contact]] · [[About]] · [[Certificates]]

## What it does

A keyboard-driven command palette (Cmd+K / Ctrl+K) that floats over the entire page and lets the user navigate to any section or trigger any key action without scrolling. It connects directly to: [[Case-Studies]] modal (can open any project case study), [[Hero-Landing]] resume download, [[Footer-Contact]] email/phone shortcuts, [[About]] and [[Certificates]] scroll anchors, and the `/projects` page link. Also provides theme toggle (dark/light) and reading mode.

## Current state

Fully built (`CommandMenu.tsx`, 14 KB). Features:
- Opens on `Cmd+K` / `Ctrl+K`, closes on Escape or backdrop click
- Animated with Framer Motion `AnimatePresence` (scale + opacity enter/exit)
- Keyboard navigation: arrow keys cycle items, Enter activates; selected index auto-scrolls into view
- Search filters commands by label in real time
- Theme toggle persists to `localStorage` and writes `data-theme` to `<html>`
- Reading mode toggle
- Wired to: [[Case-Studies]] modal open (via `onOpenCaseStudy` prop), Next.js router, `window.open`, and `document.getElementById` scroll targets for [[About]], [[Projects-Showcase]], [[Certificates]], [[Footer-Contact]]
- All 3 paid projects openable as case studies directly from the palette

## Known gaps / TODO

- "Reading mode" CSS effect not clearly documented
- `[data-theme="light"]` overrides in `globals.css` may be incomplete — light mode could have unstyled areas
- Command list is hardcoded: adding a project requires updating both `projectsData.ts` AND this component
