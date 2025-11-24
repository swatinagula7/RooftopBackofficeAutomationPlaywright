const { test, expect } = require('@playwright/test');
const { logIn_page } = require('../../../Pages/logIn_page');
const { ordersPage } = require('../../../Pages/ordersPage');


test('Export Orders', async ({ page }) => {

  const login = new logIn_page(page);
  const order = new ordersPage(page);
  await login.gotoLogin();
  await login.login();


  await order.navigateToAllOrdersPage();

  await order.exportOrders();


});
