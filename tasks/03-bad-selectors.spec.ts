import { test, expect } from "@playwright/test";

/**
 * TASK 03 — Fix the broken tests
 *
 * Find the bug in each test and propose a fix. Do not change what the test is asserting — only fix the broken part. Make them faster.
 */

// --- Test 1 ---
test("home page shows the correct hero heading", async ({ page }) => {
  await page.goto("/");
  const heading = page.locator("h2");
  await expect(heading).toBeVisible();
});

// --- Test 2 ---
test("newsletter success message appears after submit", async ({ page }) => {
  await page.goto("/");
  await page.fill('[data-testid="newsletter-input"]', "test@example.com");
  await page.click('[data-testid="newsletter-submit"]');
  await page.waitForTimeout(3000);
  await expect(
    page.locator('[data-testid="newsletter-success"]'),
  ).toBeVisible();
});

// --- Test 3 ---
test("GET /api/parcels/:id returns the created parcel", async ({ request }) => {
  // Create a parcel first
  const create = await request.post("/api/parcels", {
    headers: { Authorization: `Bearer test-token-inpost-2026` },
    data: {
      recipientName: "Test User",
      recipientEmail: "test@example.com",
      size: "A",
      deliveryType: "LOCKER",
      lockerCode: "KRK001",
    },
  });
  const created = await create.json();
  const parcelId = created.id;

  // Now GET the created parcel
  const res = await request.get(`/api/parcels/${parcelId}`, {
    headers: { Authorization: `Bearer test-token-inpost-2026` },
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty("id");
});

// --- Test 4 ---
test("system status shows ready after initialising", async ({ page }) => {
  await page.goto("/challenges/async");
  const status = page.locator('[data-testid="system-ready"]');
  await status.waitFor();
  await expect(status).toHaveText("System ready");
});

// --- Test 5 ---
test("profile page shows the user email", async ({ page }) => {
  await page.goto("/login");
  
  await page.locator("input[placeholder='Enter your email']").waitFor({ state: "visible" });
  
  await page.locator("input[placeholder='Enter your email']").fill("user@example.com");
  await page.locator("input[placeholder='Enter your password']").fill("password12345");
  await page.click("button:has-text('Sign In')");
  await page.waitForURL("**/profile");

  const emailEl = page.locator("text=user@example.com").first();
  await expect(emailEl).toBeVisible();
});

// --- Test 6 (bonus) ---
test("newsletter form submits without error", async ({ page }) => {
  await page.goto("/");
  await page.fill('[data-testid="newsletter-input"]', "test@example.com");
  await page.click('[data-testid="newsletter-submit"]');
});
