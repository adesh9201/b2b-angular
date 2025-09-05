import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavItem, Role, AccountAction, Marketplace } from '../models/test.model';

@Injectable({ providedIn: 'root' })
export class NavService {
  private apiUrl = 'http://localhost:5008/api/NavItems';
  constructor(private http: HttpClient) { }

  getNavItemsByTenant(tenantId: string): Observable<NavItem[]> {
    return this.http.get<NavItem[]>(`${this.apiUrl}/ByTenant/${tenantId}`);
  }

  updateNavItem(navItem: NavItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${navItem.navItemId}`, navItem);
  }
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  private apiUrl = 'http://localhost:5008/api/Roles';
  constructor(private http: HttpClient) { }

  getRolesByTenant(tenantId: string): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/ByTenant/${tenantId}`);
  }
}

@Injectable({ providedIn: 'root' })
export class AccountActionService {
  private apiUrl = 'http://localhost:5008/api/AccountActions';
  constructor(private http: HttpClient) { }

  getActionsByTenant(tenantId: string): Observable<AccountAction[]> {
    return this.http.get<AccountAction[]>(`${this.apiUrl}/ByTenant/${tenantId}`);
  }
}

@Injectable({ providedIn: 'root' })
export class MarketplaceService {
  private apiUrl = 'http://localhost:5008/api/Marketplace/11111111-1111-1111-1111-111111111111';
  constructor(private http: HttpClient) { }

  getMarketplaceByTenant(tenantId: string): Observable<Marketplace> {
    return this.http.get<Marketplace>(`${this.apiUrl}/ByTenant/${tenantId}`);
  }
}
