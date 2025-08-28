import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { CartItem, OrderSummary } from '../../core/models/cart.model';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  summary!: OrderSummary;
  form: FormGroup;
  placing = false;
  placed = false;
  error = '';

  constructor(private cartService: CartService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      shipping: this.fb.group({
        fullName: ['', Validators.required],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      }),
      payment: this.fb.group({
        method: ['cod', Validators.required],
        cardNumber: [''],
        nameOnCard: [''],
        expiry: [''],
        cvv: ['']
      })
    });
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.summary = this.cartService.getOrderSummary();
    });
  }

  isFormValid(): boolean {
    const method = this.form.get('payment.method')?.value;
    if (method === 'card') {
      this.form.get('payment.cardNumber')?.addValidators(Validators.required);
      this.form.get('payment.nameOnCard')?.addValidators(Validators.required);
      this.form.get('payment.expiry')?.addValidators(Validators.required);
      this.form.get('payment.cvv')?.addValidators(Validators.required);
      this.form.get('payment.cardNumber')?.updateValueAndValidity();
      this.form.get('payment.nameOnCard')?.updateValueAndValidity();
      this.form.get('payment.expiry')?.updateValueAndValidity();
      this.form.get('payment.cvv')?.updateValueAndValidity();
    }
    return this.form.valid && this.cartItems.length > 0;
  }

  placeOrder() {
    this.error = '';
    if (!this.isFormValid()) {
      this.error = 'Please fill all required fields.';
      return;
    }
    this.placing = true;
    setTimeout(() => {
      this.placing = false;
      this.placed = true;
      // Clear cart after placing order
      this.cartService.clearCart();
      // Redirect after short delay
      setTimeout(() => this.router.navigateByUrl('/'), 1500);
    }, 1200);
  }
}
