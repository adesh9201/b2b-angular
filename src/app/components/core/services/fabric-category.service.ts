// src/app/core/services/qualityMaster.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { FabricCategoryModel } from '../models/fabric-category.model';

@Injectable({
  providedIn: 'root'
})
export class FabricCategoryService {
  private apiUrl = `${environment.apiBaseUrl}/api/QualityMaster`;

  constructor(private http: HttpClient) {}

  getAllFabricCategory(): Observable<FabricCategoryModel[]> {
    return this.http.get<FabricCategoryModel[]>(this.apiUrl);
  }
}
