import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WhyChooseFeature } from '../models/why-choose.model';

@Injectable({
    providedIn: 'root',
})
export class WhyChooseService {
    getFeatures(): Observable<WhyChooseFeature[]> {
        return of([
            {
                title: 'Global Network',
                description: 'Connect with suppliers and buyers from around the world.',
                badge: 'Top Choice',
                icon: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="16" stroke="#009688" stroke-width="2.5" fill="#43e8d8" /><path d="M18 4C22.4183 4 26 10.268 26 18C26 25.732 22.4183 32 18 32C13.5817 32 10 25.732 10 18C10 10.268 13.5817 4 18 4Z" stroke="#009688" stroke-width="2" fill="none" /></svg>`

            },
            {
                title: 'Secure Transactions',
                description: 'Safe and secure payment processing with escrow protection.',
                icon: `
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 4L30 9V18C30 25.732 24.6274 32 18 32C11.3726 32 6 25.732 6 18V9L18 4Z" fill="#43e8d8"
              stroke="#009688" stroke-width="2.5" />
            <path d="M18 18V24" stroke="#009688" stroke-width="2" stroke-linecap="round" />
            <circle cx="18" cy="15" r="1.5" fill="#009688" />
          </svg>
        `,
            },
            {
                title: 'Fast Shipping',
                description: 'Reliable logistics partners ensuring timely delivery.',
                icon: `
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="12" width="18" height="12" rx="3" fill="#43e8d8" stroke="#009688" stroke-width="2.5" />
            <rect x="22" y="18" width="10" height="6" rx="2" fill="#43e8d8" stroke="#009688" stroke-width="2.5" />
            <circle cx="10" cy="28" r="2" fill="#009688" />
            <circle cx="26" cy="28" r="2" fill="#009688" />
          </svg>
        `,
            },
            {
                title: 'Sustainability',
                description: 'Eco-friendly sourcing and green logistics for a better planet.',
                icon: `
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 6C18 6 6 18 6 30C18 30 30 18 30 6Z" fill="#43e8d8" stroke="#009688" stroke-width="2.5" />
            <path d="M12 24C14.5 21 21 15.5 24 12" stroke="#009688" stroke-width="2" stroke-linecap="round" />
          </svg>
        `,
            },
        ]);
    }
}
