import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private isInitialized = false;

  constructor() {
    if (environment.production && environment.enableAnalytics) {
      this.initializeAnalytics();
    }
  }

  private initializeAnalytics(): void {
    // Initialize Google Analytics or other analytics service
    if (typeof gtag !== 'undefined') {
      this.isInitialized = true;
    }
  }

  trackPageView(pageName: string, pagePath: string): void {
    if (!this.isInitialized) return;

    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: pagePath
    });
  }

  trackEvent(eventName: string, parameters?: any): void {
    if (!this.isInitialized) return;

    gtag('event', eventName, {
      event_category: parameters?.category || 'general',
      event_label: parameters?.label,
      value: parameters?.value
    });
  }

  trackUserAction(action: string, details?: any): void {
    this.trackEvent('user_action', {
      category: 'user_interaction',
      label: action,
      ...details
    });
  }

  trackPurchase(transactionId: string, value: number, currency: string, items: any[]): void {
    if (!this.isInitialized) return;

    gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    });
  }

  trackSearch(searchTerm: string, resultsCount: number): void {
    this.trackEvent('search', {
      category: 'search',
      label: searchTerm,
      value: resultsCount
    });
  }

  trackError(error: string, fatal: boolean = false): void {
    this.trackEvent('exception', {
      description: error,
      fatal: fatal
    });
  }

  trackPerformance(metricName: string, value: number): void {
    this.trackEvent('timing_complete', {
      name: metricName,
      value: value
    });
  }

  setUserProperties(properties: any): void {
    if (!this.isInitialized) return;

    gtag('config', 'GA_MEASUREMENT_ID', {
      custom_map: properties
    });
  }

  trackConversion(conversionId: string, value?: number, currency?: string): void {
    if (!this.isInitialized) return;

    gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency
    });
  }
}