import { Component } from '@angular/core';
import { Notice } from "../../../shared/ui/notice/notice";
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { InterceptorInteractiveDemo } from "./interceptor-interactive-demo/interceptor-interactive-demo";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";

@Component({
  selector: 'app-interceptors',
  imports: [Notice, HeadlineGuides, InterceptorInteractiveDemo, CodeBlockGuide],
  templateUrl: './interceptors.html',
  styleUrl: './interceptors.scss',
})
export class Interceptors {

  // 1. The Logic
  authInterceptorCode = `import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // 1. Get the token (e.g. from AuthService or LocalStorage)
  const token = 'my-secret-jwt-token';

  // 2. Clone and Modify
  // IMPORTANT: Requests in Angular are immutable!
  // You cannot do 'req.headers.set(...)'. You MUST create a clone.
  const authReq = req.clone({
    setHeaders: {
      Authorization: \`Bearer \${token}\`
    }
  });

  // 3. Forward the request
  // 'next' passes the modified request to the next interceptor
  // or finally to the backend.
  return next(authReq);
};`;

  // 2. Registration
  interceptorRegistrationCode = `// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      // The order matters! They are executed in sequence.
      withInterceptors([
        authInterceptor,
        // loggingInterceptor,
        // errorInterceptor
      ])
    )
  ]
};`;

}
