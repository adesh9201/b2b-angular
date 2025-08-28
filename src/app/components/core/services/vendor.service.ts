import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface VendorProfile {
  id: number;
  name: string;
  email: string;
  address?: string;
}

@Injectable({ providedIn: 'root' })
export class VendorService {
  getMyProfile(): Observable<VendorProfile> {
    return of({ id: 1, name: 'Demo Vendor', email: 'vendor@example.com' });
  }
}

