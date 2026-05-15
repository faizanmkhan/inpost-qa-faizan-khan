import { test, expect } from '@playwright/test'

/**
 * TASK 01 — Login
 *
 * Test the login flow at /login.
 * Credentials: user@example.com / password12345
 */

test.describe('Login', () => {
    test('successful login', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('user@example.com')
    await page.getByLabel('Password').fill('password12345')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()
  })
})
