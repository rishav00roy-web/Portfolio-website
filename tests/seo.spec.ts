import { test, expect } from '@playwright/test';

test.describe('SEO', () => {
  test('homepage head carries canonical, OG and Twitter tags', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://byrishav.online');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /operations/i);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /opengraph-image/);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test('JSON-LD declares a Person linked from the ProfilePage', async ({ page }) => {
    await page.goto('/');
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.flatMap((e) => [JSON.parse(e.textContent || '[]')].flat()));
    const person = blocks.find((b) => b['@type'] === 'Person');
    const profile = blocks.find((b) => b['@type'] === 'ProfilePage');
    expect(person?.['@id']).toBe('https://byrishav.online/#person');
    expect(profile?.mainEntity?.['@id']).toBe(person?.['@id']);
  });

  test('Atelier is indexable and carries its studio and FAQ schema', async ({ page }) => {
    await page.goto('/atelier');
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://byrishav.online/atelier');
    const types = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.flatMap((e) => [JSON.parse(e.textContent || '[]')].flat().map((b) => b['@type'])));
    expect(types).toEqual(expect.arrayContaining(['ProfessionalService', 'FAQPage']));
  });

  test('case study page has its own title and OG image', async ({ page }) => {
    await page.goto('/projects/tea-country-holidays');
    await expect(page).toHaveTitle('Tea Country Holidays Case Study | Rishav Roy');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /\/projects\/tea-country-holidays\/opengraph-image/,
    );
  });

  test('sitemap and robots are served', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain('/projects/clash-bazar');
    expect(await sitemap.text()).toContain('https://byrishav.online/atelier');
    const robots = await request.get('/robots.txt');
    expect(await robots.text()).toContain('Disallow: /api/');
  });
});
