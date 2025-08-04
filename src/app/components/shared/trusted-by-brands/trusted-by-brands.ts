import { Component, OnInit } from '@angular/core';
import { TrustedByBrandsService } from '../../core/services/trusted-by-brands.service';
import { TrustedBrand } from '../../core/models/trusted-by-brands.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trusted-by-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-by-brands.html',
  styleUrl: './trusted-by-brands.css'
})
export class TrustedByBrands implements OnInit {
  brands: TrustedBrand[] = [];

  constructor(private brandService: TrustedByBrandsService) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
    });
  }
}
