import { Component, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { SupplierRegister } from '../../core/models/supplier.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  otpSent = false;
  otpVerified = false;
  otpCode = '';

  // 🔔 Toast state
  showToast = false;
  toastMessage = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef
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

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.triggerToast('Please fill all required fields ❌', true);
      return;
    }

    const supplier: SupplierRegister = this.registerForm.value;

    this.supplierService.register(supplier).subscribe({
      next: (res) => {
        console.log('Register response:', res);
        this.triggerToast('Registered successfully! Now verify OTP ✅');
        this.sendOtp(supplier.emailId);
      },
      error: (err) => {
        console.error('Register error:', err);
        if (err.error) {
          this.triggerToast(err.error, true);
        } else if (err.status === 0) {
          this.triggerToast('Cannot reach server. Check backend ❌', true);
        } else {
          this.triggerToast('Unexpected error: ' + err.message, true);
        }
      }
    });
  }

  sendOtp(contact: string) {
    this.supplierService.sendOtp(contact).subscribe({
      next: (res) => {
        console.log('Send OTP response:', res);
        this.otpSent = true;
        this.triggerToast('OTP sent to email 📩');
      },
      error: (err) => {
        console.error('Send OTP error:', err);
        if (err.error) {
          this.triggerToast(err.error, true);
        } else if (err.status === 0) {
          this.triggerToast('Cannot reach server. Check backend ❌', true);
        } else {
          this.triggerToast('Unexpected error: ' + err.message, true);
        }
      }
    });
  }

  verifyOtp() {
    const contact = this.registerForm.value.emailId;
    this.supplierService.verifyOtp(contact, this.otpCode).subscribe({
      next: (res) => {
        console.log('Verify OTP response:', res);
        this.otpVerified = true;
        this.triggerToast('OTP verified! You can now login 🎉');
      },
      error: (err) => {
        console.error('Verify OTP error:', err);
        if (err.error) {
          this.triggerToast(err.error, true);
        } else if (err.status === 0) {
          this.triggerToast('Cannot reach server. Check backend ❌', true);
        } else {
          this.triggerToast('Unexpected error: ' + err.message, true);
        }
      }
    });
  }
}
