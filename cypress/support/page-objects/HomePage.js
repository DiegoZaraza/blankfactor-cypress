// Page Object Model for Home Page
export class HomePage {
  // Selectors
  get header() { return cy.get('header'); }
  get retirementMenuItem() { return cy.get('#menu-item-4871'); }
  get retirementLink() { return cy.get('a[title="Retirement and wealth"]'); }
  
  // Actions
  visit() {
    cy.visit('/');
    return this;
  }
  
  verifyHeaderVisible() {
    this.header.should('be.visible');
    return this;
  }
  
  navigateToRetirement() {
    cy.log('Navigating to Retirement and Wealth section');
    this.retirementMenuItem.trigger('mouseover');
    this.retirementLink.should('be.visible').click();
    return this;
  }
}