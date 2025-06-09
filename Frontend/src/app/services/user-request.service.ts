import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../interfaces/user-request';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  private apiUrl = 'https://localhost:7120/api/UserRequest';

  constructor(private http: HttpClient) {}

  // Create a new user request
  createUserRequest(request: UserRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  // Get all user requests
  getAllUserRequests(): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(this.apiUrl);
  }

  // Get a user request by ID
  getUserRequestById(id: number): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(`${this.apiUrl}/${id}`);
  }
  updateUserRequest(id: number, request: UserRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, request);
  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Delete a user request
  deleteUserRequest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateStatus(
    id: number,
    newStatus: string,
    existingRequest: UserRequest
  ): Observable<any> {
    const updatedRequest: UserRequest = {
      ...existingRequest,
      status: newStatus,
    };

    return this.http.put(`${this.apiUrl}/${id}`, updatedRequest, {
      headers: this.getAuthHeaders(),
    });
  }
}
