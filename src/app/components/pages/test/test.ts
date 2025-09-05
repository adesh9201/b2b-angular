import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavService, RoleService, AccountActionService, MarketplaceService } from '../../core/services/test.service';
import { NavItem, Role, AccountAction, Marketplace } from '../../core/models/test.model';

@Component({
  selector: 'app-test',
  standalone: true,           // make it standalone
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class Test implements OnInit {

  navItems: NavItem[] = [];
  roles: Role[] = [];
  accountActions: AccountAction[] = [];
  marketplace: Marketplace | null = null;

  tenantId: string = '11111111-1111-1111-1111-111111111111';

  constructor(
    private navService: NavService,
    private roleService: RoleService,
    private accountService: AccountActionService,
    private marketplaceService: MarketplaceService
  ) { }

  ngOnInit(): void {
    this.loadNavItems();
    this.loadRoles();
    this.loadAccountActions();
    this.loadMarketplace();
  }

  loadNavItems() {
    this.navService.getNavItemsByTenant(this.tenantId).subscribe(items => this.navItems = items);
  }

  loadRoles() {
    this.roleService.getRolesByTenant(this.tenantId).subscribe(data => this.roles = data);
  }

  loadAccountActions() {
    this.accountService.getActionsByTenant(this.tenantId).subscribe(actions => this.accountActions = actions);
  }

  loadMarketplace() {
    this.marketplaceService.getMarketplaceByTenant(this.tenantId).subscribe(mp => this.marketplace = mp);
  }

  canAccess(item: { roles?: string }): boolean {
    if (!item.roles) return true;
    const allowedRoles = item.roles.split(',');
    return this.roles.some(r => allowedRoles.includes(r.normalizedName));
  }
}
