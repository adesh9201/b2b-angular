import { Injectable } from '@angular/core';
import { Shipment } from '../models/logistic.model';

@Injectable({
  providedIn: 'root'
})
export class LogisticService {
  private shipments: Shipment[] = [
    {
      date: '2025-08-15',
      shipmentId: 'SHIP12345',
      courier: 'Delhivery',
      origin: 'Mumbai',
      destination: 'Delhi',
      weight: '12kg',
      status: 'In Transit'
    },
    {
      date: '2025-08-20',
      shipmentId: 'SHIP67890',
      courier: 'Blue Dart',
      origin: 'Bangalore',
      destination: 'Chennai',
      weight: '8kg',
      status: 'Delivered'
    },
    {
      date: '2025-08-25',
      shipmentId: 'SHIP54321',
      courier: 'DTDC',
      origin: 'Hyderabad',
      destination: 'Kolkata',
      weight: '15kg',
      status: 'Pending'
    }
  ];

  getShipments(): Shipment[] {
    return this.shipments;
  }
}
