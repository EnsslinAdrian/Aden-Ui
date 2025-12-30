import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notice } from "../../../../shared/ui/notice/notice";

interface BundlePart {
  name: string;
  size: number; // in KB
  color: string;
  desc: string;
}

@Component({
  selector: 'app-bundle-visualizer',
  imports: [FormsModule, Notice],
  templateUrl: './bundle-visualizer.html',
  styleUrl: './bundle-visualizer.scss',
})
export class BundleVisualizer {

  // Wir nutzen Signals für modernes State Management
  isOptimized = signal(false);

  // Daten für ein "schlechtes" Bundle
  bloatedBundle: BundlePart[] = [
    { name: 'main.js (App)', size: 150, color: '#4ade80', desc: 'Your actual application code' },
    { name: 'moment.js', size: 280, color: '#ef4444', desc: 'Huge legacy date library (unused locales included)' },
    { name: '@angular/core', size: 120, color: '#dd0031', desc: 'Angular Framework Core' },
    { name: 'lodash', size: 70, color: '#f59e0b', desc: 'Utility library (full import instead of tree-shakable)' },
    { name: 'rxjs', size: 40, color: '#c026d3', desc: 'Reactive Extensions' },
    { name: 'shared-ui', size: 90, color: '#3b82f6', desc: 'Shared Component Library' },
  ];

  // Daten für ein "optimiertes" Bundle
  optimizedBundle: BundlePart[] = [
    { name: 'main.js (App)', size: 150, color: '#4ade80', desc: 'Your actual application code' },
    { name: 'date-fns', size: 30, color: '#10b981', desc: 'Modern, tree-shakable date library' },
    { name: '@angular/core', size: 120, color: '#dd0031', desc: 'Angular Framework Core' },
    // lodash entfernt, native JS methoden genutzt
    { name: 'rxjs', size: 40, color: '#c026d3', desc: 'Reactive Extensions' },
    { name: 'shared-ui', size: 90, color: '#3b82f6', desc: 'Shared Component Library' },
  ];

  // Berechnete Werte
  currentBundle = computed(() => this.isOptimized() ? this.optimizedBundle : this.bloatedBundle);

  totalSize = computed(() => {
    return this.currentBundle().reduce((acc, item) => acc + item.size, 0);
  });

  // Helper für die Breite im HTML (Prozent)
  getPercentage(size: number): number {
    return (size / this.totalSize()) * 100;
  }

  toggleOptimization() {
    this.isOptimized.update(val => !val);
  }
}
