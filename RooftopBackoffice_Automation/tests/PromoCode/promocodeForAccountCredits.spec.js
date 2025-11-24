const { test } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { promocodePage } = require('../../Pages/promocodePage');

test('Promocode creation for Account Credits', async ({ page }) => {
const login = new logIn_page(page);
  const promo = new promocodePage(page);


  await login.gotoLogin();
  await login.login();
  await promo.navigateToPromoCodes();
  await promo.promocodeForAccountCredits();

});
