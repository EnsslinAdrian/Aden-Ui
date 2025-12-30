import { Component, signal } from '@angular/core';

interface CommitNode {
  id: string;
  msg: string;
  branch: 'main' | 'feature';
  parentId: string | null;
}

@Component({
  selector: 'app-git-visualizer',
  imports: [],
  templateUrl: './git-visualizer.html',
  styleUrl: './git-visualizer.scss',
})
export class GitVisualizer {
  // State
  commits = signal<CommitNode[]>([
    { id: 'c1', msg: 'init', branch: 'main', parentId: null }
  ]);

  currentBranch = signal<'main' | 'feature'>('main');
  featureActive = signal(false);

  // Actions
  addCommit() {
    const prev = this.commits()[0]; // Neuster Commit ist oben (oder unten, je nach Ansicht)
    const newId = 'c' + (this.commits().length + 1);

    const newNode: CommitNode = {
      id: newId,
      msg: this.currentBranch() === 'main' ? 'fix' : 'feat',
      branch: this.currentBranch(),
      parentId: prev.id
    };

    // Nach vorne pushen
    this.commits.update(list => [newNode, ...list]);
  }

  createBranch() {
    if (this.featureActive()) return;
    this.featureActive.set(true);
    this.currentBranch.set('feature');
    this.addCommit(); // Erster Commit auf neuem Branch
  }

  checkoutMain() {
    this.currentBranch.set('main');
  }

  checkoutFeature() {
    if (!this.featureActive()) return;
    this.currentBranch.set('feature');
  }

  merge() {
    if (this.currentBranch() !== 'main' || !this.featureActive()) return;

    const newId = 'c' + (this.commits().length + 1);
    const newNode: CommitNode = {
      id: newId,
      msg: 'merge',
      branch: 'main',
      parentId: this.commits()[0].id
    };

    this.commits.update(list => [newNode, ...list]);
    this.featureActive.set(false); // Feature "gelöscht" nach Merge (visuell vereinfacht)
  }

  reset() {
    this.commits.set([{ id: 'c1', msg: 'init', branch: 'main', parentId: null }]);
    this.currentBranch.set('main');
    this.featureActive.set(false);
  }
}
