//TODO Work out how to get around the login system for testing purposes
//TODO Maybe use the NODE_ENV variable to set the login system to test mode if this ENV can be set for tests

describe('Admin Page Tests', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('should render the admin page correctly', () => {
    cy.contains('Set Creation Limit').should('be.visible');
  });

  it('should display loading state initially', () => {
    cy.contains('Loading...').should('be.visible');
  });

  it('should display error message if API fails', () => {
    cy.intercept('GET', '/systemConfig/setCreationLimit', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('getSetCreationConfig');

    cy.visit('/admin');
    cy.wait('@getSetCreationConfig');
    cy.contains('Something went wrong, please try again.').should('be.visible');
  });

  it('should update set creation limit successfully', () => {
    cy.intercept('GET', '/systemConfig/setCreationLimit', {
      statusCode: 200,
      body: { setCreationLimit: 10, creationCounter: 5, date: '2023-10-01' },
    }).as('getSetCreationConfig');

    cy.intercept('PATCH', '/systemConfig/setCreationLimit', {
      statusCode: 200,
      body: { setCreationLimit: 15, creationCounter: 5, date: '2023-10-01' },
    }).as('updateSetCreationLimit');

    cy.visit('/admin');
    cy.wait('@getSetCreationConfig');

    cy.get('input[name="setCreationLimit"]').clear().type('15');
    cy.contains('Save').click();
    cy.wait('@updateSetCreationLimit');
    cy.contains('Set creation limit updated successfully').should('be.visible');
  });

  it('should reset creation counter successfully', () => {
    cy.intercept('GET', '/systemConfig/setCreationLimit', {
      statusCode: 200,
      body: { setCreationLimit: 10, creationCounter: 5, date: '2023-10-01' },
    }).as('getSetCreationConfig');

    cy.intercept('DELETE', '/systemConfig/setCreationLimit', {
      statusCode: 200,
      body: { setCreationLimit: 10, creationCounter: 0, date: '2023-10-01' },
    }).as('resetCreationCounter');

    cy.visit('/admin');
    cy.wait('@getSetCreationConfig');

    cy.contains('Reset Counter').click();
    cy.wait('@resetCreationCounter');
    cy.contains('Creation counter reset successfully').should('be.visible');
  });
});
