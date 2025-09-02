import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUser } from '../models/admin-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:5000/api/admin'; // replace with your backend

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.baseUrl}/users`);
  }

  getAdminById(id: string): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.baseUrl}/users/${id}`);
  }

  createAdmin(admin: AdminUser): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${this.baseUrl}/users`, admin);
  }

  updateAdmin(id: string, admin: Partial<AdminUser>): Observable<AdminUser> {
    return this.http.put<AdminUser>(`${this.baseUrl}/users/${id}`, admin);
  }

  deleteAdmin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }
}
