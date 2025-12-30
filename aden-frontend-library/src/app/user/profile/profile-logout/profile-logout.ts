import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../../service/auth/authentication/authentication';
import { ToastService } from '../../../../service/feedbacks/toast/toast';
import { RandomMessage } from '../../../../service/feedbacks/randomMessage/random-message';

@Component({
  selector: 'app-profile-logout',
  imports: [],
  templateUrl: './profile-logout.html',
  styleUrl: './profile-logout.scss',
})
export class ProfileLogout {
  protected authService = inject(AuthenticationService);
  protected toastService = inject(ToastService);
  protected randomMessage = inject(RandomMessage);

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        const msg = this.randomMessage.getGoodbyeMessage();
        this.toastService.showSuccess(msg);
      },
      error: (err) => alert('Fehler beim Logout: ' + err)
    });
  }
}
