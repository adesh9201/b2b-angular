// src/app/features/fabric-categories/fabric-categories.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FabricCategoryService } from '../../core/services/fabric-category.service';
import { FabricCategoryModel } from '../../core/models/fabric-category.model';


@Component({
  selector: 'app-fabric-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fabric-categories.html',
  styleUrls: ['./fabric-categories.css']
})
export class FabricCategories {
  allCategories: FabricCategoryModel[] = [];
  categoryName: string = 'Fabric Categories';

  constructor(private FabricCategoryService: FabricCategoryService) {}

  ngOnInit(): void {
    this.FabricCategoryService.getAllFabricCategory().subscribe({
      next: (data) => this.allCategories = data,
      error: (err) => console.error('Error loading categories:', err)
    });
  }
}
