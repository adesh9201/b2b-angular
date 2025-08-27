import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CatalogService } from '../../core/services/catalog.service';
import { LoggingService } from '../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogs.html',
  styleUrls: ['./catalogs.css']
})
export class CatalogsComponent implements OnInit, OnDestroy {
  catalogs: any[] = [];
  filteredCatalogs: any[] = [];
  categories: any[] = [];
  vendors: any[] = [];
  isLoading = false;
  searchTerm = '';
  selectedCategory = '';
  selectedVendor = '';
  sortBy = 'name';
  viewMode: 'grid' | 'list' = 'grid';
  private destroy$ = new Subject<void>();

  constructor(
    private catalogService: CatalogService,
    private loggingService: LoggingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCatalogs();
    this.loadCategories();
    this.loadVendors();
    this.loggingService.info('Catalogs page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCatalogs(): void {
    this.isLoading = true;
    this.catalogService.getCatalogs().subscribe({
      next: (catalogs) => {
        this.catalogs = catalogs;
        this.filteredCatalogs = [...catalogs];
        this.isLoading = false;
      },
      error: (error) => {
        this.loggingService.error('Failed to load catalogs', error);
        this.toastr.error('Failed to load catalogs', 'Error');
        this.isLoading = false;
      }
    });
  }

  private loadCategories(): void {
    this.catalogService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.loggingService.error('Failed to load categories', error);
      }
    });
  }

  private loadVendors(): void {
    this.catalogService.getVendors().subscribe({
      next: (vendors) => {
        this.vendors = vendors;
      },
      error: (error) => {
        this.loggingService.error('Failed to load vendors', error);
      }
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onVendorChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  private applyFilters(): void {
    let filtered = [...this.catalogs];

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(catalog =>
        catalog.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        catalog.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        catalog.vendor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(catalog =>
        catalog.categories.includes(this.selectedCategory)
      );
    }

    // Vendor filter
    if (this.selectedVendor) {
      filtered = filtered.filter(catalog =>
        catalog.vendor.id === this.selectedVendor
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'vendor':
          return a.vendor.name.localeCompare(b.vendor.name);
        case 'products':
          return b.productCount - a.productCount;
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    this.filteredCatalogs = filtered;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedVendor = '';
    this.sortBy = 'name';
    this.applyFilters();
  }

  viewCatalog(catalog: any): void {
    this.router.navigate(['/catalogs', catalog.id]);
    this.loggingService.info('Viewing catalog', { catalogId: catalog.id });
  }

  downloadCatalog(catalog: any): void {
    this.toastr.info('Download feature coming soon!', 'Feature Coming Soon');
    this.loggingService.info('Downloading catalog', { catalogId: catalog.id });
  }
}