import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  adminName = 'Administrator';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }

  navigateTo(destination: string) {
    const routeMap: Record<string, string> = {
      'admin-dashboard': 'admin-dashboard',
      'admin-analytics': 'admin-analytics',
      'admin-users': 'admin-users',
      'admin-services': 'admin-services',
      'admin-requests': 'admin-requests',
      'admin-profile': 'admin-profile',
    };

    const route = routeMap[destination.toLowerCase()];
    if (route) {
      this.router.navigate([`/${route}`]);
    } else {
      console.warn(`No route mapped for: ${destination}`);
    }
  }
  
}
