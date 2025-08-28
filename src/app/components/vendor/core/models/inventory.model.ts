export interface InventoryModel {
  id: string;
  name: string;
  sku: string;
  imageUrl?: string;
  category?: string;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  price?: number;
  location?: string;
  lowStockThreshold?: number;
  quantity?: number;
}
