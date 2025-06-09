import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Adjust as required

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
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

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.status === 200 && response.body) {
          localStorage.setItem('token', response.body);
          this.router.navigate(['/user-dashboard']);
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

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
