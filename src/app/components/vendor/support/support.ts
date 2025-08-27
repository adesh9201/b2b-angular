import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './support.html',
  styleUrl: './support.css'
})
export class Support implements OnInit, OnDestroy {
  tickets: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loggingService.info('Vendor support page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTickets(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.tickets = [
        {
          id: 1,
          ticketNumber: 'TKT-001',
          subject: 'Payment Issue',
          status: 'open',
          priority: 'high',
          date: '2024-01-15'
        },
        {
          id: 2,
          ticketNumber: 'TKT-002',
          subject: 'Account Setup',
          status: 'resolved',
          priority: 'medium',
          date: '2024-01-14'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}