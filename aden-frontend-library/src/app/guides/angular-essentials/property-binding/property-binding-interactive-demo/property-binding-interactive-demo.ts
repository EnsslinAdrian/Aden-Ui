import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-binding-interactive-demo',
  imports: [FormsModule, SlicePipe],
  templateUrl: './property-binding-interactive-demo.html',
  styleUrl: './property-binding-interactive-demo.scss',
})
export class PropertyBindingInteractiveDemo {
imgSources = [
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/avataaars/svg?seed=Gizmo'
  ];
  currentImgIndex = 0;

  // 2. Boolean Binding (disabled state)
  isDisabled = false;

  // 3. Style Binding
  accentColor = '#4ade80'; // Default Green

  // 4. Value Binding
  buttonLabel = 'Klick mich';

  get currentImg() {
    return this.imgSources[this.currentImgIndex];
  }

  toggleImage() {
    this.currentImgIndex = (this.currentImgIndex + 1) % this.imgSources.length;
  }

  // Hilfsmethode für die Code-Anzeige
  get disabledCode() {
    return this.isDisabled ? 'true' : 'false';
  }
}
