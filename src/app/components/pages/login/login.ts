import { Component } from '@angular/core';
import { SupplierService } from '../../core/services/supplier.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {




  contact = '';
  otp = '';
  otpSent = false;

  constructor(private supplierService: SupplierService) {}

  sendOtp() {
    this.supplierService.sendOtp(this.contact).subscribe({
      next: () => {
        this.otpSent = true;
        alert('OTP sent!');
      },
      error: (err) => alert(err.error)
    });
  }

  verifyOtp() {
    this.supplierService.verifyOtp(this.contact, this.otp).subscribe({
      next: (res) => alert('Login successful! Supplier ID: ' + res.supplierId),
      error: (err) => alert(err.error)
    });
  }
}
