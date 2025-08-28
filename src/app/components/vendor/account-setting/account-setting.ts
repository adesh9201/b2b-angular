import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';
import { VendorService } from '../../core/services/vendor.service';
import { Vendor, BusinessType, VendorStatus } from '../../core/models/vendor.model';

@Component({
  selector: 'app-account-setting',
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, Sidebar],
  templateUrl: './account-setting.html',
  styleUrl: './account-setting.css'
})
export class AccountSetting implements OnInit {
  currentVendor: Vendor | null = null;
  isLoading = false;
  isSaving = false;
  showSuccessMessage = false;
  
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  notificationForm!: FormGroup;

  constructor(
    private vendorService: VendorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadVendorData();
  }

  private initForms(): void {
    this.profileForm = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(2)]],
      businessDescription: ['', [Validators.required, Validators.minLength(10)]],
      contactPerson: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
      businessType: ['', Validators.required],
      categories: [[]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
        country: ['', Validators.required]
      })
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.notificationForm = this.fb.group({
      emailNotifications: [true],
      orderNotifications: [true],
      stockAlerts: [true],
      marketingEmails: [false],
      smsNotifications: [false]
    });
  }

  private passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  private loadVendorData(): void {
    this.isLoading = true;
    this.vendorService.currentVendor$.subscribe(vendor => {
      this.currentVendor = vendor;
      if (vendor) {
        this.profileForm.patchValue({
          businessName: vendor.businessName,
          businessDescription: vendor.businessDescription,
          contactPerson: vendor.contactPerson,
          email: vendor.email,
          phone: vendor.phone,
          businessType: vendor.businessType,
          categories: vendor.categories,
          address: vendor.address
        });
      }
      this.isLoading = false;
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      this.isSaving = true;
      const formData = this.profileForm.value;
      
      // In a real app, you would call the service
      // this.vendorService.updateVendor(formData).subscribe({
      //   next: () => {
      //     this.isSaving = false;
      //     this.showSuccessMessage = true;
      //     setTimeout(() => this.showSuccessMessage = false, 3000);
      //   },
      //   error: () => {
      //     this.isSaving = false;
      //   }
      // });

      // Mock update for development
      setTimeout(() => {
        this.isSaving = false;
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }, 1000);
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      this.isSaving = true;
      const formData = this.passwordForm.value;
      
      // In a real app, you would call the service to change password
      setTimeout(() => {
        this.isSaving = false;
        this.showSuccessMessage = true;
        this.passwordForm.reset();
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }, 1000);
    }
  }

  onNotificationSubmit(): void {
    if (this.notificationForm.valid) {
      this.isSaving = true;
      const formData = this.notificationForm.value;
      
      // In a real app, you would call the service to update notifications
      setTimeout(() => {
        this.isSaving = false;
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }, 1000);
    }
  }

  getErrorMessage(controlName: string, form: FormGroup): string {
    const control = form.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return 'Please enter a valid phone number';
      }
    }
    return '';
  }

  getPasswordMismatchError(): string {
    if (this.passwordForm.errors?.['passwordMismatch'] && 
        this.passwordForm.get('confirmPassword')?.touched) {
      return 'Passwords do not match';
    }
    return '';
  }

  getBusinessTypeText(type: BusinessType): string {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  getStatusText(status: VendorStatus): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  getStatusBadgeClass(status: VendorStatus): string {
    switch (status) {
      case VendorStatus.ACTIVE:
        return 'bg-success';
      case VendorStatus.PENDING:
        return 'bg-warning';
      case VendorStatus.SUSPENDED:
        return 'bg-danger';
      case VendorStatus.INACTIVE:
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }
}
