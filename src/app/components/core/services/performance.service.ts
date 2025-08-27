import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private performanceMarks: Map<string, number> = new Map();

  constructor(private loggingService: LoggingService) {}

  markStart(name: string): void {
    this.performanceMarks.set(name, performance.now());
  }

  markEnd(name: string): number {
    const startTime = this.performanceMarks.get(name);
    if (!startTime) {
      console.warn(`Performance mark '${name}' not found`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.performanceMarks.delete(name);
    
    this.loggingService.logPerformance(name, duration);
    return duration;
  }

  measureComponentLoad(componentName: string): void {
    this.markStart(`${componentName}_load`);
    
    // Use setTimeout to measure after component is fully rendered
    setTimeout(() => {
      this.markEnd(`${componentName}_load`);
    }, 0);
  }

  measureApiCall(apiName: string, startTime?: number): void {
    if (startTime) {
      const duration = performance.now() - startTime;
      this.loggingService.logPerformance(`api_${apiName}`, duration);
    } else {
      this.markStart(`api_${apiName}`);
    }
  }

  measureRouteChange(routeName: string): void {
    this.markStart(`route_${routeName}`);
    
    // Measure route change completion
    setTimeout(() => {
      this.markEnd(`route_${routeName}`);
    }, 100);
  }

  measureUserInteraction(interactionName: string): void {
    this.markStart(`interaction_${interactionName}`);
    
    setTimeout(() => {
      this.markEnd(`interaction_${interactionName}`);
    }, 0);
  }

  getWebVitals(): void {
    // Core Web Vitals measurement
    if ('web-vital' in window) {
      // This would require web-vitals library
      // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
      
      // getCLS((metric) => this.loggingService.logPerformance('CLS', metric.value));
      // getFID((metric) => this.loggingService.logPerformance('FID', metric.value));
      // getFCP((metric) => this.loggingService.logPerformance('FCP', metric.value));
      // getLCP((metric) => this.loggingService.logPerformance('LCP', metric.value));
      // getTTFB((metric) => this.loggingService.logPerformance('TTFB', metric.value));
    }
  }

  measureBundleSize(): void {
    if (performance.getEntriesByType) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        
        this.loggingService.logPerformance('DOMContentLoaded', nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart);
        this.loggingService.logPerformance('LoadComplete', nav.loadEventEnd - nav.loadEventStart);
        this.loggingService.logPerformance('FirstByte', nav.responseStart - nav.requestStart);
      }
    }
  }
}