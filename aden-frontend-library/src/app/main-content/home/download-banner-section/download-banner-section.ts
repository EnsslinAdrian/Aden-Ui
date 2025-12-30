import { Component, inject } from '@angular/core';
import { Typografie } from "../../../shared/text/typografie/typografie";;
import { Router } from '@angular/router';
import { Auth } from '../../../../service/auth/auth';
import { UserProfileService } from '../../../../service/user/userProfile/user-profile';
import { ProBadge } from "../../../shared/user-ui/pro-badge/pro-badge";

@Component({
  selector: 'app-download-banner-section',
  imports: [Typografie, ProBadge],
  templateUrl: './download-banner-section.html',
  styleUrl: './download-banner-section.scss',
})
export class DownloadBannerSection {
private router = inject(Router);
  public auth = inject(Auth);
  public profile = inject(UserProfileService);

  handleAction() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/profile']);
      return;
    }

    if (!this.profile.isPremiumUser()) {
      this.router.navigate(['/lgogin']);
      return;
    }

    this.router.navigate(['/profile']);
  }

}

