// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// URL Verification Commands
Cypress.Commands.add('verifyUrlContains', (path) => {
  cy.url({ timeout: 10000 }).should('include', path);
});

// Navigation Commands
Cypress.Commands.add('navigateToMenuSection', (menuItemTitle, sectionTitle) => {
  cy.get(`a[href="${menuItemTitle}"], a[href*="${menuItemTitle}"]`).trigger('mouseover');
  cy.get(`a[title="${sectionTitle}"]`).should('be.visible').click();
});

Cypress.Commands.add('hoverMenuById', (menuId) => {
  cy.get(`#${menuId}`).trigger('mouseover');
});

Cypress.Commands.add('clickLinkByTitle', (linkTitle) => {
  cy.get(`a[title="${linkTitle}"]`).should('be.visible').click();
});

// Wait Commands with better error handling
Cypress.Commands.add('waitForAnimation', (duration = 1000) => {
  cy.wait(duration);
});

// Form Commands
Cypress.Commands.add('fillContactForm', (userData) => {
  cy.get('[name="first_name"]').type(userData.firstName);
  cy.get('[name="last_name"]').type(userData.lastName);
  cy.get('[name="company"]').type(userData.company);
  cy.get('[name="email"]').type(userData.email);
  cy.get('[name="phone"]').type(userData.phone);
  cy.get('[name="your_challenge"]').type(userData.challenge);
  cy.get('[name="privacy_policy_acknowledgement"]').check();
});

// Element visibility and interaction commands
Cypress.Commands.add('scrollToElementAndWait', (selector, options = {}) => {
  const { duration = 1000, waitAfter = 500 } = options;
  cy.get(selector).scrollIntoView({ duration });
  if (waitAfter > 0) {
    cy.wait(waitAfter);
  }
});

// Text extraction and validation
Cypress.Commands.add('getTextAndStore', (selector, aliasName) => {
  cy.get(selector).invoke('text').then((text) => {
    const cleanText = text.trim();
    cy.wrap(cleanText).as(aliasName);
    cy.log(`Stored text as @${aliasName}: ${cleanText}`);
  });
});