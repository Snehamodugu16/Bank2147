const { test, expect } = require('@playwright/test');

test.describe('Bank2147 E2E Flow', () => {

  test('Successful Login', async ({ page }) => {
    await page.goto('http://localhost:3000/login.html');

    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard.html/);
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('Logout', async ({ page }) => {
    await page.goto('http://localhost:3000/login.html');

    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('#logout');

    await expect(page).toHaveURL(/login.html/);
  });

  test('Transfer Money', async ({ page }) => {
    await page.goto('http://localhost:3000/login.html');

    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('#transferLink');

    await page.fill('#amount', '150');
    await page.click('#transferButton');

    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('Transaction History', async ({ page }) => {
    await page.goto('http://localhost:3000/login.html');

    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('#historyLink');

    await expect(page.locator('table')).toBeVisible();
  });

});