import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FooterData } from '../models/footer.model';

@Injectable({ providedIn: 'root' })
export class FooterService {
  private apiUrl = 'http://localhost:5008/api/footer'; // ✅ apne .NET API ka base URL dalna

  constructor(private http: HttpClient) {}

  getFooterData(): Observable<FooterData> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data: any) => {
        // ✅ Backend flat strings ko parse karke Angular model me convert karenge
        return {
          newsletterHeading: data.newsletterHeading,
          newsletterPlaceholder: data.newsletterPlaceholder,
          newsletterButton: data.newsletterButton,

          brandName: data.brandName,
          logoUrl: data.logoUrl,

          mobileAppHeading: data.mobileAppHeading,
          playStoreLink: data.playStoreLink,
          appStoreLink: data.appStoreLink,
          playStoreBadge: data.playStoreBadge,
          appStoreBadge: data.appStoreBadge,

          helpHeading: data.helpHeading,
          phoneNumber: data.phoneNumber,
          timings: data.timings,

          companyLinks: JSON.parse(data.companyLinks || '[]'),
          helpLinks: JSON.parse(data.helpLinks || '[]'),
          quickLinks: JSON.parse(data.quickLinks || '[]'),
          topCategories: JSON.parse(data.topCategories || '[]'),

          usPs: JSON.parse(data.usPs || '[]'),
          socials: JSON.parse(data.socials || '[]'),

          policies: JSON.parse(data.policies || '[]'),
          copyText: data.copyText,
        } as FooterData;
      })
    );
  }


getAllFooters(): Observable<FooterData[]> {
  return this.http.get<FooterData[]>(this.apiUrl);
}

createFooter(data: FooterData): Observable<FooterData> {
  return this.http.post<FooterData>(this.apiUrl, data);
}

updateFooter(id: number, data: FooterData): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, data);
}

deleteFooter(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
