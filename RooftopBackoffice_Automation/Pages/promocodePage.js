const { expect } = require('@playwright/test');
const { promocode_elements } = require('../WebElements/promocode_elements');
const { testData } = require('../TestData/testData');
exports.promocodePage = class promocodePage {
    constructor(page) {
        this.page = page;
        this.el = new promocode_elements(page);
        this.testData = new testData();
    }

    async verifyToast() {
        await expect(this.el.toast).toBeVisible({ timeout: 6000 });
    }

    async navigateToPromoCodes() {
        await expect(this.el.settingsBtn).toBeVisible({ timeout: 10000 });
        await this.el.settingsBtn.click();

        await expect(this.el.promoLink).toBeVisible({ timeout: 6000 });
        await this.el.promoLink.click();
    }

    async createPromoCode(code, desc, value, type, sdate, edate, limit) {
        await this.el.enterPromoCode.fill(code);
        await this.el.enterDesc.fill(desc);

        await expect(this.el.typeDropdown).toBeVisible({ timeout: 5000 });
        await this.el.typeDropdown.selectOption(type);

        await this.el.valueInput.fill(value);
        await this.el.startDateInput.fill(sdate);
        await this.el.checkboxes.first().uncheck();
        await this.el.endDateInput.fill(edate);
        await this.el.checkboxes.nth(2).uncheck();

        await this.el.limitInput.fill(limit);
        await this.el.checkboxes.nth(2).check();

        await expect(this.el.saveBtn).toBeEnabled({ timeout: 5000 });
        await this.el.saveBtn.click();
        await this.page.waitForTimeout(4000);
    }

    async promocodeForOrder() {
        await this.el.addPromoBtn.click();
        await this.el.radioOrder.check();
        await this.el.getRadioByName(this.testData.order_orderType).check();
        await this.el.getRadioByName(this.testData.order_reportType).check();
        await this.createPromoCode(this.testData.order_code, this.testData.order_desc, this.testData.order_value, this.testData.order_type, this.testData.order_startDate, this.testData.order_endDate, this.testData.order_limit);
        await this.verifyPromoCreation();
    }

    async promocodeForAccountCredits() {
        await this.el.addPromoBtn.click();
        await this.el.radioAccountCredits.check();
        await this.el.getRadioByName(this.testData.credit_reportType).check();
        await this.createPromoCode(this.testData.credit_code, this.testData.credit_desc, this.testData.credit_value, this.testData.credit_type, this.testData.order_startDate, this.testData.order_endDate, this.testData.order_limit);
        await this.verifyPromoCreation();
    }

    async promocodeForRushDeliveryType(promo) {
        await this.el.addPromoBtn.click();
        await this.el.radioRushDelivery.check();
        await this.el.getRadioByName(this.testData.rushDelivery_orderType).check();
        await this.createPromoCode(this.testData.rushDelivery_code, this.testData.rushDelivery_desc, this.testData.rushDelivery_value, this.testData.rushDelivery_type, this.testData.order_startDate, this.testData.order_endDate, this.testData.order_limit);
        await this.verifyPromoCreation();
    }


    async verifyPromoCreation() {
        await this.el.promoManagerHeading.waitFor({ state: 'visible' });
    }

    async searchPromo(code) {
        await expect(this.el.searchBox).toBeVisible({ timeout: 5000 });
        await this.el.searchBox.fill(code);
        await this.page.waitForTimeout(4000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(4000);
    }

    async deactivatePromo() {
        await this.searchPromo(this.testData.deactivateCode);
        const btn = this.el.actionButton(1);
        await expect(btn).toBeVisible({ timeout: 6000 });
        await btn.click();

        await expect(this.el.deactivateMenu).toBeVisible({ timeout: 6000 });
        await this.el.deactivateMenu.click();

        await expect(this.el.yesBtn).toBeEnabled({ timeout: 6000 });
        await this.el.yesBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async activatePromo() {
        await this.searchPromo(this.testData.activateCode);
        const btn = this.el.actionButton(1);
        await expect(btn).toBeVisible({ timeout: 6000 });
        await btn.click();

        await expect(this.el.activateMenu).toBeVisible({ timeout: 6000 });
        await this.el.activateMenu.click();

        await expect(this.el.yesBtn).toBeEnabled({ timeout: 6000 });
        await this.el.yesBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async deletePromo() {
        await this.searchPromo(this.testData.deleteCode);
        const btn = this.el.actionButton(1);
        await expect(btn).toBeVisible({ timeout: 6000 });
        await btn.click();

        await expect(this.el.deleteMenu).toBeVisible({ timeout: 6000 });
        await this.el.deleteMenu.click();

        await expect(this.el.yesBtn).toBeEnabled({ timeout: 6000 });
        await this.el.yesBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async promocodeHistory() {
        await this.searchPromo(this.testData.promoHistory);
        const btn = this.el.actionButton(1);
        await btn.click();
        await this.el.historyMenu.click();
        await expect(this.el.promoHistoryHeading).toBeVisible({ timeout: 6000 });
    }
}


