import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCatalogService } from '../core/services/product-catalog.service';
import { Product } from '../core/models/product-catalog.model';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './product-catalog.html',
  styleUrls: ['./product-catalog.css']
})
export class ProductCatalog implements OnInit {
  products: Product[] = [];
  displayed: Product[] = [];       // items displayed after search + filters + pagination
  categories: string[] = [];

  // UI state
  view: 'grid' | 'list' = 'grid';
  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  page = 1;
  perPage = 6;
  loading = false;

  constructor(private svc: ProductCatalogService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.svc.getProducts().subscribe({
      next: (p) => {
        this.products = p;
        this.svc.getCategories().subscribe(c => (this.categories = c));
        this.applyFilters();
      },
      error: (e) => {
        console.error('Failed to load products', e);
        this.loading = false;
      },
      complete: () => {
        // handled in next via applyFilters
      }
    });
  }

  applyFilters(): void {
    this.page = 1; // reset paging when filters change
    let items = this.products.slice();

    const s = this.searchTerm.trim().toLowerCase();
    if (s) {
      items = items.filter(p => p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }

    if (this.selectedCategory) {
      items = items.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedStatus) {
      items = items.filter(p => p.stockStatus === this.selectedStatus);
    }

    this.displayed = items;
    this.loading = false;
  }

  // Pagination helpers
  get pageCount(): number {
    return Math.max(1, Math.ceil(this.displayed.length / this.perPage));
  }

  get pagedItems(): Product[] {
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
    this.svc.exportCsv({ search: this.searchTerm, category: this.selectedCategory, status: this.selectedStatus }).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `products-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
}
