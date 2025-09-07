import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TestService } from '../../core/services/test.service';
import { TestModel } from '../../core/models/test.model';

@Component({
  selector: 'app-test',
  standalone: true,           // make it standalone
  imports: [ FormsModule, CommonModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class Test implements OnInit {


  products: TestModel[] = [];
  page: number = 1;          // current page
  pageSize: number = 20;     // items per page
  totalProducts: number = 0; // total products count

  loading: boolean = false;
  errorMessage: string = '';

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.errorMessage = '';

    this.testService.getAll().subscribe({
      next: (data) => {
        this.totalProducts = data.length; // total products count
        // Pagination: slice data for current page
        this.products = data.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  // Calculate total pages
  getTotalPages(): number {
    return Math.ceil(this.totalProducts / this.pageSize);
  }

  nextPage() {
    if (this.page < this.getTotalPages()) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}
