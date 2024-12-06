import React from 'react';
import { mount } from 'cypress/react';
import BackButton from '../../src/components/core/BackButton';
import { BrowserRouter as Router } from 'react-router-dom';

describe('BackButton Component', () => {
  it('renders with default props', () => {
    mount(
      <Router>
        <BackButton backFactor={-1} />
      </Router>
    );
    cy.get('button').should('exist');
  });

  it('renders with custom label and icon', () => {
    mount(
      <Router>
        <BackButton label="Go Back" icon="pi pi-arrow-left" backFactor={-1} />
      </Router>
    );
    cy.get('button').contains('Go Back');
    cy.get('button .pi-arrow-left').should('exist');
  });

  it('navigates back when clicked', () => {
    mount(
      <Router>
        <BackButton backFactor={-1} />
      </Router>
    );
    cy.get('button').click();
  });

  it('applies severity class', () => {
    mount(
      <Router>
        <BackButton severity="danger" backFactor={-1} />
      </Router>
    );
    cy.get('button').should('have.class', 'p-button-danger');
  });

  it('is disabled when disabled prop is true', () => {
    mount(
      <Router>
        <BackButton disabled={true} backFactor={-1} />
      </Router>
    );
    cy.get('button').should('be.disabled');
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    mount(
      <Router>
        <BackButton style={customStyle} backFactor={-1} />
      </Router>
    );
    cy.get('button').should('have.css', 'background-color', 'red');
  });

  it('renders with badge', () => {
    mount(
      <Router>
        <BackButton badgeValue="5" badgeClassName="p-badge-danger" backFactor={-1} />
      </Router>
    );
    cy.get('.p-badge-danger').contains('5');
  });
});