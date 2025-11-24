const { test } = require('@playwright/test');
const {logIn_page} = require('../../Pages/logIn_page');

test('Login Test - Admin Backoffice', async ({ page }) => {
  const loginPage = new logIn_page(page);

  await loginPage.gotoLogin();
  await loginPage.login();
  await loginPage.verifyLoginSuccess();
});
