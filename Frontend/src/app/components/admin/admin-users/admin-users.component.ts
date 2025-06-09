import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService, UserWithRequests } from '../../../services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AdminNavbarComponent],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  currentFilter = 'all';
  users: UserWithRequests[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsersWithRequests();
  }

  fetchUsersWithRequests(): void {
    this.userService.getAllUsersWithRequests().subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
      },
      error: (err) => {
        console.error('Failed to load user data:', err);
      },
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    this.router.navigate(['/home']);
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
    // Placeholder: implement filtered fetching logic as needed
  }
}
