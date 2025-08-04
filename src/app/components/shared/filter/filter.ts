import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  providers: [CurrencyPipe]
})
export class Filter {
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.featuredProducts = this.productService.getFeaturedProducts();
  }
}
