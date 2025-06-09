import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class UserDashboardComponent {
  userName = 'User';
  selectedLanguage = 'en';

  passportStatus: string | null = 'Approved';
  taxStatus: string | null = 'Pending';

  recentActivities = [
    {
      type: 'passport',
      title: 'Passport Renewal Submitted',
      date: new Date(),
      status: 'approved',
    },
    {
      type: 'tax',
      title: 'Tax Filing Completed',
      date: new Date(),
      status: 'pending',
    },
  ];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
