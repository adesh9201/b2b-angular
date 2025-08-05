import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CurrencyPipe],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
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