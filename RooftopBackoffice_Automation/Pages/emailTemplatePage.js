// pages/emailTemplatePage.js
const { expect } = require('@playwright/test');
const { emailTemplate_elements } = require('../WebElements/emailTemplate_elements');

exports.emailTemplatePage = class emailTemplatePage {
    constructor(page) {
        this.page = page;
        this.el = new emailTemplate_elements(page);
    }

    async navigateToEmailTemplate() {
        // Click on Settings
        await expect(this.el.settingsButton).toBeVisible({ timeout: 10000 });
        await this.el.settingsButton.click();

        // Click on Email Templates
        await expect(this.el.emailTemplatesLink).toBeVisible({ timeout: 10000 });
        await this.el.emailTemplatesLink.click();

        // Verify page heading
        await expect(this.el.emailTemplateHeading).toBeVisible({ timeout: 10000 });
    }
};
