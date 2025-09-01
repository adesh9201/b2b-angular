
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
  imports: [CommonModule, RouterModule, HeroSection, WhyChoose, TrustedByUsers, TrustedByBrands, FeatureProducts, FabricCategories, FabricSubcategories],
  providers: [CurrencyPipe]
})
export class Home {
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.featuredProducts = this.productService.getFeaturedProducts();
  }
}
