import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  activeTab: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set active tab on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeTab = this.getTabFromRoute(event.urlAfterRedirects);
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(route: string): void {
    this.activeTab = this.getTabFromRoute(route);
    this.menuOpen = false;
    this.router.navigate([route]);
  }

  logout(): void {
    // TODO: Implement your logout logic here (e.g., clear tokens/session)
    console.log('User logged out');
    this.menuOpen = false;
    this.router.navigate(['/home']);
  }

  private getTabFromRoute(route: string): string {
    if (route.includes('passport-renewal')) return 'passport-renewal';
    if (route.includes('tax-filing')) return 'tax-filing';
    if (route.includes('legal-inquiry')) return 'legal-inquiry';
    if (route.includes('ai-assistant')) return 'ai-assistant';
    if (route.includes('my-requests')) return 'my-requests';
    return '';
  }

  imagePath: string = 'assets/images/spektra-removebg-preview.png';
}
