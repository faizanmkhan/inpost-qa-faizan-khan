import { test, expect } from '@playwright/test'

/**
 * TASK 04 — Async wait
 *
 * Write a stable test for the parcel tracking flow at /challenges/async.
 * The test must pass consistently across multiple runs.
 */

test('parcel tracking works correctly', async ({ page }) => {
  await page.goto('/challenges/async');

  // Wait for initial states — ensure any "initialis" message is gone
  await expect(page.locator('text=Tracking system')).not.toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=System ready')).toBeVisible({ timeout: 15000 });

  // Fill and track
  const parcelInput = page.locator('input[placeholder^="e.g."]');
  await parcelInput.fill('UK123456789GB');

  const trackButton = page.locator('button:has-text("Track parcel")');
  await expect(trackButton).toBeEnabled();
  
  // CLICK ONLY ONCE
  await trackButton.click();

  // Wait for the result container to appear, then assert status — more stable than
  // waiting directly for the status text which can be delayed by the backend.
  const result = page.locator('text=Parcel found');
  await expect(result).toBeVisible({ timeout: 30000 });
  await expect(page.locator('text=In Transit')).toBeVisible();
  await expect(page.locator('text=/initialis/i')).not.toBeVisible();
});
