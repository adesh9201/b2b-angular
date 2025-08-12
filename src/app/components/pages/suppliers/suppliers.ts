import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { Supplier, Feature  } from '../../core/models/supplier.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class Suppliers implements OnInit {

  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];

  locations: string[] = [];
  ratings: number[] = [];

  features: Feature[] = [];

  selectedLocation: string = '';
  selectedRating: string = '';

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
      this.filteredSuppliers = data;
    });

    this.supplierService.getLocations().subscribe(data => this.locations = data);
    this.supplierService.getRatings().subscribe(data => this.ratings = data);
    this.supplierService.getFeatures().subscribe(data => this.features = data);
  }

  onFilterChange(): void {
    this.filteredSuppliers = this.suppliers.filter(supplier => {
      const locationMatch = this.selectedLocation ? supplier.location === this.selectedLocation : true;
      const ratingMatch = this.selectedRating ? supplier.rating >= +this.selectedRating : true;
      return locationMatch && ratingMatch;
    });
  }
}