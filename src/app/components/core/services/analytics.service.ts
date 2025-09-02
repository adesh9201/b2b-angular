// services/analytics.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  trackEvent(category: string, action: string, label?: string, value?: number): void {
    // Production: Replace with actual analytics implementation (Google Analytics, etc.)
    console.log('Analytics Event:', { category, action, label, value });

    // Example implementation for Google Analytics
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', action, {
    //     event_category: category,
    //     event_label: label,
    //     value: value
    //   });
    // }
  }

  trackHeroInteraction(buttonType: string, buttonText: string): void {
    this.trackEvent('Hero Section', 'CTA Click', `${buttonType}: ${buttonText}`);
  }

  trackSearch(query: string): void {
    this.trackEvent('Search', 'Hero Search', query);
  }
}
