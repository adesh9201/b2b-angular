import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartItem, OrderSummary } from '../../core/models/cart.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  orderSummary!: OrderSummary;
  promoMessage = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.updateSummary();
    });
  }

  updateQuantity(item: CartItem, qty: number) {
    if (qty < 1) qty = 1;
    this.cartService.updateQuantity(item.id, qty);
    this.updateSummary();
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
    this.cartService.removeItem(item.id);
    this.updateSummary();
  }

  selectShipping(option: string) {
    let cost = 15;
    if (option === 'express') cost = 25;
    if (option === 'overnight') cost = 45;
    this.cartService.setShipping(cost);
    this.updateSummary();
  }

  applyPromoCode(code: string) {
    const applied = this.cartService.applyPromoCode(code);
    this.promoMessage = applied ? 'Promo code applied!' : 'Invalid promo code.';
    this.updateSummary();
  }

  updateSummary() {
    this.orderSummary = this.cartService.getOrderSummary();
  }

  openCheckout() {
    alert('Proceeding to checkout...');
  }
}
