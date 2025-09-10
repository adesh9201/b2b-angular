import { Component, OnInit } from '@angular/core';
import { FabricCategoryService } from '../../core/services/fabric-category.service';
import { FabricCategoryModel } from '../../core/models/fabric-category.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-autoscroll-category',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './autoscroll-category.html',
  styleUrls: ['./autoscroll-category.css']
})
export class AutoscrollCategory implements OnInit  {

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
