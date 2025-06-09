import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { UserRequest, UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserRequestService } from '../../../services/user-request.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css'],
  imports: [AdminNavbarComponent, CommonModule, FormsModule],
})
export class AdminRequestsComponent implements OnInit {
  requests: UserRequest[] = [];
  filteredRequests: UserRequest[] = [];
  loading = true;
  error = '';

  selectedStatus: string = '';
  selectedRequestType: string = '';
  selectedUserId: string = ''; // New filter field for User ID

  constructor(
    private router: Router,
    private service: UserService,
    private userrequest: UserRequestService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  private loadRequests(): void {
    this.loading = true;
    this.error = '';
    this.service.getallrequests().subscribe({
      next: (res) => {
        this.requests = res;
        this.applyFilters(); // Apply filters after loading
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error occurred while fetching data.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  applyFilters(): void {
    this.filteredRequests = this.requests.filter((request) => {
      const statusMatch =
        !this.selectedStatus || request.status === this.selectedStatus;

      const typeMatch =
        !this.selectedRequestType ||
        request.requestType === this.selectedRequestType;

      const userIdMatch =
        !this.selectedUserId ||
        (request.userId &&
          request.userId
            .toString()
            .toLowerCase()
            .includes(this.selectedUserId.toLowerCase()));

      return statusMatch && typeMatch && userIdMatch;
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.router.navigate(['/home']);
  }

  approveRequest(request: UserRequest): void {
    this.updateRequestStatus(request, 'Approved');
  }

  rejectRequest(request: UserRequest): void {
    this.updateRequestStatus(request, 'Rejected');
  }

  private updateRequestStatus(request: UserRequest, status: string): void {
    this.userrequest
      .updateStatus(request.userRequestId!, status, request)
      .subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error(`Failed to update request status to ${status}:`, err);
          this.loadRequests();
        },
      });
  }
}
