import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../core/services/supplier.service';
import { Supplier } from '../../core/models/supplier.model';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Sidebar],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  supplierData: Supplier | null = null;
  loading: boolean = true; // 🔄 loader handle karne ke liye

  constructor(private router: Router, private supplierService: SupplierService) {}

  ngOnInit(): void {
    const data = localStorage.getItem('supplierData');

    // if (!data) {
    //   // ❌ Agar user login nahi hai → Login page pe bhej do
    //   this.router.navigate(['/login']);
    //   return;
    // }

  //       const parsed = JSON.parse(data);

  //   // ✅ supplierId localStorage se uthao
  //   const supplierId = parsed.supplierId;
  //   if (supplierId) {
  //     this.supplierService.getSupplierById(supplierId).subscribe({
  //       next: (res: Supplier) => {
  //         this.supplierData = res;
  //         this.loading = false;
  //       },
  //       error: () => {
  //         localStorage.removeItem('supplierData');
  //         this.router.navigate(['/login']);
  //       }
  //     });
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  // logout() {
  //   localStorage.removeItem('supplierData');
  //   this.router.navigate(['/login']);
  // }

        if (!data) {
      // ❌ Agar user login nahi hai → Login page pe bhej do
      this.router.navigate(['/suppliers']);
      return;
    }

    const parsed = JSON.parse(data);

    // ✅ supplierId localStorage se uthao
    const supplierId = parsed.supplierId;
    if (supplierId) {
      this.supplierService.getSupplierById(supplierId).subscribe({
        next: (res: Supplier) => {
          this.supplierData = res;
          this.loading = false;
        },
        error: () => {
          localStorage.removeItem('supplierData');
          this.router.navigate(['/suppliers']);
        }
      });
    } else {
      this.router.navigate(['/suppliers']);
    }
  }

  logout() {
    localStorage.removeItem('supplierData');
    this.router.navigate(['/suppliers']);
  }
}
