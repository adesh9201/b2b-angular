import { Component, OnInit } from '@angular/core';
import { Shipment } from '../../vendor/core/models/logistic.model';
import { LogisticService } from '../../vendor/core/services/logistic.service';

import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logistics',
  imports: [ CommonModule, Sidebar],
  templateUrl: './logistics.html',
  styleUrl: './logistics.css'
})
export class Logistics implements OnInit {
  shipments: Shipment[] = [];

  constructor(private logisticService: LogisticService) {}

  ngOnInit(): void {
    this.shipments = this.logisticService.getShipments();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Delivered':
        return 'btn btn-success btn-sm w-100';
      case 'In Transit':
        return 'btn btn-primary btn-sm w-100';
      case 'Pending':
        return 'btn btn-warning btn-sm w-100';
      default:
        return 'btn btn-secondary btn-sm w-100';
    }
  }
}
