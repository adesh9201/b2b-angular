import { Product } from './product.model';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedMaterial?: string;
  selectedPattern?: string;
  selectedQuantity?: number; // for fabric yards
  notes?: string;
  addedAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  totalItems: number;
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export interface CartResponse {
  success: boolean;
  data: CartItem[];
  summary: CartSummary;
}