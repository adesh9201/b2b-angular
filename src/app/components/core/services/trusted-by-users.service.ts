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
    icon: `<i class="bi bi-people-fill fs-1 text-primary"></i>`,
    count: 5000,
    label: 'Happy Clients',
    description: 'Businesses who trust FabricHub.'
  },
  {
    icon: `<i class="bi bi-box-seam fs-1 text-success"></i>`,
    count: 12000,
    label: 'Orders Shipped',
    description: 'Smooth and fast fabric delivery.'
  },
  {
    icon: `<i class="bi bi-globe2 fs-1 text-info"></i>`,
    count: 30,
    label: 'Countries Served',
    description: 'We’re global and growing.'
  },
  {
    icon: `<i class="bi bi-patch-check-fill fs-1 text-warning"></i>`,
    count: 99,
    label: 'Quality Score',
    description: 'Customer-rated fabric quality.'
  }
    ]);
  }
}
