// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { SendOtpRequest, SupplierRegisterDto, VerifyOtpRequest } from '../models/supplier.model';
// // import { environment } from '../../../environments/environment';


// @Injectable({ providedIn: 'root' })
// export class AuthService {
// private base =  'http://localhost:5000/api/suppliers';
// private tokenKey = 'auth_token'; // अभी OTP verify success पर pseudo-token सेट करेंगे
// private contactKey = 'auth_contact';


// constructor(private http: HttpClient) {}


// register(dto: SupplierRegisterDto): Observable<any> {
// return this.http.post(`${this.base}/register`, dto);
// }


// sendOtp(contact: string): Observable<any> {
// const body: SendOtpRequest = { contact };
// return this.http.post(`${this.base}/send-otp`, body);
// }


// verifyOtp(contact: string, otp: string): Observable<any> {
// const body: VerifyOtpRequest = { contact, otp };
// return this.http.post(`${this.base}/verify-otp`, body).pipe(
// tap((res: any) => {
// // Backend JWT नहीं दे रहा, इसलिए हम local pseudo-session रखते हैं
// const token = `verified:${contact}`;
// localStorage.setItem(this.tokenKey, token);
// localStorage.setItem(this.contactKey, contact);
// })
// );
// }


// isLoggedIn(): boolean {
// return !!localStorage.getItem(this.tokenKey);
// }


// getContact(): string | null { return localStorage.getItem(this.contactKey); }


// logout(): void {
// localStorage.removeItem(this.tokenKey);
// localStorage.removeItem(this.contactKey);
// }
// }
