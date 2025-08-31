// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { Transaction, Payout, Wallet } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private wallet: Wallet = {
    balance: 12500,
    currency: '₹'
  };

  private transactions: Transaction[] = [
    { date: '2024-07-26', amount: 500, status: 'Completed', type: 'Credit', details: 'Payment received' },
    { date: '2024-07-25', amount: 200, status: 'Pending', type: 'Debit', details: 'Payment processing' },
    { date: '2024-07-24', amount: 350, status: 'Failed', type: 'Credit', details: 'Payment failed' },
    { date: '2024-07-23', amount: 120, status: 'Completed', type: 'Debit', details: 'Payment sent' },
    { date: '2024-07-22', amount: 800, status: 'Completed', type: 'Credit', details: 'Payment received' }
  ];

  private payouts: Payout[] = [
    { date: '2024-07-26', amount: 400, status: 'Completed', method: 'Bank Transfer', details: 'Payout sent' },
    { date: '2024-07-25', amount: 600, status: 'Pending', method: 'PayPal', details: 'Payout processing' },
    { date: '2024-07-24', amount: 250, status: 'Completed', method: 'Stripe', details: 'Payout sent' },
    { date: '2024-07-23', amount: 700, status: 'Failed', method: 'Bank Transfer', details: 'Bank rejected' }
  ];

  getWallet(): Wallet {
    return this.wallet;
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getPayouts(): Payout[] {
    return this.payouts;
  }
}
