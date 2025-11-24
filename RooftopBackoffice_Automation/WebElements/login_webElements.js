exports.login_webElements =
    class login_webElements {
        constructor(page) {
            //this.User_email = "//div//input[@name='Username']"
            this.page = page;
        
            this.emailInput = page.getByLabel(/Email/i);      // matches "Email", "Email *", "Email: *"
            this.passwordInput = page.getByLabel(/Password/i); // matches "Password", "Password *"
            this.loginButton = page.locator("//span[@class='rz-button-text']");
            this.productionReport = page.getByText('Production Report');

        }
    }