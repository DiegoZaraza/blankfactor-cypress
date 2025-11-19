// Page Object Model for Contact Page
export class ContactPage {
  // Selectors
  get pageTitle() { return cy.get('h1[class*="heading"]'); }
  
  // Actions
  verifyPageLoaded() {
    cy.log('Verifying Contact page is loaded');
    cy.url().should('include', 'contact');
    this.pageTitle.should('be.visible');
    return this;
  }
}