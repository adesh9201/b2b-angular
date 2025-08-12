// src/app/core/services/HeroSection.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroSectionModel } from '../models/HeroSection.model';

@Injectable({
  providedIn: 'root'
})
export class HeroSectionService {
  constructor() {}

  getHeroDataList(): Observable<HeroSectionModel[]> {
    const heroDataList: HeroSectionModel[] = [
      {
        title: 'Welcome to FabricHub',
        subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
        ctaPrimary: { label: 'Get Catalog', url: '/catalogs' },
        ctaSecondary: { label: 'Become Seller', url: './dashboard' },
        stats: [
          { number: '10K+', label: 'Active Users' },
          { number: '99%', label: 'Satisfaction' },
          { number: '24/7', label: 'Support' }
        ]
      },
      {
        title: 'Empower Your Business',
        subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
        ctaPrimary: { label: 'Explore Now', url: '/explore' },
        ctaSecondary: { label: 'Join Us', url: '/join' },
        stats: [
          { number: '5K+', label: 'Partners' },
          { number: '98%', label: 'Customer Retention' },
          { number: 'Dedicated', label: 'Team' }
        ]
      }
      // Add more objects as needed
    ];
    return of(heroDataList);
  }
}
