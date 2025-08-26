import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Define the interface for ImageColorDetail
export interface ImageColorDetail {
  id: number;
  folderName: string;
  imageName: string;
  colorHex: string;
  insertedOn: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:5008/api/ImageColorDetails'; // Adjust to match backend

  constructor(private http: HttpClient) {}

  // ✅ Get all ImageColorDetails
  getAll(): Observable<ImageColorDetail[]> {
    return this.http.get<ImageColorDetail[]>(this.apiUrl);
  }
}
