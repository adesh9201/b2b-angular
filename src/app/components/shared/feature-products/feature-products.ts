import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-products.html',
  styleUrls: ['./feature-products.css']
})
export class FeatureProducts {
  featuredProducts: Product[] = [];
  featuredFabricsName: string = 'Featured Fabrics';
  Explore: string = 'Explore our premium selection of high-quality fabrics';

  constructor(private productService: ProductService) {
    this.featuredProducts = this.productService.getFeaturedProducts();
  }
}