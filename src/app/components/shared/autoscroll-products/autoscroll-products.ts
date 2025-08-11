import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoscrollProductsService } from '../../core/services/autoScrollProducts.services';
import { AutoscrollProductsModel } from '../../core/models/autoScrollProducts.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-autoscroll-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './autoscroll-products.html',
  styleUrls: ['./autoscroll-products.css']
})
export class AutoscrollProducts {
  allProducts: AutoscrollProductsModel[] = [];
  productChunks: AutoscrollProductsModel[][] = [];
  categoryName: string = 'Featured Products';

  constructor(private AutoscrollProductsService: AutoscrollProductsService) {
    this.allProducts = this.AutoscrollProductsService.getAllProducts();
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
