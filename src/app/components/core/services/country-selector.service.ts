import { Injectable } from '@angular/core';
import { Country } from '../models/country-selector.model';


@Injectable({
  providedIn: 'root'
})
export class CountrySelectorService {
  private countries: Country[] = [
    {
      name: 'India',
      short: 'IN',
      currency: 'INR',
      flag: 'https://flagcdn.com/w20/in.png',
    },
    {
      name: 'USA',
      short: 'US',
      currency: 'USD',
      flag: 'https://flagcdn.com/w20/us.png',
    },
    {
      name: 'Japan',
      short: 'JP',
      currency: 'JPY',
      flag: 'https://flagcdn.com/w20/jp.png',
    }
  ];

  getCountries(): Country[] {
    return this.countries;
  }

}
