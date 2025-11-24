const { expect } = require('@playwright/test');
const { orderReport_elements } = require('../WebElements/orderReport_elements');
const { testData } = require('../TestData/testData');

exports.orderReportPage = class orderReportPage {
    constructor(page) {
        this.page = page;
        this.el = new orderReport_elements(page);
        this.testData = new testData();
    }

    async navigateToOrderReport() {
        await expect(this.el.orderReportLink).toBeVisible({ timeout: 15000 });
        await this.el.orderReportLink.click();
    }

    async orderforNewCustomer() {

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

        await this.el.newCustomerRadio.check();
        await this.el.emailInput.fill(emailid);
        await this.el.passwordInput.fill(this.testData.newCustomer_password);
        await this.el.confirmPasswordInput.fill(this.testData.confirmPassword);
        await this.el.firstNameInput.fill(firstName);
        await this.el.lastNameInput.fill(lastName);
        await this.el.companyNameInput.fill(this.testData.newCustomer_companyName);
        await this.el.phoneInput.fill(this.testData.newCustomer_phone);
        await this.el.addressInput.fill(this.testData.newCustomer_address);

        await this.page.click('body');
        for (let i = 0; i < 4; i++) await this.page.keyboard.press('ArrowDown');

        await this.el.cityInput.fill(this.testData.newCustomer_city);
        await this.el.stateDropdown.click();
        await this.el.stateDropdown.click();
        await this.el.stateOptionArkansas.click();
        await this.el.dropdownTrigger.click();
        await this.el.zipInput.fill(this.testData.newCustomer_zip);
        await expect(this.el.nextButton).toBeVisible();
        await expect(this.el.nextButton).toBeEnabled();
        await this.el.nextButton.click();
    }

    async selectCustomer() {
        await expect(this.el.customerCombobox).toBeVisible();
        await this.el.customerCombobox.type(this.testData.orderReport_customerName, { delay: 100 });
        await this.page.keyboard.press('ArrowDown');
        await expect(this.el.autocompleteFirstOption).toBeVisible();
        await this.el.autocompleteFirstOption.click();
        await this.el.nextButton.click();
    }

    async enterLocation(location, city) {
        await expect(this.el.locationInput).toBeVisible({ timeout: 50000 });
        await this.el.locationInput.fill(location);
        // Wait for the address suggestions to appear
        await expect(this.el.addressOptions.first()).toBeVisible({ timeout: 10000 });

        // Get all options from the locator
        const options = await this.el.addressOptions.all();

        for (const option of options) {
            const text = await option.textContent();
            if (text.includes(city)) {
                await option.click();
                break;
            }
        }
    }
    async enterMultipleLocations() {
        for (const report of this.testData.orderMultipleReport.reports) {
            await this.enterLocation(report.location, report.city);
             await this.addItem();
            await this.page.waitForTimeout(2000);
        }
    }

    async addReportItem() {
        await this.enterLocation(this.testData.orderReport_location, this.testData.orderReport_city);
        await this.selectReportType();
        await this.selectDeliveryType();
        await this.addItem();
    }

    async selectReportType() {
        const type = this.testData.orderReport_reportType.trim().toLowerCase();
        if (type === 'comprehensive') await this.el.comprehensiveRadio.check();
        else if (type === 'basic') await this.el.basicRadio.check();
        else if (type === 'standard') await this.el.standardRadio.check();
        else if (type === 'claims') await this.el.claimsRadio.check();
        else throw new Error(`Invalid report type: ${this.testData.orderReport_reportType}`);
    }

    async selectDeliveryType() {
        const option = this.testData.orderReport_deliveryType.trim().toLowerCase();
        if (option === 'rush') await this.el.deliveryTypeCheckbox.check();
        else if (option === 'normal') await this.el.deliveryTypeCheckbox.uncheck();
        else throw new Error(`Invalid delivery type: ${this.testData.orderReport_deliveryType}`);
    }

    async completeOrderwithNewcard() {
        await this.el.nextButton.click();
        await this.el.creditCardRadio.check();
        await this.el.cardNumberInput.fill(this.testData.card_number);
        await this.el.cardMonthSelect.selectOption(this.testData.card_month);
        await this.el.cardYearSelect.selectOption(this.testData.card_year);
        await this.el.cardNameInput.fill(this.testData.card_name);

        await this.el.checkboxes.nth(0).check();
        await this.el.checkboxes.nth(1).check();
        await this.el.finishButton.click();
        await this.page.waitForTimeout(6000);
    }

    async addItem() {
        await expect(this.el.addItemButton).toBeVisible();
        await expect(this.el.addItemButton).toBeEnabled();
        await this.el.addItemButton.click();
    }

    async completeOrderwithExistingcard() {
        await this.el.nextButton.click();
        await this.el.creditCardRadio.check();
        if (this.testData.cardLast4) {
            const cardOption = this.page.getByText(this.testData.cardLast4, { exact: false });
            await expect(cardOption).toBeVisible();
            await cardOption.click();
        }
        await this.el.finishButton.click();
        await this.page.waitForTimeout(10000);
    }

    async completeOrderwithPromocode() {

        await this.el.nextButton.click();
        await this.el.creditCardRadio.check();
        await this.el.promoInput.fill(this.testData.promoCode);
        await this.el.applyButton.click();
        await this.el.finishButton.click();
        await this.page.waitForTimeout(10000);
    }

    async orderReportWithPackageCredit() {

        await this.el.nextButton.click();
        await this.el.packageCreditRadio.check();

        if (this.testData.orderReport_deliveryType?.toLowerCase() === 'rush' && this.testData.cardLast4) {
            const cardOption = this.page.getByText(this.testData.cardLast4, { exact: false });
            await expect(cardOption).toBeVisible();
            await cardOption.click();
        }
        await this.el.finishButton.click();
        await this.page.waitForTimeout(10000);
    }

    async orderReportWithInvoice() {

        await this.el.nextButton.click();
        await this.el.invoiceRadio.check();
        await this.el.finishButton.click();
        await this.page.waitForTimeout(10000);
    }

    async verifyOrder() {
        //await this.page.waitForTimeout(10000);
        await expect(this.el.customerInfoTab).toBeVisible();
    }
}
