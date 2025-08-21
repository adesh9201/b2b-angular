// src/app/core/models/supplier.model.ts
export interface Supplier {
  name: string;
  address: string;
  pincode: string;
  state: string;
}

// Feature interface for "Become a Supplier" section
export interface Feature {
  title: string;
  subtitle: string;
  icon: string;
  iconColorClass: string;
  bgClass: string;
}
