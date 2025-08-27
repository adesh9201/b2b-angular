import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit, OnDestroy {
  analytics: any = {};
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadAnalytics();
    this.loggingService.info('Vendor analytics page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAnalytics(): void {
    this.isLoading = true;
    // Mock data for now
    setTimeout(() => {
      this.analytics = {
        totalRevenue: 245000,
        totalOrders: 125,
        avgOrderValue: 1960,
        topProducts: [
          { name: 'Cotton Fabric', sales: 45 },
          { name: 'Silk Fabric', sales: 32 },
          { name: 'Wool Fabric', sales: 28 }
        ]
      };
      this.isLoading = false;
    }, 1000);
  }
}