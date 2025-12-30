import { Component } from '@angular/core';

@Component({
  selector: 'app-interceptor-interactive-demo',
  imports: [],
  templateUrl: './interceptor-interactive-demo.html',
  styleUrl: './interceptor-interactive-demo.scss',
})
export class InterceptorInteractiveDemo {
    // Demo State
  hasAuthToken = true;
  isProcessing = false;

  // Animation Steps: 0=Idle, 1=ToInterceptor, 2=ToServer, 3=BackToClient
  animationStep = 0;

  // Logs für die "Konsole"
  logs: string[] = [];

  toggleToken() {
    this.hasAuthToken = !this.hasAuthToken;
  }

  startRequest() {
    if (this.isProcessing) return;

    this.isProcessing = true;
    this.animationStep = 0;
    this.logs = ['> Request gestartet...'];

    // Schritt 1: Zur Middleware (Interceptor)
    setTimeout(() => {
      this.animationStep = 1;
      this.addLog('Interceptor erreicht.');

      // Simulation der Interceptor Logik
      setTimeout(() => {
        if (this.hasAuthToken) {
          this.addLog('✅ Interceptor: Authorization Header hinzugefügt!');
        } else {
          this.addLog('⚠️ Interceptor: Kein Token gefunden. Sende ohne Header.');
        }

        // Schritt 2: Zum Server
        this.animationStep = 2;

        // Simulation Server Verarbeitung
        setTimeout(() => {
          this.addLog('Server: Verarbeite Anfrage...');

          if (this.hasAuthToken) {
            this.addLog('✅ Server: Token gültig. Daten werden gesendet (200 OK).');
            this.finishRequest(true);
          } else {
            this.addLog('🚫 Server: Unauthorized (401). Zugriff verweigert.');
            this.finishRequest(false);
          }
        }, 1500);

      }, 1000);
    }, 500);
  }

  finishRequest(success: boolean) {
    // Schritt 3: Zurück zum Client
    this.animationStep = 3;
    setTimeout(() => {
      this.animationStep = 0;
      this.isProcessing = false;
      this.addLog(success ? '> Daten erfolgreich empfangen!' : '> Fehler: Request fehlgeschlagen.');
    }, 1000);
  }

  private addLog(msg: string) {
    this.logs.push(msg);
  }
}
