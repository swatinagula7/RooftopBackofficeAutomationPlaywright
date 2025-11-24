import { test } from '@playwright/test';
import { logIn_page } from '../../Pages/logIn_page.js';
const { creditsPage } = require('../../Pages/creditsPage');

test('Order Credits with Credit Card', async ({ page }) => {
  const loginPage = new logIn_page(page);
  const credits = new creditsPage(page);

  await loginPage.gotoLogin();
  await loginPage.login();
  await credits.navigateToOrderCredits();
  await credits.selectEmployee();
  await credits.orderWithCreditCard();
});
