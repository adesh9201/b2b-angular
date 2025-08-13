
// src/app/home/home.ts
import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Filter } from '../../shared/filter/filter';
import { AutoscrollProducts } from '../../shared/autoscroll-products/autoscroll-products';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service'; // already have ProductSe


@Component({
  selector: 'app-catalogs',
  standalone: true,
  templateUrl: './catalogs.html',
  styleUrls: ['./catalogs.css'],
  imports: [CommonModule, Filter, RouterModule],
  providers: [CurrencyPipe]
})
export class Catalogs {
  featuredProducts: Product[] = [];
  productChunks: Product[][] = [];
  showToast = false;       // <-- add this
  toastMessage = '';       // <-- message to show

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef  // <-- add this
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
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);

    // Toast
    this.toastMessage = `${product.name} added to cart!`;
    this.showToast = true;

    // Force Angular to detect changes
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();  // remove after timeout
    }, 2000);
  }

}
