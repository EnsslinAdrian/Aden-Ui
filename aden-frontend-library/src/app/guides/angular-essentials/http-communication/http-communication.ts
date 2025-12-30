import { Component } from '@angular/core';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { Notice } from "../../../shared/ui/notice/notice";
import { JsonPipe } from '@angular/common';
import { HttpCommunicationInteractiveDemo } from "./http-communication-interactive-demo/http-communication-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Typografie } from "../../../shared/text/typografie/typografie";


@Component({
  selector: 'app-http-communication',
  imports: [HeadlineGuides, Notice, HttpCommunicationInteractiveDemo, CodeBlockGuide],
  templateUrl: './http-communication.html',
  styleUrl: './http-communication.scss',
})
export class HttpCommunication {

  // 1. Setup Code (Updated for SSR/Fetch)
  httpSetupCode = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
       // 1. Performance: Uses native Fetch API (Important for SSR!)
       withFetch(),

       // 2. Security: Automatically attach auth token
       withInterceptors([authInterceptor])
    )
  ]
};`;

  // 2. Service Code (Complete Example)
  userServiceCode = `import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Best Practice: Define an interface
export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.my-backend.com';

  getUsers() {
    // Generics <User[]> ensure autocomplete throughout the project
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  getUserById(id: number) {
    return this.http.get<User>(this.apiUrl + '/users/' + id);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiUrl + '/users', user);
  }
}`;

}
