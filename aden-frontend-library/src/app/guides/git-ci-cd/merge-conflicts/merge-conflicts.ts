import { Component } from '@angular/core';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { MergeConflictsLiveDemo } from "./merge-conflicts-live-demo/merge-conflicts-live-demo";

@Component({
  selector: 'app-merge-conflicts',
  imports: [HeadlineGuides, CodeBlockGuide, Notice, MergeConflictsLiveDemo],
  templateUrl: './merge-conflicts.html',
  styleUrl: './merge-conflicts.scss',
})
export class MergeConflicts {
  mergeConflictStartCode = `# Start merge
git merge feature/login

# Git stops at a conflict
# -> Automatic merge failed; fix conflicts and then commit the result.

# Get an overview
git status`;

  conflictMarkerCode = `<<<<<<< HEAD
return user.isAdmin;
=======
return user.role === 'admin';
>>>>>>> feature/role-refactor`;

  resolvedConflictCode = `// Decision made, markers removed
return user.role === 'admin';`;

  resolveStepsCode = `# Add file to staging area after decision
git add example.ts

# Complete merge
git commit`;
}
