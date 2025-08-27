import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logistics.html',
  styleUrl: './logistics.css'
})
export class Logistics implements OnInit, OnDestroy {
  shipments: any[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadShipments();
    this.loggingService.info('Vendor logistics page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadShipments(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.shipments = [
        {
          id: 1,
          trackingNumber: 'TRK-001',
          orderNumber: 'ORD-001',
          customer: 'Fashion Store Ltd',
          status: 'in-transit',
          carrier: 'Blue Dart',
          estimatedDelivery: '2024-01-20'
        },
        {
          id: 2,
          trackingNumber: 'TRK-002',
          orderNumber: 'ORD-002',
          customer: 'Textile Hub',
          status: 'delivered',
          carrier: 'DTDC',
          estimatedDelivery: '2024-01-18'
        }
      ];
      this.isLoading = false;
    }, 1000);
  }
}