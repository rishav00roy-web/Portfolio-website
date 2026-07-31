---
status: done
updated: 2026-07-24
---

# Certificates

> Part of [[Overview]] · Related: [[About]] · [[Footer-Contact]] · [[Hero-Landing]] · [[Problems-Solved]]

## What it does

Displays 2 Coursera course completion certificates in a responsive grid. On desktop (≥ `sm` breakpoint), each certificate is shown inline in an `<iframe>` rendering the PDF directly. On mobile, the iframe is hidden and replaced with a "View PDF" button. The section has `id="certificates"` so the [[Hero-Landing]] "Credentials" info cell can scroll directly to it via anchor link.

## Current state

Fully built. Features:
- 2 hardcoded certificate entries (`Coursera-Certificate-1.pdf`, `Coursera-Certificate-2.pdf`) in `/public/certificates/`
- iframe with `#view=FitH&toolbar=0&navpanes=0` PDF parameters for a clean embed
- `hidden sm:block` / `sm:hidden` toggle handles mobile vs desktop rendering
- Mobile iframe fix landed after the broken Android PDF iframe bug — see [[Problems-Solved]]
- Framer Motion `whileInView` fade+slide-up entrance animation, staggered between cards
- Responsive grid: 1 col mobile, 2 cols md, 3 cols xl (only 2 entries currently fill it)

## Known gaps / TODO

- Certificate titles both say "Coursera Credential" — no individual course names shown
- Grid declares 3 columns on xl but only 2 entries exist (empty slot)
- No certificate metadata shown (issue date, course name, credential ID)
- iframe PDF embed may not render consistently across all browsers
