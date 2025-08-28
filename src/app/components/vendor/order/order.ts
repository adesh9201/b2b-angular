import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';
import { OrderService } from '../../core/services/order.service';
import { Order, OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'app-order',
  imports: [RouterLink, CommonModule, FormsModule, Sidebar],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {
  orders: Order[] = [];
  isLoading = false;
  selectedStatus = '';
  searchQuery = '';
  selectedOrder: Order | null = null;
  showOrderModal = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.isLoading = true;
    // Use mock orders for development
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
      this.isLoading = false;
    });
  }

  getFilteredOrders(): Order[] {
    let filtered = this.orders;

    if (this.searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.shippingAddress.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(order => order.status === this.selectedStatus);
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  openOrderModal(order: Order): void {
    this.selectedOrder = order;
    this.showOrderModal = true;
  }

  closeOrderModal(): void {
    this.showOrderModal = false;
    this.selectedOrder = null;
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.updatedAt = new Date();
      
      // In a real app, you would call the service
      // this.orderService.updateOrderStatus(orderId, { status: newStatus }).subscribe();
    }
  }

  getStatusBadgeClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-warning';
      case OrderStatus.CONFIRMED:
        return 'bg-info';
      case OrderStatus.PROCESSING:
        return 'bg-primary';
      case OrderStatus.SHIPPED:
        return 'bg-success';
      case OrderStatus.DELIVERED:
        return 'bg-success';
      case OrderStatus.CANCELLED:
        return 'bg-danger';
      case OrderStatus.REFUNDED:
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }

  getStatusText(status: OrderStatus): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  calculateTotalItems(order: Order): number {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
