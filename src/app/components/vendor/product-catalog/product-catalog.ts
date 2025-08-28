import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';
import { ProductService } from '../../core/services/product.service';
import { OrderService } from '../../core/services/order.service';
import { VendorService } from '../../core/services/vendor.service';
import { Product } from '../../core/models/product.model';
import { VendorOrder } from '../../core/models/order.model';
import { Vendor } from '../../core/models/vendor.model';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, Sidebar],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalog implements OnInit {
  // Dashboard stats
  totalProducts = 0;
  totalOrders = 0;
  totalRevenue = 0;
  averageRating = 0;

  // Products
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;

  // Orders
  orders: VendorOrder[] = [];
  filteredOrders: VendorOrder[] = [];

  // Forms
  addProductForm!: FormGroup;
  editProductForm!: FormGroup;

  // UI states
  loading = false;
  showAddModal = false;
  showEditModal = false;
  showOrderModal = false;
  selectedOrder: VendorOrder | null = null;
  searchQuery = '';
  categoryFilter = '';
  orderStatusFilter = '';

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private vendorService: VendorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadDashboardData();
    this.loadProducts();
    this.loadOrders();
  }

  private initForms(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      material: ['', Validators.required],
      weight: ['', Validators.required],
      width: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      colors: [''],
      minOrder: ['', [Validators.required, Validators.min(1)]]
    });

    this.editProductForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      material: ['', Validators.required],
      weight: ['', Validators.required],
      width: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      colors: [''],
      minOrder: ['', [Validators.required, Validators.min(1)]]
    });
  }

  private loadDashboardData(): void {
    this.vendorService.getVendorStats().subscribe({
      next: (stats) => {
        this.totalProducts = stats.totalProducts;
        this.totalOrders = stats.totalOrders;
        this.totalRevenue = stats.totalRevenue;
        this.averageRating = stats.averageRating;
      },
      error: (error) => {
        console.error('Error loading vendor stats:', error);
        // Use mock data for development
        this.totalProducts = 45;
        this.totalOrders = 156;
        this.totalRevenue = 12500;
        this.averageRating = 4.8;
      }
    });
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService.getVendorProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        // Use mock data for development
        this.products = this.getMockProducts();
        this.filteredProducts = this.products;
        this.loading = false;
      }
    });
  }

  private loadOrders(): void {
    this.orderService.getVendorOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = orders;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        // Use mock data for development
        this.orders = this.getMockOrders();
        this.filteredOrders = this.orders;
      }
    });
  }

  // Product management
  addProduct(): void {
    if (this.addProductForm.valid) {
      const productData = this.addProductForm.value;
      this.productService.createProduct(productData).subscribe({
        next: (product) => {
          this.products.unshift(product);
          this.filteredProducts = this.products;
          this.showAddModal = false;
          this.addProductForm.reset();
          this.loadDashboardData();
        },
        error: (error) => {
          console.error('Error adding product:', error);
          // For development, add to local array
          const newProduct: Product = {
            id: Date.now().toString(),
            ...productData,
            vendorId: 'current-vendor',
            images: [productData.imageUrl],
            rating: 0,
            totalReviews: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          this.products.unshift(newProduct);
          this.filteredProducts = this.products;
          this.showAddModal = false;
          this.addProductForm.reset();
        }
      });
    }
  }

  editProduct(): void {
    if (this.editProductForm.valid && this.selectedProduct) {
      const productData = this.editProductForm.value;
      this.productService.updateProduct(this.selectedProduct.id, productData).subscribe({
        next: (updatedProduct) => {
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
            this.filteredProducts = this.products;
          }
          this.showEditModal = false;
          this.selectedProduct = null;
        },
        error: (error) => {
          console.error('Error updating product:', error);
          // For development, update local array
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          if (index !== -1) {
            this.products[index] = { ...this.products[index], ...productData, updatedAt: new Date() };
            this.filteredProducts = this.products;
          }
          this.showEditModal = false;
          this.selectedProduct = null;
        }
      });
    }
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== productId);
          this.filteredProducts = this.filteredProducts.filter(p => p.id !== productId);
          this.loadDashboardData();
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          // For development, remove from local array
          this.products = this.products.filter(p => p.id !== productId);
          this.filteredProducts = this.filteredProducts.filter(p => p.id !== productId);
        }
      });
    }
  }

  openEditModal(product: Product): void {
    this.selectedProduct = product;
    this.editProductForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      material: product.material || '',
      weight: product.weight || '',
      width: product.width || '',
      stock: product.stock || 0,
      imageUrl: product.images[0] || '',
      colors: product.colors?.join(', ') || '',
      minOrder: product.minOrder || 1
    });
    this.showEditModal = true;
  }

  // Order management
  updateOrderStatus(orderId: string, status: string): void {
    this.orderService.updateOrderStatus(orderId, { status: status as any }).subscribe({
      next: (updatedOrder) => {
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          this.orders[index] = updatedOrder as VendorOrder;
          this.filteredOrders = this.filteredOrders.map(o => 
            o.id === orderId ? updatedOrder as VendorOrder : o
          );
        }
      },
      error: (error) => {
        console.error('Error updating order status:', error);
        // For development, update local array
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          this.orders[index].status = status as any;
          this.filteredOrders = this.filteredOrders.map(o => 
            o.id === orderId ? { ...o, status: status as any } : o
          );
        }
      }
    });
  }

  openOrderModal(order: VendorOrder): void {
    this.selectedOrder = order;
    this.showOrderModal = true;
  }

  // Filtering and search
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchQuery || 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.categoryFilter || product.category === this.categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }

  filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => {
      return !this.orderStatusFilter || order.status === this.orderStatusFilter;
    });
  }

  // Mock data for development
  private getMockProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Premium Cotton Fabric',
        description: 'High-quality cotton fabric perfect for clothing and home textiles',
        price: 25.99,
        category: 'Cotton',
        vendorId: 'vendor1',
        images: ['https://via.placeholder.com/300x200'],
        rating: 4.8,
        totalReviews: 45,
        material: '100% Cotton',
        weight: '200 GSM',
        width: '60 inches',
        stock: 100,
        colors: ['White', 'Blue', 'Red'],
        minOrder: 10,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Silk Fabric Roll',
        description: 'Luxurious silk fabric for premium garments',
        price: 89.99,
        category: 'Silk',
        vendorId: 'vendor1',
        images: ['https://via.placeholder.com/300x200'],
        rating: 4.9,
        totalReviews: 32,
        material: '100% Silk',
        weight: '150 GSM',
        width: '45 inches',
        stock: 50,
        colors: ['Black', 'Gold', 'Silver'],
        minOrder: 5,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-10')
      }
    ];
  }

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
      }
    ];
  }
}
