import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FabricCategoryService } from '../../core/services/fabric-category.service';
import { FabricCategoryModel } from '../../core/models/fabric-category.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-autoscroll-category',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './autoscroll-category.html',
  styleUrls: ['./autoscroll-category.css']
})
export class AutoscrollCategory implements OnInit  {

  categories: FabricCategoryModel[] = [];
  filtered: FabricCategoryModel[] = [];
  loading = true;
  error = '';

  // UI state
  page = 1;
  pageSize = 12;
  searchTerm = '';
  sortBy: 'name-asc' | 'name-desc' = 'name-asc';

  private search$ = new Subject<string>();

  constructor(private svc: FabricCategoryService) {}

  ngOnInit(): void {
    this.svc.getAllFabricCategory().subscribe({
      next: res => {
        this.categories = res || [];
        this.applyFilters();
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load categories';
        this.loading = false;
      }
    });

    // debounce search input
    this.search$.pipe(debounceTime(250)).subscribe(term => {
      this.searchTerm = term;
      this.applyFilters();
      this.page = 1;
    });
  }

  onSearch(term: string) {
    this.search$.next(term.trim());
  }

  onSortChange(val: string) {
    this.sortBy = val as any;
    this.applyFilters();
  }

  applyFilters() {
    let out = [...this.categories];

    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      out = out.filter(c => (c.name || '').toLowerCase().includes(q));
    }

    if (this.sortBy === 'name-asc') {
      out.sort((a,b) => a.name.localeCompare(b.name));
    } else {
      out.sort((a,b) => b.name.localeCompare(a.name));
    }

    this.filtered = out;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  paginated() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    // optional: scroll into view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openCategory(c: FabricCategoryModel) {
    // navigate to category products page
    // e.g., this.router.navigate(['/category', c.id]);
    console.log('Open category', c);
  }
}
