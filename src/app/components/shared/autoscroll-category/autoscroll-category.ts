import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoscrollCategoryService } from '../../core/services/autoScrollCategory.service';
import { AutoscrollCategoryModel } from '../../core/models/autoScrollCategory.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-autoscroll-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './autoscroll-category.html',
  styleUrls: ['./autoscroll-category.css']
})
export class AutoscrollCategory {
  allProducts: AutoscrollCategoryModel[] = [];
  productChunks: AutoscrollCategoryModel[][] = [];
  categoryName: string = 'Featured Categories';

  constructor(private AutoscrollCategoryService: AutoscrollCategoryService) {
    this.allProducts = this.AutoscrollCategoryService.getAllCategory();
    this.chunkProducts();
  }

  private chunkProducts(): void {
    const chunkSize = 6;
    this.productChunks = [];  // clear before chunking (good practice)
    for (let i = 0; i < this.allProducts.length; i += chunkSize) {
      this.productChunks.push(this.allProducts.slice(i, i + chunkSize));
    }
  }
}
