import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TrustedStat } from '../models/trusted-by-users.model';

@Injectable({
  providedIn: 'root'
})
export class TrustedByService {
  getStats(): Observable<TrustedStat[]> {
    return of([
      {
        label: 'Verified Suppliers',
        description: 'Carefully vetted for quality and reliability',
        count: 500,
        icon: `
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="#43e8d8" stroke="#009688" stroke-width="2" />
            <path d="M10 22c0-3 4-3 4-3s4 0 4 3" stroke="#009688" stroke-width="2" fill="none" />
            <circle cx="16" cy="14" r="3" stroke="#009688" stroke-width="2" fill="#fff" />
          </svg>
        `
      },
      {
        label: 'Active Buyers',
        description: 'From startups to global brands',
        count: 10000,
        icon: `
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="#43e8d8" stroke="#009688" stroke-width="2" />
            <path d="M10 22c0-3 4-3 4-3s4 0 4 3" stroke="#009688" stroke-width="2" fill="none" />
            <circle cx="16" cy="14" r="3" stroke="#009688" stroke-width="2" fill="#fff" />
            <circle cx="22" cy="12" r="2" stroke="#009688" stroke-width="1.5" fill="#fff" />
          </svg>
        `
      },
      {
        label: 'Products Listed',
        description: 'A vast selection for every need',
        count: 50000,
        icon: `
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <rect x="6" y="10" width="20" height="12" rx="3" fill="#43e8d8" stroke="#009688" stroke-width="2" />
            <rect x="12" y="6" width="8" height="6" rx="2" fill="#fff" stroke="#009688" stroke-width="1.5" />
          </svg>
        `
      },
      {
        label: 'Countries Served',
        description: 'A truly global marketplace',
        count: 150,
        icon: `
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="#43e8d8" stroke="#009688" stroke-width="2" />
            <path d="M8 16a8 8 0 0 1 16 0" stroke="#009688" stroke-width="2" fill="none" />
            <path d="M16 8v16" stroke="#009688" stroke-width="2" />
            <path d="M8 16h16" stroke="#009688" stroke-width="2" />
          </svg>
        `
      }
    ]);
  }
}
