// google-auth.service.ts
import { Injectable, inject } from '@angular/core';
import { UrlsService } from '../../global/urls/urls.service';

declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  // private urls = inject(UrlsService);

  // initializeGoogle(callback: (response: any) => void) {
  //   if (typeof google === 'undefined') {
  //     console.error('Google script not loaded');
  //     return;
  //   }
  //   google.accounts.id.initialize({
  //     client_id: this.urls.googleClientId,
  //     callback: callback,
  //     auto_select: false,
  //   });
  // }

  // renderButton(elementId: string) {
  //   const el = document.getElementById(elementId);
  //   if (el && typeof google !== 'undefined') {
  //     google.accounts.id.renderButton(el, { theme: 'filled_black', size: 'large', width: "320" });
  //   }
  // }

  // prompt(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     google.accounts.id.prompt((notification: any) => {
  //       if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
  //         reject('Google prompt skipped');
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // }
}
