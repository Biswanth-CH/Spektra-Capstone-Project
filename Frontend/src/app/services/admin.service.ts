// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userprofile } from '../interfaces/userprofile';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'https://localhost:7120/api/Admin';
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  constructor(private http: HttpClient) {}

  // Fetch all admins
  getAllAdmins(): Observable<Userprofile[]> {
    return this.http.get<Userprofile[]>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders(),
    });
  }
}
