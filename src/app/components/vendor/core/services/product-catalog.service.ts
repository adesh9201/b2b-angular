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
    { id: 1, name: 'Precision Machined Component', sku: 'PM-001', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQwF2ErfToTfFWo5F2DX4_nKmVRtsG9fGyH2y8yhR5JLzAS7UrGiOI6mNVP-G2Bn_EkEeVR6HwR5vGrrK4Y561yx_isnta0DebWDmt2tpXtq2f7k0escXf8IME6rTgb5eynbbvNra5lyI6o6hnN1pVNHPv8BF2JoJZHeA70yJrhHuh2LHEwnGC6nrjbVTyK2jbmBWJc5i9dup9Jv6sHQuu2apC6WH7Bm5o-K6tr72LWFO8Vkx1Grl3TYlE1Ab_iVB58wGTS7dXJWDl', category: 'Machining', stockStatus: 'In Stock' },
    { id: 2, name: 'Custom Metal Fabrication', sku: 'CMF-002', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxXjSobgiCon0uSGfN1RAq9i8bS0fqU0BbhfyweEUq6PReogMCSHqySYQMQ3yp47jLOF7_OMdJlFWtdYbPsX_lWCyN6vHzAuNXJovDrSJLEARvsQPhrt7_BhrUGOQIIjt6bg4KU0ic5t4--vAjWrmQy4Dx4TGI8mAaoXDFLIbfkeooGDnfSDoioHe7gU7OEpX4YU9cZ227wmqUdyEA4whS0RbNgzwkg6TJgCV5rEp5EesTvNnkeHxoMtmsBCy-Ip4hoo3bq0Hemca6', category: 'Fabrication', stockStatus: 'Low Stock' },
    { id: 3, name: 'Injection Molded Part', sku: 'IMP-003', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqWHcCxJHM6TIJN7WAtGpYGasv9cIpW0Ld-Cuec43JGzN2DW4ZHVJBFcMnh3x3IPxlccnTFS20EKG2UCIi_P_RI8QJyHf0x39LKR-tDaCi-kq10IbN9MR6aM9DYnAxUedYJkZ2tmEaljRTxhGw0_dMwjzi76j-DymleHr9HZBVmT03vxVO9sAwl29zCih7GO6iRcF2iOKvhol9w9oqMYiXRdEFnNNrvbwTZtgj5fXLP7o2DaJze6QmFRasj_ASCsHIbSgfOsYnzgDC', category: 'Molding', stockStatus: 'Out of Stock' },
    { id: 4, name: '3D Printed Prototype', sku: '3DP-004', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_bL6viO8r6lBQ_HnELcz06Bhqm34EcTmjL1GzcwTO2LuGBj5_UyCsu4dPYlGgMHOVYVFcXRrW0LN943m0uzfxXxknhzqAyVJFpNGs6xA_7w9Zp2s1lj8-Zdt9cmOAopc-eRLi0w3u4fjlYLs9Wu4YFebkEUZjrr-tdHb8ZPREHTS7Ldf1VtriEOuCboFdKgkgoOG58fZC4Xkn85LgzmEx9rVxFi9Lx98XKdgVbCSH4-akBx62OpFYJvLbLBl7tR3OUdq7GiuQNENP', category: 'Prototyping', stockStatus: 'In Stock' },
    { id: 5, name: 'Electronic Assembly', sku: 'EA-005', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD46Fhjxz2-68RIr0r_nsLW52OvkVV_8g-DggDJJ-q2M3O6qkCM9QuZXYvh_r__zt3Tx5_vu55gQma5_yWpoZzPqTXKQvD3HET2KEmyl9AugLxgSH1Q3XsedCHfTRk1r2hTqPtw_ioh76X7uwVmlVUeMTA48sxCb19Q6d7_SWiTqa9LYjtu3VeE-uK43zbZSBqpNU4ABnuc9TlI-PCX2erhu4CVEHRkrUfggm8k0TB-pyIDuUoaIPHlpxoOx_7xmetuO13grSZJ_3Bk', category: 'Assembly', stockStatus: 'Low Stock' },
    { id: 6, name: 'Surface Treated Component', sku: 'STC-006', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4FC5dbu-rr_xTJcsuACARpxw-FTr3eXw340qZjti0kGHK3Ki0FPeZvoecwaI35DTC5sBF1HBO0bVNxedqxjhn9Uqb3jRjdiWbGNbczvxdtvs3B8T40M0YqoFyIvfXlu-MWel54GRWM5XKqr398dy-1dbioyzmcK0FF1mdJN7VpnEdIkYw1eerGQOZqES_Kw2JRiJ2OuDly1k8M2LFOOLjkVqFFC_BDIOzfGyaCmRn8i5BBNRCqfPV5Gq64RWtLXL7DuNefM2IsfIj', category: 'Surface Treatment', stockStatus: 'In Stock' },
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
