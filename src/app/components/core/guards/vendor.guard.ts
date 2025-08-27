import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const vendorGuard: CanMatchFn = () => {
  const router = inject(Router);
  const supplierData = localStorage.getItem('supplierData');
  if (supplierData) {
    return true;
  }
  return router.createUrlTree(['/login'], { queryParams: { redirect: '/vendor' } });
};

