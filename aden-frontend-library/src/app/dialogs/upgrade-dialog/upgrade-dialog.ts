import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserProfileService } from '../../../service/user/userProfile/user-profile';
import { Typografie } from "../../shared/text/typografie/typografie";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upgrade-dialog',
  imports: [Typografie],
  templateUrl: './upgrade-dialog.html',
  styleUrl: './upgrade-dialog.scss',
})
export class UpgradeDialog {
  private userService = inject(UserProfileService);
  @Output() close = new EventEmitter<void>();
  private focusListener: (() => void) | null = null;

  features = [
    'Unlimited Access to Premium Components',
    'Access to Premium Architecture Guides',
    'Exclusive Desktop App (Beta Access)'
  ];

  price = '149,90';

  // onCheckout() {
  //   // Hier leitest du zu deinem LemonSqueezy Checkout Link weiter
  //   window.open('https://store.lemonsqueezy.com/checkout/buy/...', '_blank');
  // }

  private readonly BASE_CHECKOUT_URL = environment.lemonSqueezyCheckoutUrl;

  buyLifetime() {
    const user = this.userService.profile();
    if (!user) return;

    const checkoutUrl = `${this.BASE_CHECKOUT_URL}?checkout[custom][user_id]=${user.id}&checkout[email]=${user.email}`;
    window.open(checkoutUrl, '_blank');
    this.startListeningForReturn();
  }

  private startListeningForReturn() {
    this.removeListener();

    this.focusListener = () => {
      console.log('User ist zurück auf dem Tab! Prüfe Status...');

      this.userService.loadProfile().subscribe((updatedUser) => {
        if (updatedUser.is_premium) {
          console.log('Juhu! User ist jetzt Premium.');

          this.removeListener();
          this.onClose();

          // Optional: Hier könntest du noch Konfetti zünden 🎉
        }
      });
    };

    // Event registrieren
    window.addEventListener('focus', this.focusListener);
  }

  private removeListener() {
    if (this.focusListener) {
      window.removeEventListener('focus', this.focusListener);
      this.focusListener = null;
    }
  }

  onClose() {
    this.removeListener(); // Wichtig: Listener aufräumen, wenn Dialog zugeht
    this.close.emit();
  }

  ngOnDestroy() {
    this.removeListener(); // Sicherheitshalber beim Zerstören der Component
  }
}


