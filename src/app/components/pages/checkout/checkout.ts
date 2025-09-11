import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { CartService } from '../../core/services/cart.service';
// import { CartItem, OrderSummary } from '../../core/models/cart.model';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  // // cartItems: CartItem[] = [];
  // // summary!: OrderSummary;

  // // Simple form model
  // shipping = { fullName: '', phone: '', address: '', city: '', state: '', zip: '' };
  // payment = { method: 'cod', cardNumber: '', nameOnCard: '', expiry: '', cvv: '' };
  // placing = false;
  // placed = false;
  // error = '';

  // constructor(private cartService: CartService, private router: Router) {}

  // ngOnInit(): void {
  //   this.cartService.getCartItems().subscribe(items => {
  //     this.cartItems = items;
  //     this.summary = this.cartService.getOrderSummary();
  //   });
  // }

  // isFormValid(): boolean {
  //   if (!this.shipping.fullName || !this.shipping.phone || !this.shipping.address || !this.shipping.city || !this.shipping.state || !this.shipping.zip) return false;
  //   if (this.payment.method === 'card') {
  //     if (!this.payment.cardNumber || !this.payment.nameOnCard || !this.payment.expiry || !this.payment.cvv) return false;
  //   }
  //   return this.cartItems.length > 0;
  // }

  // placeOrder() {
  //   this.error = '';
  //   if (!this.isFormValid()) {
  //     this.error = 'Please fill all required fields.';
  //     return;
  //   }
  //   this.placing = true;
  //   setTimeout(() => {
  //     this.placing = false;
  //     this.placed = true;
  //     // Clear cart after placing order
  //     this.cartService.clearCart();
  //     // Redirect after short delay
  //     setTimeout(() => this.router.navigateByUrl('/'), 1500);
  //   }, 1200);
  // }
}
