import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CountrySelector } from '../country-selector/country-selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [RouterLink, RouterLinkActive, CountrySelector]
})
export class Navbar {
  cartCount = 5; // demo
}



