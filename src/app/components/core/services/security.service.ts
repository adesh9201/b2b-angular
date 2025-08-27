import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private readonly CSP_POLICY = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Angular
      "'unsafe-eval'", // Required for Angular in development
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Angular Material and Bootstrap
      'https://fonts.googleapis.com',
      'https://cdnjs.cloudflare.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com',
      'data:'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:'
    ],
    'connect-src': [
      "'self'",
      environment.apiUrl,
      'https://www.google-analytics.com',
      'wss:'
    ],
    'media-src': [
      "'self'",
      'data:',
      'blob:'
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': []
  };

  constructor() {
    this.setupSecurityHeaders();
    this.setupCSP();
  }

  private setupSecurityHeaders(): void {
    // Set security headers via meta tags
    this.setMetaTag('referrer', 'strict-origin-when-cross-origin');
    this.setMetaTag('robots', 'index, follow');
    this.setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }

  private setupCSP(): void {
    if (environment.production) {
      const cspValue = this.buildCSPString();
      this.setMetaTag('content-security-policy', cspValue);
    }
  }

  private buildCSPString(): string {
    return Object.entries(this.CSP_POLICY)
      .map(([directive, sources]) => {
        if (sources.length === 0) {
          return directive;
        }
        return `${directive} ${sources.join(' ')}`;
      })
      .join('; ');
  }

  private setMetaTag(name: string, content: string): void {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  sanitizeInput(input: string): string {
    // Basic XSS prevention
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  generateCSRFToken(): string {
    // Generate a random CSRF token
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  validateCSRFToken(token: string, storedToken: string): boolean {
    return token === storedToken && token.length > 0;
  }

  isSecureContext(): boolean {
    return window.isSecureContext;
  }

  getSecurityHeaders(): Record<string, string> {
    return {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };
  }
}