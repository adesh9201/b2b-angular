describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should add product to cart', () => {
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart"]').click();
    });
    
    cy.get('[data-cy="cart-count"]').should('contain', '1');
  });

  it('should navigate to cart page', () => {
    cy.get('[data-cy="cart-link"]').click();
    cy.url().should('include', '/cart');
    cy.get('[data-cy="cart-page"]').should('be.visible');
  });

  it('should update cart item quantity', () => {
    // Add item to cart first
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart"]').click();
    });

    cy.visit('/cart');
    cy.get('[data-cy="quantity-input"]').clear().type('3');
    cy.get('[data-cy="update-cart"]').click();
    cy.get('[data-cy="cart-total"]').should('be.visible');
  });

  it('should remove item from cart', () => {
    // Add item to cart first
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart"]').click();
    });

    cy.visit('/cart');
    cy.get('[data-cy="remove-item"]').click();
    cy.get('[data-cy="empty-cart"]').should('be.visible');
  });

  it('should proceed to checkout', () => {
    // Add item to cart first
    cy.get('[data-cy="product-card"]').first().within(() => {
      cy.get('[data-cy="add-to-cart"]').click();
    });

    cy.visit('/cart');
    cy.get('[data-cy="checkout-button"]').click();
    cy.url().should('include', '/checkout');
  });
});