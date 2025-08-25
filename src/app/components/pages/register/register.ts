import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder, private supplierService: SupplierService) {
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

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const supplier: SupplierRegister = this.registerForm.value;

    this.supplierService.register(supplier).subscribe({
      next: (res) => {
        console.log('Register response:', res);
        alert('Registered successfully! Now verify OTP.');
        this.sendOtp(supplier.emailId);
      },
      error: (err) => {
        console.error('Register error:', err);
        if (err.error) {
          alert(err.error);
        } else if (err.status === 0) {
          alert('Cannot reach server. Check CORS or backend running.');
        } else {
          alert('Unexpected error: ' + err.message);
        }
      }
    });
  }

  sendOtp(contact: string) {
    this.supplierService.sendOtp(contact).subscribe({
      next: (res) => {
        console.log('Send OTP response:', res);
        this.otpSent = true;
        alert('OTP sent to email.');
      },
      error: (err) => {
        console.error('Send OTP error:', err);
        if (err.error) {
          alert(err.error);
        } else if (err.status === 0) {
          alert('Cannot reach server. Check CORS or backend running.');
        } else {
          alert('Unexpected error: ' + err.message);
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
        alert('OTP verified! You can now login.');
      },
      error: (err) => {
        console.error('Verify OTP error:', err);
        if (err.error) {
          alert(err.error);
        } else if (err.status === 0) {
          alert('Cannot reach server. Check CORS or backend running.');
        } else {
          alert('Unexpected error: ' + err.message);
        }
      }
    });
  }
}
