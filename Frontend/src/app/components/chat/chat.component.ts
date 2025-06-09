import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  userInput: string = '';
  chatHistory: { user: string; bot: string }[] = [];
  userPrompts: string[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  sendMessage() {
    const prompt = this.userInput.trim();
    if (!prompt || prompt.toLowerCase() === 'exit123') return;

    this.userPrompts.push(prompt);
    this.chatHistory.push({ user: prompt, bot: '...' }); // changed `gemini` to `bot`
    this.userInput = '';
    this.isLoading = true;
    this.errorMessage = null;

    this.http
      .post<{ reply: string }>('https://chatbot-z6p4.onrender.com/chat', {
        prompt,
      })
      .subscribe({
        next: (res) => {
          this.chatHistory[this.chatHistory.length - 1].bot = res.reply;
        },
        error: (err) => {
          this.chatHistory[this.chatHistory.length - 1].bot = 'Error occurred!';
          this.errorMessage = err.message || 'Unknown error';
        },
        complete: () => (this.isLoading = false),
      });
  }

  clearChat() {
    this.chatHistory = [];
    this.userPrompts = [];
    this.errorMessage = null;
  }
  goBack(): void {
    window.history.back();
  }
}
