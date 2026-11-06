import { test, expect, Page } from '@playwright/test';

/*
 * The homepage is the portfolio (the former /v10 design): sunset hero, then
 * midnight / ivory / lime with Bespoke Stencil headings and Supreme text,
 * the Atelier Systems band near the top, the journal and the contact.
 */

async function gotoResilient(page: Page, url: string = '/') {
  try {
    await page.goto(url, { timeout: 15000 });
  } catch {
    await page.waitForTimeout(2000);
    await page.goto(url, { timeout: 15000 });
  }
}

test.describe('Portfolio homepage', () => {
  test('fonts: Bespoke Stencil for the name, Supreme for text', async ({ page }) => {
    await gotoResilient(page);
    await page.evaluate(() => document.fonts.ready);
    const fonts = await page.evaluate(() => ({
      body: getComputedStyle(document.body).fontFamily,
      h1: getComputedStyle(document.querySelector('h1')!).fontFamily,
    }));
    expect(fonts.body).toMatch(/Supreme/);
    expect(fonts.h1).toMatch(/Bespoke Stencil/);
  });

  test('midnight background below the hero', async ({ page }) => {
    await gotoResilient(page);
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(8, 9, 11)');
  });

  test('the studio band leads to Atelier Systems', async ({ page }) => {
    await gotoResilient(page);
    const studio = page.locator('section#projects');
    await expect(studio).toContainText('Atelier Systems');
    await expect(studio.locator('a[href="/atelier"]')).toHaveCount(1);
  });

  for (const vp of [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 800 },
  ]) {
    test(`layout holds on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await gotoResilient(page);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('footer#contact')).toBeAttached();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('page scrolls (Lenis does not lock it)', async ({ page }) => {
    await gotoResilient(page);
    expect(await page.evaluate(() => getComputedStyle(document.body).overflowY)).not.toBe('hidden');
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test('about, experience and contact details are on the page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await gotoResilient(page);
    await expect(page.locator('#about')).toContainText(/operations/i);
    await expect(page.locator('body')).toContainText('FOIA Specialist');
    await expect(page.locator('body')).toContainText(/Bachelor of Computer Applications/);

    const contact = page.locator('footer#contact');
    await contact.scrollIntoViewIfNeeded();
    await expect(contact.locator('a[href^="mailto:"]').first()).toHaveAttribute('href', 'mailto:rishav2000roy@gmail.com');
    await expect(contact.locator('a[href*="linkedin.com"]').first()).toHaveAttribute('href', 'https://www.linkedin.com/in/rishav-the-roy/');
    await expect(contact.locator('a[href*="instagram.com"]').first()).toHaveAttribute('href', 'https://instagram.com/justbeingpsunk_');
  });

  test('old preview URLs redirect to the homepage', async ({ request }) => {
    for (const path of ['/v5', '/v9', '/v10']) {
      const res = await request.get(path, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(res.headers()['location']).toBe('/');
    }
  });
});
