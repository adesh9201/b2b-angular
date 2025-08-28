import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { CurrencyFormatPipe } from '../../core/pipes/currency-format.pipe';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyFormatPipe, TruncatePipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() product!: Product;
  @Input() showAddToCart: boolean = true;
  @Input() showRating: boolean = true;
  @Input() showVendor: boolean = false;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();

  constructor(private cartService: CartService) {}

  onAddToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.cartService.addToCart(this.product, 1).subscribe({
      next: () => {
        this.addToCart.emit(this.product);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      }
    });
  }

  onQuickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.quickView.emit(this.product);
  }

  getRatingStars(rating: number): number[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }
    
    if (hasHalfStar) {
      stars.push(0.5);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(0);
    }
    
    return stars;
  }

  getStockStatus(stock: number): { text: string; class: string } {
    if (stock === 0) {
      return { text: 'Out of Stock', class: 'text-danger' };
    } else if (stock < 10) {
      return { text: 'Low Stock', class: 'text-warning' };
    } else {
      return { text: 'In Stock', class: 'text-success' };
    }
  }

  getDiscountPercentage(originalPrice: number, currentPrice: number): number {
    if (originalPrice > currentPrice) {
      return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
    }
    return 0;
  }
}