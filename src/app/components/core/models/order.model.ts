export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  vendorId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  trackingNumber?: string;
  customer?: User;
  vendor?: Vendor;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export interface PaymentMethod {
  type: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  details?: {
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
}

export interface CreateOrderRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface OrderFilter {
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  vendorId?: string;
  customerId?: string;
  search?: string;
}

export interface OrderSummary {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  averageOrderValue: number;
}

// Vendor specific order interface
export interface VendorOrder extends Order {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

// Import other models
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  vendorId: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface Vendor {
  id: string;
  businessName: string;
  email: string;
  phone: string;
}