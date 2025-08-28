export interface Vendor {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: 'Manufacturer' | 'Wholesaler' | 'Retailer' | 'Distributor';
  description?: string;
  specialties: string[];
  address: VendorAddress;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  isVerified: boolean;
  yearsInBusiness: number;
  certifications: string[];
  website?: string;
  socialMedia?: SocialMedia;
  contactPerson: ContactPerson;
  businessHours: BusinessHours;
  paymentMethods: string[];
  shippingMethods: string[];
  minimumOrder: number;
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
}

export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  position?: string;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface VendorRegistrationRequest {
  businessName: string;
  email: string;
  phone: string;
  password: string;
  businessType: string;
  description?: string;
  specialties: string[];
  address: VendorAddress;
  contactPerson: ContactPerson;
  website?: string;
}

export interface VendorUpdateRequest {
  businessName?: string;
  description?: string;
  specialties?: string[];
  address?: VendorAddress;
  contactPerson?: ContactPerson;
  website?: string;
  socialMedia?: SocialMedia;
  businessHours?: BusinessHours;
  paymentMethods?: string[];
  shippingMethods?: string[];
  minimumOrder?: number;
}

export interface VendorFilter {
  category?: string;
  location?: string;
  rating?: number;
  search?: string;
  verified?: boolean;
  businessType?: string;
}

export interface VendorStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  monthlyGrowth: number;
  topProducts: string[];
}

export interface VendorReview {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
  notHelpful: number;
}

export interface VendorVerificationRequest {
  businessLicense: string;
  taxId: string;
  bankAccount: string;
  identityDocument: string;
  businessRegistration: string;
}