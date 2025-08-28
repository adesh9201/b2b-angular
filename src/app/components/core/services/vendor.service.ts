import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Vendor } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private readonly API_URL = 'https://api.fabhub.com'; // Placeholder API

  constructor(private http: HttpClient) {}

  // Get all vendors
  getVendors(filter?: {
    category?: string;
    location?: string;
    rating?: number;
    search?: string;
  }): Observable<Vendor[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.category) params = params.set('category', filter.category);
      if (filter.location) params = params.set('location', filter.location);
      if (filter.rating) params = params.set('rating', filter.rating.toString());
      if (filter.search) params = params.set('search', filter.search);
    }

    return this.http.get<Vendor[]>(`${this.API_URL}/vendors`, { params });
  }

  // Get vendor by ID
  getVendorById(vendorId: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.API_URL}/vendors/${vendorId}`);
  }

  // Get current vendor profile
  getCurrentVendorProfile(): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.API_URL}/vendor/profile`);
  }

  // Update vendor profile
  updateVendorProfile(vendorData: Partial<Vendor>): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.API_URL}/vendor/profile`, vendorData);
  }

  // Register new vendor
  registerVendor(vendorData: {
    businessName: string;
    email: string;
    phone: string;
    password: string;
    businessType: string;
    description?: string;
    specialties: string[];
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  }): Observable<{ vendor: Vendor; token: string }> {
    return this.http.post<{ vendor: Vendor; token: string }>(`${this.API_URL}/vendors/register`, vendorData);
  }

  // Get vendor statistics
  getVendorStats(): Observable<{
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
  }> {
    return this.http.get<{
      totalProducts: number;
      totalOrders: number;
      totalRevenue: number;
      averageRating: number;
      totalReviews: number;
    }>(`${this.API_URL}/vendor/stats`);
  }

  // Get vendor reviews
  getVendorReviews(vendorId: string, page: number = 1, limit: number = 10): Observable<{
    reviews: any[];
    total: number;
    averageRating: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{
      reviews: any[];
      total: number;
      averageRating: number;
    }>(`${this.API_URL}/vendors/${vendorId}/reviews`, { params });
  }

  // Verify vendor account
  verifyVendorAccount(verificationData: {
    businessLicense: string;
    taxId: string;
    bankAccount: string;
  }): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.API_URL}/vendor/verify`, verificationData);
  }

  // Mock data for development
  getMockVendors(): Observable<Vendor[]> {
    const mockVendors: Vendor[] = [
      {
        id: '1',
        businessName: 'Premium Textiles Co.',
        email: 'contact@premiumtextiles.com',
        phone: '+1-555-123-4567',
        businessType: 'Manufacturer',
        description: 'Leading manufacturer of premium quality fabrics for fashion and home textiles.',
        specialties: ['Cotton', 'Silk', 'Wool'],
        address: {
          street: '123 Fabric Street',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001'
        },
        rating: 4.8,
        totalReviews: 156,
        totalProducts: 45,
        isVerified: true,
        yearsInBusiness: 15,
        certifications: ['ISO 9001', 'OEKO-TEX'],
        website: 'https://premiumtextiles.com',
        socialMedia: {
          facebook: 'premiumtextiles',
          instagram: 'premiumtextiles',
          linkedin: 'premium-textiles-co'
        },
        contactPerson: {
          name: 'John Smith',
          email: 'john@premiumtextiles.com',
          phone: '+1-555-123-4568'
        },
        businessHours: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 4:00 PM',
          sunday: 'Closed'
        },
        paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal'],
        shippingMethods: ['Standard', 'Express', 'Overnight'],
        minimumOrder: 100,
        commissionRate: 0.15,
        createdAt: new Date('2020-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        businessName: 'Silk Paradise',
        email: 'info@silkparadise.com',
        phone: '+1-555-987-6543',
        businessType: 'Wholesaler',
        description: 'Specialized in high-quality silk fabrics and luxury textiles.',
        specialties: ['Silk', 'Velvet', 'Satin'],
        address: {
          street: '456 Luxury Lane',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
          zipCode: '90210'
        },
        rating: 4.9,
        totalReviews: 89,
        totalProducts: 32,
        isVerified: true,
        yearsInBusiness: 8,
        certifications: ['OEKO-TEX', 'GOTS'],
        website: 'https://silkparadise.com',
        socialMedia: {
          facebook: 'silkparadise',
          instagram: 'silkparadise_luxury',
          linkedin: 'silk-paradise'
        },
        contactPerson: {
          name: 'Sarah Johnson',
          email: 'sarah@silkparadise.com',
          phone: '+1-555-987-6544'
        },
        businessHours: {
          monday: '8:00 AM - 7:00 PM',
          tuesday: '8:00 AM - 7:00 PM',
          wednesday: '8:00 AM - 7:00 PM',
          thursday: '8:00 AM - 7:00 PM',
          friday: '8:00 AM - 7:00 PM',
          saturday: '9:00 AM - 5:00 PM',
          sunday: 'Closed'
        },
        paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal'],
        shippingMethods: ['Standard', 'Express'],
        minimumOrder: 200,
        commissionRate: 0.12,
        createdAt: new Date('2021-03-20'),
        updatedAt: new Date('2024-01-10')
      }
    ];

    return of(mockVendors);
  }
}