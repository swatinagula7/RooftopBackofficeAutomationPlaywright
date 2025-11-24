const { expect } = require('@playwright/test');
const { employee_elements } = require('../WebElements/employee_elements');
const { testData } = require('../TestData/testData');

exports.employeePage = class employeePage {
  constructor(page) {
    this.page = page;
    this.el = new employee_elements(page);
    this.testData = new testData();
  }

  async verifyToast() {
    await expect(this.el.toastMessage).toBeVisible({ timeout: 10000 });
  }

  async goToEmployees() {
    await expect(this.el.settingsButton).toBeVisible({ timeout: 10000 });
    await this.el.settingsButton.click();

    await expect(this.el.employeesLink).toBeVisible({ timeout: 10000 });
    await this.el.employeesLink.click();

    await expect(this.el.employeesHeading).toBeVisible({ timeout: 10000 });
  }

  async addEmployee() {
    await this.el.addEmployeeButton.click();


    //first and last names
    function generateRandomString(length) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      } 0
      return result;
    }

    // Generate random first and last names (e.g., 5-10 characters each)
    const randomFirstName = generateRandomString(Math.floor(Math.random() * (26 - 19)) + 1);

    const name = "Dev" + randomFirstName;



    //Email
    function generateRandomString(length) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }
    const randomEmail = generateRandomString(Math.floor(Math.random() * (26 - 19)) + 5);


    const emailid = randomEmail + "@yopmail.com";
    await this.el.nameInput.fill(name);
    await this.el.emailInput.fill(emailid);
    await this.el.phoneInput.fill(this.testData.newEmployee_phone);
    await this.el.passwordInput.fill(this.testData.newEmployee_password);
    await this.el.repeatPasswordInput.fill(this.testData.newEmployee_password);
    await this.el.roleDropdown.selectOption(this.testData.newEmployee_role);
    await this.el.createButton.click();
  }

  async searchEmployee(email) {
    await expect(this.el.searchBox).toBeVisible({ timeout: 5000 });
    await this.el.searchBox.type(email, { delay: 100 });
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(4000);
  }

  async deleteEmployee() {
    await this.searchEmployee(this.testData.deleteEmp);
    await expect(this.el.updateButton).toBeVisible({ timeout: 5000 });
    await this.el.updateButton.click();
    await this.el.deleteButton.click();
    await this.el.yesButton.nth(1).click();
    await this.page.waitForTimeout(4000);
  }

  async activateEmp() {
    await this.el.clearFilterIcon.click();
    await this.searchEmployee(this.testData.activate);

    await expect(this.el.updateButton).toBeVisible({ timeout: 60000 });
    await this.el.updateButton.click();

    await expect(this.el.activateButton).toBeEnabled({ timeout: 60000 });
    await this.el.activateButton.click();

    await expect(this.el.yesButton.nth(1)).toBeEnabled({ timeout: 60000 });
    await this.el.yesButton.nth(1).click();

    await expect(this.el.deactivateButton).toBeVisible({ timeout: 5000 });
  }

  async deactivateEmp() {
    await this.searchEmployee(this.testData.deactivate);
    await this.page.waitForTimeout(1000);
    await expect(this.el.updateButton).toBeVisible({ timeout: 60000 });
    await this.el.updateButton.click();

    await expect(this.el.deactivateButton).toBeEnabled({ timeout: 60000 });
    await this.el.deactivateButton.click();

    await expect(this.el.yesButton.nth(1)).toBeEnabled({ timeout: 60000 });
    await this.el.yesButton.nth(1).click();
    await this.page.waitForTimeout(1000);

    await expect(this.el.activateButton).toBeVisible({ timeout: 60000 });
  }

  async updatePhone() {
    await this.searchEmployee(this.testData.newEmployee_email);
    await expect(this.el.updateButton).toBeVisible({ timeout: 5000 });
    await this.el.updateButton.click();
    await this.page.waitForTimeout(1000);
    const phoneInput = this.page.locator('#phone');
    await expect(phoneInput).toBeVisible({ timeout: 5000 });
    await phoneInput.fill(this.testData.updatePhone);

    await this.el.saveButton.click();
    await this.page.waitForTimeout(2000);
  }

  async exportEmp() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.el.exportButton.click(),
    ]);

    const suggestedName = await download.suggestedFilename();
    await download.saveAs(`downloads/${suggestedName}`);
    console.log(`✅ Exported and saved: downloads/${suggestedName}`);
  }

  async checkEmp() {
    await this.page.waitForTimeout(4000);
    await expect(this.el.empNameCell).toBeVisible();
    await expect(this.el.empNameCell).toContainText(this.testData.newEmployee_email);
  }
}

