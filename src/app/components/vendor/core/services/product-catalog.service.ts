import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product } from '../models/product-catalog.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  // NOTE: in production replace with HttpClient calls to backend APIs.
  private readonly MOCK_DELAY = 300;

  private products: Product[] = [
    { id: 1, name: 'WHITE/LT GREEN CAMBRIC DOT PRINT', sku: 'PM-001', imageUrl: 'assets/images/aa.jpeg', category: 'Machining', stockStatus: 'In Stock' },
    { id: 2, name: 'COTTON CAMBRIC BORDER PRINT', sku: 'CMF-002', imageUrl: 'assets/images/aa.jpeg', category: 'Fabrication', stockStatus: 'Low Stock' },
    { id: 3, name: 'GREEN/BLACK VISCOSE MOSS CREPE FLOWER PRINT', sku: 'IMP-003', imageUrl: 'assets/images/aa.jpeg', category: 'Molding', stockStatus: 'Out of Stock' },
    { id: 4, name: 'LILAC COTTON DOUBLE CLOTH BORDER EMBROIDERY DYED', sku: '3DP-004', imageUrl: 'assets/images/aa.jpeg', category: 'Prototyping', stockStatus: 'In Stock' },
    { id: 5, name: 'LIGHT PINK COTTON TWILL DOBBY DYED', sku: 'EA-005', imageUrl: 'assets/images/aa.jpeg', category: 'Assembly', stockStatus: 'Low Stock' },
    { id: 6, name: 'LILAC POLYESTER TWILL DYED', sku: 'STC-006', imageUrl: 'assets/images/aa.jpeg', category: 'Surface Treatment', stockStatus: 'In Stock' },
    // ... expand list for realistic dataset
  ];

  constructor() {}

  /** Return all products (mock). In real app, call backend via HttpClient. */
  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(this.MOCK_DELAY));
  }

  /** Return unique categories for filter UI */
  getCategories(): Observable<string[]> {
    const cats = Array.from(new Set(this.products.map(p => p.category))).sort();
    return of(cats).pipe(delay(this.MOCK_DELAY));
  }

  /** Export CSV (mock) — returns a string blob; in production this may stream from backend */
  exportCsv(filtered: { search?: string; category?: string; status?: string } = {}) {
    // apply same filtering logic as component (simple)
    let data = this.products.slice();
    if (filtered.search) {
      const s = filtered.search.toLowerCase();
      data = data.filter(p => p.name.toLowerCase().includes(s) || p.sku.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }
    if (filtered.category) data = data.filter(p => p.category === filtered.category);
    if (filtered.status) data = data.filter(p => p.stockStatus === filtered.status);

    const header = ['id', 'name', 'sku', 'category', 'stockStatus'];
    const csv = [
      header.join(','),
      ...data.map(r => [r.id, `"${r.name.replace(/"/g, '""')}"`, r.sku, r.category, r.stockStatus].join(','))
    ].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // mimic async
    return of(blob).pipe(delay(this.MOCK_DELAY));
  }
}
