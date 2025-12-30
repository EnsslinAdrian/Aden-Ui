import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-http-communication-interactive-demo',
  imports: [JsonPipe],
  templateUrl: './http-communication-interactive-demo.html',
  styleUrl: './http-communication-interactive-demo.scss',
})
export class HttpCommunicationInteractiveDemo {
  users: User[] = [];
  isLoading = false;
  lastRequestType: 'GET' | 'POST' | null = null;
  statusMessage = 'Bereit für Request...';

  // Für die visuelle Darstellung des JSON Responses
  jsonResponse: any = null;

  // 1. GET Simulation
  fetchUsers() {
    this.startLoading('GET');
    this.statusMessage = 'Fetching data from /api/users...';
    this.jsonResponse = null;

    // Simuliere Netzwerk-Latenz
    setTimeout(() => {
      // Mock Daten vom "Server"
      const mockData = [
        { id: 1, name: 'Alice', role: 'Admin' },
        { id: 2, name: 'Bob', role: 'User' },
        { id: 3, name: 'Charlie', role: 'User' }
      ];

      this.users = mockData;
      this.jsonResponse = mockData; // Zeige rohes JSON
      this.finishLoading('200 OK');
    }, 1500);
  }

  // 2. POST Simulation
  addUser() {
    this.startLoading('POST');
    this.statusMessage = 'Sending data to /api/users...';
    this.jsonResponse = null;

    const newUser = { id: 4, name: 'David', role: 'Guest' };

    setTimeout(() => {
      // Füge lokal hinzu (Optimistic update simulation)
      this.users = [...this.users, newUser];

      // Der Server antwortet normalerweise mit dem erstellten Objekt
      this.jsonResponse = newUser;
      this.finishLoading('201 Created');
    }, 1500);
  }

  reset() {
    this.users = [];
    this.jsonResponse = null;
    this.statusMessage = 'Reset done.';
    this.lastRequestType = null;
  }

  private startLoading(type: 'GET' | 'POST') {
    this.isLoading = true;
    this.lastRequestType = type;
  }

  private finishLoading(msg: string) {
    this.isLoading = false;
    this.statusMessage = msg;
  }

}
