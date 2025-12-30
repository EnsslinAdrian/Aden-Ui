import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Recaptcha } from '../global/recaptcha/recaptcha';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn = signal(false);
  recaptcha = inject(Recaptcha);
  http = inject(HttpClient);

  // Simulation: Loggt den User ein/aus
  login() {
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
  }

  // Perfekt für Dev-Tests: Einfach umschalten
  toggleLogin() {
    this.isLoggedIn.update(value => !value);
    console.log('User Status:', this.isLoggedIn() ? 'Premium / Logged In' : 'Guest / Logged Out');
  }

 async register(data: any) {
    // 1. reCAPTCHA Token holen
    const token = await this.recaptcha.execute('REGISTER');

    // 2. Request ans Backend schicken
    return this.http.post('/api/auth/register/', {
      ...data,
      captcha: token
    }).toPromise();
  }

}

