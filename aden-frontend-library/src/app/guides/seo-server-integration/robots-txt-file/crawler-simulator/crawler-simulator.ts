import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crawler-simulator',
  imports: [FormsModule],
  templateUrl: './crawler-simulator.html',
  styleUrl: './crawler-simulator.scss',
})
export class CrawlerSimulator {
    // Der Inhalt der virtuellen robots.txt (editierbar)
  fileContent = `User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /tmp/

User-agent: Googlebot
Allow: /admin/public-report
Disallow: /nocrawl/`;

  // Simulation State
  testPath = '/admin/dashboard';
  selectedBot = '*'; // '*' steht für "Jeder Bot"

  simulationResult: { allowed: boolean; reason: string } | null = null;

  // Diese Funktion parst den Text und prüft die Berechtigung
  runTest() {
    const lines = this.fileContent.split('\n');
    let currentAgent = '';
    let isDisallowed = false;
    let matchFound = false;

    // Wir suchen nach Regeln für den ausgewählten Bot ODER für '*'
    // Hinweis: Ein echter Parser ist komplexer (Specific > Wildcard),
    // hier machen wir eine vereinfachte Demo-Logik.

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      if (trimmed.toLowerCase().startsWith('user-agent:')) {
        currentAgent = trimmed.split(':')[1].trim();
      } else if (currentAgent === '*' || currentAgent === this.selectedBot) {

        // Regel prüfen
        if (trimmed.toLowerCase().startsWith('disallow:')) {
          const path = trimmed.split(':')[1].trim();
          if (path && this.testPath.startsWith(path)) {
            isDisallowed = true;
            matchFound = true;
          }
        }

        if (trimmed.toLowerCase().startsWith('allow:')) {
          const path = trimmed.split(':')[1].trim();
          if (path && this.testPath.startsWith(path)) {
            isDisallowed = false; // Allow überschreibt Disallow (vereinfacht)
            matchFound = true;
          }
        }
      }
    }

    this.simulationResult = {
      allowed: !isDisallowed,
      reason: isDisallowed
        ? `Blocked by rule in User-agent: ${currentAgent}`
        : 'Allowed (No blocking rule found)'
    };
  }
}
