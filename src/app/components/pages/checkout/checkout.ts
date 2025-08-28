import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { CartItem, OrderSummary } from '../../core/models/cart.model';
import { CreateOrderRequest, PaymentMethod, ShippingMethod } from '../../core/models/order.model';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  summary!: OrderSummary;
  isLoading = false;
  showSuccessMessage = false;
  errorMessage = '';

  checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCartData();
  }

  private initForm(): void {
    this.checkoutForm = this.fb.group({
      shipping: this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        zipCode: ['', [Validators.required, Validators.pattern(/^[\d\w\s-]+$/)]],
        country: ['', [Validators.required, Validators.minLength(2)]]
      }),
      billing: this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        zipCode: ['', [Validators.required, Validators.pattern(/^[\d\w\s-]+$/)]],
        country: ['', [Validators.required, Validators.minLength(2)]]
      }),
      payment: this.fb.group({
        method: [PaymentMethod.COD, Validators.required],
        cardNumber: [''],
        nameOnCard: [''],
        expiry: [''],
        cvv: ['']
      }),
      shippingMethod: [ShippingMethod.STANDARD, Validators.required],
      notes: [''],
      sameAsShipping: [true]
    });

    // Watch for same as shipping checkbox changes
    this.checkoutForm.get('sameAsShipping')?.valueChanges.subscribe(checked => {
      if (checked) {
        const shipping = this.checkoutForm.get('shipping')?.value;
        this.checkoutForm.patchValue({ billing: shipping });
      }
    });
  }

  private loadCartData(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.summary = this.cartService.getOrderSummary();
    });
  }

  onPlaceOrder(): void {
    if (this.checkoutForm.valid && this.cartItems.length > 0) {
      this.isLoading = true;
      this.errorMessage = '';

      const formValue = this.checkoutForm.value;
      
      const orderRequest: CreateOrderRequest = {
        items: this.cartItems.map(item => ({
          id: item.id,
          productId: item.productId,
          productName: item.name,
          productImage: item.image,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity
        })),
        shippingAddress: formValue.shipping,
        billingAddress: formValue.billing,
        paymentMethod: formValue.payment.method,
        shippingMethod: formValue.shippingMethod,
        notes: formValue.notes
      };

      // Use mock order creation for development
      this.orderService.mockCreateOrder(orderRequest).subscribe({
        next: (order) => {
          this.isLoading = false;
          this.showSuccessMessage = true;
          
          // Clear cart after successful order
          this.cartService.clearCart();
          
          // Redirect to home after short delay
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to place order. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          control.get(nestedKey)?.markAsTouched();
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  getErrorMessage(controlName: string, formGroup: string): string {
    const control = this.checkoutForm.get(`${formGroup}.${controlName}`);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        if (controlName === 'phone') {
          return 'Please enter a valid phone number';
        }
        if (controlName === 'zipCode') {
          return 'Please enter a valid ZIP code';
        }
      }
    }
    return '';
  }

  getPaymentMethodText(method: PaymentMethod): string {
    switch (method) {
      case PaymentMethod.COD:
        return 'Cash on Delivery';
      case PaymentMethod.CREDIT_CARD:
        return 'Credit Card';
      case PaymentMethod.DEBIT_CARD:
        return 'Debit Card';
      case PaymentMethod.BANK_TRANSFER:
        return 'Bank Transfer';
      case PaymentMethod.DIGITAL_WALLET:
        return 'Digital Wallet';
      default:
        return method;
    }
  }

  getShippingMethodText(method: ShippingMethod): string {
    switch (method) {
      case ShippingMethod.STANDARD:
        return 'Standard Shipping';
      case ShippingMethod.EXPRESS:
        return 'Express Shipping';
      case ShippingMethod.OVERNIGHT:
        return 'Overnight Shipping';
      default:
        return method;
    }
  }

  getShippingCost(method: ShippingMethod): number {
    switch (method) {
      case ShippingMethod.STANDARD:
        return 15;
      case ShippingMethod.EXPRESS:
        return 25;
      case ShippingMethod.OVERNIGHT:
        return 45;
      default:
        return 15;
    }
  }

  getTotalWithShipping(): number {
    const shippingCost = this.getShippingCost(this.checkoutForm.get('shippingMethod')?.value || ShippingMethod.STANDARD);
    return this.summary.subtotal + shippingCost - this.summary.discount;
  }
}
