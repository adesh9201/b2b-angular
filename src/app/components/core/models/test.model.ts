export interface NavItem {
  navItemId: string;
  tenantId: string;
  label: string;
  icon?: string;
  route: string;
  roles?: string; // comma separated
}


export interface Role {
  roleId: string;
  tenantId: string;
  name: string;
  normalizedName: string;
  description?: string;
  isSystemRole: boolean;
}

export interface AccountAction {
  actionId: string;
  tenantId: string;
  label: string;
  icon?: string;
  route: string;
  roles?: string;
}

export interface Marketplace {
  marketplaceId: string;
  tenantId: string;
  name: string;
  logoUrl?: string;
}
