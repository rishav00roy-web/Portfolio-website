---
status: done
updated: 2026-07-24
---

# Hero / Landing

> Part of [[Overview]] · Related: [[KineticGrid-Background]] · [[Projects-Showcase]] · [[Command-Palette]] · [[Problems-Solved]]

## What it does

The Hero is a full-screen cinematic landing section that occupies 280vh of scroll height. A sticky inner panel keeps the layout pinned while scroll progress drives a multi-layer parallax: the background photo zooms and fades, and the large typographic name ("Rishav Roy") scales up dramatically before disappearing. A meta-UI overlay ("chrome") shows a tagline, two CTAs, and a 5-column info grid before fading out as the user scrolls.

## Current state

Fully built and styled. Features include:
- Scroll-linked parallax via Framer Motion `useScroll` + `useSpring` (3 independent transform layers)
- Mouse-tilt effect on desktop (disabled on `pointer: coarse` devices and `prefers-reduced-motion`)
- "Currently" label with an animated text rotator cycling through 3 active projects every 3 seconds
- Live commit counter fetched from the GitHub API (`Link` header pagination), with a static fallback of 84
- Resume download link (PDF in `/public`)
- "Available for Hire" badge with pulsing green dot
- Animated mouse-scroll indicator at page bottom
- Grain texture overlay (SVG-based, GPU-composited)
- CTA buttons: "Case Studies" (links to [[Case-Studies]] page) and "Get in Touch" (scrolls to [[Footer-Contact]])
- "Credentials" info cell scrolls to [[Certificates]]
- `prefers-reduced-motion` respected throughout
- Mobile adjustments: `pt-[18vh]` on small screens to prevent overlap with notch/status bar — see [[Problems-Solved]]. To prevent vertical overlap with the bottom text on short screens, the bottom container's padding/margins are compressed (`pb-16`, `mt-8`) rather than reducing the notch padding.

## Known gaps / TODO

- Commit counter silently falls back to 84 if the GitHub API rate-limits; no visual indicator when fallback is active
- The `currentlyItems` list is hardcoded in the component — not pulled from `projectsData.ts`
- No skip-to-content / accessibility landmark for screen readers (the `<h1>` is inside a `pointer-events-none` div)
