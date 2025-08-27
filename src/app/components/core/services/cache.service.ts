import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    const item: CacheItem<T> = {
      data,
      timestamp: now,
      expiry: now + ttl
    };
    
    this.cache.set(key, item);
    
    // Clean up expired items periodically
    this.cleanupExpiredItems();
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  clearByPattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  private cleanupExpiredItems(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  // HTTP Cache Headers
  getCacheHeaders(ttl: number = this.DEFAULT_TTL): Record<string, string> {
    const maxAge = Math.floor(ttl / 1000);
    return {
      'Cache-Control': `public, max-age=${maxAge}`,
      'Expires': new Date(Date.now() + ttl).toUTCString(),
      'ETag': this.generateETag()
    };
  }

  private generateETag(): string {
    return `"${Date.now()}-${Math.random().toString(36).substr(2, 9)}"`;
  }

  // Local Storage Cache (for persistent data)
  setLocalStorage<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + ttl
      };
      
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to set localStorage cache:', error);
    }
  }

  getLocalStorage<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) {
        return null;
      }
      
      const item: CacheItem<T> = JSON.parse(itemStr);
      
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.data;
    } catch (error) {
      console.warn('Failed to get localStorage cache:', error);
      return null;
    }
  }

  removeLocalStorage(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove localStorage cache:', error);
    }
  }

  // Session Storage Cache (for session data)
  setSessionStorage<T>(key: string, data: T): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to set sessionStorage cache:', error);
    }
  }

  getSessionStorage<T>(key: string): T | null {
    try {
      const itemStr = sessionStorage.getItem(key);
      return itemStr ? JSON.parse(itemStr) : null;
    } catch (error) {
      console.warn('Failed to get sessionStorage cache:', error);
      return null;
    }
  }

  removeSessionStorage(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove sessionStorage cache:', error);
    }
  }
}