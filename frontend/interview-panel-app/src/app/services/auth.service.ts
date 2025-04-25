// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5000/auth';

//   constructor(private http: HttpClient) {}

//   register(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, { email, password });
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { email, password });
//   }

//   requestPasswordReset(email: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/request-reset`, { email });
//   }

//   resetPassword(token: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/reset-password/${token}`, { password });
//   }

//   requestOTP(email: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/request-otp`, { email });
//   }

//   verifyOTP(email: string, otp: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/verify-otp`, { email, otp });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient,private router: Router) {}
  isLoggedIn(): boolean {
    // Implement real logic here (e.g. check token existence or validity)
    return !!localStorage.getItem('token');
  }
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
