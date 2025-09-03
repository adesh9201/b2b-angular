import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { FooterData } from '../models/footer.model';

@Injectable({ providedIn: 'root' })
export class FooterService {
  private apiUrl = 'http://localhost:5008/api/footer';

  constructor(private http: HttpClient) {}

  /** Single default footer (backend returns one record) */
  getFooterData(): Observable<FooterData> {
    return this.http.get<any>(this.apiUrl).pipe(map(d => this.mapFromApi(d)));
  }

  /** List for table UI: wraps single record in an array */
  getAllFooters(): Observable<FooterData[]> {
    return this.getFooterData().pipe(
      map(item => item ? [item] : [])
    );
  }

  /** Get by id (backend supports GET api/footer/{id}) */
  getById(id: number): Observable<FooterData> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(map(d => this.mapFromApi(d)));
  }

  /** Create */
  createFooter(data: FooterData): Observable<FooterData> {
    const payload = this.mapToApi(data);
    return this.http.post<any>(this.apiUrl, payload).pipe(map(d => this.mapFromApi(d)));
  }

  /** Update */
  updateFooter(id: number, data: FooterData): Observable<void> {
    const payload = this.mapToApi(data);
    return this.http.put<void>(`${this.apiUrl}/${id}`, payload);
  }

  /** Delete */
  deleteFooter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ------------ Mapping helpers ------------

  /** API → UI model (parse JSON strings) */
  private mapFromApi(d: any): FooterData {
    if (!d) {
      // sane defaults so UI never crashes
      return {
        id: undefined,
        brandName: '',
        logoUrl: '',
        newsletterHeading: '',
        newsletterPlaceholder: '',
        newsletterButton: 'Subscribe',
        mobileAppHeading: '',
        playStoreLink: '',
        appStoreLink: '',
        playStoreBadge: '',
        appStoreBadge: '',
        helpHeading: '',
        phoneNumber: '',
        timings: '',
        companyLinks: [],
        helpLinks: [],
        quickLinks: [],
        topCategories: [],
        usPs: [],
        socials: [],
        policies: [],
        copyText: '',
        updatedAt: undefined
      };
    }
    const parse = (x: any) => {
      try { return x ? (typeof x === 'string' ? JSON.parse(x) : x) : []; }
      catch { return []; }
    };

    return {
      id: d.id,
      brandName: d.brandName || '',
      logoUrl: d.logoUrl || '',
      newsletterHeading: d.newsletterHeading || '',
      newsletterPlaceholder: d.newsletterPlaceholder || '',
      newsletterButton: d.newsletterButton || 'Subscribe',
      mobileAppHeading: d.mobileAppHeading || '',
      playStoreLink: d.playStoreLink || '',
      appStoreLink: d.appStoreLink || '',
      playStoreBadge: d.playStoreBadge || '',
      appStoreBadge: d.appStoreBadge || '',
      helpHeading: d.helpHeading || '',
      phoneNumber: d.phoneNumber || '',
      timings: d.timings || '',
      companyLinks: parse(d.companyLinks),
      helpLinks: parse(d.helpLinks),
      quickLinks: parse(d.quickLinks),
      topCategories: parse(d.topCategories),
      usPs: parse(d.usPs),
      socials: parse(d.socials),
      policies: parse(d.policies),
      copyText: d.copyText || '',
      updatedAt: d.updatedAt ? new Date(d.updatedAt) : undefined,
    };
  }

  /** UI model → API (stringify arrays) */
  private mapToApi(m: FooterData): any {
    return {
      id: m.id, // create me id mat bhejna if PK conflict ho, UI me undefined rakho
      brandName: m.brandName,
      logoUrl: m.logoUrl || '',
      newsletterHeading: m.newsletterHeading || '',
      newsletterPlaceholder: m.newsletterPlaceholder || '',
      newsletterButton: m.newsletterButton || 'Subscribe',
      mobileAppHeading: m.mobileAppHeading || '',
      playStoreLink: m.playStoreLink || '',
      appStoreLink: m.appStoreLink || '',
      playStoreBadge: m.playStoreBadge || '',
      appStoreBadge: m.appStoreBadge || '',
      helpHeading: m.helpHeading || '',
      phoneNumber: m.phoneNumber || '',
      timings: m.timings || '',
      companyLinks: JSON.stringify(m.companyLinks || []),
      helpLinks: JSON.stringify(m.helpLinks || []),
      quickLinks: JSON.stringify(m.quickLinks || []),
      topCategories: JSON.stringify(m.topCategories || []),
      usPs: JSON.stringify(m.usPs || []),
      socials: JSON.stringify(m.socials || []),
      policies: JSON.stringify(m.policies || []),
      copyText: m.copyText || '',
      updatedAt: (m.updatedAt ?? new Date()).toISOString(),
    };
  }
}