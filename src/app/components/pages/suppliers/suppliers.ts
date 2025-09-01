import { Component, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierRegister, Supplier, Feature } from '../../core/models/supplier.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.html',
  styleUrls: ['./suppliers.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class Suppliers  {
  contact = '';
  otp = '';
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  features: Feature[] = [];
  selectedState: string = '';
  states: string[] = [];
  registerForm: FormGroup;
  otpSent = false;
  otpVerified = false;

  // 🔔 Toast state
  showToast = false;
  toastMessage = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      pincode: [''],
      state: [''],
      city: [''],
      gstin: [''],
      pan: [''],
      emailId: ['', [Validators.required, Validators.email]],
      phone: [''],
      contact_Person: ['']
    });
  }

  private triggerToast(message: string, isError: boolean = false) {
    this.toastMessage = message;
    this.isError = isError;
    this.showToast = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showToast = false;
      this.cdr.detectChanges();
    }, 2500);
  }

  // ================== REGISTER ==================
  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.triggerToast('Please fill all required fields ❌', true);
      return;
    }

    const supplier: SupplierRegister = this.registerForm.value;
    this.supplierService.register(supplier).subscribe({
      next: (res) => {
        this.triggerToast('Registered successfully! Now verify OTP ✅');
        this.sendOtp(supplier.emailId); // send OTP to registered email
      },
      error: (err) => {
        this.triggerToast(err.error || 'Registration failed ❌', true);
      }
    });
  }

  // ================== LOGIN MODAL ==================
  sendOtp(contact?: string) {
    const sendTo = contact || this.contact;
    if (!sendTo) {
      this.triggerToast('Please enter Email or Phone ❌', true);
      return;
    }

    this.supplierService.sendOtp(sendTo).subscribe({
      next: () => {
        this.otpSent = true;
        this.triggerToast('OTP sent successfully ✅');
      },
      error: (err) => this.triggerToast(err.error || 'Failed to send OTP ❌', true)
    });
  }

  verifyOtp() {
    if (!this.contact || !this.otp) {
      this.triggerToast('Please enter Email/Phone and OTP ❌', true);
      return;
    }

    this.supplierService.verifyOtp(this.contact, this.otp).subscribe({
      next: (res) => {
        this.otpVerified = true;
        this.triggerToast('OTP verified! You are now logged in 🎉');

        // ✅ Store supplier data in localStorage
        localStorage.setItem('supplierData', JSON.stringify(res));

        // ✅ Hide login modal
        const loginModalEl = document.getElementById('loginSupplierModal');
        const loginModal = bootstrap.Modal.getInstance(loginModalEl);
        loginModal?.hide();

        // ✅ Navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => this.triggerToast(err.error || 'OTP verification failed ❌', true)
    });
  }

  openLoginFromRegister() {
    const registerModalEl = document.getElementById('addSupplierModal');
    const registerModal = bootstrap.Modal.getInstance(registerModalEl);
    registerModal?.hide();

    const loginModalEl = document.getElementById('loginSupplierModal');
    if (loginModalEl) {
      const loginModal = new bootstrap.Modal(loginModalEl);
      loginModal.show();
    }
  }

  ngOnInit(): void {
    this.supplierService.getAllSuppliers().subscribe(data => {
      this.suppliers = data;
      this.filteredSuppliers = data;
    });
    this.features = this.supplierService.getFeatures();
  }

  onFilterChange(): void {
    this.filteredSuppliers = this.suppliers.filter(supplier => {
      return this.selectedState ? supplier.state === this.selectedState : true;
    });
  }
}
