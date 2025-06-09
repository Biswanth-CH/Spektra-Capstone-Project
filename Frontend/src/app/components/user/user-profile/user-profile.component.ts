import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService, UserWithRequests } from '../../../services/user.service';



@Component({
  selector: 'app-user-profile',
  imports: [FormsModule, RouterModule, NavbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  profile: any = {
    userid: null,
    profilePic: '',
    fullName: '',
    email: '',
    phone: null,
    createdAt: '',
    createdBy: null,
  };

  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const payload = this.parseJwt(token);
    const userId = payload?.UserId;
    console.log(userId);
    this.userService.getAllUsersWithRequests().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.profile = data[userId-1]; // Using first admin profile from the array
          // console.log(this.profile);
        }
      },
      error: (error) => {
        console.error('Failed to load admin profile', error);
      },
    });
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

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  logout(): void {
    // Implement actual logout logic
    this.router.navigate(['/home']);
  }

}