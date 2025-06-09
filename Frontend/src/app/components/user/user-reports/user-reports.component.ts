import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AnalyticsService } from '../../../services/analytics.service';
import { ChartConfiguration } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reports',
  imports: [NavbarComponent, FormsModule, NgChartsModule, CommonModule],
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css'],
})
export class UserReportsComponent {
  info: any = {};
  categorySummary: any[] = [];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Counts',
        data: [],
        backgroundColor: '#0d6efd',
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#007bff', '#dc3545', '#6610f2'],
      },
    ],
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.chart.data.datasets[0];
            const total = dataset.data.reduce(
              (acc: any, val: any) => acc + val,
              0
            );
            const current = dataset.data[tooltipItem.dataIndex] as number;
            const percentage = ((current / total) * 100).toFixed(1);
            const label = tooltipItem.label || '';
            return `${label}: ${current} (${percentage}%)`;
          },
        },
      },
    },
  };

  constructor(
    private router: Router,
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const payload = this.parseJwt(token);
    const userId = payload?.UserId;

    if (!userId) {
      console.error('User ID is not set.');
      return;
    }

    this.analyticsService.getInfoByUserId(userId).subscribe({
      next: (data: any) => {
        this.info = data;

        const labels = [
          'Total Passport Requests',
          'Total Tax Filing Requests',
          'Total Legal Inquiry Requests',
        ];

        const values = [
          this.info.passport_Renewals || 0,
          this.info.tax_Filings || 0,
          this.info.legal_Inquiries || 0,
        ];

        this.categorySummary = labels.map((label, i) => ({
          label,
          count: values[i],
        }));

        this.barChartData = {
          labels,
          datasets: [
            {
              label: 'Counts',
              data: values,
              backgroundColor: '#0d6efd',
            },
          ],
        };

        this.pieChartData = {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ['#007bff', '#dc3545', '#6610f2'],
            },
          ],
        };

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to fetch user analytics', err);
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
    this.router.navigate(['/home']);
  }
}
