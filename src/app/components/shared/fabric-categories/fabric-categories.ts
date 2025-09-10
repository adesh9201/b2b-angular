import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricCategoryService } from '../../core/services/fabric-category.service';
import { FabricCategoryModel } from '../../core/models/fabric-category.model';
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
  loading = true;
  error = '';

  constructor(private svc: FabricCategoryService) {}

  ngOnInit(): void {
    this.svc.getAllFabricCategory().subscribe({
      next: res => {
        const allCategories = res || [];
        this.categories = allCategories.slice(0, 8);
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load categories';
        this.loading = false;
      }
    });
  }

  openCategory(c?: FabricCategoryModel) {
    if (!c) {
      console.log('Load more clicked');
    } else {
      console.log('Open category', c);
    }
  }
}
