import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

interface TimelineNode {
  id: string;
  msg: string;
  type: 'commit' | 'conflict' | 'merge';
}

@Component({
  selector: 'app-merge-conflicts-live-demo',
  imports: [UpperCasePipe],
  templateUrl: './merge-conflicts-live-demo.html',
  styleUrl: './merge-conflicts-live-demo.scss',
})
export class MergeConflictsLiveDemo {

}
