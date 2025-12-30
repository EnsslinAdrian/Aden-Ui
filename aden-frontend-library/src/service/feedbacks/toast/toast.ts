import { Injectable, signal } from '@angular/core';

export interface ToastItem {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<ToastItem[]>([]);

  showSuccess(msg: string) {
    this.add(msg, 'success');
  }

  showError(msg: string) {
    this.add(msg, 'error');
  }

  public add(message: string, type: 'success' | 'error' | 'info') {
    const id = Date.now();
    this.toasts.update(current => [...current, { message, type, id }]);
  }

  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
