// Page Object Model for Retirement Page
export class RetirementPage {
  // Selectors
  get poweringInnovationSection() { 
    return cy.contains('Powering innovation in retirement services'); 
  }
  get swiperSlides() { 
    return cy.get('.swiper-wrapper .swiper-slide'); 
  }
  get flipCards() { 
    return cy.get('.flip-card-inner'); 
  }
  get footerHeader() { 
    return cy.get('.footer__header'); 
  }
  get letsGetStartedBtn() { 
    return cy.get('a[title="Let\'s get started"]'); 
  }
  
  // Actions
  verifyUrl() {
    cy.log('Verifying URL contains retirement');
    cy.verifyUrlContains('retirement');
    return this;
  }
  
  scrollToPoweringInnovation() {
    cy.log('Scrolling to Powering Innovation section');
    this.poweringInnovationSection.scrollIntoView({ duration: 1000 });
    cy.wait(1500);
    return this;
  }
  
  getThirdTileText(aliasName = 'copiedText') {
    cy.log('Extracting text from the 3rd tile');
    this.flipCards.eq(2).invoke("text").then((text) => {
      const aiText = text.trim();
      cy.log(`Extracted text from 3rd tile: ${aiText}`);
      cy.wrap(aiText).as(aliasName);
    });
    return this;
  }
  
  navigateToContact() {
    cy.log('Navigating to Contact page via Let\'s get started button');
    this.footerHeader
      .scrollIntoView({ duration: 1000 })
      .should('be.visible')
      .then(() => {
        this.letsGetStartedBtn.click();
      });
    return this;
  }
}