import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogs', loadComponent: () => import('./components/pages/catalogs/catalogs').then(m => m.Catalogs) },
  { path: 'products', loadComponent: () => import('./components/pages/products/products').then(m => m.Products) },
  { path: 'cart', loadComponent: () => import('./components/pages/cart/cart').then(m => m.Cart) },
  { path: 'about', loadComponent: () => import('./components/pages/about/about').then(m => m.About) },
  { path: 'suppliers', loadComponent: () => import('./components/pages/suppliers/suppliers').then(m => m.Suppliers) },
  { path: 'login', loadComponent: () => import('./components/pages/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./components/pages/register/register').then(m => m.Register) },
  { path: 'dashboard', loadComponent: () => import('./components/vendor/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'order', loadComponent: () => import('./components/vendor/order/order').then(m => m.Order) },
  { path: 'inventory', loadComponent: () => import('./components/vendor/inventory/inventory').then(m => m.Inventory) },
  { path: 'pricing', loadComponent: () => import('./components/vendor/pricing/pricing').then(m => m.Pricing) },
  { path: 'claims', loadComponent: () => import('./components/vendor/claims/claims').then(m => m.Claims) },
  { path: 'payment', loadComponent: () => import('./components/vendor/payment/payment').then(m => m.Payment) },
  { path: 'analytics', loadComponent: () => import('./components/vendor/analytics/analytics').then(m => m.Analytics) },
  { path: 'marketing', loadComponent: () => import('./components/vendor/marketing/marketing').then(m => m.Marketing) },
  { path: 'reviews', loadComponent: () => import('./components/vendor/reviews/reviews').then(m => m.Reviews) },
  { path: 'support', loadComponent: () => import('./components/vendor/support/support').then(m => m.Support) },
  { path: 'account-setting', loadComponent: () => import('./components/vendor/account-setting/account-setting').then(m => m.AccountSetting) },
  { path: 'logistics', loadComponent: () => import('./components/vendor/logistics/logistics').then(m => m.Logistics) },

  // ✅ Vendor Layout-based Routes
  // {
  //   path: 'vendor',
  //   loadComponent: () =>
  //     import('./components/vendor/shared/vendor-layout/vendor-layout').then(m => m.VendorLayout),
  //   children: [
  //     { path: 'dashboard', loadComponent: () => import('./components/vendor/dashboard/dashboard').then(m => m.Dashboard) },
  //     { path: 'order', loadComponent: () => import('./components/vendor/order/order').then(m => m.Order) },
  //     { path: 'inventory', loadComponent: () => import('./components/vendor/inventory/inventory').then(m => m.Inventory) },
  //     { path: 'pricing', loadComponent: () => import('./components/vendor/pricing/pricing').then(m => m.Pricing) },
  //     { path: 'claims', loadComponent: () => import('./components/vendor/claims/claims').then(m => m.Claims) },
  //     { path: 'payment', loadComponent: () => import('./components/vendor/payment/payment').then(m => m.Payment) },
  //     { path: 'analytics', loadComponent: () => import('./components/vendor/analytics/analytics').then(m => m.Analytics) },
  //     { path: 'marketing', loadComponent: () => import('./components/vendor/marketing/marketing').then(m => m.Marketing) },
  //     { path: 'reviews', loadComponent: () => import('./components/vendor/reviews/reviews').then(m => m.Reviews) },
  //     { path: 'support', loadComponent: () => import('./components/vendor/support/support').then(m => m.Support) },
  //     { path: 'account-setting', loadComponent: () => import('./components/vendor/account-setting/account-setting').then(m => m.AccountSetting) },
  //     { path: 'products', loadComponent: () => import('./components/vendor/products/products').then(m => m.Products) },
  //     { path: 'logistics', loadComponent: () => import('./components/vendor/logistics/logistics').then(m => m.Logistics) },
  //   ]
  // },

  // wildcard
  { path: '**', redirectTo: '' },
];
