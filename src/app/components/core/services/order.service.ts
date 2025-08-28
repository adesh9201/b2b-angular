import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { 
  Order, 
  CreateOrderRequest, 
  UpdateOrderStatusRequest, 
  OrderFilter, 
  OrderSummary,
  VendorOrder 
} from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = 'https://api.fabhub.com'; // Placeholder API

  constructor(private http: HttpClient) {}

  // Customer orders
  getCustomerOrders(filter?: OrderFilter): Observable<Order[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.status) params = params.set('status', filter.status);
      if (filter.dateFrom) params = params.set('dateFrom', filter.dateFrom.toISOString());
      if (filter.dateTo) params = params.set('dateTo', filter.dateTo.toISOString());
      if (filter.search) params = params.set('search', filter.search);
    }

    return this.http.get<Order[]>(`${this.API_URL}/orders`, { params });
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/orders/${orderId}`);
  }

  createOrder(orderData: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.API_URL}/orders`, orderData);
  }

  cancelOrder(orderId: string, reason?: string): Observable<Order> {
    return this.http.post<Order>(`${this.API_URL}/orders/${orderId}/cancel`, { reason });
  }

  // Vendor orders
  getVendorOrders(filter?: OrderFilter): Observable<VendorOrder[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.status) params = params.set('status', filter.status);
      if (filter.dateFrom) params = params.set('dateFrom', filter.dateFrom.toISOString());
      if (filter.dateTo) params = params.set('dateTo', filter.dateTo.toISOString());
      if (filter.search) params = params.set('search', filter.search);
    }

    return this.http.get<VendorOrder[]>(`${this.API_URL}/vendor/orders`, { params });
  }

  updateOrderStatus(orderId: string, updateData: UpdateOrderStatusRequest): Observable<Order> {
    return this.http.put<Order>(`${this.API_URL}/vendor/orders/${orderId}/status`, updateData);
  }

  getVendorOrderSummary(): Observable<OrderSummary> {
    return this.http.get<OrderSummary>(`${this.API_URL}/vendor/orders/summary`);
  }

  // Admin orders
  getAllOrders(filter?: OrderFilter): Observable<Order[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.status) params = params.set('status', filter.status);
      if (filter.vendorId) params = params.set('vendorId', filter.vendorId);
      if (filter.customerId) params = params.set('customerId', filter.customerId);
      if (filter.dateFrom) params = params.set('dateFrom', filter.dateFrom.toISOString());
      if (filter.dateTo) params = params.set('dateTo', filter.dateTo.toISOString());
      if (filter.search) params = params.set('search', filter.search);
    }

    return this.http.get<Order[]>(`${this.API_URL}/admin/orders`, { params });
  }

  getAdminOrderSummary(): Observable<OrderSummary> {
    return this.http.get<OrderSummary>(`${this.API_URL}/admin/orders/summary`);
  }

  // Mock data for development
  getMockOrders(): Observable<Order[]> {
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        userId: 'user1',
        vendorId: 'vendor1',
        items: [
          {
            id: 'item1',
            productId: 'prod1',
            productName: 'Premium Cotton Fabric',
            productImage: 'https://via.placeholder.com/150',
            quantity: 2,
            unitPrice: 25.99,
            totalPrice: 51.98
          }
        ],
        status: 'pending',
        subtotal: 51.98,
        tax: 5.20,
        shipping: 10.00,
        total: 67.18,
        currency: 'USD',
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001',
          phone: '+1-555-123-4567'
        },
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001',
          phone: '+1-555-123-4567'
        },
        paymentMethod: { type: 'credit_card' },
        paymentStatus: 'paid',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        orderNumber: 'ORD-2024-002',
        userId: 'user2',
        vendorId: 'vendor1',
        items: [
          {
            id: 'item2',
            productId: 'prod2',
            productName: 'Silk Fabric Roll',
            productImage: 'https://via.placeholder.com/150',
            quantity: 1,
            unitPrice: 89.99,
            totalPrice: 89.99
          }
        ],
        status: 'shipped',
        subtotal: 89.99,
        tax: 9.00,
        shipping: 15.00,
        total: 113.99,
        currency: 'USD',
        shippingAddress: {
          firstName: 'Jane',
          lastName: 'Smith',
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
          zipCode: '90210',
          phone: '+1-555-987-6543'
        },
        billingAddress: {
          firstName: 'Jane',
          lastName: 'Smith',
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
          zipCode: '90210',
          phone: '+1-555-987-6543'
        },
        paymentMethod: { type: 'paypal' },
        paymentStatus: 'paid',
        trackingNumber: 'TRK123456789',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12')
      }
    ];

    return of(mockOrders);
  }

  getMockVendorOrders(): Observable<VendorOrder[]> {
    const mockVendorOrders: VendorOrder[] = [
      {
        id: '1',
        orderNumber: 'ORD-2024-001',
        userId: 'user1',
        vendorId: 'vendor1',
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        customerPhone: '+1-555-123-4567',
        items: [
          {
            id: 'item1',
            productId: 'prod1',
            productName: 'Premium Cotton Fabric',
            productImage: 'https://via.placeholder.com/150',
            quantity: 2,
            unitPrice: 25.99,
            totalPrice: 51.98
          }
        ],
        status: 'pending',
        subtotal: 51.98,
        tax: 5.20,
        shipping: 10.00,
        total: 67.18,
        currency: 'USD',
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001',
          phone: '+1-555-123-4567'
        },
        billingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001',
          phone: '+1-555-123-4567'
        },
        paymentMethod: { type: 'credit_card' },
        paymentStatus: 'paid',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      }
    ];

    return of(mockVendorOrders);
  }
}