// hero-section.component.ts - Updated with auto-open functionality
  import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CartService } from '../../core/services/cart.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountrySelector } from '../../shared/country-selector/country-selector';
@Component({
  selector: 'app-test',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css'],

})
export class Test {
  // cartCount: number = 0;
cartCount$!: Observable<number>;

constructor(private cartService: CartService) {}

ngOnInit() {
  this.cartCount$ = this.cartService.getCartItemCount();
}


}
