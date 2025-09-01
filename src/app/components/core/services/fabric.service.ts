import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FabricModel } from '../models/fabric.model';

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  private apiUrl = 'http://localhost:5008/api/FabricDetails'; // ⚡ confirm this

  constructor(private http: HttpClient) {}

  // directly return response
  getAll(): Observable<FabricModel[]> {
    return this.http.get<FabricModel[]>(this.apiUrl);
  }

getById(id: number): Observable<FabricModel> {
  return this.http.get<FabricModel>(`${this.apiUrl}/${id}`);
}
}
