import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SupplierService } from '../../core/services/supplier.service';
import { LoggingService } from '../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css']
})
export class Suppliers implements OnInit, OnDestroy {
  suppliers: any[] = [];
  filteredSuppliers: any[] = [];
  categories: any[] = [];
  countries: any[] = [];
  isLoading = false;
  searchTerm = '';
  selectedCategory = '';
  selectedCountry = '';
  sortBy = 'name';
  currentPage = 1;
  totalPages = 1;
  private destroy$ = new Subject<void>();

  constructor(
    private supplierService: SupplierService,
    private loggingService: LoggingService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadCategories();
    this.loadCountries();
    this.loggingService.info('Suppliers page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSuppliers(): void {
    this.isLoading = true;
    this.supplierService.getSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers;
        this.filteredSuppliers = [...suppliers];
        this.isLoading = false;
      },
      error: (error) => {
        this.loggingService.error('Failed to load suppliers', error);
        this.toastr.error('Failed to load suppliers', 'Error');
        this.isLoading = false;
      }
    });
  }

  private loadCategories(): void {
    this.supplierService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.loggingService.error('Failed to load categories', error);
      }
    });
  }

  private loadCountries(): void {
    this.supplierService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
      error: (error) => {
        this.loggingService.error('Failed to load countries', error);
      }
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onCountryChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.suppliers];

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        supplier.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        supplier.specialties.some((specialty: string) =>
          specialty.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }

    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(supplier =>
        supplier.categories.includes(this.selectedCategory)
      );
    }

    // Country filter
    if (this.selectedCountry) {
      filtered = filtered.filter(supplier =>
        supplier.country === this.selectedCountry
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'products':
          return b.productCount - a.productCount;
        case 'country':
          return a.country.localeCompare(b.country);
        default:
          return 0;
      }
    });

    this.filteredSuppliers = filtered;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedCountry = '';
    this.sortBy = 'name';
    this.applyFilters();
  }

  viewSupplier(supplier: any): void {
    this.router.navigate(['/suppliers', supplier.id]);
    this.loggingService.info('Viewing supplier', { supplierId: supplier.id });
  }

  contactSupplier(supplier: any): void {
    this.toastr.info('Contact feature coming soon!', 'Feature Coming Soon');
    this.loggingService.info('Contacting supplier', { supplierId: supplier.id });
  }
}