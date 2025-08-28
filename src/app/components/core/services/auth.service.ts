import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse, UserRole } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://api.fabhub.com/api/auth'; // Placeholder API
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userStr = localStorage.getItem(this.userKey);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, request).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  logout(): void {
    this.clearAuth();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  isVendor(): boolean {
    return this.hasRole(UserRole.VENDOR);
  }

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  isCustomer(): boolean {
    return this.hasRole(UserRole.CUSTOMER);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  // Mock methods for development
  mockLogin(email: string, password: string): Observable<AuthResponse> {
    const mockUser: User = {
      id: '1',
      email: email,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      role: UserRole.CUSTOMER,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token'
    };

    return new Observable(observer => {
      setTimeout(() => {
        this.handleAuthSuccess(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }

  mockRegister(request: RegisterRequest): Observable<AuthResponse> {
    const mockUser: User = {
      id: '1',
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      phone: request.phone,
      role: request.role || UserRole.CUSTOMER,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const mockResponse: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token'
    };

    return new Observable(observer => {
      setTimeout(() => {
        this.handleAuthSuccess(mockResponse);
        observer.next(mockResponse);
        observer.complete();
      }, 1000);
    });
  }
}
