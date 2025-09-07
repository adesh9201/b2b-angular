export interface TestModel {
  productId: string;       // GUID
  supplierId: number;
  categoryId?: number;
  name: string;
  description?: string;
  sku: string;
  price: number;
  discountPercent?: number;
  finalPrice?: number;     // computed on frontend optionally
  stockQuantity: number;
  fabricType?: string;
  color?: string;
  colorHexCode?: string;
  pattern?: string;
  width?: string;
  weight?: string;
  imagePath?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}


