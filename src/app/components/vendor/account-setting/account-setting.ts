import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';
import { VendorService } from '../../core/services/vendor.service';
import { AuthService } from '../../core/services/auth.service';
import { Vendor } from '../../core/models/vendor.model';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, Sidebar],
  templateUrl: './account-setting.html',
  styleUrl: './account-setting.css'
})
export class AccountSetting implements OnInit {
  vendorProfile: Vendor | null = null;
  loading = false;
  saving = false;
  
  // Forms
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  notificationForm!: FormGroup;
  
  // UI states
  showPasswordModal = false;
  showSuccessMessage = false;
  successMessage = '';
  showErrorMessage = false;
  errorMessage = '';

  constructor(
    private vendorService: VendorService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadVendorProfile();
  }

  private initForms(): void {
    this.profileForm = this.formBuilder.group({
      businessName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
      website: ['', [Validators.pattern('https?://.+')]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      contactPerson: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]]
      }),
      businessHours: this.formBuilder.group({
        monday: ['9:00 AM - 6:00 PM', Validators.required],
        tuesday: ['9:00 AM - 6:00 PM', Validators.required],
        wednesday: ['9:00 AM - 6:00 PM', Validators.required],
        thursday: ['9:00 AM - 6:00 PM', Validators.required],
        friday: ['9:00 AM - 6:00 PM', Validators.required],
        saturday: ['10:00 AM - 4:00 PM', Validators.required],
        sunday: ['Closed', Validators.required]
      }),
      specialties: [''],
      paymentMethods: [''],
      shippingMethods: [''],
      minimumOrder: ['', [Validators.required, Validators.min(0)]]
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.notificationForm = this.formBuilder.group({
      emailNotifications: [true],
      smsNotifications: [false],
      orderNotifications: [true],
      stockAlerts: [true],
      marketingEmails: [false],
      weeklyReports: [true]
    });
  }

  private passwordMatchValidator(group: any): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    
    return null;
  }

  private loadVendorProfile(): void {
    this.loading = true;
    this.vendorService.getCurrentVendorProfile().subscribe({
      next: (vendor) => {
        this.vendorProfile = vendor;
        this.populateForms(vendor);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading vendor profile:', error);
        // Use mock data for development
        this.vendorProfile = this.getMockVendorProfile();
        this.populateForms(this.vendorProfile);
        this.loading = false;
      }
    });
  }

  private populateForms(vendor: Vendor): void {
    this.profileForm.patchValue({
      businessName: vendor.businessName,
      description: vendor.description || '',
      phone: vendor.phone,
      website: vendor.website || '',
      address: vendor.address,
      contactPerson: vendor.contactPerson,
      businessHours: vendor.businessHours,
      specialties: vendor.specialties.join(', '),
      paymentMethods: vendor.paymentMethods.join(', '),
      shippingMethods: vendor.shippingMethods.join(', '),
      minimumOrder: vendor.minimumOrder
    });
  }

  // Profile management
  updateProfile(): void {
    if (this.profileForm.valid) {
      this.saving = true;
      const formValue = this.profileForm.value;
      
      const updateData = {
        businessName: formValue.businessName,
        description: formValue.description,
        phone: formValue.phone,
        website: formValue.website,
        address: formValue.address,
        contactPerson: formValue.contactPerson,
        businessHours: formValue.businessHours,
        specialties: formValue.specialties.split(',').map((s: string) => s.trim()).filter((s: string) => s),
        paymentMethods: formValue.paymentMethods.split(',').map((s: string) => s.trim()).filter((s: string) => s),
        shippingMethods: formValue.shippingMethods.split(',').map((s: string) => s.trim()).filter((s: string) => s),
        minimumOrder: formValue.minimumOrder
      };

      this.vendorService.updateVendorProfile(updateData).subscribe({
        next: (updatedVendor) => {
          this.vendorProfile = updatedVendor;
          this.saving = false;
          this.showSuccess('Profile updated successfully!');
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.saving = false;
          this.showError('Failed to update profile. Please try again.');
        }
      });
    }
  }

  // Password management
  changePassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      
      this.authService.changePassword(currentPassword, newPassword).subscribe({
        next: () => {
          this.showPasswordModal = false;
          this.passwordForm.reset();
          this.showSuccess('Password changed successfully!');
        },
        error: (error) => {
          console.error('Error changing password:', error);
          this.showError('Failed to change password. Please check your current password.');
        }
      });
    }
  }

  // Notification settings
  updateNotificationSettings(): void {
    if (this.notificationForm.valid) {
      const settings = this.notificationForm.value;
      
      // Here you would typically call an API to update notification settings
      console.log('Updating notification settings:', settings);
      this.showSuccess('Notification settings updated successfully!');
    }
  }

  // Utility methods
  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    this.showErrorMessage = false;
    
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.showErrorMessage = true;
    this.showSuccessMessage = false;
    
    setTimeout(() => {
      this.showErrorMessage = false;
    }, 3000);
  }

  getErrorMessage(controlName: string, form: FormGroup): string {
    const control = form.get(controlName);
    
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${requiredLength} characters`;
    }
    
    if (control?.hasError('pattern')) {
      return 'Please enter a valid format';
    }
    
    if (control?.hasError('min')) {
      return 'Value must be greater than 0';
    }
    
    return '';
  }

  isFieldInvalid(controlName: string, form: FormGroup): boolean {
    const field = form.get(controlName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  hasPasswordMismatch(): boolean {
    return this.passwordForm.hasError('passwordMismatch') && 
           this.passwordForm.get('confirmPassword')?.touched;
  }

  // Mock data for development
  private getMockVendorProfile(): Vendor {
    return {
      id: '1',
      businessName: 'Premium Textiles Co.',
      email: 'contact@premiumtextiles.com',
      phone: '+1-555-123-4567',
      businessType: 'Manufacturer',
      description: 'Leading manufacturer of premium quality fabrics for fashion and home textiles.',
      specialties: ['Cotton', 'Silk', 'Wool'],
      address: {
        street: '123 Fabric Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10001'
      },
      rating: 4.8,
      totalReviews: 156,
      totalProducts: 45,
      isVerified: true,
      yearsInBusiness: 15,
      certifications: ['ISO 9001', 'OEKO-TEX'],
      website: 'https://premiumtextiles.com',
      socialMedia: {
        facebook: 'premiumtextiles',
        instagram: 'premiumtextiles',
        linkedin: 'premium-textiles-co'
      },
      contactPerson: {
        name: 'John Smith',
        email: 'john@premiumtextiles.com',
        phone: '+1-555-123-4568'
      },
      businessHours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal'],
      shippingMethods: ['Standard', 'Express', 'Overnight'],
      minimumOrder: 100,
      commissionRate: 0.15,
      createdAt: new Date('2020-01-15'),
      updatedAt: new Date('2024-01-15')
    };
  }
}
