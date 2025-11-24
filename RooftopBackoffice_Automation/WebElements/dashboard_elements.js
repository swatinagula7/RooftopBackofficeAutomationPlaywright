exports.dashboard_elements = class dashboard_elements {
  constructor(page) {
    this.page = page;

    // ----- Navigation Links -----
    this.productionSnapshotLink = page.getByRole('link', { name: 'Production Snapshot' });
    this.salesStatisticsLink = page.getByRole('link', { name: 'Sales Statistics' });

    // ----- Production Snapshot Page -----
    this.productionReportHeading = page.getByText('Production Report');
    this.productionDropdown = page.locator('.rz-dropdown');
    this.ytdOption = page.getByRole('option', { name: 'YTD' });

    // ----- Sales Statistics Page -----
    this.salesStatisticsHeading = page.getByRole('article').getByText('Sales Statistics');
    this.salesDropdown = page.locator('.rz-dropdown-trigger');
    this.wtdOption = page.getByRole('option', { name: 'WTD' });
    this.mtdOption = page.getByRole('option', { name: 'MTD' });
    this.salesYtdOption = page.getByRole('option', { name: 'YTD' });
  }
};
