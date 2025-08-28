import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';
import { ProductService } from '../../core/services/product.service';
import { VendorService } from '../../core/services/vendor.service';
import { Product } from '../../core/models/product.model';
import { Vendor } from '../../core/models/vendor.model';

@Component({
  selector: 'app-product-catalog',
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule, Sidebar],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalog implements OnInit {
  products: Product[] = [];
  currentVendor: Vendor | null = null;
  isLoading = false;
  showAddModal = false;
  showEditModal = false;
  selectedProduct: Product | null = null;
  
  productForm!: FormGroup;
  searchQuery = '';
  selectedCategory = '';
  selectedStatus = '';

  constructor(
    private productService: ProductService,
    private vendorService: VendorService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadVendorData();
    this.loadProducts();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      minOrderQuantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      imageUrl: ['', Validators.required],
      isActive: [true]
    });
  }

  private loadVendorData(): void {
    this.vendorService.currentVendor$.subscribe(vendor => {
      this.currentVendor = vendor;
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    // Mock loading vendor products
    setTimeout(() => {
      this.products = [
        {
          id: '1',
          vendorId: 'vendor1',
          name: 'Premium Cotton Fabric',
          description: 'High-quality cotton fabric perfect for clothing and home textiles',
          price: 25.99,
          category: 'cotton',
          subcategory: 'plain',
          stockQuantity: 1000,
          minOrderQuantity: 10,
          unit: 'meters',
          imageUrl: 'https://via.placeholder.com/300x200',
          isActive: true,
          rating: 4.5,
          totalOrders: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          vendorId: 'vendor1',
          name: 'Silk Blend Material',
          description: 'Luxurious silk blend material for premium garments',
          price: 45.99,
          category: 'silk',
          subcategory: 'blend',
          stockQuantity: 500,
          minOrderQuantity: 5,
          unit: 'meters',
          imageUrl: 'https://via.placeholder.com/300x200',
          isActive: true,
          rating: 4.8,
          totalOrders: 75,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  openAddModal(): void {
    this.showAddModal = true;
    this.productForm.reset();
    this.productForm.patchValue({ isActive: true });
  }

  openEditModal(product: Product): void {
    this.selectedProduct = product;
    this.showEditModal = true;
    this.productForm.patchValue(product);
  }

  closeModal(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedProduct = null;
    this.productForm.reset();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      
      if (this.showEditModal && this.selectedProduct) {
        // Update existing product
        const updatedProduct = { ...this.selectedProduct, ...formData, updatedAt: new Date() };
        const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now().toString(),
          vendorId: this.currentVendor?.id || 'vendor1',
          ...formData,
          rating: 0,
          totalOrders: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.products.unshift(newProduct);
      }
      
      this.closeModal();
    }
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(p => p.id !== productId);
    }
  }

  toggleProductStatus(product: Product): void {
    product.isActive = !product.isActive;
    product.updatedAt = new Date();
  }

  getFilteredProducts(): Product[] {
    let filtered = this.products;

    if (this.searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.selectedStatus) {
      const isActive = this.selectedStatus === 'active';
      filtered = filtered.filter(p => p.isActive === isActive);
    }

    return filtered;
  }

  getErrorMessage(controlName: string): string {
    const control = this.productForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['min']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${control.errors['min'].min}`;
      }
    }
    return '';
  }
}
