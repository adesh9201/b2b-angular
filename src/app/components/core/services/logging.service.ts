import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logLevel: LogLevel = environment.production ? LogLevel.WARN : LogLevel.DEBUG;

  debug(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, error?: any, ...args: any[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, error, ...args);
    }

    // In production, send to external logging service
    if (environment.production) {
      this.sendToExternalService('error', message, error);
    }
  }

  logUserAction(action: string, details?: any): void {
    const logData = {
      action,
      details,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.info(`User Action: ${action}`, logData);

    // Send to analytics in production
    if (environment.production && environment.enableAnalytics) {
      this.sendToAnalytics(action, details);
    }
  }

  logPerformance(metric: string, value: number, details?: any): void {
    const logData = {
      metric,
      value,
      details,
      timestamp: new Date().toISOString()
    };

    this.info(`Performance: ${metric} = ${value}ms`, logData);

    // Send to performance monitoring service
    if (environment.production) {
      this.sendToPerformanceService(metric, value, details);
    }
  }

  private sendToExternalService(level: string, message: string, error?: any): void {
    // Implementation for external logging service (e.g., Sentry, LogRocket)
    try {
      // Example:
      // this.externalLoggingService.log({
      //   level,
      //   message,
      //   error,
      //   timestamp: new Date().toISOString(),
      //   url: window.location.href,
      //   userAgent: navigator.userAgent
      // });
    } catch (e) {
      console.error('Failed to send log to external service:', e);
    }
  }

  private sendToAnalytics(action: string, details?: any): void {
    // Implementation for analytics service (e.g., Google Analytics, Mixpanel)
    try {
      // Example:
      // gtag('event', action, details);
    } catch (e) {
      console.error('Failed to send analytics event:', e);
    }
  }

  private sendToPerformanceService(metric: string, value: number, details?: any): void {
    // Implementation for performance monitoring service
    try {
      // Example:
      // this.performanceService.recordMetric(metric, value, details);
    } catch (e) {
      console.error('Failed to send performance metric:', e);
    }
  }
}