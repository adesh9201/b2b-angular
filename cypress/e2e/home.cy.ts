describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page', () => {
    cy.get('app-navbar').should('be.visible');
    cy.get('app-footer').should('be.visible');
  });

  it('should display hero section', () => {
    cy.get('[data-cy="hero-section"]').should('be.visible');
  });

  it('should display featured products', () => {
    cy.get('[data-cy="featured-products"]').should('be.visible');
    cy.get('[data-cy="product-card"]').should('have.length.greaterThan', 0);
  });

  it('should navigate to product details when clicking on a product', () => {
    cy.get('[data-cy="product-card"]').first().click();
    cy.url().should('include', '/products/');
  });

  it('should display fabric categories', () => {
    cy.get('[data-cy="fabric-categories"]').should('be.visible');
  });

  it('should be responsive on mobile', () => {
    cy.viewport(375, 667);
    cy.get('app-navbar').should('be.visible');
    cy.get('[data-cy="hero-section"]').should('be.visible');
  });
});