import { Component, signal } from '@angular/core';
import { Typografie } from "../../../../shared/text/typografie/typografie";

interface GitCommit {
  id: string;
  msg: string;
  time: string;
}

@Component({
  selector: 'app-github-basics-live-demo',
  imports: [Typografie],
  templateUrl: './github-basics-live-demo.html',
  styleUrl: './github-basics-live-demo.scss',
})
export class GithubBasicsLiveDemo {
  // States for the interactive section
  hasUnsavedChanges = signal(false);
  hasStagedChanges = signal(false);

  // The history of "safe harbors"
  commits = signal<GitCommit[]>([
    { id: 'a1b2c3d', msg: 'Initial state', time: '5 minutes ago' }
  ]);

  // Step 1: Edit file (Workspace)
  modifyFile() {
    this.hasUnsavedChanges.set(true);
  }

  // Step 2: git add (Staging Area)
  gitAdd() {
    if (this.hasUnsavedChanges()) {
      this.hasUnsavedChanges.set(false);
      this.hasStagedChanges.set(true);
    }
  }

  // Step 3: git commit (Repository)
  gitCommit() {
    if (this.hasStagedChanges()) {
      const newHash = Math.random().toString(16).substring(2, 9);
      const newNode: GitCommit = {
        id: newHash,
        msg: 'Manual snapshot',
        time: 'just now'
      };
      this.commits.update(list => [newNode, ...list]);
      this.hasStagedChanges.set(false);
    }
  }

  reset() {
    this.commits.set([{ id: 'a1b2c3d', msg: 'Initial state', time: '5 minutes ago' }]);
    this.hasUnsavedChanges.set(false);
    this.hasStagedChanges.set(false);
  }
}
