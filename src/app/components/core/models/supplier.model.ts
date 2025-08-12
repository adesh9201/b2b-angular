export interface Supplier {
  id: number;
  name: string;
  location: string;
  rating: number;
  description: string;
  imageUrl: string;
}

export interface Feature {
  icon: string;
  title: string;
  subtitle: string;
  bgClass: string;
  iconColorClass: string;
}
