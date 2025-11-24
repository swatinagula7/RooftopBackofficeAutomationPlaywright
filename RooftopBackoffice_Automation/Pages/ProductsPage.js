const { test,expect } = require('@playwright/test');
const { products_elements } = require('../WebElements/products_elements');
exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.el = new products_elements(page);
  }

  async navigateToProductsPage() {
    await expect(this.el.settingsButton).toBeVisible({ timeout: 10000 });
    await this.el.settingsButton.click();

    await expect(this.el.productsLink).toBeVisible({ timeout: 10000 });
    await this.el.productsLink.click();

    await expect(this.el.productsHeading).toBeVisible({ timeout: 10000 });
  }
}