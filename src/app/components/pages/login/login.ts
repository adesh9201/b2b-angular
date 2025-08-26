import { Component, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  contact = '';
  otp = '';
  otpSent = false;


  // 🔔 Toast state
  showToast = false;
  toastMessage = '';
  isError = false;

  constructor(
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef,
      private router: Router
  ) {}

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

  sendOtp() {
    this.supplierService.sendOtp(this.contact).subscribe({
      next: () => {
        this.otpSent = true;
        this.triggerToast('OTP sent successfully ✅');
      },
      error: (err) =>
        this.triggerToast(err.error || 'Failed to send OTP ❌', true)
    });
  }

  verifyOtp() {
    this.supplierService.verifyOtp(this.contact, this.otp).subscribe({
      next: (res) => {
        this.triggerToast(
          'Login successful! Supplier ID: ' + res.supplierId
        );

        // ✅ Store supplier data in localStorage
        localStorage.setItem('supplierData', JSON.stringify(res));

        // ✅ Navigate to dashboard
        this.router.navigate(['/dashboard']);

      },
      error: (err) =>
        this.triggerToast(err.error || 'Invalid OTP ❌', true)
    });
  }
}
