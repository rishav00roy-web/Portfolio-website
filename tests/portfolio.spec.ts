import { test, expect, Page } from '@playwright/test';

async function gotoResilient(page: Page, url: string = '/') {
  try {
    await page.goto(url, { timeout: 15000 });
  } catch {
    await page.waitForTimeout(2000);
    await page.goto(url, { timeout: 15000 });
  }
}

test.describe('Homepage layout', () => {
  test.beforeEach(async ({ page }) => {
    await gotoResilient(page);
  });

  test('has exactly one h1 with name and role', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Rishav Roy');
    await expect(h1).toContainText('Operations & Automation Specialist');
  });

  test('renders every section with a heading', async ({ page }) => {
    for (const id of ['work', 'about', 'experience', 'skills', 'contact']) {
      await expect(page.locator(`#${id} h2`)).toBeVisible();
    }
  });

  test('case study cards link to crawlable case study pages', async ({ page }) => {
    const links = page.locator('#work article h3 a');
    await expect(links).toHaveCount(4);
    for (const href of await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
      expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);
    }
  });

  test('contact form validates required fields', async ({ page }) => {
    await page.locator('#contact button[type="submit"]').click();
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  const viewports = [
    { name: 'Mobile', width: 375, height: 812 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 800 },
  ];

  for (const vp of viewports) {
    test(`no horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await gotoResilient(page);
      await expect(page.locator('h1')).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe('SEO', () => {
  test('homepage head carries canonical, OG and Twitter tags', async ({ page }) => {
    await gotoResilient(page);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://byrishav.online');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /operations/i);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('JSON-LD declares a Person linked from the ProfilePage', async ({ page }) => {
    await gotoResilient(page);
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.flatMap((e) => [JSON.parse(e.textContent || '[]')].flat()));
    const person = blocks.find((b) => b['@type'] === 'Person');
    const profile = blocks.find((b) => b['@type'] === 'ProfilePage');
    expect(person?.['@id']).toBe('https://byrishav.online/#person');
    expect(profile?.mainEntity?.['@id']).toBe(person?.['@id']);
  });

  test('case study page has its own title and OG image', async ({ page }) => {
    await gotoResilient(page, '/projects/tea-country-holidays');
    await expect(page).toHaveTitle('Tea Country Holidays Case Study | Rishav Roy');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /\/projects\/tea-country-holidays\/opengraph-image/,
    );
  });

  test('sitemap and robots are served', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain('/projects/clash-bazar');
    const robots = await request.get('/robots.txt');
    expect(await robots.text()).toContain('Disallow: /api/');
  });
});
