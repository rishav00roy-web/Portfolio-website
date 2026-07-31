---
status: done
updated: 2026-07-24
---

# KineticGrid Background

> Part of [[Overview]] · Related: [[Hero-Landing]] · [[Projects-Showcase]] · [[Problems-Solved]]

## What it does

`KineticGrid` is an animated background layer that sits between [[Hero-Landing]] and [[Projects-Showcase]], providing a visual transition interstitial. It is purely decorative — part of the ambient design system rather than a content section. As the user exits the Hero's parallax scroll zone and enters the Projects carousel, the KineticGrid creates a sense of depth and motion continuity.

## Current state

Fully built as a standalone component (`KineticGrid.tsx`, 9.8 KB). Mounted in `App.tsx` between `<Hero />` and the `<Projects />` content block. Added in commit `a68c845` alongside the scroll indicator centering and parallax lag fix. Earlier iterations used a full-viewport `InteractiveGridPattern` (removed, commit `789db7d`) — current `KineticGrid` is a leaner replacement. An even earlier version had 6,000 SVG rects that caused scroll lag; reduced to 1,500 — see [[Problems-Solved]].

## Known gaps / TODO

- No documented API or props — behaviour entirely internal
- Performance not re-audited since the current `KineticGrid` replaced the old pattern
- Does not render on the `/projects` case studies page ([[Case-Studies]]) — homepage `App` only
