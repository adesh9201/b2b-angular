import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CountrySelector } from '../country-selector/country-selector';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User, UserRole } from '../../core/models/user.model';

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
  searchQuery: string = '';
  isMenuCollapsed: boolean = true;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartCount$ = this.cartService.getCartItemCount();
    this.currentUser$ = this.authService.currentUser$;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isVendor(): boolean {
    return this.authService.isVendor();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }

  toggleMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
