describe('Cinema app tests', () => {
  let selectors;
  let auth;

  before(() => {
    cy.fixture('selectors').then(sel => selectors = sel);
    cy.fixture('authInfo.json').then(a => auth = a);
  });

  it('Main page correct display', () => {
    cy.visit('/');
    cy.contains(selectors.mainPage.logoText).should('be.visible');
    cy.get(selectors.mainPage.navLinks).should('have.length', 7);
  });

  it('Successful login', () => {
    cy.visit(selectors.adminPage.url);
    const valid = auth[0];
    cy.login(valid.email, valid.password);
    cy.contains(selectors.adminPage.adminTitle).should('be.visible');
  });

  it('Unsuccessful login', () => {
    cy.visit(selectors.adminPage.url);
    const invalid = auth[1];
    cy.login(invalid.email, invalid.password);
    cy.contains(selectors.adminPage.loginError).should('be.visible');
  });

  it('Booking a ticket in the hall from admin', () => {
    cy.visit(selectors.adminPage.url);
    const valid = auth[0];
    cy.login(valid.email, valid.password);

    cy.get(selectors.adminPage.hallTitleSelector).invoke('text').then((hallTitleFromAdmin) => {
      const hallTitle = hallTitleFromAdmin.trim();

      cy.visit(selectors.clientPage.url);
      cy.get(selectors.clientPage.navLinks).eq(selectors.clientPage.sessionNavLinkIndex).click();

      cy.get(selectors.clientPage.hallTitle)
        .should('have.text', hallTitle);

      cy.contains(selectors.clientPage.hallTitleByText, hallTitle)
        .closest(selectors.clientPage.hallContainer)
        .find(selectors.clientPage.sessionTime)
        .contains('14:30')
        .click();

      cy.url().should('include', selectors.urls.hallPage);

      cy.get(selectors.clientPage.selectSeat).click();
      cy.get(selectors.clientPage.acceptButton).click();

      cy.url().should('include', selectors.urls.paymentPage);

      cy.contains(hallTitle).should('exist');
    });
  });
});
