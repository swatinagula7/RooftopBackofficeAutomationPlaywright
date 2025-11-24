// pages/dashboardPage.js
const { expect } = require('@playwright/test');
const { dashboard_elements } = require('../WebElements/dashboard_elements');

exports.dashboardPage = class dashboardPage {
  constructor(page) {
    this.page = page;
    this.el = new dashboard_elements(page);
  }

  async navigateToPrductionSnapshotPage() {
    await this.el.productionSnapshotLink.click();
    await this.page.waitForTimeout(4000);

    await expect(this.el.productionReportHeading).toBeVisible({ timeout: 15000 });

    await expect(this.el.productionDropdown).toBeVisible({ timeout: 10000 });
    await this.el.productionDropdown.click();

    await expect(this.el.ytdOption).toBeVisible({ timeout: 10000 });
    await this.el.ytdOption.click();
  }

  async navigateToSalesStatisticPage() {
    await this.el.salesStatisticsLink.click();
    await expect(this.el.salesStatisticsHeading).toBeVisible({ timeout: 15000 });

    await expect(this.el.salesDropdown).toBeVisible({ timeout: 10000 });

    await this.el.salesDropdown.click();
    await this.el.wtdOption.click();

    await this.el.salesDropdown.click();
    await this.el.mtdOption.click();

    await this.el.salesDropdown.click();
    await this.el.salesYtdOption.click();
  }
};
