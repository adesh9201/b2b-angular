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
      'https://www.googletagmanager.com',
      'https://js.stripe.com',
      'https://www.paypal.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Angular Material and Bootstrap
      'https://fonts.googleapis.com',
      'https://cdnjs.cloudflare.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com'
    ],
    'connect-src': [
      "'self'",
      environment.apiUrl,
      'https://www.google-analytics.com',
      'https://api.stripe.com',
      'https://api.paypal.com'
    ],
    'frame-src': [
      "'self'",
      'https://js.stripe.com',
      'https://www.paypal.com'
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"]
  };

  constructor() {
    this.setupSecurityHeaders();
  }

  private setupSecurityHeaders(): void {
    if (typeof document !== 'undefined') {
      this.setCSPHeader();
      this.setSecurityHeaders();
    }
  }

  private setCSPHeader(): void {
    const cspString = this.buildCSPString();
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = cspString;
    document.head.appendChild(meta);
  }

  private buildCSPString(): string {
    return Object.entries(this.CSP_POLICY)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');
  }

  private setSecurityHeaders(): void {
    // Additional security headers can be set here
    // Note: Most security headers are set by the server, not the client
    this.setReferrerPolicy();
  }

  private setReferrerPolicy(): void {
    const meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(meta);
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

  validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }

  generateCSRFToken(): string {
    // Generate a simple CSRF token
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  isSecureContext(): boolean {
    return typeof window !== 'undefined' && window.isSecureContext;
  }
}