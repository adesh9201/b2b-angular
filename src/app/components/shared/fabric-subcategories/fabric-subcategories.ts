// src/app/features/fabric-categories/fabric-categories.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FabricSubcategoryService } from '../../core/services/fabric-subcategory.service';
import { FabricSubcategoryModel } from '../../core/models/fabric-subcategory.model';


@Component({
  selector: 'app-fabric-subcategories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fabric-subcategories.html',
  styleUrls: ['./fabric-subcategories.css']
})
export class FabricSubcategories {
  allCategories: FabricSubcategoryModel[] = [];
  categoryName: string = 'Fabric Subcategories';

  constructor(private FabricSubcategoryService: FabricSubcategoryService) {}

  ngOnInit(): void {
    this.FabricSubcategoryService.getAllFabricSubcategory().subscribe({
      next: (data) => this.allCategories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }
}
