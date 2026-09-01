# Test Infrastructure Documentation

## Test Philosophy
Our E2E testing uses an **opaque-box** testing model. We treat the application as a black box and interact with it exactly like a real user would through the browser.
- **Non-Interactive Validation**: We do not mock or call internal component functions directly. Instead, we use Playwright to simulate viewports and scrolling, and inspect the rendered DOM, computed styles, and dimensions.
- **Robust Locators**: We avoid brittle CSS selectors where possible and prefer accessible text or user-visible text (e.g. `page.locator('section').filter({ hasText: 'Paid Projects' })`).
- **Resilience**: The testing harness uses a resilient navigation wrapper (`gotoResilient`) to handle transient startup latency, retrying once on navigation failure.

## Feature Inventory
The E2E suite covers the following, across a smoke test and 4 tiers:

1. **Typography & Styles** (verified via computed `font-family`, not by reading CSS):
   - `Kenoky` for the display headline (`h1`), loaded via `@font-face` in `globals.css`.
   - `Sora` for body copy, loaded via `next/font/google`.
   - `JetBrains Mono` for small uppercase tags and labels, loaded via `next/font/google`.
   - Background color `#030303` — asserted as `rgb(3, 3, 3)` on `body`.
   - Sparse amber `#F5B301`: asserted as *absent* as a background fill on `body` and on every `section`, `footer`, and `main`.
2. **Layout Sections**:
   - Presence of the Hero section, the "Paid Projects" section, the About section, and the footer.
3. **Responsive Viewports**:
   - Mobile (375x667), Tablet (768x1024), and Desktop (1280x800) — `h1` and `footer` remain visible in each.
4. **Scrolling**:
   - `body` is not scroll-locked (`overflow-y` is not `hidden`), the document is taller than the viewport, and a programmatic scroll moves `scrollY`.
5. **Project Cards**:
   - All three project titles present: "Tea Country Holidays", "IQ Iron Fitness", "Clash Bazar".
   - At least 3 rounded card containers and at least 3 images render in the Projects section.
6. **Footer Contacts** (exact `href` matches):
   - Email: `mailto:rishav2000roy@gmail.com`
   - LinkedIn: `https://www.linkedin.com/in/rishav-roy-858b0b365/`
   - Instagram: `https://instagram.com/justbeingpsunk_`

## Test Architecture
- **Runner**: Playwright Test (`@playwright/test`), config in `playwright.config.ts`.
- **Projects**: Microsoft Edge only, via `channel: 'msedge'` (targets the local Edge installation to avoid downloading browsers).
- **Web Server Hook**: Playwright runs `npx next build && npx next start -p 3005` and waits on `http://localhost:3005`. This tests a **production build**, not the dev server. `reuseExistingServer` is enabled outside CI.
- **Execution**: `workers: 1`, `fullyParallel: false` — tests run serially. `retries: 2` on CI, `0` locally. `reporter: 'line'`. `trace: 'on-first-retry'`.
- **Resilience Layer**: `gotoResilient` wraps `page.goto` with a 15s timeout and one retry after a 2s pause.
- **Timing and Animation Protection**: Uses Playwright's auto-retrying assertions (`expect(locator).toBeVisible()`, `toContainText()`, `toHaveAttribute()`) so entrance animations resolve without artificial waits. Computed-style checks read through `page.evaluate` after navigation settles.

## Real-World Application Scenario (Tier 4)
The Tier 4 test simulates a user navigating the portfolio at 1280x800:
1. Opens the homepage and scrolls down.
2. Verifies all three project titles appear in the "Paid Projects" section.
3. Reads the About section, confirming the education details match (`BCA` and `Sem`, i.e. Semester II).
4. Scrolls the footer into view and verifies the email, LinkedIn, and Instagram links match exactly.

## Not Covered
Deliberately outside the current suite — do not assume these are verified:
- Hover interactions and hover-driven color transitions on project cards.
- Cursor-following preview thumbnails (removed from the design).
- The horizontal marquee banner (removed from the design).
- The footer phone number (`+91 60019 14771`) — present in the UI, not asserted.
- The command palette (Ctrl/Cmd+K), case study modal, chatbot, contact form, and the `/projects` route.

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: 100% of the typography, color, and layout checks listed above must pass.
- **Tier 2 (Boundary & Corner Cases)**: 100% of viewport variations and scroll checks must pass.
- **Tier 3 (Cross-Feature)**: Project card and image rendering must be verified together.
- **Tier 4 (Real-world user flow)**: The end-to-end integration check must pass.
- **Passing Threshold**: 100% of defined test cases must pass on every run.
