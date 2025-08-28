import { Routes } from '@angular/router';
import { AuthGuard } from './components/core/guards/auth.guard';
import { AdminGuard } from './components/core/guards/admin.guard';
import { VendorGuard } from './components/core/guards/vendor.guard';

// Pages
import { Home } from './components/pages/home/home';
import { Catalogs } from './components/pages/catalogs/catalogs';
import { Products } from './components/pages/products/products';
import { Cart } from './components/pages/cart/cart';
import { About } from './components/pages/about/about';
import { Suppliers } from './components/pages/suppliers/suppliers';
import { Login } from './components/pages/login/login';
import { Register } from './components/pages/register/register';
import { Test } from './components/pages/test/test';
import { Checkout } from './components/pages/checkout/checkout';

// Vendor Pages
import { Dashboard } from './components/vendor/dashboard/dashboard';
import { Order } from './components/vendor/order/order';
import { Inventory } from './components/vendor/inventory/inventory';
import { Pricing } from './components/vendor/pricing/pricing';
import { Claims } from './components/vendor/claims/claims';
import { Payment } from './components/vendor/payment/payment';
import { Analytics } from './components/vendor/analytics/analytics';
import { Marketing } from './components/vendor/marketing/marketing';
import { Reviews } from './components/vendor/reviews/reviews';
import { Support } from './components/vendor/support/support';
import { AccountSetting } from './components/vendor/account-setting/account-setting';
import { Logistics } from './components/vendor/logistics/logistics';
import { ProductCatalog } from './components/vendor/product-catalog/product-catalog';

export const routes: Routes = [
  // Public Pages
  { path: '', component: Home },
  { path: 'catalogs', component: Catalogs },
  { path: 'products', component: Products },
  { path: 'products/:id', component: Products },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'about', component: About },
  { path: 'suppliers', component: Suppliers },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'test', component: Test },

  // Protected Routes - Require Authentication
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'orders', 
    component: Order, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'profile', 
    component: AccountSetting, 
    canActivate: [AuthGuard] 
  },

  // Vendor Routes - Require Vendor Authentication
  { 
    path: 'vendor', 
    children: [
      { path: 'dashboard', component: Dashboard, canActivate: [VendorGuard] },
      { path: 'orders', component: Order, canActivate: [VendorGuard] },
      { path: 'inventory', component: Inventory, canActivate: [VendorGuard] },
      { path: 'pricing', component: Pricing, canActivate: [VendorGuard] },
      { path: 'claims', component: Claims, canActivate: [VendorGuard] },
      { path: 'payment', component: Payment, canActivate: [VendorGuard] },
      { path: 'analytics', component: Analytics, canActivate: [VendorGuard] },
      { path: 'marketing', component: Marketing, canActivate: [VendorGuard] },
      { path: 'reviews', component: Reviews, canActivate: [VendorGuard] },
      { path: 'support', component: Support, canActivate: [VendorGuard] },
      { path: 'account', component: AccountSetting, canActivate: [VendorGuard] },
      { path: 'logistics', component: Logistics, canActivate: [VendorGuard] },
      { path: 'products', component: ProductCatalog, canActivate: [VendorGuard] }
    ]
  },

  // Admin Routes - Require Admin Authentication
  { 
    path: 'admin', 
    children: [
      { path: 'dashboard', component: Dashboard, canActivate: [AdminGuard] },
      { path: 'orders', component: Order, canActivate: [AdminGuard] },
      { path: 'products', component: ProductCatalog, canActivate: [AdminGuard] },
      { path: 'vendors', component: Suppliers, canActivate: [AdminGuard] }
    ]
  },

  // Legacy routes for backward compatibility
  { path: 'order', component: Order, canActivate: [AuthGuard] },
  { path: 'inventory', component: Inventory, canActivate: [VendorGuard] },
  { path: 'pricing', component: Pricing, canActivate: [VendorGuard] },
  { path: 'claims', component: Claims, canActivate: [VendorGuard] },
  { path: 'payment', component: Payment, canActivate: [VendorGuard] },
  { path: 'analytics', component: Analytics, canActivate: [VendorGuard] },
  { path: 'marketing', component: Marketing, canActivate: [VendorGuard] },
  { path: 'reviews', component: Reviews, canActivate: [VendorGuard] },
  { path: 'support', component: Support, canActivate: [VendorGuard] },
  { path: 'accountsetting', component: AccountSetting, canActivate: [VendorGuard] },
  { path: 'logistics', component: Logistics, canActivate: [VendorGuard] },
  { path: 'productcatalog', component: ProductCatalog, canActivate: [VendorGuard] },

  // Wildcard route
  { path: '**', redirectTo: '' },
];
