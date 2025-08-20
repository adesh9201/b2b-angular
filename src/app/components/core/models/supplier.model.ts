// src/app/core/models/supplier.model.ts
export interface Supplier {
  name: string;
  address: string;
  pincode: string;
  state: string;
  location?: string;       // optional, filter ke liye
  rating?: number;         // optional
  imageUrl?: string;       // optional
  description?: string;    // optional
}

// Feature interface for "Become a Supplier" section
export interface Feature {
  title: string;
  subtitle: string;
  icon: string;
  iconColorClass: string;
  bgClass: string;
}









// export interface Supplier {
//   id: number;
//   name: string;
//   location: string;
//   rating: number;
//   description: string;
//   imageUrl: string;
// }

// export interface Feature {
//   icon: string;
//   title: string;
//   subtitle: string;
//   bgClass: string;
//   iconColorClass: string;
// }
