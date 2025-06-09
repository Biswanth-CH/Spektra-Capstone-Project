import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboardanalytics } from '../interfaces/dashboardanalytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  //private baseUrl = 'https://your-api-url.com/api'; // update this

  constructor(private http: HttpClient) {}

  getInfo(): Observable<Dashboardanalytics> {
    return this.http.get<Dashboardanalytics>(
      `https://localhost:7120/api/Admin/analytics`
    );
  }

  getInfoByUserId(userId: number): Observable<Dashboardanalytics> {
    return this.http.get<Dashboardanalytics>(
      `https://localhost:7120/api/Admin/analytics/user/${userId}`
    );
  }
}

