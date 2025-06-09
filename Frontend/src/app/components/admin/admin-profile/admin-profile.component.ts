import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
  imports:[FormsModule,AdminNavbarComponent]
})
export class AdminProfileComponent implements OnInit {
  profile: any = {
    adminId: null,
    profilePic: '',
    fullName: '',
    email: '',
    phone: null,
    department: '',
    role: '',
    createdAt: '',
    createdBy: null,
  };

  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.profile = data[0]; // Using first admin profile from the array
        }
      },
      error: (error) => {
        console.error('Failed to load admin profile', error);
      },
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  logout(): void {
    // Implement actual logout logic
    this.router.navigate(['/home']);
  }

  changePassword(): void {
    if (this.security.newPassword !== this.security.confirmPassword) {
      alert('New and confirm passwords do not match.');
      return;
    }
    alert('Password changed successfully.');
    // Implement actual password change logic
  }
}
