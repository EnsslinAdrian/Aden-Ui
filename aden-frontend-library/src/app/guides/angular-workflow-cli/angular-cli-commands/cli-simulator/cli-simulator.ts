import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cli-simulator',
  imports: [],
  templateUrl: './cli-simulator.html',
  styleUrl: './cli-simulator.scss',
})
export class CliSimulator {
  logs = signal<string[]>([
    'user@aden-ui:~/project$ _'
  ]);

  isTyping = signal(false);

  runCommand(cmd: string, type: 'component' | 'service' | 'build') {
    if (this.isTyping()) return;
    this.isTyping.set(true);

    // 1. Command anzeigen
    this.logs.update(l => {
      const newLogs = [...l];
      newLogs[newLogs.length - 1] = `user@aden-ui:~/project$ ${cmd}`;
      return newLogs;
    });

    // 2. Output simulieren
    setTimeout(() => {
      let output: string[] = [];

      if (type === 'component') {
        output = [
          'CREATE src/app/user/user.component.html (23 bytes)',
          'CREATE src/app/user/user.component.spec.ts (612 bytes)',
          'CREATE src/app/user/user.component.ts (284 bytes)',
          'CREATE src/app/user/user.component.scss (0 bytes)',
          'UPDATE src/app/app.routes.ts (1024 bytes)'
        ];
      } else if (type === 'service') {
        output = [
          'CREATE src/app/services/auth.service.spec.ts (360 bytes)',
          'CREATE src/app/services/auth.service.ts (136 bytes)'
        ];
      } else if (type === 'build') {
        output = [
          'Building...',
          '✔ Browser application bundle generation complete.',
          '✔ Copying assets complete.',
          '✔ Index html generation complete.',
          '',
          'Initial Chunk Files | Names         |  Raw Size',
          'main.js             | main          | 240.45 kB',
          'styles.css          | styles        |  45.20 kB'
        ];
      }

      // Add output to logs
      this.logs.update(l => [...l, ...output, 'user@aden-ui:~/project$ _']);
      this.isTyping.set(false);
    }, 600);
  }

  clear() {
    this.logs.set(['user@aden-ui:~/project$ _']);
  }
}
