// Test initial load of the landing page
describe('Initial Load Test', () => {
  it('should visit the homepage and check for a specific element', () => {
    cy.visit('/');
    cy.contains('Welcome').should('be.visible');
  });
});