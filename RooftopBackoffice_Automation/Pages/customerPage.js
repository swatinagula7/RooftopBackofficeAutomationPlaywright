const { expect } = require('@playwright/test');
const { customer_elements } = require('../WebElements/customer_elements');
const { testData } = require('../TestData/testData');

exports.customerPage = class customerPage {
  constructor(page) {
    this.page = page;
    this.el = new customer_elements(page);
    this.testData = new testData();
  }

  async navigateToCustomerPage() {
    await this.el.customersTab.click();
  }

  async addNewCustomer() {
    await this.el.addCustomerButton.click();

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
    const randomLastName = generateRandomString(Math.floor(Math.random() * (26 - 19)) + 1);

    const firstName = "Dev" + randomFirstName;
    const lastName = "Ind" + randomLastName;


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
    await this.el.companyName.fill(this.testData.newCustomer_companyName);
    await this.el.firstName.fill(firstName);
    await this.el.lastName.fill(lastName);
    await this.el.email.fill(emailid);
    await this.el.phone.fill(this.testData.newCustomer_phone);
    await this.el.address.fill(this.testData.newCustomer_address);
    await this.el.city.fill(this.testData.newCustomer_city);
    await this.el.stateDropdown.click();
    await this.el.stateOption(this.testData.newCustomer_state).click();
    await this.el.zip.fill(this.testData.newCustomer_zip);
    await this.el.password.fill(this.testData.newCustomer_password);
    await this.el.repeatPassword.fill(this.testData.confirmPassword);
    await this.el.createButton.click();
    await this.page.waitForTimeout(4000);
  }

  async verifyCustomerCreated() {
    await expect(this.el.firstCustomerName).toContainText(this.testData.newCustomer_firstName);
  }

  async searchCustomer(email) {
    await this.el.customerSearchBox.type(email, { delay: 100 });
    await this.page.keyboard.press('Enter');
    await expect(this.el.customerRow(email)).toBeVisible();
    await this.page.waitForTimeout(2000);
  }

  async openCustomerView() {
    const context = this.page.context();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.el.viewButton.click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async addCCEmail() {
    await this.searchCustomer(this.testData.ccEmail_Cust);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);
    await newEl.addCCEmailButton.click();
    await newEl.ccEmailInput.fill(this.testData.ccEmail);
    await newEl.alwaysCCCheckbox.check();
    await newEl.addButton.click();
    await newEl.saveButton.click();
    await expect(newEl.toastMessage).toBeVisible();
  }

  async deleteCCEmail() {
    await this.searchCustomer(this.testData.deleteCC_Cust);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);
    await newEl.deleteCCButton.click();
    await newEl.confirmYesButton.nth(1).click();
    await expect(newEl.toastMessage).toBeVisible();
  }

  async updateCustomer() {
    await this.searchCustomer(this.testData.update_Cust);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);
    await newEl.updateButton.first().click();
    await newEl.phoneInput.fill(this.testData.updatePhone);
    await this.page.waitForTimeout(2000);
    await newEl.submitButton.click();
    //await expect(newEl.toastMessage).toBeVisible();
  }

  async deactivateCustomer() {
    await this.searchCustomer(this.testData.deactivateCustomer);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);
    await newEl.deactivateButton.click();
    await newEl.confirmYesButton.nth(1).click();
    await expect(newEl.toastMessage).toBeVisible();
  }

  async activateCustomer() {
    await this.searchCustomer(this.testData.activateCustomer);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);
    await newEl.activateButton.click();
    await newEl.confirmYesButton.nth(1).click();
    await expect(newEl.toastMessage).toBeVisible();
  }

  async deleteCustomer() {
    await this.searchCustomer(this.testData.deleteCustomer);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);
    await newEl.deleteButton.click();
    await newEl.confirmYesButton.nth(1).click();
    await expect(newEl.toastMessage).toBeVisible();
  }


  async updateCCEmail() {
    await this.searchCustomer(this.testData.updateCCCust);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);

    await newPage.waitForTimeout(4000);

    const row = newEl.ccEmailRow(this.testData.oldCCEmail);
    await expect(row).toBeVisible({ timeout: 15000 });

    await newEl.updateCC(this.testData.oldCCEmail).click();


    await expect(newEl.emailInput).toBeVisible({ timeout: 15000 });
    await newEl.emailInput.evaluate(input => input.value = '');
    await newEl.emailInput.type(this.testData.updatedCCEmail, { delay: 100 });

    await newEl.emailInput.evaluate(input => {
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.blur();
    });

    await newPage.waitForTimeout(4000);

    await expect(newEl.submitButton).toBeVisible({ timeout: 10000 });
    await expect(newEl.submitButton).toBeEnabled({ timeout: 10000 });
    await newEl.submitButton.click();

    await expect(newEl.toastMessage).toBeVisible();
  }

  async addCard() {
    await this.searchCustomer(this.testData.ccEmail_Cust);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);

    await newPage.waitForTimeout(4000);

    await newEl.addCardButton.click();
    await newEl.cardNumberInput.fill(this.testData.card_number);
    await newEl.cardMonthSelect.selectOption(this.testData.card_month);
    await newEl.cardYearSelect.selectOption(this.testData.card_year);
    await newEl.defaultCardCheckbox.check();
    await newEl.cardNameInput.fill(this.testData.card_name);
    await newEl.saveButton.click();

    await expect(newEl.toastMessage).toBeVisible();
  }

  async orderHistory() {
    await this.searchCustomer(this.testData.ccEmail_Cust);
    const newPage = await this.openCustomerView();
    const newEl = new customer_elements(newPage);
    await newEl.orderHistoryTab.click();
    await expect(newEl.customerHistoryHeading).toBeVisible();
  }

  async exportCustomer() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.el.exportButton.click(),
    ]);
    const fileName = await download.suggestedFilename();
    await download.saveAs(`downloads/${fileName}`);
    console.log(`✅ Exported: downloads/${fileName}`);
  }
};
