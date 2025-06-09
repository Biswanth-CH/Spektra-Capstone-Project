import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Passportrenuwal } from '../interfaces/passportrenuwal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassportrenewalService {
  private apiUrl = 'https://localhost:7120/api/PassportProfile';
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  constructor(private http: HttpClient) {}

  // submitRenewalApplication(data: any) {
  //   const formData = new FormData();

  //   formData.append('FullName', data.fullName);
  //   formData.append('DOB', data.dob);
  //   formData.append('PassportNumber', data.passportNumber);
  //   formData.append('EmailAddress', data.emailAddress);
  //   formData.append('ResidentialAddress', data.residentialAddress);
  //   formData.append('UserId', data.userId.toString());
  //   formData.append('CreatedBy', data.createdBy.toString());

  //   formData.append('PassportSizedPhoto', data.photo);
  //   formData.append('GovernmentIssuedId', data.govID);
  //   console.log(data);
  //   return this.http.post(this.apiUrl, formData, {
  //     headers: this.getAuthHeaders(),
  //   });
  // }
  submitRenewalApplication(data: Passportrenuwal): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders(),
    });
  }
  subtaxfilling(data: any) {
    return this.http.post(`https://localhost:7120/api/Taxfilling`, data, {
      headers: this.getAuthHeaders(),
    });
  }
}
