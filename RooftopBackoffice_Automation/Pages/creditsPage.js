const { expect } = require('@playwright/test');
const { credits_webElements } = require('../WebElements/credits_webElements');
const { testData } = require('../TestData/testData');

exports.creditsPage = class creditsPage {
  constructor(page) {
    this.page = page;
    this.el = new credits_webElements(page);
    this.testData = new testData();
  }

  async verifySuccessMsg() {
    await expect(this.el.toastMessage).toBeVisible();
  }

  async navigateToOrderCredits() {
    await this.el.creditsButton.click();
    await this.el.orderCreditsLink.click();
  }

  async navigateToAllCredits() {
    await this.el.creditsButton.click();
    await this.el.allCreditsLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectEmployee() {
    await this.el.employeeCombobox.type(this.testData.customerName, { delay: 100 });
    await this.page.keyboard.press('ArrowDown');
    await this.page.locator('li.rz-autocomplete-list-item').first().click();
  }

  async addCard() {
    await this.el.creditCardRadio.waitFor({ state: 'visible' });
    await this.el.creditCardRadio.check();
    await this.el.cardNumber.fill(this.testData.card_number);
    await this.el.cardMonth.selectOption(this.testData.card_month);
    await this.el.cardYear.selectOption(this.testData.card_year);
    await this.el.cardName.fill(this.testData.card_name);
  }

  async orderWithCreditCard() {

    await this.el.reportRadio(this.testData.reportType).click();
    await this.el.nextButton.click();
    await this.addCard();
    await this.el.finishButton.click();
    await this.page.waitForTimeout(4000);
  }

  async orderWithInvoice() {
    await this.el.reportRadio(this.testData.reportType).click();
    await this.el.nextButton.click();
    await this.el.invoiceRadio.waitFor({ state: 'visible' });
    await this.el.invoiceRadio.check();
    await this.el.finishButton.click();
    await this.page.waitForTimeout(4000);
  }

  async orderWithPromocode() {

    await this.el.reportRadio(this.testData.reportType).click();
    await this.el.nextButton.click();
    await this.el.creditCardRadio.check();
    await this.el.cardNumber.fill(this.testData.card_number);
    await this.el.cardMonth.selectOption(this.testData.card_month);
    await this.el.cardYear.selectOption(this.testData.card_year);
    await this.el.cardName.fill(this.testData.card_name);
    await this.el.promoCodeInput.fill(this.testData.promoCode);
    await this.el.applyButton.click();
    await this.el.finishButton.click();
    await this.page.waitForTimeout(4000);
  }

  async orderWithQuantity() {

    await this.el.reportRadio(this.testData.reportType).click();
    await this.el.manualPriceRadio.check();
    await this.el.packagePriceInput.fill(this.testData.packagePrice);
    await this.el.quantityInput.fill(this.testData.quantity);
    await this.el.nextButton.click();
    await this.addCard();
    await this.el.finishButton.click();
  }

  async refundCredits() {
    await this.el.filterInput.type(this.testData.refundCreditId, { delay: 200 });
    await this.page.keyboard.press('Enter');
    await this.el.accountButton.click();
    await this.el.refundMenuItem.click();
    await this.page.waitForTimeout(4000);
    await Promise.all([
      this.page.waitForLoadState('load'),
      this.el.submitButton.click(),
    ]);
   await expect(this.el.headingCreditsManager).toBeVisible({ timeout: 60000 });
      await this.page.waitForTimeout(4000);
  }

  async updateCredits() {
    await this.el.filterInput.type(this.testData.updateCredit);
    await this.page.keyboard.press('Enter');
    await this.el.accountButton.click();
    await this.el.updateMenuItem.click();
    await this.page.waitForTimeout(2000);
    await this.el.remainingInput.fill(this.testData.updateCreditsValue);
    await this.page.waitForTimeout(6000);
    await this.el.submitButton.click();
    await this.page.waitForTimeout(4000);
  }

  async exportCredits() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.el.exportButton.click()
    ]);
    const name = await download.suggestedFilename();
    await download.saveAs(`downloads/${name}`);
  }
}
