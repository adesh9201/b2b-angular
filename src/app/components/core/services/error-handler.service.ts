import { Injectable, ErrorHandler, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private toastr = inject(ToastrService);

  handleError(error: any): void {
    console.error('Global error caught:', error);

    // Log error to external service in production
    if (environment.production) {
      this.logErrorToService(error);
    }

    // Show user-friendly error message
    this.showUserFriendlyError(error);

    // Log to console in development
    if (!environment.production) {
      console.error('Error details:', error);
    }
  }

  private logErrorToService(error: any): void {
    // In production, send error to logging service
    // Example: Sentry, LogRocket, etc.
    try {
      // Example implementation:
      // this.loggingService.logError({
      //   message: error.message,
      //   stack: error.stack,
      //   url: window.location.href,
      //   timestamp: new Date().toISOString(),
      //   userAgent: navigator.userAgent
      // });
    } catch (loggingError) {
      console.error('Failed to log error to service:', loggingError);
    }
  }

  private showUserFriendlyError(error: any): void {
    let message = 'An unexpected error occurred. Please try again.';

    if (error?.message) {
      // Handle specific error types
      if (error.message.includes('Network')) {
        message = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('404')) {
        message = 'The requested resource was not found.';
      } else if (error.message.includes('500')) {
        message = 'Server error. Please try again later.';
      } else if (error.message.includes('403')) {
        message = 'You do not have permission to perform this action.';
      } else if (error.message.includes('401')) {
        message = 'Please log in to continue.';
      }
    }

    this.toastr.error(message, 'Error', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true
    });
  }
}

// HTTP Error Interceptor
@Injectable()
export class HttpErrorInterceptor {
  private toastr = inject(ToastrService);

  intercept(req: any, next: any): any {
    return next.handle(req).pipe(
      catchError((error: any) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request. Please check your input.';
              break;
            case 401:
              errorMessage = 'Unauthorized. Please log in.';
              break;
            case 403:
              errorMessage = 'Forbidden. You do not have permission.';
              break;
            case 404:
              errorMessage = 'Resource not found.';
              break;
            case 500:
              errorMessage = 'Internal server error. Please try again later.';
              break;
            case 503:
              errorMessage = 'Service unavailable. Please try again later.';
              break;
            default:
              errorMessage = `Error: ${error.status} - ${error.statusText}`;
          }
        }

        this.toastr.error(errorMessage, 'Error');
        return throwError(() => error);
      })
    );
  }
}

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';