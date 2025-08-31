import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../vendor/core/services/payments.service';
import { Transaction, Payout,Wallet } from '../../vendor/core/models/payment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-payments',
    imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class Payment implements OnInit {

  wallet!: Wallet;
  transactions: Transaction[] = [];
  payouts: Payout[] = [];

  currentPage = 1;
  pageSize = 5;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.wallet = this.paymentService.getWallet();
    this.transactions = this.paymentService.getTransactions();
    this.payouts = this.paymentService.getPayouts();
  }

  get paginatedTransactions() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.transactions.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
