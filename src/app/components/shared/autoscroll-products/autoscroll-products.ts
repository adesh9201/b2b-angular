import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';


@Component({
  selector: 'app-autoscroll-products',
  standalone: true,
  imports: [CommonModule,],
  providers: [CurrencyPipe],
  templateUrl: './autoscroll-products.html',
  styleUrl: './autoscroll-products.css'
})
export class AutoscrollProducts {

  featuredProducts: Product[] = [];
  productChunks: Product[][] = [];

  constructor(private productService: ProductService) {
    this.featuredProducts = this.productService.getFeaturedProducts();
    this.chunkProducts();
  }

  private chunkProducts(): void {
    const chunkSize = 6;
    for (let i = 0; i < this.featuredProducts.length; i += chunkSize) {
      this.productChunks.push(this.featuredProducts.slice(i, i + chunkSize));
    }
  }
}
