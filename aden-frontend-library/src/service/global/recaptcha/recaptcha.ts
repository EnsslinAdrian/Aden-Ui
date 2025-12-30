import { Injectable } from '@angular/core';

declare const grecaptcha: any;

@Injectable({
  providedIn: 'root',
})
export class Recaptcha {
  // private urls = inject(UrlsService);

  // Oder hardcoded lassen, wenn es nur der Site Key ist (weniger kritisch als Secret Key)
  private readonly siteKey = '6Le_4h4sAAAAAAe9vykZPi-ZKjFW_FufGyraPKPL';

  async execute(action: string): Promise<string> {
    // Sicherheitscheck: Ist das Script geladen?
    if (typeof grecaptcha === 'undefined') {
      console.error('ReCaptcha Script nicht geladen! Checke index.html');
      return Promise.resolve('');
    }

    return new Promise((resolve) => {
      grecaptcha.enterprise.ready(async () => {
        try {
          const token = await grecaptcha.enterprise.execute(
            this.siteKey,
            { action }
          );
          resolve(token);
        } catch (error) {
          console.error('ReCaptcha Error:', error);
          resolve(''); // Leeres Token zurückgeben, damit Backend den Fehler wirft
        }
      });
    });
  }
}
