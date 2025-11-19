describe("Blankfactor Website Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Verifies the presence of the main header", () => {
    cy.get("header").should("be.visible");
    cy.get("#menu-item-4871").trigger("mouseover");
    cy.get('a[title="Retirement and wealth"]').click();

    cy.url().should("include", "retirement");

    cy.contains("Powering innovation in retirement services").scrollIntoView({
      duration: 1000,
    });

    cy.wait(1500);

    // Get all slides in this section
    cy.get(".swiper-wrapper .swiper-slide")
      .eq(2) // 3rd tile
      .scrollIntoView();

    cy.wait(800); // Critical: wait for flip animation

    cy.get(".flip-card-inner")
      .eq(2)
      .invoke("text")
      .then((text) => {
        const aiText = text.trim();
        cy.wrap(aiText).as("copiedText");
      });

    cy.get(".footer__header")
      .scrollIntoView({ duration: 1000 })
      .should("be.visible")
      .then(() => {
        cy.get('a[title="Let\'s get started"]').click();
      });

    cy.url().should("include", "contact");
    cy.contains('h1', "Let’s talk").should("be.visible");
  });
});
