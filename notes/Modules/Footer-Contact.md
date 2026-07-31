---
status: done
updated: 2026-07-24
---

# Footer / Contact

> Part of [[Overview]] · Related: [[About]] · [[Certificates]] · [[Command-Palette]] · [[Problems-Solved]]

## What it does

The footer is the site's contact hub — the final section of the scroll flow after [[About]] and [[Certificates]]. It contains a `ContactForm`, social media icon buttons with 3D hover animations, direct phone and email links, a `PerformanceMetrics` widget, a "Back to top" button (Lenis-powered), a resume download link, and copyright text. The [[Command-Palette]] surface also exposes the email and phone links, effectively duplicating the most important contact affordances without requiring a scroll to the bottom.

## Current state

Fully built. Includes:
- `ContactForm`: functional form component with submission logic in `ContactForm.tsx`
- `SocialIcon` buttons for: GitHub, LinkedIn, Instagram, WhatsApp, Email — each with a 3D rotating card hover animation and brand-coloured drop-shadow glow
- Tooltip system on social icons: works on both mouse-hover desktop and touchscreen Windows laptops — see [[Problems-Solved]] for the tooltip bug fix
- Phone number and Gmail address displayed as clickable `tel:` and `mailto:` links
- `PerformanceMetrics` component (web vitals / build metrics display)
- "Back to top" button uses `useLenis()` hook to animate scroll to top
- Copyright text 2025–2026
- Mobile layout fixed (padding and stacking) — see [[Problems-Solved]]

## Known gaps / TODO

- `ContactForm` submission destination not confirmed — no backend serverless function visible in codebase; may be UI-only or use an undocumented endpoint
- No clear success/failure feedback state (needs verification)
- `PerformanceMetrics` widget values not confirmed as live/real-time vs hardcoded
