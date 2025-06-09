import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taxfilling } from '../interfaces/taxfilling';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaxfilingService {
  private apiUrl = 'https://localhost:7120/api/Taxfilling';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  submitTaxFiling(data: Taxfilling): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json',
    });
  }
}
