import { Component, OnInit } from '@angular/core';
import { FabricService } from '../../core/services/fabric.service';
import { FabricModel } from '../../core/models/fabric.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fabric-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fabric.html',
  styleUrls: ['./fabric.css']
})
export class Fabric implements OnInit {
  fabrics: FabricModel[] = [];
  filteredFabrics: FabricModel[] = [];
  loading = true;
  error = '';

  // Filters
  selectedFabType = '';
  selectedQuality = '';
  priceRange = { min: 0, max: 10000 };
  searchTerm = '';

  // View & Sort
  viewType: 'grid' | 'list' = 'grid';
  sortBy = 'fabName';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private fabricService: FabricService) {}

  ngOnInit(): void {
    this.loadFabrics();
  }

  loadFabrics(): void {
    this.loading = true;
    this.fabricService.getAll().subscribe({
      next: (data) => {
        this.fabrics = data;
        this.filteredFabrics = [...data];
        this.loading = false;
        this.updatePriceRange();
      },
      error: (err) => {
        this.error = 'Failed to load fabrics';
        this.loading = false;
        console.error(err);
      }
    });
  }

  updatePriceRange(): void {
    const prices = this.fabrics.map(f => f.sellPrice || 0).filter(p => p > 0);
    if (prices.length > 0) {
      this.priceRange.min = Math.min(...prices);
      this.priceRange.max = Math.max(...prices);
    }
  }

  // Filter & Sort
  applyFilters(): void {
    this.filteredFabrics = this.fabrics.filter(f => {
      const matchesSearch = !this.searchTerm ||
        f.fabName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        f.refNo?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesFabType = !this.selectedFabType || f.fabType === this.selectedFabType;
      const matchesQuality = !this.selectedQuality || f.quality === this.selectedQuality;
      const price = f.sellPrice || 0;
      const matchesPrice = price >= this.priceRange.min && price <= this.priceRange.max;

      return matchesSearch && matchesFabType && matchesQuality && matchesPrice;
    });

    this.sortFabrics();
  }

  sortFabrics(): void {
    this.filteredFabrics.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof FabricModel];
      let bValue: any = b[this.sortBy as keyof FabricModel];

      if (typeof aValue === 'string') { aValue = aValue?.toLowerCase(); bValue = bValue?.toLowerCase(); }

      return aValue < bValue ? (this.sortOrder === 'asc' ? -1 : 1) :
             aValue > bValue ? (this.sortOrder === 'asc' ? 1 : -1) : 0;
    });
  }

  // Price formatting
  formatPrice(price?: number): string {
    if (price == null) return '';
    return `₹${price.toFixed(2)}`;
  }

  // Placeholder image
  getPlaceholderImage(fabric: FabricModel): string {
    return fabric.fabName
      ? `https://via.placeholder.com/300x200/007bff/ffffff?text=${encodeURIComponent(fabric.fabName)}`
      : 'https://via.placeholder.com/300x200/007bff/ffffff?text=Fabric';
  }

  trackByRefNo(index: number, fabric: FabricModel): any {
    return fabric.refNo || index;
  }

  toggleWishlist(fabric: FabricModel): void {
    console.log('Wishlist toggled:', fabric.fabName);
  }

  addToCart(fabric: FabricModel): void {
    console.log('Added to cart:', fabric.fabName);
  }
}
