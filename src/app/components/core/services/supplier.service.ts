// src/app/core/services/supplier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier, Feature } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:5008/api/suppliers'; // Backend supplier API
  private locationsUrl = 'http://localhost:5008/api/suppliers/locations';
  private ratingsUrl = 'http://localhost:5008/api/suppliers/ratings';
  private featuresUrl = 'http://localhost:5008/api/suppliers/features';

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(this.locationsUrl);
  }

  getRatings(): Observable<number[]> {
    return this.http.get<number[]>(this.ratingsUrl);
  }

  getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.featuresUrl);
  }
}





























// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { Supplier, Feature } from '../models/supplier.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class SupplierService {

//   private suppliers: Supplier[] = [
//     { id: 1, name: 'Global Fabrics', location: 'USA', rating: 4.6, description: 'High-quality fabrics from USA suppliers.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80' },
//     { id: 2, name: 'Italian Textiles', location: 'Italy', rating: 4.8, description: 'Authentic Italian textile supplier.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80' },
//     { id: 3, name: 'UK Cloth Co.', location: 'UK', rating: 4.4, description: 'Reliable UK based fabric supplier.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80' },
//     { id: 4, name: 'Global Fabrics', location: 'USA', rating: 4.6, description: 'High-quality fabrics from USA suppliers.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80' },
//     { id: 5, name: 'Italian Textiles', location: 'Italy', rating: 4.8, description: 'Authentic Italian textile supplier.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80' },
//     { id: 6, name: 'UK Cloth Co.', location: 'UK', rating: 4.4, description: 'Reliable UK based fabric supplier.', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80' },
//     // more suppliers here
//   ];

//   private locations: string[] = ['USA', 'Italy', 'UK', 'India', 'China'];

//   private ratings: number[] = [4.5, 4.0, 3.5];

//   private features: Feature[] = [
//     { icon: 'fas fa-globe', title: 'Global Reach', subtitle: 'Access customers worldwide', bgClass: 'bg-primary bg-opacity-10', iconColorClass: 'text-primary' },
//     { icon: 'fas fa-chart-line', title: 'Growth Analytics', subtitle: 'Track your business performance', bgClass: 'bg-success bg-opacity-10', iconColorClass: 'text-success' },
//     { icon: 'fas fa-shield-alt', title: 'Secure Payments', subtitle: 'Safe and reliable transactions', bgClass: 'bg-warning bg-opacity-10', iconColorClass: 'text-warning' },
//     { icon: 'fas fa-headset', title: '24/7 Support', subtitle: 'Dedicated customer support', bgClass: 'bg-info bg-opacity-10', iconColorClass: 'text-info' }
//   ];

//   constructor() { }

//   getSuppliers(): Observable<Supplier[]> {
//     return of(this.suppliers);
//   }

//   getLocations(): Observable<string[]> {
//     return of(this.locations);
//   }

//   getRatings(): Observable<number[]> {
//     return of(this.ratings);
//   }

//   getFeatures(): Observable<Feature[]> {
//     return of(this.features);
//   }
// }


