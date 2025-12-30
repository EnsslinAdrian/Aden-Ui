// backend-status.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackendStatusService {
  // Signal für reaktiven State
  private isAvailable = signal<boolean>(true);

  // Read-only Signal für die Außenwelt
  readonly backendStatus$ = this.isAvailable.asReadonly();

  setBackendAvailable(): void {
    this.isAvailable.set(true);
  }

  setBackendUnavailable(): void {
    this.isAvailable.set(false);
  }

  get isBackendAvailable(): boolean {
    return this.isAvailable();
  }
}
