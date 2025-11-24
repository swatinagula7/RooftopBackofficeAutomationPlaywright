const { test, expect } = require('@playwright/test');
const { logIn_page } = require('../../Pages/logIn_page');
const { employeePage } = require('../../Pages/employeePage');


test('Update employee details', async ({ page }) => {
    const login = new logIn_page(page);
    const employee = new employeePage(page);

    await login.gotoLogin();
    await login.login();
    await employee.goToEmployees();
    await employee.updatePhone();


});
