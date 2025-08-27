// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
beforeEach(() => {
  // Clear localStorage before each test
  cy.clearLocalStorage();
  
  // Clear cookies before each test
  cy.clearCookies();
  
  // Mock API responses
  cy.intercept('GET', '/api/products*', {
    statusCode: 200,
    body: {
      success: true,
      data: [
        {
          id: '1',
          name: 'Cotton Fabric',
          price: 25.99,
          category: 'cotton',
          images: ['image1.jpg'],
          stock: 100,
          rating: 4.5
        },
        {
          id: '2',
          name: 'Silk Fabric',
          price: 45.99,
          category: 'silk',
          images: ['image2.jpg'],
          stock: 50,
          rating: 4.8
        }
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 2,
        pages: 1
      }
    }
  }).as('getProducts');

  cy.intercept('GET', '/api/categories', {
    statusCode: 200,
    body: {
      success: true,
      data: [
        {
          id: '1',
          name: 'Cotton',
          slug: 'cotton',
          children: []
        },
        {
          id: '2',
          name: 'Silk',
          slug: 'silk',
          children: []
        }
      ]
    }
  }).as('getCategories');
});

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // that are not related to the application being tested
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

// Custom viewport sizes for responsive testing
Cypress.Commands.add('setViewport', (size: 'mobile' | 'tablet' | 'desktop') => {
  const viewports = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 }
  };
  
  cy.viewport(viewports[size].width, viewports[size].height);
});

// Add custom command to the global Cypress namespace
declare global {
  namespace Cypress {
    interface Chainable {
      setViewport(size: 'mobile' | 'tablet' | 'desktop'): Chainable<void>;
    }
  }
}