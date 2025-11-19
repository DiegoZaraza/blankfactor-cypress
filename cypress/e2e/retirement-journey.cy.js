import { HomePage } from '../support/page-objects/HomePage.js';
import { RetirementPage } from '../support/page-objects/RetirementPage.js';
import { ContactPage } from '../support/page-objects/ContactPage.js';

describe('Blankfactor Website - Retirement Services Journey', () => {
  let testData;
  const homePage = new HomePage();
  const retirementPage = new RetirementPage();
  const contactPage = new ContactPage();

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    homePage.visit().verifyHeaderVisible();
  });

  context('Navigation Tests', () => {
    it('Should navigate from homepage to retirement services', () => {
      homePage.navigateToRetirement();
      retirementPage.verifyUrl();
    });
  });

  context('Content Interaction Tests', () => {
    it('Should extract text from AI & Machine Learning tile', () => {
      homePage.navigateToRetirement();
      retirementPage
        .verifyUrl()
        .scrollToPoweringInnovation()
        .getThirdTileText('aiTileText');
      
      cy.get('@aiTileText').should('include', 'AI');
      cy.get('@aiTileText').then((text) => {
        cy.log('Successfully extracted AI tile text:', text);
      });
    });
  });

  context('Contact Form Tests', () => {
    it('Should complete the full user journey to contact form', () => {
      // Navigation
      homePage.navigateToRetirement();
      retirementPage
        .verifyUrl()
        .scrollToPoweringInnovation()
        .navigateToContact();

      // Contact form verification
      contactPage.verifyPageLoaded();
    });
  });
});