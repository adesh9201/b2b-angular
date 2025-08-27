import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css'
})
export class Pricing implements OnInit, OnDestroy {
  pricingRules: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadPricingRules();
    this.loggingService.info('Vendor pricing page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPricingRules(): void {
    this.isLoading = true;
    // Mock data for now
    setTimeout(() => {
      this.pricingRules = [
        {
          id: 1,
          name: 'Bulk Discount',
          type: 'quantity',
          minQuantity: 100,
          discount: 10,
          status: 'active'
        },
        {
          id: 2,
          name: 'Seasonal Pricing',
          type: 'seasonal',
          season: 'Winter',
          markup: 15,
          status: 'active'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}