
// src/app/home/home.ts
import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { AutoscrollProducts } from '../../shared/autoscroll-products/autoscroll-products';
import { HeroSection } from '../../shared/hero-section/hero-section';
import { WhyChoose } from '../../shared/why-choose/why-choose';
import { TrustedByUsers } from '../../shared/trusted-by-users/trusted-by-users';
import { TrustedByBrands } from '../../shared/trusted-by-brands/trusted-by-brands';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, AutoscrollProducts, HeroSection, WhyChoose, TrustedByUsers, TrustedByBrands],
  providers: [CurrencyPipe]
})
export class Home {
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.featuredProducts = this.productService.getFeaturedProducts();
  }
}
