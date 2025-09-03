import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FooterService } from '../../../components/core/services/footer.service';
import { FooterData, FooterSocial, FooterUSP, FooterLink } from '../../../components/core/models/footer.model';

declare const bootstrap: any;

@Component({
  selector: 'app-footer-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './footer-admin.html',
  styleUrls: ['./footer-admin.css']
})
// export class FooterAdmin implements OnInit, AfterViewInit {
//   import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { FooterService } from '../services/footer.service';
// import { FooterData, FooterLink, FooterUSP, FooterSocial } from '../models/footer.model';


export class FooterAdmin implements OnInit {
  footerForm!: FormGroup;
  footers: FooterData[] = [];
  currentFooter: FooterData | null = null;
  isEditing = false;
  isLoading = false;
  showForm = false;
  activeTab = 'list';

  constructor(
    private footerService: FooterService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadFooters();
  }

  initializeForm(): void {
    this.footerForm = this.fb.group({
      id: [null],
      brandName: ['', [Validators.required, Validators.minLength(2)]],
      logoUrl: [''],
      
      // Newsletter section
      newsletterHeading: [''],
      newsletterPlaceholder: [''],
      newsletterButton: ['Subscribe'],
      
      // Mobile app section
      mobileAppHeading: [''],
      playStoreLink: [''],
      appStoreLink: [''],
      playStoreBadge: [''],
      appStoreBadge: [''],
      
      // Help section
      helpHeading: [''],
      phoneNumber: [''],
      timings: [''],
      
      // Dynamic arrays
      companyLinks: this.fb.array([]),
      helpLinks: this.fb.array([]),
      quickLinks: this.fb.array([]),
      topCategories: this.fb.array([]),
      usPs: this.fb.array([]),
      socials: this.fb.array([]),
      policies: this.fb.array([]),
      
      copyText: ['']
    });
  }

  // FormArray getters
  get companyLinks(): FormArray {
    return this.footerForm.get('companyLinks') as FormArray;
  }

  get helpLinks(): FormArray {
    return this.footerForm.get('helpLinks') as FormArray;
  }

  get quickLinks(): FormArray {
    return this.footerForm.get('quickLinks') as FormArray;
  }

  get topCategories(): FormArray {
    return this.footerForm.get('topCategories') as FormArray;
  }

  get usPs(): FormArray {
    return this.footerForm.get('usPs') as FormArray;
  }

  get socials(): FormArray {
    return this.footerForm.get('socials') as FormArray;
  }

  get policies(): FormArray {
    return this.footerForm.get('policies') as FormArray;
  }

  // Load all footers
  loadFooters(): void {
    this.isLoading = true;
    this.footerService.getAllFooters().subscribe({
      next: (data) => {
        this.footers = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading footers:', error);
        this.isLoading = false;
      }
    });
  }

  // Create new footer
  createNewFooter(): void {
    this.currentFooter = null;
    this.isEditing = false;
    this.showForm = true;
    this.activeTab = 'form';
    this.resetForm();
  }

  // Edit existing footer
  editFooter(footer: FooterData): void {
    this.currentFooter = footer;
    this.isEditing = true;
    this.showForm = true;
    this.activeTab = 'form';
    this.populateForm(footer);
  }

  // View footer details
  viewFooter(footer: FooterData): void {
    this.currentFooter = footer;
    this.activeTab = 'view';
  }

  // Delete footer
  deleteFooter(id: number): void {
    if (confirm('Are you sure you want to delete this footer?')) {
      this.footerService.deleteFooter(id).subscribe({
        next: () => {
          this.loadFooters();
          if (this.currentFooter?.id === id) {
            this.currentFooter = null;
            this.activeTab = 'list';
          }
        },
        error: (error) => {
          console.error('Error deleting footer:', error);
        }
      });
    }
  }

  // Save footer (create or update)
  saveFooter(): void {
    if (this.footerForm.valid) {
      const formData = this.footerForm.value;
      
      if (this.isEditing && this.currentFooter?.id) {
        // Update existing footer
        this.footerService.updateFooter(this.currentFooter.id, formData).subscribe({
          next: () => {
            this.loadFooters();
            this.resetForm();
            this.showForm = false;
            this.activeTab = 'list';
          },
          error: (error) => {
            console.error('Error updating footer:', error);
          }
        });
      } else {
        // Create new footer
        this.footerService.createFooter(formData).subscribe({
          next: () => {
            this.loadFooters();
            this.resetForm();
            this.showForm = false;
            this.activeTab = 'list';
          },
          error: (error) => {
            console.error('Error creating footer:', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.footerForm);
    }
  }

  // Reset form
  resetForm(): void {
    this.footerForm.reset();
    this.clearAllFormArrays();
    this.footerForm.patchValue({
      newsletterButton: 'Subscribe'
    });
  }

  // Populate form with footer data
  populateForm(footer: FooterData): void {
    this.footerForm.patchValue({
      id: footer.id,
      brandName: footer.brandName,
      logoUrl: footer.logoUrl,
      newsletterHeading: footer.newsletterHeading,
      newsletterPlaceholder: footer.newsletterPlaceholder,
      newsletterButton: footer.newsletterButton,
      mobileAppHeading: footer.mobileAppHeading,
      playStoreLink: footer.playStoreLink,
      appStoreLink: footer.appStoreLink,
      playStoreBadge: footer.playStoreBadge,
      appStoreBadge: footer.appStoreBadge,
      helpHeading: footer.helpHeading,
      phoneNumber: footer.phoneNumber,
      timings: footer.timings,
      copyText: footer.copyText
    });

    // Populate form arrays
    this.populateFormArray('companyLinks', footer.companyLinks);
    this.populateFormArray('helpLinks', footer.helpLinks);
    this.populateFormArray('quickLinks', footer.quickLinks);
    this.populateFormArray('topCategories', footer.topCategories);
    this.populateUSPFormArray(footer.usPs);
    this.populateSocialFormArray(footer.socials);
    this.populateFormArray('policies', footer.policies);
  }

  // Populate form array for links
  populateFormArray(arrayName: string, data: FooterLink[]): void {
    const formArray = this.footerForm.get(arrayName) as FormArray;
    formArray.clear();
    
    data.forEach(item => {
      formArray.push(this.fb.group({
        label: [item.label, Validators.required],
        url: [item.url, Validators.required]
      }));
    });
  }

  // Populate USP form array
  populateUSPFormArray(data: FooterUSP[]): void {
    const formArray = this.usPs;
    formArray.clear();
    
    data.forEach(item => {
      formArray.push(this.fb.group({
        icon: [item.icon, Validators.required],
        title: [item.title, Validators.required],
        subtitle: [item.subtitle, Validators.required]
      }));
    });
  }

  // Populate social form array
  populateSocialFormArray(data: FooterSocial[]): void {
    const formArray = this.socials;
    formArray.clear();
    
    data.forEach(item => {
      formArray.push(this.fb.group({
        icon: [item.icon, Validators.required],
        url: [item.url, Validators.required]
      }));
    });
  }

  // Add link item to form array
  addLinkItem(arrayName: string): void {
    const formArray = this.footerForm.get(arrayName) as FormArray;
    formArray.push(this.fb.group({
      label: ['', Validators.required],
      url: ['', Validators.required]
    }));
  }

  // Add USP item
  addUSPItem(): void {
    this.usPs.push(this.fb.group({
      icon: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: ['', Validators.required]
    }));
  }

  // Add social item
  addSocialItem(): void {
    this.socials.push(this.fb.group({
      icon: ['', Validators.required],
      url: ['', Validators.required]
    }));
  }

  // Remove item from form array
  removeItem(arrayName: string, index: number): void {
    const formArray = this.footerForm.get(arrayName) as FormArray;
    formArray.removeAt(index);
  }

  // Clear all form arrays
  clearAllFormArrays(): void {
    this.companyLinks.clear();
    this.helpLinks.clear();
    this.quickLinks.clear();
    this.topCategories.clear();
    this.usPs.clear();
    this.socials.clear();
    this.policies.clear();
  }

  // Mark all fields as touched for validation
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          }
        });
      }
    });
  }

  // Check if field has error
  hasError(fieldName: string): boolean {
    const field = this.footerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Get error message
  getErrorMessage(fieldName: string): string {
    const field = this.footerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  // Cancel form
  cancelForm(): void {
    this.showForm = false;
    this.activeTab = 'list';
    this.resetForm();
  }

  // Switch tabs
  switchTab(tab: string): void {
    this.activeTab = tab;
  }
}