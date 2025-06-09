import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent {
  menuOpen = false;
  activeTab = '';

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(route: string) {
    this.activeTab = route.split('/')[2]; // sets active tab for admin
    this.router.navigate([route]);
    this.menuOpen = false;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
    this.menuOpen = false;
  }
}
