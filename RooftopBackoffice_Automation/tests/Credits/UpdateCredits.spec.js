const { test } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { creditsPage } = require('../../Pages/creditsPage');

test('Export credits - Admin Backoffice', async ({ page }) => {
    const login = new logIn_page(page);
    const credits = new creditsPage(page);

    await login.gotoLogin();
    await login.login();
    await credits.navigateToAllCredits();
    await credits.updateCredits();
    //await creditsPage.verifySuccessMsg();
});
