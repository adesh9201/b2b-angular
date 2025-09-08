import { Component, OnInit } from '@angular/core';
import { FabricService } from '../../../components/core/services/fabric.service';
import { FabricModel} from '../../../components/core/models/fabric.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fabric-admin',
  templateUrl: './fabric-admin.html',
  styleUrls: ['./fabric-admin.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class FabricAdmin implements OnInit {

  fabrics: FabricModel[] = [];
  filteredFabrics: FabricModel[] = [];
  loading = true;
  error = '';

  // Filter options
  selectedFabType = '';
  selectedQuality = '';
  priceRange = { min: 0, max: 10000 };
  searchTerm = '';

  // View options
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
        console.error('Error loading fabrics:', err);
      }
    });
  }

  updatePriceRange(): void {
    if (this.fabrics.length > 0) {
      const prices = this.fabrics
        .map(f => f.sellPrice || 0)
        .filter(price => price > 0);

      if (prices.length > 0) {
        this.priceRange.min = Math.min(...prices);
        this.priceRange.max = Math.max(...prices);
      }
    }
  }

  applyFilters(): void {
    this.filteredFabrics = this.fabrics.filter(fabric => {
      const matchesSearch = !this.searchTerm ||
        fabric.fabName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        fabric.refNo?.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesFabType = !this.selectedFabType ||
        fabric.fabType === this.selectedFabType;

      const matchesQuality = !this.selectedQuality ||
        fabric.quality === this.selectedQuality;

      const price = fabric.sellPrice || 0;
      const matchesPrice = price >= this.priceRange.min && price <= this.priceRange.max;

      return matchesSearch && matchesFabType && matchesQuality && matchesPrice;
    });

    this.sortFabrics();
  }

  sortFabrics(): void {
    this.filteredFabrics.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof FabricModel];
      let bValue: any = b[this.sortBy as keyof FabricModel];

      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase() || '';
        bValue = bValue?.toLowerCase() || '';
      }

      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.sortFabrics();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortFabrics();
  }

  clearFilters(): void {
    this.selectedFabType = '';
    this.selectedQuality = '';
    this.searchTerm = '';
    this.updatePriceRange();
    this.applyFilters();
  }

  getUniqueValues(property: keyof FabricModel): string[] {
    return [...new Set(this.fabrics
      .map(fabric => fabric[property] as string)
      .filter(value => value && value.trim() !== '')
    )].sort();
  }

  getFabricImage(fabric: FabricModel): string {
    // Placeholder image - replace with actual image URL logic
    return `https://via.placeholder.com/300x200/007bff/ffffff?text=${encodeURIComponent(fabric.fabName || 'Fabric')}`;
  }
}
