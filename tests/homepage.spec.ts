import { test, expect } from '@playwright/test';

test('has title and intro text', async ({ page }) => {
  // Go to the homepage
  await page.goto('/');

  // Expect a title to contain "Rishav Roy".
  await expect(page).toHaveTitle(/Rishav Roy — Full-Stack Developer/i);

  // Expect the main heading/text to contain "Rishav"
  const heading = page.locator('h1');
  await expect(heading).toContainText('Rishav');
  await expect(heading).toContainText('Roy');

  // Expect the intro paragraph to contain the developer description
  const intro = page.locator('p').filter({ hasText: 'Agentic Full-Stack Developer' }).first();
  await expect(intro).toBeVisible();
});
