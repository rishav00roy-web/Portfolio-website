---
status: done
updated: 2026-07-24
---

# About

> Part of [[Overview]] · Related: [[Footer-Contact]] · [[Certificates]] · [[Problems-Solved]]

## What it does

The About section presents Rishav Roy's skills, professional experience, and a personal bio. It sits below [[Projects-Showcase]] in the scroll order and contains: a skills grid (5 categories), an experience timeline, and a profile photo collage with 3D parallax. Framer Motion `whileInView` animations stagger skill pill entries and timeline items into view. From here, the user is expected to continue scrolling to [[Certificates]] and then [[Footer-Contact]].

## Current state

Fully built and styled. Contains:
- **Skills grid**: 5 categories — Languages & Frameworks, Backend & Data, AI-Orchestrated Development, SEO & Performance, Tools & Platforms — each with pill-style tags animated in with `staggerChildren`
- **Experience**: Timeline of professional work entries (content hardcoded in component, not in a separate data file)
- **Profile collage**: 3-image layout with 3D parallax hover (`rotateX`/`rotateY` via mouse tracking, disabled on touch/coarse pointer)
- Font-weight fixed: headers use `font-extrabold` (800) — see [[Problems-Solved]] for the Sora 900 rendering bug
- Fully responsive; font sizes scale from mobile to desktop

## Known gaps / TODO

- Experience and bio text is hardcoded inside the component; no separate data file (unlike [[Projects-Showcase]])
- No dedicated "contact me" CTA inside About — user must scroll to [[Footer-Contact]]
- Profile photo paths not confirmed as up-to-date (component reads from `/public/assets/`)
