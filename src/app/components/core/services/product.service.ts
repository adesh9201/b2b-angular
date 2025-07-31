// // src/app/services/product.service.ts
// import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private products: Product[] = [
//     {
//       id: 1,
//       name: 'Silk Blend',
//       description: 'Luxury, Soft, Shimmery',
//       price: 24.99,
//       imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
//       category: 'Luxury',
//       attributes: ['Luxury', 'Soft', 'Shimmery']
//     },
//     {
//       id: 2,
//       name: 'Organic Cotton',
//       description: 'Eco-friendly, Breathable',
//       price: 18.50,
//       imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
//       category: 'Eco-Friendly',
//       attributes: ['Eco-friendly', 'Breathable']
//     },
//     {
//       id: 3,
//       name: 'Denim Indigo',
//       description: 'Durable, Classic',
//       price: 15.99,
//       imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
//       category: 'Denim',
//       attributes: ['Durable', 'Classic']
//     },
//     {
//       id: 4,
//       name: 'Linen Natural',
//       description: 'Lightweight, Breathable',
//       price: 22.00,
//       imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
//       category: 'Natural',
//       attributes: ['Lightweight', 'Breathable']
//     },
//     {
//       id: 5,
//       name: 'Wool Tweed',
//       description: 'Warm, Textured',
//       price: 27.50,
//       imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
//       category: 'Wool',
//       attributes: ['Warm', 'Textured']
//     },
//     {
//       id: 6,
//       name: 'Bamboo Jersey',
//       description: 'Soft, Eco-friendly',
//       price: 19.99,
//       imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
//       category: 'Eco-Friendly',
//       attributes: ['Soft', 'Eco-friendly']
//     }
//   ];

//   getFeaturedProducts(): Product[] {
//     return this.products;
//   }
// }


// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
        {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
        {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
        {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
       {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
       {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
        {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
        {
      id: 1,
      name: "Premium Cotton Fabric",
      description: "High-quality 100% cotton fabric perfect for clothing and home textiles.",
      price: 12.99,
      originalPrice: 15.99,
      category: "Cotton",
      supplier: "TextileCorp",
      stock: 150,
      unit: "yard",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 124,
      colors: ["White", "Blue", "Red", "Green"],
      material: "100% Cotton",
      weight: "200 GSM",
      width: "60 inches",
      attributes: ["High-quality", "Durable", "Breathable"]
    },
    // ... add more sample products here following the same pattern ...
  ];

  getFeaturedProducts(): Product[] {
    return this.products;
  }
}