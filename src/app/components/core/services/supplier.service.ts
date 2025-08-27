
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SupplierRegister, SendOtpRequest, VerifyOtpRequest, SupplierLogin, Feature, Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:5008/api/suppliers';


    private features: Feature[] = [
    { icon: 'fas fa-globe', title: 'Global Reach', subtitle: 'Access customers worldwide', bgClass: 'bg-primary bg-opacity-10', iconColorClass: 'text-primary' },
    { icon: 'fas fa-chart-line', title: 'Growth Analytics', subtitle: 'Track your business performance', bgClass: 'bg-success bg-opacity-10', iconColorClass: 'text-success' },
    { icon: 'fas fa-shield-alt', title: 'Secure Payments', subtitle: 'Safe and reliable transactions', bgClass: 'bg-warning bg-opacity-10', iconColorClass: 'text-warning' },
    { icon: 'fas fa-headset', title: '24/7 Support', subtitle: 'Dedicated customer support', bgClass: 'bg-info bg-opacity-10', iconColorClass: 'text-info' }
  ];


  constructor(private http: HttpClient) { }

  register(supplier: SupplierRegister): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, supplier);
  }

  sendOtp(contact: string): Observable<any> {
    const body: SendOtpRequest = { contact };
    return this.http.post(`${this.apiUrl}/send-otp`, body);
  }

  verifyOtp(contact: string, otp: string): Observable<any> {
    const body: VerifyOtpRequest = { contact, otp };
    return this.http.post(`${this.apiUrl}/verify-otp`, body);
  }

  getAllSuppliers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }



getSupplierById(id: number) {
  return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
}




    getFeatures(): Feature[] {
    return this.features;
  }

  // Mock data for development
  private mockSuppliers = [
    {
      id: 1,
      name: 'Cotton Masters Ltd',
      description: 'Leading supplier of premium cotton fabrics with over 20 years of experience',
      logo: 'assets/images/supplier-cotton.png',
      location: 'Mumbai, India',
      rating: 4.8,
      productCount: 150,
      orderCount: 1250,
      responseTime: '2 hours',
      specialties: ['Cotton', 'Natural Fibers', 'Eco-friendly'],
      categories: ['Fashion', 'Home Textiles'],
      isVerified: true,
      isPremium: true,
      establishedYear: 2003
    },
    {
      id: 2,
      name: 'Silk Heritage',
      description: 'Traditional silk fabric supplier specializing in Banarasi and Kanjeevaram silks',
      logo: 'assets/images/supplier-silk.png',
      location: 'Varanasi, India',
      rating: 4.9,
      productCount: 85,
      orderCount: 890,
      responseTime: '1 hour',
      specialties: ['Silk', 'Traditional', 'Luxury'],
      categories: ['Fashion', 'Bridal'],
      isVerified: true,
      isPremium: true,
      establishedYear: 1995
    }
  ];

  private mockCategories = [
    { id: 1, name: 'Cotton' },
    { id: 2, name: 'Silk' },
    { id: 3, name: 'Wool' },
    { id: 4, name: 'Linen' },
    { id: 5, name: 'Synthetic' }
  ];

  private mockCountries = [
    { id: 1, name: 'India' },
    { id: 2, name: 'China' },
    { id: 3, name: 'Bangladesh' },
    { id: 4, name: 'Pakistan' },
    { id: 5, name: 'Turkey' }
  ];

  getSuppliers(): Observable<any[]> {
    return of(this.mockSuppliers);
  }

  getCategories(): Observable<any[]> {
    return of(this.mockCategories);
  }

  getCountries(): Observable<any[]> {
    return of(this.mockCountries);
  }
}
