import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { InventoryModel } from '../models/inventory.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // set baseUrl = 'https://api.yourdomain.com' to switch to real backend
  private baseUrl = '';
  private MOCK_DELAY = 300;

  // Mock inventory dataset
  private products: InventoryModel[] = [
    { id: 'p-001', name: 'WHITE/LT GREEN CAMBRIC DOT PRINT', sku: 'SKU-12345', imageUrl: 'assets/images/aa.jpeg', category: 'Cleaning', stockStatus: 'In Stock', price: 12.5, location: 'Warehouse A', lowStockThreshold: 50, quantity: 1500 },
    { id: 'p-002', name: 'COTTON CAMBRIC BORDER PRINT', sku: 'SKU-67890', imageUrl: 'assets/images/aa.jpeg', category: 'Cleaning', stockStatus: 'Low Stock', price: 9.99, location: 'Warehouse B', lowStockThreshold: 20, quantity: 800 },
    { id: 'p-003', name: 'GREEN/BLACK VISCOSE MOSS CREPE FLOWER PRINT', sku: 'SKU-11223', imageUrl: 'assets/images/aa.jpeg', category: 'Cleaning', stockStatus: 'In Stock', price: 7.5, location: 'Warehouse A', lowStockThreshold: 30, quantity: 1200 },
    { id: 'p-004', name: 'LILAC COTTON DOUBLE CLOTH BORDER EMBROIDERY DYED', sku: 'SKU-33445', imageUrl: 'assets/images/aa.jpeg', category: 'Paper', stockStatus: 'In Stock', price: 15.0, location: 'Warehouse C', lowStockThreshold: 100, quantity: 2000 },
    { id: 'p-005', name: 'LIGHT PINK COTTON TWILL DOBBY DYED', sku: 'SKU-55667', imageUrl: 'assets/images/aa.jpeg', category: 'Accessories', stockStatus: 'Low Stock', price: 2.5, location: 'Warehouse B', lowStockThreshold: 10, quantity: 500 },
    { id: 'p-006', name: 'LILAC POLYESTER TWILL DYED', sku: 'SKU-99881', imageUrl: 'assets/images/aa.jpeg', category: 'Cleaning', stockStatus: 'Out of Stock', price: 20.0, location: 'Warehouse A', lowStockThreshold: 15, quantity: 0 },


    // add more realistic entries as required
  ];

  constructor(private http?: HttpClient) {}

  /**
   * Returns all inventories. If you set baseUrl, swap to HTTP get with query params.
   */
  getInventories(): Observable<InventoryModel[]> {
    if (this.baseUrl && this.http) {
      return this.http.get<InventoryModel[]>(`${this.baseUrl}/inventories`).pipe(
        // map/transform as necessary
      );
    }
    return of(this.products.slice()).pipe(delay(this.MOCK_DELAY));
  }

  getInventory(id: string): Observable<InventoryModel> {
    if (this.baseUrl && this.http) {
      return this.http.get<InventoryModel>(`${this.baseUrl}/inventories/${id}`);
    }
    const found = this.products.find(p => p.id === id);
    return found ? of({ ...found }).pipe(delay(this.MOCK_DELAY)) : throwError(() => ({ status: 404, message: 'Not found' }));
  }

  updateInventory(id: string, patch: Partial<InventoryModel>): Observable<InventoryModel> {
    if (this.baseUrl && this.http) {
      return this.http.patch<InventoryModel>(`${this.baseUrl}/inventories/${id}`, patch);
    }
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) return throwError(() => ({ status: 404 }));
    this.products[idx] = { ...this.products[idx], ...patch };
    return of({ ...this.products[idx] }).pipe(delay(this.MOCK_DELAY));
  }

  buildCsv(items: InventoryModel[]): Blob {
    const header = ['ID', 'Name', 'SKU', 'Category', 'StockStatus', 'Quantity', 'Price', 'Location'];
    const rows = items.map(i => [
      i.id,
      i.name,
      i.sku,
      i.category || '',
      i.stockStatus || '',
      i.quantity != null ? String(i.quantity) : '',
      i.price != null ? String(i.price) : '',
      i.location || ''
    ]);
    const csv = [header.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\r\n');
    return new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  }
}
