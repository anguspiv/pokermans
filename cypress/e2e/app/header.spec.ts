describe('header', () => {
  const setup = () => {
    cy.viewport('iphone-6');
    cy.visit('/');
  };

  const setupDesktop = () => {
    cy.viewport('macbook-15');
    cy.visit('/');
  };

  it('should display the header', () => {
    setup();

    cy.findByTestId('app-title').should('contain', 'PokerMans');
  });

  it('should hide the nav menu by default', () => {
    setup();

    cy.findByTestId('app-drawer').should('not.exist');
  });

  it('should open the menu', () => {
    setup();

    cy.findByRole('button', { name: 'Open Menu' }).click();

    cy.findByTestId('app-drawer').should('exist');
  });

  it('should close the menu with menu close button', () => {
    setup();

    cy.findByRole('button', { name: 'Open Menu' }).click();

    cy.findByRole('button', { name: 'Close' }).click();

    cy.findByTestId('app-drawer').should('not.exist');
  });

  it('should hide the header on desktop', () => {
    setupDesktop();

    cy.findByTestId('app-title').should('not.exist');
  });

  it('it should display the sidebar on desktop', () => {
    setupDesktop();

    cy.findByTestId('app-sidebar').should('exist');
  });
});
