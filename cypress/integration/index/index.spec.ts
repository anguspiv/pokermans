describe('Homepage', () => {
  it('should have a title', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Welcome to Next.js!');
  });
});
