exports.credits_webElements =
  class credits_webElements {
    constructor(page) {
      this.page = page;

      // Navigation elements
      this.creditsButton = page.getByRole('button', { name: 'Credits ' });
      this.orderCreditsLink = page.getByRole('link', { name: 'Order Credits' });
      this.allCreditsLink = page.getByRole('link', { name: 'All Credits' });

      // Common
      this.toastMessage = page.locator('.rz-notification');
      this.headingCreditsManager = page.getByRole('heading', { name: 'Credits Manager' });

      // Refund/Update
      this.filterInput = page.locator("(//div[contains(@class,'rz-cell-filter')])[2]//input");
      this.accountButton = page.getByRole('cell', { name: 'account_circle' }).getByRole('button').nth(1);
      this.refundMenuItem = page.getByRole('menuitem', { name: 'Refund' });
      this.updateMenuItem = page.getByRole('menuitem', { name: 'Update' });
      this.remainingInput = page.locator("(//input[@id='Remaining'])[1]");
      this.submitButton = page.getByRole('button', { name: 'Submit' });

      // Order Credits Page
      this.employeeCombobox = page.getByRole('combobox');
      this.reportRadio = (report) => page.getByRole('radio', { name: report.toUpperCase() });
      this.nextButton = page.getByRole('button', { name: 'Next' });
      this.finishButton = page.getByRole('button', { name: 'Finish' });
      this.creditCardRadio = page.getByRole('radio', { name: 'Credit Card' });
      this.invoiceRadio = page.getByRole('radio', { name: 'Invoice' });
      this.manualPriceRadio = page.getByRole('radio', { name: 'Manually Set the Price for' });
      this.packagePriceInput = page.getByRole('textbox', { name: 'Package Price*' });
      this.quantityInput = page.getByRole('textbox', { name: 'Quantity*' });
      this.promoCodeInput = page.getByRole('textbox', { name: 'Promo Code' });
      this.applyButton = page.getByRole('button', { name: 'Apply' });

      // Credit card fields
      this.cardNumber = page.locator('#cardnumber');
      this.cardMonth = page.locator('#cardExpiryMonth');
      this.cardYear = page.locator('#cardExpiryYear');
      this.cardName = page.locator('#cardname');

      // Export button
      this.exportButton = page.getByRole('button', { name: 'grid_on Export' });
    }
  };
