const { test } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { creditsPage } = require('../../Pages/creditsPage');
test('Order credits with Invoice', async ({ page }) => {
    const login = new logIn_page(page);
    const credits = new creditsPage(page);

    await login.gotoLogin();

    await login.login();

    await credits.navigateToOrderCredits();
    await credits.selectEmployee();
    await credits.orderWithInvoice();
    //await credits.verifyOrder();
});
