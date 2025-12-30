import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserProfileService } from '../../../service/user/userProfile/user-profile';

@Component({
  selector: 'app-upgrade-dialog',
  imports: [],
  templateUrl: './upgrade-dialog.html',
  styleUrl: './upgrade-dialog.scss',
})
export class UpgradeDialog {
  private userService = inject(UserProfileService);

  @Output() close = new EventEmitter<void>();
  private focusListener: (() => void) | null = null;

  features = [
    'Access to all 50+ Components',
    'Advanced Architecture Guides (Clean Arch, SSR)',
    'SEO & Performance Optimization Module',
    'Download Electron Desktop App',
    'Private Discord Community Access',
    'Lifetime Updates & Support'
  ];

  // onCheckout() {
  //   // Hier leitest du zu deinem LemonSqueezy Checkout Link weiter
  //   window.open('https://store.lemonsqueezy.com/checkout/buy/...', '_blank');
  // }

  private readonly BASE_CHECKOUT_URL = 'https://adenui.lemonsqueezy.com/checkout/buy/36e69bf2-8c96-4fc5-8ded-4e6709426bd2';

  buyLifetime() {
    const user = this.userService.profile();
    if (!user) return;

    const checkoutUrl = `${this.BASE_CHECKOUT_URL}?checkout[custom][user_id]=${user.id}&checkout[email]=${user.email}`;

    // 1. Tab öffnen
    window.open(checkoutUrl, '_blank');

    // 2. Den "Welcome Back" Listener starten
    this.startListeningForReturn();
  }

  private startListeningForReturn() {
    // Falls schon einer läuft, erst killen
    this.removeListener();

    this.focusListener = () => {
      console.log('User ist zurück auf dem Tab! Prüfe Status...');

      // Profil neu laden
      this.userService.loadProfile().subscribe((updatedUser) => {
        if (updatedUser.is_premium) {
          console.log('Juhu! User ist jetzt Premium.');

          // Aufräumen
          this.removeListener();

          // Dialog schließen (oder eine Success-Nachricht im Dialog zeigen)
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


