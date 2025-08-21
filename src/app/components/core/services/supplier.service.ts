import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier, Feature } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:5008/api/suppliers'; // Backend supplier API

  // Local features
  private features: Feature[] = [
    { icon: 'fas fa-globe', title: 'Global Reach', subtitle: 'Access customers worldwide', bgClass: 'bg-primary bg-opacity-10', iconColorClass: 'text-primary' },
    { icon: 'fas fa-chart-line', title: 'Growth Analytics', subtitle: 'Track your business performance', bgClass: 'bg-success bg-opacity-10', iconColorClass: 'text-success' },
    { icon: 'fas fa-shield-alt', title: 'Secure Payments', subtitle: 'Safe and reliable transactions', bgClass: 'bg-warning bg-opacity-10', iconColorClass: 'text-warning' },
    { icon: 'fas fa-headset', title: '24/7 Support', subtitle: 'Dedicated customer support', bgClass: 'bg-info bg-opacity-10', iconColorClass: 'text-info' }
  ];

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  getFeatures(): Feature[] {
    return this.features; // Return local array
  }
}
