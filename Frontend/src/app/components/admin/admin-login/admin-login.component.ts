import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.loginError = 'Both fields are required';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.loginError = 'Invalid email format';
      return;
    }

    if (this.password.length < 6 || this.password.length > 200) {
      this.loginError = 'Password must be between 6 and 200 characters';
      return;
    }

    this.authService.adminLogin(this.email, this.password).subscribe({
      next: (response) => {
        if (response.status === 200 && response.body) {
          localStorage.setItem('token', response.body);
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.loginError = 'Invalid login response';
        }
      },
      error: (error) => {
        this.loginError =
          error.status === 401
            ? 'Invalid credentials'
            : 'Login failed. Please try again later.';
      },
    });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
