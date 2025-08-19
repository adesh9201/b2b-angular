import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CountrySelector } from '../country-selector/country-selector';
import { CartService } from '../../core/services/cart.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
   standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [RouterLink, RouterLinkActive, CountrySelector, FormsModule, CommonModule]
})
export class Navbar {
  // cartCount: number = 0;
cartCount$!: Observable<number>;

constructor(private cartService: CartService) {}

ngOnInit() {
  this.cartCount$ = this.cartService.getCartItemCount();
}


}
