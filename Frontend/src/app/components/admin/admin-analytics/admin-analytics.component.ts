import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AnalyticsService } from '../../../services/analytics.service';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css'],
  imports: [CommonModule, FormsModule, AdminNavbarComponent, NgChartsModule],
})
export class AdminAnalyticsComponent {
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
    private infoService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.infoService.getInfo().subscribe((data) => {
      this.info = data;
      console.log(this.info);

      const labels = [
        'Total Passport Requests',
        'Total tax Filing Requests',
        'Total Legal Inquiry Requests',
      ];

      const values = [
        this.info.passport_Renewals,
        this.info.tax_Filings,
        this.info.legal_Inquiries,
      ];
      console.log(values);

      this.categorySummary = labels.map((label, i) => ({
        label,
        count: values[i],
      }));

      // Immutable assignment for bar chart data to trigger Angular change detection
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

      // Immutable assignment for pie chart data to trigger Angular change detection
      this.pieChartData = {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: ['#007bff', '#dc3545', '#6610f2'],
          },
        ],
      };

      // Trigger Angular change detection explicitly
      this.cdr.detectChanges();
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }

  logout(): void {
    localStorage.removeItem('admin_token');
    this.router.navigate(['/home']);
  }
}
