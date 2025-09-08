import { Routes } from '@angular/router';

// Pages
import { Home } from './components/pages/home/home';
import { Catalogs } from './components/pages/catalogs/catalogs';
import { Fabric } from './components/pages/fabric/fabric';
import { FabricDetails } from './components/pages/fabric-details/fabric-details';
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


//Admin Pages

import { Admin } from './admin/admin';
import { FooterAdmin } from './admin/pages/footer-admin/footer-admin';
import { FabricAdmin } from './admin/pages/fabric-admin/fabric-admin';
// import { Use } from './admin/users/users';
// import { Produc } from './admin/products/products';
// import { Orde } from './admin/orders/orders';
// import { Settin } from './admin/settings/settings';







export const routes: Routes = [
  // Pages
  { path: '', component: Home },
  { path: 'catalogs', component: Catalogs },
  { path: 'fabric', component: Fabric },
  { path: 'fabric/:id', component: Fabric },
  { path: 'fabric-details', component: FabricDetails },
  { path: 'products', component: Products },
  { path: 'products/:id', component: Products },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'about', component: About },
  { path: 'suppliers', component: Suppliers },
  { path: 'login', component: Login },
  { path: 'register', component: Register },


// Vendor Pages
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
  { path: 'accountsetting', component: AccountSetting },
  { path: 'logistics', component: Logistics },
  { path: 'productcatalog', component: ProductCatalog },


  //test

  { path: 'test', component: Test },


//Admin Pages
//  { path: 'admin', component: Admin } ,  // 👈 admin route add
{
    path: 'admin',
    component: Admin,
    children: [

      { path: 'footer-admin', component: FooterAdmin },
       { path: 'fabric-admin', component: FabricAdmin },
      // { path: 'products', component: Products },
      // { path: 'orders', component: Orde },
      // { path: 'settings', component: Settin },
      // { path: '', redirectTo: 'users', pathMatch: 'full' } // default
    ]
  },

  // wildcard
  { path: '**', redirectTo: '' },
];
