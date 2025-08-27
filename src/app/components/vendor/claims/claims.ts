import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './claims.html',
  styleUrl: './claims.css'
})
export class Claims implements OnInit, OnDestroy {
  claims: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadClaims();
    this.loggingService.info('Vendor claims page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadClaims(): void {
    this.isLoading = true;
    // Mock data for now
    setTimeout(() => {
      this.claims = [
        {
          id: 1,
          claimNumber: 'CLM-001',
          orderNumber: 'ORD-001',
          customer: 'Fashion Store Ltd',
          reason: 'Defective Product',
          amount: 5000,
          status: 'pending',
          date: '2024-01-15'
        },
        {
          id: 2,
          claimNumber: 'CLM-002',
          orderNumber: 'ORD-002',
          customer: 'Textile Hub',
          reason: 'Wrong Size',
          amount: 3000,
          status: 'approved',
          date: '2024-01-14'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}