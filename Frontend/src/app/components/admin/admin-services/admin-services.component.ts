import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

interface Service {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css'],
  imports:[CommonModule,AdminNavbarComponent]
})
export class AdminServicesComponent implements OnInit {
  services: Service[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Sample data — replace with API call
    this.services = [
      {
        id: 'S001',
        name: 'Passport Renewal',
        description: 'Facilitate renewal of expired passports',
        status: 'Active',
      },
      {
        id: 'S002',
        name: 'Visa Application',
        description: 'Support for international visa processing',
        status: 'Inactive',
      },
    ];
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout(): void {
    // Implement session clear if necessary
    this.router.navigate(['/home']);
  }

  editService(service: Service): void {
    console.log('Edit service:', service);
    // Route or modal logic here
  }

  deleteService(serviceId: string): void {
    console.log('Delete service with ID:', serviceId);
    this.services = this.services.filter((s) => s.id !== serviceId);
  }
}
