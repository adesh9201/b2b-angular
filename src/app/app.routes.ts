import { Routes } from '@angular/router';


export const routes: Routes = [
  // Pages (lazy-loaded standalone components)
  { path: '', loadComponent: () => import('./components/pages/home/home').then(m => m.Home) },
  { path: 'catalogs', loadComponent: () => import('./components/pages/catalogs/catalogs').then(m => m.Catalogs) },
  { path: 'products', loadComponent: () => import('./components/pages/products/products').then(m => m.Products) },
  { path: 'products/:id', loadComponent: () => import('./components/pages/products/products').then(m => m.Products) },
  { path: 'cart', loadComponent: () => import('./components/pages/cart/cart').then(m => m.Cart) },
  { path: 'checkout', loadComponent: () => import('./components/pages/checkout/checkout').then(m => m.Checkout) },
  { path: 'about', loadComponent: () => import('./components/pages/about/about').then(m => m.About) },
  { path: 'suppliers', loadComponent: () => import('./components/pages/suppliers/suppliers').then(m => m.Suppliers) },
  { path: 'login', loadComponent: () => import('./components/pages/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./components/pages/register/register').then(m => m.Register) },

  // Vendor Pages (lazy-loaded)
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
  { path: 'accountsetting', loadComponent: () => import('./components/vendor/account-setting/account-setting').then(m => m.AccountSetting) },
  { path: 'logistics', loadComponent: () => import('./components/vendor/logistics/logistics').then(m => m.Logistics) },
  { path: 'productcatalog', loadComponent: () => import('./components/vendor/product-catalog/product-catalog').then(m => m.ProductCatalog) },

  // Test
  { path: 'test', loadComponent: () => import('./components/pages/test/test').then(m => m.Test) },

  // Wildcard
  { path: '**', redirectTo: '' },
];
