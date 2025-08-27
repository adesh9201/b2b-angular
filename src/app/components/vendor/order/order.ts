import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit, OnDestroy {
  orders: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loggingService.info('Vendor orders page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadOrders(): void {
    this.isLoading = true;
    // Mock data for now
    setTimeout(() => {
      this.orders = [
        {
          id: 1,
          orderNumber: 'ORD-001',
          customer: 'Fashion Store Ltd',
          date: '2024-01-15',
          status: 'pending',
          total: 15000,
          items: 5
        },
        {
          id: 2,
          orderNumber: 'ORD-002',
          customer: 'Textile Hub',
          date: '2024-01-14',
          status: 'processing',
          total: 25000,
          items: 8
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}
