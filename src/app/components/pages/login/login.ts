import { Component, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  form: FormGroup;
  otpSent = false;


  // 🔔 Toast state
  showToast = false;
  toastMessage = '';
  isError = false;

  constructor(
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      contact: ['', [Validators.required, Validators.minLength(4)]],
      otp: ['', [Validators.minLength(4)]]
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

  sendOtp() {
    const contact = this.form.get('contact')!.value;
    this.supplierService.sendOtp(contact).subscribe({
      next: () => {
        this.otpSent = true;
        this.triggerToast('OTP sent successfully ✅');
      },
      error: (err) =>
        this.triggerToast(err.error || 'Failed to send OTP ❌', true)
    });
  }

  verifyOtp() {
    const contact = this.form.get('contact')!.value;
    const otp = this.form.get('otp')!.value;
    this.supplierService.verifyOtp(contact, otp).subscribe({
      next: (res) => {
        this.triggerToast(
          'Login successful! Supplier ID: ' + res.supplierId
        );

        // ✅ Store supplier data in localStorage
        localStorage.setItem('supplierData', JSON.stringify(res));

        // ✅ Set app auth token for guards/interceptor
        this.auth.loginWithOtp(contact, otp).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });

      },
      error: (err) =>
        this.triggerToast(err.error || 'Invalid OTP ❌', true)
    });
  }
}
