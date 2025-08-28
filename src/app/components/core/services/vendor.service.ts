import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Vendor, CreateVendorRequest, UpdateVendorRequest, VendorStats } from '../models/vendor.model';

@Injectable({ providedIn: 'root' })
export class VendorService {
  private baseUrl = 'https://api.fabhub.com/api/vendors'; // Placeholder API
  private currentVendorSubject = new BehaviorSubject<Vendor | null>(null);
  public currentVendor$ = this.currentVendorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMockVendor();
  }

  // Get current vendor profile
  getCurrentVendor(): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/profile`);
  }

  // Create vendor profile
  createVendor(request: CreateVendorRequest): Observable<Vendor> {
    return this.http.post<Vendor>(`${this.baseUrl}`, request);
  }

  // Update vendor profile
  updateVendor(request: UpdateVendorRequest): Observable<Vendor> {
    return this.http.patch<Vendor>(`${this.baseUrl}/profile`, request);
  }

  // Get vendor stats
  getVendorStats(): Observable<VendorStats> {
    return this.http.get<VendorStats>(`${this.baseUrl}/stats`);
  }

  // Get all vendors (for admin/customer)
  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.baseUrl}`);
  }

  // Get vendor by ID
  getVendorById(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.baseUrl}/${id}`);
  }

  // Upload vendor document
  uploadDocument(file: File, type: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post(`${this.baseUrl}/documents`, formData);
  }

  // Mock methods for development
  private loadMockVendor(): void {
    const mockVendor: Vendor = {
      id: 'vendor1',
      userId: 'user1',
      businessName: 'Premium Fabrics Co.',
      businessDescription: 'Leading supplier of high-quality fabrics for fashion and home decor industries.',
      contactPerson: 'John Smith',
      email: 'john@premiumfabrics.com',
      phone: '+1234567890',
      address: {
        street: '123 Fabric Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      businessType: 'manufacturer',
      categories: ['cotton', 'silk', 'wool', 'synthetic'],
      documents: [
        {
          id: 'doc1',
          type: 'business_license',
          fileName: 'business_license.pdf',
          fileUrl: 'https://example.com/business_license.pdf',
          uploadedAt: new Date(),
          isVerified: true
        }
      ],
      status: 'active',
      rating: 4.5,
      totalOrders: 150,
      totalProducts: 45,
      isVerified: true,
      createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
      updatedAt: new Date()
    };

    this.currentVendorSubject.next(mockVendor);
  }

  mockCreateVendor(request: CreateVendorRequest): Observable<Vendor> {
    const mockVendor: Vendor = {
      id: 'vendor' + Date.now(),
      userId: 'user1',
      businessName: request.businessName,
      businessDescription: request.businessDescription,
      contactPerson: request.contactPerson,
      email: request.email,
      phone: request.phone,
      address: request.address,
      businessType: request.businessType,
      categories: request.categories,
      documents: [],
      status: 'pending',
      rating: 0,
      totalOrders: 0,
      totalProducts: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return new Observable(observer => {
      setTimeout(() => {
        this.currentVendorSubject.next(mockVendor);
        observer.next(mockVendor);
        observer.complete();
      }, 1000);
    });
  }

  mockUpdateVendor(request: UpdateVendorRequest): Observable<Vendor> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentVendor = this.currentVendorSubject.value;
        if (currentVendor) {
          const updatedVendor = { ...currentVendor, ...request, updatedAt: new Date() };
          this.currentVendorSubject.next(updatedVendor);
          observer.next(updatedVendor);
        } else {
          observer.error('Vendor not found');
        }
        observer.complete();
      }, 500);
    });
  }

  mockGetVendorStats(): Observable<VendorStats> {
    const mockStats: VendorStats = {
      totalProducts: 45,
      totalOrders: 150,
      totalRevenue: 125000,
      averageRating: 4.5,
      pendingOrders: 12,
      completedOrders: 138
    };

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockStats);
        observer.complete();
      }, 500);
    });
  }
}