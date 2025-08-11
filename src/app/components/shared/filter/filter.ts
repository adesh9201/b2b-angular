import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.html',
  styleUrls: ['./filter.css']
})
export class Filter {
  @Output() filtersApplied = new EventEmitter<Product[]>(); // ✅ Parent ko data bhejne ke liye

  featuredProducts: Product[] = [];
  allProducts: Product[] = [];

  filters = {
    categories: [] as string[],
    materials: [] as string[],
    colors: [] as string[],
    suppliers: [] as string[],
    ratings: [] as number[],
    priceMin: 0,
    priceMax: 10000
  };

  constructor(private productService: ProductService) {
    this.allProducts = this.productService.getFeaturedProducts();
    this.featuredProducts = [...this.allProducts];
  }

  toggleFilter(filterType: keyof typeof this.filters, value: string | number) {
    const arr = this.filters[filterType] as (string | number)[];
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    } else {
      arr.push(value);
    }
  }

  applyFilters() {
    this.featuredProducts = this.allProducts.filter(product => {
      const categoryMatch = !this.filters.categories.length || this.filters.categories.includes(product.category);
      const materialMatch = !this.filters.materials.length || this.filters.materials.includes(product.material);
      const colorMatch = !this.filters.colors.length || product.colors.some(c => this.filters.colors.includes(c));
      const supplierMatch = !this.filters.suppliers.length || this.filters.suppliers.includes(product.supplier);
      const ratingMatch = !this.filters.ratings.length || this.filters.ratings.some(r => product.rating >= r);
      const priceMatch = product.price >= this.filters.priceMin && product.price <= this.filters.priceMax;

      return categoryMatch && materialMatch && colorMatch && supplierMatch && ratingMatch && priceMatch;
    });

    this.filtersApplied.emit(this.featuredProducts); // ✅ Parent ko bhejna
  }

  resetFilters() {
    this.filters = {
      categories: [],
      materials: [],
      colors: [],
      suppliers: [],
      ratings: [],
      priceMin: 0,
      priceMax: 10000
    };
    this.featuredProducts = [...this.allProducts];
    this.filtersApplied.emit(this.featuredProducts); // ✅ Reset ke baad bhi parent ko bhejna
  }
}
