import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interactive-server',
  imports: [FormsModule],
  templateUrl: './interactive-server.html',
  styleUrl: './interactive-server.scss',
})
export class InteractiveServer {
  configEnabled = false;
  currentPath = '/dashboard/settings';

  // Server Response State
  responseStatus: number | null = null;
  responseFile: string = '';
  serverLog: string[] = [];

  toggleConfig() {
    this.configEnabled = !this.configEnabled;
    this.resetSimulation();
  }

  resetSimulation() {
    this.responseStatus = null;
    this.serverLog = [];
  }

  simulateRequest() {
    this.serverLog = [];
    this.serverLog.push(`Incoming Request: GET ${this.currentPath}`);

    // Simulation delay
    setTimeout(() => {
      // 1. Check if file exists physically
      this.serverLog.push(`Checking file system for "${this.currentPath}"...`);

      if (this.currentPath === '/' || this.currentPath === '/index.html' || this.currentPath.includes('.')) {
        // Simuliert: Datei existiert (z.B. ein Bild oder index.html)
        this.finishRequest(200, this.currentPath === '/' ? '/index.html' : this.currentPath);
      } else {
        // Simuliert: Datei existiert nicht (virtuelle Route)
        this.serverLog.push(`File not found.`);

        if (this.configEnabled) {
          // MIT .htaccess -> Rewrite Rule greift
          this.serverLog.push(`RewriteRule detected! Redirecting to /index.html`);
          this.finishRequest(200, '/index.html (Angular App loaded)');
        } else {
          // OHNE .htaccess -> 404
          this.finishRequest(404, 'Error Document');
        }
      }
    }, 600);
  }

  finishRequest(status: number, file: string) {
    this.responseStatus = status;
    this.responseFile = file;
  }
}
