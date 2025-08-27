import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  memoryUsage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private metrics: PerformanceMetrics[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.initializePerformanceMonitoring();
    }
  }

  private initializePerformanceMonitoring(): void {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.collectPerformanceMetrics();
      }, 0);
    });

    // Monitor Core Web Vitals
    this.observeCoreWebVitals();
  }

  private collectPerformanceMetrics(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const metrics: PerformanceMetrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        firstContentfulPaint: this.getFirstContentfulPaint(),
        largestContentfulPaint: 0, // Will be updated by observer
        firstInputDelay: 0, // Will be updated by observer
        cumulativeLayoutShift: 0, // Will be updated by observer
        timeToInteractive: this.getTimeToInteractive(navigation)
      };

      // Get memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
      }

      this.metrics.push(metrics);
      this.sendMetricsToAnalytics(metrics);
    }
  }

  private getFirstContentfulPaint(): number {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  private getTimeToInteractive(navigation: PerformanceNavigationTiming): number {
    // Simplified TTI calculation
    return navigation.domContentLoadedEventEnd - navigation.fetchStart;
  }

  private observeCoreWebVitals(): void {
    // Observe Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.updateMetric('largestContentfulPaint', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.updateMetric('firstInputDelay', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Observe Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.updateMetric('cumulativeLayoutShift', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }
  }

  private updateMetric(metricName: keyof PerformanceMetrics, value: number): void {
    if (this.metrics.length > 0) {
      const lastMetric = this.metrics[this.metrics.length - 1];
      (lastMetric as any)[metricName] = value;
    }
  }

  private sendMetricsToAnalytics(metrics: PerformanceMetrics): void {
    if (environment.enableAnalytics && environment.production) {
      // Send to analytics service
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metrics,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      }).catch(err => {
        console.error('Failed to send performance metrics:', err);
      });
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAveragePageLoadTime(): number {
    if (this.metrics.length === 0) return 0;
    const total = this.metrics.reduce((sum, metric) => sum + metric.pageLoadTime, 0);
    return total / this.metrics.length;
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  measureFunction<T>(fn: () => T, name: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    
    return result;
  }

  async measureAsyncFunction<T>(fn: () => Promise<T>, name: string): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    
    return result;
  }
}