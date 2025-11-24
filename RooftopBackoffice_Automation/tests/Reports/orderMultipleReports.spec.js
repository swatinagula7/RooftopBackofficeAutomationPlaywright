const { test } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { orderReportPage } = require('../../Pages/orderReportPage');

test('Order a Multiple reports', async ({ page }) => {
  const login = new logIn_page(page);
  const orderReport = new orderReportPage(page);

  await login.gotoLogin();

  await login.login();

  await orderReport.navigateToOrderReport();
  await orderReport.selectCustomer();



  // Loop through all reports from testData
 // for (const report of testData.orderMultipleReport.reports) {
    //await orderReport.addReportItem();
    
 // }
  await orderReport.enterMultipleLocations();

  await orderReport.completeOrderwithExistingcard();

  await orderReport.verifyOrder();
});
