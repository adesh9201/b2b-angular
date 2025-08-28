

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  vendorId: string;
  vendor?: Vendor;
  stock: number;
  unit?: string;
  images: string[];
  rating: number;
  totalReviews: number;
  colors?: string[];
  material?: string;
  weight?: string;
  width?: string;
  attributes?: string[];
  discount?: number;
  minOrder?: number;
  isActive: boolean;
  isFeatured?: boolean;
  tags?: string[];
  specifications?: ProductSpecification[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductFilter {
  category?: string;
  vendorId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price' | 'rating' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductSearchRequest {
  query: string;
  category?: string;
  vendorId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  images: string[];
  colors?: string[];
  material?: string;
  weight?: string;
  width?: string;
  attributes?: string[];
  minOrder?: number;
  tags?: string[];
  specifications?: ProductSpecification[];
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  category?: string;
  stock?: number;
  images?: string[];
  colors?: string[];
  material?: string;
  weight?: string;
  width?: string;
  attributes?: string[];
  minOrder?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  specifications?: ProductSpecification[];
}

// Import Vendor interface
export interface Vendor {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
}
