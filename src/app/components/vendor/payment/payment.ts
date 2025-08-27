import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment implements OnInit, OnDestroy {
  payments: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadPayments();
    this.loggingService.info('Vendor payment page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPayments(): void {
    this.isLoading = true;
    // Mock data for now
    setTimeout(() => {
      this.payments = [
        {
          id: 1,
          paymentId: 'PAY-001',
          orderNumber: 'ORD-001',
          customer: 'Fashion Store Ltd',
          amount: 15000,
          status: 'completed',
          method: 'Bank Transfer',
          date: '2024-01-15'
        },
        {
          id: 2,
          paymentId: 'PAY-002',
          orderNumber: 'ORD-002',
          customer: 'Textile Hub',
          amount: 25000,
          status: 'pending',
          method: 'UPI',
          date: '2024-01-14'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}
