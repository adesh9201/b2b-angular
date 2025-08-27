import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function httpErrorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        // Example: redirect to login on 401
        if (error.status === 401) {
          authService.logout();
          // Could navigate to login if router is available
        }

        // Log server-side errors
        console.error('HTTP Error:', {
          url: request.url,
          status: error.status,
          message: error.message,
          error: error.error
        });
      }
      return throwError(() => error);
    })
  );
}

