import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FabricDetails_20241012 } from '../models/fabric.model';

@Injectable({ providedIn: 'root' })
export class FabricService {
  private base = 'http://localhost:5008/api/FabricDetails20241012';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FabricDetails_20241012[]> {
    return this.http.get<FabricDetails_20241012[]>(this.base);
  }

  getById(id: number): Observable<FabricDetails_20241012> {
    return this.http.get<FabricDetails_20241012>(`${this.base}/${id}`);
  }

  create(payload: FabricDetails_20241012): Observable<FabricDetails_20241012> {
    return this.http.post<FabricDetails_20241012>(this.base, payload);
  }

  update(id: number, payload: FabricDetails_20241012): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
