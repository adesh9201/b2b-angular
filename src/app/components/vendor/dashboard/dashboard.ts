import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-core/services/dashboard.service';
import { Product } from '../dashboard-core/models/product.model';
import { Order } from '../dashboard-core/models/order.model';
import { DashboardStats } from '../dashboard-core/models/dashboard.model';
import { UserProfile } from '../dashboard-core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, Sidebar, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  stats: DashboardStats = { totalProducts:0, totalOrders:0, totalRevenue:0, avgRating:0 };
  products: Product[] = [];
  orders: Order[] = [];
  profile!: UserProfile;

  newProduct: Product = { id:0, name:'', category:'', price:0, stock:0, status:'active', material:'', weight:'', width:'', imageUrl:'', description:'', colors:[] };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void { this.loadDashboard(); }

  loadDashboard() {
    this.dashboardService.getDashboardStats().subscribe(data => this.stats = data);
    this.dashboardService.getProducts().subscribe(data => this.products = data);
    this.dashboardService.getOrders().subscribe(data => this.orders = data);
    this.dashboardService.getProfile().subscribe(data => this.profile = data);
  }

  addProduct() {
    this.dashboardService.addProduct(this.newProduct).subscribe(product => {
      this.products.push(product);
      this.newProduct = { id:0, name:'', category:'', price:0, stock:0, status:'active', material:'', weight:'', width:'', imageUrl:'', description:'', colors:[] };
    });
  }

  updateProfile() {
    this.dashboardService.updateProfile(this.profile).subscribe(updated => this.profile = updated);
  }
}
