import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meta-interactive-demo',
  imports: [FormsModule],
  templateUrl: './meta-interactive-demo.html',
  styleUrl: './meta-interactive-demo.scss',
})
export class MetaInteractiveDemo {

  // Standardwerte
  title = signal('Mein cooles Profil');
  description = signal('Entdecke die besten UI Components auf Aden Library. Jetzt ansehen!');
  imageUrl = signal('https://ui.aden-library.com/assets/img/preview-default.png'); // Fake URL

  // Simulierter "Social Media" Feed
  updatePreview() {
    // Hier passiert nichts Logisches, da Angular Signals das Template automatisch updaten
  }
}
