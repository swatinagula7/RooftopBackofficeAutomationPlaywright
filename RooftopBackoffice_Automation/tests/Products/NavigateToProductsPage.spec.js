const { test, expect } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { ProductsPage } = require('../../Pages/ProductsPage');

test('Navigate to products page', async ({ page }) => {
    const login = new logIn_page(page);
    const products = new ProductsPage(page);

    await login.gotoLogin();
    await login.login();
    await products.navigateToProductsPage();

});
