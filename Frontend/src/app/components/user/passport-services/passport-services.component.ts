import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { PassportrenewalService } from '../../../services/passportrenewal.service';

@Component({
  selector: 'app-passport-services',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './passport-services.component.html',
  styleUrls: ['./passport-services.component.css'],
})
export class PassportServicesComponent {
  currentStep = 1;

  sidebarItems = [
    { label: 'Dashboard', path: 'user-dashboard' },
    { label: 'Passport Renewal', path: 'passport-renewal' },
    { label: 'Tax Filing', path: 'tax-filing' },
    { label: 'Legal Inquiry', path: 'legal-inquiry' },
    { label: 'AI Assistant', path: 'ai-assistant' },
    { label: 'Requests', path: 'user-requests' },
    { label: 'Reports', path: 'user-reports' },
    { label: 'Profile', path: 'user-profile' },
    { label: 'Logout', path: '' },
  ];

  steps = [
    'Personal Info',
    'Upload Documents',
    'Review & Payment',
    'Confirmation',
  ];

  formData = {
    fullName: '',
    dob: '',
    passportNumber: '',
    email: '',
    address: '',
    photo: '',
    govID: '',
  };

  validationErrors = {
    fullName: '',
    dob: '',
    passportNumber: '',
    email: '',
    address: '',
    photo: '',
    govID: '',
  };

  constructor(
    private router: Router,
    private passportRenewalService: PassportrenewalService
  ) {}

  navigateTo(path: string) {
    if (path === '') {
      this.logout();
    } else {
      this.router.navigate([`/${path}`]);
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }

  nextStep() {
    if (this.currentStep === 1 && !this.validateStep1()) return;
    if (this.currentStep === 2 && !this.validateStep2()) return;
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  validateStep1(): boolean {
    this.validationErrors = {
      fullName: '',
      dob: '',
      passportNumber: '',
      email: '',
      address: '',
      photo: '',
      govID: '',
    };

    const namePattern = /^[A-Za-z\s]+$/;
    const passportPattern = /^[A-Z][0-9]{7,8}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.formData.fullName) {
      this.validationErrors.fullName = 'Full Name is required.';
    } else if (!namePattern.test(this.formData.fullName)) {
      this.validationErrors.fullName =
        'Full Name must only contain letters and spaces.';
    }

    if (!this.formData.dob) {
      this.validationErrors.dob = 'Date of Birth is required.';
    } else if (new Date(this.formData.dob) > new Date()) {
      this.validationErrors.dob = 'Date of Birth cannot be in the future.';
    }

    if (!this.formData.passportNumber) {
      this.validationErrors.passportNumber = 'Passport Number is required.';
    } else if (!passportPattern.test(this.formData.passportNumber)) {
      this.validationErrors.passportNumber = 'Passport number format invalid.';
    }

    if (!this.formData.email) {
      this.validationErrors.email = 'Email Address is required.';
    } else if (!emailPattern.test(this.formData.email)) {
      this.validationErrors.email = 'Email format invalid.';
    }

    if (!this.formData.address) {
      this.validationErrors.address = 'Residential Address is required.';
    }

    return !Object.values(this.validationErrors).some((msg) => msg !== '');
  }

  validateStep2(): boolean {
    this.validationErrors.photo = '';
    this.validationErrors.govID = '';

    if (!this.formData.photo) {
      this.validationErrors.photo = 'Photo description is required.';
    }

    if (!this.formData.govID) {
      this.validationErrors.govID = 'Government ID info is required.';
    }

    return !this.validationErrors.photo && !this.validationErrors.govID;
  }

  private parseJwt(token: string | null): any {
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

  submitApplication() {
    const token = localStorage.getItem('token');
    const payload12 = this.parseJwt(token);
    const userId = payload12?.UserId;
    const createdBy = 101;
    const createdAt = new Date().toISOString();

    const payload = {
      passportRenewalId: 0,
      userId,
      fullName: this.formData.fullName,
      dob: this.formData.dob,
      passportNumber: this.formData.passportNumber,
      emailAddress: this.formData.email,
      residentialAddress: this.formData.address,
      passportSizedPhoto: this.formData.photo,
      governmentIssuedId: this.formData.govID,
      confirmationNumber: '',
      createdAt,
      createdBy,
    };

    this.passportRenewalService.submitRenewalApplication(payload).subscribe({
      next: (res) => {
        console.error('Submission Error:', res);
        this.router.navigate([`/user-dashboard`]);
      },
      error: (err) => {
        console.log('API Response:', err);
        this.nextStep();
      },
    });
  }
}
