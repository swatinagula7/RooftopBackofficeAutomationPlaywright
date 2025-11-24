exports.products_elements =
  class products_elements {
    constructor(page) {
      this.page = page;

      // Navigation
      this.settingsButton = page.getByRole('button', { name: 'Settings ' });
      this.productsLink = page.getByRole('link', { name: 'Products' });

      // Page verification
      this.productsHeading = page.getByRole('heading', { name: 'Product Manager' });
    }
  };
