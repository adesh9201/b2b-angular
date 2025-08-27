import { Injectable, ErrorHandler, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ErrorLog {
  message: string;
  stack?: string;
  timestamp: Date;
  url: string;
  userAgent: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private errorLogs: ErrorLog[] = [];

  handleError(error: any): void {
    const errorLog: ErrorLog = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.getCurrentUserId()
    };

    this.errorLogs.push(errorLog);

    // Log to console in development
    if (!environment.production) {
      console.error('Global Error Handler:', errorLog);
    }

    // Send to logging service in production
    if (environment.production) {
      this.sendErrorToLoggingService(errorLog);
    }

    // Show user-friendly error message
    this.showUserFriendlyError(error);
  }

  private getCurrentUserId(): string | undefined {
    // Implement logic to get current user ID from auth service
    return localStorage.getItem('userId') || undefined;
  }

  private sendErrorToLoggingService(errorLog: ErrorLog): void {
    // Implement integration with logging service (e.g., Sentry, LogRocket, etc.)
    fetch('/api/logs/error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorLog)
    }).catch(err => {
      console.error('Failed to send error log:', err);
    });
  }

  private showUserFriendlyError(error: any): void {
    // Show toast notification or modal with user-friendly message
    const message = this.getUserFriendlyMessage(error);
    
    // You can integrate with your toast service here
    if (typeof window !== 'undefined' && window.alert) {
      // Fallback to alert for critical errors
      if (error.name === 'ChunkLoadError') {
        window.location.reload();
      }
    }
  }

  private getUserFriendlyMessage(error: any): string {
    if (error.name === 'ChunkLoadError') {
      return 'Application update detected. Please refresh the page.';
    }
    
    if (error.message?.includes('Loading chunk')) {
      return 'Network error. Please check your connection and try again.';
    }

    if (error.status === 0) {
      return 'Unable to connect to server. Please check your internet connection.';
    }

    if (error.status === 404) {
      return 'The requested resource was not found.';
    }

    if (error.status === 500) {
      return 'Server error. Please try again later.';
    }

    return 'An unexpected error occurred. Please try again.';
  }

  getErrorLogs(): ErrorLog[] {
    return [...this.errorLogs];
  }

  clearErrorLogs(): void {
    this.errorLogs = [];
  }
}