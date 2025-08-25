// product.model.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  material: string;
  weight: string;
  width: string;
  imageUrl: string;
  description: string;
  colors: string[];
}
