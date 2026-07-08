# Test Infrastructure Documentation

## Test Philosophy
Our E2E testing uses an **opaque-box** testing model. We treat the application as a black box and interact with it exactly like a real user would through the browser. 
- **Non-Interactive Validation**: We do not mock or call internal component functions directly. Instead, we use Playwright to simulate viewports, mouse movements, scrolling, and hover events, and inspect the rendered DOM, styles, and dimensions.
- **Robust Locators**: We avoid brittle CSS selectors where possible and prefer accessible text or user-visible text (e.g. `page.locator('section').filter({ hasText: /About/i })`).
- **Resilience**: The testing harness uses a resilient navigation wrapper to handle transient startup latency of the Next.js dev server, retrying on network failure.

## Feature Inventory
The E2E suite tests the following key features across 4 tiers of coverage:
1. **Typography & Styles**:
   - `Big Shoulders Display` for headlines.
   - `JetBrains Mono` for tags and timestamps.
   - `Sora` for body paragraphs.
   - Brutalist background color (#030303).
   - Sparse amber (#F5B301) accents.
2. **Layout Sections**:
   - Presence of Hero, Projects, About, and Footer.
   - Infinite Marquee with amber separating dots.
3. **Responsive Viewports**:
   - Mobile (375x667), Tablet (768x1024), and Desktop (1280x800).
4. **Smooth Scrolling**:
   - Lenis scroll behavior and scrollable page height.
5. **Interactive Project Rows**:
   - Amber text color transition on hover.
   - Follow-cursor preview image container visibility and Y-coordinate tracking.
6. **Footer Contacts**:
   - Email: `rishav2000roy@gmail.com`
   - Phone: `+91 60019 14771`
   - Social: LinkedIn and Instagram.

## Test Architecture
- **Runner**: Playwright Test (`@playwright/test`)
- **Projects**: Microsoft Edge (targeting local installation to avoid external browser downloads in `CODE_ONLY` mode).
- **Web Server Hook**: Automatically launches Next.js dev server on port `3005` with `npm run dev -- -p 3005`.
- **Resilience Layer**: `gotoResilient` helper function wrapping `page.goto` to auto-retry on transient dev server compilation timeouts.
- **Timing and Animation Protection**: Uses Playwright's auto-retry assertions (like `expect().toHaveCSS()`) to verify color transitions, allowing animations (300ms transition duration) to resolve without artificial wait timeouts.

## Real-World Application Scenarios (Tier 4)
The Tier 4 test simulates a user navigating the entire personal portfolio:
1. Opens the homepage in a desktop viewport.
2. Scrolls down to view the work and about sections.
3. Hovers over each of the three project rows:
   - "Tea Country Holidays"
   - "ClashVault"
   - "IQ Iron Fitness — Gym CRM"
   and verifies that the preview image thumbnail becomes visible.
4. Reads the "About" section to verify educational details (specifically looking for "BCA" and "Sem" to verify they are in Semester II) and work experience.
5. Checks the "Additional Work" section links.
6. Verifies that all contacts in the footer are present and match exactly:
   - Email: `rishav2000roy@gmail.com`
   - Phone: `+91 60019 14771`
   - LinkedIn: `https://www.linkedin.com/in/rishav-roy-858b0b365/`
   - Instagram: `https://instagram.com/justbeingpsunk_`

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: 100% of major layout components and typography styles must be checked.
- **Tier 2 (Boundary & Corner Cases)**: 100% of viewport variations and interactive hovers must be verified.
- **Tier 3 (Cross-Feature)**: Scroll + Hover and coordinate tracking behavior must be verified.
- **Tier 4 (Real-world user flow)**: The end-to-end integration check must pass successfully.
- **Passing Threshold**: 100% of defined test cases must pass on every run.
