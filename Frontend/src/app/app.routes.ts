import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

import { PassportServicesComponent } from './components/user/passport-services/passport-services.component';
import { TaxFilingComponent } from './components/user/tax-filing/tax-filing.component';
import { LegalSupportComponent } from './components/user/legal-support/legal-support.component';
import { AiAssistantComponent } from './components/user/ai-assistant/ai-assistant.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminServicesComponent } from './components/admin/admin-services/admin-services.component';
import { AdminRequestsComponent } from './components/admin/admin-requests/admin-requests.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdminAnalyticsComponent } from './components/admin/admin-analytics/admin-analytics.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserRequestsComponent } from './components/user/user-requests/user-requests.component';
import { RegisterComponent } from './components/register/register.component';
import { UserReportsComponent } from './components/user/user-reports/user-reports.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'user-login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'home', component: HomeComponent },

  { path: 'passport-renewal', component: PassportServicesComponent },
  { path: 'tax-filing', component: TaxFilingComponent },
  { path: 'legal-inquiry', component: LegalSupportComponent },
  { path: 'ai-assistant', component: AiAssistantComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-services', component: AdminServicesComponent },
  { path: 'admin-requests', component: AdminRequestsComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'admin-analytics', component: AdminAnalyticsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-requests', component: UserRequestsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-reports', component: UserReportsComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
  {
    path: 'chat',
    component: ChatComponent,
  }
];
