const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { orders_webElements } = require('../WebElements/orders_webElements');
const { testData } = require('../TestData/testData');
exports.ordersPage = class ordersPage {
    constructor(page) {
        this.page = page;
        this.el = new orders_webElements(page);
        this.testData = new testData();
    }

    async navigateToAllOrdersPage() {
        await this.el.ordersMenu.click();
        await expect(this.el.allOrdersLink).toBeVisible({ timeout: 6000 });
        await this.el.allOrdersLink.click();
    }

    async exportOrders() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.el.exportButton.click()
        ]);
        const suggestedName = await download.suggestedFilename();
        await download.saveAs(`downloads/${suggestedName}`);
        console.log(`Exported and saved: downloads/${suggestedName}`);
    }

    async searchOrder(orderId) {
        await expect(this.el.orderIdFilter).toBeVisible({ timeout: 6000 });
        await this.el.orderIdFilter.type(orderId, { delay: 100 });
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(4000);
    }

    async view() {
        await expect(this.el.viewBtn).toBeVisible({ timeout: 6000 });
        await this.el.viewBtn.click();
        await this.page.waitForTimeout(6000);
    }

    async updateOrder() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.updateOrder_orderId);
        await this.view();
        await this.page.getByRole('button', { name: 'Update Order' }).click();
        await this.el.zipInput.fill(this.testData.updateOrder_zip);
        await this.el.latLonInput.fill(this.testData.updateOrder_latLon);
        await this.el.ccEmailInput.fill(this.testData.updateOrder_ccemail);
        await expect(this.el.submitBtn).toBeEnabled({ timeout: 10000 });
        await this.el.submitBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async verifySuccessMsg() {
        await expect(this.el.toast).toBeVisible({ timeout: 6000 });
    }

    async resendReceipt() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.resendReceipt);
        await this.view();
        await expect(this.el.resendReceiptBtn).toBeEnabled({ timeout: 10000 });
        await this.el.resendReceiptBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async assignTechnician() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.assigntech_orderId);
        await this.view();
        await this.el.employeeSelect.selectOption({ label: this.testData.technician });
        await expect(this.el.assignBtn).toBeEnabled({ timeout: 10000 });
        await this.el.assignBtn.click();
        await this.page.waitForTimeout(4000);
    }

    async uploadFiles() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.uploadFiles_orderId);
        await this.view();
        await expect(this.el.fileInput).toBeVisible({ timeout: 10000 });
        await this.el.fileInput.setInputFiles([this.testData.uploadFiles_file1, this.testData.uploadFiles_file2]);
        await this.el.uploadFilesBtn.click();
        await this.page.waitForTimeout(10000);
    }
    async changeOrderStatus() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.changeStatus_orderId);
        await this.view();
        await expect(this.el.statusDropdown).toBeVisible({ timeout: 5000 });
        await this.el.statusDropdown.selectOption(this.testData.changeStatus_status);
        await this.el.saveButton.nth(1).click();
        await this.page.waitForTimeout(2000);
    }

    async orderFlow() {
        await this.page.waitForTimeout(6000);

        await expect(this.el.fName).toBeVisible({ timeout: 6000 });
        await this.el.fName.fill(this.testData.orderReport_customerName);
        await this.page.keyboard.press('Enter');

        await expect(this.el.cityFilter).toBeVisible({ timeout: 6000 });
        await this.el.cityFilter.fill(this.testData.orderReport_city);
        await this.page.keyboard.press('Enter');

        await this.page.waitForTimeout(6000);

        await this.view();
        await this.el.employeeSelect.selectOption({ label: this.testData.technician });
        await expect(this.el.assignBtn).toBeEnabled({ timeout: 10000 });
        await this.el.assignBtn.click();
        await this.page.waitForTimeout(4000);

        await expect(this.el.fileInput).toBeVisible({ timeout: 10000 });
        await this.el.fileInput.setInputFiles([this.testData.uploadFiles_file1, this.testData.uploadFiles_file1]);
        await this.el.uploadFilesBtn.click();
        await this.page.waitForTimeout(4000);

        await this.el.deliverBtn.click();
        await this.page.waitForTimeout(4000);
    }



    async downloadFiles() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.downloadOrder);
        await this.view();

        // Target folder to save downloaded files
        const downloadPath = path.join(__dirname, '../fixtures/downloads');
        if (!fs.existsSync(downloadPath)) fs.mkdirSync(downloadPath, { recursive: true });

        // Trigger download of both files (from "Download All Files" button)
        const downloads = [];

        this.page.on('download', download => downloads.push(download));

        await this.page.getByRole('button', { name: 'Download All Files' }).click();

        // Wait until at least 2 files are downloaded (you can adjust number if needed)
        await this.page.waitForFunction(() => window.downloadsCompleted >= 2, null, { timeout: 15000 }).catch(() => { });

        // Save all downloads
        for (const download of downloads) {
            const suggestedName = await download.suggestedFilename();
            const filePath = path.join(downloadPath, suggestedName);
            await download.saveAs(filePath);
            console.log(`✅ Downloaded: ${filePath}`);
        }

        console.log('🎯 All files downloaded successfully.');
    }

    async refundOrder() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.refundId);
        await this.view();
        await this.el.refundBtn.click();
        await this.el.yesButton.click();
        if (this.testData.refund_amount > 0) {
            await this.el.refundAmountInput.fill(this.testData.refund_amount);
            await this.el.submitBtn.click();
        }
        await this.page.waitForTimeout(4000);
    }

    async deliverOrder() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.Orderdelivery_orderId);
        await this.view();
        await this.el.deliverBtn.click();
        await this.page.waitForTimeout(6000);
    }

    async navigateToPage(orderStatus) {
        await this.el.ordersMenu.click();
        await this.el.orderStatusLink(orderStatus).click();
    }
    async navigateToAssigned() {
        await this.navigateToPage(this.testData.orderStatus_Assigned);
      
        
    }
    async navigateToDelivered() {
        await this.navigateToPage(this.testData.orderStatus_Delivered);
    }
    async navigateToInprod() {
        await this.navigateToPage(this.testData.orderStatus_InProduction);
    }
    async navigateToInQue() {
        await this.navigateToPage(this.testData.orderStatus_InQueue);
    }
    async navigateToReceived() {
        await this.navigateToPage(this.testData.orderStatus_OrdersReceived);
    }
    async navigateToInPending() {
        await this.navigateToPage(this.testData.orderStatus_PendingNeedInfo);
    }

    async navigateToQualityControl() {
        await this.navigateToPage(this.testData.orderStatus_QualityControl);
    }

    async navigateToInRefunded() {
        await this.navigateToPage(this.testData.orderStatus_Refunded);
    }




    async verifyOrdersPage() {
        await expect(this.el.ordersHeading).toBeVisible({ timeout: 10000 });
    }

    async selectReportType(reportType) {
        const normalized = reportType?.trim().toLowerCase();
        await this.el.reportTypeRadio(normalized).check();
    }

    async enterQuantity(quantity) {
        await expect(this.el.quantityInput).toBeVisible({ timeout: 5000 });
        await this.el.quantityInput.fill(quantity);
    }

    async toggleRushDelivery(deliveryType) {
        await expect(this.el.rushDeliveryCheckbox).toBeVisible({ timeout: 5000 });
        const isChecked = await this.el.rushDeliveryCheckbox.isChecked();
        if (isChecked !== deliveryType) {
            deliveryType ? await this.el.rushDeliveryCheckbox.check() : await this.el.rushDeliveryCheckbox.uncheck();
        }
    }

    async goToPaymentTab() {
        await this.el.nextBtn.waitFor({ state: 'visible', timeout: 5000 });
        await this.el.nextBtn.click();
    }

    async selectPayment(paymentMethod, cardLast4) {
        if (!paymentMethod) return;
        switch (paymentMethod) {
            case 'Credit Card':
                await this.el.creditCardRadio.check();
                if (cardLast4) await this.page.getByText(cardLast4, { exact: false }).click();
                break;
            case 'No Charge':
                await this.el.noChargeRadio.check();
                break;
            case 'Invoice':
                await this.el.invoiceRadio.check();
                break;
            case 'Package Credit':
                await this.el.packageCreditRadio.check();
                break;
            default:
                throw new Error(`Unsupported payment method: ${paymentMethod}`);
        }
    }

    async submitOrder() {
        if (await this.el.submitBtn.isVisible() && await this.el.submitBtn.isEnabled()) {
            await this.el.submitBtn.click();
        } else if (await this.el.refundBtn.isVisible() && await this.el.refundBtn.isEnabled()) {
            await this.el.refundBtn.click({ delay: 200 });
        }
        await this.page.waitForTimeout(4000);
    }

    async changeOrder() {
        await this.page.waitForTimeout(2000);
        await this.searchOrder(this.testData.changeOrder_orderId);
        await this.view();
        await this.selectReportType(this.testData.changeOrder_reportType);
        await this.enterQuantity(this.testData.changeOrder_quantity);
        await this.toggleRushDelivery(this.testData.changeOrder_deliveryType);
        await this.goToPaymentTab();
        await this.selectPayment(this.testData.changeOrder_paymentMethod, this.testData.cardLast4);
        await this.submitOrder();
        await this.page.waitForTimeout(2000);
    }
}