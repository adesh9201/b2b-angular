export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  role: 'user' | 'vendor' | 'admin';
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  preferences?: UserPreferences;
  address?: Address;
  vendorProfile?: VendorProfile;
}

export interface UserPreferences {
  language: string;
  currency: string;
  timezone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface VendorProfile {
  businessName: string;
  businessType: string;
  taxId?: string;
  website?: string;
  description?: string;
  specialties: string[];
  certifications: string[];
  yearsInBusiness: number;
  averageRating: number;
  totalReviews: number;
  isVerified: boolean;
  commissionRate: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  role?: 'user' | 'vendor';
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}