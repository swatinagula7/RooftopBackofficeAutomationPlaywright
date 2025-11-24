const { test, expect } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { dashboardPage } = require('../../Pages/dashboardPage');


test('Navigate to Prduction Snapshot Page', async ({ page }) => {
    const login = new logIn_page(page);
    const products = new dashboardPage(page);

    await login.gotoLogin();
    await login.login();

    await products.navigateToSalesStatisticPage();
});
