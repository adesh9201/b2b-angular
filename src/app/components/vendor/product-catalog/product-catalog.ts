import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../core/services/test.service';
import { TestModel } from '../../core/models/test.model';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './product-catalog.html',
  styleUrls: ['./product-catalog.css']
})
export class ProductCatalog implements OnInit {
  Math = Math
  products: TestModel[] = [];
  displayed: TestModel[] = [];
  categories: string[] = [];

  // UI state
  view: 'grid' | 'list' = 'grid';
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  page = 1;
  perPage = 6;
  loading = false;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.testService.getAll().subscribe({
      next: (products) => {
        this.products = products.filter(p => p.isActive); // Only show active products
        this.extractCategories();
        this.applyFilters();
      },
      error: (e) => {
        console.error('Failed to load products', e);
        this.loading = false;
      }
    });
  }

  private extractCategories(): void {
    // Extract unique categories from products (you might want to create a separate category service)
    const categorySet = new Set<string>();
    this.products.forEach(product => {
      if (product.categoryId) {
        // For now, using categoryId as string. You might want to map this to actual category names
        categorySet.add(`Category ${product.categoryId}`);
      }
    });
    this.categories = Array.from(categorySet).sort();
  }

  applyFilters(): void {
    this.page = 1;
    let items = this.products.slice();

    const s = this.searchTerm.trim().toLowerCase();
    if (s) {
      items = items.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.sku.toLowerCase().includes(s) ||
        (p.description && p.description.toLowerCase().includes(s)) ||
        (p.fabricType && p.fabricType.toLowerCase().includes(s)) ||
        (p.color && p.color.toLowerCase().includes(s))
      );
    }

    if (this.selectedCategory) {
      items = items.filter(p => `Category ${p.categoryId}` === this.selectedCategory);
    }

    if (this.selectedStatus) {
      items = items.filter(p => this.getStockStatus(p) === this.selectedStatus);
    }

    this.displayed = items;
    this.loading = false;
  }

  // Helper method to determine stock status
  getStockStatus(product: TestModel): string {
    if (product.stockQuantity === 0) return 'Out of Stock';
    if (product.stockQuantity <= 10) return 'Low Stock'; // Configurable threshold
    return 'In Stock';
  }

  // Helper method to get product image URL
  getProductImageUrl(product: TestModel): string {
    return product.imagePath || 'assets/images/placeholder-product.jpg';
  }

  // Helper method to get final price
  getFinalPrice(product: TestModel): number {
    if (product.finalPrice) return product.finalPrice;
    if (product.discountPercent && product.discountPercent > 0) {
      return product.price * (1 - product.discountPercent / 100);
    }
    return product.price;
  }

  // Pagination helpers
  get pageCount(): number {
    return Math.max(1, Math.ceil(this.displayed.length / this.perPage));
  }

  get pagedItems(): TestModel[] {
    const start = (this.page - 1) * this.perPage;
    return this.displayed.slice(start, start + this.perPage);
  }

  changePage(delta: number): void {
    const next = this.page + delta;
    if (next < 1 || next > this.pageCount) return;
    this.page = next;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setView(v: 'grid' | 'list'): void {
    this.view = v;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  exportCsv(): void {
    // Generate CSV from current filtered data
    const headers = ['Product ID', 'Name', 'SKU', 'Price', 'Final Price', 'Stock Quantity', 'Status', 'Fabric Type', 'Color', 'Pattern'];
    const csvData = [
      headers.join(','),
      ...this.displayed.map(p => [
        p.productId,
        `"${p.name}"`,
        p.sku,
        p.price,
        this.getFinalPrice(p),
        p.stockQuantity,
        `"${this.getStockStatus(p)}"`,
        `"${p.fabricType || ''}"`,
        `"${p.color || ''}"`,
        `"${p.pattern || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Additional methods for product management
  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.testService.delete(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.productId !== productId);
          this.applyFilters();
        },
        error: (e) => console.error('Failed to delete product', e)
      });
    }
  }

  toggleProductStatus(product: TestModel): void {
    const updatedProduct = { ...product, isActive: !product.isActive };
    this.testService.update(updatedProduct).subscribe({
      next: () => {
        const index = this.products.findIndex(p => p.productId === product.productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.applyFilters();
        }
      },
      error: (e) => console.error('Failed to update product status', e)
    });
  }
}
