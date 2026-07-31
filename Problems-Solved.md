# Problems Solved — Portfolio-website

> Connected to: [[Overview]] · [[Hero-Landing]] · [[Projects-Showcase]] · [[About]] · [[Certificates]] · [[Footer-Contact]] · [[KineticGrid-Background]]
> Companion doc (Tea Country): [[2026-07-24-project-history-summary|Tea Country — Project History & Decisions]]

Bug fixes extracted from git commit history. Only commits whose messages explicitly indicate a broken behaviour being repaired are included. Feature work, styling tweaks, and performance optimisations are excluded.

---

### Sora font not rendering at weight 900 (font-black)
Symptom: Headings across [[Hero-Landing]], [[About]], and [[Projects-Showcase]] that used Tailwind's `font-black` (900) class failed to render in the Sora typeface — the browser fell back to a different font or rendered the weight incorrectly.
Fix: Replaced `font-black` (900) with `font-extrabold` (800) site-wide across `About.tsx` and `Projects.tsx`, matching the weights actually present in the loaded Sora font files.
Tags: #portfolio-website #tailwindcss #fonts

### Sora font rendering failure due to wrong CSS variable mapping
Symptom: Even after fixing the weight, Sora still did not apply correctly in header elements because `font-display` was mapped to the wrong CSS font-family variable — it resolved to a fallback sans-serif rather than Sora. Affected [[Hero-Landing]], [[About]], [[Footer-Contact]].
Fix: Changed `font-display` to `font-sans` in header elements across `Hero.tsx`, `About.tsx`, and `Footer.tsx` so the class resolved to the correct Sora font-family name.
Tags: #portfolio-website #tailwindcss #fonts

### Font loading bug from incorrect theme variable mapping (Fontsource)
Symptom: Custom fonts (Kenoky, Coffekan) failed to load or apply after the project was migrated to Next.js — theme CSS variables pointed at wrong family names, and leftover `main.tsx` / `tailwind.config.js` files from a Vite prototype caused conflicts site-wide.
Fix: Mapped Tailwind theme vars directly to the Fontsource font-family names in `globals.css`, and deleted the stale `main.tsx` and `tailwind.config.js` files.
Tags: #portfolio-website #nextjs #fonts #tailwindcss

### White lines visible in Hero (SVG border artefacts, hooks in JSX)
Symptom: Visible white hairlines appeared in [[Hero-Landing]] from SVG border rendering. React hooks were also being called inside JSX (illegal). Dead CSS bloated `globals.css`. The animated background (predecessor to [[KineticGrid-Background]]) had 6,000 SVG rects causing scroll lag.
Fix: Removed the SVG border, moved hooks to top-level scope, deleted 130+ lines of dead CSS from `globals.css`, patched `Background.tsx`, reduced grid from 6,000 to 1,500 rects.
Tags: #portfolio-website #react #css #performance

### White progress bar and ghost text visible in Hero
Symptom: A white progress bar track, a "Scroll" text label, and placeholder "Kolkata/India" ghost text were all unintentionally visible in [[Hero-Landing]] after a previous overhaul left remnant elements.
Fix: Removed the white progress bar, the Scroll text label, and the ghost text from `Hero.tsx`.
Tags: #portfolio-website #react #css

### White lines persisting after SVG fix (progress track blend mode)
Symptom: After the SVG border fix, white lines were still visible in [[Hero-Landing]] — traced to the progress track using a blend mode that rendered as a solid white line against the dark background.
Fix: Changed blend mode to `mix-blend-overlay` on the progress track and drifting rule elements.
Tags: #portfolio-website #css

### Social icon tooltips not showing on touchscreen Windows laptops
Symptom: Social icon tooltips in [[Footer-Contact]] did not appear on Windows laptops with a touchscreen, because the pointer was classified as `coarse` and hover CSS did not fire.
Fix: Updated `SocialIcon.tsx` tooltip display logic to account for hybrid pointer (touch + mouse) devices.
Tags: #portfolio-website #css #accessibility

### Custom cursor stuck at top-left on initial page load
Symptom: The custom cursor component rendered at coordinate (0, 0) on initial load before any mouse movement, making a visible dot appear in the top-left corner. Affected overall site feel.
Fix: Added an initial-state guard in `CustomCursor.tsx` so the cursor remains hidden until the first `mousemove` event fires with a real position.
Tags: #portfolio-website #react

### SocialIcon emblem invisible on hover (missing color + glow)
Symptom: When hovering over a social icon button in [[Footer-Contact]], the inner emblem/icon had no colour for the hover state and no drop-shadow glow — it was invisible against the dark card background.
Fix: Added explicit `white` colour and a brand-specific `drop-shadow` filter to the emblem element in the hover CSS.
Tags: #portfolio-website #css

### Kenoky and Coffekan font-face mappings not applying for bold/extrabold weights
Symptom: Custom font faces for Kenoky (display, used in [[Projects-Showcase]] project numbers) and Coffekan did not apply when `font-bold` or `font-extrabold` utilities were used — `@font-face` mappings had conflicting/duplicate descriptors preventing correct weight resolution.
Fix: Removed duplicate/conflicting `@font-face` descriptor lines from `globals.css`.
Tags: #portfolio-website #css #fonts

### Hero mobile overlap and broken Android PDF iframe in Certificates
Symptom: On mobile, [[Hero-Landing]] content overlapped the device notch/status bar. Separately, [[Certificates]] used an `<iframe>` on Android mobile where Chrome does not support inline PDF iframes — the certificate was invisible.
Fix: Added `pt-[18vh]` top padding to Hero on small screens. In `Certificates.tsx`, replaced the mobile iframe with `hidden sm:block` on the iframe and a `sm:hidden` "View PDF" link fallback.
Tags: #portfolio-website #mobile #css

### Mobile responsiveness broken across multiple sections
Symptom: After the cinematic redesign, [[Hero-Landing]], [[Projects-Showcase]], [[Certificates]], and [[Footer-Contact]] all had layout issues on small screens — overflows, cut-off text, incorrect padding.
Fix: Added targeted responsive CSS to `globals.css` and adjusted Tailwind classes across `Certificates.tsx`, `Footer.tsx`, `Hero.tsx`, and `Projects.tsx`.
Tags: #portfolio-website #mobile #css #tailwindcss
