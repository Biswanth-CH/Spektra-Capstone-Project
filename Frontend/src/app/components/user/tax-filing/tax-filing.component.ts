import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { TaxfilingService } from '../../../services/taxfiling.service';

@Component({
  selector: 'app-tax-filing',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './tax-filing.component.html',
  styleUrls: ['./tax-filing.component.css'],
})
export class TaxFilingComponent {
  currentStep = 1;
  formErrors: { [key: string]: string } = {};

  taxFilingForm = {
    firstName: '',
    lastName: '',
    ssn: 0,
    filingStatus: '',
    w2Income: 0,
    freelance1099Income: 0,
    standardDeduction: '',
    charitableDonations: 0,
    mortgageInterestPaid: 0,
  };

  constructor(
    private router: Router,
    private taxFilingService: TaxfilingService
  ) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }

  validateStep1(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.taxFilingForm.firstName) {
      this.formErrors['firstName'] = 'First name is required';
      isValid = false;
    } else if (this.taxFilingForm.firstName.length < 2) {
      this.formErrors['firstName'] = 'First name must be at least 2 characters';
      isValid = false;
    }

    if (!this.taxFilingForm.lastName) {
      this.formErrors['lastName'] = 'Last name is required';
      isValid = false;
    } else if (this.taxFilingForm.lastName.length < 2) {
      this.formErrors['lastName'] = 'Last name must be at least 2 characters';
      isValid = false;
    }

    if (!this.taxFilingForm.ssn) {
      this.formErrors['ssn'] = 'SSN is required';
      isValid = false;
    } else if (this.taxFilingForm.ssn.toString().length !== 9) {
      this.formErrors['ssn'] = 'SSN must be 9 digits';
      isValid = false;
    }

    if (!this.taxFilingForm.filingStatus) {
      this.formErrors['filingStatus'] = 'Filing status is required';
      isValid = false;
    }

    return isValid;
  }

  validateStep2(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (
      this.taxFilingForm.w2Income === null ||
      this.taxFilingForm.w2Income < 0
    ) {
      this.formErrors['w2Income'] = 'W-2 Income must be a positive number';
      isValid = false;
    }

    if (
      this.taxFilingForm.freelance1099Income === null ||
      this.taxFilingForm.freelance1099Income < 0
    ) {
      this.formErrors['freelance1099Income'] =
        'Freelance Income must be a positive number';
      isValid = false;
    }

    return isValid;
  }

  validateStep3(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.taxFilingForm.standardDeduction) {
      this.formErrors['standardDeduction'] =
        'Standard deduction selection is required';
      isValid = false;
    }

    if (
      this.taxFilingForm.charitableDonations === null ||
      this.taxFilingForm.charitableDonations < 0
    ) {
      this.formErrors['charitableDonations'] =
        'Charitable donations must be a positive number';
      isValid = false;
    }

    if (
      this.taxFilingForm.mortgageInterestPaid === null ||
      this.taxFilingForm.mortgageInterestPaid < 0
    ) {
      this.formErrors['mortgageInterestPaid'] =
        'Mortgage interest must be a positive number';
      isValid = false;
    }

    return isValid;
  }

  nextStep() {
    let isValid = true;

    if (this.currentStep === 1) {
      isValid = this.validateStep1();
    } else if (this.currentStep === 2) {
      isValid = this.validateStep2();
    } else if (this.currentStep === 3) {
      isValid = this.validateStep3();
    }

    if (isValid && this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
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

  submitForm() {
    if (
      !this.validateStep1() ||
      !this.validateStep2() ||
      !this.validateStep3()
    ) {
      alert('Please fix all validation errors before submitting.');
      this.currentStep = 1; // Go back to first step with errors
      return;
    }

    const token = localStorage.getItem('token');
    const payload = this.parseJwt(token);
    const userId = payload?.UserId ?? null;
    const createdBy = 101;
    const createdAt = new Date().toISOString();

    if (!userId) {
      alert('User authentication error. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    const finalPayload = {
      userId,
      firstName: this.taxFilingForm.firstName,
      lastName: this.taxFilingForm.lastName,
      ssn: this.taxFilingForm.ssn,
      filingStatus: this.taxFilingForm.filingStatus,
      w2Income: this.taxFilingForm.w2Income,
      freelance1099Income: this.taxFilingForm.freelance1099Income,
      standardDeduction: this.taxFilingForm.standardDeduction,
      charitableDonations: this.taxFilingForm.charitableDonations,
      mortgageInterestPaid: this.taxFilingForm.mortgageInterestPaid,
      estimatedTaxRefund: 0, // backend to calculate
      createdAt,
      createdBy,
    };

    this.taxFilingService.submitTaxFiling(finalPayload).subscribe({
      next: (res) => {
        console.error('Submission Error:', res);
        this.router.navigate(['/user-dashboard']);

      },
      error: (err) => {
        console.log('API Response:', err);
        this.nextStep();
      },
    });
  }
}
