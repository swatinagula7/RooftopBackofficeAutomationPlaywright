import { expect } from '@playwright/test'
import { login_webElements } from '../WebElements/login_webElements'
import { testData } from '../TestData/testData.js'

exports.logIn_page =
    class logIn_page {
        constructor(page) {
            this.page = page;
            this.loginElements = new login_webElements(page);
            this.testData = new testData();
        }

        async gotoLogin() {
            //await this.page.setViewportSize({ width: 1500, height: 1000 });
            await this.page.goto(this.testData.URL);
            await this.loginElements.emailInput.waitFor({ state: 'visible', timeout: 40000 });
        }

        async login() {
            await this.loginElements.emailInput.fill(this.testData.email, { timeout: 40000 });
            await this.loginElements.passwordInput.fill(this.testData.password, { timeout: 40000 });
            await this.loginElements.loginButton.click();
            await this.page.waitForLoadState('networkidle');
        }

        async verifyLoginSuccess() {
            await expect(this.loginElements.productionReport).toBeVisible({ timeout: 15000 });
        }
    }



