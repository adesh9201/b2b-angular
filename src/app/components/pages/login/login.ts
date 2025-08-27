import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoggingService } from '../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2 class="login-title">Welcome Back</h2>
          <p class="login-subtitle">Sign in to your FabHub account</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              [class.is-invalid]="isFieldInvalid('email')"
              placeholder="Enter your email"
              data-cy="email-input"
            />
            <div *ngIf="isFieldInvalid('email')" class="invalid-feedback">
              <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="loginForm.get('email')?.errors?.['email']">Please enter a valid email</span>
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
                placeholder="Enter your password"
                data-cy="password-input"
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
              <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" formControlName="rememberMe" />
              <span class="checkmark"></span>
              Remember me
            </label>
            <a routerLink="/forgot-password" class="forgot-password-link">Forgot Password?</a>
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg w-100"
            [disabled]="loginForm.invalid || isLoading"
            data-cy="login-button"
          >
            <span *ngIf="isLoading" class="spinner spinner-sm me-2"></span>
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="login-divider">
          <span>or</span>
        </div>

        <div class="social-login">
          <button type="button" class="btn btn-outline-primary w-100 mb-3" (click)="loginWithGoogle()">
            <i class="bi bi-google me-2"></i>
            Continue with Google
          </button>
          <button type="button" class="btn btn-outline-primary w-100" (click)="loginWithFacebook()">
            <i class="bi bi-facebook me-2"></i>
            Continue with Facebook
          </button>
        </div>

        <div class="login-footer">
          <p>Don't have an account? <a routerLink="/register" class="register-link">Sign up here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--primary-50) 0%, var(--secondary-50) 100%);
      padding: var(--space-4);
    }

    .login-card {
      background: var(--bg-primary);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      padding: var(--space-8);
      width: 100%;
      max-width: 400px;
      border: 1px solid var(--border-primary);
    }

    .login-header {
      text-align: center;
      margin-bottom: var(--space-8);
    }

    .login-title {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .login-subtitle {
      color: var(--text-secondary);
      font-size: var(--font-size-base);
    }

    .login-form {
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

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .checkbox-wrapper input[type="checkbox"] {
      margin-right: var(--space-2);
    }

    .forgot-password-link {
      font-size: var(--font-size-sm);
      color: var(--color-primary);
      text-decoration: none;
    }

    .forgot-password-link:hover {
      text-decoration: underline;
    }

    .login-divider {
      text-align: center;
      margin: var(--space-6) 0;
      position: relative;
    }

    .login-divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--border-primary);
    }

    .login-divider span {
      background: var(--bg-primary);
      padding: 0 var(--space-4);
      color: var(--text-muted);
      font-size: var(--font-size-sm);
    }

    .social-login {
      margin-bottom: var(--space-6);
    }

    .login-footer {
      text-align: center;
    }

    .login-footer p {
      margin: 0;
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
    }

    .register-link {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
      text-decoration: none;
    }

    .register-link:hover {
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

    @media (max-width: 480px) {
      .login-container {
        padding: var(--space-2);
      }

      .login-card {
        padding: var(--space-6);
      }

      .login-title {
        font-size: var(--font-size-2xl);
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password, rememberMe } = this.loginForm.value;

      this.authService.login(email, password, rememberMe).subscribe({
        next: (response) => {
          this.loggingService.info('User logged in successfully', { email });
          this.toastr.success('Welcome back!', 'Login Successful');
          
          // Redirect based on user role
          if (response.user.role === 'vendor') {
            this.router.navigate(['/vendor/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.loggingService.error('Login failed', { email, error: error.message });
          this.toastr.error('Invalid email or password', 'Login Failed');
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

  loginWithGoogle(): void {
    this.loggingService.info('Google login initiated');
    // Implement Google OAuth login
    this.toastr.info('Google login coming soon!', 'Feature Coming Soon');
  }

  loginWithFacebook(): void {
    this.loggingService.info('Facebook login initiated');
    // Implement Facebook OAuth login
    this.toastr.info('Facebook login coming soon!', 'Feature Coming Soon');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}