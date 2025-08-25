import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';
import { DashboardStats } from '../models/dashboard.model';
import { UserProfile } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor() {}

  getDashboardStats(): Observable<DashboardStats> {
    return of({
      totalProducts: 12,
      totalOrders: 34,
      totalRevenue: 12345,
      avgRating: 4.5
    });
  }

  getProducts(): Observable<Product[]> {
    return of([
      { id:1, name:"Cotton Shirt", category:"Cotton", price:25, stock:50, status:"active", material:"Cotton", weight:"200 GSM", width:"1.2m", imageUrl:"", description:"Soft cotton shirt", colors:["White","Blue"] },
      { id:2, name:"Silk Scarf", category:"Silk", price:45, stock:20, status:"active", material:"Silk", weight:"100 GSM", width:"0.8m", imageUrl:"", description:"Luxury silk scarf", colors:["Red","Green"] }
      // 👆 aur products add kar sakte ho
    ]);
  }

  getOrders(): Observable<Order[]> {
    return of([
      { id:101, customer:"Alice", products:["Cotton Shirt"], total:25, status:"pending", date:new Date() },
      { id:102, customer:"Bob", products:["Silk Scarf"], total:45, status:"shipped", date:new Date() }
    ]);
  }

  getProfile(): Observable<UserProfile> {
    return of({
      companyName:"TextileCorp",
      contactEmail:"contact@textilecorp.com",
      phoneNumber:"+1 (555) 123-4567",
      address:"123 Fabric Street, New York, NY 10001"
    });
  }

  addProduct(product: Product): Observable<Product> {
    product.id = Math.floor(Math.random() * 1000) + 1;
    return of(product);
  }

  updateProfile(profile: UserProfile): Observable<UserProfile> {
    return of(profile);
  }
}
