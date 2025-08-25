// order.model.ts
export interface Order {
  id: number;
  customer: string;
  products: string[];
  total: number;
  status: string;
  date: Date;
}
