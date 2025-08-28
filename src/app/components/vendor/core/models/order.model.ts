export interface OrderModel {
  id: string;          // e.g. "12345"
  buyer: string;       // e.g. "Acme Corp"
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | string;
  date: string;        // ISO date string
  amount: number;      // currency number (e.g. 1200.5)
}

export interface OrderQuery {
  page?: number;
  perPage?: number;
  search?: string;
  status?: string;
  sortBy?: 'date' | 'amount' | string;
  sortDir?: 'asc' | 'desc';
}
