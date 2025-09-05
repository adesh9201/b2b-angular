// services/hero.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HeroContent, FabricCategory, SearchSuggestion } from '../models/HeroSection.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroContent: HeroContent = {
    id: 'main-hero',
    title: 'India\'s Largest B2B Fabric Marketplace',
    subtitle: 'Connect. Trade. Grow.',
    description: 'Source premium fabrics directly from verified manufacturers and suppliers across India. Join thousands of businesses already growing with FabHub.',
    ctaButtons: [
      {
        text: 'Start Buying',
        link: '/fabric',
        type: 'primary',
        icon: 'fas fa-shopping-cart'
      },
      {
        text: 'Become a Seller',
        link: '/register',
        type: 'secondary',
        icon: 'fas fa-store'
      }
    ],
    backgroundImage: 'assets/images/aa.jpeg',
    statistics: [
      {
        value: '50,000+',
        label: 'Total Active  Buyers',
        icon: 'fas fa-users'
      },
      {
        value: '10,000+',
        label: 'Verified Suppliers',
        icon: 'fas fa-industry'
      },
      {
        value: '5L+',
        label: 'Fabric Varieties',
        icon: 'fas fa-th-large'
      },
      {
        value: '500+',
        label: 'Cities Covered',
        icon: 'fas fa-map-marker-alt'
      }
    ],
    features: [
      'Quality Assured Products',
      'Bulk Order Management',
      'Competitive Pricing',
      'Pan-India Logistics'
    ],
    isActive: true
  };

  private fabricCategories: FabricCategory[] = [
    { id: '1', name: 'Cotton', count: 15000, icon: 'fab-cotton' },
    { id: '2', name: 'Silk', count: 8500, icon: 'fab-silk' },
    { id: '3', name: 'Polyester', count: 12000, icon: 'fab-polyester' },
    { id: '4', name: 'Denim', count: 6500, icon: 'fab-denim' },
    { id: '5', name: 'Linen', count: 4200, icon: 'fab-linen' },
    { id: '6', name: 'Wool', count: 3800, icon: 'fab-wool' },
    { id: '7', name: 'Denim', count: 6500, icon: 'fab-denim' },
    { id: '8', name: 'Linen', count: 4200, icon: 'fab-linen' },
    { id: '9', name: 'Wool', count: 3800, icon: 'fab-wool' }
  ];

  private searchSuggestions: SearchSuggestion[] = [
    { id: '1', term: 'Cotton Twill', category: 'Cotton', popularity: 95 },
    { id: '2', term: 'Pure Silk Saree', category: 'Silk', popularity: 88 },
    { id: '3', term: 'Stretch Denim', category: 'Denim', popularity: 82 },
    { id: '4', term: 'Linen Blend', category: 'Linen', popularity: 76 }
  ];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  getHeroContent(): Observable<HeroContent> {
    this.loadingSubject.next(true);
    return of(this.heroContent).pipe(
      delay(500),
      // tap(() => this.loadingSubject.next(false))
    );
  }

  getFabricCategories(): Observable<FabricCategory[]> {
    return of(this.fabricCategories).pipe(delay(300));
  }

  getSearchSuggestions(query: string): Observable<SearchSuggestion[]> {
    const filtered = this.searchSuggestions.filter(suggestion =>
      suggestion.term.toLowerCase().includes(query.toLowerCase()) ||
      suggestion.category.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(200));
  }

  updateHeroContent(content: Partial<HeroContent>): Observable<boolean> {
    this.heroContent = { ...this.heroContent, ...content };
    return of(true).pipe(delay(500));
  }
}
