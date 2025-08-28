import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order, CreateOrderRequest, UpdateOrderStatusRequest, OrderStatus } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = 'https://api.fabhub.com/api/orders'; // Placeholder API
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMockOrders();
  }

  // Get all orders for current user
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/my-orders`);
  }

  // Get order by ID
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }

  // Create new order
  createOrder(request: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}`, request);
  }

  // Update order status (for vendors)
  updateOrderStatus(id: string, request: UpdateOrderStatusRequest): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}/status`, request);
  }

  // Cancel order
  cancelOrder(id: string): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/${id}/cancel`, {});
  }

  // Get vendor orders (for vendors)
  getVendorOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/vendor`);
  }

  // Get orders by status
  getOrdersByStatus(status: OrderStatus): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/status/${status}`);
  }

  // Mock methods for development
  private loadMockOrders(): void {
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: 'user1',
        vendorId: 'vendor1',
        items: [
          {
            id: 'item1',
            productId: 'prod1',
            productName: 'Cotton Fabric',
            productImage: 'https://via.placeholder.com/150',
            quantity: 2,
            unitPrice: 25.99,
            totalPrice: 51.98
          }
        ],
        status: OrderStatus.PENDING,
        totalAmount: 51.98,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        billingAddress: {
          fullName: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        shippingMethod: 'standard',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        userId: 'user1',
        vendorId: 'vendor2',
        items: [
          {
            id: 'item2',
            productId: 'prod2',
            productName: 'Silk Fabric',
            productImage: 'https://via.placeholder.com/150',
            quantity: 1,
            unitPrice: 45.99,
            totalPrice: 45.99
          }
        ],
        status: OrderStatus.SHIPPED,
        totalAmount: 45.99,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        billingAddress: {
          fullName: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'credit_card',
        paymentStatus: 'paid',
        shippingMethod: 'express',
        trackingNumber: 'TRK123456789',
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date()
      }
    ];

    this.ordersSubject.next(mockOrders);
  }

  mockCreateOrder(request: CreateOrderRequest): Observable<Order> {
    const mockOrder: Order = {
      id: Date.now().toString(),
      userId: 'user1',
      vendorId: 'vendor1',
      items: request.items,
      status: OrderStatus.PENDING,
      totalAmount: request.items.reduce((sum, item) => sum + item.totalPrice, 0),
      shippingAddress: request.shippingAddress,
      billingAddress: request.billingAddress,
      paymentMethod: request.paymentMethod,
      paymentStatus: 'pending',
      shippingMethod: request.shippingMethod,
      notes: request.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return new Observable(observer => {
      setTimeout(() => {
        const currentOrders = this.ordersSubject.value;
        this.ordersSubject.next([mockOrder, ...currentOrders]);
        observer.next(mockOrder);
        observer.complete();
      }, 1000);
    });
  }

  mockUpdateOrderStatus(id: string, request: UpdateOrderStatusRequest): Observable<Order> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentOrders = this.ordersSubject.value;
        const orderIndex = currentOrders.findIndex(order => order.id === id);
        
        if (orderIndex !== -1) {
          const updatedOrder = { ...currentOrders[orderIndex], ...request, updatedAt: new Date() };
          currentOrders[orderIndex] = updatedOrder;
          this.ordersSubject.next([...currentOrders]);
          observer.next(updatedOrder);
        } else {
          observer.error('Order not found');
        }
        observer.complete();
      }, 500);
    });
  }
}