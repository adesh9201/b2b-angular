describe('Vendor Dashboard', () => {
  beforeEach(() => {
    // Mock vendor login
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        token: 'mock-jwt-token',
        user: {
          id: 'vendor-1',
          email: 'vendor@example.com',
          role: 'vendor'
        }
      }
    }).as('vendorLogin');

    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('vendor@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="login-button"]').click();
    cy.wait('@vendorLogin');
  });

  it('should display vendor dashboard', () => {
    cy.visit('/vendor/dashboard');
    cy.get('[data-cy="vendor-dashboard"]').should('be.visible');
  });

  it('should display dashboard metrics', () => {
    cy.visit('/vendor/dashboard');
    cy.get('[data-cy="total-orders"]').should('be.visible');
    cy.get('[data-cy="total-revenue"]').should('be.visible');
    cy.get('[data-cy="total-products"]').should('be.visible');
  });

  it('should navigate to orders page', () => {
    cy.visit('/vendor/dashboard');
    cy.get('[data-cy="orders-link"]').click();
    cy.url().should('include', '/vendor/order');
    cy.get('[data-cy="orders-page"]').should('be.visible');
  });

  it('should navigate to inventory page', () => {
    cy.visit('/vendor/dashboard');
    cy.get('[data-cy="inventory-link"]').click();
    cy.url().should('include', '/vendor/inventory');
    cy.get('[data-cy="inventory-page"]').should('be.visible');
  });

  it('should display recent orders', () => {
    cy.visit('/vendor/dashboard');
    cy.get('[data-cy="recent-orders"]').should('be.visible');
  });

  it('should display analytics charts', () => {
    cy.visit('/vendor/dashboard');
    cy.get('[data-cy="sales-chart"]').should('be.visible');
    cy.get('[data-cy="revenue-chart"]').should('be.visible');
  });
});