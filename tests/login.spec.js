const { test, expect } = require('@playwright/test');

test.describe('Bank2147 Login Tests', () => {

  test('Login page should load', async ({ page }) => {
    await page.goto('http://localhost:3000/login.html');
    await expect(page).toHaveTitle(/Bank2147/);
  });

  test('Invalid login should show error message', async ({ page }) => {
    await page.goto('http://localhost:3000/login.html');

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('.error-message')).toBeVisible();
  });

});