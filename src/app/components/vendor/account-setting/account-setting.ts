import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-setting.html',
  styleUrl: './account-setting.css'
})
export class AccountSetting implements OnInit, OnDestroy {
  userProfile: any = {};
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private loggingService: LoggingService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loggingService.info('Vendor account settings page loaded');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserProfile(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.userProfile = {
        name: 'Cotton Masters Ltd',
        email: 'contact@cottonmasters.com',
        phone: '+91 9876543210',
        address: 'Mumbai, India',
        businessType: 'Manufacturer'
      };
      this.isLoading = false;
    }, 1000);
  }
}