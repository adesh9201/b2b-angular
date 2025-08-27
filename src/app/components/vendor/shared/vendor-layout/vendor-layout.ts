import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { LoggingService } from '../../../core/services/logging.service';

@Component({
  selector: 'app-vendor-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vendor-layout.html',
  styleUrls: ['./vendor-layout.css']
})
export class VendorLayout implements OnInit, OnDestroy {
  sidebarCollapsed = false;
  currentUser: User | null = null;
  currentPageTitle = '';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.setupRouteTracking();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCurrentUser(): void {
    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  private setupRouteTracking(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentPageTitle = this.getPageTitleFromUrl(event.url);
      });
  }

  private getPageTitleFromUrl(url: string): string {
    const segments = url.split('/').filter(segment => segment);
    const pageSegment = segments[segments.length - 1];
    
    const pageTitles: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'productcatalog': 'Product Catalog',
      'order': 'Orders',
      'inventory': 'Inventory',
      'pricing': 'Pricing',
      'analytics': 'Analytics',
      'marketing': 'Marketing',
      'reviews': 'Reviews',
      'payment': 'Payments',
      'logistics': 'Logistics',
      'claims': 'Claims',
      'support': 'Support',
      'accountsetting': 'Account Settings'
    };

    return pageTitles[pageSegment] || 'Vendor Dashboard';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.loggingService.info('Vendor sidebar toggled', { collapsed: this.sidebarCollapsed });
  }

  getCurrentPageTitle(): string {
    return this.currentPageTitle;
  }

  viewStore(): void {
    this.router.navigate(['/vendors', this.currentUser?.id]);
    this.loggingService.info('Viewing vendor store', { vendorId: this.currentUser?.id });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.loggingService.info('Vendor logged out');
  }
}