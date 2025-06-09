import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatComponent } from '../../chat/chat.component';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, NavbarComponent,ChatComponent],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css'],
})
export class AiAssistantComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  openAIChat() {
    console.log('AI Chat opened');
    // Insert AI assistant logic here
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/home']);
  }
}
