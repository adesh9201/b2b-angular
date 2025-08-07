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
    title: 'Fast Delivery',
    description: 'Get your fabrics delivered quickly.',
    icon: `<i class="bi bi-truck fs-1 text-primary"></i>`
  },
  {
    title: 'Best Quality',
    description: 'We ensure premium quality fabrics.',
    icon: `<i class="bi bi-patch-check fs-1 text-success"></i>`
  },
  {
    title: '24/7 Support',
    description: 'Always here to help you.',
    icon: `<i class="bi bi-headset fs-1 text-danger"></i>`
  },
  {
    title: 'Easy Returns',
    description: 'Hassle-free return policy.',
    icon: `<i class="bi bi-arrow-counterclockwise fs-1 text-warning"></i>`
  }
        ]);
    }
}
