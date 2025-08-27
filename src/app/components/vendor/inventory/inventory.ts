import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit, OnDestroy {
  inventory: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadInventory();
    this.loggingService.info('Vendor inventory page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInventory(): void {
    this.isLoading = true;
    // Mock data for now
    setTimeout(() => {
      this.inventory = [
        {
          id: 1,
          name: 'Cotton Fabric - Premium',
          sku: 'COT-001',
          quantity: 150,
          price: 250,
          category: 'Cotton',
          status: 'in-stock'
        },
        {
          id: 2,
          name: 'Silk Fabric - Luxury',
          sku: 'SLK-002',
          quantity: 75,
          price: 850,
          category: 'Silk',
          status: 'low-stock'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}