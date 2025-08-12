import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Country } from '../../core/models/country-selector.model';
import { CountrySelectorService } from '../../core/services/country-selector.service';

declare var bootstrap: any; // Bootstrap modal handling

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.html',
  styleUrls: ['./country-selector.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class CountrySelector implements OnInit {
  countries: Country[] = [];
  selectedCountry!: Country;
  languageSelected = false; // Flag to control display
  showLanguageDropdown = false;

  constructor(private countryService: CountrySelectorService) {}

  ngOnInit() {
    this.countries = this.countryService.getCountries();

    const savedCountry = localStorage.getItem('selectedCountry');
    const savedLanguage = localStorage.getItem('selectedLanguage');

    if (savedCountry) {
      const foundCountry = this.countries.find(c => c.name === savedCountry);
      this.selectedCountry = foundCountry || this.countries[0];
    } else {
      this.selectedCountry = this.countries[0];
    }
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;
    localStorage.setItem('selectedCountry', country.name);

}

}