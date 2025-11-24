exports.customer_elements =
  class customer_elements {
    constructor(page) {
      this.page = page;

      // Navigation
      this.customersTab = page.getByRole('link', { name: 'Customers' });

      // Add Customer
      this.addCustomerButton = page.getByRole('button', { name: '+ Add Customer' });
      this.companyName = page.getByRole('textbox', { name: 'Company Name*' });
      this.firstName = page.getByRole('textbox', { name: 'First Name*' });
      this.lastName = page.getByRole('textbox', { name: 'Last Name*' });
      this.email = page.getByRole('textbox', { name: 'Email*' });
      this.phone = page.getByRole('textbox', { name: 'Phone1*' });
      this.address = page.getByRole('textbox', { name: 'StreetAddress1*' });
      this.city = page.getByRole('textbox', { name: 'City*' });
      this.stateDropdown = page.locator("//div[@class='rz-dropdown valid']");
      this.stateOption = (state) => page.getByText(state);
      this.zip = page.getByRole('textbox', { name: 'ZipCode*' });
      this.password = page.getByRole('textbox', { name: 'Password*', exact: true });
      this.repeatPassword = page.getByRole('textbox', { name: 'Repeat Password*' });
      this.createButton = page.getByRole('button', { name: 'Create' });

      // Verification
      this.firstCustomerName = page.locator(
        '//body[1]/div[1]/div[1]/main[1]/article[1]/div[1]/div[2]/div[1]/div[2]/table[1]/tbody[1]/tr[1]/td[2]'
      );

      // Search
      this.customerSearchBox = page.getByLabel('', { exact: true }).nth(2);
      this.customerRow = (email) => page.locator(`tr:has-text("${email}")`);

      // View
      this.viewButton = page.getByRole('button', { name: 'View' });
      // ----- Update CC Email -----
      this.ccEmailRow = (oldEmail) => page.locator('tr', { hasText: oldEmail });
      this.updateCC = (oldEmail) => this.ccEmailRow(oldEmail).getByRole('button', { name: 'Update' });
      this.emailInput = page.getByRole('textbox', { name: 'Email' });
      this.submitButton = page.getByRole('button', { name: 'Submit' });

      // ----- Add Card -----
      this.addCardButton = page.getByRole('button', { name: 'Add Card' });
      this.cardNumberInput = page.getByRole('textbox', { name: 'Card Number* Name on Card*' });
      this.cardMonthSelect = page.locator('#cardExpiryMonth');
      this.cardYearSelect = page.locator('#cardExpiryYear');
      this.defaultCardCheckbox = page.getByRole('checkbox', { name: 'IsDefault' });
      this.cardNameInput = page.locator('#cardnumber').nth(1);
      this.saveButton = page.getByRole('button', { name: 'Save' });

      // Toast message
      this.toastMessage = page.locator('.rz-notification');

      // CC Email Management
      this.addCCEmailButton = page.getByRole('button', { name: 'Add CC Email' });
      this.ccEmailInput = page.getByRole('textbox', { name: 'Email' });
      this.alwaysCCCheckbox = page.getByRole('checkbox', { name: 'Always CC' });
      this.addButton = page.getByRole('button', { name: 'Add', exact: true });
      this.saveButton = page.getByRole('button', { name: 'Save' });
      this.deleteCCButton = page.getByRole('cell', { name: 'Delete' }).getByRole('button');
      this.confirmYesButton = page.getByRole('button', { name: 'Yes' });

      // Update Customer
      this.updateButton = page.getByRole('button', { name: 'Update' });
      this.phoneInput = page.getByRole('textbox', { name: 'Phone1*' });
      this.submitButton = page.getByRole('button', { name: 'Submit' });

      // Activate / Deactivate / Delete
      this.deactivateButton = page.getByRole('button', { name: 'Deactivate' });
      this.activateButton = page.getByRole('button', { name: 'Activate' });
     // this.deleteButton = page.getByRole('button', { name: 'Delete' });
      this.deleteButton = page.locator("(//span[contains(text(),'Delete')])[1]");  //

      // Order History
      this.orderHistoryTab = page.getByRole('tab', { name: 'Customer Order History' });
      this.customerHistoryHeading = page.getByRole('heading', { name: 'Customer History' });

      // Export
      this.exportButton = page.getByRole('button', { name: 'grid_on Export' });
    }
  };
