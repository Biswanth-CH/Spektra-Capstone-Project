import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToUserLogin(): void {
    this.router.navigate(['/user-login']);
  }

  navigateToAdminLogin(): void {
    this.router.navigate(['/admin-login']);
  }
}
