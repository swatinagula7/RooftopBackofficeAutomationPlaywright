exports.orderReport_elements =
  class orderReport_elements {
    constructor(page) {
      this.page = page;

      // Navigation
      this.orderReportLink = page.getByRole('link', { name: 'Order Reports' });

      // New Customer Section
      this.newCustomerRadio = page.getByRole('radio', { name: 'New Customer' });
      this.emailInput = page.locator('.form-control').first();
      this.passwordInput = page.locator('div:nth-child(2) > .col-sm-6 > .form-control');
      this.confirmPasswordInput = page.locator('div:nth-child(3) > .col-sm-6 > .form-control');
      this.firstNameInput = page.locator('.col-sm-3 > .form-control').first();
      this.lastNameInput = page.locator('div:nth-child(2) > .col-md-12 > .card > .card-body > .card-text > div:nth-child(2) > div > .form-control').first();
      this.companyNameInput = page.locator('input[type="text"]').nth(1);
      this.phoneInput = page.locator('div:nth-child(4) > div > .form-control');
      this.addressInput = page.locator('div:nth-child(4) > .form-control').first();
      this.cityInput = page.locator('div:nth-child(3) > div:nth-child(4) > .form-control');
      this.stateDropdown = page.locator("//div[@class='rz-dropdown valid']");
      this.stateOptionArkansas = page.locator("//li[@aria-label='Arkansas']");
      this.dropdownTrigger = page.locator('.rz-dropdown-trigger');

      this.zipInput = page.locator('div:nth-child(5) > div:nth-child(4) > .form-control');
      this.nextButton = page.getByRole('button', { name: 'Next' });

      // Customer Search
      this.customerCombobox = page.getByRole('combobox');
      this.autocompleteFirstOption = page.locator('li.rz-autocomplete-list-item').first();

      // Location Input
      this.locationInput = page.getByRole('textbox', { name: 'Enter a location' });
      
      this.addressOptions  = page.locator("//div[@class='pac-item']");

      // Report Types
      this.comprehensiveRadio = page.locator('#Comprehensive');
      this.basicRadio = page.locator('#Basic');
      this.standardRadio = page.locator('#Standard');
      this.claimsRadio = page.locator('#Claims');

      // Delivery Type
      this.deliveryTypeCheckbox = page.locator('#DeliveryTypeDTO');

      // Credit Card Section
      this.creditCardRadio = page.getByRole('radio', { name: 'Credit Card' });
      this.cardNumberInput = page.getByRole('textbox', { name: 'Card Number*' });
      this.cardMonthSelect = page.locator('#cardExpiryMonth');
      this.cardYearSelect = page.locator('#cardExpiryYear');
      this.cardNameInput = page.getByRole('textbox', { name: 'Name on Card*' });
      this.checkboxes = page.getByRole('checkbox');
      this.finishButton = page.getByRole('button', { name: 'Finish' });

      // Promo Code Section
      this.promoInput = page.getByRole('textbox', { name: 'Promo Code' });
      this.applyButton = page.getByRole('button', { name: 'Apply' });

      // Package Credit / Invoice
      this.packageCreditRadio = page.getByRole('radio', { name: 'Package Credits' });
      this.invoiceRadio = page.getByRole('radio', { name: 'Invoice' });

      // Misc
      this.addItemButton = page.getByRole('button', { name: 'Add Item' });
      this.customerInfoTab = page.getByRole('tab', { name: 'Customer Info' });
    }
  };
