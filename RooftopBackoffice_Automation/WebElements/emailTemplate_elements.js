// WebElements/emailTemplate_elements.js

exports.emailTemplate_elements = class emailTemplate_elements {
  constructor(page) {
    this.page = page;

    // ----- Settings & Navigation -----
    this.settingsButton = page.getByRole('button', { name: 'Settings ' });
    this.emailTemplatesLink = page.getByRole('link', { name: 'Email Templates' });

    // ----- Page Heading -----
    this.emailTemplateHeading = page.getByRole('heading', { name: 'Email Template Manage' });
  }
};
