
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FabricService } from '../../core/services/fabric.service';
import { FabricModel } from '../../core/models/fabric.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-test',
  standalone: true,           // make it standalone
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})

export class Test implements OnInit {
  Math=Math
  @ViewChild('searchInput') searchInput!: ElementRef;

  // Core data
  fabrics: FabricModel[] = [];
  filteredFabrics: FabricModel[] = [];
  loading = true;
  error = '';

  // Search and filters
  searchTerm = '';
  searchSubject = new Subject<string>();
  selectedCategory = '';
  selectedQuality = '';
  selectedGsmRange = '';
  priceRange = { min: 0, max: 10000, currentMin: 0, currentMax: 10000 };

  // Available filter options
  categories: string[] = [];
  qualities: string[] = [];
  gsmRanges = [
    { label: 'Light (0-150 GSM)', min: 0, max: 150 },
    { label: 'Medium (151-300 GSM)', min: 151, max: 300 },
    { label: 'Heavy (301+ GSM)', min: 301, max: 9999 }
  ];

  // UI controls
  viewMode: 'grid' | 'list' = 'grid';
  sortBy: 'fabName' | 'sellPrice' | 'gsm' | 'createdDate' = 'fabName';
  sortOrder: 'asc' | 'desc' = 'asc';
  showFilters = false;
  itemsPerPage = 24;
  currentPage = 1;

  // Cart and wishlist
  cartItems: Set<string> = new Set();
  wishlistItems: Set<string> = new Set();

  // Mobile responsiveness
  isMobile = false;

  constructor(private fabricService: FabricService) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.loadFabrics();
    this.setupSearchDebounce();
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(): void {
  //   this.checkScreenSize();
  // }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  setupSearchDebounce(): void {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.applyFilters();
      });
  }

  loadFabrics(): void {
    this.loading = true;
    this.error = '';

    this.fabricService.getAll().subscribe({
      next: (data) => {
        this.fabrics = data || [];
        this.filteredFabrics = [...this.fabrics];
        this.extractFilterOptions();
        this.updatePriceRange();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load fabric collection. Please try again.';
        this.loading = false;
        console.error('Fabric loading error:', err);
      }
    });
  }

  extractFilterOptions(): void {
    const categorySet = new Set<string>();
    const qualitySet = new Set<string>();

    this.fabrics.forEach(fabric => {
      if (fabric.fabType) categorySet.add(fabric.fabType);
      if (fabric.quality) qualitySet.add(fabric.quality);
    });

    this.categories = Array.from(categorySet).sort();
    this.qualities = Array.from(qualitySet).sort();
  }

  updatePriceRange(): void {
    const prices = this.fabrics
      .map(f => f.sellPrice || 0)
      .filter(p => p > 0);

    if (prices.length > 0) {
      this.priceRange.min = Math.min(...prices);
      this.priceRange.max = Math.max(...prices);
      this.priceRange.currentMin = this.priceRange.min;
      this.priceRange.currentMax = this.priceRange.max;
    }
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  applyFilters(): void {
    this.filteredFabrics = this.fabrics.filter(fabric => {
      // Search filter
      const searchMatch = !this.searchTerm ||
        fabric.fabName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        fabric.refNo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        fabric.fabType?.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Category filter
      const categoryMatch = !this.selectedCategory ||
        fabric.fabType === this.selectedCategory;

      // Quality filter
      const qualityMatch = !this.selectedQuality ||
        fabric.quality === this.selectedQuality;

      // Price filter
      const price = fabric.sellPrice || 0;
      const priceMatch = price >= this.priceRange.currentMin &&
        price <= this.priceRange.currentMax;

      // GSM filter
      let gsmMatch = true;
      if (this.selectedGsmRange) {
        const gsm = fabric.gsm || 0;
        const range = this.gsmRanges.find(r => r.label === this.selectedGsmRange);
        gsmMatch = range ? (gsm >= range.min && gsm <= range.max) : true;
      }

      return searchMatch && categoryMatch && qualityMatch && priceMatch && gsmMatch;
    });

    this.sortFabrics();
  }

  sortFabrics(): void {
    this.filteredFabrics.sort((a, b) => {
      let aValue: any = a[this.sortBy];
      let bValue: any = b[this.sortBy];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // String comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedQuality = '';
    this.selectedGsmRange = '';
    this.priceRange.currentMin = this.priceRange.min;
    this.priceRange.currentMax = this.priceRange.max;
    this.currentPage = 1;
    this.applyFilters();
  }

  toggleSort(field: 'fabName' | 'sellPrice' | 'gsm' | 'createdDate'): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }

  // Pagination
  get paginatedFabrics(): FabricModel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredFabrics.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFabrics.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Utility methods
  formatPrice(price?: number): string {
    if (price == null || price === 0) return 'Price on Request';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  }

  getDiscountPercentage(costPrice?: number, sellPrice?: number): number {
    if (!costPrice || !sellPrice || costPrice <= sellPrice) return 0;
    return Math.round(((costPrice - sellPrice) / costPrice) * 100);
  }

  getPlaceholderImage(fabric: FabricModel): string {
    const colors = ['4A90E2', '7ED321', 'F5A623', 'D0021B', '9013FE', '50E3C2'];
    const color = colors[Math.abs(fabric.refNo?.charCodeAt(0) || 0) % colors.length];
    const text = encodeURIComponent(fabric.fabName || 'Premium Fabric');
    return `https://via.placeholder.com/400x300/${color}/ffffff?text=${text}`;
  }

  generateStars(rating: number = 4.5): string[] {
    const stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('fas fa-star');
      } else if (i - 0.5 <= rating) {
        stars.push('fas fa-star-half-alt');
      } else {
        stars.push('far fa-star');
      }
    }
    return stars;
  }

  // Cart and wishlist actions
  toggleWishlist(fabric: FabricModel): void {
    const id = fabric.refNo || '';
    if (this.wishlistItems.has(id)) {
      this.wishlistItems.delete(id);
    } else {
      this.wishlistItems.add(id);
    }
  }

  isInWishlist(fabric: FabricModel): boolean {
    return this.wishlistItems.has(fabric.refNo || '');
  }

  addToCart(fabric: FabricModel): void {
    const id = fabric.refNo || '';
    this.cartItems.add(id);

    // Show success feedback (you can implement toast/snackbar here)
    console.log(`Added ${fabric.fabName} to cart`);
  }

  isInCart(fabric: FabricModel): boolean {
    return this.cartItems.has(fabric.refNo || '');
  }

  quickView(fabric: FabricModel): void {
    // Implement quick view modal
    console.log('Quick view:', fabric);
  }

  trackByRefNo(index: number, fabric: FabricModel): any {
    return fabric.refNo || index;
  }
}
