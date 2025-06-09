import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoginUrl = 'https://localhost:7120/api/User/userlogin';
  private adminLoginUrl = 'https://localhost:7120/api/Admin/adminlogin';

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // JWT from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  login(email: string, password: string): Observable<HttpResponse<string>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });

    return this.http
      .post<string>(
        this.userLoginUrl,
        { email, password },
        {
          headers,
          observe: 'response',
          responseType: 'text' as 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }

  adminLogin(
    email: string,
    password: string
  ): Observable<HttpResponse<string>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });

    return this.http
      .post<string>(
        this.adminLoginUrl,
        { email, password },
        {
          headers,
          observe: 'response',
          responseType: 'text' as 'json',
        }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('AuthService error:', error);
    return throwError(() => error);
  }
}
