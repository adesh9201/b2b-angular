import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';
import { LoggingService } from '../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  isLoading = false;
  selectedPaymentMethod = 'credit_card';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private loggingService: LoggingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCartItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.checkoutForm = this.fb.group({
      // Billing Information
      billingFirstName: ['', [Validators.required]],
      billingLastName: ['', [Validators.required]],
      billingEmail: ['', [Validators.required, Validators.email]],
      billingPhone: ['', [Validators.required]],
      billingCompany: [''],
      billingAddress1: ['', [Validators.required]],
      billingAddress2: [''],
      billingCity: ['', [Validators.required]],
      billingState: ['', [Validators.required]],
      billingZipCode: ['', [Validators.required]],
      billingCountry: ['', [Validators.required]],

      // Shipping Information
      shippingSameAsBilling: [true],
      shippingFirstName: [''],
      shippingLastName: [''],
      shippingCompany: [''],
      shippingAddress1: [''],
      shippingAddress2: [''],
      shippingCity: [''],
      shippingState: [''],
      shippingZipCode: [''],
      shippingCountry: [''],

      // Payment Information
      paymentMethod: ['credit_card', [Validators.required]],
      cardNumber: [''],
      cardExpiry: [''],
      cardCvv: [''],
      cardName: [''],

      // Order Information
      orderNotes: [''],
      agreeToTerms: [false, [Validators.requiredTrue]]
    });

    // Watch for shipping same as billing changes
    this.checkoutForm.get('shippingSameAsBilling')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.copyBillingToShipping();
      } else {
        this.clearShippingFields();
      }
    });
  }

  private loadCartItems(): void {
    this.cartService.getCartItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
        if (items.length === 0) {
          this.router.navigate(['/cart']);
        }
      });
  }

  private copyBillingToShipping(): void {
    const billingFields = [
      'firstName', 'lastName', 'company', 'address1', 'address2', 
      'city', 'state', 'zipCode', 'country'
    ];

    billingFields.forEach(field => {
      const billingValue = this.checkoutForm.get(`billing${field.charAt(0).toUpperCase() + field.slice(1)}`)?.value;
      this.checkoutForm.get(`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`)?.setValue(billingValue);
    });
  }

  private clearShippingFields(): void {
    const shippingFields = [
      'shippingFirstName', 'shippingLastName', 'shippingCompany', 
      'shippingAddress1', 'shippingAddress2', 'shippingCity', 
      'shippingState', 'shippingZipCode', 'shippingCountry'
    ];

    shippingFields.forEach(field => {
      this.checkoutForm.get(field)?.setValue('');
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    return subtotal >= 100 ? 0 : 15;
  }

  getTaxAmount(): number {
    return this.getSubtotal() * 0.08;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost() + this.getTaxAmount();
  }

  onPaymentMethodChange(method: string): void {
    this.selectedPaymentMethod = method;
    this.checkoutForm.get('paymentMethod')?.setValue(method);
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      const formData = this.checkoutForm.value;

      // Process order
      this.processOrder(formData);
    } else {
      this.markFormGroupTouched();
      this.toastr.error('Please fill in all required fields', 'Form Validation Error');
    }
  }

  private processOrder(orderData: any): void {
    // Simulate order processing
    setTimeout(() => {
      this.loggingService.info('Order processed successfully', {
        orderId: 'ORD-' + Date.now(),
        total: this.getTotal(),
        items: this.cartItems.length
      });

      this.toastr.success('Order placed successfully!', 'Order Confirmed');
      this.cartService.clearCart();
      this.router.navigate(['/order-confirmation']);
      this.isLoading = false;
    }, 2000);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      const control = this.checkoutForm.get(key);
      control?.markAsTouched();
    });
  }
}