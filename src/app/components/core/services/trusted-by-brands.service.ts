import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TrustedBrand } from '../models/trusted-by-brands.model';

@Injectable({
  providedIn: 'root'
})
export class TrustedByBrandsService {
  getBrands(): Observable<TrustedBrand[]> {
    return of([
     {
    name: 'Google',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    website: 'https://www.google.com'
  },
  {
    name: 'Apple',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    website: 'https://www.apple.com'
  },
  {
    name: 'Facebook',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg',
    website: 'https://www.facebook.com'
  },
  {
    name: 'Microsoft',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    website: 'https://www.microsoft.com'
  },

    ]);
  }
}
