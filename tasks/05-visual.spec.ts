import { test, expect } from '@playwright/test'

/**
 * TASK 05 — Visual regression
 *
 * Write a visual test for the locker details page at /challenges/visual.
 */

test('locker card', async ({ page }) => {
  await page.goto('/challenges/visual');

  // Ensure page loaded
  await expect(page.locator('text=Locker Details')).toBeVisible({ timeout: 10000 });

  // Locate the locker card by a stable label on the card
  const card = page.locator('text=Live availability').locator('..').locator('..');
  await expect(card).toBeVisible();

  // Normalize dynamic content inside the card (numbers, dates, counts)
  await card.evaluate((node) => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    let txt;
    // Replace numbers and dates in text nodes with stable placeholders
    while ((txt = walker.nextNode())) {
      txt.nodeValue = txt.nodeValue
        .replace(/\d{1,3}(,\d{3})*/g, 'N')
        .replace(/\b\d{4}-\d{2}-\d{2}\b/g, 'DATE')
        .replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, 'DATE');
    }
    // Hide elements that render external content (maps, avatars)
    node.querySelectorAll('img, svg, .map, .avatar').forEach(el => {
      // keep layout but hide content
      (el as HTMLElement).style.visibility = 'hidden';
    });
  });

  // Take a scoped screenshot of the card and compare with baseline
  expect(await card.screenshot()).toMatchSnapshot('locker-card.png', { maxDiffPixelRatio: 0.01 });
})
