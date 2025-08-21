import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { Supplier, Feature } from '../../core/models/supplier.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class Suppliers implements OnInit {

  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];

  features: Feature[] = [];
  selectedState: string = '';

  states: string[] = [];

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    // Fetch suppliers
    this.supplierService.getSuppliers().subscribe(data => {
      this.suppliers = data;
      this.filteredSuppliers = data;

      // Extract unique states for filter dropdown
      this.states = [...new Set(data.map(s => s.state).filter(Boolean))];
    });

    // Use local features array
    this.features = this.supplierService.getFeatures();
  }

  onFilterChange(): void {
    this.filteredSuppliers = this.suppliers.filter(supplier => {
      return this.selectedState ? supplier.state === this.selectedState : true;
    });
  }
}
