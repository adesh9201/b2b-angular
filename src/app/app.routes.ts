import { Routes } from '@angular/router';

// Guards
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
  { path: 'about', component: About },
  { path: 'suppliers', component: Suppliers },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'test', component: Test },

  // Protected Pages (require authentication)
  { 
    path: 'cart', 
    component: Cart, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'checkout', 
    component: Checkout, 
    canActivate: [AuthGuard] 
  },

  // Vendor Pages (require vendor authentication)
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'order', 
    component: Order, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'inventory', 
    component: Inventory, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'pricing', 
    component: Pricing, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'claims', 
    component: Claims, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'payment', 
    component: Payment, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'analytics', 
    component: Analytics, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'marketing', 
    component: Marketing, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'reviews', 
    component: Reviews, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'support', 
    component: Support, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'accountsetting', 
    component: AccountSetting, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'logistics', 
    component: Logistics, 
    canActivate: [AuthGuard, VendorGuard] 
  },
  { 
    path: 'productcatalog', 
    component: ProductCatalog, 
    canActivate: [AuthGuard, VendorGuard] 
  },

  // Admin Pages (require admin authentication)
  // Add admin routes here when admin components are created
  // { 
  //   path: 'admin', 
  //   component: AdminDashboard, 
  //   canActivate: [AuthGuard, AdminGuard] 
  // },

  // Wildcard route - redirect to home
  { path: '**', redirectTo: '' },
];
