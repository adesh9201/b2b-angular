// src/app/models/payment.model.ts
export interface Transaction {
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  type: string;
  details: string;
}

export interface Payout {
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  method: string;
  details: string;
}

export interface Wallet {
  balance: number;
  currency: string;
}
