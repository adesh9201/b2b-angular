import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly roleKey = 'auth_role';
  private readonly contactKey = 'auth_contact';

  constructor(private http: HttpClient) {}

  // Placeholder login via OTP verification simulation
  loginWithOtp(contact: string, otp: string): Observable<{ token: string; role: 'user' | 'admin' | 'vendor' } > {
    const token = btoa(`verified:${contact}:${Date.now()}`);
    const role: 'user' | 'admin' | 'vendor' = 'vendor';
    return of({ token, role }).pipe(
      tap(({ token, role }) => {
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem(this.roleKey, role);
        localStorage.setItem(this.contactKey, contact);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  hasRole(required: 'admin' | 'vendor' | 'user'): boolean {
    const role = localStorage.getItem(this.roleKey) as 'admin' | 'vendor' | 'user' | null;
    if (!role) return false;
    if (required === 'user') return true;
    return role === required;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.contactKey);
  }
}
