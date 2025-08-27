import { Routes } from '@angular/router';
import { vendorGuard } from './components/core/guards/vendor.guard';


export const routes: Routes = [
  // Pages (lazy-loaded standalone components)
  { path: '', loadComponent: () => import('./components/pages/home/home').then(m => m.Home), title: 'Home' },
  { path: 'catalogs', loadComponent: () => import('./components/pages/catalogs/catalogs').then(m => m.Catalogs), title: 'Catalogs' },
  { path: 'products', loadComponent: () => import('./components/pages/products/products').then(m => m.Products), title: 'Products' },
  { path: 'products/:id', loadComponent: () => import('./components/pages/products/products').then(m => m.Products), title: 'Product Details' },
  { path: 'cart', loadComponent: () => import('./components/pages/cart/cart').then(m => m.Cart), title: 'Cart' },
  { path: 'checkout', loadComponent: () => import('./components/pages/checkout/checkout').then(m => m.Checkout), title: 'Checkout' },
  { path: 'about', loadComponent: () => import('./components/pages/about/about').then(m => m.About), title: 'About' },
  { path: 'suppliers', loadComponent: () => import('./components/pages/suppliers/suppliers').then(m => m.Suppliers), title: 'Suppliers' },
  { path: 'login', loadComponent: () => import('./components/pages/login/login').then(m => m.Login), title: 'Login' },
  { path: 'register', loadComponent: () => import('./components/pages/register/register').then(m => m.Register), title: 'Register' },

  // Vendor area under layout
  {
    path: 'vendor',
    loadComponent: () => import('./components/vendor/shared/vendor-layout/vendor-layout').then(m => m.VendorLayout),
    canMatch: [vendorGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', loadComponent: () => import('./components/vendor/dashboard/dashboard').then(m => m.Dashboard), title: 'Vendor Dashboard' },
      { path: 'order', loadComponent: () => import('./components/vendor/order/order').then(m => m.Order), title: 'Orders' },
      { path: 'inventory', loadComponent: () => import('./components/vendor/inventory/inventory').then(m => m.Inventory), title: 'Inventory' },
      { path: 'pricing', loadComponent: () => import('./components/vendor/pricing/pricing').then(m => m.Pricing), title: 'Pricing' },
      { path: 'claims', loadComponent: () => import('./components/vendor/claims/claims').then(m => m.Claims), title: 'Claims' },
      { path: 'payment', loadComponent: () => import('./components/vendor/payment/payment').then(m => m.Payment), title: 'Payments' },
      { path: 'analytics', loadComponent: () => import('./components/vendor/analytics/analytics').then(m => m.Analytics), title: 'Analytics' },
      { path: 'marketing', loadComponent: () => import('./components/vendor/marketing/marketing').then(m => m.Marketing), title: 'Marketing' },
      { path: 'reviews', loadComponent: () => import('./components/vendor/reviews/reviews').then(m => m.Reviews), title: 'Reviews' },
      { path: 'support', loadComponent: () => import('./components/vendor/support/support').then(m => m.Support), title: 'Support' },
      { path: 'accountsetting', loadComponent: () => import('./components/vendor/account-setting/account-setting').then(m => m.AccountSetting), title: 'Account Settings' },
      { path: 'logistics', loadComponent: () => import('./components/vendor/logistics/logistics').then(m => m.Logistics), title: 'Logistics' },
      { path: 'productcatalog', loadComponent: () => import('./components/vendor/product-catalog/product-catalog').then(m => m.ProductCatalog), title: 'Product Catalog' },
    ]
  },

  // Test
  { path: 'test', loadComponent: () => import('./components/pages/test/test').then(m => m.Test), title: 'Test' },

  // Wildcard
  { path: '**', redirectTo: '' },
];
