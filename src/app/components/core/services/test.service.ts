import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestModel } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiUrl = 'http://localhost:5008/api/products'; // .NET API URL

  constructor(private http: HttpClient) { }

  // Get all products
  getAll(): Observable<TestModel[]> {
    return this.http.get<TestModel[]>(this.apiUrl);
  }

  // Get product by ID
  getById(id: string): Observable<TestModel> {
    return this.http.get<TestModel>(`${this.apiUrl}/${id}`);
  }

  // Create product
  create(product: TestModel): Observable<TestModel> {
    return this.http.post<TestModel>(this.apiUrl, product);
  }

  // Update product
  update(product: TestModel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${product.productId}`, product);
  }

  // Delete product
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}



