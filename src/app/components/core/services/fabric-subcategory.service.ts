// src/app/core/services/qualityMaster.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FabricSubcategoryModel } from '../models/fabric-subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class FabricSubcategoryService {
  private apiUrl = 'http://localhost:5008/api/FabTypeMaster'; // apna backend url daalna

  constructor(private http: HttpClient) {}

  getAllFabricSubcategory(): Observable<FabricSubcategoryModel[]> {
    return this.http.get<FabricSubcategoryModel[]>(this.apiUrl);
  }
}
