const { test } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { customerPage } = require('../../Pages/customerPage');
test('update customer', async ({ page }) => {
    const login = new logIn_page(page);
    const customer = new customerPage(page);

    await login.gotoLogin();
    await login.login();
    await customer.navigateToCustomerPage();
    await customer.updateCustomer();


});