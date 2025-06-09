import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LegalInquiry } from '../interfaces/legal-inquiry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LegalInquiryService {
  private apiUrl = 'https://localhost:7120/api/Legalenquiry'; // Replace with your actual base URL

  constructor(private http: HttpClient) {}

  submitLegalInquiry(inquiry: LegalInquiry): Observable<any> {
    return this.http.post(`${this.apiUrl}`, inquiry);
  }
  
}
