exports.promocode_elements = class promocode_elements {
  constructor(page) {
    this.page = page;

    // Toast
    this.toast = page.locator('.rz-notification');

    // Navigation
    this.settingsBtn = page.getByRole('button', { name: 'Settings ' });
    this.promoLink = page.getByRole('link', { name: 'Promo Codes' });
    this.promoManagerHeading = page.getByRole('heading', { name: 'Promo Code Manager' });

    // Add Promo
    this.addPromoBtn = page.getByRole('button', { name: '+ Add PromoCode' });

    // Radio Buttons
    this.radioOrder = page.getByRole('radio', { name: 'Order', exact: true });
    this.radioAccountCredits = page.getByRole('radio', { name: 'Account Credits' });
    this.radioRushDelivery = page.getByRole('radio', { name: 'Rush Delivery Type' });
    this.getRadioByName = (name) => page.getByRole('radio', { name: name });

    // Create Promo Fields
    this.enterPromoCode = page.getByRole('textbox', { name: 'Enter Promo Code' });
    this.enterDesc = page.getByRole('textbox', { name: 'Enter Description Promo Code' });
    this.typeDropdown = page.getByRole('combobox');
    this.valueInput = page.getByPlaceholder('$');
    this.startDateInput = page.getByRole('textbox', { name: 'Start Date*' });
    this.endDateInput = page.getByRole('textbox', { name: 'End Date' });
    this.checkboxes = page.getByRole('checkbox');
    this.limitInput = page.getByRole('spinbutton').nth(2);
    this.saveBtn = page.getByRole('button', { name: 'Save' });

    // Common Actions
    this.actionCell = page.getByRole('cell', { name: 'account_circle' });
    this.actionButton = (nth = 1) => this.actionCell.getByRole('button').nth(nth);

    // Menus
    this.deactivateMenu = page.getByRole('menuitem', { name: 'DeActivate' }).locator('a');
    this.activateMenu = page.getByRole('menuitem', { name: 'Activate' }).locator('a');
    this.deleteMenu = page.getByRole('menuitem', { name: 'Delete' }).locator('a');
    this.historyMenu = page.getByRole('menuitem', { name: 'History' }).locator('a');

    // Buttons
    this.yesBtn = page.getByRole('button', { name: 'Yes' }).nth(1);

    // Search
    this.searchBox = page.getByLabel('', { exact: true }).first();

    // History
    this.promoHistoryHeading = page.getByRole('heading', { name: 'Promo Code History' });
  }
};
