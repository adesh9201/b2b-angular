import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalog implements OnInit, OnDestroy {
  products: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loggingService.info('Vendor product catalog page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProducts(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.products = [
        {
          id: 1,
          name: 'Premium Cotton Fabric',
          sku: 'COT-001',
          price: 250,
          category: 'Cotton',
          status: 'active',
          stock: 150
        },
        {
          id: 2,
          name: 'Luxury Silk Fabric',
          sku: 'SLK-002',
          price: 850,
          category: 'Silk',
          status: 'active',
          stock: 75
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}