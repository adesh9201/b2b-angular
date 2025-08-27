import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Catalog } from '../models/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogs: any[] = [
    {
      id: 1,
      name: 'Cotton Collection 2024',
      description: 'Comprehensive catalog of premium cotton fabrics',
      coverImage: 'assets/images/catalog-cotton.jpg',
      vendor: {
        id: 1,
        name: 'Cotton Masters',
        logo: 'assets/images/vendor-cotton.png'
      },
      productCount: 150,
      pageCount: 45,
      categories: ['Cotton', 'Natural Fibers'],
      isNew: true,
      isFeatured: true,
      isDigital: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Silk Premium Collection',
      description: 'Luxury silk fabrics for high-end fashion',
      coverImage: 'assets/images/catalog-silk.jpg',
      vendor: {
        id: 2,
        name: 'Silk Heritage',
        logo: 'assets/images/vendor-silk.png'
      },
      productCount: 85,
      pageCount: 32,
      categories: ['Silk', 'Luxury'],
      isNew: false,
      isFeatured: true,
      isDigital: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    }
  ];

  private categories = [
    { id: 1, name: 'Cotton' },
    { id: 2, name: 'Silk' },
    { id: 3, name: 'Wool' },
    { id: 4, name: 'Linen' },
    { id: 5, name: 'Synthetic' }
  ];

  private vendors = [
    { id: 1, name: 'Cotton Masters' },
    { id: 2, name: 'Silk Heritage' },
    { id: 3, name: 'Wool Works' },
    { id: 4, name: 'Linen Luxe' }
  ];

  getCatalogs(): Observable<any[]> {
    return of(this.catalogs);
  }

  getCategories(): Observable<any[]> {
    return of(this.categories);
  }

  getVendors(): Observable<any[]> {
    return of(this.vendors);
  }
}
