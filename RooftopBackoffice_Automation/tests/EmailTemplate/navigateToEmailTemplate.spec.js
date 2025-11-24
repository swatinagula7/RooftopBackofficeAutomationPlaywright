const { test, expect } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { emailTemplatePage } = require('../../Pages/emailTemplatePage');


test('Navigate to Prduction Snapshot Page', async ({ page }) => {
    const login = new logIn_page(page);
    const products = new emailTemplatePage(page);

    await login.gotoLogin();
    await login.login();

    await products.navigateToEmailTemplate();
});
