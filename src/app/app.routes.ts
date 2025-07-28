import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Catalogs } from './components/pages/catalogs/catalogs';
export const routes: Routes = [
  { path: '', component: Home },
  // { path: 'catalogs', component: Catalogs },
  { path: 'catalogs', loadComponent: () => import('./components/pages/catalogs/catalogs').then(m => m.Catalogs) },
  { path: 'cart', loadComponent: () => import('./components/pages/cart/cart').then(m => m.Cart) },
  { path: 'about', loadComponent: () => import('./components/pages/about/about').then(m => m.About) },
  { path: 'suppliers', loadComponent: () => import('./components/pages/suppliers/suppliers').then(m => m.Suppliers) },
  { path: 'login', loadComponent: () => import('./components/pages/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./components/pages/register/register').then(m => m.Register) },
  { path: 'dashboard', loadComponent: () => import('./components/vendor/dashboard/dashboard').then(m => m.Dashboard) },
  { path: 'order', loadComponent: () => import('./components/vendor/order/order').then(m => m.Order) },
  { path: '**', redirectTo: '' },

];
