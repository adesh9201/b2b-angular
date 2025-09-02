export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string; // e.g. 'superadmin', 'editor', 'viewer'
  createdAt: Date;
}
