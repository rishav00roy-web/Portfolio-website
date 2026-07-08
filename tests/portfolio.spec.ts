import { test, expect, Page } from '@playwright/test';

async function gotoResilient(page: Page, url: string = '/') {
  try {
    await page.goto(url, { timeout: 15000 });
  } catch {
    await page.waitForTimeout(2000);
    await page.goto(url, { timeout: 15000 });
  }
}

test.describe('Portfolio Website - Tier 1: Feature Coverage', () => {
  test.beforeEach(async ({ page }) => {
    await gotoResilient(page);
  });

  test('Typography and font stack checks', async ({ page }) => {
    // R1: "Sora" for body copy paragraphs
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    expect(bodyFont).toMatch(/Sora/i);

    // R1: "Sora" for headlines and names
    const headingFont = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? window.getComputedStyle(h1).fontFamily : '';
    });
    expect(headingFont).toMatch(/Sora/i);

    // R1: "JetBrains Mono" for all small uppercase tags, labels, and timestamps
    const monoFont = await page.evaluate(() => {
      const monoEl = document.querySelector('.font-mono, [class*="font-mono"]');
      return monoEl ? window.getComputedStyle(monoEl).fontFamily : '';
    });
    expect(monoFont).toMatch(/JetBrains Mono/i);
  });

  test('Background color is dark #030303', async ({ page }) => {
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    // #030303 translates to rgb(3, 3, 3) in browser computed style
    expect(bgColor).toBe('rgb(3, 3, 3)');
  });

  test('Amber accent #F5B301 sparse usage', async ({ page }) => {
    // Assert that the body background is not amber
    const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bodyBg).not.toBe('rgb(245, 179, 1)');

    // Assert that layout sections do not have amber background
    const sectionsBg = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('section, footer, main'));
      return elements.map(el => window.getComputedStyle(el).backgroundColor);
    });
    for (const bg of sectionsBg) {
      expect(bg).not.toBe('rgb(245, 179, 1)');
    }
  });

  test('Presence of layout components', async ({ page }) => {
    // Hero Section
    await expect(page.locator('section').filter({ hasText: 'Rishav' })).toBeVisible();

    // Marquee Component
    await expect(page.locator('.animate-marquee, [class*="marquee"]')).toBeVisible();

    // Projects Section
    await expect(page.locator('section').filter({ hasText: 'Selected Work' })).toBeVisible();

    // Footer Component
    await expect(page.locator('footer')).toBeVisible();

    // Note: Dedicated About Section is expected to be verified in Tier 4
  });

  test('Marquee looping banner contains dot and correct structure', async ({ page }) => {
    const marquee = page.locator('.animate-marquee, [class*="marquee"]').first();
    await expect(marquee).toBeVisible();

    // The marquee dot should be present and styled with amber color
    // We filter for a span whose text content is exactly "●" to target the inner span
    const dot = marquee.locator('span').filter({ hasText: /^●$/ }).first();
    await expect(dot).toBeVisible();

    const dotColor = await dot.evaluate(el => window.getComputedStyle(el).color);
    // Allow slight browser color space conversion differences (e.g., green channel being 179-182, blue channel being 0-10)
    expect(dotColor).toMatch(/rgb\(245,\s*(179|180|181|182),\s*\d+\)/);
  });
});

test.describe('Portfolio Website - Tier 2: Boundary & Corner Cases', () => {
  // Run checks on different viewport dimensions
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 800 },
  ];

  for (const vp of viewports) {
    test(`Layout works on ${vp.name} viewport (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await gotoResilient(page);

      // Check key sections remain visible/accessible
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }

  test('Scrollbar/Lenis smooth scrolling checks', async ({ page }) => {
    await gotoResilient(page);

    // Check that body overflow-y is not hidden to avoid scroll-locking
    const overflowY = await page.evaluate(() => window.getComputedStyle(document.body).overflowY);
    expect(overflowY).not.toBe('hidden');

    // Check that document height is larger than viewport height so scrolling is possible
    const isScrollable = await page.evaluate(() => {
      return document.documentElement.scrollHeight > window.innerHeight;
    });
    expect(isScrollable).toBe(true);

    // Perform a scroll action
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(300); // Wait for scroll animation easing
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('Hover styles: project titles change to amber on hover', async ({ page }) => {
    await gotoResilient(page);
    const projectsSection = page.locator('section').filter({ hasText: 'Selected Work' });
    const projectRow = projectsSection.locator('a').first();
    await projectRow.scrollIntoViewIfNeeded();

    const titleElement = projectRow.locator('h3');
    const initialColor = await titleElement.evaluate(el => window.getComputedStyle(el).color);

    // Hover
    await projectRow.hover();
    await page.waitForTimeout(200); // Allow hover transition to resolve
    
    const hoverColor = await titleElement.evaluate(el => window.getComputedStyle(el).color);
    // Allow slight browser color space conversion differences (e.g., green channel being 179-182, blue channel being 0-10)
    expect(hoverColor).toMatch(/rgb\(245,\s*(179|180|181|182),\s*\d+\)/);
    expect(hoverColor).not.toBe(initialColor);
  });
});

test.describe('Portfolio Website - Tier 3: Cross-Feature Combinations', () => {
  test('Scrolling combined with project hover triggers and vertical tracking of cursor thumbnails', async ({ page }) => {
    // Only runs on desktop/tablet since thumbnail previews are hidden on mobile
    await page.setViewportSize({ width: 1200, height: 800 });
    await gotoResilient(page);

    const projectsSection = page.locator('section').filter({ hasText: 'Selected Work' });
    const projectRow = projectsSection.locator('a').first();
    await projectRow.scrollIntoViewIfNeeded();

    // Hover on row
    await projectRow.hover();
    
    // Preview thumbnail container should be visible on desktop
    const thumbnailContainer = projectRow.locator('div.pointer-events-none');
    await expect(thumbnailContainer).toBeVisible();

    const box = await projectRow.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Probing cursor vertical tracking: move mouse to top of the row
      await page.mouse.move(box.x + box.width / 2, box.y + 10);
      await page.waitForTimeout(200);
      const topOffset1 = await thumbnailContainer.evaluate(el => el.style.top);

      // Move mouse to bottom of the row
      await page.mouse.move(box.x + box.width / 2, box.y + box.height - 10);
      await page.waitForTimeout(200);
      const topOffset2 = await thumbnailContainer.evaluate(el => el.style.top);

      // Verify vertical position is tracked (style.top changes)
      expect(topOffset1).not.toBe(topOffset2);
    }
  });
});

test.describe('Portfolio Website - Tier 4: Real-world User Scenario', () => {
  test('Complete user flow and content integration check', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoResilient(page);

    // 1. Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200);

    // 2. Check all 3 commercial project hover thumbnail triggers
    const projectTitles = [
      'Tea Country Holidays',
      'ClashVault',
      'IQ Iron Fitness — Gym CRM'
    ];

    const projectsSection = page.locator('section').filter({ hasText: 'Selected Work' });

    for (const title of projectTitles) {
      const row = projectsSection.locator('a').filter({ hasText: title });
      await expect(row).toBeVisible();
      await row.scrollIntoViewIfNeeded();
      await row.hover();
      await page.waitForTimeout(200);

      // Verify the preview thumbnail (image) becomes visible
      const img = row.locator('img');
      await expect(img).toBeVisible();
    }

    // 3. Read about section content details like BCA Sem II
    // Note: The orchestrator's spec (PROJECT.md) mandates a DEDICATED About section (src/components/About.tsx).
    // If the implementation track has not built the dedicated About section yet, this test will fail as expected.
    const aboutSection = page.locator('section').filter({ hasText: /About/i });
    await expect(aboutSection).toBeVisible();
    
    // Check for BCA Sem II / Semester II inside the About section
    await expect(aboutSection).toContainText(/BCA/i);
    await expect(aboutSection).toContainText(/Sem/i);

    // 4. Verify additional works secondary list has been replaced by coming soon text
    const comingSoonText = projectsSection.locator('p').filter({ hasText: /More projects coming soon/i });
    await expect(comingSoonText).toBeVisible();

    // 5. Match all footer contacts exactly
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await footer.scrollIntoViewIfNeeded();

    // Email check
    const emailLink = footer.locator('a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:rishav2000roy@gmail.com');
    await expect(emailLink).toHaveText('rishav2000roy@gmail.com');

    // Phone check
    const phoneLink = footer.locator('a[href^="tel:"]');
    await expect(phoneLink).toHaveAttribute('href', 'tel:+916001914771');
    await expect(phoneLink).toContainText('+91 60019 14771');

    // LinkedIn check
    const linkedinLink = footer.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/rishav-roy-858b0b365/');

    // Instagram check
    const instagramLink = footer.locator('a[href*="instagram.com"]');
    await expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/justbeingpsunk_');
  });
});
