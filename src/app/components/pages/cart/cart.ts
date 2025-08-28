import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem, OrderSummary } from '../../core/models/cart.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  orderSummary!: OrderSummary;
  promoMessage = '';
  isLoading: boolean = false;
  error: string | null = null;
  promoCode: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.isLoading = true;
    this.error = null;
    
    try {
      this.cartService.getCartItems().subscribe({
        next: (items) => {
          this.cartItems = items;
          this.updateSummary();
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load cart items';
          this.isLoading = false;
          console.error('Error loading cart items:', err);
        }
      });
    } catch (err) {
      this.error = 'Failed to load cart items';
      this.isLoading = false;
      console.error('Error loading cart items:', err);
    }
  }

  updateQuantity(item: CartItem, qty: number) {
    if (qty < 1) qty = 1;
    if (qty > 99) qty = 99; // Limit maximum quantity
    
    try {
      this.cartService.updateQuantity(item.id, qty);
      this.updateSummary();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  }

  increaseQuantity(item: CartItem) {
    this.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.updateQuantity(item, item.quantity - 1);
    }
  }

  removeItem(item: CartItem) {
    try {
      this.cartService.removeItem(item.id);
      this.updateSummary();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  }

  selectShipping(option: string) {
    let cost = 15;
    if (option === 'express') cost = 25;
    if (option === 'overnight') cost = 45;
    
    try {
      this.cartService.setShipping(cost);
      this.updateSummary();
    } catch (err) {
      console.error('Error setting shipping:', err);
    }
  }

  applyPromoCode() {
    if (!this.promoCode.trim()) {
      this.promoMessage = 'Please enter a promo code.';
      return;
    }
    
    try {
      const applied = this.cartService.applyPromoCode(this.promoCode);
      this.promoMessage = applied ? 'Promo code applied successfully!' : 'Invalid promo code.';
      this.updateSummary();
      
      if (applied) {
        this.promoCode = ''; // Clear the input if successful
      }
    } catch (err) {
      this.promoMessage = 'Error applying promo code.';
      console.error('Error applying promo code:', err);
    }
  }

  updateSummary() {
    try {
      this.orderSummary = this.cartService.getOrderSummary();
    } catch (err) {
      console.error('Error updating summary:', err);
    }
  }

  openCheckout() {
    if (this.cartItems.length === 0) {
      this.error = 'Cannot proceed to checkout with an empty cart.';
      return;
    }
    
    try {
      this.router.navigateByUrl('/checkout');
    } catch (err) {
      console.error('Error navigating to checkout:', err);
    }
  }

  continueShopping() {
    try {
      this.router.navigateByUrl('/catalog');
    } catch (err) {
      console.error('Error navigating to catalog:', err);
    }
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      try {
        this.cartService.clearCart();
        this.cartItems = [];
        this.updateSummary();
      } catch (err) {
        console.error('Error clearing cart:', err);
      }
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getShippingOptionText(option: string): string {
    switch (option) {
      case 'standard': return 'Standard Shipping (5-7 days)';
      case 'express': return 'Express Shipping (2-3 days)';
      case 'overnight': return 'Overnight Shipping (1 day)';
      default: return 'Standard Shipping';
    }
  }

  getShippingCost(option: string): number {
    switch (option) {
      case 'standard': return 15;
      case 'express': return 25;
      case 'overnight': return 45;
      default: return 15;
    }
  }
}
