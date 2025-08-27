export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  vendor: Vendor;
  specifications?: ProductSpecification[];
  variants?: ProductVariant[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  logo?: string;
  rating: number;
  reviews: number;
  isVerified: boolean;
  location?: string;
  website?: string;
  description?: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
  unit?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'material' | 'pattern';
  options: VariantOption[];
}

export interface VariantOption {
  id: string;
  name: string;
  value: string;
  priceModifier?: number;
  stock?: number;
  image?: string;
}

export interface ProductFilter {
  search?: string;
  categories?: string[];
  vendors?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'date';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  count?: number;
  isActive: boolean;
  sortOrder: number;
}