import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize, retry, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoggingService } from './logging.service';
import { CacheService } from './cache.service';
import { SecurityService } from './security.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private loggingService: LoggingService,
    private cacheService: CacheService,
    private securityService: SecurityService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = performance.now();
    
    // Add authentication token
    const authReq = this.addAuthToken(req);
    
    // Add security headers
    const secureReq = this.addSecurityHeaders(authReq);
    
    // Add cache headers for GET requests
    const cachedReq = this.addCacheHeaders(secureReq);

    return next.handle(cachedReq).pipe(
      retry(environment.production ? 2 : 0), // Retry failed requests in production
      timeout(30000), // 30 second timeout
      catchError((error: HttpErrorResponse) => this.handleError(error, cachedReq, next)),
      finalize(() => {
        const duration = performance.now() - startTime;
        this.loggingService.logPerformance(`api_${cachedReq.method}_${this.getEndpointName(cachedReq.url)}`, duration);
      })
    );
  }

  private addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.getAuthToken();
    
    if (token && !req.headers.has('Authorization')) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return req;
  }

  private addSecurityHeaders(req: HttpRequest<any>): HttpRequest<any> {
    const securityHeaders = this.securityService.getSecurityHeaders();
    const csrfToken = this.getCSRFToken();
    
    let headers = { ...securityHeaders };
    
    if (csrfToken && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
      headers['X-CSRF-Token'] = csrfToken;
    }
    
    return req.clone({
      setHeaders: headers
    });
  }

  private addCacheHeaders(req: HttpRequest<any>): HttpRequest<any> {
    if (req.method === 'GET') {
      const cacheKey = this.getCacheKey(req);
      const cachedData = this.cacheService.get(cacheKey);
      
      if (cachedData) {
        // Return cached data if available
        return req.clone({
          setHeaders: {
            'X-Cache': 'HIT'
          }
        });
      }
      
      // Add cache control headers
      const cacheHeaders = this.cacheService.getCacheHeaders();
      return req.clone({
        setHeaders: cacheHeaders
      });
    }
    
    return req;
  }

  private handleError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<never> {
    this.loggingService.error(`HTTP Error: ${error.status}`, error);
    
    // Handle specific error cases
    switch (error.status) {
      case 401:
        return this.handle401Error(req, next);
      case 403:
        this.loggingService.warn('Access forbidden');
        break;
      case 404:
        this.loggingService.warn('Resource not found');
        break;
      case 429:
        this.loggingService.warn('Rate limit exceeded');
        break;
      case 500:
        this.loggingService.error('Internal server error');
        break;
      case 503:
        this.loggingService.error('Service unavailable');
        break;
    }
    
    return throwError(() => error);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<never> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      
      const refreshToken = this.getRefreshToken();
      
      if (refreshToken) {
        // Attempt to refresh token
        return this.refreshAuthToken(refreshToken).pipe(
          catchError((error) => {
            this.logout();
            return throwError(() => error);
          }),
          finalize(() => {
            this.isRefreshing = false;
          })
        );
      } else {
        this.logout();
        return throwError(() => new Error('No refresh token available'));
      }
    }
    
    return this.refreshTokenSubject.pipe(
      catchError(() => {
        this.logout();
        return throwError(() => new Error('Token refresh failed'));
      })
    );
  }

  private refreshAuthToken(refreshToken: string): Observable<any> {
    // Implement token refresh logic
    // This would typically make a call to your auth service
    return throwError(() => new Error('Token refresh not implemented'));
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  private getCSRFToken(): string | null {
    return sessionStorage.getItem('csrf_token');
  }

  private getCacheKey(req: HttpRequest<any>): string {
    return `${req.method}_${req.url}_${JSON.stringify(req.params)}`;
  }

  private getEndpointName(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1] || 'unknown';
  }

  private logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.clear();
    // Redirect to login page
    window.location.href = '/login';
  }
}