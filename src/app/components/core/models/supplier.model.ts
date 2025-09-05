export interface Supplier {
  supplierId: number;               // backend ka ID
  name: string;
  address: string;
  pincode: string;
  state: string;
  city?: string;
  gstin?: string;
  pan?: string;
  emailId?: string;
  phone?: string;
  contact_Person?: string;
}

// Feature interface for "Become a Supplier" section
export interface Feature {
  title: string;
  subtitle: string;
  icon: string;
  iconColorClass: string;
  bgClass: string;
}


export interface SupplierRegister {
  name: string;
  address?: string;
  pincode?: string;
  state?: string;
  city?: string;
  gstin?: string;
  pan?: string;
  emailId: string;
  phone?: string;
  contact_Person?: string;
}

export interface SendOtpRequest {
  contact: string;
}

export interface VerifyOtpRequest {
  contact: string;
  otp: string;
}

export interface SupplierLogin {
  contact: string;
}
