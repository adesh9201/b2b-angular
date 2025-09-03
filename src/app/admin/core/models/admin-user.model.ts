export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'moderator' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateAdminRequest {
  name: string;
  email: string;
  role: 'superadmin' | 'moderator' | 'viewer';
  status: 'active' | 'inactive';
}

export interface UpdateAdminRequest extends Partial<CreateAdminRequest> {
  lastLogin?: Date;
}
