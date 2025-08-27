import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews implements OnInit, OnDestroy {
  reviews: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadReviews();
    this.loggingService.info('Vendor reviews page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadReviews(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.reviews = [
        {
          id: 1,
          customer: 'Fashion Store Ltd',
          product: 'Cotton Fabric',
          rating: 5,
          comment: 'Excellent quality fabric, fast delivery!',
          date: '2024-01-15'
        },
        {
          id: 2,
          customer: 'Textile Hub',
          product: 'Silk Fabric',
          rating: 4,
          comment: 'Good quality, but delivery was delayed.',
          date: '2024-01-14'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}