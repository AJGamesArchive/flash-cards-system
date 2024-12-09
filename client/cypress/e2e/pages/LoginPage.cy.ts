//TODO Fix issues where by buttons with the same text label conflict
//TODO Fix issue with mock requests not triggering correctly

// Test login page render and core functionality
describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should render the login page correctly', () => {
    cy.contains('Welcome').should('be.visible');
    cy.contains('Please login or create an account!').should('be.visible');
    cy.contains('Login').should('be.visible');
    cy.contains('Help').should('be.visible');
  });

  it('should open the login dialog when "User Login" is clicked', () => {
    cy.contains('Login').click();
    cy.contains('User Login').click();
    cy.contains('Please enter your credentials:').should('be.visible');
    cy.get('#login-username').should('be.visible');
    cy.get('#login-password').should('be.visible');
  });

  it('should open the account creation dialog when "Create an Account" is clicked', () => {
    cy.contains('Login').click();
    cy.contains('Create an Account').click();
    cy.contains('Please create a username and password:').should('be.visible');
    cy.get('#account-create-username').should('be.visible');
    cy.get('#account-create-password').should('be.visible');
    cy.get('#account-create-password-confirm').should('be.visible');
  });

  it('should show error message for unimplemented features', () => {
    cy.contains('Login').click();
    cy.contains('Generate API Key').click();
    cy.contains('Feature Not Implemented Yet').should('be.visible');
  });

  it('should show error message for forgot password', () => {
    cy.contains('Help').click();
    cy.contains('Forgot Password').click();
    cy.contains('Feature Not Implemented Yet').should('be.visible');
  });

  it('should login with valid credentials', () => {
    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: { success: true, token: 'fake-jwt-token' },
    }).as('loginRequest');

    cy.contains('Login').click();
    cy.contains('User Login').click();
    cy.get('#login-username').type('validUsername');
    cy.get('#login-password').type('validPassword');
    cy.contains('Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.contains('Welcome, validUsername').should('be.visible');
  });

  it('should show error for invalid login credentials', () => {
    cy.contains('Login').click();
    cy.contains('User Login').click();
    cy.get('#login-username').type('invalidUsername');
    cy.get('#login-password').type('invalidPassword');
    cy.contains('Login').click();
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should create an account with valid details', () => {
    cy.intercept('POST', '/users', {
      statusCode: 201,
      body: { success: true },
    }).as('creationRequest');

    cy.contains('Login').click();
    cy.contains('Create an Account').click();
    cy.get('#account-create-username').type('newUsername');
    cy.get('#account-create-password').type('newPassword');
    cy.get('#account-create-password-confirm').type('newPassword');
    cy.contains('Create').click();

    cy.wait('@creationRequest').its('response.statusCode').should('eq', 201);
    cy.contains('Verification Required').should('be.visible');
  });

  it('should show error for mismatched passwords during account creation', () => {
    cy.contains('Login').click();
    cy.contains('Create an Account').click();
    cy.get('#account-create-username').type('newUsername');
    cy.get('#account-create-password').type('newPassword');
    cy.get('#account-create-password-confirm').type('differentPassword');
    cy.contains('Create').click();
    cy.contains('Entered passwords do not match. Please re-enter your passwords.').should('be.visible');
  });
});