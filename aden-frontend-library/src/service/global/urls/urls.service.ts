import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  baseUrl = environment.apiUrl;

  // Auth Urls
  registerUrl = this.baseUrl + 'auth/register/';
  verifyEmailUrl = this.baseUrl + 'auth/verify-email/';
  resendVerificationUrl = this.baseUrl + 'auth/resend-verification-email/';

  loginUrl = this.baseUrl + 'auth/login/';
  statusUrl = this.baseUrl + 'auth/status/';
  refreshUrl = this.baseUrl + 'auth/refresh/';

  googleLoginUrl = this.baseUrl + 'auth/social/google/';
  googleClientId = '76677653029-5ig8cmvbk34m92ueuq6ndm731139lnfb.apps.googleusercontent.com';

  passwordResetUrl = this.baseUrl + 'auth/password-reset/';
  passwordConfirmUrl = this.baseUrl + 'auth/password-confirm/';

  deleteAccountUrl = this.baseUrl + 'auth/delete-account/';
  reAuthenticateUrl = this.baseUrl + 'auth/re-authenticate/';
  reAuthenticateGoogleUrl = this.baseUrl + 'auth/re-authenticate/google/';
  logoutUrl = this.baseUrl + 'auth/logout/';
  changeEmailUrl = this.baseUrl + 'auth/change-email/';
  userProfileUrl = this.baseUrl + 'auth/user-profile/';
  upgradeAccountUrl = this.baseUrl + 'auth/upgrade-account/';


  useractionUrl = this.baseUrl + 'user-actions/';
  membersUrl = this.baseUrl + 'auth/members/';

  // Component Urls
  componentsCodeUrl = this.baseUrl + 'component-code/';
  componentsMetaUrl = this.baseUrl + 'meta-components/';
}
