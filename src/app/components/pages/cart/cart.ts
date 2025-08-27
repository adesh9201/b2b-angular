import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/cart-item.model';
import { LoggingService } from '../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  promoCode = '';
  appliedPromo: any = null;
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private router: Router,
    private loggingService: LoggingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCartItems(): void {
    this.cartService.getCartItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.cartItems = items;
      });
  }

  trackByItemId(index: number, item: CartItem): string {
    return item.id;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotal(item), 0);
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    return subtotal >= 100 ? 0 : 15;
  }

  getTaxAmount(): number {
    return this.getSubtotal() * 0.08; // 8% tax
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const shipping = this.getShippingCost();
    const tax = this.getTaxAmount();
    const discount = this.appliedPromo ? this.appliedPromo.discount : 0;
    return subtotal + shipping + tax - discount;
  }

  updateQuantity(item: CartItem, event: any): void {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1 && newQuantity <= item.product.stock) {
      this.cartService.updateQuantity(item.id, newQuantity);
      this.loggingService.info('Cart item quantity updated', { 
        itemId: item.id, 
        newQuantity 
      });
    } else {
      event.target.value = item.quantity;
      this.toastr.warning('Invalid quantity', 'Warning');
    }
  }

  increaseQuantity(item: CartItem): void {
    if (item.quantity < item.product.stock) {
      this.cartService.updateQuantity(item.id, item.quantity + 1);
    } else {
      this.toastr.warning('Maximum stock reached', 'Warning');
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.id);
    this.toastr.success(`${item.product.name} removed from cart`, 'Item Removed');
    this.loggingService.info('Item removed from cart', { itemId: item.id });
  }

  moveToWishlist(item: CartItem): void {
    this.toastr.info('Wishlist feature coming soon!', 'Feature Coming Soon');
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.toastr.success('Cart cleared', 'Success');
    this.loggingService.info('Cart cleared');
  }

  applyPromoCode(): void {
    if (this.promoCode.trim()) {
      this.appliedPromo = {
        code: this.promoCode,
        discount: 10
      };
      this.toastr.success('Promo code applied!', 'Success');
      this.promoCode = '';
    }
  }

  removePromoCode(): void {
    this.appliedPromo = null;
    this.toastr.info('Promo code removed', 'Info');
  }

  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      this.toastr.warning('Your cart is empty', 'Warning');
      return;
    }

    this.loggingService.info('Proceeding to checkout', { 
      itemCount: this.cartItems.length,
      total: this.getTotal()
    });
    
    this.router.navigate(['/checkout']);
  }
}