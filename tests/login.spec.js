const { test, expect } = require('@playwright/test');

test.describe('Login Feature - Bank2147', () => {

  test('Invalid login should show error message', async ({ page }) => {
    await page.goto('http://localhost:3000/app/login');

    await page.fill('#username', 'wronguser');
    await page.fill('#password', 'wrongpass');

    await page.click('#loginBtn');

    const errorMsg = page.locator('#errorMsg');
    await expect(errorMsg).toBeVisible();
  });


  test('Valid login should redirect to dashboard and show welcome message', async ({ page }) => {
    await page.goto('http://localhost:3000/app/login');

    await page.fill('#username', 'Sneha');
    await page.fill('#password', 'Manish@312');

    await Promise.all([
      page.waitForURL('**/dashboard'),
      page.click('#loginBtn'),
    ]);

    await expect(page).toHaveURL(/dashboard/);

    const welcomeUser = page.locator('#welcomeUser');
    await expect(welcomeUser).toBeVisible();
    await expect(welcomeUser).toHaveText('Welcome, Sneha');
  });


  test('Logout should redirect back to login page', async ({ page }) => {
    await page.goto('http://localhost:3000/app/login');

    await page.fill('#username', 'Sneha');
    await page.fill('#password', 'Manish@312');

    await Promise.all([
      page.waitForURL('**/dashboard'),
      page.click('#loginBtn'),
    ]);

    await Promise.all([
      page.waitForURL('**/login'),
      page.click('#logoutBtn'),  // Make sure logout button has this ID
    ]);

    await expect(page).toHaveURL(/login/);
  });

});