
// src/app/home/home.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { AutoscrollProducts } from '../../shared/autoscroll-products/autoscroll-products';
import { HeroSection } from '../../shared/hero-section/hero-section';
import { WhyChoose } from '../../shared/why-choose/why-choose';
import { TrustedByUsers } from '../../shared/trusted-by-users/trusted-by-users';
import { TrustedByBrands } from '../../shared/trusted-by-brands/trusted-by-brands';
import { RouterModule } from '@angular/router';
import { FeatureProducts } from '../../shared/feature-products/feature-products';
import { AutoscrollCategory} from "../../shared/autoscroll-category/autoscroll-category";
import { FabricCategories } from '../../shared/fabric-categories/fabric-categories';
import { FabricSubcategories } from '../../shared/fabric-subcategories/fabric-subcategories';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [
    CommonModule, 
    RouterModule, 
    AutoscrollProducts, 
    HeroSection, 
    WhyChoose, 
    TrustedByUsers, 
    TrustedByBrands, 
    FeatureProducts, 
    AutoscrollCategory, 
    FabricCategories, 
    FabricSubcategories
  ],
  providers: [CurrencyPipe]
})
export class Home implements OnInit {
  featuredProducts: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        this.featuredProducts = this.productService.getFeaturedProducts();
        this.isLoading = false;
      }, 500);
    } catch (err) {
      this.error = 'Failed to load featured products';
      this.isLoading = false;
      console.error('Error loading featured products:', err);
    }
  }

  getTopRatedProducts(): Product[] {
    return this.featuredProducts
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  }

  getDiscountedProducts(): Product[] {
    return this.featuredProducts
      .filter(product => product.discount > 0)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 6);
  }

  getProductsByCategory(category: string): Product[] {
    return this.featuredProducts
      .filter(product => product.category === category)
      .slice(0, 4);
  }

  getNewArrivals(): Product[] {
    // Simulate new arrivals by taking the first 6 products
    return this.featuredProducts.slice(0, 6);
  }

  getBestSellers(): Product[] {
    // Simulate best sellers by products with highest reviews
    return this.featuredProducts
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 6);
  }
}
