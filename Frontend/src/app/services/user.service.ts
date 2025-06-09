// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Userrequest } from '../interfaces/userrequest';
import { Userprofile } from '../interfaces/userprofile';

export interface UserRequest {
  userRequestId: number;
  userId: number;
  requestType: string;
  relatedRecordId: number;
  status: string;
  createdAt: string;
  createdBy: number;
}

export interface UserWithRequests {
  userId: number;
  profilePicture: string;
  fullName: string;
  email: string;
  status: string;
  phone: string;
  requests: UserRequest[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://localhost:7120/api/User';

  constructor(private http: HttpClient) {
    // Decode and log JWT payload for debugging
    const token = localStorage.getItem('token');  
    if (token) {
      const payload = this.parseJwt(token);
      console.log('Decoded JWT Payload:', payload.id);
    } else {
      console.warn('Token not found in localStorage');
    }
  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private parseJwt(token: string): any {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  getAllUsersWithRequests(): Observable<UserWithRequests[]> {
    return this.http.get<UserWithRequests[]>(`${this.baseUrl}/all`, {
      headers: this.getAuthHeaders(),
    });
  }
  getAllById(userId: number): Observable<UserWithRequests> {
    return this.http.get<UserWithRequests>(`${this.baseUrl}/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getallrequests(): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(`${this.baseUrl}/userrequests`, {
      headers: this.getAuthHeaders(),
    });
  }

  register(user: Userprofile): Observable<any> {
    return this.http.post(`https://localhost:7120/api/User/create`, user,{
      headers: this.getAuthHeaders(),
    });
  }
}