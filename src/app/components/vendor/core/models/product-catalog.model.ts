export interface Product {
  id: number;
  name: string;
  sku: string;
  imageUrl: string;
  category: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock' | string;
  // add more fields later: price, leadTime, vendor, etc.
}
