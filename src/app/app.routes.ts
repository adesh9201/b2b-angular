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

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogs', component: Catalogs },
  { path: 'products', component: Products },
  { path: 'products/:id', component: Products },
  { path: 'cart', component: Cart },
  { path: 'about', component: About },
  { path: 'suppliers', component: Suppliers },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'order', component: Order },
  { path: 'inventory', component: Inventory },
  { path: 'pricing', component: Pricing },
  { path: 'claims', component: Claims },
  { path: 'payment', component: Payment },
  { path: 'analytics', component: Analytics },
  { path: 'marketing', component: Marketing },
  { path: 'reviews', component: Reviews },
  { path: 'support', component: Support },
  { path: 'account-setting', component: AccountSetting },
  { path: 'logistics', component: Logistics },

  // wildcard
  { path: '**', redirectTo: '' },
];
