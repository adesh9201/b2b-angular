import { Routes } from '@angular/router';

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
import { AuthGuard, VendorGuard, AdminGuard } from './components/core/services/auth-guards';


export const routes: Routes = [
  // Pages
  { path: '', component: Home },
  { path: 'catalogs', component: Catalogs },
  { path: 'products', component: Products },
  { path: 'products/:id', component: Products },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout, canActivate: [AuthGuard] },
  { path: 'about', component: About },
  { path: 'suppliers', component: Suppliers },
  { path: 'login', component: Login },
  { path: 'register', component: Register },


// Vendor Pages
  { path: 'dashboard', component: Dashboard, canActivate: [VendorGuard] },
  { path: 'order', component: Order, canActivate: [VendorGuard] },
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


  //test

  { path: 'test', component: Test },


  // wildcard
  { path: '**', redirectTo: '' },
];
