const { test, expect } = require('@playwright/test');
const { logIn_page } = require('../../../Pages/logIn_page');
const { ordersPage } = require('../../../Pages/ordersPage');

const { orderReportPage } = require('../../../Pages/orderReportPage');

test('order flow', async ({ page }) => {

    const orderReport = new orderReportPage(page);
    const login = new logIn_page(page);
    const order = new ordersPage(page);
    await login.gotoLogin();
    await login.login();

    //order report
    await orderReport.navigateToOrderReport();
    await orderReport.selectCustomer();
    await orderReport.addReportItem();
    await orderReport.completeOrderwithExistingcard();
    await page.pause();
    //deliver report
    await order.navigateToAllOrdersPage();

    await order.orderFlow();
});
