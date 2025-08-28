import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../vendor/core/services/order.service';
import { OrderModel } from '../../vendor/core/models/order.model';
import { finalize } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-order',
  imports: [FormsModule, CommonModule, Sidebar],
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})
export class Order implements OnInit {
  orders: OrderModel[] = [];
  loading = false;
  total = 0;
  page = 1;
  perPage = 10;
  search = '';
  statusFilter = '';
  sortBy: 'date' | 'amount' = 'date';
  sortDir: 'asc' | 'desc' = 'desc';

  statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.orderService
      .list({
        page: this.page,
        perPage: this.perPage,
        search: this.search,
        status: this.statusFilter,
        sortBy: this.sortBy,
        sortDir: this.sortDir
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.orders = res.items;
          this.total = res.total;
        },
        error: (err) => {
          console.error('Failed to load orders', err);
        }
      });
  }

  onSearch() {
    this.page = 1;
    this.load();
  }

  changeStatusFilter(status: string) {
    this.statusFilter = status;
    this.page = 1;
    this.load();
  }

  changePage(delta: number) {
    this.page = Math.max(1, this.page + delta);
    this.load();
  }

  export() {
    this.orderService.exportCsv({ search: this.search, status: this.statusFilter }).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  }

  fmtDate(dateIso: string) {
    return new Date(dateIso).toLocaleDateString();
  }

  // optional: quick status toggle (example of updateStatus usage)
  setStatus(order: OrderModel, status: string) {
    this.orderService.updateStatus(order.id, status).subscribe({
      next: updated => {
        order.status = updated.status;
      },
      error: err => console.error(err)
    });
  }
}
