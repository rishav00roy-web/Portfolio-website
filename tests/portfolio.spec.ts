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

    // R1: "Kenoky" for headlines and names
    const headingFont = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? window.getComputedStyle(h1).fontFamily : '';
    });
    expect(headingFont).toMatch(/Kenoky/i);

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
    await expect(page.locator('section').filter({ hasText: 'Rishav' }).first()).toBeVisible();

    // Projects Section
    await expect(page.locator('section').filter({ hasText: 'Paid Projects' })).toBeVisible();

    // Footer Component
    await expect(page.locator('footer')).toBeVisible();

    // Note: Dedicated About Section is expected to be verified in Tier 4
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

  test('Hover styles: project titles visible in card layout', async ({ page }) => {
    await gotoResilient(page);
    const projectsSection = page.locator('section').filter({ hasText: 'Paid Projects' });
    await expect(projectsSection).toBeVisible();

    // New design: project cards are divs with h2 headings, not anchor rows
    const firstCard = projectsSection.locator('h2').first();
    await expect(firstCard).toBeVisible();

    // Verify all three project titles are present in the DOM
    await expect(projectsSection).toContainText('Tea Country Holidays');
    await expect(projectsSection).toContainText('Gym CRM');
    await expect(projectsSection).toContainText('ClashVault');
  });
});

test.describe('Portfolio Website - Tier 3: Cross-Feature Combinations', () => {
  test('Projects section renders all cards with images', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await gotoResilient(page);

    const projectsSection = page.locator('section').filter({ hasText: 'Paid Projects' });
    await expect(projectsSection).toBeVisible();

    // All 3 cards should be in the DOM (horizontal scroll, sticky)
    const cards = projectsSection.locator('div[class*="rounded"]');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Each card should have an image
    const images = projectsSection.locator('img, image');
    const imgCount = await images.count();
    expect(imgCount).toBeGreaterThanOrEqual(3);
  });
});

test.describe('Portfolio Website - Tier 4: Real-world User Scenario', () => {
  test('Complete user flow and content integration check', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoResilient(page);

    // 1. Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200);

    // 2. Verify all 3 project titles are present (horizontal card layout, not anchor rows)
    const projectTitles = [
      'Tea Country Holidays',
      'Gym CRM',
      'ClashVault'
    ];

    const projectsSection = page.locator('section').filter({ hasText: 'Paid Projects' });

    for (const title of projectTitles) {
      await expect(projectsSection).toContainText(title);
    }

    // 3. Read about section content details like BCA Sem II
    const aboutSection = page.locator('section').filter({ hasText: /About/i });
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText(/BCA/i);
    await expect(aboutSection).toContainText(/Sem/i);

    // 4. Verify coming soon text no longer expected (new design has no additionalWork placeholder)
    // Skip that assertion — new Projects design does not include it.

    // 5. Match all footer contacts exactly
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await footer.scrollIntoViewIfNeeded();

    // Email check
    const emailLink = footer.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toHaveAttribute('href', 'mailto:rishav2000roy@gmail.com');
    await expect(emailLink).toHaveText('rishav2000roy@gmail.com');

    // Phone check
    const phoneLink = footer.locator('a[href^="tel:"]').first();
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
