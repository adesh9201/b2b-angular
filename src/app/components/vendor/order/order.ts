import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';
import { OrderService } from '../../core/services/order.service';
import { VendorOrder, UpdateOrderStatusRequest } from '../../core/models/order.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, Sidebar],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order implements OnInit {
  orders: VendorOrder[] = [];
  filteredOrders: VendorOrder[] = [];
  selectedOrder: VendorOrder | null = null;
  
  // Filters
  statusFilter = '';
  dateFrom = '';
  dateTo = '';
  searchQuery = '';
  
  // UI states
  loading = false;
  showOrderModal = false;
  showUpdateStatusModal = false;
  
  // Forms
  updateStatusForm!: FormGroup;
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadOrders();
  }

  private initForms(): void {
    this.updateStatusForm = this.formBuilder.group({
      status: ['', Validators.required],
      trackingNumber: [''],
      notes: ['']
    });
  }

  private loadOrders(): void {
    this.loading = true;
    this.orderService.getVendorOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = orders;
        this.totalItems = orders.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        // Use mock data for development
        this.orders = this.getMockOrders();
        this.filteredOrders = this.orders;
        this.totalItems = this.orders.length;
        this.loading = false;
      }
    });
  }

  // Order management
  updateOrderStatus(): void {
    if (this.updateStatusForm.valid && this.selectedOrder) {
      const updateData: UpdateOrderStatusRequest = {
        status: this.updateStatusForm.value.status,
        trackingNumber: this.updateStatusForm.value.trackingNumber || undefined,
        notes: this.updateStatusForm.value.notes || undefined
      };

      this.orderService.updateOrderStatus(this.selectedOrder.id, updateData).subscribe({
        next: (updatedOrder) => {
          const index = this.orders.findIndex(o => o.id === this.selectedOrder!.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder as VendorOrder;
            this.filteredOrders = this.filteredOrders.map(o => 
              o.id === this.selectedOrder!.id ? updatedOrder as VendorOrder : o
            );
          }
          this.showUpdateStatusModal = false;
          this.selectedOrder = null;
          this.updateStatusForm.reset();
        },
        error: (error) => {
          console.error('Error updating order status:', error);
          // For development, update local array
          const index = this.orders.findIndex(o => o.id === this.selectedOrder!.id);
          if (index !== -1) {
            this.orders[index] = { 
              ...this.orders[index], 
              status: updateData.status,
              trackingNumber: updateData.trackingNumber,
              updatedAt: new Date()
            };
            this.filteredOrders = this.filteredOrders.map(o => 
              o.id === this.selectedOrder!.id ? this.orders[index] : o
            );
          }
          this.showUpdateStatusModal = false;
          this.selectedOrder = null;
          this.updateStatusForm.reset();
        }
      });
    }
  }

  openOrderModal(order: VendorOrder): void {
    this.selectedOrder = order;
    this.showOrderModal = true;
  }

  openUpdateStatusModal(order: VendorOrder): void {
    this.selectedOrder = order;
    this.updateStatusForm.patchValue({
      status: order.status,
      trackingNumber: order.trackingNumber || '',
      notes: ''
    });
    this.showUpdateStatusModal = true;
  }

  // Filtering and search
  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = !this.statusFilter || order.status === this.statusFilter;
      
      const matchesSearch = !this.searchQuery || 
        order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      let matchesDate = true;
      if (this.dateFrom) {
        const fromDate = new Date(this.dateFrom);
        matchesDate = matchesDate && new Date(order.createdAt) >= fromDate;
      }
      if (this.dateTo) {
        const toDate = new Date(this.dateTo);
        matchesDate = matchesDate && new Date(order.createdAt) <= toDate;
      }
      
      return matchesStatus && matchesSearch && matchesDate;
    });
    
    this.totalItems = this.filteredOrders.length;
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.statusFilter = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.searchQuery = '';
    this.filteredOrders = this.orders;
    this.totalItems = this.orders.length;
    this.currentPage = 1;
  }

  // Pagination
  get paginatedOrders(): VendorOrder[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Utility methods
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'confirmed': return 'bg-info';
      case 'processing': return 'bg-primary';
      case 'shipped': return 'bg-secondary';
      case 'delivered': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      case 'refunded': return 'bg-dark';
      default: return 'bg-secondary';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  // Mock data for development
  private getMockOrders(): VendorOrder[] {
    return [
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
      },
      {
        id: '2',
        orderNumber: 'ORD-2024-002',
        userId: 'user2',
        vendorId: 'vendor1',
        customerName: 'Jane Smith',
        customerEmail: 'jane.smith@example.com',
        customerPhone: '+1-555-987-6543',
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
        trackingNumber: 'TRK123456789',
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
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12')
      }
    ];
  }
}
