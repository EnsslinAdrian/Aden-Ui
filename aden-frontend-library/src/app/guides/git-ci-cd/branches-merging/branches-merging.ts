import { Component } from '@angular/core';
import { HeadlineGuides } from "../../../shared/ui/headline-guides/headline-guides";
import { CodeBlockGuide } from "../../../shared/ui/code-block-guide/code-block-guide";
import { Notice } from "../../../shared/ui/notice/notice";
import { BranchesMergingLiveDemo } from "./branches-merging-live-demo/branches-merging-live-demo";

@Component({
  selector: 'app-branches-merging',
  imports: [HeadlineGuides, CodeBlockGuide, Notice, BranchesMergingLiveDemo],
  templateUrl: './branches-merging.html',
  styleUrl: './branches-merging.scss',
})
export class BranchesMerging {
  branchCreateCode = `# Create a new branch AND switch to it directly
git checkout -b feature/new-login-design

# Switch between existing branches back and forth
git checkout main
git checkout feature/new-login-design

# List all available branches (the active one is marked)
git branch`;

  mergeCode = `# 1. Switch back to the main branch
git checkout main

# 2. Fetch the changes from the feature branch
git merge feature/new-login-design

# 3. Delete the branch (optional, but clean)
git branch -d feature/new-login-design`;
}
