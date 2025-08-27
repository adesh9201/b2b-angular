// src/app/home/home.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Filter } from '../../shared/filter/filter';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  templateUrl: './catalogs.html',
  styleUrls: ['./catalogs.css'],
  imports: [CommonModule, FormsModule, Filter, RouterModule],
  providers: [CurrencyPipe]
})
export class Catalogs {
  featuredProducts: Product[] = [];
  productChunks: Product[][] = [];
  selectedProduct: Product | null = null;   // <-- Quick View के लिए selected product
  showToast = false;
  toastMessage = '';
  sortBy: string = 'newest';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {
    this.featuredProducts = this.productService.getFeaturedProducts();
    this.chunkProducts();
  }

  private chunkProducts(): void {
    const chunkSize = 6;
    for (let i = 0; i < this.featuredProducts.length; i += chunkSize) {
      this.productChunks.push(this.featuredProducts.slice(i, i + chunkSize));
    }
  }

  onFiltersApplied(filtered: Product[]) {
    this.featuredProducts = filtered;
    this.applySort();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastMessage = `${product.name} added to cart!`;
    this.showToast = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 2000);
  }

  openQuickView(product: Product) {
    this.selectedProduct = product;   // <-- Modal के लिए product set
  }

  onSortChange() {
    this.applySort();
  }

  private applySort() {
    switch (this.sortBy) {
      case 'priceLowHigh':
        this.featuredProducts = [...this.featuredProducts].sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        this.featuredProducts = [...this.featuredProducts].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.featuredProducts = [...this.featuredProducts].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        this.featuredProducts = [...this.featuredProducts].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        this.featuredProducts = [...this.productService.getFeaturedProducts()];
        break;
    }
  }
}
