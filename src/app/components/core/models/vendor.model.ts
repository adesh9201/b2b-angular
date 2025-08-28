export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  businessDescription: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: VendorAddress;
  businessType: BusinessType;
  categories: string[];
  documents: VendorDocument[];
  status: VendorStatus;
  rating: number;
  totalOrders: number;
  totalProducts: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VendorDocument {
  id: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  isVerified: boolean;
}

export enum BusinessType {
  MANUFACTURER = 'manufacturer',
  WHOLESALER = 'wholesaler',
  RETAILER = 'retailer',
  DISTRIBUTOR = 'distributor',
  IMPORTER = 'importer',
  EXPORTER = 'exporter'
}

export enum VendorStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive'
}

export enum DocumentType {
  BUSINESS_LICENSE = 'business_license',
  TAX_CERTIFICATE = 'tax_certificate',
  GST_CERTIFICATE = 'gst_certificate',
  PAN_CARD = 'pan_card',
  AADHAR_CARD = 'aadhar_card',
  BANK_STATEMENT = 'bank_statement',
  OTHER = 'other'
}

export interface CreateVendorRequest {
  businessName: string;
  businessDescription: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: VendorAddress;
  businessType: BusinessType;
  categories: string[];
}

export interface UpdateVendorRequest {
  businessName?: string;
  businessDescription?: string;
  contactPerson?: string;
  phone?: string;
  address?: VendorAddress;
  businessType?: BusinessType;
  categories?: string[];
}

export interface VendorStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  pendingOrders: number;
  completedOrders: number;
}