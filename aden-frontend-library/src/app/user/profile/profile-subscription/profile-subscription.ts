import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserProfileService } from '../../../../service/user/userProfile/user-profile';

@Component({
  selector: 'app-profile-subscription',
  imports: [],
  templateUrl: './profile-subscription.html',
  styleUrl: './profile-subscription.scss',
})
export class ProfileSubscription {
  protected userService = inject(UserProfileService);
  @Output() openUpgrade = new EventEmitter<void>();

  @Input() user: any;

  manageSubscription() {
    // Wenn wir den Link vom Webhook bekommen haben, nutzen wir ihn
    if (this.user.lemon_order_portal_url) {
      window.open(this.user.lemon_order_portal_url, '_blank');
    } else {
      const portalUrl = 'https://aden-ui.lemonsqueezy.com/billing';
      window.open(portalUrl, '_blank');
    }
  }



}
