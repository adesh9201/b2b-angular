
// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { 
  Product, 
  ProductFilter, 
  ProductSearchRequest, 
  ProductSearchResponse,
  CreateProductRequest,
  UpdateProductRequest
} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = 'https://api.fabhub.com'; // Placeholder API

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(filter?: ProductFilter): Observable<Product[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.category) params = params.set('category', filter.category);
      if (filter.vendorId) params = params.set('vendorId', filter.vendorId);
      if (filter.minPrice) params = params.set('minPrice', filter.minPrice.toString());
      if (filter.maxPrice) params = params.set('maxPrice', filter.maxPrice.toString());
      if (filter.rating) params = params.set('rating', filter.rating.toString());
      if (filter.inStock !== undefined) params = params.set('inStock', filter.inStock.toString());
      if (filter.search) params = params.set('search', filter.search);
      if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
      if (filter.sortOrder) params = params.set('sortOrder', filter.sortOrder);
    }

    return this.http.get<Product[]>(`${this.API_URL}/products`, { params });
  }

  // Get product by ID
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/products/${productId}`);
  }

  // Search products
  searchProducts(request: ProductSearchRequest): Observable<ProductSearchResponse> {
    return this.http.post<ProductSearchResponse>(`${this.API_URL}/products/search`, request);
  }

  // Get featured products
  getFeaturedProducts(limit: number = 8): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products/featured?limit=${limit}`);
  }

  // Get products by category
  getProductsByCategory(category: string, limit?: number): Observable<Product[]> {
    let params = new HttpParams().set('category', category);
    if (limit) params = params.set('limit', limit.toString());
    
    return this.http.get<Product[]>(`${this.API_URL}/products/category`, { params });
  }

  // Get vendor products
  getVendorProducts(vendorId?: string): Observable<Product[]> {
    const params = vendorId ? new HttpParams().set('vendorId', vendorId) : new HttpParams();
    return this.http.get<Product[]>(`${this.API_URL}/vendor/products`, { params });
  }

  // Create product (vendor only)
  createProduct(productData: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>(`${this.API_URL}/vendor/products`, productData);
  }

  // Update product (vendor only)
  updateProduct(productId: string, productData: UpdateProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/vendor/products/${productId}`, productData);
  }

  // Delete product (vendor only)
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/vendor/products/${productId}`);
  }

  // Get product categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/products/categories`);
  }

  // Get related products
  getRelatedProducts(productId: string, limit: number = 4): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/products/${productId}/related?limit=${limit}`);
  }

  // Mock data for development
  getMockProducts(): Observable<Product[]> {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Cotton Fabric',
        description: 'High-quality 100% cotton fabric perfect for clothing and home textiles.',
        price: 25.99,
        originalPrice: 32.99,
        category: 'Cotton',
        vendorId: 'vendor1',
        stock: 150,
        unit: 'meter',
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80'],
        rating: 4.8,
        totalReviews: 124,
        colors: ['White', 'Blue', 'Red'],
        material: '100% Cotton',
        weight: '200 GSM',
        width: '60 inches',
        attributes: ['Breathable', 'Soft', 'Durable'],
        discount: 21,
        minOrder: 10,
        isActive: true,
        isFeatured: true,
        tags: ['cotton', 'fabric', 'premium'],
        specifications: [
          { name: 'Material', value: '100% Cotton' },
          { name: 'Weight', value: '200 GSM' },
          { name: 'Width', value: '60 inches' }
        ],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Silk Fabric Roll',
        description: 'Luxurious silk fabric with natural sheen for premium garments.',
        price: 89.99,
        originalPrice: 119.99,
        category: 'Silk',
        vendorId: 'vendor1',
        stock: 50,
        unit: 'meter',
        images: ['https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=400&q=80'],
        rating: 4.9,
        totalReviews: 89,
        colors: ['Black', 'Gold', 'Silver'],
        material: '100% Silk',
        weight: '150 GSM',
        width: '45 inches',
        attributes: ['Luxurious', 'Natural Sheen', 'Breathable'],
        discount: 25,
        minOrder: 5,
        isActive: true,
        isFeatured: true,
        tags: ['silk', 'luxury', 'premium'],
        specifications: [
          { name: 'Material', value: '100% Silk' },
          { name: 'Weight', value: '150 GSM' },
          { name: 'Width', value: '45 inches' }
        ],
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'Wool Blend Fabric',
        description: 'Warm and durable wool blend fabric for winter clothing.',
        price: 45.99,
        originalPrice: 55.99,
        category: 'Wool',
        vendorId: 'vendor2',
        stock: 75,
        unit: 'meter',
        images: ['https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=400&q=80'],
        rating: 4.6,
        totalReviews: 67,
        colors: ['Navy', 'Gray', 'Brown'],
        material: '70% Wool, 30% Polyester',
        weight: '280 GSM',
        width: '58 inches',
        attributes: ['Warm', 'Durable', 'Wrinkle-resistant'],
        discount: 18,
        minOrder: 8,
        isActive: true,
        isFeatured: false,
        tags: ['wool', 'winter', 'warm'],
        specifications: [
          { name: 'Material', value: '70% Wool, 30% Polyester' },
          { name: 'Weight', value: '280 GSM' },
          { name: 'Width', value: '58 inches' }
        ],
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-12')
      },
      {
        id: '4',
        name: 'Linen Fabric',
        description: 'Natural linen fabric for summer clothing and home textiles.',
        price: 35.99,
        originalPrice: 42.99,
        category: 'Linen',
        vendorId: 'vendor1',
        stock: 90,
        unit: 'meter',
        images: ['https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=80'],
        rating: 4.7,
        totalReviews: 93,
        colors: ['Natural', 'White', 'Beige'],
        material: '100% Linen',
        weight: '220 GSM',
        width: '54 inches',
        attributes: ['Natural', 'Breathable', 'Durable'],
        discount: 16,
        minOrder: 12,
        isActive: true,
        isFeatured: true,
        tags: ['linen', 'natural', 'summer'],
        specifications: [
          { name: 'Material', value: '100% Linen' },
          { name: 'Weight', value: '220 GSM' },
          { name: 'Width', value: '54 inches' }
        ],
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-14')
      }
    ];

    return of(mockProducts);
  }

  getMockFeaturedProducts(): Observable<Product[]> {
    return this.getMockProducts().pipe(
      map(products => products.filter(p => p.isFeatured).slice(0, 4))
    );
  }

  getMockProductsByCategory(category: string): Observable<Product[]> {
    return this.getMockProducts().pipe(
      map(products => products.filter(p => p.category === category))
    );
  }
}
