import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private readonly API_URL = 'https://api.fabhub.com'; // Placeholder API
  private readonly TOKEN_KEY = 'fabhub_token';
  private readonly USER_KEY = 'fabhub_user';

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${this.API_URL}/auth/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        this.setAuth(response.token, response.user);
      })
    );
  }

  register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    company?: string;
  }): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${this.API_URL}/auth/register`, userData).pipe(
      tap(response => {
        this.setAuth(response.token, response.user);
      })
    );
  }

  logout(): void {
    this.clearAuth();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }

  isVendor(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'vendor';
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setAuth(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  // Password reset functionality
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/reset-password`, { token, newPassword });
  }

  // Profile update
  updateProfile(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/auth/profile`, userData).pipe(
      tap(user => {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  // Change password
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/change-password`, {
      currentPassword,
      newPassword
    });
  }
}
