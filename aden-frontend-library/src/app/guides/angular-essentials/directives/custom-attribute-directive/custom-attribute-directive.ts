import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-attribute-directive',
  imports: [],
  templateUrl: './custom-attribute-directive.html',
  styleUrl: './custom-attribute-directive.scss',
})
export class CustomAttributeDirective {
  selectedColor = '#FCD34D'; // Default Gelb (Tailwind Amber-300)
  isHovered = false;
  isActive = false;

  // Verfügbare Farben für die Demo
  colors = [
    { name: 'Amber', value: '#FCD34D', border: '#F59E0B' },
    { name: 'Sky', value: '#7DD3FC', border: '#0EA5E9' },
    { name: 'Rose', value: '#FDA4AF', border: '#F43F5E' },
    { name: 'Emerald', value: '#6EE7B7', border: '#10B981' }
  ];

  getCurrentBorder() {
    return this.colors.find(c => c.value === this.selectedColor)?.border || 'transparent';
  }

  // Simulation der HostListener Events
  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
    this.isActive = false; // Reset click state
  }

  onClick() {
    this.isActive = !this.isActive;
  }
}
