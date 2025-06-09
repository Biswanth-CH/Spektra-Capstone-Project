import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Userprofile } from '../../interfaces/userprofile';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userProfile: Userprofile = {
    userId: 0,
    profilePic: '',
    fullName: '',
    email: '',
    phone: 0,
    password: '',
    createdAt: new Date(),
    createdBy: 1,
  };

  registerError: string | null = null;

  constructor(private router: Router, private users: UserService) {}

  onRegister(): void {
    const { profilePic, fullName, email, phone, password } = this.userProfile;

    if (!profilePic || !fullName || !email || !phone || !password) {
      this.registerError = 'All fields are required.';
      return;
    }

    if (!this.validateName(fullName)) {
      this.registerError = 'Full name must not contain numbers.';
      return;
    }

    if (!this.validateEmail(email)) {
      this.registerError = 'Invalid email format.';
      return;
    }

    if (!/^\d{10}$/.test(phone.toString())) {
      this.registerError = 'Phone number must be 10 digits.';
      return;
    }

    this.registerError = null;

    this.users.register(this.userProfile).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.registerError = 'Successfully Registered.';
        this.router.navigate(["/home"]);
      },
    });
  }

  validateName(name: string): boolean {
    return !/\d/.test(name);
  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
