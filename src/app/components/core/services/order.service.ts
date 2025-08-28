import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/cart.model';

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  getMyOrders(): Observable<Order[]> {
    return of([]);
  }
}

