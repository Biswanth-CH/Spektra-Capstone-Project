  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { NavbarComponent } from '../navbar/navbar.component';
  import { FormsModule } from '@angular/forms';
  import { LegalInquiryService } from '../../../services/legal-inquiry.service';
  import { LegalInquiry } from '../../../interfaces/legal-inquiry';

  @Component({
    selector: 'app-legal-support',
    standalone: true,
    imports: [CommonModule, NavbarComponent, FormsModule],
    templateUrl: './legal-support.component.html',
    styleUrls: ['./legal-support.component.css'],
  })
  export class LegalSupportComponent {
    openAIChat() {
      console.log('AI Chat opened');
    }
    category = '';
    priority = '';
    subject = '';
    description = '';
    information = '';
    document = '';
    agreeTerms = false;

    constructor(
      private router: Router,
      private legalInquiryService: LegalInquiryService
    ) {}

    navigateTo(path: string): void {
      this.router.navigate([`/${path}`]);
    }

    logout(): void {
      localStorage.removeItem('auth_token');
      this.router.navigate(['/home']);
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
    submitInquiry(): void {
      if (!this.agreeTerms) {
        alert('You must agree to the terms and conditions.');
        return;
      }

      const token = localStorage.getItem('token');
      const payload12 = this.parseJwt(token);
      const userId12 = payload12?.UserId;
      const userId = userId12;
      const createdBy = 101; // Hardcoded or from context/session
      const createdAt = new Date().toISOString();

      const inquiry: LegalInquiry = {
        userId,
        category: this.category,
        priority: this.priority,
        subject: this.subject,
        description: this.description,
        information: this.information,
        document: this.document,
        createdAt,
        createdBy,
      };

      this.legalInquiryService.submitLegalInquiry(inquiry).subscribe({
        next: (err) => {
          console.log('Inquiry submitted:', err);
          this.resetForm();
          this.router.navigate(['/user-dashboard']);

        },
        error: (res) => {
          console.error('Submission error:', res);
          this.router.navigate(['/user-dashboard']);
        },
      });
    }

    private resetForm(): void {
      this.category = '';
      this.priority = '';
      this.subject = '';
      this.description = '';
      this.information = '';
      this.document = '';
      this.agreeTerms = false;
    }
  }
