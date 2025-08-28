import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { OrderModel, OrderQuery } from '../models/order.model';
import { environment } from '../../../../../../src/environments/environment'

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = environment.apiBaseUrl?.replace(/\/$/, '') || ''; // '' -> use mock
  private MOCK_DELAY_MS = 400;

  // small built-in mock dataset (you can expand)
  private mockData: OrderModel[] = [
    { id: '12354', buyer: 'Lambda Innovations', status: 'Shipped', date: '2023-08-06', amount: 1100 },
    { id: '12353', buyer: 'Kappa Systems', status: 'Delivered', date: '2023-08-07', amount: 2200 },
    { id: '12352', buyer: 'Iota Solutions', status: 'Processing', date: '2023-08-08', amount: 750 },
    { id: '12351', buyer: 'Theta Enterprises', status: 'Shipped', date: '2023-08-09', amount: 1800 },
    { id: '12350', buyer: 'Zeta Group', status: 'Delivered', date: '2023-08-10', amount: 3000 },
    { id: '12349', buyer: 'Epsilon Co', status: 'Processing', date: '2023-08-11', amount: 900 },
    { id: '12348', buyer: 'Delta LLC', status: 'Shipped', date: '2023-08-12', amount: 1500 },
    { id: '12347', buyer: 'Gamma Ltd', status: 'Delivered', date: '2023-08-13', amount: 2500 },
    { id: '12346', buyer: 'Beta Inc', status: 'Processing', date: '2023-08-14', amount: 850 },
    { id: '12345', buyer: 'Acme Corp', status: 'Shipped', date: '2023-08-15', amount: 1200 },
    // add more if you want large dataset...
  ];

  constructor(private http: HttpClient) {}

  /**
   * List orders with server-like behavior.
   * If baseUrl provided, calls GET /orders with query params (expects { items, total }).
   * Otherwise uses local mock data (filter/sort/page).
   */
  list(query: OrderQuery = {}): Observable<{ items: OrderModel[]; total: number }> {
    if (this.baseUrl) {
      let params = new HttpParams();
      if (query.page != null) params = params.set('page', String(query.page));
      if (query.perPage != null) params = params.set('perPage', String(query.perPage));
      if (query.search) params = params.set('search', query.search);
      if (query.status) params = params.set('status', query.status);
      if (query.sortBy) params = params.set('sortBy', query.sortBy);
      if (query.sortDir) params = params.set('sortDir', query.sortDir);
      return this.http.get<{ items: OrderModel[]; total: number }>(`${this.baseUrl}/orders`, { params }).pipe(
        catchError(err => {
          console.error('OrderService HTTP error', err);
          return throwError(() => err);
        })
      );
    }

    // Mock path: apply search, filter, sort, paginate locally
    const page = query.page && query.page > 0 ? query.page : 1;
    const perPage = query.perPage && query.perPage > 0 ? query.perPage : 10;
    const search = (query.search || '').trim().toLowerCase();
    const status = (query.status || '').trim().toLowerCase();

    let items = this.mockData.slice();

    if (search) {
      items = items.filter(
        (o) =>
          o.id.toLowerCase().includes(search) ||
          o.buyer.toLowerCase().includes(search)
      );
    }

    if (status) {
      items = items.filter((o) => o.status.toLowerCase() === status);
    }

    if (query.sortBy) {
      const dir = query.sortDir === 'asc' ? 1 : -1;
      items.sort((a, b) => {
        if (query.sortBy === 'amount') return (a.amount - b.amount) * dir;
        // default date
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
      });
    } else {
      // default: newest first
      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    const total = items.length;
    const start = (page - 1) * perPage;
    const pageItems = items.slice(start, start + perPage);

    return of({ items: pageItems, total }).pipe(delay(this.MOCK_DELAY_MS));
  }

  get(orderId: string): Observable<OrderModel> {
    if (this.baseUrl) {
      return this.http.get<OrderModel>(`${this.baseUrl}/orders/${orderId}`).pipe(catchError(err => throwError(() => err)));
    }
    const found = this.mockData.find(m => m.id === orderId);
    return found ? of(found).pipe(delay(this.MOCK_DELAY_MS)) : throwError(() => ({ status: 404, message: 'Not found' }));
  }

  updateStatus(orderId: string, status: string): Observable<OrderModel> {
    if (this.baseUrl) {
      return this.http.patch<OrderModel>(`${this.baseUrl}/orders/${orderId}`, { status }).pipe(catchError(err => throwError(() => err)));
    }
    const idx = this.mockData.findIndex(m => m.id === orderId);
    if (idx === -1) return throwError(() => ({ status: 404 }));
    this.mockData[idx] = { ...this.mockData[idx], status };
    return of(this.mockData[idx]).pipe(delay(this.MOCK_DELAY_MS));
  }

  exportCsv(query: OrderQuery = {}): Observable<Blob> {
    // If real backend: request CSV blob
    if (this.baseUrl) {
      let params = new HttpParams();
      if (query.search) params = params.set('search', query.search);
      if (query.status) params = params.set('status', query.status);
      return this.http.get(`${this.baseUrl}/orders/export`, { params, responseType: 'blob' }).pipe(catchError(err => throwError(() => err)));
    }

    // Mock CSV building from filtered full dataset (no pagination)
    const filtered = this._applyFilterSortToArray(this.mockData, query);
    const header = ['Order ID', 'Buyer', 'Status', 'Date', 'Amount'];
    const rows = filtered.map(r => [r.id, r.buyer, r.status, r.date, r.amount.toString()]);
    const csv = [header.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    return of(blob).pipe(delay(this.MOCK_DELAY_MS));
  }

  private _applyFilterSortToArray(arr: OrderModel[], query: OrderQuery = {}): OrderModel[] {
    let items = arr.slice();
    const search = (query.search || '').trim().toLowerCase();
    const status = (query.status || '').trim().toLowerCase();
    if (search) items = items.filter(o => o.id.toLowerCase().includes(search) || o.buyer.toLowerCase().includes(search));
    if (status) items = items.filter(o => o.status.toLowerCase() === status);
    if (query.sortBy) {
      const dir = query.sortDir === 'asc' ? 1 : -1;
      items.sort((a, b) => {
        if (query.sortBy === 'amount') return (a.amount - b.amount) * dir;
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
      });
    } else {
      items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return items;
  }
}
