const { test, expect } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { orderReportPage } = require('../../Pages/orderReportPage');
test('Order a report with Promocode', async ({ page }) => {
  const login = new logIn_page(page);
  const orderReport = new orderReportPage(page);

  await login.gotoLogin();

  await login.login();
  await orderReport.navigateToOrderReport();
  await orderReport.selectCustomer();
  await orderReport.addReportItem();
  await orderReport.completeOrderwithPromocode();

  await orderReport.verifyOrder();
});
