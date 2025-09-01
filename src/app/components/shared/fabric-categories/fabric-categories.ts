import { Component, OnInit } from '@angular/core';
import { FabricCategoryService } from '../../core/services/fabric-category.service';
import { FabricCategoryModel } from '../../core/models/fabric-category.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fabric-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fabric-categories.html',
  styleUrls: ['./fabric-categories.css']
})
export class FabricCategories implements OnInit {
  categories: FabricCategoryModel[] = [];
  loading = false;

  constructor(private fabricCategoryService: FabricCategoryService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.loading = true;
    this.fabricCategoryService.getAllFabricCategory().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
