// src/app/core/services/qualityMaster.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FabricCategoryModel } from '../models/fabric-category.model';

@Injectable({
  providedIn: 'root'
})
export class FabricCategoryService {
  private apiUrl = 'http://localhost:5008/api/QualityMaster'; // apna backend url daalna

  constructor(private http: HttpClient) {}

  getAllFabricCategory(): Observable<FabricCategoryModel[]> {
    return this.http.get<FabricCategoryModel[]>(this.apiUrl);
  }
}
