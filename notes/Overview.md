# Portfolio-website — Overview

> See also: [[Hero-Landing]] · [[Projects-Showcase]] · [[Case-Studies]] · [[About]] · [[Certificates]] · [[Footer-Contact]] · [[KineticGrid-Background]] · [[Command-Palette]] · [[Problems-Solved]]

## Stack

- **Framework**: Next.js 16.2.10 (App Router), React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`), with custom font faces (Kenoky display, Coffekan serif) loaded via `@font-face` in globals.css
- **Animation**: Framer Motion 12.42.2 (scroll-linked transforms, spring physics, AnimatePresence)
- **Smooth scroll**: Lenis 1.3.25 (via `ReactLenis` wrapper; disabled when `prefers-reduced-motion` is set)
- **Icons**: Lucide React 1.23.0
- **Animation utilities**: tailwindcss-animate 1.0.7
- **Testing**: Playwright 1.61.1 (E2E)
- **Linting**: ESLint 9 with eslint-config-next 16.2.10
- **Backend/Data**: No dedicated backend — project data is co-located in `src/lib/projectsData.ts`; GitHub commit count fetched at runtime from the GitHub API

## What this project is

byrishav.com is the personal portfolio site of Rishav Roy, a web developer based in Kolkata, India. It showcases paid commercial projects, skills, work history, and Coursera certifications, and serves as the primary first impression for potential clients and employers. The site is a single scrolling page with a dedicated `/projects` route for detailed case studies, and features a cinematic, animation-heavy design with scroll-linked parallax, horizontal project scrolling, and a command-palette (Cmd/Ctrl+K).

## Current status

**Finished and live:**
- [[Hero-Landing]] — scroll-linked parallax zoom, mouse-tilt, "Currently" rotator, commit counter, resume download
- [[Projects-Showcase]] — horizontal scroll carousel, 3 paid projects (including IQ Iron Gym Online CRM and Clash Bazar), animated 3-image collage, live-status badges
- [[Extra-Projects]] — tabbed interactive secondary project section with smooth Framer Motion indicator, detailing offline Gym CRM & Portfolio V2
- [[Case-Studies]] — slide-over modal on homepage + full `/projects` static page
- [[About]] — skills grid (5 categories), experience timeline, profile photo collage
- [[Certificates]] — 2 Coursera PDFs (iframe on desktop, link on mobile)
- [[Footer-Contact]] — contact form, social icons, phone/email, performance metrics widget
- [[KineticGrid-Background]] — animated decorative interstitial between Hero and Projects
- [[Command-Palette]] — Cmd/Ctrl+K palette with search, theme toggle, reading mode, shortcuts
- Mobile responsiveness fixes across all sections
- Font loading preloader to prevent FOUT

**In progress:**
- Clash Bazar project (frontend live on Vercel; OAuth and database API integrations in progress)

**Missing / not yet built:**
- No blog section
- No dedicated Contact page (contact lives in [[Footer-Contact]])
- No dark/light theme persistence beyond the [[Command-Palette]] toggle

## Deploy target

Deployed on **Vercel**. No `vercel.json` config file is present; deployment relies on Vercel's default Next.js detection. The live URL for project 1 (Tea Country Holidays) also uses Vercel (`tea-country-holidays.vercel.app`). README references Vercel as the deploy target.
