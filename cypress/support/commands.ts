/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to login as a user
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>
      
      /**
       * Custom command to login as a vendor
       * @example cy.loginAsVendor()
       */
      loginAsVendor(): Chainable<void>
      
      /**
       * Custom command to add product to cart
       * @example cy.addToCart('product-id')
       */
      addToCart(productId: string): Chainable<void>
      
      /**
       * Custom command to wait for API response
       * @example cy.waitForApi('@getProducts')
       */
      waitForApi(alias: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: {
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: 'user-1',
        email: email,
        role: 'buyer'
      }
    }
  }).as('login');

  cy.visit('/login');
  cy.dataCy('email-input').type(email);
  cy.dataCy('password-input').type(password);
  cy.dataCy('login-button').click();
  cy.wait('@login');
});

Cypress.Commands.add('loginAsVendor', () => {
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
  cy.dataCy('email-input').type('vendor@example.com');
  cy.dataCy('password-input').type('password123');
  cy.dataCy('login-button').click();
  cy.wait('@vendorLogin');
});

Cypress.Commands.add('addToCart', (productId: string) => {
  cy.intercept('POST', `/api/cart/items`, {
    statusCode: 200,
    body: { success: true }
  }).as('addToCart');

  cy.dataCy(`add-to-cart-${productId}`).click();
  cy.wait('@addToCart');
});

Cypress.Commands.add('waitForApi', (alias: string) => {
  cy.wait(alias).then((interception) => {
    expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
  });
});

export {};