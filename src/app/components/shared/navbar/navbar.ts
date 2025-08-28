import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CountrySelector } from '../country-selector/country-selector';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [RouterLink, RouterLinkActive, CountrySelector, FormsModule, CommonModule]
})
export class Navbar implements OnInit {
  cartCount$!: Observable<number>;
  currentUser$!: Observable<User | null>;
  isAuthenticated = false;
  searchQuery = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartCount$ = this.cartService.getCartItemCount();
    this.currentUser$ = this.authService.currentUser$;
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isVendor(): boolean {
    return this.authService.isVendor();
  }
}
