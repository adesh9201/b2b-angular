import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './marketing.html',
  styleUrl: './marketing.css'
})
export class Marketing implements OnInit, OnDestroy {
  campaigns: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadCampaigns();
    this.loggingService.info('Vendor marketing page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCampaigns(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.campaigns = [
        {
          id: 1,
          name: 'Summer Collection 2024',
          type: 'Email',
          status: 'active',
          reach: 1250,
          clicks: 45,
          conversions: 12
        },
        {
          id: 2,
          name: 'New Product Launch',
          type: 'Social Media',
          status: 'paused',
          reach: 850,
          clicks: 28,
          conversions: 8
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}