import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FabricDetail } from '../models/fabric-details.model';

@Injectable({
  providedIn: 'root'
})
export class FabricDetailsService {
  private apiUrl = 'http://localhost:5008/api/FabricDetails'; // ⚡ confirm this

  constructor(private http: HttpClient) {}

  // directly return response
  getAll(): Observable<FabricDetail[]> {
    return this.http.get<FabricDetail[]>(this.apiUrl);
  }

  getById(id: number): Observable<FabricDetail> {
    return this.http.get<FabricDetail>(`${this.apiUrl}/${id}`);
  }
}
