import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserRequestService } from '../../../services/user-request.service';
import { Userrequest } from '../../../interfaces/userrequest';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-requests',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css'],
})
export class UserRequestsComponent {
  users: Userrequest[] = [];
  filteredRequests: Userrequest[] = [];

  selectedStatus: string = '';
  selectedRequestType: string = '';

  loading = true;
  error = '';
  requests: any = {
    userId: 0,
    requestType: '',
    relatedRecordId: 0,
    status: '',
    createdBy: 0,
  };

  constructor(
    private router: Router,
    private service: UserService,
    private service2: UserRequestService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const payload = this.parseJwt(token);
    const userId = payload?.UserId;

    if (!userId) {
      this.error = 'User ID not found in token.';
      this.loading = false;
      return;
    }

    this.service2.getUserRequestById(userId).subscribe({
      next: (res) => {
        this.requests = res;
        this.users = res;
        this.filteredRequests = res; // initialize filteredRequests with all requests
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error occurred while fetching data.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  applyFilters(): void {
    this.filteredRequests = this.users.filter((request) => {
      const statusMatches =
        !this.selectedStatus || request.status === this.selectedStatus;
      const typeMatches =
        !this.selectedRequestType ||
        request.requestType === this.selectedRequestType;
      return statusMatches && typeMatches;
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
    this.router.navigate(['/home']);
  }
}
