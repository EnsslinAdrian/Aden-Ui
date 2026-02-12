import { Component, signal } from '@angular/core';

interface CommitNode {
  id: string;
  msg: string;
  branch: 'main' | 'feature';
}

@Component({
  selector: 'app-branches-merging-live-demo',
  imports: [],
  templateUrl: './branches-merging-live-demo.html',
  styleUrl: './branches-merging-live-demo.scss',
})
export class BranchesMergingLiveDemo {
  commits = signal<CommitNode[]>([
    { id: 'c1', msg: 'initial commit', branch: 'main' }
  ]);

  currentBranch = signal<'main' | 'feature'>('main');
  featureActive = signal(false);

  addCommit() {
    const newId = 'c' + (this.commits().length + 1);
    const newNode: CommitNode = {
      id: newId,
      msg: this.currentBranch() === 'main' ? 'fix: update core' : 'feat: add UI',
      branch: this.currentBranch()
    };
    // Add new commit at the top for vertical timeline (top = new)
    this.commits.update(list => [newNode, ...list]);
  }

  createBranch() {
    if (this.featureActive()) return;
    this.featureActive.set(true);
    this.currentBranch.set('feature');
    this.addCommit(); // Directly add a start commit on the new branch
  }

  checkoutMain() { this.currentBranch.set('main'); }

  checkoutFeature() {
    if (this.featureActive()) this.currentBranch.set('feature');
  }

  merge() {
    if (this.currentBranch() !== 'main' || !this.featureActive()) return;
    const newId = 'm' + (this.commits().length + 1);
    const newNode: CommitNode = {
      id: newId,
      msg: 'merge: feature into main',
      branch: 'main'
    };
    this.commits.update(list => [newNode, ...list]);
    this.featureActive.set(false);
    this.currentBranch.set('main');
  }

  reset() {
    this.commits.set([{ id: 'c1', msg: 'initial commit', branch: 'main' }]);
    this.currentBranch.set('main');
    this.featureActive.set(false);
  }
}
