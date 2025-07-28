// // src/app/models/product.model.ts
// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category: string;
//   attributes: string[];
// }

// src/app/models/product.model.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  supplier: string;
  stock: number;
  unit: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  colors: string[];
  material: string;
  weight: string;
  width: string;
  attributes: string[];
}