exports.orders_webElements = class orders_webElements {
    constructor(page) {
        this.page = page;

        // === Navigation ===
        this.ordersMenu = page.getByRole('button', { name: 'Orders ' });
        this.allOrdersLink = page.getByRole('link', { name: 'All Orders' });
        this.exportButton = page.getByRole('button', { name: 'grid_on Export' });

        // === Filters ===
        this.orderIdFilter = page.locator("(//div[contains(@class,'rz-cell-filter')])[2]//input");
        this.cityFilter = page.locator("(//div[contains(@class,'rz-cell-filter')])[9]//input");
        this.fName = page.locator("(//div[contains(@class,'rz-cell-filter')])[5]//input");

        // === Common Buttons ===
        //this.viewBtn = page.locator("(//a[@class='btn btn-sm'][normalize-space()='View'])[1]");
        //this.viewBtn = page.getByRole('button', { name: 'View' });
         this.viewBtn = page.locator("(//a[contains(text(),'View')])[1]");
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
        this.uploadFilesBtn = page.getByRole('button', { name: 'Upload Files' });
        this.deliverBtn = page.getByRole('button', { name: 'Deliver' });
        this.refundBtn = page.getByRole('button', { name: 'Refund' });
        this.yesButton = page.getByRole('button', { name: 'Yes' }).nth(1);
        this.assignBtn = page.getByRole('button', { name: 'Assign', exact: true });
        this.resendReceiptBtn = page.getByRole('button', { name: 'Resend Receipt' });
        this.nextBtn = page.getByRole('button', { name: 'Next' });

        // === Inputs / Dropdowns ===
        this.zipInput = page.getByRole('textbox', { name: 'Zip:' });
        this.latLonInput = page.getByRole('textbox', { name: 'Lat, Lon:' });
        this.ccEmailInput = page.locator("input[type='text']").nth(1);
        this.fileInput = page.locator("input[type='file']");
        this.statusDropdown = page.locator("#SelectStatus");
        this.employeeSelect = page.locator("#SelectEmployee");
        this.refundAmountInput = page.getByRole('spinbutton', { name: 'Refund Amount $' });
        this.quantityInput = page.locator('#quantity');

        // === Radio Buttons ===
        this.creditCardRadio = page.getByRole('radio', { name: 'Credit Card' });
        this.noChargeRadio = page.getByRole('radio', { name: 'No Charge' });
        this.invoiceRadio = page.getByRole('radio', { name: 'Invoice' });
        this.packageCreditRadio = page.getByRole('radio', { name: 'Package Credit' });
        this.rushDeliveryCheckbox = page.getByRole('checkbox', { name: 'Rush Delivery' });

        // === Dynamic Radio Selection (Report Type) ===
        this.reportTypeRadio = (type) => {
            switch (type) {
                case 'claims': return page.getByRole('radio', { name: 'Claims' });
                case 'comprehensive': return page.getByRole('radio', { name: 'Comprehensive' });
                case 'basic': return page.getByRole('radio', { name: 'Basic' });
                case 'standard': return page.getByRole('radio', { name: 'Standard' });
                default: throw new Error(`Invalid report type: ${type}`);
            }
        };

        // === Dynamic Links (Order Status Navigation) ===
        this.orderStatusLink = (statusName) => page.getByRole('link', { name: statusName });

        // === Toast / Notification ===
        this.toast = page.locator('.rz-notification');

        // === Heading ===
        this.ordersHeading = page.getByRole('heading', { name: 'Orders' });
    }
};
