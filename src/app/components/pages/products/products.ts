import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { LoggingService } from '../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: any[] = [];
  vendors: any[] = [];
  isLoading = false;
  searchTerm = '';
  selectedCategories: string[] = [];
  selectedVendors: string[] = [];
  selectedRating = 0;
  priceRange = { min: 0, max: 1000 };
  sortBy = 'name';
  viewMode: 'grid' | 'list' = 'grid';
  currentPage = 1;
  totalPages = 1;
  totalProducts = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private loggingService: LoggingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadVendors();
    this.setupRouteParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupRouteParams(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.loadProduct(params['id']);
      }
    });

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['category']) {
        this.selectedCategories = [params['category']];
      }
      if (params['search']) {
        this.searchTerm = params['search'];
      }
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    const filters = {
      search: this.searchTerm,
      categories: this.selectedCategories,
      vendors: this.selectedVendors,
      minRating: this.selectedRating,
      minPrice: this.priceRange.min,
      maxPrice: this.priceRange.max,
      sortBy: this.sortBy,
      page: this.currentPage,
      limit: 12
    };

    this.productService.getProducts(filters).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalProducts = response.pagination.total;
        this.totalPages = response.pagination.pages;
        this.isLoading = false;
      },
      error: (error) => {
        this.loggingService.error('Failed to load products', error);
        this.toastr.error('Failed to load products', 'Error');
        this.isLoading = false;
      }
    });
  }

  private loadProduct(id: string): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.products = [product];
        this.totalProducts = 1;
      },
      error: (error) => {
        this.loggingService.error('Failed to load product', { id, error });
        this.router.navigate(['/products']);
      }
    });
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.loggingService.error('Failed to load categories', error);
      }
    });
  }

  private loadVendors(): void {
    this.productService.getVendors().subscribe({
      next: (vendors) => {
        this.vendors = vendors;
      },
      error: (error) => {
        this.loggingService.error('Failed to load vendors', error);
      }
    });
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onCategoryChange(categoryId: string, event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
    }
    this.currentPage = 1;
    this.loadProducts();
  }

  onVendorChange(vendorId: string, event: any): void {
    if (event.target.checked) {
      this.selectedVendors.push(vendorId);
    } else {
      this.selectedVendors = this.selectedVendors.filter(id => id !== vendorId);
    }
    this.currentPage = 1;
    this.loadProducts();
  }

  onRatingChange(rating: number): void {
    this.selectedRating = rating;
    this.currentPage = 1;
    this.loadProducts();
  }

  onPriceChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategories = [];
    this.selectedVendors = [];
    this.selectedRating = 0;
    this.priceRange = { min: 0, max: 1000 };
    this.currentPage = 1;
    this.loadProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
    this.toastr.success(`${product.name} added to cart`, 'Added to Cart');
    this.loggingService.info('Product added to cart', { productId: product.id });
  }

  toggleWishlist(product: Product): void {
    this.toastr.info('Wishlist feature coming soon!', 'Feature Coming Soon');
  }

  isInWishlist(productId: string): boolean {
    return false;
  }

  quickView(product: Product): void {
    this.toastr.info('Quick view feature coming soon!', 'Feature Coming Soon');
  }

  onImageError(event: any): void {
    event.target.src = '/assets/images/placeholder.jpg';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}