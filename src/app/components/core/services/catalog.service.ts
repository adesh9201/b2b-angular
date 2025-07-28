import { Injectable } from '@angular/core';
import { Catalog } from '../models/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogs: Catalog[] = [
    {
      id: 1,
      name: 'Cotton Kurti',
      image: 'assets/images/kurti.jpg',
      price: 499,
      description: 'Pure cotton printed kurti'
    },
    {
      id: 2,
      name: 'Silk Saree',
      image: 'assets/images/saree.jpg',
      price: 1499,
      description: 'Traditional Banarasi silk saree'
    }
  ];

  getCatalogs(): Catalog[] {
    return this.catalogs;
  }
}
