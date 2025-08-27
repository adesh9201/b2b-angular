import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoggingService } from '../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h2 class="register-title">Create Account</h2>
          <p class="register-subtitle">Join FabHub and start your B2B journey</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  formControlName="firstName"
                  class="form-control"
                  [class.is-invalid]="isFieldInvalid('firstName')"
                  placeholder="Enter first name"
                />
                <div *ngIf="isFieldInvalid('firstName')" class="invalid-feedback">
                  <span *ngIf="registerForm.get('firstName')?.errors?.['required']">First name is required</span>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  formControlName="lastName"
                  class="form-control"
                  [class.is-invalid]="isFieldInvalid('lastName')"
                  placeholder="Enter last name"
                />
                <div *ngIf="isFieldInvalid('lastName')" class="invalid-feedback">
                  <span *ngIf="registerForm.get('lastName')?.errors?.['required']">Last name is required</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('email')"
              placeholder="Enter your email"
            />
            <div *ngIf="isFieldInvalid('email')" class="invalid-feedback">
              <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="phone" class="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              formControlName="phone"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('phone')"
              placeholder="Enter your phone number"
            />
            <div *ngIf="isFieldInvalid('phone')" class="invalid-feedback">
              <span *ngIf="registerForm.get('phone')?.errors?.['required']">Phone number is required</span>
              <span *ngIf="registerForm.get('phone')?.errors?.['pattern']">Please enter a valid phone number</span>
            </div>
          </div>

          <div class="form-group">
            <label for="company" class="form-label">Company Name</label>
            <input
              type="text"
              id="company"
              formControlName="company"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('company')"
              placeholder="Enter your company name"
            />
            <div *ngIf="isFieldInvalid('company')" class="invalid-feedback">
              <span *ngIf="registerForm.get('company')?.errors?.['required']">Company name is required</span>
            </div>
          </div>

          <div class="form-group">
            <label for="userType" class="form-label">Account Type</label>
            <select
              id="userType"
              formControlName="userType"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('userType')"
            >
              <option value="">Select account type</option>
              <option value="buyer">Buyer - I want to purchase fabrics</option>
              <option value="vendor">Vendor - I want to sell fabrics</option>
            </select>
            <div *ngIf="isFieldInvalid('userType')" class="invalid-feedback">
              <span *ngIf="registerForm.get('userType')?.errors?.['required']">Please select an account type</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="password-input-wrapper">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                class="form-control"
                [class.is-invalid]="isFieldInvalid('password')"
                placeholder="Create a password"
              />
              <button
                type="button"
                class="password-toggle"
                (click)="togglePasswordVisibility()"
                [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
              >
                <i [class]="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
            <div *ngIf="isFieldInvalid('password')" class="invalid-feedback">
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 8 characters</span>
              <span *ngIf="registerForm.get('password')?.errors?.['pattern']">Password must contain uppercase, lowercase, number and special character</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              formControlName="confirmPassword"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('confirmPassword')"
              placeholder="Confirm your password"
            />
            <div *ngIf="isFieldInvalid('confirmPassword')" class="invalid-feedback">
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</span>
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['mismatch']">Passwords do not match</span>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-wrapper">
              <input type="checkbox" formControlName="agreeToTerms" />
              <span class="checkmark"></span>
              I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
            </label>
            <div *ngIf="isFieldInvalid('agreeToTerms')" class="invalid-feedback">
              <span *ngIf="registerForm.get('agreeToTerms')?.errors?.['required']">You must agree to the terms and conditions</span>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg w-100"
            [disabled]="registerForm.invalid || isLoading"
          >
            <span *ngIf="isLoading" class="spinner spinner-sm me-2"></span>
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>
        </form>

        <div class="register-footer">
          <p>Already have an account? <a routerLink="/login" class="login-link">Sign in here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%);
      padding: var(--space-4);
    }

    .register-card {
      background: var(--bg-primary);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      padding: var(--space-8);
      width: 100%;
      max-width: 600px;
      border: 1px solid var(--border-primary);
    }

    .register-header {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .register-title {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .register-subtitle {
      color: var(--text-secondary);
      font-size: var(--font-size-base);
    }

    .register-form {
      margin-bottom: var(--space-6);
    }

    .password-input-wrapper {
      position: relative;
    }

    .password-toggle {
      position: absolute;
      right: var(--space-3);
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: var(--space-1);
      border-radius: var(--radius-sm);
      transition: color var(--transition-fast);
    }

    .password-toggle:hover {
      color: var(--text-primary);
    }

    .checkbox-wrapper {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      line-height: var(--line-height-relaxed);
    }

    .checkbox-wrapper input[type="checkbox"] {
      margin-right: var(--space-2);
      margin-top: var(--space-1);
    }

    .checkbox-wrapper a {
      color: var(--color-primary);
      text-decoration: none;
    }

    .checkbox-wrapper a:hover {
      text-decoration: underline;
    }

    .register-footer {
      text-align: center;
    }

    .register-footer p {
      margin: 0;
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
    }

    .login-link {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
      text-decoration: none;
    }

    .login-link:hover {
      text-decoration: underline;
    }

    .invalid-feedback {
      display: block;
      width: 100%;
      margin-top: var(--space-1);
      font-size: var(--font-size-sm);
      color: var(--color-danger);
    }

    .is-invalid {
      border-color: var(--color-danger);
    }

    .spinner-sm {
      width: 1rem;
      height: 1rem;
      border-width: 0.125rem;
    }

    @media (max-width: 768px) {
      .register-container {
        padding: var(--space-2);
      }

      .register-card {
        padding: var(--space-6);
      }

      .register-title {
        font-size: var(--font-size-2xl);
      }

      .row .col-6 {
        flex: 0 0 100%;
      }
    }
  `]
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loggingService: LoggingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      company: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      ]],
      confirmPassword: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    
    return null;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = this.registerForm.value;
      delete formData.confirmPassword;

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.loggingService.info('User registered successfully', { email: formData.email, userType: formData.userType });
          this.toastr.success('Account created successfully!', 'Registration Successful');
          
          // Redirect based on user type
          if (formData.userType === 'vendor') {
            this.router.navigate(['/vendor/onboarding']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.loggingService.error('Registration failed', { email: formData.email, error: error.message });
          this.toastr.error(error.message || 'Registration failed. Please try again.', 'Registration Failed');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}