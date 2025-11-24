exports.employee_elements =
  class employee_elements {
    constructor(page) {
      this.page = page;

      // Navigation
      this.settingsButton = page.getByRole('button', { name: 'Settings ' });
      this.employeesLink = page.getByRole('link', { name: 'Employees' });
      this.employeesHeading = page.getByRole('heading', { name: 'Employees' });

      // Common
      this.toastMessage = page.locator('.rz-notification');
      this.exportButton = page.getByRole('button', { name: 'grid_on Export' });

      // Form elements
      this.addEmployeeButton = page.getByRole('button', { name: '+ Add Employee' });
      this.nameInput = page.getByRole('textbox', { name: 'Name*' });
      this.emailInput = page.getByRole('textbox', { name: 'Email*' });
      this.phoneInput = page.getByRole('textbox', { name: 'Phone' });
      this.passwordInput = page.getByRole('textbox', { name: 'Password*', exact: true });
      this.repeatPasswordInput = page.getByRole('textbox', { name: 'RepeatPassword*' });
      this.roleDropdown = page.getByLabel('Role');
      this.createButton = page.getByRole('button', { name: 'Create' });
      this.updateButton = page.getByRole('button', { name: 'Update' });
      this.deleteButton = page.getByRole('button', { name: 'Delete' });
      this.activateButton = page.getByRole('button', { name: 'Activate' });
      this.deactivateButton = page.getByRole('button', { name: 'Deactivate' });
      this.saveButton = page.getByRole('button', { name: 'Save' });
      this.yesButton = page.getByRole('button', { name: 'Yes' });
      this.clearFilterIcon = page.locator("//i[@class='rz-dropdown-clear-icon rzi rzi-times']");
      this.searchBox = page.getByLabel('', { exact: true }).nth(2);

      // Employee verification
      this.empNameCell = page.locator(
        'body > div:nth-child(1) > div:nth-child(1) > main:nth-child(2) > article:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(2)'
      );
    }
  };
