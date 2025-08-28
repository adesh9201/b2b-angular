import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../vendor/core/services/inventory.service';
import { InventoryModel } from '../../vendor/core/models/inventory.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.html',
  imports: [CommonModule, FormsModule, Sidebar],
  styleUrls: ['./inventory.css']
})
export class Inventory implements OnInit {
  inventories: InventoryModel[] = [];
  filtered: InventoryModel[] = [];
  pagedItems: InventoryModel[] = [];
  loading = false;

  searchTerm = '';
  selectedCategory = '';
  selectedStatus = '';
  categories: string[] = [];
  view: 'grid' | 'list' = 'grid';

  page = 1;
  perPage = 8;

  constructor(private svc: InventoryService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.getInventories().subscribe({
      next: (data) => {
        this.inventories = data || [];
        const set = new Set<string>(this.inventories.map(d => d.category || '').filter(Boolean));
        this.categories = Array.from(set).sort();
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load inventories', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const q = (this.searchTerm || '').trim().toLowerCase();
    this.filtered = this.inventories.filter(item => {
      if (this.selectedCategory && item.category !== this.selectedCategory) return false;
      if (this.selectedStatus && item.stockStatus !== this.selectedStatus) return false;
      if (!q) return true;
      return (
        (item.name || '').toLowerCase().includes(q) ||
        (item.sku || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q)
      );
    });
    this.page = 1;
    this.updatePage();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  setView(v: 'grid' | 'list'): void {
    this.view = v;
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil((this.filtered || []).length / this.perPage));
  }

  updatePage(): void {
    const start = (this.page - 1) * this.perPage;
    this.pagedItems = (this.filtered || []).slice(start, start + this.perPage);
  }

  changePage(delta: number): void {
    this.page = Math.max(1, Math.min(this.page + delta, this.pageCount));
    this.updatePage();
  }

  goToPage(n: number): void {
    this.page = Math.max(1, Math.min(n, this.pageCount));
    this.updatePage();
  }

  exportCsv(): void {
    const blob = this.svc.buildCsv(this.filtered.length ? this.filtered : this.inventories);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
}
