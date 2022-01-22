describe('header', () => {
  it('should display the app name', () => {
    cy.visit('/');

    cy.findByTestId('app-title').should('contain', 'Pokermans');
  });

  it('should hide the nav menu by default', () => {
    cy.visit('/');

    cy.findByTestId('app-drawer').should('not.exist');
  });

  it('should open the menu', () => {
    cy.visit('/');

    cy.findByRole('button', { name: 'Open Menu' }).click();

    cy.findByTestId('app-drawer').should('exist');
  });

  it('should close the menu with menu close button', () => {
    cy.visit('/');

    cy.findByRole('button', { name: 'Open Menu' }).click();

    cy.findByRole('button', { name: 'Close' }).click();

    cy.findByTestId('app-drawer').should('not.exist');
  });

  it('should close the menu clicking outside menu', () => {
    cy.visit('/');

    cy.findByRole('button', { name: 'Open Menu' }).click();

    cy.findByTestId('app-drawer').should('exist');

    cy.get('body').click();

    cy.findByTestId('app-drawer').should('not.exist');
  });
});
