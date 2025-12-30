import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../service/feedbacks/toast/toast';
import { ToastMessage } from './toast-message'; // Importiere deine Child Component

@Component({
  selector: 'app-toasts-container', // Neuer Selector
  standalone: true,
  imports: [ToastMessage],
  template: `
    <div class="toast-container">
      @for (item of toastService.toasts(); track item.id) {
        <app-toast-message [toast]="item"></app-toast-message>
      }
    </div>
  `,
  styles: [`
.toast-container {
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
  overflow: visible;
}
  `]
})
export class AppToastsContainer {
  toastService = inject(ToastService);
}
